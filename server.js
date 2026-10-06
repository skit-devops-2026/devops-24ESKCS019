const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/todos";

// Prometheus Metrics Instrumentation
let client;
try {
  client = require("prom-client");
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics({ timeout: 5000 });
} catch (e) {
  client = null;
}

// Request Counter & Latency Metrics
const metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  requestsByRoute: {},
};

// Request tracking middleware
app.use((req, res, next) => {
  const start = Date.now();
  metrics.totalRequests++;
  const route = req.path;
  metrics.requestsByRoute[route] = (metrics.requestsByRoute[route] || 0) + 1;

  res.on("finish", () => {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      metrics.successfulRequests++;
    } else {
      metrics.failedRequests++;
    }
  });

  next();
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname));

// MongoDB Schema & Model
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`Connected to MongoDB at ${MONGO_URL}`))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Health Endpoint
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "UP" : "DOWN";
  res.status(dbStatus === "UP" ? 200 : 500).json({
    status: "UP",
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
  });
});

// Prometheus Metrics Endpoint
app.get("/metrics", async (req, res) => {
  if (client && client.register) {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } else {
    // Standard Prometheus text format fallback
    const memUsage = process.memoryUsage();
    const metricsOutput = [
      `# HELP app_up Application health status (1 = UP, 0 = DOWN)`,
      `# TYPE app_up gauge`,
      `app_up 1`,
      `# HELP http_requests_total Total number of HTTP requests`,
      `# TYPE http_requests_total counter`,
      `http_requests_total ${metrics.totalRequests}`,
      `# HELP http_requests_success_total Total successful HTTP requests`,
      `# TYPE http_requests_success_total counter`,
      `http_requests_success_total ${metrics.successfulRequests}`,
      `# HELP http_requests_failed_total Total failed HTTP requests`,
      `# TYPE http_requests_failed_total counter`,
      `http_requests_failed_total ${metrics.failedRequests}`,
      `# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds`,
      `# TYPE process_cpu_seconds_total counter`,
      `process_cpu_seconds_total ${(process.cpuUsage().user + process.cpuUsage().system) / 1000000}`,
      `# HELP process_resident_memory_bytes Resident memory size in bytes`,
      `# TYPE process_resident_memory_bytes gauge`,
      `process_resident_memory_bytes ${memUsage.rss}`,
      `# HELP process_heap_bytes Process heap size in bytes`,
      `# TYPE process_heap_bytes gauge`,
      `process_heap_bytes ${memUsage.heapUsed}`,
      `# HELP process_uptime_seconds Process uptime in seconds`,
      `# TYPE process_uptime_seconds gauge`,
      `process_uptime_seconds ${process.uptime()}`,
    ].join("\n");
    res.set("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
    res.end(metricsOutput);
  }
});

// Routes
// GET /todos - Fetch all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST /todos - Add a new todo
app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

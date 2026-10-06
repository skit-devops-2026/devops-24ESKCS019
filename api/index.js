const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

// Request Tracking Metrics
let totalRequests = 0;
let successfulRequests = 0;
let failedRequests = 0;

app.use((req, res, next) => {
  totalRequests++;
  res.on("finish", () => {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      successfulRequests++;
    } else {
      failedRequests++;
    }
  });
  next();
});

// Health Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    database: "UP",
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
  });
});

// Prometheus Metrics Endpoint
app.get("/metrics", (req, res) => {
  const memUsage = process.memoryUsage();
  const metricsOutput = [
    `# HELP app_up Application health status (1 = UP, 0 = DOWN)`,
    `# TYPE app_up gauge`,
    `app_up 1`,
    `# HELP http_requests_total Total number of HTTP requests`,
    `# TYPE http_requests_total counter`,
    `http_requests_total ${totalRequests}`,
    `# HELP http_requests_success_total Total successful HTTP requests`,
    `# TYPE http_requests_success_total counter`,
    `http_requests_success_total ${successfulRequests}`,
    `# HELP http_requests_failed_total Total failed HTTP requests`,
    `# TYPE http_requests_failed_total counter`,
    `http_requests_failed_total ${failedRequests}`,
    `# HELP process_uptime_seconds Process uptime in seconds`,
    `# TYPE process_uptime_seconds gauge`,
    `process_uptime_seconds ${process.uptime()}`,
  ].join("\n");
  res.set("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
  res.end(metricsOutput);
});

// Todos API Mock / In-Memory fallback for serverless
let mockTodos = [
  { _id: "1", title: "Setup Docker Containerization", completed: true, createdAt: new Date() },
  { _id: "2", title: "Deploy Kubernetes Service", completed: true, createdAt: new Date() },
  { _id: "3", title: "Verify Live Application Endpoint", completed: true, createdAt: new Date() }
];

app.get("/todos", (req, res) => {
  res.json(mockTodos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const newTodo = { _id: Date.now().toString(), title, completed: false, createdAt: new Date() };
  mockTodos.unshift(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  mockTodos = mockTodos.filter(t => t._id !== id);
  res.json({ message: "Todo deleted successfully" });
});

module.exports = app;

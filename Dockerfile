# Production Dockerfile for Node.js + Express Application
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production \
    PORT=5000 \
    MONGO_URL=mongodb://db:27017/todos

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy application source code
COPY . .

# Expose application port
EXPOSE 5000

# Run application as non-root node user for security
USER node

# Healthcheck to monitor app health
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application using existing package.json start command
CMD ["npm", "start"]

# Production Dockerfile for RealEstate Node.js + Express Application
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set build-time and runtime environment defaults
ENV NODE_ENV=production \
    PORT=5000

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy application source code
COPY . .

# Expose application port
EXPOSE 5000

# Run application as non-root user for security
USER node

# Healthcheck to monitor app health
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application using npm start (defined in package.json)
CMD ["npm", "start"]

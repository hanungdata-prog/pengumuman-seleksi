FROM node:20-alpine

WORKDIR /app

# Copy backend package.json
COPY backend/package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy semua file backend
COPY backend/ ./

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["node", "server.js"]

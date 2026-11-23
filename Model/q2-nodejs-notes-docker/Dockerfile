# 1. Base image: small Node.js 22 runtime on Alpine Linux
FROM node:22-alpine

# 2. Set the working directory inside the image
WORKDIR /app

# 3. Copy only the dependency manifests first (so this layer is cached until they change)
COPY package*.json ./

# 4. Install production dependencies only
RUN npm install --omit=dev && npm cache clean --force

# 5. Copy the application source (files excluded by .dockerignore are skipped)
COPY src ./src
COPY public ./public

# 6. Create the data folder and give it to the unprivileged "node" user
RUN mkdir -p /app/data && chown -R node:node /app

# 7. Run as non-root for security
USER node

# 8. Configuration and the port the app listens on
ENV PORT=3000 DATA_FILE=/app/data/notes.json
EXPOSE 3000

# 9. Docker can check that the app is healthy
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost:3000/health || exit 1

# 10. Start command
CMD ["node", "src/server.js"]

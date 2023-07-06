# Build Stage
FROM alpine:latest AS build

# Maintainer
LABEL AUTHOR="AYUSH-GUPTA-Martyr112"

# Set the working directory in the container
WORKDIR /app

# Copy app files
COPY . /app/

# Set environment variables
ARG VITE_API_URL
ARG VITE_BUCKET_URL
ARG VITE_AESKEY
ARG VITE_FRONTEND_URL

# Install dependencies and build app
RUN apk add --no-cache npm \
    && npm ci --silent \
    && npm run build \
    && rm -rf /root/.npm

# Production Stage
FROM alpine:latest

# Set the working directory in the container
WORKDIR /app

# Copy app files from the build stage
COPY --from=build /app/dist /app/dist

RUN apk add --no-cache npm \
    && npm install -g serve \
    && mkdir /tmp/logs \
    && rm -rf /root/.npm

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "/app/dist", ">", "/tmp/logs/server.log"]

FROM alpine:latest

#Maintainer
LABEL AUTHOR AYUSH-GUPTA-Martyr112

# Set the working directory in the container
WORKDIR /app

# Copy app files
COPY . /app/

# Set environment variables
ARG VITE_API_URL=${VITE_API_URL}
ARG VITE_BUCKET_URL=${VITE_BUCKET_URL}
ARG VITE_AESKEY=${VITE_AESKEY}

# Install dependencies and build app2
RUN apk add --no-cache nodejs npm \
    && npm ci --silent \
    && npm run build \
    && npm install -g serve \
    && rm -rf /root/.npm \
    && find . -type d -name dist -prune -o -not -name 'dist' -exec rm -rf {} \; || true

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "/app/dist"]

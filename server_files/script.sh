#!/bin/sh

# Start serve in the background
serve -s /app/dist -l 3000 >> /logs/server.log 2>&1 &

# Start nginx in the foreground (this keeps the container running)
nginx -g "daemon off;" 
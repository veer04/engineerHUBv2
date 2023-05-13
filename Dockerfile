FROM alpine:latest

#Maintainer
LABEL AUTHOR AYUSH-GUPTA-Martyr112

# Set the working directory in the container
WORKDIR /app

# Copy app files
COPY . /app/

# Set environment variables
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_BUCKET_URL=${VITE_BUCKET_URL}
ENV VITE_AESKEY=${VITE_AESKEY}

# Install dependencies and build app
RUN apk add --no-cache nodejs npm \
    && npm ci --silent \
    && npm run build \
    && npm install -g serve \
    && rm -rf /root/.npm \
    && find . -type d -name dist -prune -o -not -name 'dist' -exec rm -rf {} \; || true

# Expose port 3000
EXPOSE 3000

# Entrypoint
ENTRYPOINT ["sync;","echo","3",">","/proc/sys/vm/drop_caches"]

# Command to run the application
CMD ["serve", "-s", "/app/dist"]

# FROM fedora:latest

# #Maintainer
# LABEL AUTHOR TECH-TEAM-EHUB

# # Set the working directory in the container
# WORKDIR /app

# COPY public public
# COPY src src
# COPY package.json package.json
# COPY package-lock.json package-lock.json
# COPY .env .env
# COPY vite.config.js vite.config.js
# COPY index.html index.html

# RUN dnf -y update \
#     && dnf -y install nodejs npm \
#     && npm install --silent \
#     && npm run build \
#     && rm -rf /root/.npm \
#     && npm install -g serve \
#     && rm -rf /tmp/* \
#     && rm -rf /var/tmp/* \
#     && rm -rf /root/.cache \
#     && rm -rf /root/.npm \
#     && dnf -y clean all \
#     && rm -rf /var/cache/dnf/* \
#     && rm -rf /var/lib/dnf/* \
#     && rm -rf /var/log/dnf* \
#     && find . -type d -name dist -prune -o -not -name 'dist' -exec rm -rf {} \; || true


# # Expose port 3000
# EXPOSE 3000

# # Command to run the application
# CMD ["serve", "-s", "/app/dist"]




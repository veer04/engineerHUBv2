FROM alpine:latest

#Maintainer
LABEL AUTHOR TECH-TEAM-EHUB

# Set the working directory in the container
WORKDIR /app

RUN apk update \
    && apk add nodejs npm \
    && npm install -g serve \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* \
    && rm -rf /var/tmp/* \
    && rm -rf /root/.cache \
    && rm -rf /root/.npm 

# Copy the build files to the container
COPY build ./build

# Command to run the application
CMD ["serve", "-s", "build"] 
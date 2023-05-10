FROM alpine:latest

#Maintainer
LABEL AUTHOR TECH-TEAM-EHUB

# Set the working directory in the container
WORKDIR /app

RUN apk update \
    && apk add nodejs npm \
    && npm install --silent \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* \
    && rm -rf /var/tmp/* \
    && rm -rf /root/.cache \
    && rm -rf /root/.n \
    && apk del nodejs
    
# Required Softwares for the web app
RUN npm install -g serve

# Copy the build files to the container
COPY dist ./dist

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist"]
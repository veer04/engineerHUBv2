FROM alpine:latest

#Maintainer
LABEL AUTHOR TECH-TEAM-EHUB

# Set the working directory in the container
WORKDIR /app

RUN apk update && \
    apk add nodejs npm

# Required Softwares for the web app
RUN npm install -g serve

# Copy the build files to the container
COPY dist ./dist

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist"]
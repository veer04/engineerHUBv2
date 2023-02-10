# Use an official Node.js runtime as the base image
FROM node:14

#Maintainer
LABEL AUTHOR TECH-TEAM-EHUB

# Set the working directory in the container
WORKDIR /app

# Required Softwares for the web app
RUN npm install -g serve

# Copy the build files to the container
COPY build ./build

# COPY .env ./

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build"] 
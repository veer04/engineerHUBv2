#!/bin/bash

# Set ECR repository information
ECR_REGISTRY="288273743510.dkr.ecr.ap-south-1.amazonaws.com"
ECR_REGION="ap-south-1"
REPO_NAME="ehub_frontend"

# Authenticate with ECR
aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

# Name of the Docker container
container_name=$1

while true; do
    # Get the image digest for the 'latest' tag
    IMAGE_DIGEST=$(aws ecr describe-images --repository-name $REPO_NAME --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageDigest' --output text)

    # Check if local image needs to be updated
    if [ "$(docker images -q $ECR_REGISTRY/$REPO_NAME:latest 2> /dev/null)" == "" ] || [ "$(docker inspect --format='{{index .RepoDigests 0}}' $ECR_REGISTRY/$REPO_NAME:latest)" != "$ECR_REGISTRY/$REPO_NAME@$IMAGE_DIGEST" ]; then
        # Pull the latest image from ECR
        docker pull $ECR_REGISTRY/$REPO_NAME:latest

        # Stop and remove the running container (if it exists)
        if [ "$(docker ps -q -f name=$container_name)" ]; then
            docker stop $container_name
            docker rm $container_name
        fi

        # Remove old pulled images
        docker rmi $(docker images -q $ECR_REGISTRY/$REPO_NAME:latest | tail -n +2) > /dev/null 2>&1

        # Clean up unused Docker resources
        docker system prune -f
    fi

    # Check if a container name was passed as an argument
    if [ $# -eq 0 ]; then
        echo "Error: No container name was provided."
        echo "Usage: $0 container name"
        exit 1
    fi

    # Check if the container is running
    if docker ps | grep "$container_name" >/dev/null; then
        echo "Container $container_name is running."
    else
        # Check if the container is stopped
        if docker ps -a | grep "$container_name" | grep "Exited" >/dev/null; then
            echo "Container $container_name is stopped."
            echo "Re-run container....."
            docker start $container_name
        else
            # If the container is not running or stopped, it must be exited
            echo "Container $container_name is exited."
            docker run --name $container_name -p 80:3000 -dit $ECR_REGISTRY/$REPO_NAME:latest
        fi
    fi

    # Check if ECR token needs to be renewed
    if ! aws ecr get-login-password --region $ECR_REGION >/dev/null; then
        # If the token is invalid or expired, obtain a new one and re-authenticate with ECR
        echo "ECR token has expired. Renewing token..."
        aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
    fi

    # Sleep for 60 seconds before checking again
    sleep 60
done

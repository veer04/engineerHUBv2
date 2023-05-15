#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status

# Set ECR repository information
readonly ECR_REGISTRY="288273743510.dkr.ecr.ap-south-1.amazonaws.com"
readonly ECR_REGION="ap-south-1"
readonly REPO_NAME="ehub_frontend"

# Set image name
IMAGE_NAME="$ECR_REGISTRY/$REPO_NAME:latest"

# Authenticate with ECR
aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

# Name of the Docker container
CONTAINER_NAME="$1"

if [ -z "$CONTAINER_NAME" ]; then
  echo "Error: No container name was provided."
  echo "Usage: $0 container_name"
  exit 1
fi

function get_image_digest() {
  aws ecr describe-images \
    --repository-name "$REPO_NAME" \
    --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageDigest' \
    --output text
}

function is_container_running() {
  docker ps --format "{{.Names}}" | grep -q "^$1$"
}

function is_container_stopped() {
  docker ps -a --format "{{.Names}} {{.Status}}" | grep "^$1 Exited" >/dev/null
}

function remove_container() {
  docker rm -f "$1" >/dev/null 2>&1 || true
}

function run_container() {
  docker run --name "$CONTAINER_NAME" -p 80:3000 -dit "$IMAGE_NAME"
}

# Loop indefinitely
while true; do
  # Check if the container is running
  if is_container_running "$CONTAINER_NAME"; then
    echo "Container $CONTAINER_NAME is running."
  else
    # Check if the container is stopped
    if is_container_stopped "$CONTAINER_NAME"; then
      echo "Container $CONTAINER_NAME is stopped."
      remove_container "$CONTAINER_NAME"
    fi

    # Remove the container if it exists
    remove_container "$CONTAINER_NAME"

    # Pull the latest image from ECR
    docker pull "$IMAGE_NAME"

    # Run a new container
    run_container
  fi

  # Check if ECR token needs to be renewed
  if ! aws ecr get-login-password --region "$ECR_REGION" >/dev/null; then
    # If the token is invalid or expired, obtain a new one and re-authenticate with ECR
    echo "ECR token has expired. Renewing token..."
    aws ecr get-login-password --region "$ECR_REGION" | docker login --username AWS --password-stdin "$ECR_REGISTRY"
  fi

  # Remove old pulled images
  docker image prune -f >/dev/null 2>&1

  # Sleep for 60 seconds before checking again
  sleep 60
done

#!/bin/bash

set -e

# Set ECR repository information
ECR_REGISTRY="288273743510.dkr.ecr.ap-south-1.amazonaws.com"
ECR_REGION="ap-south-1"
REPO_NAME="ehub_frontend"

# Authenticate with ECR
aws ecr get-login-password --region "$ECR_REGION" | docker login --username AWS --password-stdin "$ECR_REGISTRY"

# Name of the Docker container
container_name=""

# Function to display script usage
display_usage() {
  echo "Error: No container name was provided."
  echo "Usage: $0 -c <container_name>"
  exit 1
}

# Parse command-line arguments
while getopts "c:" opt; do
  case $opt in
    c)
      container_name=$OPTARG
      ;;
    \?)
      display_usage
      ;;
  esac
done

# Check if a container name was provided
if [ -z "$container_name" ]; then
  display_usage
fi

# Function to stop and remove the container
stop_and_remove_container() {
  local container=$1
  if docker container inspect "$container" >/dev/null 2>&1; then
    docker stop "$container" >/dev/null
    docker rm "$container" >/dev/null
  fi
}

# Function to pull and run the new image
pull_and_run_image() {
  local container=$1
  local image_digest=$2

  # Pull the latest image from ECR
  docker pull "$ECR_REGISTRY/$REPO_NAME:latest"

  # Stop and remove the running container (if it exists)
  stop_and_remove_container "$container"

  # Remove old pulled images
  docker image prune -f

  # Run the new image
  docker run --name "$container" -p 80:3000 -d "$ECR_REGISTRY/$REPO_NAME:latest"
}

# Function to check if the container is running
is_container_running() {
  local container=$1
  if docker container inspect "$container" >/dev/null 2>&1; then
    docker container inspect --format='{{.State.Status}}' "$container"
  else
    echo "not_exist"
  fi
}

# Function to renew ECR token
renew_ecr_token() {
  echo "ECR token has expired. Renewing token..."
  aws ecr get-login-password --region "$ECR_REGION" | docker login --username AWS --password-stdin "$ECR_REGISTRY"
}

# Set initial flag values
image_digest=""
previous_image_digest=""
previous_container_status=""

# Trap SIGINT and SIGTERM signals
trap 'stop_and_remove_container "$container_name"; exit' SIGINT SIGTERM

while true; do
  # Get the image digest for the 'latest' tag
  current_image_digest=$(aws ecr describe-images --repository-name "$REPO_NAME" --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageDigest' --output text)

  # Check if local image needs to be updated
  if [ -z "$(docker images -q "$ECR_REGISTRY/$REPO_NAME:latest" 2>/dev/null)" ] || [ "$(docker image inspect --format='{{index .RepoDigests 0}}' "$ECR_REGISTRY/$REPO_NAME:latest")" != "$ECR_REGISTRY/$REPO_NAME@$current_image_digest" ]; then
    # Pull and run the new image
    pull_and_run_image "$container_name" "$current_image_digest"

    # Remove old images (except for the current image)
    docker image prune -f --filter "until=$(docker image inspect --format='{{.Created}}' "$ECR_REGISTRY/$REPO_NAME@$current_image_digest")"
  fi

  # Check if the container is running
  container_status=$(is_container_running "$container_name")

  if [ "$container_status" == "running" ]; then
    echo "Container $container_name is running."
  elif [ "$container_status" == "exited" ]; then
    echo "Container $container_name is exited or stopped. Restarting it..."
    stop_and_remove_container "$container_name"
    pull_and_run_image "$container_name" "$current_image_digest"
  else
    echo "Container $container_name does not exist. Starting it..."
    pull_and_run_image "$container_name" "$current_image_digest"
  fi

  # Check if ECR token needs to be renewed
  if ! aws ecr get-login-password --region "$ECR_REGION" >/dev/null; then
    # If the token is invalid or expired, obtain a new one and re-authenticate with ECR
    renew_ecr_token
  fi

  # Sleep for 100 seconds before checking again
  sleep 100
done

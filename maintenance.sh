#!/bin/bash

# Set ECR repository information
ECR_REGISTRY="<your-ecr-registry>"
ECR_REGION="<your-ecr-region>"
REPO_NAME="<your-repo-name>"

# Name of the Docker container
container_name="v3_frontend"

# # Configure AWS Credentials
# aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
# aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
# aws configure set region $ECR_REGION

while true; do
    # Get the image digest for the 'latest' tag
    IMAGE_DIGEST=$(aws ecr describe-images --repository-name $REPO_NAME --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageDigest' --output text)

    # Check if local image needs to be updated
    if [ "$(docker images -q $ECR_REGISTRY/$REPO_NAME:latest 2> /dev/null)" == "" ] || [ "$(docker inspect --format='{{.Id}}' $ECR_REGISTRY/$REPO_NAME:latest)" != "$IMAGE_DIGEST" ]; then
        # Pull the latest image from ECR
        docker pull $ECR_REGISTRY/$REPO_NAME:latest

        # Stop and remove the running container (if it exists)
        if [ "$(docker ps -q -f name=$REPO_NAME)" ]; then
            docker stop $REPO_NAME
            docker rm $REPO_NAME
        fi

        # Run the container using the latest image
        docker run -d --name $REPO_NAME $ECR_REGISTRY/$REPO_NAME:latest
    fi

    # Check if a container name was passed as an argument
    if [ $# -eq 0 ]; then
        echo "Error: No container name was provided."
        echo "Usage: $0 $container_name"
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
            docker run --name $container_name -p 3000:80 -e VITE_AESKEY="jbh\$g#h@78wer%*" -e VITE_BUCKET_URL="https://frontendehubbucket.s3.ap-south-1.amazonaws.com/" -e VITE_API_URL="http://e-hub-backend-production-9545.up.railway.app/" -dit ehub-v3-frontend
        fi
    fi

    # Sleep for 60 seconds before checking again
    sleep 60
done


# #!/bin/bash

# sync; echo 3 > /proc/sys/vm/drop_caches
# while true; do
#     # Check if a container name was passed as an argument
#     if [ $# -eq 0 ]; then
#         echo "Error: No container name was provided."
#         echo "Usage: $0 CONTAINER_NAME"
#         exit 1
#     fi

#     # Name of the Docker container
#     container_name="$1"

#     # Check if the container is running
#     if docker ps | grep "$container_name" >/dev/null; then
#         echo "Container $container_name is running."
#     else
#         # Check if the container is stopped
#         if docker ps -a | grep "$container_name" | grep "Exited" >/dev/null; then
#             echo "Container $container_name is stopped."
#             echo "Re-run container....."
#             docker start $container_name
#         else
#             # If the container is not running or stopped, it must be exited
#             echo "Container $container_name is exited."
#             docker run --name $container_name -p 3000:80 -e VITE_AESKEY="jbh\$g#h@78wer%*" -e VITE_BUCKET_URL="https://frontendehubbucket.s3.ap-south-1.amazonaws.com/" -e VITE_API_URL="http://e-hub-backend-production-9545.up.railway.app/" -dit ehub-v3-frontend
#         fi
#     fi
# done


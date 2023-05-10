#!/bin/bash

sync; echo 3 > /proc/sys/vm/drop_caches
while true; do
    # Check if a container name was passed as an argument
    if [ $# -eq 0 ]; then
        echo "Error: No container name was provided."
        echo "Usage: $0 CONTAINER_NAME"
        exit 1
    fi

    # Name of the Docker container
    container_name="$1"

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
done

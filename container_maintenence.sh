#!/bin/bash

while true
do
    # Check if a container name was passed as an argument
    if [ $# -eq 0 ]; then
        echo "Error: No container name was provided."
        echo "Usage: $0 CONTAINER_NAME"
        exit 1
    fi

    # Name of the Docker container
    container_name="$1"

    # Check if the container is running
    if docker ps | grep "$container_name" > /dev/null ; then
        echo "Container $container_name is running."
    else
        # Check if the container is stopped
        if docker ps -a | grep "$container_name" | grep "Exited" > /dev/null ; then
            echo "Container $container_name is stopped."
            echo "Re-run container....."
            `docker start $container_name`
        else
            # If the container is not running or stopped, it must be exited
            echo "Container $container_name is exited."
            `docker run -p 3000:3000 -d ehub-website --name frontend`
        fi
    fi
done
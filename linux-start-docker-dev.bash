#!/bin/bash

echo "====> Running docker-compose"
docker-compose -f ./docker/dev/docker-compose-linux.yml up -d --remove-orphans
# enter into the dev container

echo "====> Copying env file"
docker cp .env tourney_app:/root/app/

echo "====> Entering app dev container"
# name of the container must match container_name in docker-compose file
docker exec -it tourney_app bash --init-file docker/dev/.profile

#!/bin/bash

# go to the project directory
cd ~/tourney

# pull latest code
git pull origin master

# restart linux
sudo /usr/sbin/service nginx restart

# build the docker image for the app
docker-compose -f ./docker/prod/docker-compose.yml pull
docker-compose -f ./docker/prod/docker-compose.yml up -d

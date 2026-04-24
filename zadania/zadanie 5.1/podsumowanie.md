# Komendy:

Sieć:
- docker network create -d bridge front-net
- docker network create -d bridge back-net

Wolumen:
- docker volume create items-data

Backend:
- cd backend
- docker build --build-arg IMAGE_VERSION=v1 -t backend:latest .
- docker run --volume=items-data:/data --network=back-net --name backend1 -e INSTANCE_ID=1 -d backend:latest
- docker run --volume=items-data:/data --network=back-net --name backend2 -e INSTANCE_ID=2 -d backend:latest
- docker run --volume=items-data:/data --network=back-net --name backend3 -e INSTANCE_ID=3 -d backend:latest


Nginx:
- cd nginx
- docker build --build-arg NGINX_VERSION="1.29" -t proxy:latest .
- docker run --network=front-net --network=back-net -p "80:80" --name proxy -d proxy:latest
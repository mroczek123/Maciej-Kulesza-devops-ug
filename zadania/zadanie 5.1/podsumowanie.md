# Komendy:

Sieć:
- docker network create -d bridge app-network

Backend:
- cd backend
- docker build --build-arg IMAGE_VERSION=v1 -t backend:latest .
- docker push backend -a
- docker pull backend
- docker run --network=app-network --name backend1 -e INSTANCE_ID=1 -d backend:latest
- docker run --network=app-network --name backend2 -e INSTANCE_ID=2 -d backend:latest
- docker run --network=app-network --name backend3 -e INSTANCE_ID=3 -d backend:latest

Nginx:
- cd proxy
- docker build --build-arg NGINX_VERSION="1.29" -t proxy:latest .
- docker push proxy -a
- docker pull proxy:latest
- docker run --network=app-network -p "80:80" --name proxy -d mroczek123/proxy
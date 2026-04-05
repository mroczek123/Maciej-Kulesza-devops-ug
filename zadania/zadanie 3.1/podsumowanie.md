# Komendy:

Sieć:
- docker network create -d bridge app-network

Backend:
- cd backend
- docker build -t mroczek123/backend:v1 -t mroczek123/backend:latest .
- docker push mroczek123/backend -a
- docker pull mroczek123/backend
- docker run --network=app-network --name backend -e INSTANCE_ID=1 -d mroczek123/backend

Nginx:
- cd proxy
- docker build -t mroczek123/proxy:v1 -t mroczek123/proxy:latest .
- docker push mroczek123/proxy -a
- docker pull mroczek123/proxy
- docker run --network=app-network -p "80:80" --name proxy -d mroczek123/proxy
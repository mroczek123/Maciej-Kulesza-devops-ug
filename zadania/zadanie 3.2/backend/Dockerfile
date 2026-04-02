FROM node:25-alpine
COPY ./package.json ./
RUN npm install
COPY ./src /src
WORKDIR /src

ENTRYPOINT ["node"]
CMD ["index.js"]

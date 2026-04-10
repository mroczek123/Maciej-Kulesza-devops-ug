FROM node:20-alpine
ARG IMAGE_VERSION

COPY --chown=node ./package.json ./package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node ./src /src
WORKDIR /src

USER node
ENV NODE_ENV=production PORT=3000
LABEL version=$IMAGE_VERSION
ENTRYPOINT ["node"]
CMD ["index.js"]

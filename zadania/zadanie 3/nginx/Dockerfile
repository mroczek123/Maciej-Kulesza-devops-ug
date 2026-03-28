FROM scratch AS builder
COPY ./statics /statics

FROM nginx:1.29-alpine AS app
COPY --from=builder ./statics /statics
RUN mkdir -p /cache
COPY ./nginx.conf /etc/nginx/nginx.conf
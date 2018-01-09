FROM node:9.3-alpine

COPY ./react-build/ /app/
WORKDIR /app

EXPOSE 8080
ENV NODE_ENV=production

ENTRYPOINT node server.js

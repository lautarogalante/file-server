
FROM node:current-alpine AS builder

ARG VITE_STORAGE_PATH
ARG VITE_HOST_URL
ARG VITE_SERVER_PORT

WORKDIR /usr/src/app/client

COPY ["package*.json", "."]

RUN npm ci

COPY [".", "."]

RUN npm run build

FROM node:current-alpine

WORKDIR /usr/src/app/client
RUN mkdir -p /usr/src/app/client/build

COPY --from=builder /usr/src/app/client/build /usr/src/app/client/build

RUN npm i -g serve 

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]
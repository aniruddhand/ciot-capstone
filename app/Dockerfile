FROM node:alpine

WORKDIR /opt/2020ciot-wma

COPY . .

RUN rm -f docker-compose.yml && rm -f Dockerfile && npm i

ENTRYPOINT [ "npm", "run", "start" ]

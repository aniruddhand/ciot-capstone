FROM node:alpine

WORKDIR /opt/2020ciot-wma

COPY . .

RUN rm -rf .vscode && npm i

ENTRYPOINT [ "node", "app.js" ]

FROM node:18.19.1-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm i

COPY index.js .

EXPOSE 8080

CMD [ "node," "index.js"]

FROM node:20-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm i

COPY index.js .

EXPOSE 8080

CMD [ "node," "index.js"]

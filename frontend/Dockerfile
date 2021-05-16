FROM node:16

WORKDIR /frontend

COPY ./package.json /frontend

RUN npm install

COPY . .

CMD ["npm", "start"]
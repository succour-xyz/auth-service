FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 8000

CMD npm start
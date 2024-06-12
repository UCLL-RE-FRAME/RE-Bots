FROM node:lts

WORKDIR /Server

COPY package*.json ./

RUN npm install

COPY ./ ./

ENV PORT=2105

EXPOSE 2105

CMD ["node" , "server.js" ]
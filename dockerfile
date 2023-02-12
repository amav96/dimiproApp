FROM node:16.13.1-alpine

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001


CMD ["npm", "start"]
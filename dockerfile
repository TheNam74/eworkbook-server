FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.4.0

COPY . .

COPY .env ./

CMD ["npm", "run", "start"]
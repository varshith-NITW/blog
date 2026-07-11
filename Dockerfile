FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY client/ ./client/
COPY server/ ./server/

EXPOSE 5000

CMD ["node", "server/server.js"]

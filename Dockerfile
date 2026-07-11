FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./server/

RUN cd server && npm install --production

COPY client/ ./client/
COPY server/ ./server/

EXPOSE 5000

CMD ["node", "server/server.js"]

FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

# Expose le port dev
EXPOSE 3001

# Dev avec TSX watch + polling pour Windows
CMD ["npm", "run", "dev"]

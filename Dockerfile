FROM node:16-alpine as builder
WORKDIR /node
COPY . .
RUN npm ci
EXPOSE 3000
CMD ["node", "app.js"]
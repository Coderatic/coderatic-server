FROM node:18-alpine

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5173

EXPOSE 5173

RUN npm run build

CMD ["npm", "run", "start"]

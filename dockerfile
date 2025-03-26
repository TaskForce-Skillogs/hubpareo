FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --save-dev @types/express @types/node


COPY . .


RUN npm run build


EXPOSE 3000


ENV NODE_ENV=development


CMD ["npx", "ts-node-dev", "--respawn", "src/index.ts"]
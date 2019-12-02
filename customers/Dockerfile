FROM node:latest

WORKDIR /usr/src/app
COPY package.json .
RUN npm install    
COPY . .
EXPOSE 4002

CMD [ "npm", "start" ]   
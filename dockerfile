FROM node:latest

WORKDIR /app

COPY . .

RUN npm install \
 && npm run build

EXPOSE 5173

CMD ["npm", "run", "start", "--", "--host"]
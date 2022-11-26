FROM node:alpine3.16

WORKDIR /app

COPY ./dist/apps/api .
RUN npm install

ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "main.js"]


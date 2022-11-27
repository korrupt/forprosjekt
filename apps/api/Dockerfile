FROM node:alpine3.16

WORKDIR /app

COPY ./dist/apps/api .
RUN yarn

ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "main.js"]


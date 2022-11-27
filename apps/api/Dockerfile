FROM node:alpine3.16

WORKDIR /app

COPY ./dist/apps/api .
COPY ./yarn.lock .

RUN yarn install --immutable --immutable-cache --check-cache

ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "main.js"]


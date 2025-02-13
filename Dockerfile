FROM node:20-alpine3.19 as nest-api

WORKDIR /usr/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node .env ./

COPY --chown=node:node . .

EXPOSE 3000

RUN apk update && apk add --no-cache openssl

# CMD ["sleep", "infinity" ]
CMD ["npm", "run", "start:dev"]	
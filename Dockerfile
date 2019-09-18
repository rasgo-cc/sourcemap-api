FROM node:12.3.1-alpine

RUN mkdir -p /app

COPY package.json /app/package.json
COPY index.js /app/index.js
COPY config.js /app/config.js
COPY knexfile.js /app/knexfile.js
COPY db /app/db
COPY lib /app/lib
COPY tasks /app/tasks

WORKDIR /app

RUN yarn global add knex
RUN yarn global add jake
RUN yarn install --production

EXPOSE 80
CMD node -r esm --use_strict /app/index.js --production

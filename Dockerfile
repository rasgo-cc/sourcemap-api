FROM node:12.3.1

RUN mkdir -p /app

COPY package.json /app/package.json
COPY index.js /app/index.js
COPY config.js /app/config.js
COPY knexfile.js /app/knexfile.js
COPY db /app/db
COPY lib /app/lib
COPY tasks /app/tasks

WORKDIR /app

RUN yarn install --production

EXPOSE 80
CMD node --use_strict /app/index.js --production

FROM node:14.16.0-alpine3.13
#ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 5000

CMD [ "yarn", "start" ]

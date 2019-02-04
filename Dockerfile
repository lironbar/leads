ARG APP

FROM node:latest AS base

RUN npm install lerna --global

COPY . /var/leads/

WORKDIR /var/leads/

RUN npm run bootstrap

ENTRYPOINT ["node"]

CMD ["npm","run",${APP}]
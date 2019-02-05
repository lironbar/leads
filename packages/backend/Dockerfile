FROM node:latest AS base

COPY . /var/leads-backend/

WORKDIR /var/leads-backend/

RUN npm ci

ENTRYPOINT ["node"]

CMD ["index.js"]

EXPOSE 8080
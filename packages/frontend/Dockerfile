FROM node:latest AS base

COPY . /var/leads-frontend/

WORKDIR /var/leads-frontend/

RUN npm ci

ENTRYPOINT ["ng"]

CMD ["serve"]

EXPOSE 4200
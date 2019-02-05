FROM node:latest AS base

RUN npm install --global @angular/cli

COPY . /var/leads-frontend/

WORKDIR /var/leads-frontend/

RUN npm ci

ENTRYPOINT ["ng"]

CMD ["serve"]

EXPOSE 4200
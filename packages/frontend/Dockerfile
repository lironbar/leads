FROM node:latest AS setup

WORKDIR /var/leads-frontend/

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build -- --prod=true

FROM nginx:latest AS serve

COPY --from="setup" /var/leads-frontend/dist/mean-app /var/leads-frontend/
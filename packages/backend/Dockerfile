FROM node:latest

WORKDIR /var/leads-backend/

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

ENTRYPOINT ["node"]

CMD ["index.js"]
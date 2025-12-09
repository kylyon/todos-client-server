# On construit les artéfacts de build dans ce stage
FROM node:24 AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Stage final
FROM nginx:1.29.2

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
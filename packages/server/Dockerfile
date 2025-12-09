# On construit les artéfacts de build dans ce stage
FROM node:24 AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Stage final
FROM node:24-alpine3.22 AS production

WORKDIR /app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/src/data ./dist/data
COPY --from=build /usr/src/app/src/dist/instrument.js ./dist/instrument.js

EXPOSE 3001

CMD ["npm", "run", "start"]

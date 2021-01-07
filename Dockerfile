FROM node:15-alpine as builder

WORKDIR /app
ADD . ./
RUN npm i
RUN npm run build

FROM node:15-alpine
WORKDIR /app
ENV NODE_ENV=production
ADD package.json package-lock.json ./
RUN npm ci
COPY --from=builder ./app/dist ./dist

CMD [ "node", "dist/main.js" ]

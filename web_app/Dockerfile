# build stage
FROM node:lts-alpine
WORKDIR /app
COPY dist/ ./dist

RUN ["npm", "install", "-g", "serve"]

CMD ["serve", "-s", "dist"]


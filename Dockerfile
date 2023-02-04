FROM node:12-alpine AS builder
USER node
WORKDIR /app

COPY package*.json ./
RUN ["npm", "install"]
COPY --chown=node:node . .
RUN ["npm", "run", "build"]

FROM node:12-alpine AS production
USER node:node
WORKDIR /app
COPY --chown=node:node --from=builder /app .

EXPOSE 8080
CMD ["node", "dist/server.js"]

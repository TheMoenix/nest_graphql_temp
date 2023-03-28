FROM node:18.14-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# FROM node:18.14-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# RUN apk add --no-cache tini
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --only=production
# COPY --from=development /usr/src/app/dist ./dist
# ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main", "--max-old-space-size=16384"]
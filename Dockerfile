FROM node:18.20-alpine3.20
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY package.json .
COPY package-lock.json .

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \

RUN npm i sharp --force
RUN npm ci --legacy-peer-deps
COPY . .
RUN apk del .gyp

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

ENV NODE_ENV production

RUN addgroup --system --gid 10001 nodejs
RUN adduser \
  --disabled-password \
  --gecos "" \
  --home "/nonexistent" \
  --shell "/sbin/nologin" \
  --no-create-home \
  --system \
  --uid 10001 \
  nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]


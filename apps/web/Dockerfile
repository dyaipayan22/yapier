
FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache lib6-compact

WORKDIR /app

RUN npm install turbo pnpm --global
RUN pnpm config set store-dir ~/.pnpm-store
COPY .  .
RUN turbo prune web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache lib6-compact

WORKDIR /app

COPY --from=builder /app/out/json .
RUN pnpm install

COPY --from=builder /app/out/full .

RUN pnpm turbo build --filter=web

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 reactjs
RUN adduser --system --uid 1001 reactjs
USER reactjs
COPY --from=installer /app .

CMD node apps/web/dist/index.html

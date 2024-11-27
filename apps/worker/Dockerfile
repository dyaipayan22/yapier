

FROM node:20-alpine AS base
RUN npm install turbo pnpm --global
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY .  .
RUN turbo prune worker --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=builder /app/out/json .
RUN pnpm install

COPY --from=builder /app/out/full .

RUN pnpm turbo build --filter=worker

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 worker
RUN adduser --system --uid 1001 worker
USER worker
COPY --from=installer /app .

CMD node apps/worker/dist/index.js

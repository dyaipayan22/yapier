FROM node:20-alpine AS base
RUN npm install turbo pnpm --global
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY .  .
RUN turbo prune api --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=builder /app/out/json .
RUN pnpm install

COPY --from=builder /app/out/full .

RUN pnpm turbo build --filter=api
# RUN pnpm turbo db:generate --filter=api
# RUN pnpm turbo db:push --filter=api

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 apiserver
RUN adduser --system --uid 1001 apiserver
USER apiserver
COPY --from=installer /app .

EXPOSE 8000

CMD node apps/api/dist/index.js

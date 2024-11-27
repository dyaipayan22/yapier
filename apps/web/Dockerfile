
FROM node:20-alpine AS base
RUN npm install turbo pnpm --global
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY .  .
RUN turbo prune web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat

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

EXPOSE 5173
CMD turbo db:generate && turbo db:push && node apps/web/dist/index.html

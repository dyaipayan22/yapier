FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN turbo prune api --docker

FROM base AS installer
RUN apk update
RUN apk --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN pnpm turbo run build --filter=api

FROM base AS runner
WORKDIR /app

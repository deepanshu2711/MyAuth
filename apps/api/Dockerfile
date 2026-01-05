FROM node:20-alpine AS base

FROM base AS prepare 
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker 

FROM base AS builder
WORKDIR /app
COPY  --from=prepare /app/out/json/ ./
RUN npm install
COPY --from=prepare /app/out/full/ ./
RUN npx turbo build

FROM base AS runner 
WORKDIR /app
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs

# Default port (can be overridden at runtime)
ENV PORT=5005
# Informational (optional but recommended)
EXPOSE 5005

COPY --from=builder /app .
CMD node apps/api/dist/index.js








FROM node:20-alpine AS base

WORKDIR /app

# ---
FROM base AS prepare
RUN npm install -g turbo
COPY . .
# Add lockfile and package.json's of isolated subworkspace
RUN npx turbo prune auth-portal --docker

# ---
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ ./
RUN npm install

# Build the project
COPY --from=prepare /app/out/full/ ./

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM
# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
RUN npx turbo build

# ---
FROM node:20-alpine AS runner

# Don't run production as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

ENV PORT 3000
EXPOSE 3000

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/apps/auth-portal/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/auth-portal/.next/static ./apps/auth-portal/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/auth-portal/public ./apps/auth-portal/public

CMD ["node", "apps/auth-portal/server.js"]

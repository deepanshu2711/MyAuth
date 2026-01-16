
FROM node:20-alpine AS base

WORKDIR /app

# ---
FROM base AS prepare
RUN npm install -g turbo
COPY . .
# Add lockfile and package.json's of isolated subworkspace
RUN npx turbo prune dashboard --docker

# ---
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ ./
RUN npm install

# Build the project
COPY --from=prepare /app/out/full/ ./

# Build arguments for environment variables
ARG NEXT_PUBLIC_AUTH_BACKEND
ARG NEXT_PUBLIC_CLIENT_ID
ARG NEXT_PUBLIC_CLIENT_SECRET

# Set environment variables for build
ENV NEXT_PUBLIC_AUTH_BACKEND=$NEXT_PUBLIC_AUTH_BACKEND
ENV NEXT_PUBLIC_CLIENT_ID=$NEXT_PUBLIC_CLIENT_ID
ENV NEXT_PUBLIC_CLIENT_SECRET=$NEXT_PUBLIC_CLIENT_SECRET

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

ENV PORT 5006
EXPOSE 5006

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/.next/static ./apps/dashboard/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/public ./apps/dashboard/public

CMD ["node", "apps/dashboard/server.js"]

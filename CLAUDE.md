# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

MyAuth is a self-hostable authentication backend built specifically for Next.js App Router. It implements an OAuth2 authorization-code flow with RS256-signed JWTs, httpOnly cookie sessions, OTP login, and Google/GitHub OAuth. Developers integrate it via the `@myauth/next` SDK.

## Monorepo Structure

Turborepo + npm workspaces. Node 18+ required, `npm@11` as package manager.

**Apps** (`apps/`):
- `api` — Core auth server (Express 5, MongoDB, Redis, RabbitMQ). Runs on `PORT` env var. Exposes `/.well-known/jwks.json` for public key discovery.
- `auth-portal` — Login/register UI for end users (Next.js, port 3001). Sends users through the auth flow.
- `dashboard` — Developer console for managing apps, viewing users/sessions (Next.js, default port 3000). Uses `@myauth/next` to authenticate developers.
- `dashboard-backend` — Express API serving the dashboard. Consumes RabbitMQ events from `api` to sync users.

**Packages** (`packages/`):
- `next-sdk` → published as `@myauth/next` — Next.js SDK (client hooks, server functions, middleware, callback handler)
- `node-sdk` → published as `@myauth/node` — Node.js SDK used by `next-sdk` internally and by `dashboard-backend`
- `sdk` — Base/shared utilities
- `ui` → `@repo/ui` — Shared React components
- `eslint-config`, `typescript-config`, `tailwind-config` — Shared tooling configs

## Commands

```bash
# From repo root (runs all apps via Turbo)
npm run dev          # Start all apps in watch mode
npm run build        # Build all apps
npm run lint         # ESLint (max-warnings 0 enforced)
npm run check-types  # TypeScript type checking
npm run format       # Prettier format

# Per-app dev (from apps/<name>/)
npm run dev          # api/dashboard-backend: tsx watch; Next.js apps: next dev
npm run build        # api/dashboard-backend: tsc; Next.js: next build
```

There is no test framework configured. Validate changes with `npm run lint` and `npm run check-types`.

## Auth Flow Architecture

1. User visits protected route → `withAuthMiddleware` in `next-sdk` checks for `refreshToken` cookie → redirects to `auth-portal` if absent
2. User logs in at `auth-portal` (password, OTP, Google, or GitHub) → `api` issues an **authorization code**
3. `auth-portal` redirects to the app's configured `redirect_uri` with `?code=...`
4. `AuthenticateWithRedirectCallback` component calls `POST /api/auth/token` (the app's own route)
5. That route uses `createAuthCallbackHandler` → calls `api/api/auth/token` → exchanges code for `accessToken` + `refreshToken`
6. Both tokens are set as `httpOnly` cookies (`secure: true`, `sameSite: none`)

**Token details**: RS256, issuer `https://auth.deepxdev.com`. Access tokens expire in 10 minutes, refresh tokens in 14 days. Per-app signing keys stored in MongoDB (`signingkey` model). JWKS served at `GET /.well-known/jwks.json`.

## Data Models (api)

- `User` — global identity with a `globalUserId` (`USR-<hex>`) shared across all apps
- `App` — registered application with `clientId`, hashed `clientSecret` (bcrypt), `redirectUris[]`, `signingKeyId`
- `MemberShip` — links a User to an App with `provider[]` (`password`, `google`, `github`) and optional `passwordHash`
- `Session` — stores token pair per user/app; TTL index on `expiresAt`; `revokedAt` for explicit logout
- `AuthorizationCode` — short-lived one-time code for the OAuth exchange
- `SignInKey` — RSA key pair (PEM strings) per app; `isActive` flag

## Event-Driven Sync (RabbitMQ)

When `api` creates or updates a global `User`, it publishes to a `user_exchange` (topic) with routing keys `user.create` / `user.update`. `dashboard-backend` consumes these via `user_exchange` to keep its own user replica in sync. This is the only cross-service communication path.

## Code Conventions

- **TypeScript ES modules**: all source uses `"type": "module"`. Internal imports must use `.js` extensions even for `.ts` source files (e.g., `import { AppError } from "../../utils/appError.js"`).
- **Async handling in Express**: wrap route handlers with `asyncHandler()` from `utils/helpers.ts` — it forwards thrown errors to Express's error middleware.
- **Errors**: throw `AppError(message, statusCode)` in service layer; `errorMiddleware` catches and formats the response.
- **Feature folder pattern** in Next.js apps: `features/<domain>/components/`, `features/<domain>/hooks/mutation|query/`, `features/<domain>/service/`, `features/<domain>/types/` — with a barrel `index.ts` at the feature root.
- Client components need `"use client"` directive. Server components call `auth()` or `currentUser()` from `@myauth/next` directly.

## Environment Variables

Key vars (see `.env.example` for SMTP subset):

| Variable | Used by | Purpose |
|---|---|---|
| `PORT` | api, dashboard-backend | Server port |
| `MONGO_URI` | api, dashboard-backend | MongoDB connection |
| `RABBITMQ_URL` | api, dashboard-backend | RabbitMQ broker |
| `GOOGLE_CLIENT_ID` | api | Google OAuth |
| `ALLOWED_ORIGINS` | api | Comma-separated CORS origins |
| `ALLOWED_ORIGIN` | dashboard-backend | Single CORS origin |
| `NEXT_PUBLIC_CLIENT_ID` | dashboard | Public client ID for middleware |
| `CLIENT_ID` / `CLIENT_SECRET` | dashboard | Server-side token exchange |

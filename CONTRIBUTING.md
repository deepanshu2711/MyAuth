# Contributing to MyAuth

Thanks for your interest in contributing! MyAuth is a Turborepo monorepo (npm workspaces) — this guide covers how to get it running locally and how to submit changes.

## Prerequisites

- Node.js 18+
- npm 11 (`packageManager` is pinned to `npm@11.4.2`)
- A local or hosted MongoDB instance
- A local or hosted Redis instance
- A local or hosted RabbitMQ instance

There's no `docker-compose.yml` in the repo yet — run MongoDB/Redis/RabbitMQ yourself (locally installed, Docker containers, or hosted free tiers) and point the env vars below at them.

## Setup

```bash
git clone https://github.com/deepanshu2711/MyAuth.git
cd MyAuth
npm install
```

Copy the example env file for each app you plan to run and fill in the values:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/dashboard/.env.example apps/dashboard/.env
cp apps/auth-portal/.env.example apps/auth-portal/.env
```

`apps/nest-api` doesn't have an `.env.example` yet — check `apps/nest-api/src` for the env vars it reads (currently just `PORT`).

Google/GitHub OAuth vars require creating OAuth apps with those providers; SMTP vars are needed for OTP email delivery. You can leave those blank if you're not touching that code path.

## Running the project

```bash
npm run dev          # runs every app in watch mode via Turbo
```

Or run a single app from its directory (`apps/<name>/`):

```bash
npm run dev          # api: tsx watch; nest-api: nest start --watch; Next.js apps: next dev
```

## Before opening a PR

```bash
npm run lint         # ESLint, max-warnings 0 enforced
npm run check-types  # TypeScript across all workspaces
npm run format       # Prettier
```

All three must pass. `apps/nest-api` also has Jest (`npm run test`, `npm run test:e2e` from within `apps/nest-api/`) — add/update tests there if you touch that app. Other apps have no test suite yet, so lint + type-check are the bar.

## Branch naming

Match the existing pattern seen in merged PRs:

- `feature/<short-description>` for new functionality
- `fix/<short-description>` for bug fixes

## Commit messages

The history loosely follows a `type: description` style (`feat:`, `fix:`, `ref:`, `chore:`). It isn't strictly enforced, but please keep messages short and descriptive of the *why*, not just the *what*.

## Code conventions

See `CLAUDE.md` and `AGENTS.md` at the repo root for the conventions this codebase follows (ES module `.js` import extensions, `asyncHandler`/`AppError` patterns in the API, the feature-folder structure in the Next.js apps, etc.). Following these keeps PRs consistent with the rest of the codebase.

## Opening a PR

1. Fork the repo (or push a branch if you have write access) and open a PR against `main`.
2. Describe what changed and why — link any related issue.
3. Keep PRs focused. Unrelated refactors or formatting-only changes bundled into a feature PR make review slower.
4. A maintainer will review and may ask for changes before merging.

## Reporting bugs / requesting features

Open a [GitHub issue](https://github.com/deepanshu2711/MyAuth/issues) with as much detail as you can: which app is affected, steps to reproduce, expected vs. actual behavior.

# MyAuth — V1 Roadmap & Positioning

> **Mission:** Build a lightweight, developer-first authentication service designed _specifically_ for **Next.js App Router**.
>
> **Launch date:** **March 1**

---

## 🚀 Product Positioning (Locked)

**MyAuth is NOT a generic auth platform.**

> **MyAuth is authentication built natively for Next.js App Router — simple, cookie-first, and developer-first.**

### Explicit positioning

- ✅ Next.js App Router only (V1)
- ✅ Cookie-based sessions
- ✅ Server Components friendly
- ✅ Edge-compatible middleware

### Explicit non-goals (V1)

- ❌ React Native / Mobile
- ❌ Vue / Svelte / Remix
- ❌ Enterprise SSO
- ❌ Organizations / Teams
- ❌ Advanced RBAC

---

## 🧱 V1 Feature Scope (Frozen)

### Core Authentication

- User sign up / sign in
- Session-based authentication
- Short-lived access tokens (JWT)
- Long-lived refresh tokens (HTTP-only cookies)
- Logout (session revocation)

### Multi-App Support

- Create multiple apps per account
- App-level isolation
- One signing key per app
- JWT claims:
  - `iss` (issuer)
  - `aud` (app ID)
  - `sub` (user ID)

### Security

- HTTP-only cookies
- CSRF-safe OAuth state (`__myauth_state`)
- Token expiration handling
- Strict app token validation

---

## ⚙️ Next.js SDK (@myauth/next) — V1 API

### Server-side helpers

```ts
auth(): AuthSession | null
currentUser(): User | null
requireAuth(): AuthSession
```

### Middleware

```ts
withAuth(options?): Middleware
```

- Protect routes
- Handle redirects
- Edge-compatible

### Client hooks (minimal)

```ts
useUser(): { user, isLoading }
```

---

## 🧪 What V1 Will NOT Include

These are _explicitly postponed_:

- ❌ Organizations / Teams
- ❌ Role-based access control
- ❌ Key rotation UI
- ❌ Analytics / charts
- ❌ Billing & payments
- ❌ WebAuthn / Passkeys
- ❌ Dozens of OAuth providers

---

## 🗓️ Launch Roadmap (Now → March 1)

### Phase 1 — Core Auth (Week 1–2)

**Goal:** Auth works correctly & securely

- User model
- Session model
- Token issuing & verification
- Refresh flow
- Logout
- App isolation

---

### Phase 2 — Next.js DX (Week 3–4)

**Goal:** Feels native in App Router

- Server helpers
- Middleware protection
- Redirect handling
- Edge compatibility

---

### Phase 3 — Minimal Dashboard (Week 5)

**Goal:** Self-serve onboarding

- Create app
- Get keys
- View users
- View sessions

---

### Phase 4 — Docs & Launch (Week 6)

**Goal:** Anyone can start in 15 minutes

- README
- Quick start guide
- Example Next.js app
- Known limitations

---

## 📦 V1 Success Criteria (March 1)

V1 is considered **successful** if:

- A fresh Next.js app can integrate MyAuth without hacks
- Auth works reliably across reloads
- Middleware protection is predictable
- Docs are understandable
- You would personally use it again

---

## 💰 Monetization (Decision Only — Not Built Yet)

### Planned path

- Free tier (generous limits)
- Paid tier later:
  - Higher limits
  - Logs
  - Priority support

No billing code will be written before launch.

---

## 🧠 Founder Commitment Rule

> Until March 1:
>
> - No scope expansion
> - No redesigns
> - No framework support discussions

**Ship first. Improve later.**

---

## ✅ Status

- [ ] Core auth
- [ ] Next.js SDK
- [ ] Dashboard
- [ ] Docs
- [ ] Public launch

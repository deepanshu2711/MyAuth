# MyAuth — V2 Roadmap & Positioning

> **Mission:** V1 proved MyAuth works for _one developer, one app_. V2 makes it usable by **teams shipping real products to real customers** — without losing the "no magic, you own your auth" philosophy.
>
> **Theme:** **Production & Teams**
>
> **Target:** ~16 weeks (suggested lock: **September 1, 2026**)

---

## 🚀 Product Positioning (V2)

**Positioning does NOT change. The audience matures.**

> **MyAuth is authentication built natively for Next.js App Router — now production-grade, with teams, roles, and the operational tooling serious products need.**

### Still true (do not break)

- ✅ Next.js App Router first
- ✅ Cookie-first, Server Components friendly
- ✅ Self-hostable, low lock-in
- ✅ "We teach auth, we don't hide it"

### New in V2 positioning

- ✅ Multi-tenant: organizations & teams inside a customer's app
- ✅ Role-based access control
- ✅ Operationally observable (webhooks, audit logs, analytics)
- ✅ A real paid product (billing live)

### Explicit non-goals (still postponed → V3)

- ❌ WebAuthn / Passkeys
- ❌ SAML / Enterprise SSO
- ❌ Multi-framework (Remix, SvelteKit, plain React, Vue/Svelte)
- ❌ React Native / mobile SDK
- ❌ Fully self-serve white-label / custom domains
- ❌ Plugin/marketplace system

**Founder discipline rule still applies:** anything not in the V2 scope below is a V3 conversation, not a V2 PR.

---

## 🧱 V2 Feature Scope (Frozen)

### 1. Webhooks & Events (designed in `TODO.md`)

- App settings → **Webhooks** tab: configure URL + select events
- Async delivery via existing **RabbitMQ** infrastructure (delivery worker)
- HMAC-signed payloads with a per-webhook secret (`whsec_…`)
- Retry with backoff + delivery log (success/failure, last attempt)
- Events: `user.created`, `user.updated`, `user.deleted`, `user.login`, `user.logout`, `password.changed`, `email.verified`
- New `Webhook` model: `{ appId, url, events[], secret, isActive }`

### 2. Organizations & Teams

- New `Organization` model (scoped under an `App`)
- `OrgMembership` linking `User` ↔ `Organization` with a role
- Invitations: email invite → accept flow → join org
- Org switching (active org per session)
- **Backward compatible:** orgs are opt-in; V1 apps with no orgs keep working unchanged

### 3. RBAC & Permissions

- Built-in roles per org: `owner`, `admin`, `member` (extensible)
- Optional custom roles + permission strings (`app:permission`)
- New JWT claims: `org_id`, `org_role`, `roles[]` / `permissions[]`
- Server + middleware enforcement helpers (see SDK section)

### 4. Billing & Plan Enforcement (build the `TODO.md` pricing)

- **Stripe** integration: checkout, customer portal, Stripe webhooks
- Plans live: **Free $0 / Basic $9 / Pro $29**
- Enforce limits: apps per account, users per app, request rate limits
- Graceful degradation when limits hit (clear errors, not silent failure)

### 5. Security & Trust

- **MFA via TOTP** (authenticator app) — enroll, verify, recovery codes
- **Audit logs** — security-relevant events per app, retention by plan
- **Rate limiting** — Redis-backed, per-app/per-plan (also powers billing limits)
- **Signing key rotation UI** — create/rotate/retire keys; JWKS serves old + new during the overlap window
- **IP allowlisting** (Pro) for app API access

### 6. Analytics & DX Polish

- Dashboard analytics: login trends, active users, signups, provider breakdown
- Expanded SDK surface (see below) + prebuilt components
- Docs refresh covering orgs, roles, webhooks, billing

---

## ⚙️ Next.js SDK (@myauth/next) — V2 API Additions

### Server-side helpers (additive)

```ts
auth(): AuthSession | null          // now includes orgId, orgRole, roles[]
currentUser(): User | null
currentOrg(): Organization | null   // new
requireAuth(): AuthSession
has({ role?, permission? }): boolean // new — RBAC check
protect({ role?, permission? }): AuthSession // new — throws/redirects if unauthorized
```

### Middleware

```ts
withAuthMiddleware(clientId, {
  publicRoutes?,            // existing
  requireRole?,             // new
  requirePermission?,       // new
  orgRequired?,             // new
})
```

### Client hooks & components

```ts
useUser(); // existing
useSession(); // new
useAuth(); // new — { has(), signOut() }
useOrganization(); // new — active org + role
useOrganizationList(); // new — switch orgs
```

- `<UserButton />` — shipped late V1, polish in V2
- `<OrganizationSwitcher />` — new
- `<SignedIn>` / `<SignedOut>` / `<Protect role|permission>` — new

**Compatibility:** all V1 APIs keep their V1 signatures. New fields are added, none removed. Token format extended, not changed.

---

## 🗓️ V2 Roadmap (6 Phases, ~16 weeks)

### Phase 1 — Webhooks & Rate Limiting (Week 1–3)

**Goal:** Developers can react to auth events; foundation for plan limits.

- `Webhook` model + settings UI
- Delivery worker on RabbitMQ, HMAC signing, retries, delivery log
- Redis-backed rate limiter (used later by billing)

_Lowest risk, reuses existing RabbitMQ/Redis — good momentum starter._

---

### Phase 2 — Organizations & Teams (Week 4–7)

**Goal:** Multi-tenant accounts that don't break V1 apps.

- `Organization` + `OrgMembership` models
- Invitation flow (invite → email → accept)
- Org switching + active-org session state
- Dashboard: org management screens

---

### Phase 3 — RBAC & Permissions (Week 8–9)

**Goal:** Roles enforced everywhere — token, server, middleware.

- Roles/permissions model + new JWT claims
- SDK: `has()`, `protect()`, `<Protect>`, middleware role options
- Dashboard: role assignment UI

---

### Phase 4 — Billing & Plan Enforcement (Week 10–12)

**Goal:** MyAuth is a real paid product.

- Stripe checkout + customer portal + Stripe webhooks
- `Subscription` / `Plan` models
- Enforce app/user/rate limits per plan with clear error surfaces

---

### Phase 5 — Security & Trust (Week 13–14)

**Goal:** Pass a security-conscious buyer's checklist.

- TOTP MFA: enroll, verify, recovery codes
- Audit logs + dashboard viewer
- Signing key rotation UI (JWKS overlap window)
- IP allowlisting (Pro)

---

### Phase 6 — Analytics, DX Polish & Launch (Week 15–16)

**Goal:** Anyone can adopt the new capabilities in 15 minutes.

- Analytics dashboard (login trends, active users, provider mix)
- SDK component polish + barrel exports
- Docs: orgs, roles, webhooks, billing, migration guide
- Example app updated with orgs + roles
- V2 public launch

---

## 📦 V2 Success Criteria

V2 is **successful** if:

- A V1 app upgrades to V2 with **zero breaking changes**
- A team can create an org, invite members, and assign roles end-to-end
- A developer can register a webhook and receive a verified, signed event
- A user can pay, hit a plan limit, and get a clear, actionable error
- Audit logs answer "who did what, when" for any app
- Signing keys can be rotated with **no downtime** for live tokens

---

## 💰 Monetization (Now Built — not just decided)

- Free / Basic / Pro plans go **live** with Stripe (Phase 4)
- Limits are **enforced**, not advisory
- Self-host stays free and unlimited — managed tier is what's billed
- White-labeling, SLAs, SAML remain **V3** (listed in Pro as "future" — keep them there)

---

## 🧠 Founder Commitment Rule (V2)

> Until launch:
>
> - No new frameworks
> - No passkeys / SAML creep
> - No redesigns of V1 surfaces that already work
> - Every PR maps to a phase above

**V1 shipped by saying no. V2 ships the same way.**

---

## ✅ Status

- [ ] Webhooks & rate limiting
- [ ] Organizations & teams
- [ ] RBAC & permissions
- [ ] Billing & plan enforcement
- [ ] Security & trust (MFA, audit logs, key rotation)
- [ ] Analytics, DX polish & docs
- [ ] V2 public launch
      </content>
      </invoke>

# MyAuth

Authentication built natively for Next.js App Router — simple, cookie-first, and developer-first.

## Why MyAuth?

MyAuth is a backend-first authentication system designed specifically for Next.js App Router. It gives you **control** over sessions and tokens without the magic or vendor lock-in of other auth providers.

### The Problem with Most Auth Solutions

- Hidden token handling that breaks in production
- Vendor lock-in that makes migration painful
- Heavy UI components that don't match your design
- abstracted sessions that are hard to debug

### MyAuth Approach

- **HTTP-only cookies** — Sessions stored securely in httpOnly cookies, never in localStorage
- **Server-first** — Auth logic lives on the server, not in your client bundle
- **Predictable** — No magic. What you see is what runs in production
- **Self-hostable** — Your auth, your infrastructure

## Features

- **Cookie-based sessions** — Secure, httpOnly, CSRF-safe
- **JWT access tokens** — Short-lived, signed with RS256
- **Refresh token rotation** — Automatic token refresh with secure rotation
- **OAuth providers** — Google, GitHub (more coming)
- **Email OTP** — Passwordless login via one-time codes
- **Route protection** — Edge-compatible middleware
- **Server helpers** — `auth()`, `currentUser()`, `requireAuth()` in Server Components
- **Client hooks** — `useAuth()`, `useUser()` for React components

## Quick Start

### 1. Create a Next.js App

```bash
npx create-next-app@latest my-app
cd my-app
```

### 2. Install MyAuth

```bash
npm install @myauth/next
```

### 3. Get Your Credentials

1. Sign up at [myauth.com](https://myauth.com)
2. Create an application in the dashboard
3. Copy your `CLIENT_ID` and `CLIENT_SECRET`

### 4. Configure Environment

```env
# .env.local

# Public (safe for browser)
NEXT_PUBLIC_CLIENT_ID=your_client_id

# Server-only (never expose to client)
CLIENT_SECRET=your_client_secret
```

### 5. Protect Routes with Middleware

Create `middleware.ts` in your project root:

```typescript
import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### 6. Add AuthProvider

Wrap your app in `app/layout.tsx`:

```tsx
import { AuthProvider } from "@myauth/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 7. Create Callback Page

Create `app/callback/page.tsx`:

```tsx
import { AuthenticateWithRedirectCallback } from "@myauth/next";

export default function CallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
```

### 8. Token Exchange Route

Create `app/api/auth/token/route.ts`:

```typescript
import { createAuthCallbackHandler } from "@myauth/next";

export const POST = createAuthCallbackHandler({
  clientId: process.env.CLIENT_SECRET!, // Note: use CLIENT_ID here
  clientSecret: process.env.CLIENT_SECRET!,
});
```

## Usage

### Server-Side: Get Current User

```tsx
import { auth } from "@myauth/next";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {session.user.email}!</div>;
}
```

### Client-Side: Use Auth Hook

```tsx
import { useAuth } from "@myauth/next";

export default function Header() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <header>
      {user ? (
        <>
          <span>Welcome, {user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  );
}
```

### Protect Specific Routes

```typescript
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/api/protected/:path*"],
};
```

## API Reference

### Server Functions

| Function        | Description                              |
| --------------- | ---------------------------------------- |
| `auth()`        | Get current session in Server Components |
| `currentUser()` | Get current user with full profile       |
| `requireAuth()` | Get session or throw error               |

### Client Hooks

| Hook        | Description                                        |
| ----------- | -------------------------------------------------- |
| `useAuth()` | Access user, loading state, login/logout functions |
| `useUser()` | Shorthand for user object with loading state       |

### Middleware

| Function                      | Description                        |
| ----------------------------- | ---------------------------------- |
| `withAuthMiddleware(options)` | Protect routes with route matching |

### Components

| Component                          | Description                  |
| ---------------------------------- | ---------------------------- |
| `AuthProvider`                     | React context for auth state |
| `AuthenticateWithRedirectCallback` | Handle OAuth callback        |

## Security

- **HTTP-only cookies** — Refresh tokens never exposed to JavaScript
- **CSRF protection** — OAuth state parameter prevents cross-site attacks
- **Token rotation** — Each refresh generates new token pair
- **Short-lived access tokens** — 15 minute expiry by default
- **Secure signing** — RS256 JWTs with per-app signing keys

## When to Choose MyAuth

Choose MyAuth if:

- You're using Next.js App Router
- You care about auth correctness
- You want control over sessions & tokens
- You prefer server-side auth over client-side magic
- You want to avoid vendor lock-in

Choose a different solution if:

- You need auth in 10 minutes flat
- You want pre-built UI components
- You don't care about implementation details

## Comparison

|                 | MyAuth             | Clerk           | Auth0           |
| --------------- | ------------------ | --------------- | --------------- |
| Framework focus | Next.js App Router | Multi-framework | Multi-framework |
| UI components   | Minimal            | Heavy           | None            |
| Token model     | JWT, you control   | Abstracted      | Abstracted      |
| Self-hostable   | Yes                | No              | Enterprise only |
| Vendor lock-in  | Low                | High            | Medium          |
| Pricing         | Free tier          | Paid at scale   | Enterprise      |

## Documentation

- [Quick Start Guide](https://myauth.com/docs/nextjs)
- [SDK Reference](https://myauth.com/docs/nextjs/sdk-reference)
- [API Reference](https://myauth.com/docs/api)

## Support

- GitHub Issues: https://github.com/myauth/myauth/issues
- Discord: https://discord.gg/myauth

## License

MIT

# MyAuth for Next.js — Documentation (v1.0.0)

MyAuth provides a secure, explicit, and production-ready authentication flow for Next.js (App Router). This guide helps you integrate MyAuth into a Next.js application with clear server/client boundaries and no hidden magic.

---

## What You’ll Build

- Login via the MyAuth portal
- Secure token exchange
- `httpOnly` refresh token cookie
- Protected routes using middleware
- App-wide auth state via `AuthProvider`

> **Design goal:** Auth should be boring, predictable, and easy to debug.

---

## Requirements

- Node.js 18+
- Next.js 13+ (App Router)
- A MyAuth account

---

## Quick Start

### 1. Create a Next.js App

```bash
npx create-next-app@latest my-app
cd my-app
```

Ensure **App Router** is enabled.

---

### 2. Install MyAuth

```bash
npm install @myauth/next
```

---

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
# Public (safe for browser)
NEXT_PUBLIC_CLIENT_ID=your_public_client_id

# Server-only
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret

# MyAuth services
AUTH_PORTAL_BASE_URL=https://auth.example.com
API_BASE_URL=https://api.example.com
```

> 🔐 Get `CLIENT_ID` and `CLIENT_SECRET` from the **MyAuth Dashboard**.

---

### 4. Protect Routes with Middleware

Create `middleware.ts` in the project root:

```ts
import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

**What this does**

- Protects `/dashboard` and all subroutes
- Redirects unauthenticated users to the MyAuth portal
- Does **not** affect `/`, `/callback`, or public pages

---

### 5. Wrap Your App with `AuthProvider`

In `app/layout.tsx`:

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

This enables access to auth state across your app.

---

### 6. Add the OAuth Callback Page

Create `app/callback/page.tsx`:

```tsx
import { AuthenticateWithRedirectCallback } from "@myauth/next";

export default function CallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
```

This page completes the OAuth flow after redirecting back from MyAuth.

---

### 7. Create the Token Exchange API Route

Create `app/api/auth/token/route.ts`:

```ts
import { createAuthCallbackHandler } from "@myauth/next";

export const POST = createAuthCallbackHandler({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
});
```

**What this does**

- Exchanges the authorization code for tokens
- Sets a secure `httpOnly` refresh token cookie
- Returns an access token to the client

---

## Minimal Setup Checklist

If you only want protected routes and login:

- Middleware
- Callback page
- Token exchange route

---

## Common Use Cases

### Protect Additional Routes

```ts
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
```

---

### Public vs Protected Pages

- Public: `/`, `/login`, `/about`
- Protected: `/dashboard/*`

Only matched routes run middleware.

---

## Security Notes

- Never expose `CLIENT_SECRET` to the browser
- Refresh tokens are stored in `httpOnly` cookies
- Middleware runs before requests hit your routes

---

## Troubleshooting

### Redirect Loop

- Ensure `/callback` is **not** protected by middleware
- Verify `AUTH_PORTAL_BASE_URL` is correct

### Token Errors

- Check `CLIENT_ID` and `CLIENT_SECRET`
- Confirm `API_BASE_URL` is reachable

---

## Versioning

- **v1.0.0** — Core auth flow, middleware, callback handling

Planned (v1.1+):

- Logout helper
- Session endpoint (`/me`)
- Improved edge verification

---

## Support

If you get stuck:

- Check the troubleshooting section
- Review logs in your Next.js server
- Contact the MyAuth team

---

Auth should now feel boring — which means it’s working ✔️

---

# Next.js SDK API Reference

This reference covers all exports from `@myauth/next` package v1.1.1.

## Table of Contents

- [Client Components](#client-components)
- [Server Functions](#server-functions)
- [Hooks](#hooks)
- [Middleware](#middleware)
- [Types](#types)

## Client Components

### `AuthProvider`

A React context provider that manages authentication state across your Next.js app.

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
        <AuthProvider clientId="your-client-id">{children}</AuthProvider>
      </body>
    </html>
  );
}
```

**Props:**

- `children: React.ReactNode` - Child components
- `clientId: string` - Your MyAuth client ID
- `initialSession?: Session` - Optional initial session data

### `AuthenticateWithRedirectCallback`

A component that handles the OAuth callback after users return from the MyAuth portal.

```tsx
import { AuthenticateWithRedirectCallback } from "@myauth/next";

export default function CallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
```

This component automatically:

- Extracts the authorization code from URL parameters
- Calls your token exchange API route
- Redirects to the home page on success
- Displays a loading spinner during authentication

## Server Functions

### `auth()`

Server-side function to get the current session from cookies or headers.

```ts
import { auth } from "@myauth/next";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return <div>Welcome, {session.user.email}!</div>;
}
```

**Returns:** `Promise<Session | null>`

- `Session` contains `user` and `token` properties
- Returns `null` if no valid session exists

### `createAuthCallbackHandler(config)`

Creates a Next.js API route handler for token exchange.

```ts
import { createAuthCallbackHandler } from "@myauth/next";

export const POST = createAuthCallbackHandler({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
});
```

**Parameters:**

- `config.clientId: string` - Your MyAuth client ID
- `config.clientSecret: string` - Your MyAuth client secret

**Returns:** Next.js API route handler function

This handler:

- Accepts POST requests with `code` in the request body
- Exchanges the code for access and refresh tokens
- Sets an `httpOnly` cookie with the refresh token
- Returns the access token in the response

## Hooks

### `useAuth()`

React hook to access authentication state and methods.

```tsx
import { useAuth } from "@myauth/next";

export default function Header() {
  const { user, loading, logout, login } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <span>Welcome, {user.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

**Returns:** `AuthState`

- `user: User | null` - Current user object or null
- `token: string | null` - Current access token or null
- `loading: boolean` - Whether authentication operations are in progress
- `logout(): Promise<void>` - Function to log out the current user
- `login(): Promise<void>` - Function to redirect to login

## Middleware

### `withAuthMiddleware(clientId)`

Creates Next.js middleware to protect routes.

```ts
import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware(process.env.NEXT_PUBLIC_CLIENT_ID!);

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

**Parameters:**

- `clientId: string` - Your public MyAuth client ID

**Returns:** Next.js middleware function

This middleware:

- Checks for a valid refresh token in cookies
- Redirects unauthenticated users to the MyAuth login portal
- Allows authenticated requests to proceed

## Utility Functions

### `getSessionToken()`

Gets the current session token stored internally.

```ts
import { getSessionToken } from "@myauth/next";

const token = getSessionToken();
// Returns the current access token or null
```

**Returns:** `string | null` - Current access token

## Types

### `User`

```ts
type User = {
  email: string;
};
```

### `AuthState`

```ts
type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: () => Promise<void>;
};
```

### `Session`

```ts
type Session = {
  user: User | null;
  token: string | null;
};
```

## Environment Variables

The SDK requires these environment variables:

```env
# Public (safe for browser)
NEXT_PUBLIC_CLIENT_ID=your_public_client_id

# Server-only (keep secret)
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
```

## Error Handling

The SDK throws errors in these scenarios:

- Missing `AuthProvider` when using `useAuth()`
- Invalid tokens in middleware
- Failed token exchange in callback handler
- Network errors during authentication

Always wrap authentication calls in try-catch blocks for production apps.

## Security Notes

- Client secrets are never exposed to the browser
- Refresh tokens are stored in `httpOnly` cookies
- Access tokens should be validated on each request
- Always use HTTPS in production

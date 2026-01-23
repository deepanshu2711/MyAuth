# @myauth/next

Next.js SDK for MyAuth authentication service

## Installation

```bash
npm install @myauth/next
```

## Usage

### Middleware Protection

Protect your routes using the middleware:

```typescript
// middleware.ts
import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware("your-client-id");
```

### Server-Side Authentication

Get the current session on the server:

```typescript
import { auth } from "@myauth/next";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {session.user.email}!</div>;
}
```

### Getting Current User

Get the current user directly:

```typescript
import { currentUser } from "@myauth/next";

export default async function UserProfile() {
  const user = await currentUser();

  if (!user) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user.email}!</div>;
}
```

### Client-Side Authentication

Wrap your app with the AuthProvider and use the useAuth hook:

```tsx
// app/layout.tsx
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

// components/MyComponent.tsx
import { useAuth } from "@myauth/next";

export function MyComponent() {
  const { user, login, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

### Using the useUser Hook

Access the current user and loading state with a simpler hook:

```tsx
import { useUser } from "@myauth/next";

export function UserDisplay() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? <p>Current user: {user.email}</p> : <p>No user logged in</p>}
    </div>
  );
}
```

### Authentication Callback Handler

Handle authentication callbacks in your API routes:

```typescript
// app/api/auth/callback/route.ts
import { createAuthCallbackHandler } from "@myauth/next";

export const GET = createAuthCallbackHandler({
  successRedirect: "/",
  failureRedirect: "/login",
});
```

### Authentication with Redirect Callback Component

For pages that handle redirects:

```tsx
// app/auth/callback/page.tsx
import { AuthenticateWithRedirectCallback } from "@myauth/next";

export default function AuthCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
```

## API Reference

### Server Functions

- `auth()` - Returns the current session or null
- `currentUser()` - Returns the current user or null
- `createAuthCallbackHandler(options)` - Creates a handler for auth callbacks
- `getSessionToken()` - Gets the session token

### Client Components

- `AuthProvider` - React context provider for authentication
- `useAuth()` - Hook to access authentication state and methods
- `useUser()` - Hook to access the current user and loading state
- `AuthenticateWithRedirectCallback` - Component for handling auth redirects

### Middleware

- `withAuthMiddleware(clientId)` - Creates middleware to protect routes

## Types

```typescript
type User = {
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: () => Promise<void>;
};

type Session = {
  user: User | null;
  token: string | null;
};
```

## License

ISC</content>
<parameter name="filePath">packages/next-sdk/README.md

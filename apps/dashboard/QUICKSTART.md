# Quickstart Guide: Integrating MyAuth with Next.js

## Setup

### 1. Create a Next.js Application

Create a new Next.js application using the App Router (recommended for Next.js 13+):

```bash
npx create-next-app@latest myauth-app
```

### 2. Install the SDK

Install the MyAuth package:

```bash
npm i @myauth/next
```

### 3. Configure Environment Variables

- Get or create an app from the MyAuth dashboard after logging in.
- Set the following environment variables in your `.env.local` file:

```env
NEXT_PUBLIC_CLIENT_ID=your_public_client_id
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
```

## Protect Routes

### 4. Add Middleware

Create a `middleware.ts` file in the root of your app to protect routes:

```typescript
import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware(process.env.NEXT_PUBLIC_CLIENT_ID!);

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

## Handle Authentication

### 5. Add AuthProvider

Wrap your root layout with `AuthProvider` and pass the initial session:

```typescript
import { AuthProvider } from "@myauth/next";

export default async function RootLayout({ children }) {
  const session = await auth(); // Assuming auth function from @myauth/next
  return (
    <html>
      <body>
        <AuthProvider initialSession={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 6. Create Callback Page

Add a `/callback` page at `app/callback/page.tsx`:

```typescript
import { AuthenticateWithRedirectCallback } from "@myauth/next";

export default function Page() {
  return <AuthenticateWithRedirectCallback />;
}
```

### 7. Create Token Exchange Route

Create an API route at `app/api/auth/token/route.ts` for token exchange:

```typescript
import { createAuthCallbackHandler } from "@myauth/next";

export const POST = createAuthCallbackHandler({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
});
```

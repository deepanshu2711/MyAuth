1. Integrate Github OAuth
2. For nextjs integration include everything in @myauth/nextjs
3. Make a pricing section in landing page (DONE)
4. Implement Email login with OTP on email
5. webhook logic

PRICING PLANS

Free Plan ($0/month)

- Apps: 1 app per account
- Users per App: 100 users
- Integrations: Email/password login, Google OAuth, basic JWT tokens
- SDKs: Node.js and Next.js SDKs
- Security: Standard hashing, token refresh
- Support: Community forums (no direct support)
- Analytics: Basic usage stats
- Limitations: No custom branding, rate limits (e.g., 1k requests/day)

Basic Plan ($9/month)

- Apps: 5 apps per account
- Users per App: 1,000 users
- Integrations: All Free features + GitHub OAuth, email OTP login (when implemented)
- SDKs: All Free SDKs + webhook support for events
- Security: All Free + custom redirect URIs, token expiration settings
- Support: Email support (24-48 hour response)
- Analytics: Enhanced stats (login trends, user activity)
- Limitations: No white-labeling, moderate rate limits (e.g., 10k requests/day)

Pro Plan ($29/month)

- Apps: Unlimited apps
- Users per App: Unlimited users
- Integrations: All Basic features + SAML/SSO options (future), advanced OAuth scopes
- SDKs: All Basic SDKs + enterprise integrations (e.g., custom middleware)
- Security: All Basic + audit logs, IP whitelisting, custom token signing
- Support: Priority email/phone support (4-hour response), dedicated account manager
- Analytics: Full dashboards (real-time monitoring, exportable reports)
- Extras: White-labeling (custom branding), API rate limits removed, SLA guarantees

WEBHOOK LOGIC

webhook must be async

Ask user to configure a webhook url for there app in app settings
In app settings → Webhooks
Webhook URL
Select events (checkboxes)

user.created (signup / register)
user.updated
user.deleted
user.login
user.logout
password.changed
email.verified

You generate a webhook secret (very important) => api backend will
webhook create a seperate table for it
{
"\_id": "wh_123",
"appId": "app_123",
"url": "https://example.com/webhooks/auth",
"events": ["user.created", "user.login"],
"secret": "whsec_8k29sldk"
}

Integrating steps for nextjs

## Setup

1. Create a Next.js app
2. Install the SDK
3. Configure environment variables

## Protect Routes

4. Add middleware

## Handle Authentication

5. Add AuthProvider
6. Create callback page
7. Create token exchange route

8. Create a Next.js application (using npx create-next-app@latest or similar, with App Router enabled for Next.js 13+).
9. Install the MyAuth package: npm i @myauth/next
10. Add client ID and client secret to environment variables:
    - Get or create an app from the MyAuth dashboard after logging in.
    - Set NEXT_PUBLIC_CLIENT_ID (public), CLIENT_ID, and CLIENT_SECRET in your .env.local file.
11. Create a middleware.ts file in the root of your app:
    import { withAuthMiddleware } from "@myauth/next";
    export default withAuthMiddleware(process.env.NEXT_PUBLIC_CLIENT_ID!);
    export const config = {
    matcher: ["/dashboard/:path*"],
    };
12. Wrap your root layout with AuthProvider and pass the initial session:
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
13. Add a /callback page at app/callback/page.tsx:
    import { AuthenticateWithRedirectCallback } from "@myauth/next";
    export default function Page() {
    return <AuthenticateWithRedirectCallback />;
    }
14. Create an API route at app/api/auth/token/route.ts:
    import { createAuthCallbackHandler } from "@myauth/next";
    export const POST = createAuthCallbackHandler({
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    });

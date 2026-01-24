import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../providers";
import { MainLayout } from "../layouts/MainLayout";
import { auth } from "@myauth/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "MyAuth Dashboard",
  description:
    "Manage your authentication applications, users, and settings with MyAuth Dashboard. A comprehensive admin interface for the MyAuth authentication system.",
  keywords: [
    "authentication",
    "dashboard",
    "oauth",
    "user management",
    "app management",
  ],
  authors: [{ name: "Deepanshu Saini" }],
  icons: {
    icon: "/x.png",
    shortcut: "/x.png",
  },
  openGraph: {
    title: "MyAuth Dashboard",
    description:
      "Manage your authentication applications and users with MyAuth Dashboard",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyAuth Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyAuth Dashboard",
    description:
      "Manage your authentication applications and users with MyAuth Dashboard",
    images: ["/og-image.png"],
    creator: "@DeepanshuS7943",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); //

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black`}>
        <Providers initialSession={session}>{children}</Providers>
      </body>
    </html>
  );
}

//NOTE: crete a dashboard integration page or lab in landing page

// Steps to Integrate MyAuth into a Third-Party Application
// MyAuth is an authentication system with multiple components: a dashboard for managing apps, an API backend for auth endpoints, and an auth-portal for login UI. It follows an OAuth-like flow where third-party apps register as "applications" to get client credentials and handle user authentication.
// To integrate MyAuth into your third-party application, follow these steps:
// 1. Register your application in the MyAuth dashboard:
//    - Log in to the MyAuth dashboard (typically at /dashboard).
//    - Create a new application by providing:
//      - Application name (e.g., "My Third-Party App").
//      - Redirect URI (the callback URL in your app where users will be redirected after authentication, e.g., https://yourapp.com/auth/callback).
//    - After creation, note the generated clientId and clientSecret (keep clientSecret secure).
// 2. Implement login redirect in your application:
//    - When a user needs to log in, redirect them to the MyAuth auth-portal login page with query parameters:
//      - clientId: The client ID from step 1.
//      - redirect_uri: The redirect URI from step 1.
//    - Example URL: https://your-auth-portal-domain/login?clientId=YOUR_CLIENT_ID&redirect_uri=https://yourapp.com/auth/callback
//    - Users will authenticate via email/password or Google OAuth on the MyAuth portal.
// 3. Handle the authorization code callback:
//    - After successful login, MyAuth redirects the user back to your redirect_uri with an authorization code in the query string.
//    - Extract the code from the URL (e.g., ?code=AUTH_CODE).
// 4. Exchange the code for access and refresh tokens:
//    - Make a POST request to the MyAuth API token endpoint:
//      - URL: https://your-api-domain/auth/token
//      - Method: POST
//      - Headers: Content-Type: application/json
//      - Body:
//               {
//          clientId: YOUR_CLIENT_ID,
//          clientSecret: YOUR_CLIENT_SECRET,
//          code: AUTH_CODE
//        }
//           - Response includes accessToken and refreshToken. Store these securely (e.g., in HTTP-only cookies or secure storage).
// 5. Use the access token for authenticated requests:
//    - Include the accessToken in the Authorization header for API calls to your backend or other services.
//    - Example: Authorization: Bearer YOUR_ACCESS_TOKEN
//    - MyAuth API endpoints like /auth/me or /auth/verify can validate the token.
// 6. Handle token refresh:
//    - Access tokens may expire; use the refreshToken to get new ones via a refresh endpoint (if available, check API docs).
//    - Store refresh tokens securely and rotate them as needed.
// 7. Implement logout (optional):
//    - To log out, call the MyAuth logout endpoint: POST https://your-api-domain/auth/logout
//    - Include the refreshToken in cookies or body.
//    - Clear local tokens and redirect to your app's logged-out state.
// 8. Test the integration:
//    - Run your app's build/lint commands (e.g., npm run build, npm run lint).
//    - Test the full flow: register → login redirect → callback → token exchange → authenticated requests.
//    - Verify error handling for invalid tokens, expired codes, etc.
// 9. Secure your implementation:
//    - Never expose clientSecret in client-side code.
//    - Use HTTPS for all redirects and API calls.
//    - Validate redirect URIs server-side to prevent open redirect vulnerabilities.
//    - Follow MyAuth's security guidelines (e.g., hash passwords, validate inputs).
// For detailed API documentation, check the MyAuth API endpoints or contact support. If you need code examples or have specific framework requirements (e.g., React, Node.js), provide more details.

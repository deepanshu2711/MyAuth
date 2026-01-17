import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Docs() {
  return (
    <div className="text-white max-w-4xl mx-auto px-8 py-7 ">
      <h1 id="quickstart" className="text-3xl font-sans mb-6">
        Quickstart Guide: Integrating MyAuth with Next.js
      </h1>

      <section className="mb-8">
        <h2 id="setup" className="text-2xl font-sans mb-4">
          Setup
        </h2>

        <h3 id="create-nextjs" className="text-xl font-sans mb-2">
          1. Create a Next.js Application
        </h3>
        <p className="mb-4  text-muted-foreground">
          Create a new Next.js application using the App Router (recommended for
          Next.js 13+):
        </p>
        <SyntaxHighlighter language="bash" style={oneDark}>
          npx create-next-app@latest myauth-app
        </SyntaxHighlighter>

        <h3 id="install-sdk" className="text-xl font-sans mb-2 mt-6">
          2. Install the SDK
        </h3>
        <p className="mb-4 text-muted-foreground">
          Install the MyAuth package:
        </p>
        <SyntaxHighlighter language="bash" style={oneDark}>
          npm i @myauth/next
        </SyntaxHighlighter>

        <h3 id="env-vars" className="text-xl font-sans mb-2 mt-6">
          3. Configure Environment Variables
        </h3>
        <ul className="list-disc list-inside mb-4 text-muted-foreground">
          <li>
            Get or create an app from the MyAuth dashboard after logging in.
          </li>
          <li>
            Set the following environment variables in your <code>.env</code>{" "}
            file:
          </li>
        </ul>
        <SyntaxHighlighter language="env" style={oneDark}>
          {`NEXT_PUBLIC_CLIENT_ID=your_public_client_id
NEXT_PUBLIC_CLIENT_SECRET=your_client_secret`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-8">
        <h2 id="protect-routes" className="text-2xl font-sans mb-4">
          Protect Routes
        </h2>

        <h3 id="middleware" className="text-xl font-sans mb-2">
          4. Add Middleware
        </h3>
        <p className="mb-4 text-muted-foreground">
          Create a <code>middleware.ts</code> file in the root of your app to
          protect routes:
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware(process.env.NEXT_PUBLIC_CLIENT_ID!);

export const config = {
  matcher: ["/dashboard/:path*"],
};`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-8">
        <h2 id="handle-auth" className="text-2xl font-sans mb-4">
          Handle Authentication
        </h2>

        <h3 id="auth-provider" className="text-xl font-sans mb-2">
          5. Add AuthProvider
        </h3>
        <p className="mb-4 text-muted-foreground">
          Wrap your root layout with <code>AuthProvider</code> and pass the
          initial session:
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { AuthProvider } from "@myauth/next";

export default async function RootLayout({ children }) {
  const session = await auth(); 
  return (
    <html>
      <body>
        <AuthProvider initialSession={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}`}
        </SyntaxHighlighter>

        <h3 id="callback-page" className="text-xl font-sans mb-2 mt-6">
          6. Create Callback Page
        </h3>
        <p className="mb-4 text-muted-foreground">
          Add a <code>/callback</code> page at{" "}
          <code>app/callback/page.tsx</code>:
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { AuthenticateWithRedirectCallback } from "@myauth/next";

export default function Page() {
  return <AuthenticateWithRedirectCallback />;
}`}
        </SyntaxHighlighter>

        <h3 id="token-route" className="text-xl font-sans mb-2 mt-6">
          7. Create Token Exchange Route
        </h3>
        <p className="mb-4 text-muted-foreground">
          Create an API route at <code>app/api/auth/token/route.ts</code> for
          token exchange:
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { createAuthCallbackHandler } from "@myauth/next";

export const POST = createAuthCallbackHandler({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
});`}
        </SyntaxHighlighter>
      </section>
    </div>
  );
}

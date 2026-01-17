import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Docs() {
  return (
    <div className="text-white max-w-4xl mx-auto px-8 py-7">
      <h1 id="quickstart" className="text-3xl font-bold mb-8">
        Quickstart: Integrating MyAuth with Next.js (App Router)
      </h1>

      <section className="mb-12">
        <h2 id="setup" className="text-2xl font-bold mb-6">
          Setup
        </h2>

        <h3 className="text-xl mb-4">1. Create Next.js Project</h3>
        <p className="mb-4 text-gray-300">
          Use the App Router (Next.js 13+ / 14 recommended):
        </p>
        <SyntaxHighlighter
          language="bash"
          style={oneDark}
          customStyle={{ padding: "1rem", borderRadius: "0.5rem" }}
        >
          npx create-next-app@latest myauth-app
        </SyntaxHighlighter>

        <h3 className="text-xl mt-8 mb-4">2. Install MyAuth SDK</h3>
        <SyntaxHighlighter language="bash" style={oneDark}>
          npm install @myauth/next
        </SyntaxHighlighter>

        <h3 className="text-xl mt-8 mb-4">3. Environment Variables</h3>
        <p className="mb-4 text-gray-300">
          Create/get your application in the <strong>MyAuth Dashboard</strong>.
          <br />
          Add these variables to <code>.env.local</code> (never commit them!):
        </p>
        <SyntaxHighlighter language="bash" style={oneDark}>
          {`NEXT_PUBLIC_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_CLIENT_SECRET=your_client_secret_here
`}
        </SyntaxHighlighter>
        <p className="mt-3 text-sm text-gray-400">
          <strong>Important:</strong> Keep{" "}
          <code>NEXT_PUBLIC_CLIENT_SECRET</code> server-only — never use{" "}
          <code>NEXT_PUBLIC_</code> prefix for it!
        </p>
      </section>

      <section className="mb-12">
        <h2 id="protect-routes" className="text-2xl font-bold mb-6">
          Protect Routes
        </h2>

        <h3 className="text-xl mb-4">4. Middleware (recommended)</h3>
        <p className="mb-4 text-gray-300">
          Create <code>middleware.ts</code> in project root:
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">Handle Authentication</h2>

        <h3 className="text-xl mb-4">5. Root Layout + AuthProvider</h3>
        <p className="mb-4 text-gray-300">
          You need an <code>auth()</code> helper (usually exported from{" "}
          <code>lib/auth.ts</code> or similar).
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`// app/layout.tsx
import { AuthProvider } from "@myauth/next";
import { auth } from "@myauth/next"; 

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <AuthProvider 
           initialSession={session}           
           clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}
        >
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}`}
        </SyntaxHighlighter>

        <h3 className="text-xl mt-10 mb-4">6. Callback Page</h3>
        <p className="mb-3 text-gray-300">
          Create <code>app/callback/page.tsx</code>:
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { AuthenticateWithRedirectCallback } from "@myauth/next";

export default function CallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}`}
        </SyntaxHighlighter>

        <h3 className="text-xl mt-10 mb-4">7. Token Exchange Route</h3>
        <p className="mb-3 text-gray-300">
          Create <code>app/api/auth/token/route.ts</code>:
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { createAuthCallbackHandler } from "@myauth/next";

export const POST = createAuthCallbackHandler({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
});`}
        </SyntaxHighlighter>
      </section>
    </div>
  );
}

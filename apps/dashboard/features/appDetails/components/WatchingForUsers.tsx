"use client";
import React from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useRealTimeUserDetection } from "../hooks/useRealTimeUserDetection";
import { useDeleteAppMutation } from "../hooks/mutation/useDeleteAppMutation";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark as oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface WatchingForUsersProps {
  appId: string;
  clientId: string;
  onUserDetected: () => void;
}

export default function WatchingForUsers({
  appId,
  clientId,
  onUserDetected,
}: WatchingForUsersProps) {
  const { stopPolling } = useRealTimeUserDetection({
    appId,
    onUserDetected,
    isEnabled: true,
    pollingInterval: 5000,
  });

  const deleteAppMutation = useDeleteAppMutation();

  return (
    <div className="min-h-screen mt-24 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>
                <Trash2 className="w-4 h-4" />
                Delete App
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Application</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  application and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteAppMutation.mutate(appId)}
                  disabled={deleteAppMutation.isPending}
                >
                  {deleteAppMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex mb-6 items-center gap-2 text-cyan-400 text-xs ">
          <Loader2 className="animate-spin size-4" />
          <p>Watching for users</p>
        </div>
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-base">What will your users see?</h2>
          </div>
          <p className="max-w-lg text-muted-foreground text-sm">
            Install the SDK, run your dev server, and sign yourself up. The
            moment we detect that first account, installation is complete.
          </p>
        </div>
        <Card className="bg-transparent border-white/20">
          <CardContent className="bg-transparent">
            <div className="text-white max-w-4xl mx-auto">
              <section className="mb-12">
                <h2 id="setup" className="text-2xl font-sans mb-6">
                  Setup
                </h2>

                <h3 className="text-xl mb-4">1. Create Next.js Project</h3>

                <p className="mt-4 text-gray-300">
                  MyAuth is designed specifically for the{" "}
                  <strong>Next.js App Router</strong>. It relies on Server
                  Components, Route Handlers, and middleware to ensure
                  authentication is handled securely on the server.
                </p>

                <p className="mt-2 text-gray-400 text-sm">
                  ⚠️ Pages Router is not supported.
                </p>
                <SyntaxHighlighter
                  language="bash"
                  style={oneDark}
                  customStyle={{ padding: "1rem", borderRadius: "0.5rem" }}
                >
                  npx create-next-app@latest myauth-app
                </SyntaxHighlighter>

                <h3 className="text-xl mt-8 mb-4">2. Install MyAuth SDK</h3>
                <p className="mt-4 text-gray-300">
                  The <code>@myauth/next</code> package provides:
                </p>

                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Middleware for route protection</li>
                  <li>
                    Server helpers like <code>auth()</code> and{" "}
                    <code>currentUser()</code>
                  </li>
                  <li>Client hooks and providers for UI state</li>
                </ul>
                <SyntaxHighlighter language="bash" style={oneDark}>
                  npm install @myauth/next
                </SyntaxHighlighter>

                <h3 className="text-xl mt-8 mb-4">3. Environment Variables</h3>
                <p className="mt-4 text-gray-300">
                  These credentials identify your application to MyAuth and are
                  used during secure server-side token exchanges.
                </p>

                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>
                    <code>CLIENT_ID</code> – Safe to expose to the browser
                  </li>
                  <li>
                    <code>CLIENT_SECRET</code> – <strong>Server-only</strong>,
                    never exposed
                  </li>
                </ul>

                <SyntaxHighlighter language="bash" style={oneDark}>
                  {`NEXT_PUBLIC_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_CLIENT_SECRET=your_client_secret_here
`}
                </SyntaxHighlighter>
              </section>

              <section className="mb-12">
                <h2 id="protect-routes" className="text-2xl font-sans mb-6">
                  Protect Routes
                </h2>

                <h3 className="text-xl mb-4">4. Middleware (recommended)</h3>
                <p className="mt-4 text-gray-300">
                  This middleware runs at the edge before a request reaches your
                  application.
                </p>

                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Validates authentication cookies</li>
                  <li>Redirects unauthenticated users to login</li>
                  <li>Prevents protected routes from rendering at all</li>
                </ul>

                <p className="mt-3 text-sm text-gray-400">
                  Middleware is recommended for coarse-grained access control.
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
                <h2 className="text-xl font-sans mb-6">
                  Handle Authentication
                </h2>

                <h3 className="text-xl mb-4">5. Root Layout + AuthProvider</h3>
                <p className="mt-4 text-gray-300">
                  MyAuth follows a <strong>server-first</strong> model.
                  Authentication is resolved on the server and then hydrated
                  into the client.
                </p>

                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>
                    <code>auth()</code> runs on the server and reads HttpOnly
                    cookies
                  </li>
                  <li>
                    The session is passed into <code>AuthProvider</code>
                  </li>
                  <li>Client components never read cookies directly</li>
                </ul>

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
                <p className="mt-4 text-gray-300">
                  After a user authenticates with MyAuth, they are redirected
                  back to this page.
                </p>

                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Exchanges authorization data for a session</li>
                  <li>Sets secure HttpOnly cookies</li>
                  <li>Redirects the user back to your app</li>
                </ul>

                <SyntaxHighlighter language="typescript" style={oneDark}>
                  {`import { AuthenticateWithRedirectCallback } from "@myauth/next";

export default function CallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}`}
                </SyntaxHighlighter>

                <h3 className="text-xl mt-10 mb-4">7. Token Exchange Route</h3>
                <p className="mt-4 text-gray-300">
                  This route runs only on the server and is responsible for
                  securely exchanging authentication data for a valid session.
                </p>

                <p className="mt-2 text-gray-400 text-sm">
                  Your client secret is never exposed to the browser.
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

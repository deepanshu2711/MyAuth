import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SDKReference() {
  return (
    <div className="text-white max-w-4xl mx-auto px-8 py-7">
      <h1 className="text-3xl font-bold mb-8">Next.js SDK Reference</h1>

      <p className="mb-8 text-gray-300">
        This page documents all the exports from the <code>@myauth/next</code>{" "}
        package.
      </p>

      <section className="mb-12">
        <h2 id="auth" className="text-2xl font-bold mb-6">
          auth()
        </h2>
        <p className="mb-4 text-gray-300">
          A server-side function to get the current session data including user
          and token.
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { auth } from "@myauth/next";

const session = await auth();
// Returns { user: User | null, token: string | null } | null`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-12">
        <h2 id="AuthProvider" className="text-2xl font-bold mb-6">
          AuthProvider
        </h2>
        <p className="mb-4 text-gray-300">
          A React context provider that manages authentication state across your
          app.
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`<AuthProvider 
  initialSession={session}           
  clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}
>
  {children}
</AuthProvider>`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-12">
        <h2 id="useAuth" className="text-2xl font-bold mb-6">
          useAuth()
        </h2>
        <p className="mb-4 text-gray-300">
          A React hook that provides access to the current authentication state.
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`const { user, token, loading, login, logout } = useAuth();`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-12">
        <h2 id="withAuthMiddleware" className="text-2xl font-bold mb-6">
          withAuthMiddleware()
        </h2>
        <p className="mb-4 text-gray-300">
          A middleware function to protect routes that require authentication.
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware(process.env.NEXT_PUBLIC_CLIENT_ID!);`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-12">
        <h2
          id="AuthenticateWithRedirectCallback"
          className="text-2xl font-bold mb-6"
        >
          AuthenticateWithRedirectCallback
        </h2>
        <p className="mb-4 text-gray-300">
          A React component that handles the authentication callback after
          redirect.
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`<AuthenticateWithRedirectCallback />`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-12">
        <h2 id="createAuthCallbackHandler" className="text-2xl font-bold mb-6">
          createAuthCallbackHandler()
        </h2>
        <p className="mb-4 text-gray-300">
          Creates an API route handler for exchanging authorization codes for
          tokens.
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`export const POST = createAuthCallbackHandler({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
});`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-12">
        <h2 id="getSessionToken" className="text-2xl font-bold mb-6">
          getSessionToken()
        </h2>
        <p className="mb-4 text-gray-300">
          Retrieves the current session token from storage.
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`import { getSessionToken } from "@myauth/next";

const token = getSessionToken();`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-12">
        <h2 id="types" className="text-2xl font-bold mb-6">
          Types
        </h2>
        <p className="mb-4 text-gray-300">
          Exported TypeScript types for type safety.
        </p>
        <SyntaxHighlighter language="typescript" style={oneDark}>
          {`interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: () => Promise<void>;
}

interface Session {
  user: User | null;
  token: string | null;
}`}
        </SyntaxHighlighter>
      </section>
    </div>
  );
}

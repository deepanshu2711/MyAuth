# @myauth/react

React SDK for MyAuth authentication service

## Installation

```bash
npm install @myauth/react
```

## Usage

Wrap your app with the AuthProvider, then use hooks in components.

```tsx
import { AuthProvider, useAuth } from "@myauth/react";

function App() {
  return (
    <AuthProvider
      config={{ clientId: "...", clientSecret: "...", apiBaseUrl: "..." }}
    >
      <MyComponent />
    </AuthProvider>
  );
}

function MyComponent() {
  const { isAuthenticated, login, logout, user } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <p>
          Welcome, {user?.name}! <button onClick={logout}>Logout</button>
        </p>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

## API

- `AuthProvider`: Context provider for auth state.
- `useAuth()`: Hook returning auth state and actions.
- `useLogin()`: Hook for initiating login.
- `useCallback()`: Hook for handling OAuth callback.

## License

ISC

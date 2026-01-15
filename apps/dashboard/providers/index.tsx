import { Toaster } from "sonner";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { AuthProvider } from "@myauth/next";

export const Providers = ({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: any;
}) => {
  return (
    <TanstackQueryProvider>
      <Toaster />
      <AuthProvider
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}
        initialSession={initialSession}
      >
        {children}
      </AuthProvider>
    </TanstackQueryProvider>
  );
};

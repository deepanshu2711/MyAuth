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
      <AuthProvider initialSession={initialSession}>{children}</AuthProvider>
    </TanstackQueryProvider>
  );
};

"use client";
import { Toaster } from "sonner";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { GoogleProvider } from "./GoogleProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleProvider>
      <TanstackQueryProvider>
        <Toaster />
        {children}
      </TanstackQueryProvider>
    </GoogleProvider>
  );
};

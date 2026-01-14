"use client";

import { useRouter, useSearchParams } from "next/navigation.js";
import { useEffect } from "react";

export const AuthenticateWithRedirectCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      throw new Error(`Authentication failed: code is required`);
    }
    const authenticate = async () => {
      try {
        const response = await fetch("/api/auth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });
        if (!response.ok) {
          throw new Error(`Authentication failed: ${response.status}`);
        }
        if (response.status === 200) {
          router.push("/");
        } else {
          throw new Error("No access token received");
        }
      } catch (err) {
        console.log(err);
      }
    };
    authenticate();
  }, [code, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-lg text-gray-700 font-medium">
        Authenticating...
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Please wait while we complete your sign-in
      </p>
    </div>
  );
};

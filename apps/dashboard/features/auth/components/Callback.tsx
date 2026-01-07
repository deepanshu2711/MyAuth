"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useTokenExchangeMutation } from "../hooks/mutation/useTokenExchangeMutation";

const Callback = () => {
  const searchParams = useSearchParams();
  const { mutate: exchangeToken, isPending } = useTokenExchangeMutation();

  useEffect(() => {
    const code = searchParams.get("code");
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    console.log("clientId", clientId);
    console.log("code", code);
    console.log("isPending", isPending);

    if (!code || !clientId || isPending) return;

    exchangeToken({ code, clientId });
  }, [searchParams]);

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

export default Callback;

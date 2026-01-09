"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { useLoginMutation } from "../hooks/mutation/useLoginMutation";
import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../../../lib/api";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Vortex } from "@/components/ui/vortex";
import Image from "next/image";

const Login = () => {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const redirected_uri = searchParams.get("redirect_uri");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending: isLoading } = useLoginMutation();

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (credentialResponse: any) => {
      const response = await api.post("/auth/google", {
        idToken: credentialResponse.credential,
        clientId: clientId,
        redirect_uri: redirected_uri,
      });

      window.location.href = response.data.data;
    },
    onError: () => console.log("Login failed"),
  });

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-1 relative overflow-hidden">
      <BackgroundRippleEffect />

      {/* Background decorative elements */}
      {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div> */}
      {/* <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div> */}

      {/* Main Content */}
      <div className="w-full max-w-sm relative z-10">
        {/* Sign-in Card */}
        <div className="bg-black/5 backdrop-blur-2xl border border-gray-500/50 rounded-2xl shadow-2xl ">
          {/* Logo and Header */}
          <div className="p-8">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={100}
                  priority
                  style={{ width: "120px", height: "auto" }}
                />
              </div>

              <h1 className="text-xl  text-white mb-2">
                Welcome back to MyAuth
              </h1>
              <p className="text-slate-400 text-xs">Sign in to continue</p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => googleLogin()}
                type="button"
                className="flex text-sm w-full items-center justify-center gap-3 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white font-normal hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>

                <span>Google</span>
              </button>

              <button
                type="button"
                className="flex text-sm w-full items-center justify-center gap-3 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white font-normal hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>GitHub</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-500/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900/50 text-slate-400">or</span>
              </div>
            </div>

            {/* Sign-in Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login({
                  email,
                  password,
                  clientId: clientId as string,
                  redirect_uri: redirected_uri as string,
                });
              }}
              className="space-y-5"
            >
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-500/50 text-sm  rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password Input */}
              {/* <div> */}
              {/*   <label */}
              {/*     htmlFor="password" */}
              {/*     className="block text-xs font-medium text-slate-300 mb-2" */}
              {/*   > */}
              {/*     Password */}
              {/*   </label> */}
              {/*   <input */}
              {/*     type="password" */}
              {/*     id="password" */}
              {/*     value={password} */}
              {/*     onChange={(e) => setPassword(e.target.value)} */}
              {/*     className="w-full px-2 text-sm py-1 border border-gray-500/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" */}
              {/*     placeholder="••••••••" */}
              {/*     required */}
              {/*   /> */}
              {/*   <div className="mt-2 text-right"> */}
              {/*     <a */}
              {/*       href="#" */}
              {/*       className="text-xs text-[#846bff]  transition-colors " */}
              {/*     > */}
              {/*       Forgot password? */}
              {/*     </a> */}
              {/*   </div> */}
              {/* </div> */}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-2 py-2 text-sm border border-gray-600 bg-[#846bff]  text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            {/* Divider */}
            {/* OAuth Buttons */}
          </div>

          {/* Sign Up Link */}
          <div className=" text-sm text-center  p-4 bg-gray-500/5">
            <p className="text-slate-400 text-xs">
              Don&apos;t have an account?{" "}
              <Link
                href={`/register?clientId=${clientId}&redirect_uri=${redirected_uri}`}
                className="text-[#846bff] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className="bg-gray-500/5 items-center justify-center flex pb-4 pt-2">
            <p className="text-gray-300 text-xs">Secured By</p>
            <Image src={"/x.png"} alt="logo" height={30} width={30} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center ">
          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 mb-4">
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-slate-600">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
          <p className="text-xs text-slate-500">
            © 2025 MyAuth. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;

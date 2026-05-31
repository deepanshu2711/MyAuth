"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@myauth/next";
import { StickyBanner } from "@/components/ui/sticky-banner";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black backdrop-blur-sm border-b border-white/10">
      <div className="relative flex w-full flex-col overflow-hidden">
        <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[calc(100%-2.5rem)] text-center text-xs leading-snug text-white font-sans drop-shadow-md sm:max-w-[90%] sm:text-sm">
            <span className="sm:hidden">
              <span className="font-semibold">MyAuth</span> brings secure
              cookie-first auth to Next.js.
            </span>
            <span className="hidden sm:inline">
              <span className="font-semibold">MyAuth</span> brings{" "}
              <span className="font-semibold">
                backend-first authentication
              </span>{" "}
              to the <span className="font-semibold">Next.js App Router</span>.{" "}
              Secure HttpOnly cookie sessions. No client-side token leaks. Built
              for developers who want authentication done right.
            </span>
          </p>
        </StickyBanner>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:px-6 sm:py-4">
        <Link href={"/"} className="flex min-w-0 items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={200}
            priority
            className="h-auto w-24 shrink-0 sm:w-[120px]"
          />
          <span className="truncate text-base font-medium text-white sm:text-lg">
            MyAuth
          </span>
        </Link>
        <div className="shrink-0">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@myauth/next";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Navbar = () => {
  const { user } = useAuth();
  console.log("user", user);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black backdrop-blur-sm border-b border-white/10">
      <div className="relative flex w-full flex-col overflow-y-auto">
        <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[90%] text-white font-sans drop-shadow-md">
            <span className="font-semibold">MyAuth is currently in beta.</span>{" "}
            <span className="font-bold text-white/95">V1 launches March 1</span>
            , bringing{" "}
            <span className="font-semibold">
              correct, backend-first authentication
            </span>{" "}
            to the <span className="font-semibold">Next.js App Router</span>.
          </p>
        </StickyBanner>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={200}
            priority
            style={{ width: "120px", height: "auto" }}
          />
          <span className="text-lg font-medium">MyAuth</span>
        </Link>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

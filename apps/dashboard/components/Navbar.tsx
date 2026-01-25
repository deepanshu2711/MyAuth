"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@myauth/next";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const { user, logout } = useAuth();

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
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              >
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarImage
                    src={user?.avatar || "https://console.deepxdev.com/x.png"}
                    alt={user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-indigo-950 text-indigo-200 font-medium text-xs">
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className=" bg-[#0B1120] border-white/10 text-slate-200 p-1 shadow-xl shadow-black/50 backdrop-blur-xl"
              align="end"
              sideOffset={8}
            >
              {/* User Header */}
              <DropdownMenuLabel
                onClick={() => logout()}
                className="font-normal cursor-pointer hover:bg-popover-foreground group p-3 gap-2 flex items-center"
              >
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarImage
                    src={user?.avatar || "https://console.deepxdev.com/x.png"}
                    alt={user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-indigo-950 text-indigo-200 font-medium text-xs">
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium flex items-center justify-between mb-2 leading-none text-white">
                    {user?.name}
                    <LogOut className="size-4 group-hover:text-rose-400" />
                  </p>
                  <p className="text-xs leading-none text-slate-500 truncate font-mono">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-white/10 mx-1" />
              {/* Footer / Secured By */}
              <div className="p-3 flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                  Secured by
                </span>
                <Image src="/x.png" alt="logo" height={24} width={24} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

"use client";
import { useLogoutMutation } from "../features/auth/hooks/mutation/useLogoutMutation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@myauth/sdk";

export const Navbar = () => {
  const user = useAuth();
  console.log("user", user);
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black backdrop-blur-sm border-b border-white/10">
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
        {/* <button */}
        {/*   onClick={user ? handleLogout : undefined} */}
        {/*   disabled={isLoggingOut} */}
        {/*   className="px-5 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors disabled:opacity-50" */}
        {/* > */}
        {/*   {isLoggingOut ? "Logging out..." : user ? "Log Out" : "Sign In"} */}
        {/* </button> */}
      </div>
    </nav>
  );
};

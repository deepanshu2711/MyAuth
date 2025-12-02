"use client";
import { useGetCurrentUserQuery } from "../hooks/query/useGetCurrentUserQuery";
import { useLogoutMutation } from "../features/auth/hooks/mutation/useLogoutMutation";

export const Navbar = () => {
  const { data: user } = useGetCurrentUserQuery();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black backdrop-blur-sm border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
            <span className="text-black text-sm font-bold">M</span>
          </div>
          <span className="text-lg font-medium">MyAuth</span>
        </div>
        <button
          onClick={user ? handleLogout : undefined}
          disabled={isLoggingOut}
          className="px-5 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {isLoggingOut ? "Logging out..." : user ? "Log Out" : "Sign In"}
        </button>
      </div>
    </nav>
  );
};

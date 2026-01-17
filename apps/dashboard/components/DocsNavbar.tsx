"use client";

import { Button } from "./ui/button";

export const DocsNavbar = () => {
  return (
    <nav className="w-full z-50  border-b border-white/10 bg-transparent backdrop-blur-lg">
      <div className="mx-auto px-6 py-4 flex items-center justify-end h-14">
        <Button>Login</Button>
      </div>
    </nav>
  );
};

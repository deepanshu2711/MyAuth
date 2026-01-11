"use client";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-black text-white gap-10 flex flex-col items-center justify-center">
      <BackgroundRippleEffect />

      {/* HERO SECRION */}
      <section className="px-6 min-h-screen z-10 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl  mb-6 tracking-tight font-sans">
            Simple Authentication
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mb-10 leading-relaxed">
            A personal OAuth 2.0 service for my applications.
            <br />
            Clean, secure, and straightforward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant={"secondary"} onClick={handleClick}>
              Get Started
            </Button>
            <Button>Documentation</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

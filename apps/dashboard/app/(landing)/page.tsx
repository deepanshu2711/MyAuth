"use client";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { FeaturesSectionDemo } from "./features";
import { InfiniteMovingCardsDemo } from "./Testimonials";
import Example from "./Pricing";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          variant="default"
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function Page() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-black text-white gap-10 flex flex-col items-center justify-center">
      <BackgroundRippleEffect />

      {/* HERO SECRION */}
      <section className="px-6 min-h-[50vh] z-10 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center justify-center">
          <Badge>Developer-first authentication</Badge>
          <h1 className="text-5xl md:text-6xl  mb-6 tracking-tight font-sans">
            Simple Authentication for{" "}
            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Modern Applications
            </span>
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

      <section className="max-w-7xl mt-0 px-6">
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Authentication done right"
            description="Built on modern standards with secure defaults, so you can focus on shipping instead of rethinking auth."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={
              <Settings className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Simple to integrate"
            description="Drop-in components, flexible APIs, and full control over flows — production-ready in minutes."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Security at every layer"
            description="From encrypted sessions to breach detection and session revocation, your users stay protected."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={
              <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Designed for conversion"
            description="Passwordless sign-in, social logins, and optimized flows that reduce friction and boost sign-ups."
          />

          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={
              <Search className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Built to scale"
            description="Advanced fraud prevention, bot detection, and compliance-ready architecture as your product grows."
          />
        </ul>
      </section>

      <section className="flex flex-col items-center max-w-7xl mx-auto mt-24 px-6 rounded-md text-center">
        <h2 className="text-3xl md:text-4xl font-sans tracking-tight text-neutral-900 dark:text-white">
          Auth That <Cover>Integrates Fast</Cover>
        </h2>

        <p className="my-4 max-w-2xl text-xs md:text-sm text-gray-400">
          Follow a simple OAuth-style flow to securely authenticate users,
          manage tokens, and protect your APIs — without reinventing auth.
        </p>
        <FeaturesSectionDemo />
      </section>

      <Example />

      <section className="flex flex-col items-center max-w-7xl mx-auto mt-24 px-6 rounded-md text-center">
        <h2 className="text-3xl md:text-4xl font-sans tracking-tight text-neutral-900 dark:text-white">
          Join the community
        </h2>
        <p className="my-4 max-w-2xl text-xs md:text-sm text-gray-400">
          Discover what our community has to say about their MyAuth experience.
        </p>
        <Badge>Join us on discord</Badge>
        <InfiniteMovingCardsDemo />
      </section>
    </div>
  );
}

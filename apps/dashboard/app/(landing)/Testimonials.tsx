"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React, { useEffect, useState } from "react";

export function InfiniteMovingCardsDemo() {
  return (
    <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This authentication system has completely transformed our security approach. It's robust, scalable, and incredibly user-friendly. Our users can log in seamlessly without compromising on security.",
    name: "Sarah Johnson",
    title: "CTO, TechCorp",
  },
  {
    quote:
      "Implementing this auth was incredibly smooth. The JWT tokens and refresh mechanisms work flawlessly, and our users appreciate the quick login process. Highly recommend for any serious application.",
    name: "Mike Chen",
    title: "Lead Developer, StartupX",
  },
  {
    quote:
      "Finally, an authentication solution that prioritizes both security and user experience. The bcrypt hashing and proper session management give us peace of mind.",
    name: "Emma Rodriguez",
    title: "Security Engineer, DevSolutions",
  },
  {
    quote:
      "Our app's user retention improved significantly after switching to this auth system. The seamless integration with MongoDB and Express made development a breeze.",
    name: "David Kim",
    title: "Product Manager, InnovateApp",
  },
  {
    quote:
      "The best authentication framework we've used. Strict TypeScript typing, comprehensive error handling, and excellent documentation make it perfect for enterprise applications.",
    name: "Lisa Thompson",
    title: "Senior Engineer, EnterpriseSoft",
  },
];

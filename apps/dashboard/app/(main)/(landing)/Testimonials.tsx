"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React, { useEffect, useState } from "react";

export function InfiniteMovingCardsDemo() {
  return (
    <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonialsRow1}
        direction="right"
        speed="slow"
      />
      <InfiniteMovingCards
        items={testimonialsRow2}
        direction="left"
        speed="slow"
      />
      <InfiniteMovingCards
        items={testimonialsRow3}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonialsRow1 = [
  {
    quote:
      "Cookie-based sessions with App Router finally removed all the edge cases I kept hitting with JWTs.",
    name: "Ankit Verma",
    title: "Full-Stack Developer",
  },
  {
    quote:
      "Auth feels boring again — and that’s a compliment. It just works the same everywhere.",
    name: "Arjun Mehta",
    title: "Software Engineer",
  },
  {
    quote:
      "MyAuth made me realize how many hacks I had in my previous auth setup.",
    name: "Rohit Sharma",
    title: "Indie SaaS Builder",
  },
];

const testimonialsRow2 = [
  {
    quote:
      "Setup was straightforward and I didn’t need to read a 30-page guide to feel confident.",
    name: "Neha Patel",
    title: "Frontend Engineer (Next.js)",
  },
  {
    quote:
      "The API surface is small, which makes it easy to reason about in production.",
    name: "Siddharth Jain",
    title: "Startup Founder",
  },
  {
    quote:
      "I like that MyAuth doesn’t hide what it’s doing. Debugging is actually possible.",
    name: "Kunal Gupta",
    title: "Product Engineer",
  },
];

const testimonialsRow3 = [
  {
    quote:
      "Clerk was fast to start, but MyAuth is easier to trust once traffic and edge cases grow.",
    name: "Amit Singh",
    title: "Senior Engineer",
  },
  {
    quote:
      "Rolling my own auth felt risky. MyAuth gave me control without the anxiety.",
    name: "Pooja Nair",
    title: "Independent Developer",
  },
  {
    quote:
      "Sessions behave exactly how I expect across middleware, APIs, and server components.",
    name: "Rahul Khanna",
    title: "Full-Stack Engineer",
  },
];

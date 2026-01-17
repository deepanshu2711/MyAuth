"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBook,
  IconSettings,
  IconShield,
  IconLogin,
  IconCode,
  IconFileText,
  IconKey,
  IconRoute,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export function DocsSidebar() {
  const links = [
    {
      label: "Quickstart Guide",
      href: "#quickstart",
      icon: (
        <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Setup",
      href: "#setup",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create Next.js App",
      href: "#create-nextjs",
      icon: (
        <IconCode className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Install SDK",
      href: "#install-sdk",
      icon: (
        <IconFileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Environment Variables",
      href: "#env-vars",
      icon: (
        <IconKey className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Protect Routes",
      href: "#protect-routes",
      icon: (
        <IconShield className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add Middleware",
      href: "#middleware",
      icon: (
        <IconRoute className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Handle Authentication",
      href: "#handle-auth",
      icon: (
        <IconLogin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add AuthProvider",
      href: "#auth-provider",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create Callback Page",
      href: "#callback-page",
      icon: (
        <IconRoute className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Token Exchange Route",
      href: "#token-route",
      icon: (
        <IconKey className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <Sidebar animate={false}>
      <SidebarBody className="h-screen fixed">
        <Link
          href={"/"}
          className="flex mb-5 items-center gap-2 p-4 justify-center "
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={200}
            priority
            style={{ width: "120px", height: "auto" }}
          />
          <Badge variant={"secondary"}>Docs</Badge>
        </Link>
        <div className="flex flex-col overflow-y-hidden overflow-x-hidden">
          <div className="flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

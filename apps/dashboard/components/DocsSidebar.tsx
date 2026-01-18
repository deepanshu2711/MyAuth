"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconBook } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Example from "./SelectDemo";

const links = [
  {
    label: "Quickstart Guide",
    href: "/docs/nextjs",
    icon: (
      <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "SDK Reference",
    href: "/docs/nextjs/sdk-reference",
    icon: (
      <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export function DocsSidebar() {
  return (
    <Sidebar animate={false}>
      <SidebarBody className="h-screen fixed">
        <Link
          href={"/"}
          className="flex mb-8 items-center gap-2 p-1 justify-center "
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            priority
            style={{ width: "100px", height: "auto" }}
          />
          <Badge variant={"secondary"}>Docs</Badge>
        </Link>
        <Example />
        <div className="flex flex-col gap-2 overflow-y-hidden overflow-x-hidden">
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

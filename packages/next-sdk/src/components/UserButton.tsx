"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { useAuth } from "../client/useAuth.js";

const s = {
  trigger: {
    position: "relative" as const,
    height: 40,
    width: 40,
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 150ms",
    outline: "none",
  },
  triggerHover: { backgroundColor: "rgba(255,255,255,0.05)" },
  avatarRoot: {
    height: 36,
    width: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  avatarImg: { objectFit: "cover" as const, width: "100%", height: "100%" },
  avatarFallback: {
    backgroundColor: "#1e1b4b",
    color: "#c7d2fe",
    fontWeight: 500,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: "#0B1120",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
    padding: 4,
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.5)",
    backdropFilter: "blur(24px)",
    borderRadius: 6,
    minWidth: 220,
    zIndex: 50,
  },
  item: {
    fontWeight: 400,
    cursor: "pointer",
    outline: "none",
    padding: 12,
    gap: 8,
    display: "flex",
    alignItems: "center",
    borderRadius: 4,
    border: "none",
    background: "transparent",
    width: "100%",
    transition: "background-color 150ms",
  },
  itemHover: { backgroundColor: "rgba(255,255,255,0.05)" },
  avatarSmall: {
    height: 36,
    width: 36,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  info: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
    minWidth: 0,
  },
  nameRow: {
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    lineHeight: 1,
    color: "white",
    margin: 0,
  },
  logoutIcon: { marginLeft: 16, flexShrink: 0, transition: "color 150ms" },
  logoutIconHover: { color: "#fb7185" },
  email: {
    fontSize: 12,
    lineHeight: 1,
    color: "#64748b",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    fontFamily: "monospace",
    margin: 0,
  },
  separator: {
    backgroundColor: "rgba(255,255,255,0.1)",
    marginLeft: 4,
    marginRight: 4,
    height: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  footer: {
    padding: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "opacity 150ms",
  },
  securedBy: {
    fontSize: 10,
    color: "#64748b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    fontWeight: 500,
  },
  logo: { height: 24, width: 24 },
};

export function UserButton() {
  const { user, logout } = useAuth();
  const [triggerHover, setTriggerHover] = useState(false);
  const [itemHover, setItemHover] = useState(false);
  const [footerHover, setFooterHover] = useState(false);

  if (!user) return null;

  const avatarSrc = user.avatar ?? "https://console.deepxdev.com/x.png";
  const initials = (user.name ?? user.email).slice(0, 2).toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          style={{ ...s.trigger, ...(triggerHover ? s.triggerHover : {}) }}
          onMouseEnter={() => setTriggerHover(true)}
          onMouseLeave={() => setTriggerHover(false)}
        >
          <Avatar.Root style={s.avatarRoot}>
            <Avatar.Image
              src={avatarSrc}
              alt={user.name ?? user.email}
              style={s.avatarImg}
            />
            <Avatar.Fallback style={s.avatarFallback}>
              {initials}
            </Avatar.Fallback>
          </Avatar.Root>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content style={s.content} align="end" sideOffset={8}>
          <DropdownMenu.Item
            onSelect={() => logout()}
            style={{ ...s.item, ...(itemHover ? s.itemHover : {}) }}
            onMouseEnter={() => setItemHover(true)}
            onMouseLeave={() => setItemHover(false)}
          >
            <Avatar.Root style={s.avatarSmall}>
              <Avatar.Image
                src={avatarSrc}
                alt={user.name ?? user.email}
                style={s.avatarImg}
              />
              <Avatar.Fallback style={s.avatarFallback}>
                {initials}
              </Avatar.Fallback>
            </Avatar.Root>
            <div style={s.info}>
              <p style={s.nameRow}>
                {user.name}
                <LogOut
                  size={16}
                  style={{
                    ...s.logoutIcon,
                    ...(itemHover ? s.logoutIconHover : {}),
                  }}
                />
              </p>
              <p style={s.email}>{user.email}</p>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator style={s.separator} />

          <div
            style={{ ...s.footer, opacity: footerHover ? 1 : 0.5 }}
            onMouseEnter={() => setFooterHover(true)}
            onMouseLeave={() => setFooterHover(false)}
          >
            <span style={s.securedBy}>Secured by</span>
            <img
              src="https://console.deepxdev.com/x.png"
              alt="MyAuth"
              style={s.logo}
            />
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

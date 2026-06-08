"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Pencil,
  Users,
  Calendar,
  Activity,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Link2,
  ChevronDown,
  Bell,
  Hexagon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// ─── Types & Mocks ────────────────────────────────────────────────────────────

interface User {
  name: string;
  email: string;
  id: string;
  lastSignIn: string;
  joined: string;
}

interface Session {
  id: string;
  email: string;
  expiresAt: string;
  device?: string;
}

const MOCK_SESSIONS: Session[] = [
  {
    id: "sess_a3f8e1d2",
    email: "aachibilyaev@gmail.com",
    expiresAt: "2026-06-10",
    device: "Mac OS • Chrome",
  },
  {
    id: "sess_b9c12fa7",
    email: "sumanthjm.work@gmail.com",
    expiresAt: "2026-06-08",
    device: "Windows • Edge",
  },
  {
    id: "sess_d4e72cb0",
    email: "roshanking021@gmail.com",
    expiresAt: "2026-06-07",
    device: "iOS • Safari",
  },
];

const MOCK_USERS: User[] = [
  {
    name: "Alexandr Chibilyaev",
    email: "aachibilyaev@gmail.com",
    id: "usr_01",
    lastSignIn: "Nov 22, 2025",
    joined: "Nov 22, 2025",
  },
  {
    name: "Sumanth JM",
    email: "sumanthjm.work@gmail.com",
    id: "usr_02",
    lastSignIn: "Jul 4, 2025",
    joined: "Jul 4, 2025",
  },
  {
    name: "Roshan Bhagat",
    email: "roshanking021@gmail.com",
    id: "usr_03",
    lastSignIn: "May 16, 2025",
    joined: "May 16, 2025",
  },
  {
    name: "Ishika",
    email: "ishijain02@gmail.com",
    id: "usr_04",
    lastSignIn: "Dec 29, 2024",
    joined: "Dec 29, 2024",
  },
  {
    name: "one piece",
    email: "onep7484@gmail.com",
    id: "usr_05",
    lastSignIn: "Nov 5, 2024",
    joined: "Nov 5, 2024",
  },
  {
    name: "Sergio Ramos",
    email: "sergio04ramos9761@gmail.com",
    id: "usr_06",
    lastSignIn: "Oct 1, 2024",
    joined: "Oct 1, 2024",
  },
  {
    name: "Sandro Almeida",
    email: "sandro.almeida.silva17@gmail.com",
    id: "usr_07",
    lastSignIn: "Sep 10, 2024",
    joined: "Sep 10, 2024",
  },
  {
    name: "Alice Martin",
    email: "alice.martin@example.com",
    id: "usr_11",
    lastSignIn: "Sep 1, 2024",
    joined: "Sep 1, 2024",
  },
];

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-pink-500",
];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length > 1
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name[0].toUpperCase();
}

// ─── Shared UI Components ─────────────────────────────────────────────────────

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/[0.06] bg-[#121212] shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-50">{title}</h2>
        {description && (
          <p className="text-[13px] text-zinc-400 mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Views ────────────────────────────────────────────────────────────────────

function OverviewView({ totalUsers, activeSessions, createdAt, users }: any) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const filtered = users.filter(
    (u: any) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Overview"
        description="Your application's high-level metrics and health status."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Users",
            value: totalUsers.toLocaleString(),
            icon: <Users size={16} className="text-violet-400" />,
            trend: "+12% this month",
          },
          {
            label: "Active Sessions",
            value: activeSessions,
            icon: <Activity size={16} className="text-emerald-400" />,
            trend: "Live right now",
          },
          {
            label: "Created On",
            value: createdAt,
            icon: <Calendar size={16} className="text-blue-400" />,
            trend: "Production environment",
          },
        ].map((m, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center gap-3 text-[13px] font-medium text-zinc-400 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center border border-white/[0.04]">
                {m.icon}
              </div>
              {m.label}
            </div>
            <div className="text-3xl font-semibold text-zinc-50 mb-2">
              {m.value}
            </div>
            <div className="text-[12px] text-zinc-600">{m.trend}</div>
          </Card>
        ))}
      </div>
      <SectionHeader title="Sign ups" />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  User
                </th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  User ID
                </th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  Last Sign In
                </th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium text-right">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user: any, i: any) => (
                <tr
                  key={user.id}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white ${
                          AVATAR_COLORS[i % AVATAR_COLORS.length]
                        }`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-zinc-200">
                          {user.name}
                        </div>
                        <div className="text-[12px] text-zinc-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[12px] font-mono text-zinc-500">
                    {user.id}
                  </td>
                  <td className="px-5 py-3 text-[13px] text-zinc-400">
                    {user.lastSignIn}
                  </td>
                  <td className="px-5 py-3 text-[13px] text-zinc-400 text-right">
                    {user.joined}
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-zinc-500 text-[13px]"
                  >
                    No users found matching "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function CredentialsView({ clientId, redirectUri, onUpdateRedirectUri }: any) {
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState("");
  const [editingUri, setEditingUri] = useState(false);
  const [tempUri, setTempUri] = useState(redirectUri);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="API Keys"
        description="Manage your application's authentication keys and authorized redirect URIs."
      />

      <Card>
        <div className="p-5 border-b border-white/[0.06]">
          <h3 className="text-[14px] font-medium text-zinc-100 mb-1">
            Standard API Keys
          </h3>
          <p className="text-[13px] text-zinc-500">
            These keys will allow you to authenticate API requests.
          </p>
        </div>
        <div className="p-0">
          {/* Client ID */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-white/[0.04] gap-4 hover:bg-white/[0.01] transition-colors">
            <div>
              <div className="text-[13px] font-medium text-zinc-300 mb-1">
                Client ID
              </div>
              <div className="text-[13px] font-mono text-zinc-500">
                {clientId}
              </div>
            </div>
            <button
              onClick={() => handleCopy(clientId, "clientId")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-[12px] text-zinc-300 transition-all"
            >
              {copied === "clientId" ? (
                <CheckCircle2 size={14} className="text-emerald-400" />
              ) : (
                <Copy size={14} />
              )}
              {copied === "clientId" ? "Copied" : "Copy"}
            </button>
          </div>
          {/* Client Secret */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 hover:bg-white/[0.01] transition-colors">
            <div>
              <div className="text-[13px] font-medium text-zinc-300 mb-1">
                Secret Key
              </div>
              <div className="text-[13px] font-mono text-zinc-500">
                {showSecret
                  ? "thisissomedummysecret_edited"
                  : "••••••••••••••••••••••••••••••••"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSecret(!showSecret)}
                className="flex items-center justify-center w-8 h-8 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400 transition-all"
              >
                {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                onClick={() =>
                  handleCopy("thisissomedummysecret_edited", "secret")
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-[12px] text-zinc-300 transition-all"
              >
                {copied === "secret" ? (
                  <CheckCircle2 size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} />
                )}
                {copied === "secret" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-medium text-zinc-100 mb-1">
              Redirect URIs
            </h3>
            <p className="text-[13px] text-zinc-500">
              Allowed URLs where users will be redirected after authentication.
            </p>
          </div>
          <button
            onClick={() => setEditingUri(!editingUri)}
            className="text-[13px] text-zinc-400 hover:text-zinc-100 flex items-center gap-1.5 transition-colors"
          >
            <Pencil size={14} /> {editingUri ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="p-5">
          {editingUri ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={tempUri}
                onChange={(e) => setTempUri(e.target.value)}
                className="flex-1 bg-black border border-white/[0.1] rounded-lg px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:border-violet-500 transition-colors font-mono"
              />
              <button
                onClick={() => {
                  onUpdateRedirectUri?.(tempUri);
                  setEditingUri(false);
                }}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-[13px] font-medium rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-lg border border-white/[0.04] bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <Link2 size={16} className="text-zinc-500" />
                <span className="font-mono text-[13px] text-zinc-300">
                  {redirectUri}
                </span>
              </div>
              <button
                onClick={() => handleCopy(redirectUri, "uri")}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <Copy size={14} />
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function UsersView({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Users"
        description="Manage the users authenticated in your application."
        action={
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search users..."
              className="pl-9 pr-4 py-2 bg-[#121212] border border-white/[0.08] rounded-lg text-[13px] text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] w-64 transition-all"
            />
          </div>
        }
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  User
                </th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  User ID
                </th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  Last Sign In
                </th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium text-right">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user, i) => (
                <tr
                  key={user.id}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white ${
                          AVATAR_COLORS[i % AVATAR_COLORS.length]
                        }`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-zinc-200">
                          {user.name}
                        </div>
                        <div className="text-[12px] text-zinc-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[12px] font-mono text-zinc-500">
                    {user.id}
                  </td>
                  <td className="px-5 py-3 text-[13px] text-zinc-400">
                    {user.lastSignIn}
                  </td>
                  <td className="px-5 py-3 text-[13px] text-zinc-400 text-right">
                    {user.joined}
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-zinc-500 text-[13px]"
                  >
                    No users found matching "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.01]">
          <span className="text-[12px] text-zinc-500">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
            {filtered.length} users
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded border border-white/[0.08] hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-zinc-400"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded border border-white/[0.08] hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-zinc-400"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SessionsView({ sessions }: { sessions: Session[] }) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Active Sessions"
        description="View and manage active user sessions across your application."
        action={
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-[13px] text-zinc-300 transition-all">
            <RefreshCw size={14} /> Refresh
          </button>
        }
      />
      <Card>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.01]">
              <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Session ID
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                User Email
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Device Info
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Expires
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr
                key={s.id}
                className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-5 py-4 font-mono text-[12px] text-zinc-400">
                  {s.id}
                </td>
                <td className="px-5 py-4 text-[13px] text-zinc-200">
                  {s.email}
                </td>
                <td className="px-5 py-4 text-[13px] text-zinc-400">
                  {s.device || "Unknown Device"}
                </td>
                <td className="px-5 py-4 font-mono text-[12px] text-zinc-500">
                  {s.expiresAt}
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="text-[12px] font-medium text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-300">
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function SettingsView({ onDelete, isDeleting }: any) {
  return (
    <div className="space-y-8 max-w-4xl">
      <SectionHeader
        title="Settings"
        description="Manage your application settings and destructive actions."
      />

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.02] overflow-hidden">
        <div className="p-5 border-b border-red-500/10 flex items-center gap-2 text-red-400">
          <AlertCircle size={16} />
          <h3 className="text-[14px] font-medium">Danger Zone</h3>
        </div>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-[14px] font-medium text-zinc-200 mb-1">
              Delete application
            </div>
            <div className="text-[13px] text-zinc-500 max-w-md leading-relaxed">
              Permanently delete this application and all of its corresponding
              data. This action is irreversible and cannot be undone.
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[13px] font-medium transition-all flex-shrink-0 border border-red-500/20">
                <Trash2 size={14} /> Delete Application
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#121212] border border-white/[0.1] sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-zinc-50">
                  Delete Application
                </AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  Are you sure? This action cannot be undone. This will
                  permanently delete the application, user data, and all active
                  sessions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel className="bg-transparent border-white/[0.1] text-zinc-300 hover:bg-white/[0.05] hover:text-white">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 text-white border-0 min-w-[100px]"
                >
                  {isDeleting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Yes, delete app"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

// ─── Main Application Layout ──────────────────────────────────────────────────

export default function AppDetailsDashboard({
  appName = "AI-SAAS",
  workspaceName = "Personal workspace",
  clientId = "app_2xNk8mQpLfR9vT3cBhYjUeWs",
  redirectUri = "https://acme.com/api/auth/callback",
  totalUsers = 2847,
  activeSessions = MOCK_SESSIONS,
  users = MOCK_USERS,
  createdAt = "2024-09-04",
  onDelete,
  isDeleting,
  onUpdateRedirectUri,
}: any) {
  const [activeTab, setActiveTab] = useState("overview");

  const NAV_TABS = [
    { id: "overview", label: "Overview" },
    { id: "users", label: "Users" },
    { id: "sessions", label: "Sessions" },
    { id: "credentials", label: "API Keys" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col text-zinc-200 font-sans selection:bg-violet-500/30">
      {/* ─── Top Navigation ─── */}
      <nav className="border-b border-white/[0.08] bg-[#0A0A0A] sticky top-0 z-30">
        {/* Tier 1: Breadcrumbs & Right Actions */}
        <div className="h-14 px-4 flex items-center justify-between">
          {/* Left Context Switchers */}
          <div className="flex items-center text-[13px] text-zinc-300">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-violet-600 mr-3">
              <Hexagon size={14} className="text-white fill-white" />
            </div>

            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              {workspaceName}
              <span className="px-1.5 py-0.5 rounded-sm bg-white/10 text-[10px] text-zinc-400 font-medium ml-1">
                Hobby
              </span>
              <ChevronDown size={14} className="text-zinc-500 ml-0.5" />
            </button>

            <span className="text-zinc-600 mx-2">/</span>

            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              {appName}
              <ChevronDown size={14} className="text-zinc-500 ml-0.5" />
            </button>

            <span className="text-zinc-600 mx-2">/</span>

            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)] mr-1"></span>
              Development
              <ChevronDown size={14} className="text-zinc-500 ml-0.5" />
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-violet-600 border border-[#0A0A0A] text-[9px] font-bold text-white flex items-center justify-center rounded-full">
                1
              </span>
            </button>
            <button className="h-7 px-3 bg-white/10 hover:bg-white/15 border border-white/5 rounded-md text-[13px] font-medium text-white transition-colors">
              Invite
            </button>
            <button className="w-7 h-7 rounded-full bg-fuchsia-700 flex items-center justify-center text-[12px] font-medium text-white ml-1">
              D
            </button>
          </div>
        </div>

        {/* Tier 2: App Navigation Links */}
        <div className="flex items-center gap-6 px-4 pt-1">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-[13px] font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-zinc-50"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Main Content Area ─── */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-[1040px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {activeTab === "overview" && (
                <OverviewView
                  totalUsers={totalUsers}
                  activeSessions={activeSessions.length}
                  createdAt={createdAt}
                  users={users}
                />
              )}
              {activeTab === "users" && <UsersView users={users} />}
              {activeTab === "sessions" && (
                <SessionsView sessions={activeSessions} />
              )}
              {activeTab === "credentials" && (
                <CredentialsView
                  clientId={clientId}
                  redirectUri={redirectUri}
                  onUpdateRedirectUri={onUpdateRedirectUri}
                />
              )}
              {activeTab === "settings" && (
                <SettingsView onDelete={onDelete} isDeleting={isDeleting} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

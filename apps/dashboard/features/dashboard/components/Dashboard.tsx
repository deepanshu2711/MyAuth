"use client";
import { useMemo, useState } from "react";
import {
  Plus,
  Settings,
  Users,
  ChevronRight,
  Activity,
  Calendar,
  Shield,
  Globe,
  Key,
  Bell,
  CreditCard,
  LogOut,
  ChevronDown,
  Search,
  MoreHorizontal,
  Layers,
  Zap,
  AlertTriangle,
  Check,
  Copy,
  Trash2,
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  Hash,
  Webhook,
  Code2,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { useGetAllUserOrgsQuery } from "../hooks/query/useGetAllUserOrgsQuery";
import { OrgSwitcher } from "./OrgSwitcher";
import { useGetOrgAppsQuery } from "../hooks/query/useGetOrgAppsQuery";
import { ApplicationTab } from "./AppTab";
import { GetUserOrgsResponse } from "../types";
import { useRegisterAppMutation } from "../hooks/mutation/useRegisterAppMutation";
import { useGetOrgTeamQuery } from "../hooks/query/useGetOrgTeamQuery";

const MOCK_APPS = [
  {
    id: 1,
    name: "MyAuth",
    slug: "proud-terrapin-51.authcore.dev",
    env: null,
    updated: "4mo ago",
    users: 142,
    sessions: 12,
  },
  {
    id: 2,
    name: "New-Tube",
    slug: "emerging-grouper-34.authcore.dev",
    env: null,
    updated: "1y ago",
    users: 890,
    sessions: 0,
  },
  {
    id: 3,
    name: "PingPanda",
    slug: "oriented-quail-80.authcore.dev",
    env: null,
    updated: "1y ago",
    users: 56,
    sessions: 3,
  },
  {
    id: 4,
    name: "Slide",
    slug: "allowing-goblin-87.authcore.dev",
    env: null,
    updated: "1y ago",
    users: 234,
    sessions: 8,
  },
  {
    id: 5,
    name: "SmartConnect",
    slug: "tolerant-honeybee-16.authcore.dev",
    env: "production",
    updated: "2y ago",
    users: 1204,
    sessions: 47,
  },
  {
    id: 6,
    name: "Instagram Clone",
    slug: "alive-mantis-81.authcore.dev",
    env: null,
    updated: "2y ago",
    users: 3421,
    sessions: 0,
  },
  {
    id: 7,
    name: "Discord-Clone",
    slug: "internal-werewolf-53.authcore.dev",
    env: null,
    updated: "2y ago",
    users: 789,
    sessions: 22,
  },
  {
    id: 8,
    name: "AI-SAAS",
    slug: "positive-hyena-64.authcore.dev",
    env: "production",
    updated: "2y ago",
    users: 2890,
    sessions: 134,
  },
];

const MOCK_MEMBERS = [
  {
    id: 1,
    name: "Dhruv Sharma",
    email: "dhruv@example.com",
    role: "Admin",
    avatar: "DS",
    joined: "Jan 2024",
    status: "active",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@example.com",
    role: "Developer",
    avatar: "PV",
    joined: "Mar 2024",
    status: "active",
  },
  {
    id: 3,
    name: "Arjun Singh",
    email: "arjun@example.com",
    role: "Viewer",
    avatar: "AS",
    joined: "Apr 2024",
    status: "pending",
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha@example.com",
    role: "Developer",
    avatar: "NG",
    joined: "May 2024",
    status: "active",
  },
];

const ROLE_COLORS = {
  Admin: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Developer: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Viewer: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [appName, setAppName] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [apps, setApps] = useState(MOCK_APPS);
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Developer");
  const [orgName, setOrgName] = useState("Personal workspace");
  const [plan, setPlan] = useState("Hobby");
  const [copiedKey, setCopiedKey] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [settingsTab, setSettingsTab] = useState("general");

  const { data: orgsData } = useGetAllUserOrgsQuery();
  const [selectedOrg, setSelectedOrg] = useState<GetUserOrgsResponse>();
  const currentOrg = selectedOrg ?? orgsData?.find((i) => i.org.isPersonal);

  const { data: orgApps } = useGetOrgAppsQuery(currentOrg?.orgId!);
  const { data: orgTeam } = useGetOrgTeamQuery(currentOrg?.orgId!);

  console.log("orgTeam", orgTeam);

  const { mutate: registerApp, isPending: isCreatingApp } =
    useRegisterAppMutation();

  const handleCreateApp = () => {
    registerApp(
      {
        name: appName,
        redirectUris: [redirectUri],
        orgId: currentOrg?.orgId!,
      },
      {
        onSuccess: () => {
          setAppName("");
          setRedirectUri("");
          setShowCreateModal(false);
        },
      },
    );
  };

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    const name = inviteEmail.split("@")[0];
    const initials = name.slice(0, 2).toUpperCase();
    setMembers([
      ...members,
      {
        id: members.length + 1,
        name,
        email: inviteEmail,
        role: inviteRole,
        avatar: initials,
        joined: "just now",
        status: "pending",
      },
    ]);
    setInviteEmail("");
    setShowInviteModal(false);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const tabs = [
    { id: "applications", label: "Applications", icon: Layers },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
      className="min-h-screen bg-[#0a0a0b] text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        .app-card { transition: all 0.2s ease; }
        .app-card:hover { transform: translateY(-1px); }
        .tab-underline { position: relative; }
        .tab-underline.active::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: white; border-radius: 2px 2px 0 0; }
        .mono { font-family: 'DM Mono', 'Fira Code', monospace; }
        .fade-in { animation: fadeIn 0.25s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .ping-dot::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: currentColor; animation: ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.6; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        input, select { outline: none; }
        input:focus, select:focus { border-color: rgba(255,255,255,0.3) !important; }
      `}</style>

      {/* Top Nav */}
      <nav
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(10,10,11,0.98)",
          backdropFilter: "blur(12px)",
        }}
        className="sticky top-0 z-40 px-4 md:px-6"
      >
        <div className=" mx-auto flex items-center justify-between h-14">
          {/* Left: Logo + Org */}
          {orgsData && currentOrg && (
            <OrgSwitcher
              orgs={orgsData!}
              selectedOrg={currentOrg}
              setSelectedOrg={setSelectedOrg}
            />
          )}

          {/* Right */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
              <Bell className="w-3.5 h-3.5" /> Invite
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-semibold">
              DS
            </div>
            <button
              className="md:hidden p-1"
              onClick={() => setMobileNav(!mobileNav)}
            >
              {mobileNav ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className=" mx-auto flex items-center gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-underline flex items-center gap-1.5 px-4 py-3 text-sm transition-colors whitespace-nowrap ${activeTab === tab.id ? "active text-white font-medium" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ── APPLICATIONS ── */}
        {activeTab === "applications" && orgApps && (
          <ApplicationTab
            orgApps={orgApps}
            setShowCreateModal={setShowCreateModal}
          />
        )}

        {/* ── TEAM ── */}
        {activeTab === "team" && (
          <div className="fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold">Team</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {orgTeam?.length} members
                </p>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-1.5 text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Invite
              </button>
            </div>

            {/* Role stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                {
                  label: "Total Members",
                  value: orgTeam?.length,
                  icon: Users,
                  color: "text-violet-400",
                },
                {
                  label: "Active",
                  value: orgTeam?.length,
                  icon: Activity,
                  color: "text-emerald-400",
                },
                {
                  label: "Pending",
                  value: 0,
                  icon: Mail,
                  color: "text-amber-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#111113",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  className="rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-500">{stat.label}</span>
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  </div>
                  <span className="text-2xl font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Members list */}
            <div
              style={{
                background: "#111113",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              className="rounded-xl overflow-hidden"
            >
              <div
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                className="px-5 py-3 grid grid-cols-12 text-[10px] font-medium text-zinc-600 uppercase tracking-wider"
              >
                <span className="col-span-5">Member</span>
                <span className="col-span-3 hidden md:block">Role</span>
                <span className="col-span-2 hidden md:block">Joined</span>
                <span className="col-span-2">Status</span>
              </div>

              {orgTeam &&
                orgTeam?.map((member, i) => (
                  <div
                    key={member._id}
                    style={{
                      borderBottom:
                        i < members.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                    }}
                    className="px-5 py-4 grid grid-cols-12 items-center hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Avatar + Info */}
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-xs font-semibold shrink-0">
                        <Image
                          src={member.user.avatar}
                          width={40}
                          height={40}
                          alt="avatar"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-100">
                          {member.user.name}
                        </p>
                        <p className="text-[11px] text-zinc-500">
                          {member.user.email}
                        </p>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="col-span-3 hidden md:block">
                      <select
                        value={member.role}
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "inherit",
                        }}
                        className={`text-xs px-2 py-1 rounded-md cursor-pointer`}
                      >
                        {["Admin", "Developer", "Viewer"].map((r) => (
                          <option
                            key={r}
                            value={r}
                            style={{ background: "#1a1a1b" }}
                          >
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Joined */}
                    <span className="col-span-2 hidden md:block text-xs text-zinc-500">
                      {member.createdAt.slice(0, 10)}
                    </span>

                    {/* Status */}
                    <div className="col-span-2 flex items-center justify-between">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20`}
                      >
                        Active
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === "settings" && (
          <div className="fade-in">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">Settings</h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Manage your workspace preferences
              </p>
            </div>

            <div className="flex gap-6 flex-col md:flex-row">
              {/* Settings sidebar */}
              <div className="md:w-48 shrink-0">
                <nav className="space-y-0.5">
                  {[
                    { id: "general", label: "General", icon: Settings },
                    { id: "security", label: "Security", icon: Shield },
                    { id: "billing", label: "Billing", icon: CreditCard },
                    { id: "api", label: "API Keys", icon: Key },
                    { id: "domains", label: "Domains", icon: Globe },
                    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSettingsTab(s.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${settingsTab === s.id ? "bg-white/8 text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/4"} ${s.id === "danger" ? "text-red-500 hover:text-red-400" : ""}`}
                    >
                      <s.icon className="w-3.5 h-3.5" />
                      {s.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Settings content */}
              <div className="flex-1 space-y-4 min-w-0">
                {settingsTab === "general" && (
                  <div className="space-y-4 fade-in">
                    {/* Org Name */}
                    <div
                      style={{
                        background: "#111113",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      className="rounded-xl p-5"
                    >
                      <h3 className="text-sm font-semibold mb-1">
                        Workspace Name
                      </h3>
                      <p className="text-xs text-zinc-500 mb-4">
                        This is your organization's display name.
                      </p>
                      <input
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                        }}
                        className="w-full px-3 py-2 rounded-lg text-sm mb-3"
                      />
                      <button
                        onClick={() => {}}
                        className="text-xs font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>

                    {/* Plan */}
                    <div
                      style={{
                        background: "#111113",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      className="rounded-xl p-5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-sm font-semibold mb-1">
                            Current Plan
                          </h3>
                          <p className="text-xs text-zinc-500">
                            You're on the{" "}
                            <span className="text-violet-400 font-medium">
                              {plan}
                            </span>{" "}
                            plan.
                          </p>
                        </div>
                        <span
                          style={{
                            background: "rgba(139,92,246,0.15)",
                            border: "1px solid rgba(139,92,246,0.3)",
                          }}
                          className="text-xs font-semibold text-violet-400 px-3 py-1.5 rounded-lg"
                        >
                          {plan}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            label: "Hobby",
                            desc: "Free forever",
                            color: "border-zinc-700",
                          },
                          {
                            label: "Pro",
                            desc: "$25/mo",
                            color: "border-violet-600 bg-violet-600/5",
                          },
                        ].map((p) => (
                          <button
                            key={p.label}
                            onClick={() => setPlan(p.label)}
                            style={{ border: `1px solid` }}
                            className={`relative rounded-lg p-3 text-left transition-all ${plan === p.label ? "border-violet-600 bg-violet-600/8" : "border-zinc-800 hover:border-zinc-700"}`}
                          >
                            {plan === p.label && (
                              <Check className="absolute top-2 right-2 w-3 h-3 text-violet-400" />
                            )}
                            <p className="text-sm font-medium">{p.label}</p>
                            <p className="text-[11px] text-zinc-500">
                              {p.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {settingsTab === "security" && (
                  <div className="space-y-4 fade-in">
                    {[
                      {
                        title: "Two-Factor Authentication",
                        desc: "Add an extra layer of security to your account.",
                        enabled: true,
                      },
                      {
                        title: "Session Timeout",
                        desc: "Automatically sign out after 30 minutes of inactivity.",
                        enabled: false,
                      },
                      {
                        title: "Login Notifications",
                        desc: "Receive email alerts on new sign-ins.",
                        enabled: true,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        style={{
                          background: "#111113",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        className="rounded-xl p-5 flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-sm font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        <div
                          className={`relative h-5 w-9 rounded-full cursor-pointer transition-colors ${item.enabled ? "bg-violet-600" : "bg-zinc-700"}`}
                        >
                          <div
                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${item.enabled ? "translate-x-4" : "translate-x-0.5"}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {settingsTab === "api" && (
                  <div className="space-y-4 fade-in">
                    <div
                      style={{
                        background: "#111113",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      className="rounded-xl overflow-hidden"
                    >
                      <div
                        className="p-5 flex items-center justify-between"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <div>
                          <h3 className="text-sm font-semibold">API Keys</h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Use these to authenticate API requests.
                          </p>
                        </div>
                        <button className="flex items-center gap-1.5 text-xs font-medium bg-white/8 hover:bg-white/12 border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
                          <Plus className="w-3 h-3" /> New Key
                        </button>
                      </div>
                      {[
                        {
                          name: "Production Key",
                          key: "ac_live_xK9mP2nQ4rT8vY1wZ5bC7dE3fG6hJ0",
                          created: "Jan 15, 2024",
                        },
                        {
                          name: "Development Key",
                          key: "ac_test_aA1bB2cC3dD4eE5fF6gG7hH8iI9jJ0",
                          created: "Mar 2, 2024",
                        },
                      ].map((apiKey) => (
                        <div
                          key={apiKey.name}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                          className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                        >
                          <div>
                            <p className="text-sm font-medium">{apiKey.name}</p>
                            <p className="mono text-[11px] text-zinc-600 mt-0.5">
                              {apiKey.key.slice(0, 28)}••••••••
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-zinc-600 hidden md:block">
                              {apiKey.created}
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(apiKey.key, apiKey.name)
                              }
                              className="p-1.5 rounded-lg hover:bg-white/8 transition-colors"
                            >
                              {copiedKey === apiKey.name ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-zinc-500" />
                              )}
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100">
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {settingsTab === "billing" && (
                  <div className="space-y-4 fade-in">
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.08) 100%)",
                        border: "1px solid rgba(139,92,246,0.25)",
                      }}
                      className="rounded-xl p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                          Current Plan
                        </span>
                        <span className="text-xs text-zinc-400">{plan}</span>
                      </div>
                      <p className="text-2xl font-semibold mb-1">
                        {plan === "Hobby" ? "$0" : "$25"}
                        <span className="text-sm font-normal text-zinc-400">
                          /mo
                        </span>
                      </p>
                      <p className="text-xs text-zinc-500">
                        Next billing date: July 1, 2026
                      </p>
                      <button className="mt-4 flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                        Upgrade Plan <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div
                      style={{
                        background: "#111113",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      className="rounded-xl p-5"
                    >
                      <h3 className="text-sm font-semibold mb-3">
                        Payment Method
                      </h3>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/4 border border-white/8">
                        <CreditCard className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-300">
                          •••• •••• •••• 4242
                        </span>
                        <span className="text-xs text-zinc-600 ml-auto">
                          Expires 12/26
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {settingsTab === "domains" && (
                  <div className="space-y-4 fade-in">
                    <div
                      style={{
                        background: "#111113",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      className="rounded-xl p-5"
                    >
                      <h3 className="text-sm font-semibold mb-1">
                        Custom Domains
                      </h3>
                      <p className="text-xs text-zinc-500 mb-4">
                        Add custom domains for your authentication flows.
                      </p>
                      <div className="flex gap-2">
                        <input
                          placeholder="auth.yourapp.com"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "white",
                          }}
                          className="flex-1 px-3 py-2 rounded-lg text-sm placeholder-zinc-600"
                        />
                        <button className="text-xs font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors shrink-0">
                          Add
                        </button>
                      </div>
                      <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-white/4 border border-white/8">
                        <Globe className="w-4 h-4 text-violet-400 shrink-0" />
                        <span className="mono text-sm text-zinc-300 truncate">
                          proud-terrapin-51.authcore.dev
                        </span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full ml-auto shrink-0">
                          Default
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {settingsTab === "danger" && (
                  <div className="space-y-4 fade-in">
                    {[
                      {
                        title: "Transfer Workspace",
                        desc: "Transfer ownership of this workspace to another member.",
                        action: "Transfer",
                        color: "border-amber-500/30 bg-amber-500/5",
                      },
                      {
                        title: "Delete Workspace",
                        desc: "Permanently delete this workspace and all its data. This cannot be undone.",
                        action: "Delete Workspace",
                        color: "border-red-500/30 bg-red-500/5",
                        danger: true,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        style={{ border: `1px solid` }}
                        className={`rounded-xl p-5 ${item.color}`}
                      >
                        <h3
                          className={`text-sm font-semibold mb-1 ${item.danger ? "text-red-400" : ""}`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mb-4">
                          {item.desc}
                        </p>
                        <button
                          className={`text-xs font-medium px-4 py-2 rounded-lg border transition-colors ${item.danger ? "border-red-500/40 text-red-400 hover:bg-red-500/10" : "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"}`}
                        >
                          {item.action}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create App Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            style={{
              background: "#111113",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            className="rounded-2xl w-full max-w-md p-6 fade-in"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold">Create Application</h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Register a new app to start authenticating users
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 hover:bg-white/8 rounded-lg transition-colors text-zinc-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Application Name
                </label>
                <input
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                  className="w-full px-3 py-2.5 rounded-lg text-sm placeholder-zinc-600"
                  placeholder="My Awesome App"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Redirect URI
                </label>
                <input
                  value={redirectUri}
                  onChange={(e) => setRedirectUri(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                  className="w-full px-3 py-2.5 rounded-lg text-sm placeholder-zinc-600"
                  placeholder="https://yourapp.com/callback"
                />
                <p className="text-[11px] text-zinc-600 mt-1.5">
                  Where users are redirected after authentication
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleCreateApp}
                disabled={isCreatingApp}
                className="flex-1 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCreatingApp ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </div>
                ) : (
                  "Create Application"
                )}
              </button>

              <button
                onClick={() => setShowCreateModal(false)}
                disabled={isCreatingApp}
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                className="flex-1 py-2.5 text-sm text-zinc-400 rounded-lg hover:bg-white/4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            style={{
              background: "#111113",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            className="rounded-2xl w-full max-w-md p-6 fade-in"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold">Invite Team Member</h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Send an invite to collaborate on this workspace
                </p>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1.5 hover:bg-white/8 rounded-lg transition-colors text-zinc-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                  className="w-full px-3 py-2.5 rounded-lg text-sm placeholder-zinc-600"
                  placeholder="colleague@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  style={{
                    background: "#1a1a1b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                  className="w-full px-3 py-2.5 rounded-lg text-sm"
                >
                  <option>Admin</option>
                  <option>Developer</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleInvite}
                className="flex-1 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-100 transition-colors"
              >
                Send Invite
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                className="flex-1 py-2.5 text-sm text-zinc-400 rounded-lg hover:bg-white/4 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

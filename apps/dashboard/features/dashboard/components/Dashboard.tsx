"use client";
import { useState } from "react";
import { useGetUserAppsQuery } from "../hooks/query/useGetUserAppsQuery";
import { useGetUserAppsSummaryQuery } from "../hooks/query/useGetUserAppsSummaryQuery";
import { useRegisterAppMutation } from "../hooks/mutation/useRegisterAppMutation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Calendar,
  ChartBar,
  ChevronRight,
  Copy,
  Network,
  Plus,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [appName, setAppName] = useState("");
  const [redirectUri, setRedirectUri] = useState("");

  //Query
  const { data, isLoading } = useGetUserAppsQuery();
  const userApps = {
    data: [],
  };
  const { data: summary } = useGetUserAppsSummaryQuery();

  //Mutations
  const { mutate: registerApp, isPending: isRegisteringApp } =
    useRegisterAppMutation();

  const handleRegisterApp = async () => {
    registerApp({ name: appName, redirectUris: [redirectUri] });
    setShowCreateModal(false);
    setAppName("");
    setRedirectUri("");
  };

  return (
    <div className="min-h-screen mt-28 bg-black text-white">
      {/* Header */}

      <div className="max-w-7xl  mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-sans mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm font-sans">
            Manage your authentication applications
          </p>
        </div>

        {!isLoading && userApps?.data?.length === 0 ? (
          <div className="relative w-full rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 py-24 text-center overflow-hidden">
            {/* Background Visual Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Subtle Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              {/* Radial Gradient Glow from center */}
              <div className="absolute left-0 top-0 right-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-zinc-950" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative flex flex-col items-center z-10">
              {/* Icon with Concentric Rings Animation */}
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700 shadow-2xl">
                  <div className="absolute inset-0 rounded-2xl bg-cyan-500/10" />
                  <Network className="size-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </div>

                {/* Decorative decorative rings behind */}
                <div className="absolute -inset-4 rounded-3xl border border-zinc-800/50 -z-10" />
                <div className="absolute -inset-8 rounded-[32px] border border-zinc-800/30 -z-20" />
              </div>

              {/* Text Content */}
              <div className="max-w-lg space-y-3 mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Create your first application
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  You haven't created any applications yet. Register an app to
                  start authenticating users, managing sessions, and securing
                  your APIs in minutes.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  onClick={() => setShowCreateModal(true)} // Assuming context exists
                  className="h-10 px-6 bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-105 transition-all duration-300 font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <Plus className=" size-4" />
                  Create Application
                </Button>

                <Link
                  href="/docs/quickstart"
                  className="group flex items-center gap-1 text-sm text-zinc-500 hover:text-cyan-400 transition-colors px-4 py-2"
                >
                  Read the Quickstart
                  <ChevronRight className="size-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Feature Pills (Social Proof) */}
              <div className="mt-12 flex flex-wrap justify-center gap-3">
                {[
                  { icon: Users, text: "User Management" },
                  { icon: ShieldCheck, text: "OAuth & Security" },
                  { icon: Activity, text: "Real-time Analytics" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[11px] font-medium text-zinc-400"
                  >
                    <feature.icon className="size-3 text-zinc-500" />
                    {feature.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              onClick={() => setShowCreateModal(true)}
              className="bg-white/5 text-white border-white/10 group hover:border-white/20 transition-colors border border-dotted"
            >
              <CardContent className="h-full">
                <div className="items-center border-dashed gap-2 text-gray-600 group-hover:text-gray-300 cursor-pointer flex justify-center h-full">
                  <Plus className="size-4" />
                  <p>Create application</p>
                </div>
              </CardContent>
            </Card>

            {userApps?.data?.map((app) => (
              <Link
                key={app._id}
                href={`/app/${app._id}`}
                className="group block h-full"
              >
                <Card className="relative pb-0 h-full overflow-hidden bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">
                  {/* Subtle Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardContent className=" space-y-5 relative">
                    {/* Header: Logo + Status */}
                    <div className="flex justify-between items-start">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-zinc-800 to-black p-0.5 shadow-inner">
                          <div className="h-full w-full rounded-[10px] overflow-hidden bg-zinc-950 flex items-center justify-center">
                            <Image
                              src="/x.png"
                              width={40}
                              height={40}
                              alt="app-logo"
                              className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-full px-2.5 py-1 backdrop-blur-md">
                        {/* Status Pill */}
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
                          Healthy
                        </span>
                      </div>
                    </div>

                    {/* Main Info */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors tracking-tight">
                          {app.name}
                        </h3>
                        {/* Arrow that slides in on hover */}
                        <ChevronRight className="w-4 h-4 text-zinc-500 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className="border-zinc-700 text-zinc-400 font-normal text-[10px] px-2 h-5"
                        >
                          Free Plan
                        </Badge>
                        <span className="text-[11px] text-zinc-500">
                          Updated 2m ago
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  {/* Footer Stats Grid */}
                  <div className="px-5 py-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-xs text-zinc-400 relative">
                    {/* Users */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-help">
                          <Users className="size-3.5 text-indigo-400" />
                          <span>{app.userCount.toLocaleString()}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Total Users</TooltipContent>
                    </Tooltip>

                    <div className="h-3 w-[1px] bg-zinc-800" />

                    {/* Date */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-help">
                          <Calendar className="size-3.5 text-indigo-400" />
                          <time className="tabular-nums">
                            {new Date(app.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "2-digit",
                              },
                            )}
                          </time>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Created on</TooltipContent>
                    </Tooltip>

                    <div className="h-3 w-[1px] bg-zinc-800" />

                    {/* Active Sessions */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-help">
                          <Activity className="size-3.5 text-emerald-400" />
                          <span>{app.activeSessionCount}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Active Sessions</TooltipContent>
                    </Tooltip>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Application Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-black border border-white/20 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create Application</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-white/5 rounded transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Application Name
                </label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="My Awesome App"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Redirect URI
                </label>
                <input
                  type="url"
                  value={redirectUri}
                  onChange={(e) => setRedirectUri(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="https://yourapp.com/callback"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Where users will be redirected after authentication
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleRegisterApp}
                  className="flex-1  disabled:animate-pulse px-4 py-2  bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
                  disabled={isRegisteringApp}
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-white/20 rounded hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

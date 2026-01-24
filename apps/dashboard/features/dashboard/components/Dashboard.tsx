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
  Copy,
  Network,
  Plus,
  Settings,
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
  const { data: userApps, isLoading } = useGetUserAppsQuery();
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
    <div className="min-h-screen mt-16 bg-black text-white">
      {/* Header */}

      <div className="max-w-7xl  mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-sans mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm font-sans">
            Manage your authentication applications
          </p>
        </div>

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
            <Card
              key={app._id}
              className="group  relative bg-white/5 text-white border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07]"
            >
              <CardContent className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <Link
                    href={`/app/${app._id}`}
                    className="flex items-start gap-3"
                  >
                    <Image
                      src="/x.png"
                      width={36}
                      height={36}
                      alt="app-logo"
                      className="rounded-md group-hover:opacity-100 opacity-30"
                    />

                    <div className="leading-tight">
                      <h3 className="text-sm font-medium tracking-tight">
                        {app.name}
                      </h3>

                      {/* Last activity */}
                      <p className="mt-1 text-[11px] text-white/40">
                        Updated {"2 min ago"}
                      </p>
                    </div>
                  </Link>

                  {/* Health */}
                </div>

                {/* Environment + Plan */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-xs font-medium text-emerald-400">
                      Healthy
                    </span>
                  </div>

                  <Badge className="rounded-full border border-white/10 px-2 py-0.5 text-white/60">
                    Free Plan
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-1.5 text-white/70">
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <Users className="size-3.5 text-cyan-400" />
                        <span>{app.userCount.toLocaleString()}</span>
                      </TooltipTrigger>
                      <TooltipContent>Total Users</TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-white/70">
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <Calendar className="size-3.5 text-cyan-400" />
                        <time>
                          {new Date(app.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                          })}
                        </time>
                      </TooltipTrigger>
                      <TooltipContent>Create Date</TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 text-white/70">
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <Activity className="size-3.5 text-emerald-400" />
                        <span>{app.activeSessionCount}</span>
                      </TooltipTrigger>
                      <TooltipContent>Active sessions</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/app/${app._id}`}
                  className="inline-flex hover:text-neutral-300 items-center gap-1 text-sm text-neutral-600"
                >
                  Go to app →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
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

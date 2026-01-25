"use client";
import React, { useState } from "react";
import {
  Copy,
  Eye,
  EyeOff,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  RefreshCw,
  Upload,
  X,
  Loader2,
  Pencil,
  Users,
  Calendar,
  Activity,
} from "lucide-react";
import { useGetAppDetailsQuery } from "../hooks/query/useGetAppDetailsQuery";
import { useGetAppUsersQuery } from "../hooks/query/useGetAppUsersQuery";
import { useGetAppActiveSessionsQuery } from "../hooks/query/useGetAppActiveSessionsQuery";
import { AppActiveSession } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WatchingForUsers from "./WatchingForUsers";
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

export default function AppDetails({ appId }: { appId: string }) {
  const [showSecret, setShowSecret] = useState(false);
  const [showAddUriModal, setShowAddUriModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [newUri, setNewUri] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: appData, isLoading } = useGetAppDetailsQuery(appId);
  const { data: appUsers } = useGetAppUsersQuery(appId);
  const { data: activeSessions } = useGetAppActiveSessionsQuery(appId);
  const [showWatchingState, setShowWatchingState] = useState(true);

  const [copiedItem, setCopiedItem] = useState("");

  const handleCopy = (type: string) => {
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(""), 2000);
  };

  const filteredUsers =
    appUsers?.data?.filter(
      (user) =>
        user.userDetails.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.userDetails._id.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  console.log(filteredUsers);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUserDetected = () => {
    setShowWatchingState(false);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-between">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (!appData?.data?.[0]) return <div>No App Found</div>;

  // Show watching state when no users exist
  if (showWatchingState && (!appUsers?.data || appUsers.data.length === 0)) {
    return (
      <WatchingForUsers
        appId={appId}
        clientId={appData.data[0].clientId}
        onUserDetected={handleUserDetected}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-white/20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-medium tracking-tight">
                {appData.data[0].name}
              </h1>
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
            <p className="text-zinc-500 text-sm font-mono">
              ID: {appData.data[0].clientId}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white h-9 px-3"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-red-900 hover:text-red-500 hover:bg-red-950/30 h-9 w-9 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                {/* Keep existing alert content */}
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* --- Metrics Grid (Clean, no cards) --- */}
        <div className="grid grid-cols-3 gap-8 mb-16 border-y border-zinc-900 py-8">
          <div>
            <div className="text-zinc-500 text-xs uppercase tracking-wider font-medium mb-1">
              Total Users
            </div>
            <div className="text-3xl flex items-center gap-4 font-light tracking-tight">
              <Users className="text-indigo-400" />
              {appData.data[0].totalCount.toLocaleString()}
            </div>
          </div>
          <div className="border-l border-zinc-900 pl-8">
            <div className="text-zinc-500 text-xs uppercase tracking-wider font-medium mb-1">
              Active Sessions
            </div>
            <div className="text-3xl flex items-center gap-4 font-light tracking-tight">
              <Activity className=" text-emerald-400" />
              {activeSessions?.data?.length || 0}
            </div>
          </div>
          <div className="border-l border-zinc-900 pl-8">
            <div className="text-zinc-500 text-xs uppercase tracking-wider font-medium mb-1">
              Created
            </div>
            <div className="text-3xl flex font-light items-center gap-4 tracking-tight">
              <Calendar className="text-indigo-400" />
              {appData.data[0].createdAt.slice(0, 10)}
            </div>
          </div>
        </div>

        {/* --- API Keys (High Priority Info) --- */}
        <section className="mb-16">
          <h3 className="text-lg font-medium mb-6">Credentials</h3>
          <div className="space-y-4">
            {/* Client ID */}
            <div className="group flex items-center justify-between p-4 rounded-lg bg-zinc-900/40 border border-transparent hover:border-zinc-800 transition-all">
              <div className="space-y-1">
                <label className="block text-xs text-zinc-500 font-medium uppercase tracking-wider">
                  Client ID
                </label>
                <code className="block text-sm text-zinc-300 font-mono">
                  {appData.data[0].clientId}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy("clientId")}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            {/* Client Secret */}
            <div className="group flex items-center justify-between p-4 rounded-lg bg-zinc-900/40 border border-transparent hover:border-zinc-800 transition-all">
              <div className="space-y-1">
                <label className="block text-xs text-zinc-500 font-medium uppercase tracking-wider">
                  Client Secret
                </label>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-zinc-300 font-mono">
                    {showSecret
                      ? "YOUR_ACTUAL_SECRET_HERE"
                      : "•••••••••••••••••••••••••••••"}
                  </code>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-zinc-400"
                >
                  {showSecret ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy("clientSecret")}
                  className="text-zinc-400"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Configuration Section --- */}

        <div className="flex flex-col gap-12 mb-16">
          {/* Redirect URI */}
          <div className="">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Redirect URI</h3>
              <button
                onClick={() => setShowAddUriModal(true)}
                className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
              >
                <Pencil className="w-3 mr-2 h-3" /> Edit URI
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-zinc-900">
              <span className="text-sm font-mono text-zinc-400">
                {appData.data[0].redirectUris[0]}
              </span>
            </div>
          </div>
        </div>

        {/* --- Active Sessions Table --- */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Active Sessions</h3>
          </div>

          <div className="w-full overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-4 text-xs font-medium text-zinc-500 uppercase tracking-wider w-32">
                    Session ID
                  </th>
                  <th className="pb-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="pb-4 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">
                    Expires
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {activeSessions?.data?.map((session: any) => (
                  <tr key={session.session._id} className="group">
                    <td className="py-4 text-sm font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {session.session._id.slice(-8)}
                    </td>
                    <td className="py-4 text-sm text-zinc-300">
                      {session.userDetails.email}
                    </td>
                    <td className="py-4  text-zinc-500 text-right font-mono text-xs">
                      {new Date(session.session.expiresAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!activeSessions?.data || activeSessions.data.length === 0) && (
              <div className="py-12 text-center text-zinc-600 text-sm">
                No active sessions
              </div>
            )}
          </div>
        </section>

        {/* --- Users Table with Search --- */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-medium">Users</h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 bg-transparent border border-zinc-800 rounded-md text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-700 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="pb-3 pl-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="pb-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="pb-3 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.userDetails._id}
                    className="border-b border-zinc-900 hover:bg-zinc-900/20 transition-colors"
                  >
                    <td className="py-3 pl-2 text-sm text-zinc-300">
                      {user.userDetails.email}
                    </td>
                    <td className="py-3 text-xs font-mono text-zinc-600">
                      {user.userDetails._id}
                    </td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Minimal Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-zinc-500">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="hover:text-white disabled:opacity-30 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="hover:text-white disabled:opacity-30 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen mt-16 bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* App Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-sans mb-2">
                {appData.data[0].name}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">
                  {appData.data[0].clientId}
                </span>
                <Badge variant={"secondary"}>
                  {appData.data[0].status || "Active"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button disabled={true}>
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button onClick={() => setShowRegenerateModal(true)}>
                <RefreshCw className="w-4 h-4" />
                Regenerate Secret
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"}>
                    <Trash2 className="w-4 h-4" />
                    Delete App
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Application</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the application and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="border border-white/10 bg-transparent text-white transition-colors">
            <CardContent>
              <div className="text-gray-400 text-sm mb-2 font-sans">
                Total Users
              </div>
              <div className="text-3xl font-sans">
                {appData.data[0].totalCount.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="border border-white/10 bg-transparent text-white transition-colors">
            <CardContent>
              <div className="text-gray-400 text-sm mb-2 font-sans">
                Active Sessions
              </div>
              <div className="text-3xl font-sans">
                {activeSessions?.data?.length || 0}
              </div>
            </CardContent>
          </Card>
          <Card className="border border-white/10 bg-transparent text-white transition-colors">
            <CardContent>
              <div className="text-gray-400 text-sm mb-2 font-sans">
                App Created At
              </div>
              <div className="text-3xl font-sans">
                {appData.data[0].createdAt.slice(0, 10)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Settings */}
        <Card className="border border-white/10 bg-transparent text-white mb-8">
          <CardHeader>
            <h2 className="text-white font-sans ">Application Settings</h2>
          </CardHeader>
          <CardContent>
            {/* Redirect URIs */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-400 text-sm">Redirect URIs</label>
                <button
                  onClick={() => setShowAddUriModal(true)}
                  className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add URI
                </button>
              </div>
              <div className="space-y-2">
                {appData.data[0].redirectUris.map((uri, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border border-white/10 rounded bg-white/5"
                  >
                    <span className="text-sm">{uri}</span>
                    <button className="text-gray-400 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-3 block">
                App Logo (Optional)
              </label>
              <div className="border border-white/10 border-dashed rounded-lg p-8 bg-white/5 hover:border-white/20 transition-colors cursor-pointer text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions Table */}
        <Card className="border border-white/10 bg-transparent text-white mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-6">
              <h2 className=" font-sans">Active Sessions</h2>
              <div className="text-sm text-gray-400">
                {activeSessions?.data?.length || 0} active sessions
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-normal">
                      Session ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-normal">
                      User Email
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-normal">
                      Created At
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-normal">
                      Expires At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeSessions?.data?.map((session: AppActiveSession) => (
                    <tr
                      key={session.session._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm font-mono">
                        {session.session._id.slice(-8)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {session.userDetails.email}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {new Date(session.session.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {new Date(session.session.expiresAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!activeSessions?.data || activeSessions.data.length === 0) && (
                <div className="text-center py-8 text-gray-400">
                  No active sessions found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border border-white/10 bg-transparent text-white mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-6">
              <h2 className=" font-sans">Users</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowWatchingState(true)}
                  className="px-3 py-1 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded hover:bg-cyan-400/20 transition-colors text-sm"
                >
                  Show Setup Guide
                </button>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-normal">
                      User ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-normal">
                      Email
                    </th>
                    <th className="text-left opacity-50 line-through py-3 px-4 text-gray-400 text-sm font-normal">
                      Sign-up Date
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-normal opacity-50 line-through">
                      Last Active
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-normal opacity-50 line-through">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.userDetails._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm">
                        {user.userDetails._id}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {user.userDetails.email}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400 opacity-50 line-through">
                        {/* {user.signupDate} */}
                        27-11-2001
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400 opacity-50 line-through">
                        {/* {user.lastActive} */}
                        27-11-2001
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs opacity-50 line-through ${
                            "Active" === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {/* {user.status} */}
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded transition-colors ${
                        currentPage === page
                          ? "bg-white text-black border-white"
                          : "border-white/10 hover:bg-white/5"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>

          {/* Pagination */}
        </Card>

        {/* API Keys Section */}
        <Card className="border border-white/10 bg-transparent text-white">
          <CardHeader>
            <h2 className=" font-sans mb-6">API Keys</h2>
          </CardHeader>

          <CardContent>
            {/* Client ID */}
            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-2 block">
                Client ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={appData.data[0].clientId}
                  readOnly
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none"
                />
                <Button onClick={() => handleCopy("clientId")}>
                  <Copy className="w-4 h-4" />
                  {copiedItem === "clientId" ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Client Secret */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Client Secret
              </label>
              <div className="flex gap-2">
                <input
                  type={showSecret ? "text" : "password"}
                  value={"***********************"}
                  readOnly
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm focus:outline-none"
                  disabled={true}
                />
                <Button
                  onClick={() => setShowSecret(!showSecret)}
                  disabled={true}
                >
                  {showSecret ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  onClick={() => handleCopy("clientSecret")}
                  disabled={true}
                >
                  <Copy className="w-4 h-4" />
                  {copiedItem === "clientSecret" ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add URI Modal */}
      {showAddUriModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black border border-white/20 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Add Redirect URI</h3>
            <input
              type="text"
              value={newUri}
              onChange={(e) => setNewUri(e.target.value)}
              placeholder="https://example.com/callback"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-white/20 mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddUriModal(false)}
                className="px-4 py-2 border border-white/20 text-white rounded hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddUriModal(false);
                  setNewUri("");
                }}
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
              >
                Add URI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regenerate Secret Modal */}
      {showRegenerateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black border border-white/20 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Regenerate Client Secret
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              This will invalidate your current client secret. Any applications
              using the old secret will stop working until updated.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRegenerateModal(false)}
                className="px-4 py-2 border border-white/20 text-white rounded hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRegenerateModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Regenerate Secret
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

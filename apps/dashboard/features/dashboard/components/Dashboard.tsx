"use client";
import { useState } from "react";
import { useGetUserAppsQuery } from "../hooks/query/useGetUserAppsQuery";
import { useGetUserAppsSummaryQuery } from "../hooks/query/useGetUserAppsSummaryQuery";
import { useRegisterAppMutation } from "../hooks/mutation/useRegisterAppMutation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

        {/* Stats Overview */}
        <div className="grid grid-cols-1  md:grid-cols-3 gap-6 mb-8">
          <Card className="border bg-transparent text-white border-white/10 ">
            <CardContent>
              <div className="text-sm text-gray-400 mb-1 font-sans">
                Total Applications
              </div>
              <div className="text-3xl font-sans">
                {summary?.data[0]?.totalApps}
              </div>
            </CardContent>
          </Card>
          <Card className="border border-white/10 text-white bg-transparent font-sans">
            <CardContent>
              <div className="text-sm text-gray-400 mb-1">Total Users</div>
              <div className="text-3xl font-sans">
                {summary?.data[0]?.totalUsers}
              </div>
            </CardContent>
          </Card>
          <Card className="border border-white/10 opacity-50 line-through text-white bg-transparent">
            <CardContent>
              <div className=" font-sans text-sm text-gray-400 mb-1">
                API Requests (30d)
              </div>
              <div className="text-3xl font-sans">21,920</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-sans">Applications</h2>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus /> Create Application
          </Button>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 gap-4">
          {userApps?.data?.map((app) => (
            <Card
              key={app._id}
              className="bg-transparent text-white border-white/10"
            >
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Link
                      href={`/app/${app._id}`}
                      className="hover:text-blue-500"
                    >
                      <h3 className="text-lg font-sans mb-1">{app.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>Client ID: {app.clientId}</span>
                      <span>•</span>
                      <span className="text-green-500">Active</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-sans">
                      {app.userCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Users</div>
                  </div>
                  <div className="opacity-50 line-through">
                    <div className="text-2xl font-sans">
                      {/* {app.requests.toLocaleString()} */}
                      2,400
                    </div>
                    <div className="text-xs text-gray-400">Requests (30d)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-sans">
                      {app.createdAt.slice(0, 10)}
                    </div>
                    <div className="text-xs text-gray-400">Created</div>
                  </div>
                </div>
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

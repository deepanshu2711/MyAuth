"use client";
import { useState } from "react";
import { useGetUserAppsQuery } from "../hooks/query/useGetUserAppsQuery";

const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [appName, setAppName] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const { data: userApps, isLoading } = useGetUserAppsQuery();

  const [applications, setApplications] = useState([
    {
      id: "1",
      name: "Portfolio Website",
      clientId: "port_2f8d9a1b3c4e5f6g",
      users: 1243,
      requests: 8456,
      status: "active",
      createdAt: "2024-11-15",
      redirectUri: "https://portfolio.com/callback",
    },
    {
      id: "2",
      name: "Blog Platform",
      clientId: "blog_7h8i9j0k1l2m3n4o",
      users: 856,
      requests: 5234,
      status: "active",
      createdAt: "2024-10-22",
      redirectUri: "https://blog.com/auth/callback",
    },
    {
      id: "3",
      name: "Dev Playground",
      clientId: "dev_5p6q7r8s9t0u1v2w",
      users: 12,
      requests: 145,
      status: "active",
      createdAt: "2024-11-20",
      redirectUri: "http://localhost:3000/callback",
    },
  ]);

  const totalUsers = applications.reduce((sum, app) => sum + app.users, 0);
  const totalRequests = applications.reduce(
    (sum, app) => sum + app.requests,
    0,
  );

  return (
    <div className="min-h-screen mt-16 bg-black text-white">
      {/* Header */}

      <div className="max-w-7xl  mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Manage your authentication applications
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border border-white/10 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-1">Total Applications</div>
            <div className="text-3xl font-bold">{applications.length}</div>
          </div>
          <div className="border border-white/10 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-1">Total Users</div>
            <div className="text-3xl font-bold">
              {totalUsers.toLocaleString()}
            </div>
          </div>
          <div className="border border-white/10 opacity-50 line-through rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-1">API Requests (30d)</div>
            <div className="text-3xl font-bold">
              {totalRequests.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Applications</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors"
          >
            + Create Application
          </button>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 gap-4">
          {userApps?.data?.map((app) => (
            <div
              key={app.id}
              className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{app.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Client ID: {app.clientId}</span>
                    <span>•</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded transition-colors">
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold">
                    {app.userCount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">Users</div>
                </div>
                <div className="opacity-50 line-through">
                  <div className="text-2xl font-bold">
                    {/* {app.requests.toLocaleString()} */}
                    2400
                  </div>
                  <div className="text-xs text-gray-400">Requests (30d)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {app.createdAt.slice(0, 10)}
                  </div>
                  <div className="text-xs text-gray-400">Created</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm border border-white/20 rounded hover:bg-white/5 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-1.5 text-sm border border-white/20 rounded hover:bg-white/5 transition-colors">
                  Settings
                </button>
                <button className="px-3 py-1.5 text-sm border border-white/20 rounded hover:bg-white/5 transition-colors">
                  Analytics
                </button>
              </div>
            </div>
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
                <button className="flex-1 px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors">
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

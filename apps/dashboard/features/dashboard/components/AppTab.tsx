import { AlertTriangle, ChevronRight, Plus, Users } from "lucide-react";
import Image from "next/image";
import { GetOrgAppsResponse } from "../types";
import { useRouter } from "next/navigation";

interface ApplicationTabProps {
  orgApps: GetOrgAppsResponse[];
  setShowCreateModal: (value: boolean) => void;
}
export const ApplicationTab = ({
  orgApps,
  setShowCreateModal,
}: ApplicationTabProps) => {
  const router = useRouter();
  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Applications</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {orgApps?.length} apps in this workspace
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Create card */}
        <button
          onClick={() => setShowCreateModal(true)}
          style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
          className="rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-zinc-600 hover:text-zinc-400 hover:border-zinc-700 transition-all min-h-[160px] group"
        >
          <div className="h-9 w-9 rounded-lg border border-dashed border-zinc-700 group-hover:border-zinc-500 flex items-center justify-center transition-colors">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-sm">Create application</span>
        </button>

        {orgApps &&
          orgApps.map((app) => (
            <div
              onClick={() => router.push(`/app/${app._id}`)}
              key={app._id}
              style={{
                background: "#111113",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              className="app-card rounded-xl overflow-hidden cursor-pointer hover:border-zinc-700 group"
            >
              {/* Top accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-cyan-500 via-cyan-500/50 to-transparent" />

              <div className="p-5">
                {/* Slug */}
                <div className="mono text-[10px] text-zinc-600 mb-4 truncate">
                  {app.clientId}
                </div>

                {/* Logo + Name */}
                <div className="flex items-start justify-between mb-3">
                  <Image src="/x.png" width={40} height={40} alt="app-logo" />
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors mt-1" />
                </div>

                <h3 className="text-sm font-semibold text-zinc-100 mb-2">
                  {app.name}
                </h3>

                {/* Status badge */}
                {app.status === "active" ? (
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="ping-dot relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Active
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-medium opacity-25 text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    Inactive
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.02)",
                }}
                className="px-5 py-2.5 flex items-center justify-between"
              >
                <span className="text-[10px] text-zinc-600">
                  Created {app.createdAt.slice(0, 10)}
                </span>
                <div className="flex items-center gap-3 text-[10px] text-zinc-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-cyan-500" />
                    {/* {app.users.toLocaleString()} */}
                    1289
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

import { useState, useRef } from "react";
import { ChevronDown, Check, Building2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { GetUserOrgsResponse } from "../types";
import { CreateOrgDialog } from "./CreateOrgDialog";

export const OrgSwitcher = ({ orgs }: { orgs: GetUserOrgsResponse[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(orgs[0]);
  const dropdownRef = useRef(null);

  const handleCreateWorkspace = () => {
    setIsCreateDialogOpen(true);
    console.log("Create workspace clicked");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-lg p-1.5 pr-2 hover:bg-zinc-800/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-600/50"
      >
        <div className="h-7 w-7 rounded-md bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-cyan-900/40">
          <Building2 className="size-4" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-100">
            {selectedOrg?.org.name}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-64 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl z-50">
          <div className="px-2 py-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            Workspaces
          </div>

          <div className="flex flex-col gap-0.5">
            {orgs.map((org) => {
              const isSelected = selectedOrg?.orgId === org.orgId;

              return (
                <button
                  key={org.orgId}
                  onClick={() => {
                    setSelectedOrg(org);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full rounded-md px-2 py-2 text-sm transition-colors ${
                    isSelected
                      ? "bg-zinc-900 text-zinc-100 font-medium"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-5 w-5 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? "text-cyan-400" : "text-zinc-400"
                      }`}
                    >
                      {org.org.name[0]}
                    </div>
                    <p className="line-clamp-1">{org.org.name}</p>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-cyan-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="my-1.5 h-px bg-zinc-800/80" />

          <Button
            onClick={handleCreateWorkspace}
            variant={"ghost"}
            className="w-full"
          >
            <div className="h-5 w-5 rounded bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50">
              <Plus className="w-3 h-3" />
            </div>
            Create Workspace
          </Button>
        </div>
      )}

      <CreateOrgDialog
        isOpen={isCreateDialogOpen}
        setIsOpen={setIsCreateDialogOpen}
      />
    </div>
  );
};

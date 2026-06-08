import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../service";
import { GetOrgAppsResponse } from "../../types";

export const useGetOrgAppsQuery = (orgId: string) => {
  return useQuery<GetOrgAppsResponse[]>({
    queryKey: ["orgs", orgId],
    queryFn: () => DashboardService.getOrgApps(orgId),
    enabled: !!orgId,
  });
};

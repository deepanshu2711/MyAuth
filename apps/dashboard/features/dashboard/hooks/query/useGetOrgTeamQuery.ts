import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../service";
import { GetOrgTeamResponse } from "../../types";

export const useGetOrgTeamQuery = (orgId: string) => {
  return useQuery<GetOrgTeamResponse[]>({
    queryKey: ["orgs", "team", orgId],
    queryFn: () => DashboardService.getOrgTeam(orgId),
    enabled: !!orgId,
  });
};

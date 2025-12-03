import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../service";
import { GetUserAppsSummaryResponse } from "../../types";

export const useGetUserAppsSummaryQuery = () => {
  return useQuery<GetUserAppsSummaryResponse>({
    queryKey: ["apps_summary"],
    queryFn: DashboardService.getUserAppsSummary,
  });
};

import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../service";
import { GetUserAppsResponse } from "../../types";

export const useGetUserAppsQuery = () => {
  return useQuery<GetUserAppsResponse>({
    queryKey: ["apps"],
    queryFn: DashboardService.getUserApps,
  });
};

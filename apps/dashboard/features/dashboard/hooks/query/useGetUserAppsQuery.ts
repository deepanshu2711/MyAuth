import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../service";

export const useGetUserAppsQuery = () => {
  return useQuery({
    queryKey: ["apps"],
    queryFn: DashboardService.getUserApps,
  });
};

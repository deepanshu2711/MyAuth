import { useQuery } from "@tanstack/react-query";
import { AppDetailsService } from "../../service";
import { AppUsersResponse } from "../../types";

export const useGetAppUsersQuery = (appId: string) => {
  return useQuery<AppUsersResponse>({
    queryKey: ["app", "users", appId],
    queryFn: () => AppDetailsService.getAppUsers(appId),
  });
};

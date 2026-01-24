import { useQuery } from "@tanstack/react-query";
import { AppDetailsService } from "../../service";

export const useGetAppActiveSessionsQuery = (appId: string) => {
  return useQuery({
    queryKey: ["appActiveSessions", appId],
    queryFn: () => AppDetailsService.getAppActiveSessions(appId),
    enabled: !!appId,
  });
};

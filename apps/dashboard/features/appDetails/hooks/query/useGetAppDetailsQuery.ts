import { useQuery } from "@tanstack/react-query";
import { AppDetailsService } from "../../service";
import { GetAppDetailsResponse } from "../../types";

export const useGetAppDetailsQuery = (appId: string) => {
  return useQuery<GetAppDetailsResponse>({
    queryKey: ["app", appId],
    queryFn: () => AppDetailsService.getAppDetails(appId),
  });
};

import { useQuery } from "@tanstack/react-query";
import { AppDetailsService } from "../../service";

export const useGetAppSecretQuery = (
  appId: string,
  enabled: boolean = false,
) => {
  return useQuery({
    queryKey: ["secret", appId],
    queryFn: () => AppDetailsService.getAppSecret(appId),
    enabled: enabled,
  });
};

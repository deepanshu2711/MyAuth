import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../service";
import { GetUserOrgsResponse } from "../../types";

export const useGetAllUserOrgsQuery = () => {
  return useQuery<GetUserOrgsResponse[]>({
    queryKey: ["orgs"],
    queryFn: () => DashboardService.getAllUserOrgs(),
  });
};

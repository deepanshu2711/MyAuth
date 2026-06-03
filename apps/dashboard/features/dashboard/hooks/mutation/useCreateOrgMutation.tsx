import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardService } from "../../service";
import { toast } from "sonner";

export const useCreateOrgMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => DashboardService.createOrg(name),
    onSuccess: () => {
      toast.success("Workspace Created Successfully");

      //Invalidate Queries
      queryClient.invalidateQueries({ queryKey: ["orgs"] });
    },
  });
};

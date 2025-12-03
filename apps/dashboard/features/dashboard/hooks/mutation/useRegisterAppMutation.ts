import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardService } from "../../service";
import { toast } from "sonner";

export const useRegisterAppMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DashboardService.registerApp,
    onSuccess: () => {
      toast.success("App Registered Successfully");

      //Invalidate Queries
      queryClient.invalidateQueries({ queryKey: ["apps_summary"] });
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
};

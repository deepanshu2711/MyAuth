import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppDetailsService } from "../../service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteAppMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: AppDetailsService.deleteApp,
    onSuccess: () => {
      toast.success("App Deleted Successfully");

      //Invalidate Queries
      queryClient.invalidateQueries({ queryKey: ["apps_summary"] });
      queryClient.invalidateQueries({ queryKey: ["apps"] });

      //navigate to dashboard
      router.push("/dashboard");
    },
  });
};

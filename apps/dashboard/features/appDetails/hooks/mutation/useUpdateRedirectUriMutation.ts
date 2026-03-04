import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppDetailsService } from "../../service";
import { toast } from "sonner";

export const useUpdateRedirectUriMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      appId,
      redirectUri,
    }: {
      appId: string;
      redirectUri: string;
    }) => AppDetailsService.updateRedirectUri(appId, redirectUri),
    onSuccess: () => {
      toast.success("Redirect URI updated successfully");
      queryClient.invalidateQueries({ queryKey: ["app_details"] });
    },
  });
};

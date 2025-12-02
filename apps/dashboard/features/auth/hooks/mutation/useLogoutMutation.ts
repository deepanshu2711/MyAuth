import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { AuthService } from "../../service";

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Logout failed");
      } else {
        toast.error("Logout failed");
      }
    },
  });
};

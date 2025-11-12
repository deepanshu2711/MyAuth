import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { AuthService } from "../../service";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: AuthService.login,
    onError: (data) => {
      if (data instanceof AxiosError) {
        return toast.error(data.response?.data.message);
      }
    },
  });
};

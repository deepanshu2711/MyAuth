import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { AuthService } from "../../service";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: (data) => {
      window.location.href = data.data;
    },
    onError: (data) => {
      if (data instanceof AxiosError) {
        return toast.error(data.response?.data.message);
      }
    },
  });
};

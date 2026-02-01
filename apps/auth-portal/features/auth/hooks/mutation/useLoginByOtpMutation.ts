import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { AuthService } from "../../service";

export const useLoginByOTPMutation = () => {
  return useMutation({
    mutationFn: AuthService.loginByOtp,
    onSuccess: () => {
      toast.success("OTP sent successfully");
    },
    onError: (data) => {
      if (data instanceof AxiosError) {
        return toast.error(data.response?.data.message);
      }
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { AuthService } from "../../service";

export const useVeirfyOtpMutation = () => {
  return useMutation({
    mutationFn: AuthService.verifyOtp,
    onSuccess: (data) => {
      toast.success("Otp verified successfully");
      window.location.href = data.data;
    },
    onError: (data) => {
      if (data instanceof AxiosError) {
        return toast.error(data.response?.data.message);
      }
    },
  });
};

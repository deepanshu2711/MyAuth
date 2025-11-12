import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../service";
import { useRouter } from "next/navigation";

export const useTokenExchangeMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.exchangeToken,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/");
    },
  });
};

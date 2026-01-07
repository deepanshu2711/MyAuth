import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCurrentUser = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/auth/me`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["current_user"],
    queryFn: getCurrentUser,
  });
};

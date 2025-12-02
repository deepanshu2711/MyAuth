import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const getCurrentUser = async () => {
  const response = await api.get(`http://localhost:5005/api/auth/me`, {
    withCredentials: true,
  });
  return response.data;
};

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["current_user"],
    queryFn: getCurrentUser,
  });
};

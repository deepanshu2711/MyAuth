import api from "@/lib/api";

export const AuthService = {
  exchangeToken: async (data: { clientId: string; code: string }) => {
    const response = await api.post("/auth/token", data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("http://localhost:5005/api/auth/logout");
    return response.data;
  },
};

import api from "@/lib/api";

export const AuthService = {
  exchangeToken: async (data: { clientId: string; code: string }) => {
    const response = await api.post("/auth/token", data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/auth/logout`,
    );
    return response.data;
  },
};

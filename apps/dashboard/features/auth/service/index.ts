import api from "../../../lib/api";

export const AuthService = {
  exchangeToken: async (data: { clientId: string; code: string }) => {
    const response = await api.post("/auth/token", data);
    return response.data;
  },
};

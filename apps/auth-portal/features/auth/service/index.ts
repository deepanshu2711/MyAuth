import api from "../../../lib/api";

export const AuthService = {
  login: async (data: {
    email: string;
    password: string;
    clientId: string;
    redirect_uri: string;
  }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (data: {
    email: string;
    password: string;
    clientId: string;
    redirect_uri: string;
  }) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  redirectToGithub(clientId: string) {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github?clientId=${clientId}`;
  },
};

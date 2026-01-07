import api from "@/lib/api";

export const AppDetailsService = {
  getAppDetails: async (appId: string) => {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/app/${appId}`,
    );
    return response.data;
  },
  getAppUsers: async (appId: string) => {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/app/users/${appId}`,
    );
    return response.data;
  },
};

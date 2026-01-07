import api from "@/lib/api";

export const DashboardService = {
  getUserApps: async () => {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/app`,
    );
    return response.data;
  },
  getUserAppsSummary: async () => {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/app/summary`,
    );
    return response.data;
  },
  registerApp: async (data: { name: string; redirectUris: [string] }) => {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/app/register`,
      data,
    );
    return response.data;
  },
};

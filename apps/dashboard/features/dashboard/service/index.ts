import api from "../../../lib/api";

export const DashboardService = {
  getUserApps: async () => {
    const response = await api.get("http://localhost:5005/api/app");
    return response.data;
  },
  getUserAppsSummary: async () => {
    const response = await api.get("http://localhost:5005/api/app/summary");
    return response.data;
  },
  registerApp: async (data: { name: string; redirectUris: [string] }) => {
    const response = await api.post(
      "http://localhost:5005/api/app/register",
      data,
    );
    return response.data;
  },
};

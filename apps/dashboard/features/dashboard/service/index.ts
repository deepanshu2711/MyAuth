import api from "../../../lib/api";

export const DashboardService = {
  getUserApps: async () => {
    const response = await api.get("http://localhost:5005/api/app");
    return response.data;
  },
};

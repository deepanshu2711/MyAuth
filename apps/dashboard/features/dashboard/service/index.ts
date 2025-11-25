import api from "../../../lib/api";

export const DashboardService = {
  getUserApps: async () => {
    const response = await api.post("/api/app");
    return response.data;
  },
};

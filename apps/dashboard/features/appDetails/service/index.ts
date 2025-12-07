import api from "../../../lib/api";

export const AppDetailsService = {
  getAppDetails: async (appId: string) => {
    const response = await api.get(`http://localhost:5005/api/app/${appId}`);
    return response.data;
  },
  getAppUsers: async (appId: string) => {
    const response = await api.get(
      `http://localhost:5005/api/app/users/${appId}`,
    );
    return response.data;
  },
};

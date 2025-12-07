export interface UserApp {
  _id: string;
  name: string;
  clientId: string;
  userCount: number;
  createdAt: string;
  redirectUri: string;
}

export interface GetUserAppsResponse {
  data: UserApp[];
}

export interface UserAppSummary {
  totalApps: number;
  totalUsers: number;
}

export interface GetUserAppsSummaryResponse {
  data: UserAppSummary[];
}

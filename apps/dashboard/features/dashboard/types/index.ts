export interface UserApp {
  _id: string;
  name: string;
  clientId: string;
  userCount: number;
  activeSessionCount: number;
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

export interface Org {
  createdAt: string;
  isPersonal: boolean;
  name: string;
  ownerId: string;
  _id: string;
}

export interface GetUserOrgsResponse {
  orgId: string;
  role: "owner" | "member" | "admin";
  userId: string;
  org: Org;
}

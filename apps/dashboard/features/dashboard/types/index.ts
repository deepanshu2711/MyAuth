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

export interface GetOrgAppsResponse {
  clientId: string;
  name: string;
  orgId: string;
  status: string;
  _id: string;
  createdAt: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  globalUserId: string;
}

export interface GetOrgTeamResponse {
  _id: string;
  userId: string;
  orgId: string;
  role: "owner" | "member" | "admin";
  createdAt: string;
  user: User;
}

export interface AppDetails {
  _id: string;
  name: string;
  clientId: string;
  totalCount: number;
  createdAt: string;
  redirectUris: [string];
  ownerid: string;
  status: string;
}

export interface GetAppDetailsResponse {
  data: AppDetails[];
}

export interface UserDetails {
  _id: string;
  email: string;
  createdAt: string;
}

export interface AppUser {
  userDetails: UserDetails;
}

export interface AppUsersResponse {
  data: AppUser[];
}

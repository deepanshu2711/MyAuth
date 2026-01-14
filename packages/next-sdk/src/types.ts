export type User = {
  email: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

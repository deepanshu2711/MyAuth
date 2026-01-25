export type User = {
  email: string;
  avatar?: string;
  name?: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: () => Promise<void>;
};

export type Session = {
  user: User | null;
  token: string | null;
};

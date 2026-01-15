export type ExchangeCodeType = {
  code: string;
  clientId: string;
  clientSecret: string;
  apiBaseUrl?: string;
};

export type VerifyTokenType = {
  token: string;
  apiBaseUrl?: string;
};

export type LogoutType = {
  token: string;
  apiBaseUrl?: string;
};

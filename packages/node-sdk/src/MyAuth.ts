import { exchangeCode, logOut, verifyToken } from "./http.js";

export class MyAuth {
  constructor(
    private config: {
      clientId: string;
      clientSecret: string;
      apiBaseUrl?: string;
    },
  ) {}

  async handleCallback(code: string) {
    if (!code) {
      throw new Error("Äuthorization code missing");
    }
    return exchangeCode({
      code,
      ...this.config,
    });
  }

  async verifyToken(token: string) {
    if (!token) {
      throw new Error("Token missing");
    }

    return verifyToken({ token, apiBaseUrl: this.config.apiBaseUrl! });
  }

  async logOut(token: string) {
    if (!token) {
      throw new Error("Token missing");
    }

    return logOut({ token, apiBaseUrl: this.config.apiBaseUrl! });
  }
}

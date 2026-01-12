import { exchangeCode } from "./http.js";

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
}

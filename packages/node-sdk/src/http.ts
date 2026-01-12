import axios from "axios";
import type { ExchangeCodeType } from "./types.js";

export const exchangeCode = async (data: ExchangeCodeType) => {
  const res = await axios.post(`${data.apiBaseUrl}/api/auth/token`, {
    code: data.code,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
  });

  return res.data.data;
};

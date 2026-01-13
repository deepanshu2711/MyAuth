import axios from "axios";
import type { ExchangeCodeType, VerifyTokenType } from "./types.js";

export const exchangeCode = async (data: ExchangeCodeType) => {
  const res = await axios.post(`${data.apiBaseUrl}/api/auth/token`, {
    code: data.code,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
  });

  return res.data.data;
};

export const verifyToken = async (data: VerifyTokenType) => {
  console.log(data.apiBaseUrl, data.token);

  const res = await axios.get(`${data.apiBaseUrl}/api/auth/verify`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return res.data.data;
};

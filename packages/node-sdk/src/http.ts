import axios from "axios";
import type { ExchangeCodeType, LogoutType, VerifyTokenType } from "./types.js";

export const exchangeCode = async (data: ExchangeCodeType) => {
  const res = await axios.post(`${data.apiBaseUrl}/api/auth/token`, {
    code: data.code,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
  });

  return res.data.data;
};

export const verifyToken = async (data: VerifyTokenType) => {
  const res = await axios.get(`${data.apiBaseUrl}/api/auth/verify`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return res.data.data;
};

export const getCurrentuser = async (data: {
  token: string;
  apiBaseUrl: string;
}) => {
  const res = await axios.get(`${data.apiBaseUrl}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return res.data.data;
};

export const rotateToken = async (data: VerifyTokenType) => {
  //NOTE: Send request to rotate token here
  const res = await axios.post(`${data.apiBaseUrl}/api/auth/refresh/token`, {
    refreshToken: data.token,
  });
  return res.data.data;
};

export const logOut = async (data: LogoutType) => {
  const res = await axios.post(
    `${data.apiBaseUrl}/api/auth/logout`,
    {
      refreshToken: data.token,
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );

  return res.data.data;
};

import { getSessionToken } from "@myauth/next";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006/api",
});

api.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

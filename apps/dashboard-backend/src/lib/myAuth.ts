import dotenv from "dotenv";
dotenv.config();

import { MyAuth } from "@myauth/node";

export const myAuth = new MyAuth({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  apiBaseUrl: process.env.AUTH_BACKEND!,
});

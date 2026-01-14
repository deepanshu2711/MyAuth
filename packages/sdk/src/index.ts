export type { ExchangeCodeType, VerifyTokenType } from "@myauth/node";
export { MyAuth, exchangeCode, verifyToken } from "@myauth/node";
export {
  withAuthMiddleware,
  AuthProvider,
  auth,
  useAuth,
  AuthenticateWithRedirectCallback,
} from "@myauth/next";

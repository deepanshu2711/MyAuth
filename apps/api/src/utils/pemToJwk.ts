import { exportJWK, importSPKI } from "jose";

export const pemTOJwk = async (publicKey: string, kid: string) => {
  const key = await importSPKI(publicKey, "RS256");
  const jwk = await exportJWK(key);
  return {
    ...jwk,
    kid,
    alg: "RS256",
    use: "sig",
  };
};

import crypto from "crypto";

export const generateWebhookSecret = (): string => {
  return `whsec_${crypto.randomBytes(32).toString("hex")}`;
};

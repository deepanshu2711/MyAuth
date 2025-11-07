import { App } from "../../models/app.model.js";
import { generateClientId, generateClientSecret } from "../../utils/helpers.js";

export const registerApp = async ({
  name,
  ownerId,
  redirectUris,
}: {
  name: string;
  ownerId: string;
  redirectUris: [string];
}) => {
  const clientId = generateClientId();
  const clientSecret = generateClientSecret();
  const data = await App.create({
    name,
    ownerId,
    redirectUris,
    clientId,
    clientSecret,
  });
  return { clientId, clientSecret };
};

import { Types } from "mongoose";

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

export const getUserApps = async ({ userId }: { userId: string }) => {
  const data = await App.aggregate([
    {
      $match: {
        ownerId: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "memberships",
        localField: "_id",
        foreignField: "appId",
        as: "userCount",
        pipeline: [{ $count: "count" }],
      },
    },
    {
      $set: {
        userCount: {
          $ifNull: [{ $arrayElemAt: ["$userCount.count", 0] }, 0],
        },
      },
    },
    {
      $project: {
        name: 1,
        clientId: 1,
        createdAt: 1,
        userCount: 1,
      },
    },
  ]);
  return data;
};

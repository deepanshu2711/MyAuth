import { Types } from "mongoose";

export const getUserApps = (userId: string) => [
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
];

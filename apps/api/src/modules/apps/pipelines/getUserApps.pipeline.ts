import { Types } from "mongoose";

export const getUserApps = (userId: string) => [
  {
    $match: {
      ownerId: new Types.ObjectId(userId),
    },
  },

  // total users (memberships)
  {
    $lookup: {
      from: "memberships",
      localField: "_id",
      foreignField: "appId",
      as: "userCount",
      pipeline: [{ $count: "count" }],
    },
  },

  // active sessions (not revoked & not expired)
  {
    $lookup: {
      from: "sessions",
      let: { appId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$appId", "$$appId"],
            },
            revokedAt: null,
            expiresAt: { $gt: new Date() },
          },
        },
        { $count: "count" },
      ],
      as: "activeSessionCount",
    },
  },

  {
    $set: {
      userCount: {
        $ifNull: [{ $arrayElemAt: ["$userCount.count", 0] }, 0],
      },
      activeSessionCount: {
        $ifNull: [{ $arrayElemAt: ["$activeSessionCount.count", 0] }, 0],
      },
    },
  },

  {
    $project: {
      name: 1,
      clientId: 1,
      createdAt: 1,
      userCount: 1,
      activeSessionCount: 1,
    },
  },
];

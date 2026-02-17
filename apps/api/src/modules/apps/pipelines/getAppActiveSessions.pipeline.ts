import { Types } from "mongoose";

export const getAppActiveSessions = (appId: string) => [
  {
    $match: {
      _id: new Types.ObjectId(appId),
    },
  },

  {
    $lookup: {
      from: "memberships",
      let: { appId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$appId", "$$appId"] },
          },
        },
        {
          $project: {
            _id: 0,
            userId: 1,
          },
        },
      ],
      as: "memberships",
    },
  },

  {
    $unwind: "$memberships",
  },

  {
    $lookup: {
      from: "sessions",
      let: { userId: "$memberships.userId" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$userId", "$$userId"] },
            revokedAt: null,
            expiresAt: { $gt: new Date() },
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            createdAt: 1,
            expiresAt: 1,
          },
        },
      ],
      as: "sessions",
    },
  },

  {
    $unwind: "$sessions",
  },

  {
    $lookup: {
      from: "users",
      let: { userId: "$sessions.userId" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$_id", "$$userId"] },
          },
        },
        {
          $project: {
            _id: 1,
            email: 1,
            name: 1,
          },
        },
      ],
      as: "userDetails",
    },
  },

  {
    $unwind: "$userDetails",
  },

  {
    $project: {
      _id: 0,
      session: {
        _id: "$sessions._id",
        createdAt: "$sessions.createdAt",
        expiresAt: "$sessions.expiresAt",
      },
      userDetails: 1,
    },
  },
];

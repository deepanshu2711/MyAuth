import { Types } from "mongoose";

export const getAppUsers = (appId: string) => [
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
      from: "users",
      let: { userId: "$memberships.userId" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$_id", "$$userId"] },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            profilePic: 1,
            role: 1,
            createdAt: 1,
            status: 1,
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
      userDetails: 1,
    },
  },
];

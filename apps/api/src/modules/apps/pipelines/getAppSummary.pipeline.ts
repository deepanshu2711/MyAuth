import { Types } from "mongoose";

export const getUserAppsSummary = (userId: string) => [
  {
    $match: {
      ownerId: new Types.ObjectId(userId),
    },
  },

  //facet allow you to run multiple piplelines in parallel
  {
    $facet: {
      appsData: [{ $count: "totalApps" }],

      usersData: [
        {
          $lookup: {
            from: "memberships",
            localField: "_id",
            foreignField: "appId",
            as: "users",
          },
        },
        { $unwind: "$users" },
        { $count: "totalUsers" },
      ],
    },
  },

  {
    $project: {
      totalApps: { $arrayElemAt: ["$appsData.totalApps", 0] },
      totalUsers: { $arrayElemAt: ["$usersData.totalUsers", 0] },
    },
  },
];

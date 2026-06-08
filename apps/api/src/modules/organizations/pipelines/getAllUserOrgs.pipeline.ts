import { Types } from "mongoose";

export const getUserOrgs = (userId: string) => [
  {
    $match: {
      userId: new Types.ObjectId(userId),
    },
  },
  {
    $lookup: {
      localField: "orgId",
      foreignField: "_id",
      from: "organizations",
      as: "org",
    },
  },
  {
    $unwind: "$org",
  },
];

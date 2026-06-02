export const getUserOrgs = (userId: string) => [
  {
    $match: {
      userId: userId,
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

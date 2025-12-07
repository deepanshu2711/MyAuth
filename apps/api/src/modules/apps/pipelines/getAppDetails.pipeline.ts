import { Types } from "mongoose";

//NOTE: on lookup it will load all members in array then count the array size (it will be slower if there ane many members ships)
// export const getAppDetails = (appId: string) => [
//   {
//     $match: {
//       _id: new Types.ObjectId(appId),
//     },
//   },
//   {
//     $lookup: {
//       from: "memberships",
//       localField: "_id",
//       foreignField: "appId",
//       as: "users",
//     },
//   },
//   {
//     $addFields: {
//       totalusers: {
//         $size: "$users",
//       },
//     },
//   },
//   {
//     $project: {
//       users: 0,
//       clientSecret: 0,
//     },
//   },
// ];

//NOTE: it's faster because MongoDB doesn't materialize the full array.

export const getAppDetails = (appId: string) => [
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
            $expr: {
              $eq: ["$appId", "$$appId"],
            },
          },
        },
        {
          $count: "count",
        },
      ],
      as: "totalUsers",
    },
  },
  {
    $addFields: {
      totalCount: {
        $ifNull: [{ $arrayElemAt: ["$totalUsers.count", 0] }, 0],
      },
    },
  },
  {
    $project: {
      clientSecret: 0,
      totalUsers: 0,
    },
  },
];

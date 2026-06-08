import { Types } from "mongoose";
import { App } from "../../models/app.model.js";
import { AppError } from "../../utils/appError.js";
import { Organization } from "./models/organization.model.js";
import { OrgMembership } from "./models/orgMembership.model.js";
import type { CreateOrgInput } from "./organization.types.js";
import { getUserOrgs } from "./pipelines/getAllUserOrgs.pipeline.js";

export const OrgServices = {
  create: async (payload: CreateOrgInput) => {
    const data = await Organization.create(payload);
    await OrgMembership.create({
      orgId: data._id,
      userId: payload.ownerId,
      role: "owner",
    });
    return data;
  },
  getAllUserOrgs: async (userId: string) => {
    const data = await OrgMembership.aggregate(getUserOrgs(userId));
    return data;
  },
  ensurePersonalOrg: async (userId: string, email?: string) => {
    const existing = await Organization.findOne({
      ownerId: userId,
      isPersonal: true,
    });
    if (existing) return existing;

    const org = await Organization.create({
      name: "Personal",
      ownerId: userId,
      isPersonal: true,
    });

    await OrgMembership.create({
      userId,
      orgId: org._id,
      role: "owner",
    });

    return org;
  },
  getOrgApps: async (orgId: string, userId: string) => {
    const isMember = await OrgMembership.findOne({ orgId, userId });
    if (!isMember)
      throw new AppError("You are not a part of this Organization", 400);

    const data = await App.find(
      { orgId },
      { name: 1, status: 1, orgId: 1, clientId: 1, createdAt: 1 },
    );
    return data;
  },
  getOrgTeam: async (orgId: string, userId: string) => {
    const isMember = await OrgMembership.findOne({ orgId, userId });
    if (!isMember)
      throw new AppError("You are not a part of this Organization", 400);

    const data = await OrgMembership.aggregate([
      {
        $match: {
          orgId: new Types.ObjectId(orgId),
        },
      },
      {
        $lookup: {
          localField: "userId",
          foreignField: "_id",
          from: "users",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);

    return data;
  },
};

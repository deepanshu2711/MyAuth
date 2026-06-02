import { Organization } from "./models/organization.model.js";
import { OrgMembership } from "./models/orgMembership.model.js";
import type { CreateOrgInput } from "./organization.types.js";
import { getUserOrgs } from "./pipelines/getAllUserOrgs.pipeline.js";

export const OrgServices = {
  create: async (payload: CreateOrgInput) => {
    const data = await Organization.create(payload);
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
      name: email ? email.split("@")[0] : "Personal",
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
};

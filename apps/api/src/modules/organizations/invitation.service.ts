import { OrgMembership } from "./models/orgMembership.model.js";
import { AppError } from "../../utils/appError.js";
import { Invitation } from "./models/invitation.model.js";
import { createInvitationToken } from "../../utils/helpers.js";
import { Organization } from "./models/organization.model.js";

export const InvitationService = {
  create: async (
    email: string,
    orgId: string,
    role: string,
    inviteByUserId: string,
  ) => {
    if (role === "owner")
      throw new AppError("Cannot invite a user as owner", 400);

    const [org, inviterMembership] = await Promise.all([
      Organization.findById(orgId).select("_id"),
      OrgMembership.findOne({
        orgId,
        userId: inviteByUserId,
      })
        .select("role")
        .lean(),
    ]);

    if (!org) throw new AppError("Organization not found", 404);

    if (!inviterMembership) {
      throw new AppError("You are not a member of this organization", 403);
    }

    if (inviterMembership.role === "member")
      throw new AppError("Only owners and admins can invite members", 403);

    const existingInvite = await Invitation.findOne({
      email,
      orgId,
      status: "pending",
    });
    if (existingInvite)
      throw new AppError("An invitation is already pending for this user", 400);

    const token = createInvitationToken();
    const invitation = await Invitation.create({
      email,
      inviteByUserId,
      role,
      orgId,
      token,
    });

    //NOTE: Send email to that user with the token and Org Details

    return invitation.token;
  },
};

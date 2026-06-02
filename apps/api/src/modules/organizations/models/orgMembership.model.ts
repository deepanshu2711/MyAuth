import mongoose, { Schema } from "mongoose";

const OrgMembershipSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
    },
  },
  {
    timestamps: true,
  },
);

OrgMembershipSchema.index({ userId: 1, orgId: 1 }, { unique: true });

export const OrgMembership = mongoose.model(
  "OrgMembership",
  OrgMembershipSchema,
);

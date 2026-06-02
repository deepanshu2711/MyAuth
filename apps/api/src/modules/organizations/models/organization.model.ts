import mongoose, { Schema } from "mongoose";

const OrganizationSchema = new Schema(
  {
    name: String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isPersonal: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Organization = mongoose.model("Organization", OrganizationSchema);

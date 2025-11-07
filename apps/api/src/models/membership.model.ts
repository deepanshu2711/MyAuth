import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    appId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "app",
      required: true,
    },
    passwordHash: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const MemberShip = mongoose.model("membership", membershipSchema);

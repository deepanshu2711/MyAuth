import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    revokedAt: {
      type: Date,
      default: null,
    },
    expiresAt: { type: Date },
  },
  { timestamps: true },
);

export const Session = mongoose.model("session", sessionSchema);

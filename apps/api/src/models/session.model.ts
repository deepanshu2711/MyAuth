import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    appId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "app",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    accessToken: { type: String, required: true, index: true },
    refreshToken: { type: String, required: true, index: true },
    revokedAt: {
      type: Date,
      default: null,
    },
    expiresAt: { type: Date, index: true, required: true },
  },
  { timestamps: true },
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
sessionSchema.index({ userId: 1, appId: 1 });

export const Session = mongoose.model("session", sessionSchema);

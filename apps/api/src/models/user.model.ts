import crypto from "crypto";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    globalUserId: { type: String, unique: true },
    email: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    avatar: { type: String, trim: true },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  if (!this.globalUserId) {
    this.globalUserId = "USR-" + crypto.randomBytes(4).toString("hex");
  }
  next();
});

userSchema.index({ globalUserId: 1 }, { unique: true });
export const User = mongoose.model("user", userSchema);

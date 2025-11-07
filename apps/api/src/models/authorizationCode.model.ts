import mongoose, { Schema } from "mongoose";

const AuthorizationCodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    redirectUri: { type: [String], required: true },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const AuthorizationCode = mongoose.model(
  "AuthorizationCode",
  AuthorizationCodeSchema,
);

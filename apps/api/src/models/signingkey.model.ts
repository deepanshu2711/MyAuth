import { model, Schema } from "mongoose";

const SignInKeySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },

    algorithm: { type: String, default: "RS256" },
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const SignInKey = model("signinkey", SignInKeySchema);

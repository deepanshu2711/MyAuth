import mongoose, { Schema } from "mongoose";

const appSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    redirectUris: { type: [String], default: [] },

    signingKeyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "signinkey",
    },
    status: { type: String, default: "active" },
  },
  { timestamps: true },
);

export const App = mongoose.model("app", appSchema);

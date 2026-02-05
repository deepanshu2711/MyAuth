import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

//use HMAC later
appSchema.pre("save", async function (next) {
  if (!this.isModified("clientSecret")) return next();
  this.clientSecret = await bcrypt.hash(this.clientSecret, 12);
});

export const App = mongoose.model("app", appSchema);

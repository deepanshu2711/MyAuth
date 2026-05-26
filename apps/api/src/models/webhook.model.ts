import mongoose, { Schema } from "mongoose";

const WebHookSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    appId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "app",
      required: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    events: {
      type: [
        {
          type: String,
          enum: ["user.created", "user.updated", "user.deleted", "user.login"],
        },
      ],
      required: function (this: { isNew: boolean }) {
        return this.isNew;
      },
      validate: {
        validator: function (
          this: { isModified: (path: string) => boolean; isNew: boolean },
          v?: string[],
        ) {
          if (!this.isNew && !this.isModified("events")) return true;
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one event is required",
      },
    },
    secret: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    //NOTE: add last trigger at
    //last success at
    //failure count
  },
  { timestamps: true },
);

WebHookSchema.index({ appId: 1, url: 1 }, { unique: true });

export const WebHook = mongoose.model("Webhook", WebHookSchema);

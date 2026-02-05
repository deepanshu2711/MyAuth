import mongoose, { Schema } from "mongoose";

const visitorSchema = new Schema(
  {
    // ---- Which site
    site: {
      type: String,
      enum: ["console", "auth"],
      required: true,
      index: true,
    },

    // ---- Network info
    ip: {
      type: String,
      required: true,
      index: true,
    },

    forwardedFor: {
      type: String, // original x-forwarded-for if any
    },

    // ---- Geo info
    country: {
      type: String,
      index: true,
    },

    countryCode: {
      type: String,
    },

    region: {
      type: String,
    },

    city: {
      type: String,
    },

    timezone: {
      type: String,
    },

    latitude: Number,
    longitude: Number,

    // ---- Device / browser
    userAgent: {
      type: String,
    },

    browser: {
      type: String,
      index: true,
    },

    browserVersion: String,

    os: {
      type: String,
      index: true,
    },

    osVersion: String,

    deviceType: {
      type: String, // mobile / tablet / desktop / bot
      index: true,
    },

    deviceVendor: String,
    deviceModel: String,

    isBot: {
      type: Boolean,
      default: false,
      index: true,
    },

    // ---- Request info
    method: {
      type: String,
    },

    path: {
      type: String,
      index: true,
    },

    referrer: {
      type: String,
      index: true,
    },

    origin: {
      type: String,
    },

    // ---- Auth context (VERY useful later)
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },

    // ---- Performance / debugging
    responseTimeMs: {
      type: Number,
    },

    statusCode: {
      type: Number,
    },

    // ---- Flags
    isUniqueVisit: {
      type: Boolean,
      default: false,
      index: true,
    },

    isSuspicious: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Visitor = mongoose.model("Visitor", visitorSchema);

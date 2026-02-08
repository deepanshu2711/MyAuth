import mongoose from "mongoose";
import { App } from "../models/app.model.js";
import { User } from "../models/user.model.js";
import { SignInKey } from "../models/signingkey.model.js";
import { AppError } from "../utils/appError.js";
import {
  generateClientId,
  generateClientSecret,
  generateKeyPairSyncForSigningKey,
} from "../utils/helpers.js";

const seedConsoleApp = async () => {
  try {
    console.log("🌱 Starting Console app seeder...");

    // Connect to database
    // if (mongoose.connection.readyState !== 1) {
    //   await mongoose.connect(
    //     process.env.MONGODB_URI || "mongodb://localhost:27017/myauth",
    //   );
    //   console.log("✅ Connected to database");
    // }

    // Check if Console app already exists
    const existingConsoleApp = await App.findOne({ name: "Console" });
    if (existingConsoleApp) {
      console.log("⚠️  Console app already exists");
      console.log(`📋 Client ID: ${existingConsoleApp.clientId}`);
      console.log(`🔑 Client Secret: ${existingConsoleApp.clientSecret}`);
      return;
    }

    // Find or create a default user for the Console app
    let consoleUser = await User.findOne({ email: "console@system.local" });
    if (!consoleUser) {
      consoleUser = await User.create({
        email: "console@system.local",
        name: "Console System",
        globalUserId: "USR-CONSOLE",
      });
      console.log("✅ Created console system user");
    }

    // Generate client credentials
    const clientId = generateClientId();
    const clientSecret = generateClientSecret();
    const { privateKey, publicKey } = generateKeyPairSyncForSigningKey();

    console.log(clientSecret);

    // Create signing key
    const signingKey = await SignInKey.create({
      name: "Console primary signing key",
      description: "Default signing key for Console application",
      privateKey,
      publicKey,
      algorithm: "RS256",
      isActive: true,
    });
    console.log("✅ Created signing key");

    // Create Console app
    const consoleApp = await App.create({
      name: "Console",
      ownerId: consoleUser._id,
      redirectUris: ["http://localhost:3000/callback"],
      clientId,
      clientSecret,
      signingKeyId: signingKey._id,
      status: "active",
    });
    console.log("✅ Created Console app");

    // Display results
    console.log("\n🎉 Console app created successfully!");
    console.log("=====================================");
    console.log(`📱 App Name: ${consoleApp.name}`);
    console.log(`🆔 App ID: ${consoleApp._id}`);
    console.log(`👤 Owner ID: ${consoleApp.ownerId}`);
    console.log(`📋 Client ID: ${consoleApp.clientId}`);
    console.log(`🔑 Client Secret: ${consoleApp.clientSecret}`);
    console.log(`🔐 Signing Key ID: ${signingKey._id}`);
    console.log(`🌐 Redirect URIs: ${consoleApp.redirectUris.join(", ")}`);
    console.log(`📊 Status: ${consoleApp.status}`);
    console.log("=====================================");

    return {
      appId: consoleApp._id,
      clientId: consoleApp.clientId,
      clientSecret: consoleApp.clientSecret,
      signingKeyId: signingKey._id,
    };
  } catch (error) {
    console.error("❌ Error seeding Console app:", error);
    throw error;
  } finally {
    // Close database connection if we connected in this script
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log("🔌 Disconnected from database");
    }
  }
};

// Run seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedConsoleApp()
    .then(() => {
      console.log("✅ Seeder completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeder failed:", error);
      process.exit(1);
    });
}

export { seedConsoleApp };

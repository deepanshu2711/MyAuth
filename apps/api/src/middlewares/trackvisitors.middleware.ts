import { UAParser } from "ua-parser-js";
import { getClientIp } from "../utils/helpers.js";
import { Visitor } from "../models/visitors.model.js";
import type { Request, Response, NextFunction } from "express";

export async function trackVisitor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = Date.now();

  if (req.method !== "GET") return next();

  try {
    const host = req.hostname || "";

    let site: "console" | "auth" | null = null;
    if (host.includes("console")) site = "console";
    if (host.includes("auth")) site = "auth";
    if (!site) return next();

    // ✅ Proper IP
    const ip = getClientIp(req);

    // ---- UA parsing
    const ua = req.headers["user-agent"] || "";
    const parser = new UAParser(ua);
    const result = parser.getResult();

    const isBot = /bot|crawler|spider|crawling|headless/i.test(ua);

    res.on("finish", async () => {
      const responseTimeMs = Date.now() - startTime;

      await Visitor.create({
        site,
        ip,
        forwardedFor: req.headers["x-forwarded-for"],

        userAgent: ua,
        browser: result.browser.name,
        browserVersion: result.browser.version,
        os: result.os.name,
        osVersion: result.os.version,
        deviceType: result.device.type || "desktop",
        deviceVendor: result.device.vendor,
        deviceModel: result.device.model,
        isBot,

        method: req.method,
        path: req.originalUrl,
        referrer: req.headers.referer,
        origin: req.headers.origin,

        userId: req.user?.userId,

        responseTimeMs,
        statusCode: res.statusCode,
      });
    });
  } catch (err) {
    console.error("Visitor tracking failed:", err);
  }

  next();
}

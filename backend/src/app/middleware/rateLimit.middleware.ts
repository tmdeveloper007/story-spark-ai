import type { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

/**
 * Dedicated rate limiter for the /api/v1/search endpoint.
 * 30 requests per minute per IP to prevent scraping and abuse.
 */
export const searchRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many search requests. Please wait a moment and try again.",
  keyGenerator: (req: Request, _res: Response) => {
    const forwarded = (req.headers["x-forwarded-for"] as string) ?? "";
    return forwarded.split(",")[0]?.trim() || req.ip || "unknown";
  },
});
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { Request, Response, NextFunction } from "express";

// ============================================================
// Upstash Redis Client
// ============================================================
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ============================================================
// Rate Limiters (Sliding Window)
// ============================================================

// Auth endpoints (sign-in, sign-up, forgot-password, reset-password)
// 5 requests per 15 minutes per IP
export const authRateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
    prefix: "auth_kit:auth",
});

// ============================================================
// Middleware Factory
// ============================================================

export function createRateLimitMiddleware(limiter: Ratelimit) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const ip =
            (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
            req.socket.remoteAddress ||
            "anonymous";

        try {
            const { success, reset, remaining } = await limiter.limit(ip);

            // Expose rate limit headers for frontend UX
            res.setHeader("X-RateLimit-Remaining", remaining);
            res.setHeader("X-RateLimit-Reset", new Date(reset).toISOString());

            if (!success) {
                const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
                res.setHeader("Retry-After", retryAfterSeconds);
                res.status(429).json({
                    error: "Too many requests. Please try again later.",
                    retryAfter: retryAfterSeconds,
                    message: `Too many failed attempts. Please try again in ${Math.ceil(retryAfterSeconds / 60)} minute(s).`,
                });
                return;
            }

            next();
        } catch (err) {
            // If Redis is unavailable, fail open (allow request) to prevent lockout
            console.warn("⚠ Rate limiter unavailable, failing open:", err);
            next();
        }
    };
}

export const rateLimitMiddleware = createRateLimitMiddleware(authRateLimiter);

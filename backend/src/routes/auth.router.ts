import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { rateLimitMiddleware } from "../lib/rate-limit.js";

export const authRouter = Router();

// Apply rate limiting to sensitive auth endpoints
authRouter.post("/sign-in/email", rateLimitMiddleware);
authRouter.post("/sign-up/email", rateLimitMiddleware);
authRouter.post("/forget-password", rateLimitMiddleware);
authRouter.post("/reset-password", rateLimitMiddleware);

// Better Auth handles all /api/auth/* routes
authRouter.all("*", toNodeHandler(auth));

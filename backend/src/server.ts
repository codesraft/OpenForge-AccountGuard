import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// Security Headers
// ============================================================
app.use(
    helmet({
        contentSecurityPolicy: false, // Managed separately on frontend
        crossOriginEmbedderPolicy: false,
    })
);

// ============================================================
// CORS — credentials required for HTTP-Only cookie transmission
// ============================================================
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);

// ============================================================
// Better Auth MUST handle /api/auth/* BEFORE express.json()
// (Better Auth requires raw body access for signature verification)
// ============================================================
app.use("/api/auth", authRouter);

// ============================================================
// JSON body parsing for all other routes
// ============================================================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ============================================================
// Health Check
// ============================================================
app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
    });
});

// ============================================================
// Global Error Handler
// ============================================================
app.use(
    (
        err: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        console.error("❌ Unhandled error:", err);
        res.status(500).json({
            error: "An unexpected server error occurred. Please try again later.",
        });
    }
);

// ============================================================
// Start Server
// ============================================================
app.listen(PORT, () => {
    console.log(`✅ Auth Lifecycle Kit backend running on ${process.env.APP_BASE_URL || `http://localhost:${PORT}`}`);
    console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
});

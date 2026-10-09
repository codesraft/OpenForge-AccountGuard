import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { db } from "./db.js";
import {
    sendEmail,
    verificationEmailTemplate,
    passwordResetEmailTemplate,
} from "./email.js";

export const auth = betterAuth({
    database: {
        db,
        type: "pg",
    },
    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.APP_BASE_URL!,
    trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],
    session: {
        expiresIn: 60 * 60 * 24 * 7,   // 7 days
        updateAge: 60 * 60 * 24,         // Refresh if older than 1 day
        cookieCache: {
            enabled: true,
            maxAge: 60,                  // In-memory cache for 60 seconds
        },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword({ user, url }) {
            await sendEmail({
                to: user.email,
                subject: "Reset your password — Auth Lifecycle Kit",
                html: passwordResetEmailTemplate(url, user.name),
            });
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        async sendVerificationEmail({ user, url }) {
            await sendEmail({
                to: user.email,
                subject: "Verify your email — Auth Lifecycle Kit",
                html: verificationEmailTemplate(url, user.name),
            });
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },
    plugins: [
        twoFactor({
            issuer: "AuthLifecycleKit",
        }),
    ],
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
        cookiePrefix: "auth_kit",
        generateId: () => crypto.randomUUID(),
    },
});

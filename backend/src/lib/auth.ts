import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { db } from "./db.js";
import { sendEmail } from "./email.js";

export const auth = betterAuth({
    database: db,
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.APP_BASE_URL,
    trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword({ user, url }) {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
            });
        },
    },
    emailVerification: {
        async sendVerificationEmail({ user, url }) {
            await sendEmail({
                to: user.email,
                subject: "Verify your email address",
                html: `<p>Click <a href="${url}">here</a> to verify your email address.</p>`,
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
    },
});


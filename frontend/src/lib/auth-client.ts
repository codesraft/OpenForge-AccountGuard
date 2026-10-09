import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

// ============================================================
// Better Auth Client — connects frontend to the backend API
// ============================================================
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    plugins: [twoFactorClient()],
});

// Named exports for ergonomic usage across components
export const {
    signIn,
    signUp,
    signOut,
    useSession,
    getSession,
    sendVerificationEmail,
    forgetPassword,
    resetPassword,
    changePassword,
    revokeSession,
    revokeOtherSessions,
    listSessions,
    deleteUser,
    updateUser,
    twoFactor,
    linkSocial,
} = authClient;

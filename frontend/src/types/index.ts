// ============================================================
// Shared Frontend Types
// ============================================================

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Session {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: string;
    updatedAt: string;
    isCurrent?: boolean;
}

export interface TwoFactorStatus {
    enabled: boolean;
    backupCodesCount?: number;
}

export interface AuthError {
    message: string;
    code?: string;
    status?: number;
}

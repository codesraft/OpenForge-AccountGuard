// ============================================================
// Core Domain Types — Authentication & Account Lifecycle Kit
// ============================================================

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ActiveSession {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface OAuthAccount {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: Date | null;
    scope?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface VerificationToken {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface TwoFactorConfig {
    id: string;
    userId: string;
    secret: string;
    uri: string;
    enabled: boolean;
    backupCodes?: string | null;
}

// ============================================================
// API Response Types
// ============================================================

export interface ApiResponse<T = unknown> {
    data?: T;
    error?: string;
    message?: string;
}

export interface RateLimitResponse {
    error: string;
    retryAfter: number;
    message: string;
}

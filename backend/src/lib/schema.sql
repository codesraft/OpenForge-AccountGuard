-- ============================================================
-- Authentication & Account Lifecycle Kit — Database Schema
-- Compatible with Better Auth v1 (PostgreSQL)
-- ============================================================

-- Users table: Core user identity
CREATE TABLE IF NOT EXISTS "user" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    image TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Accounts table: Credentials and OAuth provider links
CREATE TABLE IF NOT EXISTS "account" (
    id TEXT PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP,
    "refreshTokenExpiresAt" TIMESTAMP,
    scope TEXT,
    password TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Sessions table: Active device sessions
CREATE TABLE IF NOT EXISTS "session" (
    id TEXT PRIMARY KEY,
    "expiresAt" TIMESTAMP NOT NULL,
    token TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

-- Verifications table: Email verification & password reset tokens
CREATE TABLE IF NOT EXISTS "verification" (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Two-Factor Auth table: TOTP secrets & backup codes (Better Auth twoFactor plugin)
CREATE TABLE IF NOT EXISTS "twoFactor" (
    id TEXT PRIMARY KEY,
    secret TEXT NOT NULL,
    uri TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL UNIQUE REFERENCES "user"(id) ON DELETE CASCADE,
    "backupCodes" TEXT
);

-- ============================================================
-- Indexes for performance optimization
-- ============================================================

-- Users: Fast email lookup for login, registration, and password reset
CREATE UNIQUE INDEX IF NOT EXISTS user_email_idx ON "user"(email);

-- Sessions: Fast token validation on every protected request
CREATE UNIQUE INDEX IF NOT EXISTS session_token_idx ON "session"(token);

-- Sessions: Fast retrieval of all sessions for a user (device management)
CREATE INDEX IF NOT EXISTS session_user_id_idx ON "session"("userId");

-- Sessions: TTL-style cleanup (used for expiresAt filtering queries)
CREATE INDEX IF NOT EXISTS session_expires_at_idx ON "session"("expiresAt");

-- Accounts: Fast OAuth account lookup on social login
CREATE UNIQUE INDEX IF NOT EXISTS account_provider_idx ON "account"("providerId", "accountId");

-- Accounts: Fast retrieval of all accounts linked to a user
CREATE INDEX IF NOT EXISTS account_user_id_idx ON "account"("userId");

-- Verifications: Fast token lookup during email verification and password reset
CREATE INDEX IF NOT EXISTS verification_identifier_idx ON "verification"(identifier);

-- Verifications: Fast expiry filtering for cleanup
CREATE INDEX IF NOT EXISTS verification_expires_at_idx ON "verification"("expiresAt");

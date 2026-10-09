import { Pool } from "pg";

// Singleton pattern to prevent connection exhaustion in hot-reload environments
const globalForDb = globalThis as unknown as { db: Pool };

export const db =
    globalForDb.db ||
    new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });

if (process.env.NODE_ENV !== "production") {
    globalForDb.db = db;
}

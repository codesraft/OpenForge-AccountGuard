import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
import { db } from "./db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrate() {
    console.log("🔄 Running database migration...");

    const schemaPath = join(__dirname, "schema.sql");
    const sql = readFileSync(schemaPath, "utf-8");

    const client = await db.connect();
    try {
        await client.query("BEGIN");
        await client.query(sql);
        await client.query("COMMIT");
        console.log("✅ Database migration completed successfully.");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("❌ Migration failed:", error);
        process.exit(1);
    } finally {
        client.release();
        await db.end();
    }
}

migrate();

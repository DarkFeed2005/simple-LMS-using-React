import { neon } from "@neondatabase/serverless";

let sqlInstance: ReturnType<typeof neon> | null = null;
let initPromise: Promise<void> | null = null;

export function getSql() {
  if (!sqlInstance) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    sqlInstance = neon(url);
  }
  return sqlInstance;
}

export async function ensureSchema() {
  if (!initPromise) {
    const sql = getSql();
    initPromise = (async () => {
      await sql`CREATE TABLE IF NOT EXISTS courses (
        course_id TEXT PRIMARY KEY,
        course_name TEXT NOT NULL,
        lecturer TEXT NOT NULL,
        duration_weeks INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
    })().catch((e) => {
      initPromise = null;
      throw e;
    });
  }
  return initPromise;
}

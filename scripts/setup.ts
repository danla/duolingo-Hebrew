// Runs before every Vercel build (see vercel.ts). Safe to run repeatedly:
// it creates the tables only when they are missing and loads the courses
// only when there are none, so existing data and user progress are kept.
import { execSync } from "node:child_process";

import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

import { seedCourses } from "./seed";

const main = async () => {
  if (!process.env.DATABASE_URL) {
    console.log("DATABASE_URL is not set, skipping database setup");
    return;
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  const [{ table }] = await sql`select to_regclass('public.courses') as table`;

  if (!table) {
    console.log("Creating database tables");
    execSync("pnpm exec drizzle-kit push", { stdio: "inherit" });
  }

  const [{ value: courseCount }] = await db
    .select({ value: count() })
    .from(schema.courses);

  if (courseCount > 0) {
    console.log("Courses already exist, skipping seeding");
    return;
  }

  console.log("Seeding courses");
  await seedCourses(db);
  console.log("Database setup complete");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

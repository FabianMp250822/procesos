import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(process.cwd(), ".env.local") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not found in .env.local");
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);

export const db = drizzle(connection, { schema, mode: "default" });

import "server-only";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = global as unknown as {
  connection: mysql.Pool | undefined;
};

// Use a Connection Pool for better stability and automatic reconnection
const connection =
  globalForDb.connection ??
  mysql.createPool(process.env.DATABASE_URL!);

if (process.env.NODE_ENV !== "production") globalForDb.connection = connection;

export const db = drizzle(connection, { schema, mode: "default" });

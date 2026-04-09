import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users } from './src/db/schema';
import * as schema from './src/db/schema';

async function check() {
  const url = "mysql://u948052382_QT16p:D@justicia162804@srv439.hstgr.io:3306/u948052382_48yNH";
  try {
    const connection = await mysql.createConnection(url);
    const db = drizzle(connection, { schema, mode: "default" });
    
    const allUsers = await db.select().from(users);
    console.log("Users found:", JSON.stringify(allUsers, null, 2));
    
    await connection.end();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
check();

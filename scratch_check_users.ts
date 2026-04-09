import { db } from './src/db/db.server';
import { users } from './src/db/schema';
import { sql } from 'drizzle-orm';

async function check() {
  try {
    const allUsers = await db.select().from(users);
    console.log("Users found:", JSON.stringify(allUsers, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
check();

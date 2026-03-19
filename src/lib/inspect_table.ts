import { db } from '../db/db.server';
import { sql } from 'drizzle-orm';

async function run() {
  try {
    const res = await db.execute(sql`DESCRIBE procesos`);
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  }
}
run();

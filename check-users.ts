import { db } from "./src/db/db.server";
import { users } from "./src/db/schema";

async function checkUsers() {
  const allUsers = await db.select().from(users);
  console.log("Database Users:", allUsers.map(u => ({ id: u.id, pass: u.password })));
  process.exit(0);
}

checkUsers();

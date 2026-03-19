import { db } from "../db/db.diagnostic";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

async function diagnostic() {
  console.log("Checking for user 'ADMINISTRADOR'...");
  const [adminUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, "ADMINISTRADOR"));

  if (adminUser) {
    console.log("User found!");
    console.log("Password matches 'admin'?", adminUser.password === "admin");
    console.log("Stored Password (redacted for safety):", adminUser.password.substring(0, 1) + "***");
    console.log("Level:", adminUser.level);
  } else {
    console.log("User 'ADMINISTRADOR' NOT found.");
    const allUsers = await db.select().from(users).limit(5);
    console.log("First 5 users in DB:", allUsers.map(u => u.id));
  }
  process.exit(0);
}

diagnostic().catch(err => {
  console.error(err);
  process.exit(1);
});

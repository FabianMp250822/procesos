import { db } from "@/db/db.server";
import { clients } from "@/db/schema";
import { desc, like, or, sql } from "drizzle-orm";

export async function getClients(query?: string, page: number = 1) {
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    let whereClause = undefined;
    if (query) {
      whereClause = or(
        like(clients.id, `%${query}%`),
        like(clients.firstNames, `%${query}%`),
        like(clients.lastNames, `%${query}%`),
        like(clients.folderNumber, `%${query}%`)
      );
    }

    const data = await db.select().from(clients)
      .where(whereClause)
      .orderBy(desc(clients.id))
      .limit(limit)
      .offset(offset);

    return data;
  } catch (error) {
    console.error("Get Clients Error:", error);
    return [];
  }
}

export async function getGroups() {
  try {
    const result = await db.execute(sql`SELECT DISTINCT grupo as grupos FROM clientes WHERE grupo IS NOT NULL AND grupo != ''`);
    if (result[0] && (result[0] as unknown as unknown[]).length > 0) return result[0] as unknown as unknown[];
    return [{ grupos: "ELECTRIFICADORA" }, { grupos: "COLPENSIONES" }, { grupos: "CORELCA" }];
  } catch {
    return [{ grupos: "ELECTRIFICADORA" }, { grupos: "COLPENSIONES" }, { grupos: "CORELCA" }];
  }
}

import { db } from "@/db/db.server";
import { lawyers } from "@/db/schema";
import { desc, like, or, eq } from "drizzle-orm";

export async function getLawyers(query?: string, page: number = 1) {
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    let whereClause = undefined;
    if (query) {
      const isNumeric = !isNaN(Number(query));
      const filters = [
        like(lawyers.firstNames, `%${query}%`),
        like(lawyers.lastNames, `%${query}%`),
        like(lawyers.barCard, `%${query}%`)
      ];
      
      if (isNumeric) {
        filters.push(eq(lawyers.id, Number(query)));
      }

      whereClause = or(...filters);
    }

    const data = await db.select().from(lawyers)
      .where(whereClause)
      .orderBy(desc(lawyers.id))
      .limit(limit)
      .offset(offset);

    return data;
  } catch (error) {
    console.error("Get Lawyers Error:", error);
    return [];
  }
}

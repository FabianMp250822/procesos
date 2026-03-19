import { db } from "@/db/db.server";
import { clients, processes, annotations } from "@/db/schema";
import { sql, desc, count } from "drizzle-orm";
import { cache } from "react";

export const getDashboardStats = cache(async () => {
  try {
    const [clientRes, processRes, activeRes, recentNotes] = await Promise.all([
      db.select({ value: count() }).from(clients),
      db.select({ value: count() }).from(processes),
      db.select({ value: count() }).from(processes).where(sql`estado = 'ACTIVO'`),
      db.select().from(annotations).orderBy(desc(annotations.id)).limit(5)
    ]);

    return {
      totalClients: clientRes[0]?.value ?? 0,
      totalProcesses: processRes[0]?.value ?? 0,
      activeProcesses: activeRes[0]?.value ?? 0,
      recentAnnotations: recentNotes
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return {
      totalClients: 0,
      totalProcesses: 0,
      activeProcesses: 0,
      recentAnnotations: []
    };
  }
});

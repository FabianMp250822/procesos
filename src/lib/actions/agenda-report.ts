"use server";

import { db } from "@/db/db.server";
import { annotations, processes } from "@/db/schema";
import { eq, and, gte, lte, ne, desc, asc } from "drizzle-orm";

export async function getAgendaReportData(from?: string, to?: string) {
  // 1. Fetch Audiences (Filtered annotations for processes other than 4)
  const audienceConditions = [
    ne(annotations.processId, 4), 
    ne(annotations.limitDate, "")
  ];
  
  if (from) audienceConditions.push(gte(annotations.limitDate, from));
  if (to) audienceConditions.push(lte(annotations.limitDate, to));

  const audiences = await db.select({
    id: annotations.id,
    date: annotations.limitDate,
    hour: annotations.limitHour,
    proceduralStatus: annotations.proceduralStatus,
    court: processes.court,
    radicado: processes.radicadoIni,
    demandante: processes.clientName,
    demandado: processes.defendantName,
    caseId: processes.id,
  })
  .from(annotations)
  .leftJoin(processes, eq(annotations.processId, processes.id))
  .where(and(...audienceConditions))
  .orderBy(asc(annotations.limitDate), asc(annotations.limitHour));

  // 2. Fetch General Tasks (Annotations for processId: 4)
  const taskConditions = [eq(annotations.processId, 4)];
  if (from) taskConditions.push(gte(annotations.limitDate, from));
  if (to) taskConditions.push(lte(annotations.limitDate, to));

  const generalTasks = await db.select()
    .from(annotations)
    .where(and(...taskConditions))
    .orderBy(asc(annotations.limitDate), asc(annotations.limitHour));

  return {
    audiences: audiences.map(a => ({
      ...a,
      day: a.date ? getDayName(a.date) : ""
    })),
    generalTasks: generalTasks.map(t => ({
      date: t.limitDate,
      hour: t.limitHour,
      description: t.proceduralStatus,
      day: t.limitDate ? getDayName(t.limitDate) : ""
    }))
  };
}

function getDayName(dateStr: string) {
  if (!dateStr || dateStr.trim() === "") return "";
  try {
    // Handle both DD/MM/YYYY and DD-MM-YYYY
    const separator = dateStr.includes("/") ? "/" : "-";
    const parts = dateStr.split(separator).map(s => s.trim()).map(Number);
    
    if (parts.length === 3) {
      const [d, m, y] = parts;
      // Basic validation
      if (d > 0 && d <= 31 && m > 0 && m <= 12 && y > 1900) {
        const date = new Date(y, m - 1, d);
        if (!isNaN(date.getTime())) {
          const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
          return days[date.getDay()];
        }
      }
    }
    return "";
  } catch {
    return "";
  }
}

"use server";

import { db } from "@/db/db.server";
import { clients, folders, demandantes, processes } from "@/db/schema";
import { eq, or, like } from "drizzle-orm";
import { auth } from "@/auth";

export async function performGlobalSearch(query: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const q = `%${query}%`;

  // 1. Search Contacts (clientes table)
  const contactsFound = await db.select().from(clients)
    .where(or(
      eq(clients.id, query),
      like(clients.firstNames, q),
      like(clients.lastNames, q)
    ))
    .limit(10);

  // 2. Search Pensioners (archivo_carpetas table -> folders in drizzle)
  const pensionersFound = await db.select().from(folders)
    .where(or(
      eq(folders.clientId, query),
      like(folders.firstNames, q),
      like(folders.lastNames, q)
    ))
    .limit(10);

  // 3. Search Processes (demandantes joined with processes)
  const processesFound = await db.select({
      id: processes.id,
      radicado: processes.radicadoIni,
      clientName: demandantes.firstNames,
      clientId: demandantes.id,
      court: processes.court,
      status: processes.status
    })
    .from(processes)
    .innerJoin(demandantes, eq(processes.id, demandantes.processId))
    .where(or(
      eq(demandantes.id, query),
      like(demandantes.firstNames, q),
      like(processes.radicadoIni, q)
    ))
    .limit(10);

  return {
    contacts: contactsFound,
    pensioners: pensionersFound,
    processes: processesFound,
  };
}

import { db } from "@/db/db.server";
import { processes, annotations, annexes, clients, lawyers, processTypes, pensionerDocuments, parameters, pretensionDocumentMapping, demandantes, deceasedData, familyGroups, folders } from "@/db/schema";
import { eq, desc, like, or, and, isNull, isNotNull, sql } from "drizzle-orm";

export async function getProcessDetails(id: number) {
  try {
    const processData = await db.select().from(processes)
      .where(and(eq(processes.id, id), isNull(processes.deletedAt)))
      .limit(1);
    if (processData.length === 0) return null;

    const process = processData[0];

    const [annots, files] = await Promise.all([
      db.select().from(annotations).where(eq(annotations.processId, id)).orderBy(desc(annotations.id)),
      db.select().from(annexes).where(eq(annexes.processId, id)).orderBy(desc(annexes.id)),
    ]);

    // Optional: Fetch client details
    const client = process.clientId ? await db.select().from(clients).where(eq(clients.id, process.clientId.toString())).limit(1) : [null];

    // Fetch lawyer details for document number
    const lawyer = process.lawyerId ? await db.select().from(lawyers).where(eq(lawyers.id, process.lawyerId)).limit(1) : [null];

    // Fetch additional demandantes
    const plaintiffs = await db.select().from(demandantes).where(eq(demandantes.processId, id));

    // Fetch deceased data & family group if it's a pensioner/deceased related process
    let deceased = null;
    let family: unknown[] = [];
    let folder = null;
    if (process.clientId) {
      const cedula = process.clientId.toString();
      const [deceasedResults, folderResults] = await Promise.all([
        db.select().from(deceasedData).where(eq(deceasedData.clientId, cedula)).limit(1),
        db.select().from(folders).where(eq(folders.clientId, cedula)).limit(1)
      ]);
      deceased = deceasedResults[0] || null;
      folder = folderResults[0] || null;
      family = await db.select().from(familyGroups).where(eq(familyGroups.clientId, cedula));
    }

    return {
      ...process,
      client: client[0],
      lawyer: lawyer[0],
      folder,
      plaintiffs,
      deceased,
      family,
      annotations: annots,
      annexes: files,
    };
  } catch (error) {
    console.error("Get Process Details Error:", error);
    return null;
  }
}

export async function getProcesses(query?: string, page: number = 1, filters?: {
  despacho?: string;
  clase?: string;
  estado?: string;
  magistrado?: string;
  identidad?: string;
  negocio?: string;
  jurisdiccion?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
  num_carpeta?: string;
}) {
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const conditions = [];
    conditions.push(isNull(processes.deletedAt));

    if (query) {
      conditions.push(or(
        like(processes.folderNumber, `%${query}%`),
        like(processes.clientName, `%${query}%`),
        like(processes.radicadoIni, `%${query}%`),
        like(processes.radicadoTribunal, `%${query}%`),
        like(processes.radicadoCorte, `%${query}%`),
        like(processes.court, `%${query}%`),
        like(processes.jurisdiction, `%${query}%`)
      ));
    }

    if (filters) {
      if (filters.despacho) conditions.push(eq(processes.court, filters.despacho));
      if (filters.clase) conditions.push(eq(processes.processClass, filters.clase));
      if (filters.estado) conditions.push(eq(processes.status, filters.estado));
      if (filters.magistrado) conditions.push(like(processes.magistrate, `%${filters.magistrado}%`));
      if (filters.identidad) conditions.push(eq(processes.clientId, parseInt(filters.identidad)));
      if (filters.negocio) conditions.push(like(processes.businessLine, `%${filters.negocio}%`));
      if (filters.jurisdiccion) conditions.push(eq(processes.jurisdiction, filters.jurisdiccion));
      if (filters.num_carpeta) conditions.push(like(processes.folderNumber, `%${filters.num_carpeta}%`));
      
      // SQL date parsing for legacy DD/MM/YYYY formatting
      if (filters.fecha_desde) {
        conditions.push(sql`STR_TO_DATE(${processes.creationDate}, '%d/%m/%Y') >= ${filters.fecha_desde}`);
      }
      if (filters.fecha_hasta) {
        conditions.push(sql`STR_TO_DATE(${processes.creationDate}, '%d/%m/%Y') <= ${filters.fecha_hasta}`);
      }
    }

    const data = await db.select().from(processes)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(processes.id))
      .limit(limit)
      .offset(offset);

    const totalCount = await db.select({ count: db.count() })
      .from(processes)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return {
      data,
      totalPages: Math.ceil(totalCount[0].count / limit),
      currentPage: page
    };
  } catch (error) {
    console.error("Get Processes Error:", error);
    return { data: [], totalPages: 0, currentPage: 1 };
  }
}

export async function getDeletedProcesses(page: number = 1) {
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const data = await db.select().from(processes)
      .where(isNotNull(processes.deletedAt))
      .orderBy(desc(processes.deletedAt))
      .limit(limit)
      .offset(offset);

    const totalCount = await db.select({ count: db.count() })
      .from(processes)
      .where(isNotNull(processes.deletedAt));

    return {
      data,
      totalPages: Math.ceil(totalCount[0].count / limit),
      currentPage: page
    };
  } catch (error) {
    console.error("Get Deleted Processes Error:", error);
    return { data: [], totalPages: 0, currentPage: 1 };
  }
}

export async function getCourts() {
  try {
    return await db.select().from(processTypes).orderBy(processTypes.court);
  } catch {
    return [];
  }
}
export async function getPensionerDocuments(clientId: string) {
  try {
    // 1. Get unique pretensions for this client
    const clientPretensions = await db.select({
      pretensionId: pensionerDocuments.pretensionId,
      name: parameters.name
    })
    .from(pensionerDocuments)
    .innerJoin(parameters, eq(pensionerDocuments.pretensionId, parameters.id))
    .where(and(eq(pensionerDocuments.clientId, clientId), eq(parameters.type, "P")))
    .groupBy(pensionerDocuments.pretensionId, parameters.name);

    if (clientPretensions.length === 0) return [];

    const results = [];

    // 2. For each pretension, get its required documents and their current status
    for (const pret of clientPretensions) {
      if (!pret.pretensionId) continue;
      
      const docs = await db.select({
        documentId: pretensionDocumentMapping.documentId,
        documentName: parameters.name,
        status: pensionerDocuments.status,
        reference: pensionerDocuments.reference,
        date: pensionerDocuments.date
      })
      .from(pretensionDocumentMapping)
      .innerJoin(parameters, eq(pretensionDocumentMapping.documentId, parameters.id))
      .leftJoin(pensionerDocuments, and(
        eq(pensionerDocuments.documentId, pretensionDocumentMapping.documentId),
        eq(pensionerDocuments.clientId, clientId),
        eq(pensionerDocuments.pretensionId, pret.pretensionId)
      ))
      .where(and(eq(pretensionDocumentMapping.pretensionId, pret.pretensionId), eq(parameters.type, "D")));

      results.push({
        pretensionId: pret.pretensionId,
        pretensionName: pret.name,
        documents: docs
      });
    }

    return results;
  } catch (error) {
    console.error("Get Pensioner Documents Error:", error);
    return [];
  }
}

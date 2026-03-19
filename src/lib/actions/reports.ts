"use server";

import { db } from "@/db/db.server";
import { folders, processes, pensionerDocuments, parameters } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";

/**
 * Generates a CSV string from an array of objects
 */
function toCSV(data: Record<string, unknown>[]): string {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]).join(";");
  const rows = data.map(obj => 
    Object.values(obj).map(val => 
      typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val
    ).join(";")
  );
  return [headers, ...rows].join("\n");
}

export async function exportDemandantes() {
  const data = await db.select({
    Distrito: folders.district,
    Carpeta: folders.folderNumber,
    Carpeta2: folders.folderNumber2,
    Cedula: folders.clientId,
    Apellidos: folders.lastNames,
    Nombres: folders.firstNames,
    Genero: folders.gender,
    Fecha_Nac: folders.birthDate,
    Email: folders.email,
    Jurisdiccion: folders.jurisdiction,
    Condicion: folders.condition,
    Tipo: folders.type,
    Grupo: folders.group,
    Asociacion: folders.association,
    Fecha_Creacion: folders.creationDate
  }).from(folders).orderBy(desc(folders.clientId));

  return { 
    filename: `Reporte_Demandantes_${new Date().toISOString().split('T')[0]}.csv`,
    content: toCSV(data) 
  };
}

export async function exportProcesos() {
  const data = await db.select({
    Registro: processes.id,
    Fecha_Creacion: processes.creationDate,
    Carpeta: processes.folderNumber,
    Despacho: processes.court,
    Radicado_Inicial: processes.radicadoIni,
    Fecha_Radicado: processes.dateRadicadoIni,
    Magistrado: processes.magistrate,
    Demandante: processes.clientName,
    Cedula_Demandante: processes.clientId,
    Demandado: processes.defendantName,
    Negocio: processes.businessLine,
    Estado: processes.status,
    Jurisdiccion: processes.jurisdiction,
    Clase: processes.processClass,
    Apoderado: processes.lawyerName
  }).from(processes).orderBy(desc(processes.id));

  return { 
    filename: `Reporte_Procesos_${new Date().toISOString().split('T')[0]}.csv`,
    content: toCSV(data) 
  };
}

export async function exportInvDoc() {
  const data = await db.select({
    Cedula: pensionerDocuments.clientId,
    Pretension: parameters.name,
    Documento: pensionerDocuments.reference,
    Estado: pensionerDocuments.status,
    Fecha: pensionerDocuments.date,
    Vencimiento: pensionerDocuments.dueDate
  })
  .from(pensionerDocuments)
  .innerJoin(parameters, eq(pensionerDocuments.pretensionId, parameters.id))
  .orderBy(desc(pensionerDocuments.date));

  return { 
    filename: `Reporte_Inventario_Docs_${new Date().toISOString().split('T')[0]}.csv`,
    content: toCSV(data) 
  };
}

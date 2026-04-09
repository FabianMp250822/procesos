"use server";

import { db } from "@/db/db.server";
import { folders, processes, pensionerDocuments, parameters } from "@/db/schema";
import { desc, eq, and, isNull, or, like, sql } from "drizzle-orm";
import ExcelJS from "exceljs";

/**
 * Generates an XLSX base64 string from an array of objects
 */
async function toXLSX(data: Record<string, unknown>[], sheetName: string): Promise<string> {
  if (data.length === 0) return "";

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Set columns based on the first object's keys
  const headers = Object.keys(data[0]);
  worksheet.columns = headers.map(header => ({
    header: header.toUpperCase(),
    key: header,
    width: 20
  }));

  // Style the header row
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF012340' } // Corporate dark blue
  };

  // Add rows
  worksheet.addRows(data);

  // Add alternating row colors and borders
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      if (rowNumber % 2 === 0) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8F9FA' }
        };
      }
    }
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer).toString('base64');
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
    filename: `Reporte_Demandantes_${new Date().toISOString().split('T')[0]}.xlsx`,
    content: await toXLSX(data, "Demandantes"),
    type: "xlsx"
  };
}

export async function exportProcesos(query?: string, filters?: {
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
    if (filters.fecha_desde) conditions.push(sql`${processes.creationDate} >= ${filters.fecha_desde}`);
    if (filters.fecha_hasta) conditions.push(sql`${processes.creationDate} <= ${filters.fecha_hasta}`);
  }

  const data = await db.select({
    Registro: processes.id,
    Fecha_Creacion: processes.creationDate,
    Carpeta: processes.folderNumber,
    Carpeta_Aux: processes.folderNumber2,
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
  }).from(processes)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(processes.id));

  return { 
    filename: `Reporte_Procesos_${new Date().toISOString().split('T')[0]}.xlsx`,
    content: await toXLSX(data, "Procesos"),
    type: "xlsx"
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
    filename: `Reporte_Inventario_Docs_${new Date().toISOString().split('T')[0]}.xlsx`,
    content: await toXLSX(data, "Inventario"),
    type: "xlsx"
  };
}

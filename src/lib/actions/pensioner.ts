"use server";

import { db } from "@/db/db.server";
import { folders, familyGroups, deceasedData, lifeExpectancy, pensionerDocuments, clients, users } from "@/db/schema";
import { eq, and, desc, like } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { calculateInterval, formatInterval } from "@/lib/utils/pension-logic";

export async function getPensionerFolder(cedula: string) {
  try {
    const folderData = await db.select().from(folders).where(eq(folders.clientId, cedula)).limit(1);
    if (folderData.length === 0) return null;

    const folder = folderData[0];

    // Calculate Age
    const ageInterval = calculateInterval(folder.birthDate || "");
    
    // Fetch Life Expectancy
    const expData = await db.select().from(lifeExpectancy).where(eq(lifeExpectancy.age, ageInterval.years)).limit(1);
    const lifeExp = folder.gender === "M" ? (expData[0]?.maleExp || 0) : (expData[0]?.femaleExp || 0);

    // Calculate Service Time
    const serviceInterval = calculateInterval(folder.entryDateCompany || "", folder.exitDateCompany || "");

    // Fetch Deceased Data if applicable
    const deceased = await db.select().from(deceasedData).where(eq(deceasedData.clientId, cedula)).limit(1);

    // Fetch Family Group
    const family = await db.select().from(familyGroups).where(eq(familyGroups.clientId, cedula));

    return {
      ...folder,
      calculated: {
        age: ageInterval,
        ageFormatted: formatInterval(ageInterval),
        lifeExpectancy: lifeExp,
        serviceTime: serviceInterval,
        serviceTimeFormatted: formatInterval(serviceInterval),
      },
      deceased: deceased[0] || null,
      family: family,
    };
  } catch (error) {
    console.error("Get Pensioner Folder Error:", error);
    return null;
  }
}
export async function getFamilyGroup(cedula: string) {
  return await db.select().from(familyGroups).where(eq(familyGroups.clientId, cedula));
}

export async function addFamilyMember(cedula: string, formData: FormData) {
  await db.insert(familyGroups).values({
    clientId: cedula,
    memberId: formData.get("iden_afi") as string,
    firstNames: formData.get("nombres") as string,
    type: formData.get("tipo_cotizante") as string,
    birthDate: formData.get("fecha_nac") as string,
    relationship: formData.get("parentesco") as string,
    address: formData.get("direccion") as string,
    phone: formData.get("telefono") as string,
    city: formData.get("municipio") as string,
  });
  return { success: true };
}
export async function getPensionersAdvanced(filters: {
  group?: string;
  district?: string;
  association?: string;
  type?: string;
  condition?: string;
  id?: string;
  firstNames?: string;
  lastNames?: string;
}) {
  const conditions = [];
  if (filters.group && filters.group !== "1") conditions.push(eq(folders.group, filters.group));
  if (filters.district && filters.district !== "1") conditions.push(eq(folders.district, filters.district));
  if (filters.association && filters.association !== "1") conditions.push(eq(folders.association, filters.association));
  if (filters.type && filters.type !== "1") conditions.push(eq(folders.type, filters.type));
  if (filters.condition && filters.condition !== "1") conditions.push(eq(folders.condition, filters.condition));
  if (filters.id) conditions.push(like(folders.clientId, `%${filters.id}%`));
  if (filters.firstNames) conditions.push(like(folders.firstNames, `%${filters.firstNames}%`));
  if (filters.lastNames) conditions.push(like(folders.lastNames, `%${filters.lastNames}%`));

  return await db.select()
    .from(folders)
    .where(and(...conditions))
    .orderBy(desc(folders.clientId))
    .limit(100);
}

export async function createPensioner(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("iden") as string;
  const folderNumber = formData.get("num_carpeta") as string;
  const firstNames = formData.get("nombre") as string;
  const lastNames = formData.get("apellido") as string;
  const district = formData.get("distrito") as string;
  
  try {
    // 1. Insert into archivo_carpetas (folders in drizzle)
    await db.insert(folders).values({
      clientId: id,
      folderNumber: folderNumber,
      folderNumber2: formData.get("num_carpeta_2") as string,
      firstNames: firstNames,
      lastNames: lastNames,
      gender: formData.get("genero") as string,
      birthDate: formData.get("fecha_nac") as string,
      addressRes: formData.get("direccion_res") as string,
      group: formData.get("grupo") as string,
      group2: formData.get("grupo_2") as string,
      district: district,
      jurisdiction: formData.get("ciudad") as string,
      phoneActual: formData.get("telefono1") as string,
      phoneFixed: formData.get("telefono2") as string,
      email: formData.get("email") as string,
      association: formData.get("asociacion") as string,
      condition: formData.get("condicion") as string,
      type: formData.get("tipo") as string,
      recognitionAct: formData.get("acto_jubilacion") as string,
      initialMesadaJubilation: formData.get("mesada_jubilacion") as string,
      startDatePension: formData.get("fecha_jubilacion") as string,
      entryDateCompany: formData.get("fecha_ingreso") as string,
      exitDateCompany: formData.get("fecha_egreso") as string,
      recognitionDateJubilation: formData.get("fecha_acto") as string,
      ageAtJubilation: formData.get("EDAD_JUBILACION") as string,
      resColpensiones: formData.get("resolucion_iss") as string,
      initialMesadaIss: formData.get("valor_vejez_iss") as string,
      initialDateIss: formData.get("fecha_vejez_iss") as string,
      resDate: formData.get("fecha_resolucion") as string,
      totalWeeks: formData.get("semanas") as string,
      replacementRate: formData.get("tasa_reemplazo") as string,
      compartitionDate: formData.get("fecha_comparticion") as string,
      valueBeforeCompartition: formData.get("valor_antes_comparticion") as string,
      retroactiveSuspense: formData.get("retroactivo_suspenso") as string,
      descompartibilidadDate: formData.get("fecha_descompartibilidad") as string,
      valueAtChargeOfCompany: formData.get("valor_cargo_empresa") as string,
      valueVejezIss: formData.get("valor_pension_vejez_iss") as string,
      creationDate: new Date().toLocaleDateString("es-CO"),
      deceasedId: formData.get("cedula_finado") as string,
      deceasedName: formData.get("nombre_finado") as string,
      deceasedResIss: formData.get("resolucion_iss_finado") as string,
      deceasedResDate: formData.get("fecha_resolucion_finado") as string,
    });

    // 2. Insert into clientes (mirroring legacy logic)
    const checkCliente = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    if (checkCliente.length === 0) {
      await db.insert(clients).values({
        id: id,
        folderNumber: folderNumber,
        identityType: "CEDULA",
        firstNames: firstNames,
        lastNames: lastNames,
        addressRes: formData.get("direccion_res") as string,
        phone1: formData.get("telefono1") as string,
        phoneRes: formData.get("telefono2") as string,
        cityRes: formData.get("ciudad") as string,
        email: formData.get("email") as string,
        group: formData.get("grupo") as string,
        gender: formData.get("genero") === "M" ? "MASCULINO" : "FEMENINO",
        birthDate: formData.get("fecha_nac") as string,
      });
    }

    // 3. Create User if not exists
    const username = `C${id}`;
    const existingUser = await db.select().from(users).where(eq(users.id, username)).limit(1);
    
    if (existingUser.length === 0) {
      // Use client password if level is client or just ID
      await db.insert(users).values({
        id: username,
        password: id,
        level: "C",
      });
    }

    revalidatePath("/dashboard/pensioners");
    
  } catch (error) {
    console.error("Create Pensioner Error:", error);
    throw error;
  }

  redirect("/dashboard/pensioners");
}

export async function updatePensionerDocumentStatus(cedula: string, pretensionId: number, documentId: number, status: string) {
  await db.update(pensionerDocuments)
    .set({ status })
    .where(and(
      eq(pensionerDocuments.clientId, cedula),
      eq(pensionerDocuments.pretensionId, pretensionId),
      eq(pensionerDocuments.documentId, documentId)
    ));
  revalidatePath(`/dashboard/processes`);
  return { success: true };
}

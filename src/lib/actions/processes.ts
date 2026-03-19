"use server";

import { db } from "@/db/db.server";
import { processes, clients, users, annotations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rate-limit";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function createProcess(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { success } = await rateLimit(`user:${session.user.id}:createProcess`, 10, 60);
  if (!success) throw new Error("Acción bloqueada temporalmente: Demasiados intentos.");

  const folderNumber = (formData.get("num_carpeta") as string) || "";
  const folderNumber2 = (formData.get("num_carpeta2") as string) || "";
  const court = (formData.get("despacho") as string) || "";
  const radicadoIni = (formData.get("num_radicado_ini") as string) || "";
  const dateRadicadoIni = (formData.get("fecha_radicado_ini") as string) || "";
  const radicadoTribunal = (formData.get("radicado_tribunal") as string) || "";
  const magistrate = (formData.get("magistrado") as string) || "";
  const jurisdiction = (formData.get("jurisdiccion") as string) || "";
  const processClass = (formData.get("clase_proceso") as string) || "";
  const clientDni = formData.get("identidad_clientes") as string;
  const clientName = (formData.get("nombres_demandante") as string) || "";
  const defendantId = parseInt(formData.get("identidad_demandado") as string) || 0;
  const defendantName = (formData.get("nombres_demandado") as string) || "";
  const businessLine = (formData.get("negocio") as string) || "";
  const lawyerId = parseInt(formData.get("identidad_abogados") as string) || 0;
  const lawyerName = (formData.get("nombres_apoderado") as string) || "";
  const radicadoUlt = (formData.get("num_radicado_ult") as string) || "";
  const radicadoCorte = (formData.get("radicado_corte") as string) || "";
  const magistrateCorte = (formData.get("magistrado_corte") as string) || "";
  const casacion = (formData.get("casacion") as string) || "NO";
  const status = (formData.get("estado") as string) || "ACTIVO";
  const description = (formData.get("descripcion") as string) || "";
  const sentenceJuzgado = (formData.get("sentencia_juzgado") as string) || "";
  const sentenceTribunal = (formData.get("sentencia_tribunal") as string) || "";

  try {
    if (clientDni) {
      const existingClient = await db.select().from(clients).where(eq(clients.id, clientDni)).limit(1);
      if (existingClient.length === 0) {
        await db.insert(clients).values({
          id: clientDni,
          firstNames: clientName,
          folderNumber: folderNumber,
        });
        
        const username = `C${clientDni}`;
        const existingUser = await db.select().from(users).where(eq(users.id, username)).limit(1);
        if (existingUser.length === 0) {
          await db.insert(users).values({
            id: username,
            password: clientDni,
            level: "C",
          });
        }
      }
    }

    await db.insert(processes).values({
      creationDate: new Date().toLocaleDateString("es-CO"),
      folderNumber,
      folderNumber2,
      court,
      radicadoIni,
      dateRadicadoIni,
      radicadoTribunal,
      magistrate,
      jurisdiction,
      processClass,
      status,
      clientId: clientDni ? parseInt(clientDni) : 0,
      clientName,
      defendantId,
      defendantName,
      businessLine,
      lawyerId,
      lawyerName,
      radicadoUlt,
      radicadoCorte,
      magistrateCorte,
      casacion,
      description,
      sentenceJuzgado,
      sentenceTribunal,
    });

  } catch (error) {
    console.error("Create Process Error:", error);
    throw error;
  }
  
  redirect("/dashboard/processes");
}

export async function updateProcess(id: number, formData: FormData): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const folderNumber = (formData.get("num_carpeta") as string) || "";
  const folderNumber2 = (formData.get("num_carpeta2") as string) || "";
  const court = (formData.get("despacho") as string) || "";
  const radicadoIni = (formData.get("num_radicado_ini") as string) || "";
  const dateRadicadoIni = (formData.get("fecha_radicado_ini") as string) || "";
  const radicadoTribunal = (formData.get("radicado_tribunal") as string) || "";
  const magistrate = (formData.get("magistrado") as string) || "";
  const jurisdiction = (formData.get("jurisdiccion") as string) || "";
  const processClass = (formData.get("clase_proceso") as string) || "";
  const status = (formData.get("estado") as string) || "";
  const sentenceJuzgado = (formData.get("sentencia_juzgado") as string) || "";
  const sentenceTribunal = (formData.get("sentencia_tribunal") as string) || "";
  const defendantId = parseInt(formData.get("identidad_demandado") as string) || 0;
  const defendantName = (formData.get("nombres_demandado") as string) || "";
  const businessLine = (formData.get("negocio") as string) || "";
  const lawyerId = parseInt(formData.get("identidad_abogados") as string) || 0;
  const lawyerName = (formData.get("nombres_apoderado") as string) || "";
  const radicadoUlt = (formData.get("num_radicado_ult") as string) || "";
  const radicadoCorte = (formData.get("radicado_corte") as string) || "";
  const magistrateCorte = (formData.get("magistrado_corte") as string) || "";
  const casacion = (formData.get("casacion") as string) || "";
  const description = (formData.get("descripcion") as string) || "";

  try {
    await db.update(processes).set({
      folderNumber,
      folderNumber2,
      court,
      radicadoIni,
      dateRadicadoIni,
      radicadoTribunal,
      magistrate,
      jurisdiction,
      processClass,
      status,
      sentenceJuzgado,
      sentenceTribunal,
      defendantId,
      defendantName,
      businessLine,
      lawyerId,
      lawyerName,
      radicadoUlt,
      radicadoCorte,
      magistrateCorte,
      casacion,
      description,
    }).where(eq(processes.id, id));

    revalidatePath(`/dashboard/processes/${id}`);
    revalidatePath("/dashboard/processes");
  } catch (error) {
    console.error("Update Process Error:", error);
    throw error;
  }

  redirect(`/dashboard/processes/${id}`);
}

export async function deleteProcess(id: number): Promise<void> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== 'X') throw new Error("Acceso denegado: Se requieren permisos de administrador.");

  try {
    await db.delete(processes).where(eq(processes.id, id));
    revalidatePath("/dashboard/processes");
  } catch (error) {
    console.error("Delete Process Error:", error);
    throw error;
  }
  redirect("/dashboard/processes");
}

export async function addAnnotation(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { success } = await rateLimit(`user:${session.user.id}:addAnnotation`, 20, 60);
  if (!success) throw new Error("Acción bloqueada temporalmente: Demasiados intentos.");

  const processId = parseInt(formData.get("processId") as string);
  const annotation = formData.get("anotacion") as string;
  const type = formData.get("tipo") as string;
  const limitDate = formData.get("fecha_limite") as string;
  const limitHour = (formData.get("hora_limite") as string) || "11:45:00";
  const dateStr = (formData.get("fecha_actuacion") as string); // Format expected: YYYY-MM-DD from input[type=date]
  const visualizar = formData.get("visualizar") === "on" ? "SI" : "NO";
  const proceduralStatus = (formData.get("estado_procesal") as string) || annotation;
  const courts = parseInt(formData.get("despachos") as string) || 1;

  // Format date to D-M-Y for legacy consistency
  let formattedDate = new Date().toLocaleDateString("es-CO").replace(/\//g, '-');
  if (dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    formattedDate = `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;
  }

  const datar = new Date().toLocaleDateString("es-CO");
  const timer = new Date().toLocaleTimeString("es-CO", { hour12: false });

  // Handle File Upload parity
  const file = formData.get("archivo_adjunto") as File;
  let documentName = "";
  let fileUrl = "";

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const key = `annotations/${processId}/${fileName}`;

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: key,
          Body: buffer,
          ContentType: file.type,
        })
      );
      documentName = file.name;
      fileUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
    } catch (s3Error) {
      console.error("S3 Upload Error for Annotation:", s3Error);
      // Continue without file if upload fails? Or fail entire action? 
      // Legacy behavior Alert and continue or fail. We'll fail for safety.
      throw new Error("Error al subir el archivo adjunto.");
    }
  }

  try {
    await db.insert(annotations).values({
      processId,
      date: formattedDate,
      annotation,
      type,
      limitDate,
      limitHour,
      visualize: visualizar,
      proceduralStatus,
      courts,
      registrationDate: datar,
      registrationHour: timer,
      documentName,
      fileUrl,
    });

    revalidatePath(`/dashboard/processes/${processId}`);
  } catch (error) {
    console.error("Add Annotation Error:", error);
    throw error;
  }
}

export async function updateAnnotation(id: number, formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const processId = parseInt(formData.get("processId") as string);
  const annotation = formData.get("anotacion") as string;
  const type = formData.get("tipo") as string;
  const limitDate = formData.get("fecha_limite") as string;

  try {
    await db.update(annotations).set({
      annotation,
      type,
      limitDate,
      proceduralStatus: annotation,
    }).where(eq(annotations.id, id));

    revalidatePath(`/dashboard/processes/${processId}`);
  } catch (error) {
    console.error("Update Annotation Error:", error);
    throw error;
  }
}

export async function deleteAnnotation(id: number, processId: number): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await db.delete(annotations).where(eq(annotations.id, id));
    revalidatePath(`/dashboard/processes/${processId}`);
  } catch (error) {
    console.error("Delete Annotation Error:", error);
    throw error;
  }
}

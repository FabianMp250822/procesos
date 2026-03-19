"use server";

import { db } from "@/db/db.server";
import { annotations } from "@/db/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getTasks(from?: string, to?: string) {
  const session = await auth();
  if (!session?.user?.id) return [];
  
  const conditions = [eq(annotations.processId, 4)];
  if (from) conditions.push(gte(annotations.limitDate, from));
  if (to) conditions.push(lte(annotations.limitDate, to));

  const results = await db.select()
    .from(annotations)
    .where(and(...conditions))
    .orderBy(desc(annotations.id));

  // Transform to match the UI expectation
  return results.map(row => ({
    id: row.id,
    title: row.proceduralStatus?.substring(0, 50) || "Sin título",
    description: row.proceduralStatus,
    date: row.limitDate,
    hour: row.limitHour,
    status: row.visualize === "SI" ? "COMPLETADO" : "PENDIENTE", // Example mapping
    userId: row.registrationHour, // Using a dummy field or dummy value
  }));
}

export async function createTask(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-').replace(/\./g, '');
  const regDate = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const regHour = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  await db.insert(annotations).values({
    processId: 4,
    date: dateStr,
    type: "",
    limitDate: formData.get("fecha") as string,
    limitHour: formData.get("hora") as string,
    annotation: "",
    visualize: "NO",
    proceduralStatus: formData.get("titulo") + ": " + formData.get("descripcion"),
    courts: 1,
    registrationDate: regDate,
    registrationHour: regHour,
    documentName: "",
  });

  revalidatePath("/dashboard/agenda/pending");
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard/agenda");
}

export async function updateTaskStatus(id: number, status: string) {
  const visualize = status === "COMPLETADO" ? "SI" : "NO";
  await db.update(annotations).set({ visualize }).where(eq(annotations.id, id));
  revalidatePath("/dashboard/agenda/pending");
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard/agenda");
}

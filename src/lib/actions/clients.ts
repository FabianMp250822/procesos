"use server";

import { db } from "@/db/db.server";
import { clients, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function createClient(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { success } = await rateLimit(`user:${session.user.id}:createClient`, 10, 60);
  if (!success) throw new Error("Acción bloqueada temporalmente: Demasiados intentos.");

  const id = formData.get("iden") as string;
  const folderNumber = formData.get("carpeta") as string;
  const identityType = formData.get("tipo_iden") as string;
  const firstNames = formData.get("nombre") as string;
  const lastNames = formData.get("apellido") as string;
  const addressRes = formData.get("direccion_res") as string;
  const phone1 = formData.get("telefono1") as string;
  const phoneRes = formData.get("telefono_res") as string;
  const phone2 = formData.get("telefono2") as string;
  const phone3 = formData.get("telefono3") as string;
  const cityRes = formData.get("ciudad_res") as string;
  const addressOfi = formData.get("direccion_ofi") as string;
  const email = formData.get("email") as string;
  const group = formData.get("grupo") as string;
  const gender = formData.get("genero") as string;
  
  const dia_nac = formData.get("dia_nac");
  const mes_nac = formData.get("mes_nac");
  const ano_nac = formData.get("año_nac");
  const birthDate = `${dia_nac}/${mes_nac}/${ano_nac}`;

  const pensionType = formData.get("tipo_pen") as string;
  const pensionIdentityType = formData.get("tipo_pen_iden") as string;
  const pensionIdentity = parseInt(formData.get("iden_pen") as string) || 0;
  const pensionName = formData.get("nombre_pen") as string;

  const dia_pen = formData.get("dia_pen");
  const mes_pen = formData.get("mes_pen");
  const ano_pen = formData.get("año_pen");
  const recognitionDate = `${dia_pen}/${mes_pen}/${ano_pen}`;

  const initialPension = parseInt(formData.get("mesada") as string) || 0;
  const retroactive = parseInt(formData.get("retro") as string) || 0;

  const dia_fall = formData.get("dia_fall");
  const mes_fall = formData.get("mes_fall");
  const ano_fall = formData.get("año_fall");
  const deathDate = `${dia_fall}/${mes_fall}/${ano_fall}`;

  const pensionCompany = parseInt(formData.get("pen_empresa") as string) || 0;
  const pensionIss = parseInt(formData.get("pen_iss") as string) || 0;
  const salary = parseInt(formData.get("pen_salario") as string) || 0;
  const weeks = parseInt(formData.get("pen_semana") as string) || 0;

  try {
    // 1. Check if exists
    const existing = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    if (existing.length > 0) {
      return { error: "Este registro ya es Existente" };
    }

    // 2. Insert into clients
    await db.insert(clients).values([{
      id,
      folderNumber,
      identityType,
      firstNames,
      lastNames,
      addressRes,
      phone1,
      phoneRes,
      phone2,
      phone3,
      cityRes,
      addressOfi,
      email,
      group,
      gender,
      birthDate,
      pensionType,
      pensionIdentityType,
      pensionIdentity,
      pensionName,
      recognitionDate,
      initialPension,
      retroactive,
      deathDate,
      pensionEntity: pensionCompany.toString(),
      pensionIss: pensionIss.toString(),
      salary: salary.toString(),
      weeks: weeks.toString(),
    }]);

    // 3. Create User if not exists
    const username = `C${id}`;
    const existingUser = await db.select().from(users).where(eq(users.id, username)).limit(1);
    
    if (existingUser.length === 0) {
      await db.insert(users).values({
        id: username,
        password: id,
        level: "C",
      });
    }

    revalidatePath("/dashboard/clients");
    
  } catch (error: any) {
    console.error("Create Client Error:", error);
    throw error;
  }

  redirect("/dashboard/clients");
}

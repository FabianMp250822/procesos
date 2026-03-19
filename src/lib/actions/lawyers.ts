"use server";

import { db } from "@/db/db.server";
import { lawyers } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createLawyer(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const idStr = formData.get("identidad") as string;
  const id = parseInt(idStr);
  
  if (isNaN(id)) {
    return { error: "ID de abogado debe ser un número válido." };
  }

  try {
    await db.insert(lawyers).values({
      id: id,
      firstNames: formData.get("nombres") as string,
      lastNames: formData.get("apellidos") as string,
      barCard: formData.get("tarjeta_pro") as string,
      cityRes: formData.get("ciudad_res") as string,
      addressRes: formData.get("direccion_res") as string,
      phone1: formData.get("telefono_1") as string,
      phone2: formData.get("telefono_2") as string,
      phoneRes: formData.get("telefono_res") as string,
      phoneOfi: formData.get("telefono_ofi") as string,
      email: formData.get("email") as string,
      website: formData.get("sitio_web") as string,
    });

    revalidatePath("/dashboard/lawyers");
  } catch (error: any) {
    console.error("Create Lawyer Error:", error);
    return { error: "Error al crear abogado. Es posible que la identificación ya exista." };
  }

  redirect("/dashboard/lawyers");
}

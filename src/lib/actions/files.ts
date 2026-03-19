"use server";

import { db } from "@/db/db.server";
import { annotations, annexes } from "@/db/schema";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadAnnex(processId: number, formData: FormData) {
  const file = formData.get("file") as File;
  const description = formData.get("description") as string;
  
  if (!file || file.size === 0) throw new Error("No file uploaded");

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const key = `annexes/${processId}/${fileName}`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const r2Url = `${process.env.R2_PUBLIC_URL}/${key}`;

    await db.insert(annexes).values({
      processId,
      fileDate: new Date().toLocaleDateString("es-CO"),
      fileName: file.name,
      description: description || "Sin descripción",
      uploadDate: new Date(),
      fileType: file.type,
      filePath: r2Url,
    });

    revalidatePath(`/dashboard/processes/${processId}`);
  } catch (error) {
    console.error("Upload Annex Error:", error);
    throw error;
  }
}

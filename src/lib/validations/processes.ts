import { z } from "zod";

export const annotationSchema = z.object({
  processId: z.coerce.number().positive("ID de proceso inválido"),
  fecha_actuacion: z.string().min(1, "La fecha es requerida"),
  tipo: z.string().min(1, "El tipo de actuación es requerido"),
  anotacion: z.string().min(1, "La anotación no puede estar vacía"),
  despachos: z.coerce.number().int().nonnegative("Despacho inválido"),
  estado_procesal: z.string().min(1, "El estado procesal es requerido"),
  visualizar: z.enum(["SI", "NO"]).default("SI"),
});

export const updateAnnotationSchema = annotationSchema.partial().extend({
  processId: z.coerce.number().positive("ID de proceso inválido"),
});

export type AnnotationInput = z.infer<typeof annotationSchema>;
export type UpdateAnnotationInput = z.infer<typeof updateAnnotationSchema>;

import { db } from "@/db/db.server";
import { annotations, processes } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { FileText, Calendar, Clock, MessageSquare, Search } from "lucide-react";
import { Suspense } from "react";

export default async function AnnotationsReportPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  const today = new Date().toLocaleDateString("es-CO");
  const targetDate = date || today;

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary rounded-xl text-secondary-foreground font-bold">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Reporte de Anotaciones</h1>
            <p className="text-sm text-muted-foreground font-bold">Historial de actuaciones diarias</p>
          </div>
        </div>

        <form className="flex items-center gap-2">
          <label className="text-[10px] font-black uppercase text-muted-foreground">Filtrar Fecha:</label>
          <input 
            type="text" 
            name="date" 
            defaultValue={targetDate}
            placeholder="DD/MM/YYYY"
            className="bg-card border border-border px-3 py-1.5 rounded-lg text-xs font-bold outline-none focus:ring-1 focus:ring-primary"
          />
          <button className="p-2 bg-primary text-primary-foreground rounded-lg">
            <Search size={14} />
          </button>
        </form>
      </div>

      <Suspense fallback={<div className="text-center py-20 font-bold uppercase text-muted-foreground animate-pulse">Generando reporte...</div>}>
        <AnnotationsList targetDate={targetDate} />
      </Suspense>
    </div>
  );
}

async function AnnotationsList({ targetDate }: { targetDate: string }) {
  const results = await db.select({
    id: annotations.id,
    date: annotations.date,
    processId: annotations.processId,
    hour: annotations.registrationHour,
    detail: annotations.annotation,
    processName: processes.clientName,
    folder: processes.folderNumber
  })
  .from(annotations)
  .leftJoin(processes, eq(annotations.processId, processes.id))
  .where(eq(annotations.registrationDate, targetDate))
  .orderBy(desc(annotations.id));

  if (results.length === 0) {
    return (
      <div className="text-center py-20 bg-card border border-dashed border-border rounded-3xl opacity-50">
        <p className="text-sm font-black uppercase tracking-widest">No se hallaron anotaciones para el {targetDate}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expediente</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground w-32">Registro</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Anotación / Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {results.map((r) => (
              <tr key={r.id} className="hover:bg-primary/5 transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight">{r.processName || '---'}</p>
                      <p className="text-[10px] text-muted-foreground font-bold">CARPETA: {r.folder || '---'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 font-bold">
                  <div className="flex flex-col gap-1 items-start">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Calendar size={10} /> {r.date}</span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock size={10} /> {r.hour || '---'}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                   <div className="flex gap-3">
                     <MessageSquare size={14} className="text-muted-foreground shrink-0 mt-1" />
                     <p className="text-xs font-bold leading-relaxed">{r.detail}</p>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

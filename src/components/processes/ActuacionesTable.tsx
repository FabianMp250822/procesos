"use client";

import { useState, useTransition } from "react";
import { History, Edit2, Trash2, FileText, Plus, ExternalLink } from "lucide-react";
import { AnnotationModal } from "@/components/AnnotationModal";
import { deleteAnnotation } from "@/lib/actions/processes";

interface Annotation {
  id: number;
  date: string | null;
  annotation: string | null;
  type: string | null;
  limitDate: string | null;
  limitHour: string | null;
  visualize: string | null;
  proceduralStatus: string | null;
  courts: number | null;
  documentName?: string | null;
  fileUrl?: string | null;
}

interface ActuacionesTableProps {
  annotations: Annotation[];
  processId: number;
}

export function ActuacionesTable({ annotations, processId }: ActuacionesTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleEdit = (note: Annotation) => {
    setSelectedAnnotation(note);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedAnnotation(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de eliminar esta actuación?")) {
      startTransition(async () => {
        try {
          await deleteAnnotation(id, processId);
        } catch (error) {
          alert("Error al eliminar: " + (error instanceof Error ? error.message : String(error)));
        }
      });
    }
  };

  return (
    <>
      {/* Table Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-[#012340] text-white rounded-xl shadow-lg">
            <History size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#012340] uppercase tracking-tight">Actuaciones del Proceso</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Historial Cronológico Numerado</p>
          </div>
        </div>
        
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
        >
          <Plus size={16} /> Nueva Actuación
        </button>
      </div>

      <section className="bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-[10px] font-black text-[#012340] uppercase tracking-wider text-center border-r border-slate-200/60">No.</th>
                <th className="px-4 py-3 text-[10px] font-black text-[#012340] uppercase tracking-wider border-r border-slate-200/60">Fecha Actuación</th>
                <th className="px-6 py-3 text-[10px] font-black text-[#012340] uppercase tracking-wider border-r border-slate-200/60">Detalle / Anotación</th>
                <th className="px-4 py-3 text-[10px] font-black text-[#012340] uppercase tracking-wider border-r border-slate-200/60">Actuación</th>
                <th className="px-4 py-3 text-[10px] font-black text-[#012340] uppercase tracking-wider border-r border-slate-200/60">Fecha Límite</th>
                <th className="px-4 py-3 text-[10px] font-black text-[#012340] uppercase tracking-wider border-r border-slate-200/60">Hora Límite</th>
                <th className="px-4 py-3 text-[10px] font-black text-[#012340] uppercase tracking-wider text-center border-r border-slate-200/60 w-24">Acciones</th>
                <th className="px-4 py-3 text-[10px] font-black text-[#012340] uppercase tracking-wider text-center">Acto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...annotations]
                .sort((a, b) => new Date(a.date || '').getTime() - new Date(b.date || '').getTime())
                .map((note, index) => (
                <tr key={note.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-4 py-3 text-[11px] font-black text-slate-400 text-center border-r border-slate-100/50">{index + 1}</td>
                  <td className="px-4 py-3 text-[11px] font-bold text-[#012340] border-r border-slate-100/50 whitespace-nowrap">{note.date}</td>
                  <td className="px-6 py-3 border-r border-slate-100/50">
                    <div className="max-w-2xl">
                      <p className="text-[11px] text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">{note.annotation}</p>
                      {note.proceduralStatus && note.proceduralStatus !== note.annotation && (
                        <div className="mt-2 p-2 bg-blue-50/50 rounded-lg border border-blue-100/50">
                          <p className="text-[9px] font-black text-blue-500 uppercase tracking-tighter mb-0.5">Estado Procesal</p>
                          <p className="text-[10px] font-bold text-slate-600 line-clamp-2">{note.proceduralStatus}</p>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-slate-100/50">
                    <span className="text-[9px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 uppercase whitespace-nowrap">
                      {note.type || 'ACTUACIÓN'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] font-bold text-amber-600 border-r border-slate-100/50">{note.limitDate || '-'}</td>
                  <td className="px-4 py-3 text-[11px] font-bold text-slate-400 border-r border-slate-100/50">{note.limitHour || '-'}</td>
                  <td className="px-4 py-3 border-r border-slate-100/50">
                    <div className="flex items-center justify-center gap-1 opacity-40 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleEdit(note)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        disabled={isPending}
                        onClick={() => handleDelete(note.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {note.fileUrl ? (
                      <a 
                        href={note.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[9px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-tighter"
                      >
                        <FileText size={12} /> Ver Archivo
                      </a>
                    ) : (
                      <button 
                        onClick={() => handleEdit(note)}
                        className="inline-flex items-center gap-1.5 text-[9px] font-black text-blue-500 hover:text-blue-700 uppercase tracking-tighter"
                      >
                        <Plus size={12} /> Adjuntar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {annotations.length === 0 && (
            <div className="text-center py-12 bg-slate-50 border-t border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No se registran actuaciones para este proceso</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal for Add/Edit */}
      <AnnotationModal 
        processId={processId} 
        initialData={selectedAnnotation}
        isOpenExternal={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

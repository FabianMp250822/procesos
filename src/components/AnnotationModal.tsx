"use client";

import { useState, useTransition } from "react";
import { Plus, X, Calendar, Landmark, FileText, Shield, AlertCircle, Upload, Save, Loader2, Edit2 } from "lucide-react";
import { addAnnotation, updateAnnotation } from "@/lib/actions/processes";

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

interface AnnotationModalProps {
  processId: number;
  initialData?: Annotation;
  onClose?: () => void;
  isOpenExternal?: boolean;
}

export function AnnotationModal({ processId, initialData, onClose, isOpenExternal }: AnnotationModalProps) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : isOpenInternal;
  const setOpen = (val: boolean) => {
    if (isOpenExternal !== undefined) {
      if (!val && onClose) onClose();
    } else {
      setIsOpenInternal(val);
    }
  };

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        if (initialData) {
          await updateAnnotation(initialData.id, formData);
        } else {
          await addAnnotation(formData);
        }
        setOpen(false);
      } catch (error) {
        alert("Error al guardar la actuación: " + (error instanceof Error ? error.message : String(error)));
      }
    });
  }

  // Convert legacy Date format (DD-MMM-YYYY) to YYYY-MM-DD for input
  const formatToInputDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    // If it's already YYYY-MM-DD
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
    
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
    } catch {}
    return "";
  };

  if (!isOpen && isOpenExternal === undefined) {
    return (
      <button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
      >
        <Plus size={18} /> Nueva Actuación
      </button>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-12 pb-12 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl border border-slate-200/60 animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 z-10 bg-white px-8 py-6 border-b border-slate-100 flex items-center justify-between rounded-t-[2rem]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              {initialData ? <Edit2 size={20} /> : <Plus size={20} />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{initialData ? "Editar Actuación" : "Añadir Actuación"}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{initialData ? `Editando registro ${initialData.id}` : "Nueva novedad para el proceso"}</p>
            </div>
          </div>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form action={handleSubmit} className="p-8 space-y-8">
          <input type="hidden" name="processId" value={processId} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                <Calendar size={14} className="text-blue-500" /> Fecha Actuación
              </label>
              <input 
                type="date" 
                name="fecha_actuacion" 
                required 
                defaultValue={initialData ? formatToInputDate(initialData.date) : new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                <FileText size={14} className="text-blue-500" /> Tipo
              </label>
              <select 
                name="tipo" 
                defaultValue={initialData?.type || "NOTIFICACION"}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="NOTIFICACION">NOTIFICACIÓN</option>
                <option value="AUTO">AUTO</option>
                <option value="SENTENCIA">SENTENCIA</option>
                <option value="AUDIENCIA">AUDIENCIA</option>
                <option value="OTRO">OTRA NOVEDAD</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                <Landmark size={14} className="text-blue-500" /> Despacho
              </label>
              <select 
                name="despachos" 
                defaultValue={initialData?.courts?.toString() || "1"}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="1">1. JUZGADO</option>
                <option value="2">2. TRIBUNAL</option>
                <option value="3">3. CORTE</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-500" /> Fecha Límite
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="date" 
                  name="fecha_limite" 
                  defaultValue={initialData?.limitDate || ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 outline-none focus:border-blue-500 transition-all" 
                />
                <input 
                  type="time" 
                  name="hora_limite" 
                  defaultValue={initialData?.limitHour?.slice(0,5) || "11:45"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 outline-none focus:border-blue-500 transition-all" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Detalle / Actuación</label>
            <textarea 
              name="anotacion" 
              required 
              defaultValue={initialData?.annotation || ""}
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl text-sm text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all min-h-[100px] resize-none" 
              placeholder="Describa la actuación o novedad aquí..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
              <Shield size={14} className="text-blue-500" /> Estado Procesal
            </label>
            <textarea 
              name="estado_procesal" 
              required 
              defaultValue={initialData?.proceduralStatus || ""}
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl text-sm text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all min-h-[80px] resize-none" 
              placeholder="Estado actual del proceso para seguimiento interno..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
              <Upload size={14} className="text-emerald-500" /> {initialData?.fileUrl ? "Actualizar Documento (Opcional)" : "Adjuntar Documento (Opcional)"}
            </label>
            <div className="relative group">
              <input 
                type="file" 
                name="archivo_adjunto" 
                className="w-full bg-slate-50 border border-slate-200 border-dashed rounded-2xl px-6 py-8 text-sm text-slate-400 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-[11px] file:font-black file:uppercase file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer transition-all" 
              />
              {initialData?.fileUrl && (
                <p className="mt-2 text-[10px] text-slate-400 italic px-2">Archivo actual: {initialData.documentName || "documento.pdf"}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 pt-4">
            <div className="flex items-center gap-3 py-3 px-5 rounded-2xl bg-slate-50 border border-slate-200">
               <input 
                 type="checkbox" 
                 name="visualizar" 
                 id="visualizar_check_modal" 
                 defaultChecked={initialData ? initialData.visualize === "SI" : true}
                 className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500/20" 
               />
               <label htmlFor="visualizar_check_modal" className="text-[11px] font-bold text-slate-600 uppercase tracking-widest cursor-pointer select-none">Visible para el cliente</label>
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="flex-1 px-8 py-5 bg-blue-600 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,99,235,0.25)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {isPending ? "GUARDANDO..." : initialData ? "ACTUALIZAR" : "GUARDAR ACTUACIÓN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

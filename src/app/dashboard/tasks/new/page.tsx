"use client";

import { useTransition } from "react";
import { createTask } from "@/lib/actions/tasks";
import { Plus, X, Calendar, Clock, FileText, Shield, Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewTaskPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createTask(formData);
        router.push("/dashboard/tasks");
      } catch (error) {
        alert("Error al guardar la tarea: " + (error instanceof Error ? error.message : String(error)));
      }
    });
  }

  return (
    <div className="p-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/dashboard/tasks" 
          className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-2xl transition-all shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-800 italic">Nueva Tarea</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600/60 transition-all hover:tracking-[0.15em]">AgregarTarea.php Parity</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-200/60 overflow-hidden">
        <div className="bg-[#012340] px-10 py-8 flex items-center gap-5">
           <div className="p-3 bg-white/10 rounded-2xl text-blue-400">
             <Plus size={24} />
           </div>
           <div>
             <h2 className="text-white font-black uppercase tracking-widest text-sm">Registro de Actividad</h2>
             <p className="text-blue-400/60 text-[10px] uppercase font-bold tracking-widest mt-1">Sincronizado con la agenda global</p>
           </div>
        </div>

        <form action={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <FileText size={14} className="text-blue-500" /> Título de la Tarea
            </label>
            <input 
              name="titulo" 
              required 
              placeholder="Ej: Revisión de expediente 2024..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-inner" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                <Calendar size={14} className="text-blue-500" /> Fecha Programada
              </label>
              <input 
                type="date" 
                name="fecha" 
                required 
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-inner" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                <Clock size={14} className="text-blue-500" /> Hora
              </label>
              <input 
                type="time" 
                name="hora" 
                defaultValue="08:00"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-inner" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Descripción / Detalles</label>
            <textarea 
              name="descripcion" 
              required 
              className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all min-h-[120px] resize-none shadow-inner" 
              placeholder="Escriba los detalles de la tarea aquí..."
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full px-10 py-6 bg-[#012340] text-white rounded-2xl text-xs font-black uppercase tracking-[0.25em] hover:bg-[#012450] transition-all flex items-center justify-center gap-4 shadow-[0_15px_40px_rgba(1,35,64,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />}
              {isPending ? "GUARDANDO..." : "GUARDAR TAREA"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

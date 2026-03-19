"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Search, ArrowRight, Printer, Clock } from "lucide-react";
import Link from "next/link";

export default function AgendaByDate() {
  const [date1, setDate1] = useState("2023-01-01");
  const [date2, setDate2] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/dashboard/agenda?from=${date1}&to=${date2}`);
  };

  return (
    <div className="p-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl space-y-10 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="text-center space-y-4 relative z-10">
          <div className="mx-auto w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm transition-transform hover:rotate-6">
            <Calendar size={36} />
          </div>
          <h1 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter">Agenda por Fecha</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600/60 transition-all hover:tracking-[0.4em]">Filtro Cronológico de Pendientes</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2">
                <Clock size={12} className="text-blue-500/50" /> Desde la Fecha
              </label>
              <input 
                type="date" 
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all shadow-inner"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2">
                <Clock size={12} className="text-blue-500/50" /> Hasta la Fecha
              </label>
              <input 
                type="date" 
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#012340] hover:bg-[#012450] text-white font-black uppercase tracking-[0.25em] py-6 rounded-2xl transition-all shadow-[0_15px_30px_rgba(1,35,64,0.2)] flex items-center justify-center gap-4 group active:scale-[0.98]"
          >
            Consultar Agenda
            <ArrowRight size={22} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="pt-10 border-t border-slate-100 grid grid-cols-2 gap-6 relative z-10">
           <div className="text-center p-5 bg-slate-50/50 rounded-2xl border border-slate-100 opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex flex-col items-center">
             <Printer size={20} className="mb-3 text-slate-400" />
             <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Generar Reporte PDF</span>
           </div>
           <div className="text-center p-5 bg-slate-50/50 rounded-2xl border border-slate-100 opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex flex-col items-center">
             <Search size={20} className="mb-3 text-slate-400" />
             <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Vista Previa</span>
           </div>
        </div>
      </div>
    </div>
  );
}

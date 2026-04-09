"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Filter, X, ChevronDown, Search } from "lucide-react";

export default function ProcessFilters({ 
  initialFilters 
}: { 
  initialFilters: {
    q?: string;
    despacho?: string;
    clase?: string;
    estado?: string;
    jurisdiccion?: string;
    fecha_desde?: string;
    fecha_hasta?: string;
  } 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState(initialFilters);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set("page", "1"); // Reset to page 1 on filter
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters({});
    router.push(pathname);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${
          isOpen || Object.values(initialFilters).some(v => v) 
          ? "bg-[#012340] text-[#C59D5F] border-[#012340]" 
          : "bg-white text-slate-400 border-slate-200 hover:border-[#012340] hover:text-[#012340]"
        }`}
      >
        <Filter size={14} />
        Filtros Avanzados
        <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-4 right-0 w-[400px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(1,35,64,0.2)] border border-slate-100 p-8 z-[100] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-[#012340] uppercase tracking-tighter text-lg italic">Refinar Búsqueda</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-red-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Despacho / Juzgado</label>
              <input 
                type="text" 
                value={filters.despacho || ""} 
                onChange={(e) => setFilters({...filters, despacho: e.target.value})}
                placeholder="Ej: Juzgado 5 Laboral"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#C59D5F] outline-none"
              />
            </div>

            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Clase de Proceso</label>
              <input 
                type="text" 
                value={filters.clase || ""} 
                onChange={(e) => setFilters({...filters, clase: e.target.value})}
                placeholder="Ej: Ordinario, Ejecutivo"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#C59D5F] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Estado</label>
                <select 
                  value={filters.estado || ""} 
                  onChange={(e) => setFilters({...filters, estado: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#C59D5F] outline-none"
                >
                  <option value="">TODOS</option>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                  <option value="TERMINADO">TERMINADO</option>
                  <option value="SENTENCIA">SENTENCIA</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Jurisdicción</label>
                <input 
                  type="text" 
                  value={filters.jurisdiccion || ""} 
                  onChange={(e) => setFilters({...filters, jurisdiccion: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#C59D5F] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Desde (Fecha)</label>
                <input 
                  type="date" 
                  value={filters.fecha_desde || ""} 
                  onChange={(e) => setFilters({...filters, fecha_desde: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#C59D5F] outline-none"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Hasta (Fecha)</label>
                <input 
                  type="date" 
                  value={filters.fecha_hasta || ""} 
                  onChange={(e) => setFilters({...filters, fecha_hasta: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#C59D5F] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button 
              onClick={handleReset}
              className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
            >
              Limpiar
            </button>
            <button 
              onClick={handleApply}
              className="flex-[2] py-4 bg-[#012340] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#C59D5F] transition-all shadow-lg"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

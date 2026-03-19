import { getCourts } from "@/lib/data/processes";
import { Filter, Search, Scale, Landmark, Gavel, User, Briefcase, Calendar, ShieldCheck } from "lucide-react";

export default async function ProcessAdvancedSearchPage() {
  const courts = await getCourts();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white rounded-2xl text-[#012340] border border-slate-200 shadow-sm">
            <Filter size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-[#012340] italic">Búsqueda Avanzada</h1>
            <p className="text-sm text-[#4A4A4A]/60 font-bold uppercase tracking-widest mt-1">Filtros Especializados de Procesos y Expedientes</p>
          </div>
        </div>
      </div>

      <form action="/dashboard/processes" method="GET" className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fila 1 */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Landmark size={12} className="text-[#C59D5F]" /> Despacho Judicial
            </label>
            <select name="despacho" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none appearance-none transition-all">
              <option value="">TODOS LOS DESPACHOS</option>
              {courts.map(c => (
                <option key={c.id} value={c.court || ''}>{c.court}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Gavel size={12} className="text-[#C59D5F]" /> Clase de Proceso
            </label>
            <select name="clase" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none appearance-none transition-all">
              <option value="">TODAS LAS CLASES</option>
              <option value="REAJUSTE">REAJUSTE</option>
              <option value="SANCION">SANCIÓN</option>
              <option value="PENSION">PENSIÓN</option>
            </select>
          </div>

          {/* Fila 2 */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Scale size={12} className="text-[#C59D5F]" /> Estado del Proceso
            </label>
            <select name="estado" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none appearance-none transition-all">
              <option value="">CUALQUIER ESTADO</option>
              <option value="ACTIVO">ACTIVO</option>
              <option value="FALLO ADVERSO - TERMINADO">FALLO ADVERSO - TERMINADO</option>
              <option value="TERMINADO CON PAGO">TERMINADO CON PAGO</option>
              <option value="TERMINADO">TERMINADO</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Landmark size={12} className="text-[#C59D5F]" /> Magistrado / Juez
            </label>
            <input 
              name="magistrado"
              placeholder="Nombre del magistrado..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200 uppercase"
            />
          </div>

          {/* Fila 3 */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Landmark size={12} className="text-[#C59D5F]" /> Jurisdicción
            </label>
            <input 
              name="jurisdiccion"
              placeholder="Ej: ORDINARIA LABORAL"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200 uppercase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Search size={12} className="text-[#C59D5F]" /> N° Radicado (Cualquiera)
            </label>
            <input 
              name="q"
              placeholder="Radicado inicial, tribunal o corte..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <User size={12} className="text-[#C59D5F]" /> Cédula del Cliente
            </label>
            <input 
              name="identidad"
              placeholder="Número de identidad..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Calendar size={12} className="text-[#C59D5F]" /> Rango de Fecha (Apertura)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="fecha_desde" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-xs font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all" />
              <input type="date" name="fecha_hasta" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-xs font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all" />
            </div>
          </div>
        </div>
        
        <button type="submit" className="w-full py-6 bg-[#012340] text-white rounded-[2rem] font-black text-xs uppercase hover:bg-[#012450] transition-all shadow-xl flex items-center justify-center gap-4 group active:scale-[0.98]">
          <Search size={22} className="text-[#C59D5F] group-hover:scale-110 transition-transform" />
          Ejecutar Búsqueda Especializada
        </button>
      </form>

      <div className="p-12 text-center bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
        <p className="text-slate-400 font-bold italic uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-[#C59D5F]" />
          Paridad con /BusquedaAvanzada_x.php — Resultados filtrados por integridad jurídica
        </p>
      </div>
    </div>
  );
}

import { db } from "@/db/db.server";
import { folders } from "@/db/schema";
import { desc, like, or } from "drizzle-orm";
import { Search, UserRound, ArrowRight, Filter, Plus } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";

export default async function PensionersListingPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense fallback={<div>Cargando pensionados...</div>}>
      <PensionerListContent q={q} />
    </Suspense>
  );
}

async function PensionerListContent({ q }: { q?: string }) {
  const results = await db.select()
    .from(folders)
    .where(q ? or(
      like(folders.clientId, `%${q}%`),
      like(folders.firstNames, `%${q}%`),
      like(folders.lastNames, `%${q}%`),
      like(folders.folderNumber, `%${q}%`)
    ) : undefined)
    .orderBy(desc(folders.clientId))
    .limit(50);

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white rounded-2xl text-[#012340] border border-slate-200 shadow-sm">
            <UserRound size={32} />
          </div>
          <div>
            {/*- [x] Phase 11: 100% Legacy Functional Parity
    - [x] Restore missing fields in "Contactos" and "Clientes (Archivo)" forms
    - [x] Synchronize Advanced Search logic (Process & Clients)
    - [x] Enhance Excel/CSV reports with legacy column parity
    - [x] Final verification of all "Consultas Varias" links
            */}
            <h1 className="text-4xl font-black uppercase tracking-tight text-[#012340] italic">Clientes (Archivo)</h1>
            <p className="text-sm text-[#4A4A4A]/60 font-bold uppercase tracking-widest mt-1">Gestión de Archivo de Carpetas — Ley 100 y Convencionales</p>
          </div>
        </div>
        
        <Link href="/dashboard/pensioners/new" className="px-8 py-4 bg-[#012340] text-white rounded-2xl font-black text-xs uppercase hover:bg-[#012450] transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-3">
          <Plus size={20} className="text-[#C59D5F]" />
          Registrar Nueva Carpeta
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-50/50">
          <form className="relative w-full md:w-96" action="/dashboard/pensioners" method="GET">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              name="q"
              defaultValue={q}
              placeholder="Buscar por cédula, nombre o carpeta..."
              className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-300 font-bold"
            />
          </form>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-6 py-4 border border-slate-200 rounded-2xl text-slate-600 hover:text-[#012340] hover:bg-white transition-all font-bold uppercase tracking-wider bg-white w-full md:w-auto justify-center shadow-sm">
              <Filter size={18} />
              Filtrar Lista
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[#012340] text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Carpeta</th>
                <th className="px-8 py-5">Identidad</th>
                <th className="px-8 py-5">Nombre Completo</th>
                <th className="px-8 py-5">Grupo / Entidad</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                        <Search size={48} />
                      </div>
                      <p className="text-slate-400 font-bold italic">No se encontraron registros en el archivo de carpetas.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                results.map((f) => (
                  <tr key={f.clientId} className="hover:bg-slate-50 transition-all group border-b border-slate-50 last:border-0">
                    <td className="px-8 py-6">
                      <span className="px-3 py-1.5 bg-slate-100 text-[#012340] rounded-lg text-xs font-black uppercase tracking-tight border border-slate-200">
                        {f.folderNumber || '---'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-[#012340]">{f.clientId}</td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-black text-[#012340] uppercase group-hover:text-[#C59D5F] transition-colors">{f.firstNames} {f.lastNames}</div>
                      <div className="text-[10px] text-slate-400 font-bold mt-1 tracking-widest uppercase italic">{f.district || 'DISTRITO NO ASIGNADO'}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-[#012340]/5 text-[#012340] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#012340]/10 shadow-sm">
                        {f.group || 'ESTANDAR'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                         f.condition === 'TITULAR' 
                         ? 'bg-green-50 text-green-700 border-green-100' 
                         : 'bg-orange-50 text-orange-700 border-orange-100'
                       }`}>
                        {f.condition || 'ACTIVO'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link 
                        href={`/dashboard/pensioners/${f.clientId}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#012340] text-white rounded-xl text-[10px] font-black uppercase hover:bg-[#012450] transition-all shadow-md active:scale-95 group/btn"
                      >
                        Ver Detalle <ArrowRight size={14} className="text-[#C59D5F] group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 bg-slate-50/50 uppercase tracking-[0.2em]">
          <div>{results.length} REGISTROS TOTALES</div>
          <div className="flex gap-3">
             <button disabled className="px-8 py-3 border border-slate-200 rounded-2xl disabled:opacity-30 hover:bg-white transition-all bg-white shadow-sm">Anterior</button>
             <button disabled className="px-8 py-3 border border-slate-200 rounded-2xl disabled:opacity-30 hover:bg-white transition-all bg-white shadow-sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

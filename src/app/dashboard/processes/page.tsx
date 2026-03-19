import { getProcesses } from "@/lib/data/processes";
import { Search, Plus, MoreHorizontal, Scale, Gavel, User, LayoutGrid, List as ListIcon, ChevronRight, ShieldCheck, Briefcase, Landmark } from "lucide-react";
import Link from "next/link";

export default async function ProcessesPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    q?: string; 
    page?: string;
    despacho?: string;
    clase?: string;
    estado?: string;
    magistrado?: string;
    identidad?: string;
    negocio?: string;
    jurisdiccion?: string;
  }>;
}) {
  const { q, page, ...filters } = await searchParams;
  const currentPage = Number(page) || 1;
  const list = await getProcesses(q, currentPage, filters);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white rounded-2xl text-[#012340] border border-slate-200 shadow-sm">
            <Scale size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-[#012340] italic">Gestión de Procesos</h1>
            <p className="text-sm text-[#4A4A4A]/60 font-bold uppercase tracking-widest mt-1">Control Estratégico de Expedientes Jurídicos</p>
          </div>
        </div>
        <Link 
          href="/dashboard/processes/new"
          className="group flex items-center gap-3 px-8 py-4 bg-[#012340] text-white rounded-2xl hover:bg-[#012450] transition-all shadow-lg hover:scale-105 active:scale-95 font-black uppercase tracking-wider text-xs"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform text-[#C59D5F]" />
          Registrar Proceso
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-50/50">
          <form className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              name="q"
              defaultValue={q}
              placeholder="Radicado, carpeta o demandante..."
              className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-300 font-bold"
            />
          </form>
          <div className="flex items-center gap-3 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <button className="px-5 py-2.5 bg-[#012340] text-white rounded-xl shadow-md flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <ListIcon size={14} /> Lista
            </button>
            <button className="px-5 py-2.5 text-slate-400 hover:text-[#012340] transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 rounded-xl">
              <LayoutGrid size={14} /> Cuadrícula
            </button>
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[#012340] text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Expediente</th>
                <th className="px-8 py-5">Sujeto / Cliente</th>
                <th className="px-8 py-5">Radicado / Despacho</th>
                <th className="px-6 py-5">Tipo / Negocio</th>
                <th className="px-6 py-5">Estado Actual</th>
                <th className="px-8 py-5 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                        <Gavel size={48} />
                      </div>
                      <p className="text-slate-400 font-bold italic">No se encontraron expedientes registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                list.map((process: any) => (
                  <tr key={process.id} className="hover:bg-slate-50 transition-all group border-b border-slate-50 last:border-0">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-[#012340] mb-1">#{process.folderNumber}</span>
                        <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase italic">Carpeta: {process.folderNumber2 || '---'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-black text-[#012340] uppercase group-hover:text-[#C59D5F] transition-colors line-clamp-1">
                        {process.clientName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold mt-1 tracking-widest uppercase flex items-center gap-1.5">
                        <User size={10} className="text-[#C59D5F]" /> {process.clientId}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-black text-[#012340] bg-slate-100 px-3 py-1 rounded-lg w-fit border border-slate-200">
                          {process.radicadoIni || 'SIN RADICADO'}
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-[#4A4A4A] font-bold uppercase truncate max-w-[220px]">
                          <Landmark size={10} className="text-[#C59D5F] shrink-0" />
                          {process.court}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-[#012340] uppercase tracking-tighter flex items-center gap-1.5">
                          <Briefcase size={10} className="text-[#C59D5F]" />
                          {process.businessLine || 'PROCESO'}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase italic">
                          {process.processClass}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                        process.status === 'TERMINADO' ? 'bg-red-50 text-red-500 border-red-100' : 
                        process.status === 'ACTIVO' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        'bg-slate-50 text-slate-400 border-slate-200'
                      }`}>
                        {process.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link 
                        href={`/dashboard/processes/${process.id}`}
                        className="inline-flex p-3 text-slate-300 hover:text-[#012340] hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm group-hover:shadow-md active:scale-90"
                      >
                        <ChevronRight size={20} />
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
          <div>{list.length} EXPEDIENTES EN EL SISTEMA</div>
          <div className="flex gap-3">
            <button disabled className="px-8 py-3 border border-slate-200 rounded-2xl disabled:opacity-30 hover:bg-white transition-all bg-white shadow-sm">Anterior</button>
            <button disabled className="px-8 py-3 border border-slate-200 rounded-2xl disabled:opacity-30 hover:bg-white transition-all bg-white shadow-sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getLawyers } from "@/lib/data/lawyers";
import { Users, Search, Plus, Filter, MoreHorizontal, Scale, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default async function LawyersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const lawyers = await getLawyers(q, currentPage);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white rounded-2xl text-[#012340] border border-slate-200 shadow-sm">
            <Scale size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-[#012340] italic">Gestión de Abogados</h1>
            <p className="text-sm text-[#4A4A4A]/60 font-bold uppercase tracking-widest mt-1">Directorio de Apoderados y Profesionales</p>
          </div>
        </div>
        <Link 
          href="/dashboard/lawyers/new"
          className="group flex items-center gap-3 px-8 py-4 bg-[#012340] text-white rounded-2xl hover:bg-[#012450] transition-all shadow-lg hover:scale-105 active:scale-95 font-black uppercase tracking-wider text-xs"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform text-[#C59D5F]" />
          Nuevo Abogado
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
              placeholder="Nombre, identidad o tarjeta..."
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

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[#012340] text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Identificación</th>
                <th className="px-8 py-5">Abogado / Apoderado</th>
                <th className="px-8 py-5">Tarjeta Prof.</th>
                <th className="px-8 py-5">Contacto</th>
                <th className="px-8 py-5">Ubicación</th>
                <th className="px-8 py-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lawyers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                        <Scale size={48} />
                      </div>
                      <p className="text-slate-400 font-bold italic">No se encontraron abogados registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                lawyers.map((lawyer) => (
                  <tr key={lawyer.id} className="hover:bg-slate-50 transition-all group border-b border-slate-50 last:border-0">
                    <td className="px-8 py-6 text-sm font-black text-[#012340]">{lawyer.id}</td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-black text-[#012340] uppercase group-hover:text-[#C59D5F] transition-colors">
                        {lawyer.firstNames} {lawyer.lastNames}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold mt-1 tracking-widest uppercase italic">
                        {lawyer.email || 'SIN CORREO'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1.5 bg-slate-100 text-[#012340] rounded-lg text-[10px] font-black uppercase tracking-tight border border-slate-200">
                        TP: {lawyer.barCard || '---'}
                      </span>
                    </td>
                    <td className="px-8 py-6 space-y-1">
                      {lawyer.phone1 && (
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[#4A4A4A]">
                          <Phone size={10} className="text-[#C59D5F]" />
                          {lawyer.phone1}
                        </div>
                      )}
                      {lawyer.email && (
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[#4A4A4A]">
                          <Mail size={10} className="text-[#C59D5F]" />
                          {lawyer.email}
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs text-slate-600 uppercase font-black tracking-tight">
                        <MapPin size={12} className="text-[#C59D5F]" />
                        {lawyer.cityRes || 'S/D'}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-3 text-slate-300 hover:text-[#012340] hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 bg-slate-50/50 uppercase tracking-[0.2em]">
          <div>{lawyers.length} ABOGADOS ENCONTRADOS</div>
          <div className="flex gap-3">
            <button disabled className="px-8 py-3 border border-slate-200 rounded-2xl disabled:opacity-30 hover:bg-white transition-all bg-white shadow-sm">Anterior</button>
            <button disabled className="px-8 py-3 border border-slate-200 rounded-2xl disabled:opacity-30 hover:bg-white transition-all bg-white shadow-sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

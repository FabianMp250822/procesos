import { getClients } from "@/lib/data/clients";
import { Users, Search, Plus, Filter, MoreHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactActionMenu } from "@/components/clients/action-menu";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const clients = await getClients(q, currentPage);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white rounded-2xl text-[#012340] border border-slate-200 shadow-sm">
            <Users size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-[#012340] italic">Gestión de Contactos</h1>
            <p className="text-sm text-[#4A4A4A]/60 font-bold uppercase tracking-widest mt-1">Administración Central de Contactos Pensionales</p>
          </div>
        </div>
        <Link 
          href="/dashboard/clients/new"
          className="group flex items-center gap-3 px-8 py-4 bg-[#012340] text-white rounded-2xl hover:bg-[#012450] transition-all shadow-lg hover:scale-105 active:scale-95 font-black uppercase tracking-wider text-xs"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform text-[#C59D5F]" />
          Nuevo Contacto
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
              placeholder="Nombre, cédula o carpeta..."
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[#012340] text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Carpeta</th>
                <th className="px-8 py-5">Identificación</th>
                <th className="px-8 py-5">Nombre Completo</th>
                <th className="px-8 py-5">Ciudad / Sede</th>
                <th className="px-8 py-5">Grupo</th>
                <th className="px-8 py-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                        <Search size={48} />
                      </div>
                      <p className="text-slate-400 font-bold italic">No se encontraron contactos registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-all group border-b border-slate-50 last:border-0">
                    <td className="px-8 py-6">
                      <span className="px-3 py-1.5 bg-slate-100 text-[#012340] rounded-lg text-xs font-black uppercase tracking-tight border border-slate-200">
                        {client.folderNumber || '---'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-[#012340]">{client.id}</td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-black text-[#012340] uppercase group-hover:text-[#C59D5F] transition-colors">{client.firstNames} {client.lastNames}</div>
                      <div className="text-[10px] text-slate-400 font-bold mt-1 tracking-widest uppercase italic">{client.email || 'SIN CORREO REGISTRADO'}</div>
                    </td>
                    <td className="px-8 py-6 text-xs text-slate-600 uppercase font-black tracking-tight">
                      {client.cityRes || 'S/D'}
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-[#012340]/5 text-[#012340] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#012340]/10 shadow-sm">
                        {client.group || 'GENERAL'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <ContactActionMenu clientId={client.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="p-8 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 bg-slate-50/50 uppercase tracking-[0.2em]">
          <div>{clients.length} CONTACTOS ENCONTRADOS</div>
          <div className="flex gap-3">
            <button disabled className="px-8 py-3 border border-slate-200 rounded-2xl disabled:opacity-30 hover:bg-white transition-all bg-white shadow-sm">Anterior</button>
            <button disabled className="px-8 py-3 border border-slate-200 rounded-2xl disabled:opacity-30 hover:bg-white transition-all bg-white shadow-sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

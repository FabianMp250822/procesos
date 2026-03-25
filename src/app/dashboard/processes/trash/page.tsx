import { getDeletedProcesses } from "@/lib/data/processes";
import { Trash2, ArrowLeft, Gavel, Scale, User, Landmark } from "lucide-react";
import Link from "next/link";
import RestoreProcessButton from "@/components/processes/RestoreProcessButton";

export default async function TrashPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data: list, totalPages } = await getDeletedProcesses(currentPage);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-red-50 rounded-2xl text-red-600 border border-red-100 shadow-sm">
            <Trash2 size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-slate-800 italic">Papelera de Reciclaje</h1>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Recuperación de Procesos Eliminados</p>
          </div>
        </div>
        <Link 
          href="/dashboard/processes"
          className="flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all font-black uppercase tracking-wider text-xs"
        >
          <ArrowLeft size={20} />
          Volver a Procesos
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Expediente Eliminado</th>
                <th className="px-8 py-5">Sujeto / Cliente</th>
                <th className="px-8 py-5">Radicado / Despacho</th>
                <th className="px-8 py-5 text-right">Restaurar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                        <Trash2 size={48} />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">La papelera está vacía</p>
                    </div>
                  </td>
                </tr>
              ) : (
                list.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                          <Scale size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Carpeta {item.folderNumber}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <User size={16} className="text-slate-400" />
                        <div>
                          <p className="text-xs font-extrabold text-[#012340] uppercase tracking-tight">{item.clientName}</p>
                          <p className="text-[10px] font-medium text-slate-400">CC {item.clientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Gavel size={14} className="text-slate-400" />
                          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Rad: {item.radicadoIni}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Landmark size={14} className="text-slate-400" />
                          <p className="text-[9px] font-medium text-slate-400 uppercase truncate max-w-[200px]">{item.court}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <RestoreProcessButton id={item.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

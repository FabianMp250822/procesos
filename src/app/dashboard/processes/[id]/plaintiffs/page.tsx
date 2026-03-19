import { getProcessDetails } from "@/lib/data/processes";
import { Users, ChevronLeft, Gavel, UserPlus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Plaintiff {
  id: string;
  firstNames: string;
  powerOfAttorney: string | null;
}

export default async function PlaintiffsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processId = parseInt(id);
  const data = await getProcessDetails(processId);

  if (!data) notFound();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href={`/dashboard/processes/${id}`}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors text-xs font-bold uppercase tracking-widest mb-4 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver al Proceso
          </Link>
          <div className="flex items-center gap-4">
             <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg">
                <Users size={24} />
             </div>
             <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Demandantes del Proceso</h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                  Radicado: <span className="text-blue-400 font-mono italic">{data.radicadoIni || 'SIN RADICADO'}</span>
                </p>
             </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-bold uppercase tracking-wider text-xs">
          <UserPlus size={16} />
          Vincular Demandante
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Principal Plaintiff */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <section className="bg-blue-600/10 border-2 border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Gavel size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Demandante Principal (Titular)</p>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">{data.clientName}</h2>
                <p className="text-lg font-mono text-slate-400">C.C. {data.clientId}</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/10">
                    <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Carpeta</p>
                    <p className="text-sm font-bold text-white">{data.folderNumber}</p>
                 </div>
                 <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/10">
                    <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Estado</p>
                    <p className="text-sm font-bold text-blue-400">{data.status}</p>
                 </div>
              </div>
            </div>
          </section>
        </div>

        {/* Additional Plaintiffs */}
        {data.plaintiffs.map((p: Plaintiff, idx: number) => (
          <div key={idx} className="bg-slate-900 rounded-3xl border border-white/5 p-6 hover:border-blue-500/30 transition-all group shadow-xl">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black text-xs">
                   {idx + 1}
                </div>
                <div className="flex-1">
                   <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Cédula</p>
                   <p className="text-xs font-mono text-white font-bold">{p.id}</p>
                </div>
             </div>
             <h3 className="text-sm font-bold text-white uppercase leading-tight mb-4 min-h-[2.5rem]">{p.firstNames}</h3>
             
             <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Poder: <span className="text-blue-400">{p.powerOfAttorney || 'NO'}</span></span>
                <div className="flex items-center gap-2">
                   <button className="p-2 text-slate-500 hover:text-white transition-colors"><ChevronLeft size={16} /></button>
                </div>
             </div>
          </div>
        ))}

        {data.plaintiffs.length === 0 && (
          <div className="col-span-full py-20 bg-slate-900/50 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 opacity-50">
             <Users size={32} className="text-slate-500" />
             <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">No hay demandantes adicionales vinculados</p>
          </div>
        )}
      </div>
    </div>
  );
}

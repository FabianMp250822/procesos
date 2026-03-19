import { getDashboardStats } from "@/lib/data/dashboard";
import {
  Users,
  Scale,
  Clock,
  TrendingUp,
  Plus,
  ChevronRight,
  Activity,
  AlertCircle,
  FileText,
  Search,
  PlusCircle,
  Calendar,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-200">
        <div>
          <h1 className="text-5xl font-black text-[#012340] tracking-tighter uppercase italic">Panel Central</h1>
          <p className="text-[#4A4A4A]/60 mt-3 font-medium tracking-wide flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#C59D5F]" />
            Ecosistema Legal Digital Dajusticia • Edición Titanium
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Link href="/dashboard/search" className="p-4 bg-[#012340]/5 text-[#012340] rounded-2xl hover:bg-[#012340] hover:text-white transition-all border border-[#012340]/10 shadow-sm">
             <Search size={22} />
           </Link>
           <Link href="/dashboard/processes/new" className="px-8 py-4 bg-[#C59D5F] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(197,157,95,0.4)] hover:shadow-[0_15px_40px_rgba(197,157,95,0.6)] hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-4">
             <PlusCircle size={20} />
             Nuevo Expediente
           </Link>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Clientes Totales" 
          value={stats.totalClients} 
          icon={<Users className="text-[#012340]" />} 
          trend="+12% este mes"
          bgColor="bg-[#F8F9FA]"
        />
        <StatCard 
          title="Procesos Registrados" 
          value={stats.totalProcesses} 
          icon={<Scale className="text-[#C59D5F]" />} 
          trend="+5 nuevos hoy"
          bgColor="bg-[#F8F9FA]"
        />
        <StatCard 
          title="En Trámite" 
          value={stats.activeProcesses} 
          icon={<Clock className="text-[#012340]" />} 
          trend="Atención requerida"
          bgColor="bg-[#F8F9FA]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <section className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl">
          <div className="px-8 py-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <Activity size={20} className="text-[#012340]" />
              <h2 className="font-black text-xs uppercase tracking-[0.25em] text-[#012340]">Seguimiento Reciente</h2>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <div className="p-8">
            <div className="space-y-8">
              {stats.recentAnnotations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-200">
                  <AlertCircle size={64} className="mb-6 opacity-30" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Sin actualizaciónes hoy</p>
                </div>
              ) : (
                stats.recentAnnotations.map((note) => (
                  <div key={note.id} className="flex gap-8 group/item">
                    <div className="relative">
                      <div className="h-full w-px bg-slate-100 absolute left-1/2 -translate-x-1/2 top-4"></div>
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 text-[#012340]/40 flex items-center justify-center relative z-10 group-hover/item:bg-[#012340] group-hover/item:text-white group-hover/item:border-[#012340] transition-all shadow-sm">
                        <FileText size={18} />
                      </div>
                    </div>
                    <div className="pb-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black text-[#C59D5F] bg-[#C59D5F]/10 px-3 py-1 rounded-lg border border-[#C59D5F]/20">{note.date}</span>
                      </div>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed font-bold group-hover/item:text-[#012340] transition-colors capitalize">
                        &quot;{note.annotation?.toLowerCase() || ""}&quot;
                      </p>
                      <Link href={`/dashboard/processes/${note.processId}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C59D5F] mt-5 inline-flex items-center gap-2 hover:translate-x-1 transition-all">
                        Consultar Proceso <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Quick Access / Shortcuts */}
        <section className="space-y-8">
          <div className="bg-[#012340] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#C59D5F]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#C59D5F]/20 transition-all duration-700"></div>
             <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4 italic uppercase tracking-tighter">Estado Operativo</h3>
                <p className="text-white/50 text-sm mb-8 leading-relaxed font-medium">
                  Sincronización con el sistema legacy al 100%. Los servicios de almacenamiento R2 y backup están operando bajo protocolos de seguridad activa.
                </p>
                <div className="flex gap-4">
                   <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                      <p className="text-[10px] font-black text-[#C59D5F] uppercase tracking-widest mb-2">Seguridad</p>
                       <div className="text-xs font-black text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Protegido
                       </div>
                   </div>
                   <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                      <p className="text-[10px] font-black text-[#C59D5F] uppercase tracking-widest mb-2">Infraestructura</p>
                       <div className="text-xs font-black text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> En Línea
                       </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <ShortcutCard href="/dashboard/pensioners/new" title="Nuevo Cliente" description="Registro de expediente" />
             <ShortcutCard href="/dashboard/processes/new" title="Nuevo Proceso" description="Apertura de caso" />
          </div>
        </section>
      </div>
    </div>
  );
}

  function StatCard({ title, value, icon, trend, bgColor }: { title: string, value: number, icon: React.ReactNode, trend: string, bgColor: string }) {
    return (
      <div className="bg-white rounded-[2.5rem] p-10 group hover:translate-y-[-4px] transition-all duration-500 relative overflow-hidden border border-slate-100 shadow-xl">
        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">{title}</p>
            <h3 className="text-5xl font-black text-[#012340] tracking-tighter">{value.toLocaleString()}</h3>
            <p className="text-[10px] font-black text-[#C59D5F] mt-4 uppercase tracking-[0.2em]">{trend}</p>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-[#F8F9FA] border border-slate-100 flex items-center justify-center group-hover:bg-[#012340] group-hover:text-[#C59D5F] transition-all duration-500 shadow-inner">
            {icon}
          </div>
        </div>
      </div>
    );
  }

function ShortcutCard({ href, title, description }: { href: string; title: string; description: string }) {
   return (
      <Link href={href} className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:border-[#C59D5F]/50 hover:shadow-2xl transition-all group flex flex-col justify-end min-h-[140px] relative overflow-hidden">
         <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 group-hover:text-[#C59D5F] transition-all">
            <PlusCircle size={24} />
         </div>
         <p className="font-black text-[#012340] text-lg uppercase tracking-tight leading-tight">{title}</p>
         <p className="text-xs text-[#012340]/40 mt-1 font-medium uppercase tracking-widest">{description}</p>
      </Link>
   );
}

import { getDashboardStats } from "@/lib/data/dashboard";
import { ExportButton } from "@/components/reports/export-button";
import { exportProcesos, exportDemandantes, exportInvDoc } from "@/lib/actions/reports";
import { 
  FileSpreadsheet, 
  Users, 
  Scale, 
  Clock, 
  TrendingUp, 
  PieChart, 
  BarChart3,
  ShieldCheck,
  ChevronRight,
  ClipboardList
} from "lucide-react";
import Link from "next/link";

export default async function ReportsDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <h1 className="text-5xl font-black text-[#012340] tracking-tighter uppercase italic">Dashboard Administrativo</h1>
          <p className="text-[#4A4A4A]/60 mt-2 font-medium tracking-wide flex items-center gap-2">
            <ClipboardList size={16} className="text-[#C59D5F]" />
            Control Integral de Gestión y Reportes de Auditoría
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#012340] text-white px-6 py-3 rounded-2xl shadow-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest">Sistema Operativo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportMetricCard 
          label="Expedientes Activos" 
          value={stats.activeProcesses} 
          icon={<Scale className="text-[#C59D5F]" />} 
          description="En trámite judicial activo"
        />
        <ReportMetricCard 
          label="Total Clientes" 
          value={stats.totalClients} 
          icon={<Users className="text-[#012340]" />} 
          description="Base de datos consolidada"
        />
        <ReportMetricCard 
          label="Anotaciones Recientes" 
          value={stats.recentAnnotations.length} 
          icon={<Clock className="text-[#012340]" />} 
          description="Actualizaciones en las últimas 24h"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* EXPORT SECTION */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:text-[#C59D5F] transition-all">
              <FileSpreadsheet size={64} />
            </div>
            <h2 className="text-2xl font-black text-[#012340] uppercase tracking-tighter italic mb-6">Generador de Reportes</h2>
            <div className="space-y-4">
              <div className="p-2 border border-slate-100 rounded-2xl hover:border-[#C59D5F]/40 transition-all bg-slate-50/50">
                <ExportButton label="REPORTE GENERAL DE PROCESOS (XLSX)" action={exportProcesos} />
              </div>
              <div className="p-2 border border-slate-100 rounded-2xl hover:border-[#C59D5F]/40 transition-all bg-slate-50/50">
                <ExportButton label="LISTADO DE CLIENTES / DEMANDANTES (XLSX)" action={exportDemandantes} />
              </div>
              <div className="p-2 border border-slate-100 rounded-2xl hover:border-[#C59D5F]/40 transition-all bg-slate-50/50">
                <ExportButton label="INVENTARIO DOCUMENTAL (XLSX)" action={exportInvDoc} />
              </div>
            </div>
            <p className="mt-8 text-[10px] text-slate-400 font-medium uppercase tracking-widest text-center leading-relaxed">
              * Los reportes en Excel (.xlsx) contienen el nivel de detalle estandarizado para auditorías.
            </p>
          </div>
        </div>

        {/* ANALYTICS PREVIEW */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-[#012340] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C59D5F]/5 blur-[80px] rounded-full"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-20 h-20 bg-[#C59D5F] rounded-3xl flex items-center justify-center text-[#012340]">
                  <BarChart3 size={40} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Trazabilidad Total</h3>
                  <p className="text-white/50 text-sm font-medium leading-relaxed max-w-md">
                    El sistema PROMETHEO garantiza la integridad documental y el seguimiento real de cada actuación. Utilice los filtros avanzados en la sección de procesos para reportes granulares.
                  </p>
                </div>
                <Link href="/dashboard/processes" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                  Ver Procesos
                </Link>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl">
                 <div className="flex items-center gap-3 mb-6">
                    <PieChart size={18} className="text-[#C59D5F]" />
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-[#012340]">Estado de Carga</h4>
                 </div>
                 <div className="flex items-end gap-3 justify-between">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                    </div>
                    <span className="text-xs font-black text-[#012340]">85%</span>
                 </div>
                 <p className="text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Información sincronizada satisfactoriamente</p>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp size={18} className="text-[#C59D5F]" />
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-[#012340]">Integridad</h4>
                 </div>
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={28} className="text-blue-500" />
                    <div>
                      <p className="text-xs font-black text-[#012340]">Protocolo SSL/TLS Activo</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Protección de Datos Nivel 4</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ReportMetricCard({ label, value, icon, description }: { label: string, value: number, icon: React.ReactNode, description: string }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        <ChevronRight size={16} className="text-slate-300" />
      </div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <h4 className="text-4xl font-black text-[#012340] tracking-tighter mb-2">{value.toLocaleString()}</h4>
      <p className="text-[10px] text-[#4A4A4A] font-medium opacity-60 leading-relaxed">{description}</p>
    </div>
  );
}

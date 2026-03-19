import { getTasks, updateTaskStatus } from "@/lib/actions/tasks";
import { CalendarDays, Clock, CheckCircle2, Circle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AgendaResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;
  const tasksList = await getTasks(from, to);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/agenda/by-date"
            className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-800">Resultados de Agenda</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/60 mt-1">
              Filtro: {from ? `Desde ${from}` : "Inicio"} {to ? `Hasta ${to}` : "Actualidad"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasksList.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasksList.length === 0 && (
          <div className="col-span-full text-center py-32 bg-slate-50 border-2 border-dashed border-slate-100 rounded-[3rem]">
            <div className="mx-auto w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 shadow-sm mb-6">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Sin resultados</h3>
            <p className="text-xs text-slate-400 font-bold mt-2">No hay tareas programadas para el rango seleccionado</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: any }) {
  const isPending = task.status === "PENDIENTE";
  
  return (
    <div className={`bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm transition-all hover:shadow-xl hover:border-blue-100 group ${!isPending ? 'bg-slate-50/50' : ''}`}>
      <div className="flex items-start justify-between mb-6">
        <div className={`p-3 rounded-2xl transition-all ${isPending ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-emerald-50 text-emerald-600'}`}>
          {isPending ? <Circle size={20} /> : <CheckCircle2 size={20} />}
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <CalendarDays size={12} className="text-blue-500/50" /> {task.date || '---'}
          </div>
          <div className="flex items-center justify-end gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
            <Clock size={12} className="text-blue-500/50" /> {task.hour || '---'}
          </div>
        </div>
      </div>
      
      <h3 className="text-base font-black uppercase tracking-tight text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{task.title}</h3>
      <p className="text-[11px] text-slate-500 font-bold leading-relaxed line-clamp-3 mb-8">{task.description}</p>
      
      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${isPending ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {task.status}
        </span>
        <form action={async () => {
          "use server";
          await updateTaskStatus(task.id, isPending ? "COMPLETADO" : "PENDIENTE");
        }}>
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
            Marcar como {isPending ? 'completada' : 'pendiente'}
          </button>
        </form>
      </div>
    </div>
  );
}

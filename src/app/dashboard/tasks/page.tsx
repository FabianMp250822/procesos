import { getTasks, updateTaskStatus } from "@/lib/actions/tasks";
import { ListChecks, Clock, CheckCircle2, Circle, AlertCircle, Plus, Filter, Search } from "lucide-react";
import Link from "next/link";

export default async function TasksPage() {
  const tasksList = await getTasks();

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white rounded-2xl text-blue-600 border border-slate-200 shadow-sm transition-transform hover:scale-105">
            <ListChecks size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-slate-800 italic">Gestión de Tareas</h1>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Control de Actividades y Seguimiento (VerTareas.php)</p>
          </div>
        </div>
        
        <Link 
          href="/dashboard/tasks/new" 
          className="px-8 py-4 bg-[#012340] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#012450] transition-all shadow-[0_10px_20px_rgba(1,35,64,0.15)] flex items-center gap-3 active:scale-95"
        >
          <Plus size={18} className="text-blue-400" /> Nueva Tarea
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm flex items-center justify-between gap-8">
        <div className="flex-1 relative group">
          <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
          <input 
            placeholder="Buscar en tareas..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:bg-white transition-all flex items-center gap-2">
            <Filter size={14} /> Filtros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasksList.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasksList.length === 0 && (
          <div className="col-span-full text-center py-32 bg-slate-50 border-2 border-dashed border-slate-100 rounded-[3rem]">
            <div className="mx-auto w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 shadow-sm mb-6">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Sin tareas</h3>
            <p className="text-xs text-slate-400 font-bold mt-2">No hay actividades registradas en el sistema</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface Task {
  id: number;
  title: string | null;
  description: string | null;
  date: string | null;
  hour: string | null;
  status: string | null;
}

function TaskCard({ task }: { task: Task }) {
  const isPending = task.status === "PENDIENTE";
  
  return (
    <div className={`bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm transition-all hover:shadow-xl hover:border-blue-100 group ${!isPending ? 'bg-slate-50/40' : ''}`}>
      <div className="flex items-start justify-between mb-6">
        <div className={`p-3 rounded-2xl transition-all ${isPending ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-sm shadow-blue-500/10' : 'bg-emerald-50 text-emerald-600'}`}>
          {isPending ? <Circle size={20} /> : <CheckCircle2 size={20} />}
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Clock size={12} className="text-blue-500/40" /> {task.date || '---'}
          </div>
          <div className="flex items-center justify-end gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
            <span className="w-1 h-1 rounded-full bg-blue-500/20"></span> {task.hour || '---'}
          </div>
        </div>
      </div>
      
      <h3 className="text-base font-black uppercase tracking-tight text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{task.title}</h3>
      <p className="text-[11px] text-slate-500 font-bold leading-relaxed line-clamp-3 mb-8">{task.description}</p>
      
      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
        <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${isPending ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {task.status}
        </span>
        <form action={async () => {
          "use server";
          await updateTaskStatus(task.id, isPending ? "COMPLETADO" : "PENDIENTE");
        }}>
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-blue-600 transition-colors flex items-center gap-2 group/btn">
            {isPending ? "COMPLETAR" : "REABRIR"}
          </button>
        </form>
      </div>
    </div>
  );
}

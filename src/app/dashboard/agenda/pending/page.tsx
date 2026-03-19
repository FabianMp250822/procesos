import { getTasks, updateTaskStatus } from "@/lib/actions/tasks";
import { CalendarDays, Clock, CheckCircle2, Circle, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";

export default async function PendingAgendaPage() {
  const tasksList = await getTasks();

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent rounded-xl text-accent-foreground">
            <CalendarDays size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Agenda: Pendientes</h1>
            <p className="text-sm text-muted-foreground font-bold">Control de compromisos y plazos</p>
          </div>
        </div>
        
        <Link href="/dashboard/tasks/new" className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase hover:brightness-110 transition-all">
          <Plus size={14} className="inline mr-2" /> Nueva Tarea
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasksList.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasksList.length === 0 && (
          <div className="col-span-full text-center py-20 bg-card border border-dashed border-border rounded-3xl opacity-50">
            <AlertCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">No hay tareas pendientes en la agenda</p>
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
    <div className={`bg-card border border-border p-6 rounded-3xl shadow-xl transition-all hover:border-primary/30 ${!isPending ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${isPending ? 'bg-primary/10 text-primary' : 'bg-green-500/10 text-green-500'}`}>
          {isPending ? <Circle size={18} /> : <CheckCircle2 size={18} />}
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-[10px] font-black text-muted-foreground uppercase">
            <CalendarDays size={12} /> {task.date || '---'}
          </div>
          <div className="flex items-center justify-end gap-1 text-[10px] font-black text-muted-foreground uppercase">
            <Clock size={12} /> {task.hour || '---'}
          </div>
        </div>
      </div>
      
      <h3 className="text-sm font-black uppercase tracking-tight mb-2">{task.title}</h3>
      <p className="text-xs text-muted-foreground font-bold line-clamp-3 mb-6">{task.description}</p>
      
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${isPending ? 'bg-primary/10 text-primary' : 'bg-green-500/10 text-green-500'}`}>
          {task.status}
        </span>
        <form action={async () => {
          "use server";
          await updateTaskStatus(task.id, isPending ? "COMPLETADO" : "PENDIENTE");
        }}>
          <button className="text-[10px] font-black uppercase text-primary hover:underline">
            Marcar como {isPending ? 'completada' : 'pendiente'}
          </button>
        </form>
      </div>
    </div>
  );
}

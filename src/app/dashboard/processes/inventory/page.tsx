import { FileText, Search, ListChecks, Filter } from "lucide-react";

export default function ProcessInventoryPage() {
  const categories = [
    { label: "Activos", count: 0, color: "bg-green-500" },
    { label: "Procesados", count: 0, color: "bg-blue-500" },
    { label: "Cancelados / Terminados", count: 0, color: "bg-slate-500" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white rounded-2xl text-[#012340] border border-slate-200 shadow-sm">
            <FileText size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-[#012340] italic">Inventario de Procesos</h1>
            <p className="text-sm text-[#4A4A4A]/60 font-bold uppercase tracking-widest mt-1">Clasificación y Seguimiento de Expedientes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.label} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
            <div className={`w-3 h-3 rounded-full ${cat.color}`} />
            <h3 className="text-xs font-black uppercase tracking-widest text-[#012340]">{cat.label}</h3>
            <p className="text-4xl font-black text-[#012340]">{cat.count}</p>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Expedientes Totales</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xl">
        <div className="p-6 bg-slate-50 rounded-full w-fit mx-auto text-slate-300">
          <ListChecks size={48} />
        </div>
        <p className="text-slate-400 font-bold italic uppercase tracking-widest text-xs mt-4 italic">Modulo en desarrollo para gestión de inventarios</p>
      </div>
    </div>
  );
}

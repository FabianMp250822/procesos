"use client";

import { restoreProcess } from "@/lib/actions/processes";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

export default function RestoreProcessButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);

  const handleRestore = async () => {
    if (!confirm("¿Estás seguro de que deseas restaurar este proceso?")) return;
    
    setLoading(true);
    try {
      await restoreProcess(id);
    } catch (error) {
      alert("Error al restaurar el proceso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleRestore}
      disabled={loading}
      className="p-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
      title="Restaurar Proceso"
    >
      <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
    </button>
  );
}

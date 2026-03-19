"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

export function ExportButton({ 
  label, 
  action 
}: { 
  label: string; 
  action: () => Promise<{ filename: string; content: string }> 
}) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const { filename, content } = await action();
      const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export Error:", error);
      alert("Error al exportar los datos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleExport}
      disabled={loading}
      className="w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-primary/10 flex items-center justify-between disabled:opacity-50 transition-colors"
    >
      <span>{label}</span>
      {loading ? <Loader2 size={12} className="animate-spin text-primary" /> : <Download size={12} className="text-muted-foreground" />}
    </button>
  );
}

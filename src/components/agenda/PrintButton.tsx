"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="px-8 py-3 bg-[#012340] text-[#C59D5F] rounded-xl font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-lg flex items-center gap-2"
    >
      <Printer size={16} /> Imprimir Reporte
    </button>
  );
}

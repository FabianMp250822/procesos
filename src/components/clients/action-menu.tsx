"use client";

import { useState } from "react";
import { MoreHorizontal, Eye, FileText, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

export function ContactActionMenu({ clientId }: { clientId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 text-slate-300 hover:text-[#012340] hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200"
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl py-3 z-20 animate-in fade-in zoom-in-95 duration-200">
            <Link 
              href={`/dashboard/processes?cedula=${clientId}`}
              className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-black text-slate-600 hover:text-[#012340] hover:bg-slate-50 transition-all uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              <Eye size={16} className="text-blue-500" />
              Ver Proceso
            </Link>
            <Link 
              href={`/dashboard/pensioners/${clientId}`}
              className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-black text-slate-600 hover:text-[#012340] hover:bg-slate-50 transition-all uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              <FileText size={16} className="text-[#C59D5F]" />
              Ver Datos
            </Link>
            <div className="h-px bg-slate-100 my-2 mx-4" />
            <button 
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black text-slate-600 hover:text-[#012340] hover:bg-slate-50 transition-all uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              <Edit2 size={16} className="text-green-500" />
              Modificar
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black text-destructive hover:bg-destructive/5 transition-all uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search, UserSearch, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ContactDataSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("2"); // 2: Documento, 3: Nombres, 4: Apellidos

  return (
    <div className="p-12 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner">
          <UserSearch size={48} />
        </div>
        <div>
          <h1 className="text-5xl font-black text-white tracking-widest uppercase italic">Búsqueda de Contactos</h1>
          <p className="text-slate-400 mt-4 font-medium max-w-lg mx-auto italic">
            Consulte la base de datos de gestión de contactos y clientes externos.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Search size={200} />
        </div>
        
        <div className="relative z-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] ml-2 flex items-center gap-2">
                <FileText size={12} /> Criterio de Búsqueda
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-white font-black uppercase tracking-widest text-sm focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="2">N° Documento</option>
                <option value="3">Nombres</option>
                <option value="4">Apellidos</option>
                <option value="6">Nombre Completo</option>
              </select>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] ml-2 flex items-center gap-2">
                <Search size={12} /> Ingrese Valor
              </label>
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: 1045..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-5 text-white font-black text-lg focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
              />
            </div>
          </div>

          <Link
            href={`/dashboard/clients?q=${query}&cat=${category}`}
            className="w-full bg-white text-black font-black uppercase tracking-[0.4em] py-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-4 group-hover:bg-blue-500 group-hover:text-white"
          >
            Consultar Datos
            <ChevronRight size={24} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/pensioners/advanced" className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all group">
            <h3 className="text-white font-black uppercase tracking-widest text-xs italic mb-2">¿Busca algo más detallado?</h3>
            <p className="text-slate-500 text-sm font-medium italic group-hover:text-slate-300">Ir a Búsqueda Avanzada de Pensionados</p>
        </Link>
         <Link href="/dashboard/clients/new" className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all group">
            <h3 className="text-white font-black uppercase tracking-widest text-xs italic mb-2">Nuevo Contacto</h3>
            <p className="text-slate-500 text-sm font-medium italic group-hover:text-slate-300">Inscribir un nuevo prospecto o cliente comercial</p>
        </Link>
      </div>
    </div>
  );
}

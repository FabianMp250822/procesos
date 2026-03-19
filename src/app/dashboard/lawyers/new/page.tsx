"use client";

import { useActionState } from "react";
import { Scale, Save, ArrowLeft, User, Shield, MapPin, Phone, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { createLawyer } from "@/lib/actions/lawyers";

export default function NewLawyerPage() {
  const [state, formAction, isPending] = useActionState(createLawyer, null);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link 
            href="/dashboard/lawyers"
            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-[#012340] hover:border-[#012340] transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#012340] italic">Inscripción de Abogado</h1>
            <p className="text-xs text-[#4A4A4A]/60 font-bold uppercase tracking-widest mt-1 italic">Registro Central de Profesionales Legales</p>
          </div>
        </div>
      </div>

      <form action={formAction} className="space-y-8">
        {state?.error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold uppercase tracking-widest animate-pulse">
            {state.error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2 bg-[#012340]/5 rounded-xl text-[#012340]">
                  <User size={18} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-widest text-[#012340]">Información Personal</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Identificación (Cédula)</label>
                  <input 
                    name="identidad" 
                    required 
                    type="number"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200"
                    placeholder="Ej: 12345678"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Tarjeta Profesional</label>
                  <input 
                    name="tarjeta_pro" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200"
                    placeholder="Ej: TP-12345"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nombres</label>
                  <input 
                    name="nombres" 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200"
                    placeholder="Nombres completos"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Apellidos</label>
                  <input 
                    name="apellidos" 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200"
                    placeholder="Apellidos completos"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2 bg-[#012340]/5 rounded-xl text-[#012340]">
                  <MapPin size={18} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-widest text-[#012340]">Ubicación y Sede</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Ciudad / Municipio</label>
                  <input 
                    name="ciudad_res" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200"
                    placeholder="Ej: Bogotá"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Dirección Oficina / Residencia</label>
                  <input 
                    name="direccion_res" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-slate-200"
                    placeholder="Dirección completa"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-[#012340] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="p-2 bg-white/5 rounded-xl text-[#C59D5F]">
                  <Phone size={18} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white">Medios de Contacto</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Teléfono 1 (Principal)</label>
                  <input 
                    name="telefono_1" 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-white/10"
                    placeholder="Celular o Fijo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Teléfono 2</label>
                  <input 
                    name="telefono_2" 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Teléfono Oficina</label>
                  <input 
                    name="telefono_ofi" 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Correo Electrónico</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                    <input 
                      name="email" 
                      type="email"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-white focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-white/10"
                      placeholder="abogado@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Sitio Web / Perfil</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                    <input 
                      name="sitio_web" 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-white focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all placeholder:text-white/10"
                      placeholder="www.ejemplo.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-[#C59D5F] text-[#012340] py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(197,157,95,0.3)] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#012340] border-t-transparent" />
              ) : (
                <>
                  <Save size={20} />
                  Finalizar Inscripción
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { createClient } from "@/lib/actions/clients";
import { UserPlus, Info, Briefcase, Calculator, Save, AlertCircle } from "lucide-react";

interface Group {
  grupos: string;
}

export default function NewClientPage() {
  const [state, formAction, isPending] = useActionState(createClient, null);
  const months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  const currentYear = new Date().getFullYear();
  const groups = [
    { grupos: "ELECTRIFICADORA" },
    { grupos: "COLPENSIONES" },
    { grupos: "CORELCA" },
    { grupos: "BAVARIA" },
    { grupos: "GECELCA" },
    { grupos: "TRANSELCA" }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10 pb-32">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-4 bg-[#012340] rounded-2xl text-white shadow-[0_10px_30px_rgba(1,35,64,0.2)]">
          <UserPlus size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#012340]">Registrar Nuevo Contacto</h1>
          <p className="text-[#4A4A4A]/60 mt-1 font-medium">Ingrese la información detallada para crear un nuevo contacto pensional en el sistema.</p>
        </div>
      </div>

      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <AlertCircle size={20} />
          <p className="font-bold">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-10">
        {/* Section: Basic Info */}
        <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
          <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <Info size={20} className="text-[#012340]" />
            <h2 className="font-bold text-[#012340] uppercase tracking-wider">Datos Básicos y Contacto</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* N° Carpeta Física</label>
              <input name="carpeta" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none transition-all font-bold placeholder:text-slate-300" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Tipo de Identidad</label>
              <div className="relative">
                <select name="tipo_iden" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none appearance-none font-bold">
                  <option value="CEDULA">CÉDULA DE CIUDADANÍA</option>
                  <option value="CEDULA EXTRANJERA">CÉDULA DE EXTRANJERÍA</option>
                </select>
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* N° de Documento</label>
              <input name="iden" type="number" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Nombres</label>
              <input name="nombre" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none uppercase font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Apellidos</label>
              <input name="apellido" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none uppercase font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Dirección Residencial</label>
              <input name="direccion_res" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none uppercase font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Ciudad / Municipio</label>
              <input name="ciudad_res" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none uppercase font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Correo Electrónico</label>
              <input name="email" type="email" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Teléfono Principal</label>
              <input name="telefono1" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Teléfono Alternativo 1</label>
              <input name="telefono_res" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Teléfono Alternativo 2</label>
              <input name="telefono2" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold" />
            </div>
             <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Teléfono Alternativo 3</label>
              <input name="telefono3" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold" />
            </div>
            <div className="space-y-2.5 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Dirección Oficina</label>
              <input name="direccion_ofi" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none uppercase font-bold" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Grupo de Cobro / Entidad</label>
              <select name="grupo" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold appearance-none">
                <option value="">Seleccione un item...</option>
                {groups?.map((g: Group) => (
                  <option key={g.grupos} value={g.grupos}>{g.grupos}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Género</label>
              <select name="genero" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold appearance-none">
                <option value="">Seleccione...</option>
                <option value="MASCULINO">MASCULINO</option>
                <option value="FEMENINO">FEMENINO</option>
              </select>
            </div>
          </div>
          
          <div className="p-8 bg-slate-50/50 border-t border-slate-100">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block mb-4">* Fecha de Nacimiento</label>
            <div className="grid grid-cols-3 gap-6">
               <select name="dia_nac" className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold appearance-none text-center">
                 {Array.from({ length: 31 }, (_, i) => (
                   <option key={i + 1} value={i + 1}>{i + 1}</option>
                 ))}
               </select>
               <select name="mes_nac" className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold appearance-none text-center">
                 {months.map(m => (
                   <option key={m} value={m}>{m}</option>
                 ))}
               </select>
               <select name="año_nac" className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none font-bold appearance-none text-center">
                 {Array.from({ length: 115 }, (_, i) => (
                   <option key={currentYear - i} value={currentYear - i}>{currentYear - i}</option>
                 ))}
               </select>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Section: Pension Profile */}
          <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
            <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
              <Briefcase size={20} className="text-[#012340]" />
              <h2 className="font-bold text-[#012340] uppercase tracking-wider">Perfil Pensional</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipo de Pensión</label>
                <select name="tipo_pen" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#C59D5F] outline-none appearance-none font-bold">
                  <option value="">Seleccione...</option>
                  <option value="AFILIADO">AFILIADO</option>
                  <option value="SUSTITUTO">SUSTITUTO</option>
                  <option value="OTRO">OTRO</option>
                </select>
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nombre del Sustituto</label>
                <input name="nombre_pen" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] uppercase font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Mesada Inicial</label>
                  <input name="mesada" type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Retroactivo Pagado</label>
                  <input name="retro" type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] font-bold" />
                </div>
              </div>

              {/* SECTION: SUSTITUCIÓN PENSIONAL */}
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <h3 className="text-xs font-black text-[#012340] uppercase tracking-widest">Sustitución Pensional</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipo Identidad (Sustituto)</label>
                    <select name="tipo_pen_iden" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] font-bold appearance-none">
                      <option value="">Seleccione...</option>
                      <option value="CEDULA">CEDULA</option>
                      <option value="CEDULA EXTRANJERA">CEDULA EXTRANJERA</option>
                    </select>
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">N° Identidad (Sustituto)</label>
                    <input name="iden_pen" type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] font-bold" />
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Fecha de Reconocimiento</label>
                  <div className="grid grid-cols-3 gap-4">
                    <select name="dia_pen" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none text-center">
                      <option value="">Día</option>
                      {Array.from({ length: 31 }, (_, i) => (<option key={i+1} value={i+1}>{i+1}</option>))}
                    </select>
                    <select name="mes_pen" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none text-center">
                      <option value="">Mes</option>
                      {months.map(m => (<option key={m} value={m}>{m}</option>))}
                    </select>
                    <select name="año_pen" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none text-center">
                      <option value="">Año</option>
                      {Array.from({ length: 115 }, (_, i) => (<option key={currentYear-i} value={currentYear-i}>{currentYear-i}</option>))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Fecha de Fallecimiento</label>
                  <div className="grid grid-cols-3 gap-4">
                    <select name="dia_fall" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none text-center">
                      <option value="">Día</option>
                      {Array.from({ length: 31 }, (_, i) => (<option key={i+1} value={i+1}>{i+1}</option>))}
                    </select>
                    <select name="mes_fall" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none text-center">
                      <option value="">Mes</option>
                      {months.map(m => (<option key={m} value={m}>{m}</option>))}
                    </select>
                    <select name="año_fall" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none text-center">
                      <option value="">Año</option>
                      {Array.from({ length: 115 }, (_, i) => (<option key={currentYear-i} value={currentYear-i}>{currentYear-i}</option>))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Actuarial Data */}
          <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
            <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
              <Calculator size={20} className="text-[#012340]" />
              <h2 className="font-bold text-[#012340] uppercase tracking-wider">Datos Actuariales (1997)</h2>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pensión Empresa</label>
                <input name="pen_empresa" type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] font-bold" />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pensión ISS</label>
                <input name="pen_iss" type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] font-bold" />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Salario base</label>
                <input name="pen_salario" type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] font-bold" />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Semanas cotizadas</label>
                <input name="pen_semana" type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-[#C59D5F] font-bold" />
              </div>
            </div>
          </section>
        </div>

        <div className="fixed bottom-10 right-10 z-50">
          <button 
            type="submit" 
            disabled={isPending}
            className="group flex items-center gap-4 px-10 py-5 bg-[#012340] text-white rounded-2xl shadow-[0_20px_40px_rgba(1,35,64,0.3)] hover:bg-[#012450] transition-all font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 text-xs disabled:opacity-50"
          >
            {isPending ? (
              "Guardando..."
            ) : (
              <>
                <Save size={20} className="group-hover:rotate-12 transition-transform text-[#C59D5F]" />
                Guardar Contacto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

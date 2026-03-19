"use client";

import { useActionState } from "react";
import { createPensioner } from "@/lib/actions/pensioner";
import { UserPlus, Save, ArrowLeft, Info, Briefcase, Calculator, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

export default function NewPensioner() {
  const [state, formAction, isPending] = useActionState(createPensioner, null);

  const districts = ["ATLANTICO", "BARRANQUILLA", "BOLIVAR", "CESAR", "CORDOBA", "GUAJIRA", "MAGANGUE", "MAGDALENA", "SUCRE"];
  const groups = ["ELECTRIFICADORA", "COLPENSIONES", "CORELCA", "BAVARIA", "GECELCA", "TRANSELCA"];
  const associations = ["ASOJECOSTA", "ASO-GUAJIRA", "ASO-CORDOBA 1", "ASO-CORDOBA 2", "ASOPELIS", "ASOJEBOL", "SIN AFILIACION"];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
      <div className="flex items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/pensioners" className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-400 hover:text-[#012340] shadow-sm">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl font-black text-[#012340] tracking-tighter uppercase flex items-center gap-4">
              <UserPlus className="text-[#C59D5F]" size={40} />
              Agregar Cliente (Pensionado)
            </h1>
            <p className="text-[#4A4A4A]/60 mt-1 font-bold">Inscripción en Archivo de Carpetas — Ley 100 y Convencionales</p>
          </div>
        </div>
      </div>

      <form action={formAction} className="space-y-12">
        
        {/* SECTION 1: DATOS BÁSICOS */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <Info size={20} className="text-[#012340]" />
            <h2 className="font-bold text-[#012340] uppercase tracking-wider text-sm">Datos Básicos y Contacto</h2>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* N° Carpeta</label>
              <input name="num_carpeta" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">N° Carpeta 2</label>
              <input name="num_carpeta_2" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Identidad (Cédula)</label>
              <input name="iden" type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Género</label>
              <select name="genero" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm appearance-none">
                <option value="M">MASCULINO</option>
                <option value="F">FEMENINO</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Nombres</label>
              <input name="nombre" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm uppercase transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Apellidos</label>
              <input name="apellido" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm uppercase transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Fecha Nacimiento</label>
              <input name="fecha_nac" type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-400 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Dirección Residencial</label>
              <input name="direccion_res" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm uppercase transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Jurisdicción (Ciudad)</label>
              <input name="ciudad" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm uppercase transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Teléfono Fijo</label>
              <input name="telefono1" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Celular Actual</label>
              <input name="telefono2" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Correo Electrónico</label>
              <input name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
          </div>

          <div className="p-10 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100">
             <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Grupo Pincipal</label>
              <select name="grupo" required className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm appearance-none">
                {groups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Sub-Grupo / Convenio</label>
              <select name="grupo_2" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm appearance-none">
                <option value="">Seleccione...</option>
                {groups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Distrito Judicial</label>
              <select name="distrito" required className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm appearance-none">
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Asociación</label>
              <select name="asociacion" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm appearance-none">
                {associations.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Clase (Condición)</label>
              <select name="condicion" required className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm appearance-none">
                <option value="TITULAR">TITULAR</option>
                <option value="SUSTITUTO(A)">SUSTITUTO(A)</option>
              </select>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">* Tipo de Pensión</label>
              <select name="tipo" required className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm appearance-none">
                <option value="COMPARTIDA">COMPARTIDA</option>
                <option value="CONVENCIONAL">CONVENCIONAL</option>
                <option value="PPA I">PPA I</option>
                <option value="PRV">PRV</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: RECONOCIMIENTO */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <Briefcase size={20} className="text-[#012340]" />
            <h2 className="font-bold text-[#012340] uppercase tracking-wider text-sm">Reconocimiento de Pensión De Jubilación</h2>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">N° de Acto</label>
              <input name="acto_jubilacion" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Mesada Reconocida</label>
              <input name="mesada_jubilacion" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">A partir de</label>
              <input name="fecha_jubilacion" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fecha Ingreso</label>
              <input name="fecha_ingreso" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fecha Egreso</label>
              <input name="fecha_egreso" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fecha del Acto</label>
              <input name="fecha_acto" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Edad Jubilación</label>
              <input name="EDAD_JUBILACION" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
          </div>
        </div>

        {/* SECTION 3: PERFIL PENSIÓN LEGAL */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#012340]" />
            <h2 className="font-bold text-[#012340] uppercase tracking-wider text-sm">Perfil Pensión Legal</h2>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Resolución ISS / Colp</label>
              <input name="resolucion_iss" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Mesada Inicial</label>
              <input name="valor_vejez_iss" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">A partir de</label>
              <input name="fecha_vejez_iss" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fecha Resolución</label>
              <input name="fecha_resolucion" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Semanas Cotizadas</label>
              <input name="semanas" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tasa de Reemplazo</label>
              <input name="tasa_reemplazo" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Valor Pensión Vejez ISS</label>
              <input name="valor_pension_vejez_iss" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
          </div>
        </div>

        {/* SECTION 4: COMPARTICIÓN / DESCOMPARTICIBILIDAD */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <Calculator size={20} className="text-[#012340]" />
            <h2 className="font-bold text-[#012340] uppercase tracking-wider text-sm">Compartición y Mayores Valores</h2>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fecha Compartición</label>
              <input name="fecha_comparticion" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Valor Antes Comp.</label>
              <input name="valor_antes_comparticion" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Retroactivo Suspenso</label>
              <input name="retroactivo_suspenso" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fecha Descomp.</label>
              <input name="fecha_descompartibilidad" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Vlr. Mayor Cargo Emp.</label>
              <input name="valor_cargo_empresa" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
          </div>
        </div>

        {/* SECTION 5: SUSTITUCIÓN */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <Users size={20} className="text-[#012340]" />
            <h2 className="font-bold text-[#012340] uppercase tracking-wider text-sm">Información de Sustitución (Si aplica)</h2>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Cédula Finado</label>
              <input name="cedula_finado" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nombre Completo Finado</label>
              <input name="nombre_finado" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm uppercase transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Resolución ISS/Colp</label>
              <input name="resolucion_iss_finado" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fecha Resolución</label>
              <input name="fecha_resolucion_finado" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#C59D5F] outline-none text-sm transition-all" />
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="fixed bottom-10 right-10 z-[200]">
          <button 
            type="submit" 
            disabled={isPending}
            className="px-16 py-6 bg-[#012340] hover:bg-[#012450] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_20px_50px_rgba(1,35,64,0.3)] transition-all flex items-center gap-4 group hover:scale-105 active:scale-95"
          >
            {isPending ? "Procesando..." : (
              <>
                <Save size={24} className="group-hover:rotate-12 transition-transform text-[#C59D5F]" />
                Guardar Cliente (Archivo)
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

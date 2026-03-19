import { updateProcess } from "@/lib/actions/processes";
import { getCourts, getProcessDetails } from "@/lib/data/processes";
import { getLawyers } from "@/lib/data/lawyers";
import { getClients } from "@/lib/data/clients";
import { Edit3, Info, User, Shield, FileText, Save, Scale, Gavel, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

import { Suspense } from "react";

export default async function EditProcessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Cargando editor...</div>}>
      <EditProcessContent id={id} />
    </Suspense>
  );
}

async function EditProcessContent({ id }: { id: string }) {
  const processId = parseInt(id);
  const process = await getProcessDetails(processId);
  if (!process) notFound();

  const courts = await getCourts();
  const lawyersList = await getLawyers();
  const clientsList = await getClients();

  const updateProcessWithId = updateProcess.bind(null, processId);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10 pb-32">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <Edit3 size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Editar Proceso <span className="text-blue-500 font-black ml-1">#{id}</span></h1>
          <p className="text-slate-400 mt-1 font-medium">Actualice la información del expediente y sus radicados con precisión ejecutiva.</p>
        </div>
      </div>

      <form action={updateProcessWithId} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Process Info */}
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
                <Info size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Identificación del Expediente</h2>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">N° Carpeta Física</label>
                  <input name="num_carpeta" defaultValue={process.folderNumber || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">N° Carpeta Digital</label>
                  <input name="num_carpeta2" defaultValue={process.folderNumber2 || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Despacho Origen</label>
                  <select name="despacho" defaultValue={process.court || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold appearance-none">
                    <option value="" className="bg-slate-900">Seleccione despacho...</option>
                    {courts.map(c => (
                      <option key={c.id} value={c.court || ''} className="bg-slate-900 text-sm uppercase">{c.court}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Clase de Proceso</label>
                  <select name="clase_proceso" defaultValue={process.processClass || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold appearance-none">
                    <option value="" className="bg-slate-900">Seleccione clase...</option>
                    <option value="REAJUSTE" className="bg-slate-900">REAJUSTE</option>
                    <option value="SANCION" className="bg-slate-900">SANCION</option>
                    <option value="PENSION" className="bg-slate-900">PENSION</option>
                  </select>
                </div>
                <div className="space-y-2.5 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Jurisdicción</label>
                  <input name="jurisdiccion" defaultValue={process.jurisdiction || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold" />
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
                <Gavel size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Radicados e Instancias</h2>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Radicado Inicial (23 Dig.)</label>
                  <input name="num_radicado_ini" defaultValue={process.radicadoIni || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold tracking-wider" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Fecha Radicado Inicial</label>
                  <input type="date" name="fecha_radicado_ini" defaultValue={process.dateRadicadoIni || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Radicado Tribunal</label>
                  <input name="radicado_tribunal" defaultValue={process.radicadoTribunal || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold tracking-wider" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Magistrado Encargado</label>
                  <input name="magistrado" defaultValue={process.magistrate || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
                <Scale size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Sentencias del Proceso</h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sentencia de 1ra Instancia</label>
                  <input name="sentencia_juzgado" defaultValue={process.sentenceJuzgado || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sentencia de 2da Instancia</label>
                  <input name="sentencia_tribunal" defaultValue={process.sentenceTribunal || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-10">
            <section className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
                <Shield size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Personal Jurídico</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Identidad Demandado</label>
                  <input name="identidad_demandado" defaultValue={process.defendantId || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nombre del Demandado</label>
                  <input name="nombres_demandado" defaultValue={process.defendantName || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Apoderado Titular (ID)</label>
                  <input list="lawyers-list" name="identidad_abogados" defaultValue={process.lawyerId || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                  <datalist id="lawyers-list">
                    {lawyersList.map(l => (
                      <option key={l.id} value={l.id}>{l.firstNames} {l.lastNames}</option>
                    ))}
                  </datalist>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Nombre del Apoderado</label>
                  <input name="nombres_apoderado" defaultValue={process.lawyerName || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
                <Scale size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Estado y Gestión</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Negocio / Segmento</label>
                  <input name="negocio" defaultValue={process.businessLine || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Estado Civil</label>
                  <select name="estado" defaultValue={process.status || ''} required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold appearance-none">
                    <option value="ACTIVO" className="bg-slate-900">ACTIVO</option>
                    <option value="FALLO ADVERSO - TERMINADO" className="bg-slate-900">FALLO ADVERSO - TERMINADO</option>
                    <option value="TERMINADO CON PAGO" className="bg-slate-900">TERMINADO CON PAGO</option>
                    <option value="TERMINADO" className="bg-slate-900">TERMINADO</option>
                    <option value="SERVICIO PENDIENTE" className="bg-slate-900">SERVICIO PENDIENTE</option>
                  </select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Vía Casación</label>
                  <select name="casacion" defaultValue={process.casacion || 'NO'} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold appearance-none">
                    <option value="NO" className="bg-slate-900">NO</option>
                    <option value="SI" className="bg-slate-900">SI</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
                <FileText size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Corte Suprema</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Radicado Corte</label>
                  <input name="radicado_corte" defaultValue={process.radicadoCorte || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold tracking-wider" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Magistrado Corte</label>
                  <input name="magistrado_corte" defaultValue={process.magistrateCorte || ''} className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
            <Calendar size={20} className="text-blue-500" />
            <h2 className="font-bold text-white uppercase tracking-wider">Observaciones y Resumen Administrativo</h2>
          </div>
          <div className="p-8">
            <textarea name="description" defaultValue={process.description || ''} rows={4} className="w-full px-6 py-5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none font-medium" placeholder="Ingrese detalles relevantes sobre el avance del proceso..." />
          </div>
        </section>

        <div className="fixed bottom-10 right-10 z-50">
          <button type="submit" className="group flex items-center gap-4 px-10 py-5 bg-blue-600 text-white rounded-2xl shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 text-xs">
            <Save size={20} className="group-hover:rotate-12 transition-transform" />
            Actualizar Expediente
          </button>
        </div>
      </form>
    </div>
  );
}

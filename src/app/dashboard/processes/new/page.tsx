import { createProcess } from "@/lib/actions/processes";
import { getCourts } from "@/lib/data/processes";
import { getLawyers } from "@/lib/data/lawyers";
import { getClients } from "@/lib/data/clients";
import { FolderPlus, Info, User, Shield, FileText, Save, Scale, Gavel, Calendar } from "lucide-react";

export default async function NewProcessPage() {
  const courts = await getCourts();
  const lawyersList = await getLawyers();
  const clientsList = await getClients();

  console.log(`[NewProcessPage] Data fetched: ${courts.length} courts, ${lawyersList.length} lawyers, ${clientsList.length} clients`);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10 pb-32">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <FolderPlus size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Registrar Nuevo Proceso</h1>
          <p className="text-slate-400 mt-1 font-medium">Inicie un nuevo expediente jurídico vinculando clientes y apoderados.</p>
        </div>
      </div>

      <form action={createProcess} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Process Info */}
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <Info size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Información Básica</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">N° Carpeta Principal</label>
                  <input name="num_carpeta" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700" placeholder="Ej: 1234" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">N° Carpeta Secundaria</label>
                  <input name="num_carpeta2" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700" placeholder="Ej: 5678" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Despacho Judicial</label>
                  <select name="despacho" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-bold">
                    <option value="" className="bg-slate-900">Seleccione despacho...</option>
                    {courts.map(c => (
                      <option key={c.id} value={c.court || ''} className="bg-slate-900">{c.court}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Clase de Proceso</label>
                  <select name="clase_proceso" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-bold">
                    <option value="" className="bg-slate-900">Seleccione clase...</option>
                    <option value="REAJUSTE" className="bg-slate-900">REAJUSTE</option>
                    <option value="SANCION" className="bg-slate-900">SANCIÓN</option>
                    <option value="PENSION" className="bg-slate-900">PENSIÓN</option>
                  </select>
                </div>
                <div className="space-y-2.5 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Jurisdicción</label>
                  <input name="jurisdiccion" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase tracking-tight" />
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <Gavel size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Radicados e Instancias</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Radicado Inicial (23 Dígitos)</label>
                  <input name="num_radicado_ini" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold tracking-widest" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Fecha Radicado Inicial</label>
                  <input type="date" name="fecha_radicado_ini" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Radicado Tribunal</label>
                  <input name="radicado_tribunal" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Magistrado Encargado</label>
                  <input name="magistrado" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sentencia Juzgado</label>
                  <input name="sentencia_juzgado" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sentencia Tribunal</label>
                  <input name="sentencia_tribunal" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <User size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider">Sujetos Procesales</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Demandante */}
                <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] border-b border-white/5 pb-4">Demandante</h3>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">* Documento Identidad</label>
                      <input list="clients-list" name="identidad_clientes" required className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-bold" />
                      <datalist id="clients-list">
                        {clientsList.map(c => (
                          <option key={c.id} value={c.id}>{c.firstNames} {c.lastNames}</option>
                        ))}
                      </datalist>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">* Nombre Demandante</label>
                      <input name="nombres_demandante" required className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-bold uppercase" />
                    </div>
                  </div>
                </div>

                {/* Demandado */}
                <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 pb-4">Demandado</h3>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">NIT / Cédula</label>
                      <input name="identidad_demandado" className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Nombre Entidad</label>
                      <input name="nombres_demandado" className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-bold uppercase" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-10">
            <section className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <Shield size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider text-sm">Apoderado</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* ID Abogado</label>
                  <input list="lawyers-list" name="identidad_abogados" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                  <datalist id="lawyers-list">
                    {lawyersList.map(l => (
                      <option key={l.id} value={l.id}>{l.firstNames} {l.lastNames}</option>
                    ))}
                  </datalist>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Nombre Apoderado</label>
                  <input name="nombres_apoderado" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <Scale size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider text-sm">Estado</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Tipo de Negocio</label>
                  <input name="negocio" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase tracking-tight" placeholder="Ej: PENSIONES" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">* Estado Proceso</label>
                  <select name="estado" required className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase text-[10px]">
                    <option value="ACTIVO" className="bg-slate-900">ACTIVO</option>
                    <option value="FALLO ADVERSO - TERMINADO" className="bg-slate-900">FALLO ADVERSO - TERMINADO</option>
                    <option value="TERMINADO CON PAGO" className="bg-slate-900">TERMINADO CON PAGO</option>
                    <option value="TERMINADO" className="bg-slate-900">TERMINADO</option>
                    <option value="SERVICIO PENDIENTE" className="bg-slate-900">SERVICIO PENDIENTE</option>
                  </select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">¿Recurso Casación?</label>
                  <select name="casacion" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-black text-[10px]">
                    <option value="NO" className="bg-slate-900">NO</option>
                    <option value="SI" className="bg-slate-900">SI</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <FileText size={20} className="text-blue-500" />
                <h2 className="font-bold text-white uppercase tracking-wider text-sm">Corte Suprema</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Radicado Corte</label>
                  <input name="radicado_corte" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Radicado Último</label>
                  <input name="num_radicado_ult" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Magistrado Corte</label>
                  <input name="magistrado_corte" className="w-full px-5 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" />
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl mt-10">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
            <Calendar size={20} className="text-blue-500" />
            <h2 className="font-bold text-white uppercase tracking-wider">Observaciones Finales</h2>
          </div>
          <div className="space-y-4">
            <textarea name="descripcion" rows={5} className="w-full px-6 py-5 bg-slate-950 border border-white/10 rounded-3xl text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none font-medium leading-relaxed" placeholder="Ingrese detalles adicionales o notas sobre la apertura del expediente..." />
          </div>
        </section>

        <div className="fixed bottom-10 right-10 z-50">
          <button type="submit" className="group flex items-center gap-4 px-10 py-5 bg-blue-600 text-white rounded-2xl shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 text-xs text-white">
            <Save size={20} className="group-hover:rotate-12 transition-transform" />
            Guardar Expediente
          </button>
        </div>
      </form>
    </div>
  );
}

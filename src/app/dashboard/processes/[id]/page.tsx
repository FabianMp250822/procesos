import { getProcessDetails, getPensionerDocuments } from "@/lib/data/processes";
import { addAnnotation, deleteProcess, deleteAnnotation, updateAnnotation } from "@/lib/actions/processes";
import { uploadAnnex } from "@/lib/actions/files";
import { updatePensionerDocumentStatus } from "@/lib/actions/pensioner";
import { 
  FileText, 
  History, 
  Paperclip, 
  User as UserIcon, 
  Scale, 
  Calendar, 
  ChevronRight, 
  Plus, 
  Download,
  ExternalLink,
  Edit2,
  Trash2,
  AlertCircle,
  Gavel,
  Briefcase,
  Users,
  Landmark,
  Shield,
  Heart,
  Calculator,
  Search,
  Trash,
  ArrowRight,
  Folder
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { AnnotationModal } from "@/components/AnnotationModal";

export default async function ProcessDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processId = parseInt(id);
  const data = await getProcessDetails(processId);
  if (!data) notFound();

  const pensionerDocs = data.clientId ? await getPensionerDocuments(data.clientId.toString()) : [];
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-12 pb-32">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-6">
            <nav className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Link href="/dashboard/processes" className="hover:text-blue-600 transition-colors">Procesos</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-500">Expediente #{data.id}</span>
            </nav>
            <div className="flex items-center gap-6">
              <div className="p-5 bg-white rounded-3xl text-blue-600 shadow-xl shadow-blue-500/5 border border-slate-200/60">
                <Scale size={40} />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-3">
                  {data.radicadoIni || "Sin Radicado"}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider">
                  <span className={`px-3 py-1.5 rounded-full font-black text-[10px] ${
                    data.status === 'ACTIVO' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'
                  }`}>{data.status}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="flex items-center gap-2 text-slate-500">
                    <Calendar size={16} className="text-blue-500" /> 
                    {data.creationDate}
                  </span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="flex items-center gap-2 text-slate-500">
                    <Folder size={16} className="text-blue-500" />
                    Carpeta: <span className="text-slate-900">{data.folderNumber}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <AnnotationModal processId={processId} />
            
            <Link 
              href={`/dashboard/processes/${id}/edit`}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold uppercase tracking-wider text-xs shadow-sm"
            >
              <Edit2 size={16} />
              Editar
            </Link>

            <form action={async () => {
              "use server";
              await deleteProcess(processId);
            }}>
              <button 
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-100 transition-all font-bold uppercase tracking-wider text-xs"
              >
                <Trash size={16} />
                Eliminar
              </button>
            </form>
          </div>
        </div>

      {/* Process Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 shadow-xl shadow-slate-200/20">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Scale size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Detalles del Expediente</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {[
                { label: "Radicado Inicial", value: data.radicadoIni, mono: true },
                { label: "N° Registro", value: data.id },
                { label: "Carpeta Principal", value: data.folderNumber },
                { label: "Carpeta Secundaria", value: data.folderNumber2 || '-' },
                { label: "Demandante", value: data.clientName, bold: true },
                { label: "Documento Demandante", value: data.clientId },
                { label: "Demandado", value: data.defendantName, bold: true },
                { label: "Documento Demandado", value: data.defendantId },
                { label: "Apoderado", value: data.lawyerName },
                { label: "Despacho Origen", value: data.court },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className={`text-sm ${item.bold ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-700'} ${item.mono ? 'font-mono text-blue-600' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jurisdicción</p>
                    <p className="text-sm font-bold text-slate-700">{data.jurisdiction || 'N/A'}</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clase de Proceso</p>
                    <p className="text-sm font-bold text-slate-700">{data.processClass || 'LABORAL'}</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Línea de Negocio</p>
                    <p className="text-sm font-bold text-blue-600 uppercase">{(data as any).businessLine || '-'}</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Radicación Completa</p>
                    <p className="text-sm font-mono text-slate-600">{(data as any).radicadoUlt || '-'}</p>
                 </div>
              </div>
            </div>
          </section>

          {/* Tribunal & Sentencias Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-lg shadow-slate-200/20">
              <div className="flex items-center gap-3 mb-8">
                <Gavel size={20} className="text-blue-500" />
                <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Tribunal y Corte</h3>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Magistrado Tribunal</p>
                  <p className="text-xs font-bold text-slate-700 italic">{data.magistrate || 'PENDIENTE'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Magistrado Corte</p>
                  <p className="text-xs font-bold text-slate-700 italic">{(data as any).magistrateCorte || 'PENDIENTE'}</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-lg shadow-slate-200/20">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase size={20} className="text-blue-500" />
                <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Sentencias</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-slate-100 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-2">1ra Instancia</p>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed">{data.sentenceJuzgado || 'NO REGISTRA'}</p>
                </div>
                <div className="p-4 border border-slate-100 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-2">2da Instancia</p>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed">{data.sentenceTribunal || 'NO REGISTRA'}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Deceased & Financial Data */}
          {(data.deceased || data.folder) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.deceased && (
                <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-lg shadow-slate-200/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Heart size={80} className="text-red-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <Heart size={20} className="text-red-500" />
                      <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Datos del Causante</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Nacimiento</p>
                        <p className="text-xs font-bold text-slate-700">{data.deceased.deceasedBirthDate || '-'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Fallecimiento</p>
                        <p className="text-xs font-bold text-slate-700">{data.deceased.deathDate || '-'}</p>
                      </div>
                      <div className="col-span-2 p-3 bg-red-50 rounded-xl border border-red-100">
                        <p className="text-[9px] font-black text-red-400 uppercase mb-1">Vínculo / Curador</p>
                        <p className="text-xs font-bold text-red-700 uppercase">{data.deceased.relationship} - {data.deceased.curatorName || 'SIN CURADOR'}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {data.folder && (
                <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-lg shadow-slate-200/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Calculator size={80} className="text-emerald-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <Calculator size={20} className="text-emerald-500" />
                      <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Mesadas e ISS</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                        <p className="text-[9px] font-black text-emerald-500 uppercase mb-1">Mesada Jub</p>
                        <p className="text-sm font-bold text-emerald-700">${data.folder.initialMesadaJubilation || '0'}</p>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                        <p className="text-[9px] font-black text-emerald-500 uppercase mb-1">Mesada ISS</p>
                        <p className="text-sm font-bold text-emerald-700">${data.folder.initialMesadaIss || '0'}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-8">
          {/* Main Beneficiary Card */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-200/20">
            <div className="p-8 bg-blue-600 text-white relative group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <UserIcon size={100} />
              </div>
              <div className="relative z-10 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Demandante Principal</p>
                <div>
                  <h3 className="text-2xl font-black uppercase leading-tight">{data.clientName}</h3>
                  <p className="text-xs font-bold opacity-70 mt-1">ID {data.clientId}</p>
                </div>
                <Link href={`/dashboard/processes/${id}/plaintiffs`} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md">
                   Ver más demandantes <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-slate-400" />
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Grupo Familiar</h4>
                  </div>
                  <div className="space-y-3">
                    {data.family && data.family.slice(0, 3).map((member: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-xs font-bold text-slate-800 uppercase">{member.firstNames}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase">{member.relationship}</p>
                        </div>
                      </div>
                    ))}
                    {(!data.family || data.family.length === 0) && (
                      <p className="text-[10px] text-slate-400 italic font-bold text-center py-4 bg-slate-50 rounded-xl">Sin grupo registrado</p>
                    )}
                  </div>
               </div>

               <div className="space-y-4 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-slate-400" />
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Documentos del Cliente</h4>
                  </div>
                  <div className="space-y-3">
                    {pensionerDocs.slice(0, 2).map((pret, idx) => (
                      <div key={idx} className="space-y-2">
                        <p className="text-[9px] font-black text-blue-500 uppercase px-1">{pret.pretensionName}</p>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                          {pret.documents.slice(0, 2).map((doc: any, di: number) => (
                            <div key={di} className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold text-slate-600 truncate">{doc.documentName}</span>
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${doc.status === 'SI' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{doc.status || "NO"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {pensionerDocs.length === 0 && (
                      <p className="text-[10px] text-slate-400 italic font-bold text-center py-4 bg-slate-50 rounded-xl">Sin documentos</p>
                    )}
                  </div>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>

      {/* Full Width Sections: Timeline & Annexes */}
      <div className="max-w-4xl mx-auto space-y-12 px-6">
        {/* Timeline (Actuaciones) */}
        <section className="bg-white rounded-[3rem] border border-slate-200/60 overflow-hidden shadow-2xl shadow-slate-200/40">
          <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
                <History size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Historial de Actuaciones</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Línea de tiempo del proceso</p>
              </div>
            </div>
          </div>

          <div className="p-10">
            <div className="space-y-8 relative">
               {/* Vertical Line */}
               <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-slate-100 hidden md:block"></div>

               {[...data.annotations].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((note: any, idx: number) => (
                 <div key={note.id} className="relative pl-0 md:pl-16 group">
                   {/* Timeline dot */}
                   <div className="absolute left-[20px] top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-500 hidden md:block z-10 group-hover:scale-125 transition-transform shadow-sm"></div>

                   <div className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex flex-wrap items-center gap-3">
                         <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest">
                           {note.type || 'ACTUACIÓN'}
                         </span>
                         <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest ${
                           note.visualize === 'SI' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                         }`}>
                           {note.visualize === 'SI' ? 'VISIBLE' : 'INTERNO'}
                         </span>
                         {note.courts && (
                            <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-full border border-slate-200">
                              <Landmark size={12} className="text-blue-500" />
                              {note.courts === 1 ? 'JUZGADO' : note.courts === 2 ? 'TRIBUNAL' : 'CORTE'}
                            </span>
                         )}
                       </div>
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                         <Calendar size={14} className="text-blue-500" />
                         {note.date}
                       </div>
                     </div>

                     <div className="space-y-6 text-slate-700">
                        <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <FileText size={14} className="text-blue-500" /> Detalle
                          </p>
                          <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">{note.annotation}</p>
                        </div>

                        {note.proceduralStatus && note.proceduralStatus !== note.annotation && (
                          <div className="p-6 bg-blue-50/30 rounded-3xl border border-blue-100/50">
                             <p className="text-[10px] font-black text-blue-500/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                               <Shield size={14} /> Estado Procesal
                             </p>
                             <p className="text-sm font-semibold">{note.proceduralStatus}</p>
                          </div>
                        )}

                        {note.limitDate && (
                          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <AlertCircle size={16} className="text-amber-500" />
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-amber-600/60 uppercase tracking-widest">Límite</p>
                               <p className="text-xs font-black text-amber-700">{note.limitDate}</p>
                            </div>
                          </div>
                        )}
                     </div>

                     <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                        {note.fileUrl && (
                          <a 
                            href={note.fileUrl} 
                            target="_blank" 
                            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                          >
                            <ExternalLink size={14} /> Ver Documento
                          </a>
                        )}
                        <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Edit2 size={18} />
                        </button>
                        <form action={async () => {
                          "use server";
                          await deleteAnnotation(note.id, processId);
                        }}>
                          <button type="submit" className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 size={18} />
                          </button>
                        </form>
                     </div>
                   </div>
                 </div>
               ))}
               {data.annotations.length === 0 && (
                 <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sin actuaciones</p>
                 </div>
               )}
            </div>
          </div>
        </section>

        {/* Digital Folder (R2) */}
        <section className="bg-white rounded-[3rem] border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-200/20">
          <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-emerald-50/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
                <Paperclip size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Expediente Digital</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Cloudflare R2</p>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-10">
             <form action={async (fd) => {
               "use server";
               await uploadAnnex(processId, fd);
             }} className="p-10 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-emerald-500/40 hover:bg-emerald-50/10 transition-all group flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-3">
                   <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full">
                      <Download size={32} />
                   </div>
                   <input type="file" name="file" className="text-[10px] text-slate-400 mt-2 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-emerald-600 file:text-white cursor-pointer" />
                </div>
                <div className="w-full max-w-md space-y-4">
                   <input name="description" placeholder="Descripción..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-tight outline-none focus:border-emerald-500 transition-all" />
                   <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 flex items-center justify-center gap-3">
                      <Plus size={18} /> Cargar Archivo
                   </button>
                </div>
             </form>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.annexes.map((file: any) => (
                  <div key={file.id} className="group p-5 bg-white border border-slate-200 rounded-3xl hover:border-emerald-500/30 hover:shadow-lg transition-all flex items-center justify-between">
                     <div className="flex items-center gap-4 overflow-hidden">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                           <FileText size={20} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-800 truncate">{file.fileName}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-1">{file.description || 'Sin descripción'}</p>
                        </div>
                     </div>
                     <a href={file.r2Url} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white rounded-xl transition-all">
                       <ExternalLink size={18} />
                     </a>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}

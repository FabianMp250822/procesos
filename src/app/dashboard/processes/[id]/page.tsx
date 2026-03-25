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
import { ActuacionesTable } from "@/components/processes/ActuacionesTable";

interface FamilyMember {
  firstNames: string | null;
  relationship: string | null;
}

interface Annotation {
  id: number;
  date: string | null;
  type: string | null;
  visualize: string | null;
  courts: number | null;
  annotation: string | null;
  proceduralStatus: string | null;
  limitDate: string | null;
  limitHour: string | null;
  fileUrl: string | null;
  documentName?: string | null;
}

interface Annex {
  id: number;
  fileName: string | null;
  description: string | null;
  filePath: string | null;
}

function DetailField({ label, value, bold, mono, italic, blue, badge }: { 
  label: string; 
  value: any; 
  bold?: boolean; 
  mono?: boolean; 
  italic?: boolean; 
  blue?: boolean;
  badge?: boolean;
}) {
  return (
    <div className="space-y-1.5 group">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 group-hover:text-blue-500 transition-colors">{label}</p>
      <div className={`bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-h-[44px] flex items-center shadow-sm group-hover:border-blue-200 transition-all ${badge && value === 'ACTIVO' ? 'bg-blue-50/50' : ''}`}>
        {badge ? (
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            value === 'ACTIVO' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
          }`}>{value || 'INACTIVO'}</span>
        ) : (
          <p className={`text-[12px] truncate ${
            bold ? 'font-extrabold text-slate-900' : 'font-bold text-slate-600'
          } ${mono ? 'font-mono text-blue-600' : ''} ${italic ? 'italic text-slate-500 font-medium' : ''} ${blue ? 'text-blue-600 uppercase' : ''}`}>
            {value || '-'}
          </p>
        )}
      </div>
    </div>
  );
}

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
          {/* Información General (Legacy 2-Column Parity) */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
          <div className="px-10 py-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
              <Scale size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Información General</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Paridad Legacy 1:1</p>
            </div>
          </div>
          
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Row 1 */}
              <DetailField label="N° CARPETA 1:" value={data.folderNumber} />
              <DetailField label="NOMBRES DEL DEMANDANTE:" value={data.clientName} bold />
              
              {/* Row 2 */}
              <DetailField label="No. CARPETA 2:" value={(data as any).folderNumber2 || '-'} />
              <DetailField label="N° DE DOCUMENTO DEMANDANTE:" value={data.clientId} />
              
              {/* Row 3 */}
              <DetailField label="DESPACHO ORIGEN:" value={data.court} />
              <DetailField label="NOMBRES DEL DEMANDADO:" value={data.defendantName} bold />
              
              {/* Row 4 */}
              <DetailField label="N° DEL RADICADO INICIAL:" value={data.radicadoIni} mono />
              <DetailField label="N° DE DOCUMENTO DEMANDADO O NIT:" value={data.defendantId} />
              
              {/* Row 5 */}
              <DetailField label="FECHA DEL RADICADO INICIAL:" value={data.creationDate} />
              <DetailField label="NOMBRES DEL APODERADO:" value={data.lawyerName} />
              
              {/* Row 6 */}
              <DetailField label="N° DEL RADICADO DEL TRIBUNAL:" value={(data as any).radicadoTribunal || '-'} />
              <DetailField label="N° DE DOCUMENTO DEL APODERADO:" value={data.lawyerId} />
              
              {/* Row 7 */}
              <DetailField label="MAGISTRADO DEL TRIBUNAL:" value={data.magistrate} italic />
              <DetailField label="NEGOCIO:" value={(data as any).businessLine} blue />
              
              {/* Row 8 */}
              <DetailField label="JURISDICCIÓN:" value={data.jurisdiction} />
              <DetailField label="NÚMERO RADICACIÓN (COMPLETO):" value={(data as any).radicadoUlt} mono />
              
              {/* Row 9 */}
              <DetailField label="CLASE DE PROCESO:" value={data.processClass} />
              <DetailField label="RADICADO DE LA CORTE:" value={(data as any).radicadoCorte || '-'} />
              
              {/* Row 10 */}
              <DetailField label="ESTADO DE PROCESO:" value={data.status} badge />
              <DetailField label="MAGISTRADO DE LA CORTE:" value={(data as any).magistrateCorte || '-'} italic />
              
              {/* Row 11 */}
              <DetailField label="SENTENCIA DEL JUZGADO:" value={data.sentenceJuzgado} />
              <DetailField label="CASACIÓN:" value={(data as any).casacion || '-'} />
              
              {/* Row 12 */}
              <DetailField label="SENTENCIA DEL TRIBUNAL:" value={data.sentenceTribunal} />
              <div className="hidden md:block"></div>

              {/* Row 13 - Full Width Description */}
              <div className="md:col-span-2 mt-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">DESCRIPCIÓN:</p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[100px]">
                  <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase">{data.description || 'SIN DESCRIPCIÓN RELEVANTE'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>


          {/* Deceased Data */}
          {data.deceased && (
            <div className="grid grid-cols-1 gap-8">
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
               {data.folder && (
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calculator size={18} className="text-emerald-500" />
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mesadas e ISS</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
                        <p className="text-[8px] font-black text-emerald-500 uppercase mb-1">Mesada Jub</p>
                        <p className="text-xs font-bold text-emerald-700">${data.folder.initialMesadaJubilation || '0'}</p>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
                        <p className="text-[8px] font-black text-emerald-500 uppercase mb-1">Mesada ISS</p>
                        <p className="text-xs font-bold text-emerald-700">${data.folder.initialMesadaIss || '0'}</p>
                      </div>
                    </div>
                 </div>
               )}

               <div className="space-y-4 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-slate-400" />
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Grupo Familiar</h4>
                  </div>
                  <div className="space-y-3">
                    {data.family && (data.family as FamilyMember[]).slice(0, 3).map((member: FamilyMember, i: number) => (
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
                          {pret.documents.slice(0, 2).map((doc, di: number) => (
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
      <div className="max-w-7xl mx-auto space-y-12 px-6">
        {/* Historial de Actuaciones (Interactive Table) */}
        <ActuacionesTable annotations={data.annotations} processId={processId} />

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
                {data.annexes.map((file) => (
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
                     <a href={file.filePath || undefined} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white rounded-xl transition-all">
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

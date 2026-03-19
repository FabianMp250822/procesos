import { getPensionerFolder } from "@/lib/actions/pensioner";
import { notFound } from "next/navigation";
import { Shield, User, Landmark, Clock, FileText, Users, Printer, Edit2, History, FolderOpen, Plus } from "lucide-react";
import Link from "next/link";
import { FamilyGroupManager } from "@/components/pensioners/family-group";

export default async function PensionerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const folder = await getPensionerFolder(id);

  if (!folder) notFound();

  const sections = [
    { title: "DATOS BÁSICOS", icon: User, id: "basicos" },
    { title: "PERFIL PENSIÓN JUBILACIÓN", icon: Shield, id: "perfil" },
    { title: "RECONOCIMIENTO DE PENSIÓN", icon: Landmark, id: "reconocimiento" },
    { title: "PERFIL PENSIÓN LEGAL", icon: FileText, id: "legal" },
    { title: "SUSTITUCIÓN", icon: Users, id: "sustitucion" },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-6 rounded-3xl border border-border sticky top-20 z-40 glass shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-2xl text-primary border border-primary/30">
            <FolderOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight leading-none">Carpeta: {folder.folderNumber}</h1>
            <p className="text-sm text-muted-foreground font-bold">{folder.firstNames} {folder.lastNames}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase hover:brightness-110 transition-all">
            <Edit2 size={14} /> Modificar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl font-bold text-xs uppercase hover:brightness-110 transition-all">
            <Printer size={14} /> Imprimir
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl font-bold text-xs uppercase hover:bg-muted transition-all">
            <History size={14} /> Seguimientos
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl font-bold text-xs uppercase hover:bg-muted transition-all">
            <FileText size={14} /> Estado Doc.
          </button>
          <Link href={`/dashboard/processes/new?cedula=${folder.clientId}`} className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-xl font-bold text-xs uppercase hover:brightness-110 transition-all">
            <Plus size={14} /> Agregar Proceso
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:bg-primary/5 hover:border-primary/30 transition-all group">
              <s.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-[11px] font-black uppercase tracking-wider">{s.title}</span>
            </a>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-9 space-y-12">
          {/* Datos Basicos */}
          <section id="basicos" className="bg-card rounded-3xl border border-border overflow-hidden shadow-xl">
            <div className="bg-primary px-8 py-4 flex items-center justify-between">
              <h2 className="text-primary-foreground font-black uppercase tracking-[0.2em] text-sm">Datos Básicos</h2>
              <User size={18} className="text-primary-foreground/50" />
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DataField label="Cédula" value={folder.clientId} />
              <DataField label="Apellidos" value={folder.lastNames} />
              <DataField label="Nombres" value={folder.firstNames} />
              <DataField label="Fecha Nacimiento" value={folder.birthDate} />
              <DataField label="Edad Actual" value={folder.calculated.ageFormatted} />
              <DataField label="Expectativa Vida" value={folder.calculated.lifeExpectancy.toString()} />
              <DataField label="Género" value={folder.gender} />
              <DataField label="Dirección" value={folder.addressRes} />
              <DataField label="Ciudad" value={folder.jurisdiction} />
              <DataField label="Distrito" value={folder.district} />
              <DataField label="Teléfono" value={folder.phoneFixed} />
              <DataField label="Celular" value={folder.phoneActual} />
              <DataField label="Email" value={folder.email} className="lowercase" />
              <DataField label="Asociación" value={folder.association} />
              <DataField label="Grupo/Empresa" value={folder.group} />
              <DataField label="Grupo 2" value={folder.group2} />
            </div>
          </section>

          {/* Perfil Pension */}
          <section id="perfil" className="bg-card rounded-3xl border border-border overflow-hidden shadow-xl">
            <div className="bg-secondary px-8 py-4 flex items-center justify-between">
              <h2 className="text-secondary-foreground font-black uppercase tracking-[0.2em] text-sm">Perfil Pensión Jubilación</h2>
              <Shield size={18} className="text-secondary-foreground/50" />
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <DataField label="Clase" value={folder.condition} />
              <DataField label="Tipo" value={folder.type} />
            </div>
          </section>

          {/* Reconocimiento */}
          <section id="reconocimiento" className="bg-card rounded-3xl border border-border overflow-hidden shadow-xl">
            <div className="bg-muted px-8 py-4 flex items-center justify-between border-b border-border">
              <h2 className="text-foreground font-black uppercase tracking-[0.2em] text-sm">Reconocimiento & Tiempo</h2>
              <Landmark size={18} className="text-muted-foreground" />
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <DataField label="Acto" value={folder.recognitionAct} />
                <DataField label="A Partir" value={folder.startDatePension} />
                <DataField label="Fecha Ingreso" value={folder.entryDateCompany} />
                <DataField label="Fecha Egreso" value={folder.exitDateCompany} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DataField label="Fecha Acto" value={folder.recognitionDateJubilation} />
                <DataField label="Edad Jubilación" value={folder.ageAtJubilation} />
                <DataField label="Mesada Inicial" value={folder.initialMesadaJubilation} />
              </div>
              <div className="bg-muted/50 p-6 rounded-2xl border border-border/50">
                <p className="text-[10px] font-black text-muted-foreground uppercase mb-2">Tiempo de Servicio:</p>
                <p className="text-xl font-black text-primary uppercase">{folder.calculated.serviceTimeFormatted}</p>
              </div>
            </div>
          </section>

          {/* Legal */}
          <section id="legal" className="bg-card rounded-3xl border border-border overflow-hidden shadow-xl">
            <div className="bg-primary/5 px-8 py-4 flex items-center justify-between border-b border-border">
              <h2 className="text-primary font-black uppercase tracking-[0.2em] text-sm">Perfil Pensión Legal (ISS/Colpensiones)</h2>
              <Clock size={18} className="text-primary/50" />
            </div>
            <div className="p-8 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DataField label="Resolución" value={folder.resColpensiones} />
                <DataField label="Fecha Resolución" value={folder.resDate} />
                <DataField label="A Partir de" value={folder.initialDateIss} />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DataField label="Mesada Inicial" value={folder.initialMesadaIss} />
                <DataField label="Semanas" value={folder.totalWeeks} />
                <DataField label="Tasa" value={folder.replacementRate} />
               </div>
               <div className="border-t border-border pt-8 mt-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Compartición</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <DataField label="Fecha Compartición" value={folder.compartitionDate} />
                  <DataField label="Valor Antes" value={folder.valueBeforeCompartition} />
                  <DataField label="Retroactivo Susp." value={folder.retroactiveSuspense} />
                  <DataField label="Fecha Descomp." value={folder.descompartibilidadDate} />
                  <DataField label="A Cargo Empresa" value={folder.valueAtChargeOfCompany} />
                </div>
               </div>
            </div>
          </section>

          {/* Sustitucion & Family */}
          <section id="sustitucion" className="bg-card rounded-3xl border border-border overflow-hidden shadow-xl mb-20">
            <div className="bg-destructive/10 px-8 py-4 flex items-center justify-between border-b border-border">
              <h2 className="text-destructive font-black uppercase tracking-[0.2em] text-sm">Sustitución & Grupo Familiar</h2>
              <Users size={18} className="text-destructive/50" />
            </div>
            <div className="p-8 space-y-12">
              <div className="pb-12 border-b border-border">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Información de Fallecidos</h3>
                {folder.deceasedId ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DataField label="Cédula Fallecido" value={folder.deceasedId} />
                    <DataField label="Nombre Fallecido" value={folder.deceasedName} />
                    <DataField label="Res. ISS Finado" value={folder.deceasedResIss} />
                    <DataField label="Fecha Res. Finado" value={folder.deceasedResDate} />
                  </div>
                ) : (
                  <div className="text-center py-6 bg-muted/20 rounded-2xl border border-dashed border-border">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">No hay registro de fallecimiento para este titular</p>
                  </div>
                )}
              </div>

              <FamilyGroupManager cedula={folder.clientId as string} initialMembers={folder.family} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DataField({ label, value, className }: { label: string; value: string | null | undefined; className?: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className={`text-xs font-bold text-foreground border-b border-border/50 pb-1 ${className}`}>{value || "---"}</p>
    </div>
  );
}

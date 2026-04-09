import Link from "next/link";
import { auth, signOut } from "@/auth";
import { 
  Search, 
  ChevronRight, 
  Download, 
  UserPlus, 
  UserSearch, 
  FolderPlus, 
  FolderOpen, 
  Filter, 
  FileText, 
  ShieldCheck, 
  Globe, 
  Calendar,
  ListChecks,
  Users,
  Plus,
  Scale,
  Clock,
  BarChart3
} from "lucide-react";
import { ExportButton } from "@/components/reports/export-button";
import { exportDemandantes, exportProcesos, exportInvDoc } from "@/lib/actions/reports";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-inter">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Belleza&family=Inter:wght@400;600;700;800;900&display=swap" />
      <header className="h-20 bg-[#012340] border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#C59D5F] rounded-xl flex items-center justify-center text-[#012340] font-black group-hover:rotate-6 transition-all shadow-[0_5px_15px_rgba(197,157,95,0.3)]">DA</div>
            <div className="flex flex-col">
              <span className="font-belleza uppercase tracking-[0.2em] text-white text-lg leading-none">Dajusticia</span>
              <span className="text-[9px] text-[#C59D5F] font-black uppercase tracking-[0.3em] mt-1">Legal Intelligence</span>
            </div>
          </Link>
          
          <nav className="hidden xl:flex items-center gap-1 ml-12">
            {/* GESTIONES */}
            <NavDropdown label="Gestiones">
              <NavSubMenu label="GESTIÓN DE CLIENTES">
                <NavLink href="/dashboard/clients/new" icon={<UserPlus size={14} />} label="AGREGAR CLIENTE" />
                <NavLink href="/dashboard/clients" icon={<UserSearch size={14} />} label="CONSULTAR CLIENTE" />
              </NavSubMenu>
              <NavSubMenu label="GESTIÓN DE CLIENTES (ARCHIVO)">
                <NavLink href="/dashboard/pensioners/new" icon={<UserPlus size={14} />} label="AGREGAR CLIENTE (ARC)" />
                <NavLink href="/dashboard/pensioners" icon={<FolderOpen size={14} />} label="CONSULTAR CLIENTE (ARC)" />
                <NavLink href="/dashboard/pensioners/advanced" icon={<Filter size={14} />} label="BÚSQ. AVANZADA (ARC)" />
              </NavSubMenu>
              <NavSubMenu label="GESTIÓN DE ABOGADOS">
                <NavLink href="/dashboard/lawyers/new" icon={<Scale size={14} />} label="AGREGAR ABOGADO" />
                <NavLink href="/dashboard/lawyers" icon={<Users size={14} />} label="CONSULTAR ABOGADO" />
              </NavSubMenu>
              <NavSubMenu label="GESTIÓN DE PROCESOS">
                <NavLink href="/dashboard/processes/new" icon={<Plus size={14} />} label="AGREGAR PROC." />
                <NavLink href="/dashboard/processes" icon={<Search size={14} />} label="CONSULTAR PROC." />
                <NavLink href="/dashboard/processes/advanced" icon={<Filter size={14} />} label="BUSQ. AVANZADA" />
                <NavLink href="/dashboard/processes/inventory" icon={<FileText size={14} />} label="INVENTARIO PROC." />
              </NavSubMenu>
            </NavDropdown>

            {/* CONSULTAS */}
            <NavDropdown label="CONSULTAS VARIAS">
              <NavLink href="/dashboard/pensioners" icon={<Users size={14} />} label="CLIENTES (ARCHIVO)" />
              <NavLink href="/dashboard/pensioners/advanced" icon={<Filter size={14} />} label="CLIENTES (ARC) AVANZADA" />
              <NavLink href="/dashboard/clients" icon={<UserSearch size={14} />} label="CLIENTES" />
              <NavLink href="/dashboard/contacts/data" icon={<FileText size={14} />} label="DATOS CLIENTES" />
              <NavLink href="/dashboard/pensioners" icon={<ShieldCheck size={14} />} label="PENSIONADOS" />
              <NavLink href="/dashboard/processes" icon={<Search size={14} />} label="PROCESOS" />
              <NavLink href="/dashboard/processes/advanced" icon={<Filter size={14} />} label="PROCESOS AVANZADA" />
              <NavLink href="/dashboard/search" icon={<Globe size={14} />} label="BÚSQUEDA GENERAL" />
            </NavDropdown>

            {/* AGENDA */}
            <NavDropdown label="Agenda">
              <NavLink href="/dashboard/agenda/pending" icon={<Clock size={14} />} label="PENDIENTES" />
              <NavLink href="/dashboard/agenda/by-date" icon={<Calendar size={14} />} label="POR FECHA" />
              <div className="h-px bg-white/5 my-1" />
              <NavLink href="/dashboard/tasks/new" icon={<Plus size={14} />} label="NUEVA TAREA" />
              <NavLink href="/dashboard/tasks" icon={<ListChecks size={14} />} label="VER TAREAS" />
            </NavDropdown>

            {/* REPORTES */}
            <NavDropdown label="Reportes">
              <NavLink href="/dashboard/reports" icon={<BarChart3 size={14} />} label="DASHBOARD ADM." />
              <div className="h-px bg-white/5 my-1" />
              <NavLink href="/dashboard/reports/contacts-ppa" icon={<Users size={14} />} label="CONTACTOS PPA" />
              <NavLink href="/dashboard/reports/annotations" icon={<FileText size={14} />} label="ANOTACIONES" />
              <div className="h-px bg-white/5 my-1" />
              <div className="px-3 pb-2">
                <ExportButton label="DEMANDANTES (EXCEL)" action={exportDemandantes} />
                <ExportButton label="PROCESOS (EXCEL)" action={exportProcesos} />
                <ExportButton label="INV. DOC (EXCEL)" action={exportInvDoc} />
              </div>
            </NavDropdown>
          </nav>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:bg-white/10 transition-all w-72">
            <Search size={16} className="text-[#C59D5F]" />
            <input placeholder="Buscador inteligente..." className="bg-transparent border-none outline-none text-xs text-white px-3 w-full placeholder:text-white/20 font-medium" />
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block border-r border-white/10 pr-5">
              <p className="text-[11px] font-black text-white uppercase tracking-widest">{session?.user?.name}</p>
              <p className="text-[9px] text-[#C59D5F] font-black uppercase tracking-[0.2em] mt-0.5">{(session?.user as unknown as { role?: string })?.role === 'X' ? 'ADMINISTRADOR' : 'CONSULTOR'}</p>
            </div>
            <form action={async () => {
              "use server";
              await signOut();
            }}>
              <button className="text-[10px] font-black uppercase tracking-[0.15em] text-[#C59D5F] hover:text-white bg-[#C59D5F]/10 hover:bg-[#C59D5F] px-4 py-2.5 rounded-xl transition-all border border-[#C59D5F]/30 shadow-sm active:scale-95">
                Cerrar Sesión
              </button>
            </form>
          </div>
        </div>
      </header>
        <main className="flex-1 container mx-auto p-8 relative z-10">
          {children}
        </main>
      </div>
    );
  }

  /* --- Navigation Sub-components --- */

  function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div className="relative group">
        <button className="px-5 py-8 text-[11px] font-black uppercase tracking-[0.25em] text-white/50 group-hover:text-[#C59D5F] transition-all flex items-center gap-1.5 active:scale-95">
          {label}
          <ChevronRight size={12} className="rotate-90 group-hover:translate-y-1 transition-transform opacity-30 group-hover:opacity-100" />
        </button>
        <div className="absolute left-0 mt-0 w-64 bg-white border border-slate-100 rounded-[2rem] shadow-[0_20px_50px_rgba(1,35,64,0.15)] py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-[100]">
          {children}
        </div>
      </div>
    );
  }

  function NavSubMenu({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div className="relative group/sub px-3">
        <div className="flex items-center justify-between px-4 py-3 text-[10px] font-black text-slate-400 tracking-[0.15em] hover:bg-slate-50 rounded-2xl cursor-default group-hover/sub:text-[#012340] group-hover/sub:bg-slate-50 transition-all">
          <span>{label}</span>
          <ChevronRight size={12} className="opacity-20" />
        </div>
        <div className="absolute left-full top-0 ml-1 w-60 bg-white border border-slate-100 rounded-[2rem] shadow-2xl py-3 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform translate-x-4 group-hover/sub:translate-x-0 z-[110]">
          {children}
        </div>
      </div>
    );
  }

  function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
      <Link href={href} className="flex items-center gap-3.5 px-5 py-3 text-[11px] font-black text-slate-500 hover:text-[#012340] hover:bg-[#F8F9FA] rounded-[1.2rem] transition-all group/link mx-3">
        <span className="text-slate-300 group-hover/link:text-[#C59D5F] transition-colors">{icon}</span>
        <span className="tracking-widest uppercase">{label}</span>
      </Link>
    );
  }

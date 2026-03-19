import { db } from "@/db/db.server";
import { clients } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { Phone, Mail, MapPin, User, Search, Filter } from "lucide-react";
import { Suspense } from "react";

export default async function ContactsPPAReportPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary rounded-xl text-secondary-foreground font-bold">
            <Phone size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Directorio PPA</h1>
            <p className="text-sm text-muted-foreground font-bold">Contactos del plan de pensiones</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-[10px] font-black uppercase hover:bg-muted transition-all">
             <Filter size={14} /> Filtrar PPA I / II / III
           </button>
        </div>
      </div>

      <Suspense fallback={<div className="text-center py-20 font-bold uppercase text-muted-foreground animate-pulse">Cargando directorio...</div>}>
        <ContactsList />
      </Suspense>
    </div>
  );
}

async function ContactsList() {
  // Logic: In legacy this used a specific 'directorio_ppa' table. 
  // For now we'll fetch from 'clientes' where group contains PPA as parity.
  const results = await db.select()
    .from(clients)
    .where(and(eq(clients.group, "PPA")))
    .orderBy(desc(clients.id));

  if (results.length === 0) {
    return (
      <div className="text-center py-20 bg-card border border-dashed border-border rounded-3xl opacity-50">
        <p className="text-sm font-black uppercase tracking-widest">No se hallaron contactos vinculados a PPA</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((c) => (
        <div key={c.id} className="bg-card border border-border p-6 rounded-3xl shadow-xl hover:border-primary/30 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-tight line-clamp-1">{c.firstNames} {c.lastNames}</p>
              <p className="text-[10px] text-muted-foreground font-black uppercase">{c.id}</p>
            </div>
          </div>

          <div className="space-y-3">
             <ContactItem icon={Phone} label="Teléfonos" value={`${c.phone1 || ''} ${c.phone2 || ''} ${c.phoneRes || ''}`.trim() || '---'} />
             <ContactItem icon={Mail} label="Email" value={c.email || '---'} className="lowercase" />
             <ContactItem icon={MapPin} label="Dirección" value={c.addressRes || '---'} />
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-[9px] font-black uppercase px-2 py-1 bg-secondary/10 text-secondary rounded">
              PPA
            </span>
            <button className="text-[10px] font-black uppercase text-primary hover:underline">
              Ver Expediente
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, className }: { icon: React.ElementType; label: string; value: string; className?: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={14} className="text-muted-foreground shrink-0 mt-0.5" />
      <div>
        <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">{label}</p>
        <p className={`text-[10px] font-bold text-foreground line-clamp-1 ${className}`}>{value}</p>
      </div>
    </div>
  );
}

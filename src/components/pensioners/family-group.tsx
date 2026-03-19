"use client";

import { useState } from "react";
import { Users, Plus, Trash2, Calendar, User as UserIcon } from "lucide-react";
import { addFamilyMember } from "@/lib/actions/pensioner";

interface Member {
  memberId: string;
  firstNames: string | null;
  relationship: string | null;
  birthDate: string | null;
}

export function FamilyGroupManager({ cedula, initialMembers }: { cedula: string, initialMembers: Member[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await addFamilyMember(cedula, formData);
    if (result.success) {
      // Refresh list (simplified)
      window.location.reload();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Grupo Familiar</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
        >
          {showForm ? "Cerrar" : <Plus size={16} />}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-muted/30 p-6 rounded-2xl border border-border grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground">Identidad</label>
            <input name="iden_afi" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground">Nombres</label>
            <input name="nombres" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground">Parentesco</label>
            <input name="parentesco" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground">Tipo Cotizante</label>
            <select name="tipo_cotizante" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs">
              <option>Beneficiario</option>
              <option>Cotizante 2do</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground">Fecha Nacimiento</label>
            <input name="fecha_nac" type="date" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground">Dirección</label>
            <input name="direccion" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground">Municipio</label>
            <input name="municipio" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground">Teléfono</label>
            <input name="telefono" required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs" />
          </div>
          <button className="md:col-span-2 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-xs uppercase hover:brightness-110">
            Agregar Miembro
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m) => (
          <div key={m.memberId} className="bg-card border border-border p-4 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                <UserIcon size={14} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-tight">{m.firstNames}</p>
                <p className="text-[10px] font-bold text-muted-foreground">ID: {m.memberId}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                   <span className="uppercase">{m.relationship}</span>
                   <span className="text-border">|</span>
                   <span className="flex items-center gap-1"><Calendar size={10} /> {m.birthDate}</span>
                </div>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {members.length === 0 && !showForm && (
          <p className="col-span-2 text-center py-8 text-xs font-bold text-muted-foreground uppercase opacity-50 italic">No hay registros de grupo familiar</p>
        )}
      </div>
    </div>
  );
}

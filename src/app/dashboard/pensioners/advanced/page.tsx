import { getPensionersAdvanced } from "@/lib/actions/pensioner";
import { SearchCode, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function AdvancedPensionersPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    group?: string; 
    district?: string; 
    association?: string; 
    type?: string; 
    condition?: string;
    id?: string;
    firstNames?: string;
    lastNames?: string;
  }>;
}) {
  const filters = await searchParams;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary rounded-xl text-primary-foreground">
          <SearchCode size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Búsqueda Avanzada de Pensionados</h1>
          <p className="text-sm text-muted-foreground font-bold">Filtros específicos de archivo de carpetas</p>
        </div>
      </div>

      <div className="bg-card border border-border p-8 rounded-3xl shadow-xl glass">
        <form action="/dashboard/pensioners/advanced" method="GET" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FilterSelect label="Grupo/Empresa" name="group" defaultValue={filters.group}>
            <option value="1">TODOS LOS GRUPOS</option>
            <option value="ELECTRIFICADORA">ELECTRIFICADORA</option>
            <option value="COLPENSIONES">COLPENSIONES</option>
            <option value="CORELCA">CORELCA</option>
            <option value="BAVARIA">BAVARIA</option>
            <option value="GEMSELCA">GECELCA</option>
            <option value="GEMSELCA">TRANSELCA</option>
          </FilterSelect>

          <FilterSelect label="Distrito" name="district" defaultValue={filters.district}>
            <option value="1">TODOS LOS DISTRITOS</option>
            <option value="ATLANTICO">ATLANTICO</option>
            <option value="BARRANQUILLA">BARRANQUILLA</option>
            <option value="BOLIVAR">BOLIVAR</option>
            <option value="CESAR">CESAR</option>
            <option value="CORDOBA">CORDOBA</option>
            <option value="GUAJIRA">GUAJIRA</option>
          </FilterSelect>

          <FilterSelect label="Asociación" name="association" defaultValue={filters.association}>
            <option value="1">TODAS LAS ASOCIACIONES</option>
            <option value="ASOJECOSTA">ASOJECOSTA</option>
            <option value="ASO-GUAJIRA">ASO-GUAJIRA</option>
            <option value="ASO-CORDOBA 1">ASO-CORDOBA 1</option>
            <option value="ASO-CORDOBA 2">ASO-CORDOBA 2</option>
            <option value="ASOPELIS">ASOPELIS</option>
            <option value="ASOJEBOL">ASOJEBOL</option>
            <option value="SIN AFILIACION">SIN AFILIACION</option>
          </FilterSelect>

          <FilterSelect label="Tipo de Pensión" name="type" defaultValue={filters.type}>
            <option value="1">TODOS LOS TIPOS</option>
            <option value="COMPARTIDA">COMPARTIDA</option>
            <option value="CONVENCIONAL">CONVENCIONAL</option>
            <option value="EXCLUIDO(A)">EXCLUIDO(A)</option>
            <option value="PPA I">PPA I</option>
            <option value="PPA II">PPA II</option>
            <option value="PPA III">PPA III</option>
            <option value="PRV">PRV</option>
          </FilterSelect>

          <FilterSelect label="Condición" name="condition" defaultValue={filters.condition}>
            <option value="1">TODAS LAS CONDICIONES</option>
            <option value="TITULAR">TITULAR</option>
            <option value="SUSTITUTO(A)">SUSTITUTO(A)</option>
          </FilterSelect>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Cédula</label>
            <input name="id" defaultValue={filters.id} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-primary outline-none transition-all" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Nombres</label>
            <input name="firstNames" defaultValue={filters.firstNames} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-primary outline-none transition-all uppercase" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Apellidos</label>
            <input name="lastNames" defaultValue={filters.lastNames} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-primary outline-none transition-all uppercase" />
          </div>

          <div className="lg:col-span-3 pt-6 flex justify-end">
            <button type="submit" className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm uppercase flex items-center gap-2 hover:brightness-110 transition-all">
              <Filter size={18} /> Aplicar Filtros
            </button>
          </div>
        </form>
      </div>

      <Suspense fallback={<div className="text-center py-10">Realizando búsqueda...</div>}>
         <SearchResults filters={filters} />
      </Suspense>
    </div>
  );
}

interface AdvancedFilters {
  group?: string;
  district?: string;
  association?: string;
  type?: string;
  condition?: string;
  id?: string;
  firstNames?: string;
  lastNames?: string;
}

async function SearchResults({ filters }: { filters: AdvancedFilters }) {
  // Only search if any filter is set (not "1")
  const hasFilters = Object.values(filters).some(v => v && v !== "1");
  if (!hasFilters) return null;

  const results = await getPensionersAdvanced(filters);

  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-border bg-muted/30">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
           Resultados hallados: <span className="text-primary">{results.length}</span>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-4 font-black uppercase">Carpeta</th>
              <th className="px-6 py-4 font-black uppercase">Cédula</th>
              <th className="px-6 py-4 font-black uppercase">Nombre</th>
              <th className="px-6 py-4 font-black uppercase">Asociación</th>
              <th className="px-6 py-4 font-black uppercase text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {results.map((r) => (
              <tr key={r.clientId} className="hover:bg-primary/5 transition-colors group">
                <td className="px-6 py-4 font-black text-primary">{r.folderNumber}</td>
                <td className="px-6 py-4 font-bold">{r.clientId}</td>
                <td className="px-6 py-4 font-black uppercase tracking-tight">{r.firstNames} {r.lastNames}</td>
                <td className="px-6 py-4 text-muted-foreground font-bold">{r.association}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/dashboard/pensioners/${r.clientId}`} className="text-primary hover:underline font-black uppercase tracking-tighter inline-flex items-center gap-1">
                    Ver <ArrowRight size={10} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterSelect({ label, name, defaultValue, children }: { label: string; name: string; defaultValue?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</label>
      <select name={name} defaultValue={defaultValue || "1"} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-primary outline-none appearance-none transition-all">
        {children}
      </select>
    </div>
  );
}

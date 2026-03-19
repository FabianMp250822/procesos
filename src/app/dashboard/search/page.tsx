import { performGlobalSearch } from "@/lib/actions/search";
import { Search, User, FolderOpen, Scale, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  
  if (!q) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-8 bg-blue-500/10 rounded-full text-blue-500 border border-blue-500/20">
            <Search size={64} />
        </div>
        <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Búsqueda General</h1>
            <p className="text-slate-400 mt-2 font-medium">Ingrese un nombre, cédula o radicado para comenzar.</p>
        </div>
      </div>
    );
  }

  const results = await performGlobalSearch(q);

  const totalResults = results.contacts.length + results.pensioners.length + results.processes.length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
            <Search className="text-blue-500" size={40} />
            Resultados de Búsqueda
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Buscando por: <span className="text-blue-400 font-black">&quot;{q}&quot;</span> — {totalResults} coincidencias encontradas.</p>
        </div>
      </div>

      {totalResults === 0 ? (
        <div className="py-20 text-center">
            <p className="text-2xl font-black text-slate-800 uppercase tracking-widest italic">Esta búsqueda no existe...!</p>
            <Link href="/dashboard/search" className="mt-8 inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Volver a intentar</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-16">
          
          {/* CONTACTOS */}
          {results.contacts.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 bg-white/5 w-fit px-6 py-2 rounded-full border border-white/5">
                <User size={18} className="text-blue-500" />
                <h2 className="font-black text-white uppercase tracking-widest text-sm italic">Contactos</h2>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">
                    <tr>
                      <th className="px-6 py-4">ID / Cédula</th>
                      <th className="px-6 py-4">Nombres</th>
                      <th className="px-6 py-4">Apellidos</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-blue-500/5 transition-all group">
                        <td className="px-6 py-4 font-mono text-sm text-blue-400 font-bold tracking-tight">{c.id}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-100 uppercase">{c.firstNames}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-100 uppercase">{c.lastNames}</td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/dashboard/clients?q=${c.id}`} className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white transition-all inline-block">
                            <ChevronRight size={18} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* CLIENTES (Pensionados) */}
          {results.pensioners.length > 0 && (
            <section className="space-y-6">
               <div className="flex items-center gap-3 bg-white/5 w-fit px-6 py-2 rounded-full border border-white/5">
                <FolderOpen size={18} className="text-blue-500" />
                <h2 className="font-black text-white uppercase tracking-widest text-sm italic">Clientes / Pensionados</h2>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">
                    <tr>
                      <th className="px-6 py-4">Cédula</th>
                      <th className="px-6 py-4">Nombre Completo</th>
                      <th className="px-6 py-4">N° Carpeta</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.pensioners.map((p) => (
                      <tr key={p.clientId} className="hover:bg-blue-500/5 transition-all group">
                        <td className="px-6 py-4 font-mono text-sm text-blue-400 font-bold tracking-tight">{p.clientId}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-100 uppercase">{p.firstNames} {p.lastNames}</td>
                        <td className="px-6 py-4 text-xs font-black text-orange-400">{p.folderNumber}</td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/dashboard/pensioners/${p.clientId}`} className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white transition-all inline-block">
                            <ChevronRight size={18} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* PROCESOS */}
          {results.processes.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 bg-white/5 w-fit px-6 py-2 rounded-full border border-white/5">
                <Scale size={18} className="text-blue-500" />
                <h2 className="font-black text-white uppercase tracking-widest text-sm italic">Procesos Judiciales</h2>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">
                    <tr>
                      <th className="px-6 py-4">Radicado</th>
                      <th className="px-6 py-4">Sujeto Procesal</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.processes.map((pr) => (
                      <tr key={pr.id} className="hover:bg-blue-500/5 transition-all group">
                        <td className="px-6 py-4 font-mono text-xs text-blue-400 font-bold tracking-tight">{pr.radicado}</td>
                        <td className="px-6 py-4">
                            <div className="text-sm font-bold text-slate-100 uppercase">{pr.clientName}</div>
                            <div className="text-[10px] text-slate-500 font-mono tracking-tighter">ID: {pr.clientId}</div>
                        </td>
                        <td className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{pr.status}</td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/dashboard/processes/${pr.id}`} className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white transition-all inline-block">
                            <ChevronRight size={18} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}

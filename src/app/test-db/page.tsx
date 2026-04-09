import { db } from "@/db/db.server";
import { folders, users } from "@/db/schema";
import { count } from "drizzle-orm";

export default async function TestPage() {
  let folderCount;
  let allUsers;
  let error;
  
  try {
    const [dbResult] = await db.select({ value: count() }).from(folders);
    folderCount = dbResult;
    allUsers = await db.select().from(users);
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600">Error de Conexión</h1>
        <pre className="mt-4 bg-slate-100 p-4 rounded text-xs leading-relaxed overflow-auto max-h-[500px]">
          {JSON.stringify(error, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-green-600">Conexión Exitosa</h1>
        <p className="mt-4 font-medium">Total de registros en `archivo_carpetas`: <strong>{folderCount?.value}</strong></p>
        <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Base de Datos: srv439.hstgr.io</p>
      </div>

      <div className="bg-white border rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-black text-[#012340] mb-6 uppercase italic">Usuarios en Base de Datos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-4 font-black uppercase tracking-wider text-[10px]">Usuario ID</th>
                <th className="pb-4 font-black uppercase tracking-wider text-[10px]">Contraseña (DB)</th>
                <th className="pb-4 font-black uppercase tracking-wider text-[10px]">Nivel</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {allUsers?.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-all">
                  <td className="py-4 font-bold text-[#012340]">"{u.id}"</td>
                  <td className="py-4 font-mono">"{u.password}"</td>
                  <td className="py-4 font-bold text-[#C59D5F]">{u.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

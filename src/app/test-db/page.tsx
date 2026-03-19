import { db } from "@/db/db.server";
import { folders } from "@/db/schema";
import { count } from "drizzle-orm";

export default async function TestPage() {
  try {
    const [result] = await db.select({ value: count() }).from(folders);
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-green-600">Conexión Exitosa</h1>
        <p className="mt-4">Total de registros en `archivo_carpetas`: <strong>{result.value}</strong></p>
        <p className="text-slate-500 text-sm mt-2">Conectado a srv439.hstgr.io</p>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600">Error de Conexión</h1>
        <pre className="mt-4 bg-slate-100 p-4 rounded text-xs">{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
}

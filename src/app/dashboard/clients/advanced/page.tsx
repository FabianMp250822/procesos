import { SearchCode } from "lucide-react";

export default function AdvancedClientsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary rounded-xl text-primary-foreground">
          <SearchCode size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight">Clientes Avanzada</h1>
          <p className="text-sm text-muted-foreground">Búsqueda avanzada de clientes con filtros específicos</p>
        </div>
      </div>
      <div className="bg-card border border-border p-8 rounded-3xl text-center opacity-50">
        <p className="text-xs font-black uppercase tracking-widest">Interfaz de búsqueda avanzada en desarrollo para coincidir con BusquedaAvanzada_AC.php</p>
      </div>
    </div>
  );
}

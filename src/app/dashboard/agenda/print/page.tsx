import { getAgendaReportData } from "@/lib/actions/agenda-report";
import { PrintButton } from "@/components/agenda/PrintButton";

export default async function AgendaPrintPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;
  const data = await getAgendaReportData(from, to);
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES');
  const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="bg-white min-h-screen p-0 sm:p-4 font-inter text-[#012340]">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Belleza&family=Inter:wght@400;600;700;800;900&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { 
            padding: 0 !important; 
            margin: 0 !important; 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page { 
            size: landscape; 
            margin: 0.5cm; 
          }
        }
        table { page-break-inside: auto; }
        tr { page-break-inside: avoid; page-break-after: auto; }
        thead { display: table-header-group; }
        tfoot { display: table-footer-group; }
      `}} />

      {/* Control Bar */}
      <div className="no-print mb-6 flex justify-between items-center bg-[#012340]/5 p-4 rounded-3xl border border-[#012340]/10 mx-auto max-w-[1200px]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#012340] rounded-xl flex items-center justify-center text-[#C59D5F] font-black">DA</div>
          <div>
            <h2 className="font-black text-[#012340] uppercase tracking-tight text-sm">Vista Previa: Agenda de Audiencias</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Modo Horizontal (Landscape) activado por defecto</p>
          </div>
        </div>
        <PrintButton />
      </div>

      <div className="max-w-[1250px] mx-auto border-t-[6px] border-[#012340] pt-6 bg-white px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#012340] rounded-xl flex items-center justify-center text-[#C59D5F] font-black text-xl">DA</div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight leading-none text-[#012340]">Dajusticia</h1>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C59D5F] mt-1">Legal Intelligence Platform</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-black uppercase tracking-tight text-[#012340]">
              Agenda de Audiencias de Procesos Actualizada
            </h2>
            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
              Impreso el {dateStr} a las {timeStr}
            </p>
          </div>
        </div>

        {/* Audiences Table */}
        <div className="mb-8">
          <table className="w-full border-collapse border border-slate-300 text-[10px]">
            <thead>
              <tr className="bg-[#012340] text-white">
                <th className="border border-white/20 p-2 uppercase w-[80px]">Fecha</th>
                <th className="border border-white/20 p-2 uppercase w-[50px]">Día</th>
                <th className="border border-white/20 p-2 uppercase w-[70px]">Hora</th>
                <th className="border border-white/20 p-2 uppercase text-left w-[180px]">Despacho / Ciudad</th>
                <th className="border border-white/20 p-2 uppercase w-[110px]">Radicado</th>
                <th className="border border-white/20 p-2 uppercase text-left w-[200px]">Demandante / Demandado</th>
                <th className="border border-white/20 p-2 uppercase text-left">Estado Procesal</th>
              </tr>
            </thead>
            <tbody>
              {data.audiences.map((a, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="border border-slate-300 p-2 text-center font-black">{a.date || '---'}</td>
                  <td className="border border-slate-300 p-2 text-center uppercase">{a.day || '---'}</td>
                  <td className="border border-slate-300 p-2 text-center font-bold">{a.hour || '---'}</td>
                  <td className="border border-slate-300 p-2">
                    <div className="font-black text-[#012340] leading-tight uppercase">{a.court}</div>
                    <div className="text-[8px] text-[#C59D5F] font-black mt-0.5 uppercase">Archivo: {a.caseId}</div>
                  </td>
                  <td className="border border-slate-300 p-2 text-center font-mono text-[9px] tracking-tighter">{a.radicado}</td>
                  <td className="border border-slate-300 p-2">
                    <div className="font-black uppercase text-[#012340] leading-tight">{a.demandante}</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">VS {a.demandado}</div>
                  </td>
                  <td className="border border-slate-300 p-2 leading-snug uppercase font-bold text-[9px] italic">
                    {a.proceduralStatus}
                  </td>
                </tr>
              ))}
              {data.audiences.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-400 uppercase font-black italic tracking-widest opacity-30">No hay audiencias programadas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pending Tasks Section */}
        <div className="mb-6">
          <div className="bg-[#012340]/10 border border-[#012340]/20 p-2 text-center text-[11px] font-black uppercase tracking-[0.3em] text-[#012340]">
            Tareas Pendientes (Generales)
          </div>
          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead className="bg-slate-50 italic">
              <tr>
                <th className="border border-slate-400 p-2 w-[120px] uppercase">Fecha</th>
                <th className="border border-slate-400 p-2 w-[60px] uppercase">Día</th>
                <th className="border border-slate-400 p-2 w-[80px] uppercase">Hora</th>
                <th className="border border-slate-400 p-2 text-left uppercase">Descripción de la Tarea</th>
              </tr>
            </thead>
            <tbody>
              {data.generalTasks.map((t, i) => (
                <tr key={i}>
                  <td className="border border-slate-400 p-2 text-center font-black">{t.date || '---'}</td>
                  <td className="border border-slate-400 p-2 text-center uppercase">{t.day || '---'}</td>
                  <td className="border border-slate-400 p-2 text-center font-bold">{t.hour || '---'}</td>
                  <td className="border border-slate-400 p-2 uppercase font-bold text-[9px]">{t.description}</td>
                </tr>
              ))}
              {data.generalTasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-300 italic uppercase font-bold">No hay tareas pendientes registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t-2 border-slate-100 pt-4 flex justify-between items-center opacity-50">
          <div className="text-[8px] font-black text-[#012340] uppercase tracking-widest">
            PROCESADO POR: DAJUSTICIA LEGAL INTELLIGENCE
          </div>
          <div className="text-[8px] font-black text-[#012340] uppercase">
            Pág. 1 / 1
          </div>
          <div className="text-[8px] font-black text-[#012340] uppercase tracking-widest">
            Powered by Titanium Platform
          </div>
        </div>
      </div>
    </div>
  );
}

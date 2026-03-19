"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales incorrectas");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#012340]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C59D5F]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-[0_30px_80px_rgba(1,35,64,0.12)] relative z-10 animate-in fade-in zoom-in duration-700 border border-slate-100">
        <div className="bg-[#012340] p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_#C59D5F,_transparent)]"></div>
          <h1 className="text-4xl font-black tracking-tighter italic uppercase relative z-10 leading-none">DAJUSTICIA</h1>
          <p className="text-[#C59D5F] text-[10px] mt-2 uppercase tracking-[0.4em] font-black relative z-10">Control de Procesos Titanium</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-12 space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#012340] tracking-tighter uppercase italic">Inicie Sesión</h2>
            <p className="text-sm font-medium text-[#4A4A4A]/50 tracking-wide">Acceda a la infraestructura legal corporativa.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-red-100 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#012340]/30 uppercase tracking-[0.2em] ml-2">Identificador</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-2xl px-6 py-4.5 text-sm text-[#012340] focus:outline-none focus:ring-4 focus:ring-[#012340]/5 focus:border-[#C59D5F]/50 transition-all font-bold placeholder:text-slate-300"
                placeholder="USUARIO CORPORATIVO"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#012340]/30 uppercase tracking-[0.2em] ml-2">Palabra Clave</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-2xl px-6 py-4.5 text-sm text-[#012340] focus:outline-none focus:ring-4 focus:ring-[#012340]/5 focus:border-[#C59D5F]/50 transition-all font-bold placeholder:text-slate-300"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#012340] hover:bg-[#C59D5F] text-white font-black py-5 rounded-2xl transition-all shadow-[0_15px_40px_rgba(1,35,64,0.25)] active:scale-95 disabled:opacity-50 text-[10px] uppercase tracking-[0.3em]"
          >
            {loading ? "Autenticando..." : "Ingresar al Ecosistema"}
          </button>

          <p className="text-center text-[9px] text-slate-300 font-black uppercase tracking-[0.25em] mt-5">
            Dajusticia &copy; {new Date().getFullYear()} • Legal Intelligence Platform
          </p>
        </form>
      </div>
    </div>
  );
}

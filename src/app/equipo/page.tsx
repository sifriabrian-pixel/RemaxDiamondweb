import type { Metadata } from "next";
import Link from "next/link";
import { agentCounts } from "@/lib/properties";

export const metadata: Metadata = { title: "Equipo completo — RE/MAX Diamond" };

// Nombres reales de agentes en el CSV del MLS (27/08/2026) — no todos tienen foto
// pública todavía (esos 5 están destacados en el home). Esta página existe para
// que "ver equipo completo" sea una promesa real, no un link decorativo.
const RECRUIT_WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero información sobre sumarme como asesor de RE/MAX Diamond.");

export default function FullTeamPage() {
  const agents = agentCounts();

  return (
    <main className="min-h-screen bg-cream pb-24 pt-28">
      <div className="mx-auto max-w-[900px] px-6 sm:px-10">
        <Link href="/#equipo" className="text-sm font-semibold text-navy/60 transition-colors hover:text-navy">
          ← Volver
        </Link>

        <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.02] text-navy">
          Los {agents.length} asesores de RE/MAX Diamond
        </h1>
        <p className="mt-3 max-w-[60ch] text-navy/60">
          Ordenados por propiedades activas a cargo (MLS Redremax). Cinco tienen foto
          pública en la home; el resto del equipo está acá, con nombre real y cantidad
          real de propiedades.
        </p>

        <ol className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
          {agents.map((agent, i) => (
            <li key={agent.name} className="flex items-center justify-between gap-4 py-3.5">
              <span className="flex items-baseline gap-4">
                <span className="w-6 shrink-0 font-display text-xs text-navy/35">{i + 1}</span>
                <span className="font-medium text-navy">{agent.name}</span>
              </span>
              <span className="shrink-0 text-sm text-navy/55">
                {agent.listings} {agent.listings === 1 ? "propiedad" : "propiedades"}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-3 border-t border-navy/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-navy/70">
            ¿Sos asesor inmobiliario y querés sumarte a la red más grande de la costa?
          </p>
          <a
            href={RECRUIT_WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-navy/30 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-cream"
          >
            Hablanos →
          </a>
        </div>
      </div>
    </main>
  );
}

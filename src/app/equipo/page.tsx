import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { broker, advisors } from "@/lib/team";

export const metadata: Metadata = { title: "Equipo completo — RE/MAX Diamond" };

const RECRUIT_WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero información sobre sumarme como asesor de RE/MAX Diamond.");

export default function FullTeamPage() {
  return (
    <main className="min-h-screen bg-cream pb-24 pt-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Link href="/#equipo" className="text-sm font-semibold text-navy/60 transition-colors hover:text-navy">
          ← Volver
        </Link>

        <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.02] text-navy">
          Los {advisors.length + 1} asesores de RE/MAX Diamond
        </h1>
        <p className="mt-3 max-w-[60ch] text-navy/60">
          Foto y nombre real de todo el equipo, con la cantidad de propiedades activas
          a cargo de cada uno (MLS Redremax).
        </p>

        <div className="mt-12 flex flex-col items-start gap-6 border border-navy/12 bg-navy px-7 py-8 text-cream sm:flex-row sm:items-center sm:gap-8 sm:px-10">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-red-bridge">
            <Image src={broker.photo} alt={broker.name} fill sizes="96px" className="object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-red">Broker</p>
            <p className="mt-1 font-display text-2xl font-extrabold">{broker.name}</p>
            <p className="mt-1 text-sm text-cream/60">{broker.listings} propiedades activas a cargo</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {advisors.map((agent) => (
            <div
              key={agent.slug}
              className="flex flex-col items-center gap-3 rounded-sm border border-navy/12 bg-white px-4 py-6 text-center"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-navy/10">
                <Image src={agent.photo} alt={agent.name} fill sizes="80px" className="object-cover" />
              </div>
              <p className="font-display text-sm font-bold leading-snug text-navy">{agent.name}</p>
              <p className="text-xs text-navy/60">
                {agent.listings} {agent.listings === 1 ? "propiedad" : "propiedades"}
              </p>
            </div>
          ))}
        </div>

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

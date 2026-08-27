"use client";

import { motion } from "framer-motion";

const WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero información sobre sumarme como asesor de RE/MAX Diamond.");

// Agentes reales del catálogo (MLS Redremax, 27/08/2026), ordenados por propiedades
// activas a cargo. Sin fotos todavía — avatar de iniciales hasta tener fotos reales
// del equipo; nunca un stock photo de relleno.
const AGENTS = [
  { name: "Yonny Tuarez Palacios", role: "Broker / Owner", listings: 56 },
  { name: "Luis Fernando Avila Gomez", role: "Asesor inmobiliario", listings: 78 },
  { name: "Alejandra Rivadeneira Mendez", role: "Asesora inmobiliaria", listings: 70 },
  { name: "María Gabriela Rodriguez Andrade", role: "Asesora inmobiliaria", listings: 64 },
  { name: "Humberto Horacio Mendoza Montesdeoca", role: "Asesor inmobiliario", listings: 55 },
  { name: "Carmen Alexandra Pozo Alvarez", role: "Asesora inmobiliaria", listings: 47 },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function TeamSection() {
  return (
    <section id="equipo" className="scroll-mt-24 bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-[1.02] text-navy">
            El equipo que conoce cada barrio de la costa.
          </h2>
          <p className="mt-4 text-navy/60">
            {/* 37: agentes distintos con al menos una propiedad "Activa" en el CSV MLS Redremax (27/08/2026). */}
            37 asesores activos en Manta y Manabí. Estos son los que hoy tienen más
            propiedades a cargo en el catálogo.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-navy/12 bg-navy/12 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 bg-cream px-7 py-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-cream">
                {initials(agent.name)}
              </div>
              <div>
                <p className="font-display text-base font-bold leading-snug text-navy">
                  {agent.name}
                </p>
                <p className="mt-0.5 text-sm text-navy/70">{agent.role}</p>
              </div>
              <p className="mt-auto text-xs font-semibold uppercase tracking-[0.08em] text-navy/70">
                {agent.listings} propiedades activas
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-navy/12 pt-8 sm:flex-row sm:items-center"
        >
          <p className="text-sm text-navy/70">
            ¿Querés ser parte del equipo? Sumate como asesor RE/MAX Diamond.
          </p>
          {/* Misma familia de botón que el CTA secundario del hero, en escala reducida:
              se lee como "la misma acción, más discreta", no como un elemento distinto. */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-navy/30 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-cream"
          >
            Escribinos por WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

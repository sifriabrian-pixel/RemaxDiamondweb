"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "866", label: "Propiedades activas", tone: "light" as const },
  // 697 + 169 = 866: filtrado por Status Listing "Activa" únicamente. Si se
  // recalcula, no usar el total de filas del CSV (incluye "Reservada").
  { value: "697 / 169", label: "En venta / en alquiler", tone: "dark" as const },
  {
    value: "Manta, Portoviejo, Jaramijó, Montecristi",
    label: "Zonas cubiertas",
    tone: "light" as const,
  },
];

export function StatsStrip() {
  return (
    <section
      id="catalogo"
      aria-labelledby="catalogo-heading"
      className="scroll-mt-24 border-b border-navy/10 bg-cream"
    >
      <h2 id="catalogo-heading" className="sr-only">
        Catálogo de propiedades RE/MAX Diamond
      </h2>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 border-navy/15 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`border-navy/15 px-8 py-12 sm:px-10 sm:py-16 ${
              i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
            } ${stat.tone === "dark" ? "bg-navy text-cream" : "text-navy"}`}
          >
            <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.05]">
              {stat.value}
            </p>
            <p
              className={`mt-3 text-xs font-semibold uppercase tracking-[0.1em] ${
                stat.tone === "dark" ? "text-cream/55" : "text-navy/70"
              }`}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
      {/* Antes decía "Datos del catálogo real de RE/MAX Diamond (MLS Redremax,
          actualizado 27/08/2026)" — el cliente pidió sacar el nombre del sistema
          interno y la fecha exacta (hay que actualizarla a mano). Fuente real:
          export del MLS Redremax del 27/08/2026, ver data/properties.json. */}
      <p className="mx-auto max-w-[1400px] px-8 pb-10 text-xs text-navy/70 sm:px-10">
        Actualizado esta semana.
      </p>
    </section>
  );
}

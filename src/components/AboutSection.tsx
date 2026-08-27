"use client";

import { motion } from "framer-motion";

// Cifras y datos acá son todos verificables (CSV del MLS + remax.com.ec/diamond).
// Lo que NO está confirmado (año de fundación, cantidad de operaciones cerradas,
// certificaciones) se deja fuera del copy en vez de inventar un número que suene
// bien — pedirle a Brian/Yonny esos datos reales antes de agregarlos acá.
const FACTS = [
  { value: "866", label: "propiedades activas en el catálogo" },
  { value: "4", label: "zonas de cobertura: Manta, Portoviejo, Jaramijó, Montecristi" },
  { value: "37", label: "asesores inmobiliarios activos" },
];

export function AboutSection() {
  return (
    <section className="bg-navy py-24 text-cream sm:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-[1.02]">
            Franquicia RE/MAX, con equipo propio en Manta.
          </h2>
          <p className="mt-5 max-w-[58ch] leading-relaxed text-cream/75">
            RE/MAX Diamond es la oficina de la red RE/MAX en Manta, liderada por el
            broker Yonny Tuárez Palacios. No es un portal genérico con vendedores
            rotando cada seis meses: es un equipo fijo que trabaja el catálogo real de
            la oficina, zona por zona.
          </p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-6 border-t border-cream/15 pt-8 sm:grid-cols-3 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
        >
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="font-display text-3xl font-extrabold">{fact.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-cream/60">{fact.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

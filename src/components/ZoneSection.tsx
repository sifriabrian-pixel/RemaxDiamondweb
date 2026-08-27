"use client";

import { motion } from "framer-motion";

const ZONES = ["Manta", "Portoviejo", "Jaramijó", "Montecristi"];

export function ZoneSection() {
  return (
    <section className="bg-cream-dim py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-[1.02] text-navy">
            Manta y Manabí, no cualquier costa.
          </h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-navy/70">
            Manta tiene puerto y aeropuerto internacional propios — conecta la costa
            central de Ecuador con el resto del país y con el exterior. El catálogo de
            RE/MAX Diamond cubre la ciudad y sus alrededores, con presencia real en
            cuatro zonas:
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {ZONES.map((zone) => (
              <li
                key={zone}
                className="rounded-sm border border-navy/20 px-3.5 py-1.5 text-sm font-medium text-navy"
              >
                {zone}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="aspect-[4/3] overflow-hidden border border-navy/12"
        >
          <iframe
            title="Ubicación de la oficina RE/MAX Diamond en Manta"
            src="https://www.google.com/maps?q=CC+Manta+Shopping+Maincentro,+Manta,+Ecuador&output=embed"
            className="h-full w-full grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

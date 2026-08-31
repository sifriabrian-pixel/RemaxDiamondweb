"use client";

import { motion } from "framer-motion";

const RECRUIT_WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, vi el video sobre ser asesor y quiero más información.");

export function RecruitVideoSection() {
  return (
    <section className="border-t-4 border-t-red bg-navy py-24 text-cream sm:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-red">
            Para futuros asesores
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.6rem)] font-extrabold leading-[1.05]">
            ¿Qué gana un asesor que se suma a RE/MAX?
          </h2>
          <p className="mt-4 max-w-[46ch] text-cream/70">
            Un video corto de la marca RE/MAX sobre los beneficios reales de trabajar
            en la red inmobiliaria más grande del mundo — comisiones, capacitación,
            marca y respaldo internacional.
          </p>
          <a
            href={RECRUIT_WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-red-bridge px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Quiero ser asesor de RE/MAX Diamond →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video overflow-hidden rounded-sm border border-cream/15"
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/FpUAHag8E_c"
            title="Beneficios de ser asesor RE/MAX"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}

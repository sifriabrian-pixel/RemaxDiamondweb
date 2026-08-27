"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero más información sobre una propiedad en Manta.");

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy pt-28 pb-16 sm:pb-20"
    >
      {/* Foto real de una propiedad del catálogo (casa con piscina, Crucita, Manabí — RE/MAX
          Diamond), tomada del sitio oficial remax.com.ec/diamond. No es banco de imágenes: es
          una propiedad real del inventario. Reemplazar por una foto propia (dron/atardecer)
          cuando Brian tenga sesión de fotos dedicada; hasta entonces esta es honesta. */}
      <div className="absolute inset-0">
        <Image
          src="/properties/hero-crucita-pool.jpg"
          alt="Piscina con vista al mar de una propiedad RE/MAX Diamond en Crucita, Manabí"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/25" />
      </div>

      <p className="absolute right-6 top-24 z-10 text-xs text-cream/45 sm:right-10">
        Crucita, Manabí — propiedad del catálogo
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
      >
        <div className="max-w-2xl">
          <motion.h1
            variants={rise}
            className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.98] tracking-tight text-cream"
          >
            La costa tiene <span className="text-red">dueño</span>, no inquilino.
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-[38ch] text-lg leading-relaxed text-cream/75"
          >
            866 propiedades activas en Manta, Portoviejo, Jaramijó y Montecristi,
            con un equipo que conoce cada barrio de la costa.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-4">
            {/* red-bridge (#AA1120), not red (#FF1200): white text on the brighter red misses 4.5:1 */}
            <a
              href="#catalogo"
              className="rounded-sm bg-red-bridge px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(170,17,32,0.55)]"
            >
              Ver propiedades
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-cream/35 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              Hablar por WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.p
          variants={rise}
          className="max-w-xs text-sm leading-relaxed text-cream/55 lg:text-right"
        >
          RE/MAX Diamond — oficina Manta.
          <br />
          CC Manta Shopping Maincentro, Local 26.
        </motion.p>
      </motion.div>
    </section>
  );
}


"use client";

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
      {/* Base field: no property photo yet — this stays an explicit placeholder, never a stock
          image or decorative gradient dressed up as one. Swap PropertyPlaceholder for a real
          <Image> the moment Brian delivers a hero photo (drone/atardecer, plano completo). */}
      <div className="absolute inset-0">
        <PropertyPlaceholder />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/10" />
      </div>

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

function PropertyPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-navy-soft">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--diamond-cream) 1px, transparent 1px), linear-gradient(var(--diamond-cream) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative flex max-w-xs flex-col items-center gap-3 rounded-sm border border-dashed border-cream/30 px-8 py-10 text-center">
        <CameraIcon />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/60">
          Foto de propiedad pendiente
        </p>
        <p className="text-xs leading-relaxed text-cream/40">
          Plano completo, dron / atardecer. Se reemplaza este bloque por la foto real
          antes de producción — nunca por un banco de imágenes.
        </p>
      </div>
    </div>
  );
}

function CameraIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cream/45"
    >
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13.5" r="3.4" />
    </svg>
  );
}

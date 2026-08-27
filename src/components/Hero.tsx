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
      {/* Foto aérea real de Manta al atardecer — Municipio de Manta, Wikimedia Commons,
          CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File:Panoramicamantaec.jpg).
          Crédito de la licencia: visible en el footer (no en el hero, a pedido del
          cliente), y en el alt para lectores de pantalla. No es banco de imágenes
          genérico: es la ciudad real. Reemplazar por una foto propia cuando Brian
          tenga sesión de fotos dedicada.
          Overlay: navy uniforme sobre toda la foto (no solo un degradé de abajo hacia
          arriba) para bajar el rosa/violeta del atardecer y quedar consistente con el
          resto del sitio — opción A pedida por el cliente, sin cambiar de foto. */}
      <div className="absolute inset-0">
        <Image
          src="/properties/manta-skyline-sunset.jpg"
          alt="Vista aérea de Manta, Manabí, al atardecer (Municipio de Manta, CC BY-SA 4.0)"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/35" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute right-4 top-1/3 z-10 hidden w-36 lg:block lg:w-44 xl:w-52"
      >
        <Image
          src="/brand/diamantito-elegante.png"
          alt=""
          width={1080}
          height={1350}
          sizes="208px"
          className="h-auto w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"
        />
      </motion.div>

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
            Conocemos cada barrio de la costa. Por eso vendemos{" "}
            <span className="text-red">más rápido</span>.
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-[40ch] text-lg leading-relaxed text-cream/75"
          >
            866 propiedades activas en Manta, Portoviejo, Jaramijó y Montecristi
            — el catálogo más completo de la zona.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-4">
            {/* red-bridge (#AA1120), not red (#FF1200): white text on the brighter red misses 4.5:1 */}
            <a
              href="/propiedades"
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


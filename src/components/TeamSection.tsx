"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { advisors as allAdvisors } from "@/lib/team";

const WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero información sobre sumarme como asesor de RE/MAX Diamond.");

// Equipo publicado en el sitio oficial remax.com.ec/diamond (fotos reales, descargadas
// a /public/team el 27/08/2026). Es el roster público de la oficina — más chico que el
// listado de 37 asesores con propiedades activas en el CSV del MLS (esos no tienen foto
// pública todavía), así que se prioriza cara real sobre cantidad.
const BROKER = {
  name: "Yonny Tuarez Palacios",
  role: "Broker",
  photo: "/team/yonny-tuarez.webp",
  listings: 56,
};

const AGENTS = [
  { name: "America Marina Vinueza Borja", role: "Asesora inmobiliaria", photo: "/team/america-vinueza.webp", listings: 25 },
  { name: "Ever Alejandro Valle Vinces", role: "Asesor inmobiliario", photo: "/team/ever-valle.webp", listings: 13 },
  { name: "Gloria Teresa Rodriguez Vargas", role: "Asesora inmobiliaria", photo: "/team/gloria-rodriguez.webp", listings: 3 },
  { name: "Roxana Jasmin Bermello Mendoza", role: "Asesora inmobiliaria", photo: "/team/roxana-bermello.webp", listings: 1 },
];

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
            37 asesores activos en Manta y Manabí, liderados por el broker de la oficina.
          </p>
        </motion.div>

        {/* Broker: jerarquía visual propia, no una card más del grid. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-start gap-6 border border-navy/12 bg-navy px-7 py-8 text-cream sm:flex-row sm:items-center sm:gap-8 sm:px-10"
        >
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-red-bridge">
            <Image src={BROKER.photo} alt={BROKER.name} fill sizes="96px" className="object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-red">{BROKER.role}</p>
            <p className="mt-1 font-display text-2xl font-extrabold">{BROKER.name}</p>
            <p className="mt-1 text-sm text-cream/60">{BROKER.listings} propiedades activas a cargo</p>
          </div>
        </motion.div>

        <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden border border-navy/12 bg-navy/12 sm:grid-cols-2 lg:grid-cols-4">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 bg-cream px-7 py-8"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-navy">
                <Image src={agent.photo} alt={agent.name} fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="font-display text-base font-bold leading-snug text-navy">
                  {agent.name}
                </p>
                <p className="mt-0.5 text-sm text-navy/70">{agent.role}</p>
              </div>
              <p className="mt-auto text-xs font-semibold uppercase tracking-[0.08em] text-navy/70">
                {agent.listings} {agent.listings === 1 ? "propiedad activa" : "propiedades activas"}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/equipo"
            className="text-sm font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-red-deep hover:decoration-red-deep"
          >
            +{allAdvisors.length - AGENTS.length} asesores más → Ver equipo completo
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-navy/12 pt-8 sm:flex-row sm:items-center"
        >
          <p className="text-sm text-navy/70">
            ¿Sos asesor inmobiliario y querés sumarte a la red más grande de la costa?
          </p>
          {/* Misma familia de botón que el CTA secundario del hero, en escala reducida:
              se lee como "la misma acción, más discreta", no como un elemento distinto. */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-navy/30 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-cream"
          >
            Hablanos →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

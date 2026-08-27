"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LeadForm, type LeadFormField } from "./LeadForm";
import { uniqueTypes } from "@/lib/properties";

const SELLER_WHATSAPP =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero vender/alquilar mi propiedad.");
const RECRUIT_WHATSAPP =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero postularme como asesor de RE/MAX Diamond.");

const sellerFields: LeadFormField[] = [
  { type: "text", name: "nombre", label: "Nombre", required: true },
  { type: "tel", name: "whatsapp", label: "WhatsApp", required: true },
  { type: "text", name: "direccion", label: "Dirección o zona de la propiedad", required: true },
  { type: "select", name: "tipo", label: "Tipo de propiedad", options: uniqueTypes(), required: true },
];

const recruitFields: LeadFormField[] = [
  { type: "text", name: "nombre", label: "Nombre", required: true },
  { type: "tel", name: "whatsapp", label: "WhatsApp", required: true },
  {
    type: "radio",
    name: "experiencia",
    label: "¿Tenés experiencia previa en bienes raíces?",
    options: ["Sí", "No"],
    required: true,
  },
  { type: "textarea", name: "detalle", label: "Contanos brevemente tu experiencia (opcional)" },
];

export function LeadForms() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] font-extrabold leading-[1.02] text-navy">
            Dos formas de sumarte al catálogo.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Vendedor — tarjeta clara, borde navy superior. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="border border-navy/12 border-t-4 border-t-navy bg-white px-7 py-8 sm:px-9 sm:py-10"
          >
            <HouseIcon />
            <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight text-navy">
              Vendé con el equipo que más rápido mueve la costa.
            </h3>
            <p className="mt-2 max-w-[42ch] text-sm text-navy/60">
              Dejanos los datos de tu propiedad y te contactamos para coordinar una
              tasación y una visita.
            </p>
            <div className="mt-7">
              <LeadForm
                fields={sellerFields}
                formspreeId={process.env.NEXT_PUBLIC_FORMSPREE_SELLER_ID}
                whatsappHref={SELLER_WHATSAPP}
                submitLabel="Quiero vender mi propiedad"
              />
            </div>
          </motion.div>

          {/* Asesores — tarjeta invertida (navy), tono más comercial/recluta. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden border-t-4 border-t-red bg-navy px-7 py-8 text-cream sm:px-9 sm:py-10"
          >
            <Image
              src="/brand/diamantito-elegante.png"
              alt=""
              width={1080}
              height={1350}
              sizes="128px"
              className="pointer-events-none absolute -bottom-6 -right-6 w-28 opacity-90 sm:w-32"
            />
            <div className="relative max-w-[85%]">
              <HandshakeIcon />
              <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight">
                Vendé más, con la red más grande de la costa.
              </h3>
              <p className="mt-2 max-w-[38ch] text-sm text-cream/65">
                RE/MAX Diamond busca asesores que quieran ganar en serio. Catálogo real,
                comisiones competitivas y un equipo que ya domina Manta y Manabí.
                Postulate en dos minutos.
              </p>
              <div className="relative mt-7">
                <LeadForm
                  fields={recruitFields}
                  formspreeId={process.env.NEXT_PUBLIC_FORMSPREE_RECRUIT_ID}
                  whatsappHref={RECRUIT_WHATSAPP}
                  submitLabel="Quiero postularme"
                  variant="dark"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HouseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-red">
      <path d="M2 12l4-4 4 3 4-3 4 4" />
      <path d="M6 11l4 5 3-2" />
      <path d="M14 14l3 3" />
      <path d="M18 10l4 2-3 6-4-1" />
      <path d="M2 12l3 6 4-1" />
    </svg>
  );
}

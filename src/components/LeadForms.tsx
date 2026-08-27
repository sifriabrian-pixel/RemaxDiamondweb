"use client";

import { motion } from "framer-motion";
import { LeadForm, type LeadFormField } from "./LeadForm";
import { uniqueTypes } from "@/lib/properties";

const BUYER_WHATSAPP =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero comprar o alquilar una propiedad en Manta.");
const SELLER_WHATSAPP =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero vender/alquilar mi propiedad.");

const ZONES = ["Manta", "Portoviejo", "Jaramijó", "Montecristi", "Otra zona"];
const BUDGETS = ["Hasta $50.000", "$50.000–$150.000", "$150.000–$300.000", "Más de $300.000"];

const buyerFields: LeadFormField[] = [
  { type: "text", name: "nombre", label: "Nombre", required: true },
  { type: "tel", name: "whatsapp", label: "WhatsApp", required: true },
  { type: "select", name: "zona", label: "Zona de interés", options: ZONES, required: true },
  { type: "select", name: "presupuesto", label: "Rango de presupuesto", options: BUDGETS },
  { type: "radio", name: "operacion", label: "Tipo de operación", options: ["Compra", "Renta"], required: true },
];

const sellerFields: LeadFormField[] = [
  { type: "text", name: "nombre", label: "Nombre", required: true },
  { type: "tel", name: "whatsapp", label: "WhatsApp", required: true },
  { type: "text", name: "direccion", label: "Dirección o zona de la propiedad", required: true },
  { type: "select", name: "tipo", label: "Tipo de propiedad", options: uniqueTypes(), required: true },
];

export function LeadForms() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 sm:px-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-2xl font-extrabold leading-tight text-navy">
            Comprar o alquilar
          </h2>
          <p className="mt-2 max-w-[46ch] text-sm text-navy/60">
            Contanos qué buscás — el CTA rápido sigue siendo WhatsApp, esto es para
            quien prefiere no escribir de entrada.
          </p>
          <div className="mt-6">
            <LeadForm
              fields={buyerFields}
              formspreeId={process.env.NEXT_PUBLIC_FORMSPREE_BUYER_ID}
              whatsappHref={BUYER_WHATSAPP}
              submitLabel="Quiero que me contacten"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-2xl font-extrabold leading-tight text-navy">
            Vendé con el equipo que más rápido mueve la costa.
          </h2>
          <p className="mt-2 max-w-[46ch] text-sm text-navy/60">
            Dejanos los datos de tu propiedad y te contactamos para coordinar una
            visita.
          </p>
          <div className="mt-6">
            <LeadForm
              fields={sellerFields}
              formspreeId={process.env.NEXT_PUBLIC_FORMSPREE_SELLER_ID}
              whatsappHref={SELLER_WHATSAPP}
              submitLabel="Quiero vender/alquilar"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

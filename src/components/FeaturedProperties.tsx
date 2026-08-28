"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ventaProperties } from "@/lib/venta-properties";
import { PropertyCard } from "./PropertyCard";

const featured = ventaProperties.slice(0, 9);

export function FeaturedProperties() {
  return (
    <section className="bg-cream-dim py-24 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-[1.02] text-navy">
            Conocé las mejores propiedades de <span className="text-red">la costa</span>.
          </h2>
          <p className="mt-4 text-navy/60">
            Una muestra real del inventario — 866 propiedades activas en total, filtrables
            por zona, precio y tipo en el catálogo completo.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property, i) => (
            <motion.div
              key={property.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/propiedades"
            className="rounded-sm border border-navy/30 px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-cream"
          >
            Ver todo el catálogo →
          </Link>
        </div>
      </div>
    </section>
  );
}

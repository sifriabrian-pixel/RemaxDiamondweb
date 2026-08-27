"use client";

import Image from "next/image";
import Link from "next/link";
import type { FeaturedProperty } from "@/lib/featured-properties";

function formatPrice(precio: number | null, operacion: string) {
  if (precio === null) return "Consultar precio";
  const formatted = new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(precio);
  return operacion === "Alquiler" ? `${formatted}/mes` : formatted;
}

export function PropertyCard({ property }: { property: FeaturedProperty }) {
  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group block overflow-hidden border border-navy/12 bg-cream transition-shadow hover:shadow-[0_18px_36px_-18px_rgba(0,14,53,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.photo}
          alt={property.titulo}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <span
          className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white ${
            property.operacion === "Alquiler" ? "bg-red-bridge" : "bg-navy"
          }`}
        >
          {property.operacion}
        </span>
        {/* Reveal de datos secundarios: aparece en hover, no compite con la foto en reposo. */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-navy/90 to-navy/0 px-4 pb-3 pt-8 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs text-cream/85">{property.m2}</p>
          <p className="text-xs text-cream/70">{property.detalle}</p>
        </div>
      </div>

      <div className="px-5 py-5">
        <p className="font-display text-lg font-bold leading-snug text-navy">
          {formatPrice(property.precio, property.operacion)}
        </p>
        <p className="mt-1 text-sm text-navy/70">{property.titulo}</p>
        <p className="mt-0.5 text-xs text-navy/70">{property.zona}</p>
        <span className="mt-3 inline-block text-xs font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition-colors group-hover:text-red-deep group-hover:decoration-red-deep">
          Ver detalle →
        </span>
      </div>
    </Link>
  );
}

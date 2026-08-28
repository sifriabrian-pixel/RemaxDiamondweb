import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ventaProperties, findVentaBySlug, formatVentaPrice } from "@/lib/venta-properties";

export function generateStaticParams() {
  return ventaProperties.map((p) => ({ slug: p.slug }));
}

const SPEC_LABELS: Record<string, string> = {
  terreno: "Terreno",
  totales: "Superficie total",
  cubiertos: "Superficie cubierta",
  ambientes: "Ambientes",
  banos: "Baños",
};

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = findVentaBySlug(slug);
  if (!property) notFound();

  const whatsappHref =
    "https://wa.me/593985437529?text=" +
    encodeURIComponent(`Hola, me interesa: ${property.titulo} (${property.zona}).`);

  const specEntries = Object.entries(property.specs).filter(([, v]) => v);

  return (
    <main className="bg-cream pb-24 pt-28">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <Link
          href="/propiedades"
          className="text-sm font-semibold text-navy/60 transition-colors hover:text-navy"
        >
          ← Volver al catálogo
        </Link>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-sm">
          <Image
            src={property.photo}
            alt={property.titulo}
            fill
            priority
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-sm bg-navy px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white">
            Venta
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold leading-tight text-navy">
              {property.titulo}
            </h1>
            <p className="mt-2 text-navy/60">
              {property.zona} — {property.direccion}
            </p>
            <p className="mt-6 text-sm text-navy/60">Asesor: {property.agente}</p>
          </div>

          <div className="shrink-0 sm:w-64">
            <p className="font-display text-2xl font-extrabold text-navy">
              {formatVentaPrice(property.precio)}
            </p>
            <dl className="mt-4 space-y-2 text-sm text-navy/70">
              {specEntries.map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-navy/10 py-1.5">
                  <dt>{SPEC_LABELS[key] ?? key}</dt>
                  <dd className="font-medium text-navy">
                    {key === "ambientes" || key === "banos" ? value : `${value} m²`}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block rounded-sm bg-red-bridge px-6 py-3.5 text-center text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

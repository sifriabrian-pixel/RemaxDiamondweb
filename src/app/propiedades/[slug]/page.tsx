import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProperties } from "@/lib/featured-properties";

export function generateStaticParams() {
  return featuredProperties.map((p) => ({ slug: p.slug }));
}

function formatPrice(precio: number | null, operacion: string) {
  if (precio === null) return "Consultar precio";
  const formatted = new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(precio);
  return operacion === "Alquiler" ? `${formatted}/mes` : formatted;
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = featuredProperties.find((p) => p.slug === slug);
  if (!property) notFound();

  const whatsappHref =
    "https://wa.me/593985437529?text=" +
    encodeURIComponent(`Hola, me interesa: ${property.titulo} (${property.zona}).`);

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
          <span
            className={`absolute left-4 top-4 rounded-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white ${
              property.operacion === "Alquiler" ? "bg-red-bridge" : "bg-navy"
            }`}
          >
            {property.operacion}
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
            <p className="mt-6 max-w-[60ch] leading-relaxed text-navy/75">
              {property.descripcion}
            </p>
          </div>

          <div className="shrink-0 sm:w-64">
            <p className="font-display text-2xl font-extrabold text-navy">
              {formatPrice(property.precio, property.operacion)}
            </p>
            <dl className="mt-4 space-y-2 text-sm text-navy/70">
              <div className="flex justify-between border-b border-navy/10 py-1.5">
                <dt>Tipo</dt>
                <dd className="font-medium text-navy">{property.tipo}</dd>
              </div>
              <div className="flex justify-between border-b border-navy/10 py-1.5">
                <dt>Superficie</dt>
                <dd className="font-medium text-navy">{property.m2}</dd>
              </div>
              <div className="flex justify-between border-b border-navy/10 py-1.5">
                <dt>Detalle</dt>
                <dd className="font-medium text-navy">{property.detalle}</dd>
              </div>
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

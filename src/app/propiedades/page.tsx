"use client";

import { useMemo, useState } from "react";
import { properties, formatPrice, uniqueZones, uniqueTypes, type Property } from "@/lib/properties";

const OPERATIONS = ["Venta", "Alquiler", "Alquiler temporal"];
const PAGE_SIZE = 24;

function whatsappHrefFor(p: Property) {
  const detalle = `${p.tipo} en ${p.operacion.toLowerCase()} — ${p.zona}${
    p.precio !== null ? ` — ${formatPrice(p.precio, p.operacion)}` : ""
  }`;
  return (
    "https://wa.me/593985437529?text=" +
    encodeURIComponent(`Hola, me interesa consultar por esta propiedad: ${detalle}.`)
  );
}

export default function CatalogPage() {
  const zones = useMemo(() => uniqueZones(), []);
  const types = useMemo(() => uniqueTypes(), []);

  const [zona, setZona] = useState("");
  const [operacion, setOperacion] = useState("");
  const [tipo, setTipo] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const max = precioMax ? Number(precioMax) : null;
    return properties.filter((p) => {
      if (zona && p.zona !== zona) return false;
      if (operacion && p.operacion !== operacion) return false;
      if (tipo && p.tipo !== tipo) return false;
      if (max !== null && p.precio !== null && p.precio > max) return false;
      return true;
    });
  }, [zona, operacion, tipo, precioMax]);

  const shown = filtered.slice(0, visible);

  function resetFilters() {
    setZona("");
    setOperacion("");
    setTipo("");
    setPrecioMax("");
    setVisible(PAGE_SIZE);
  }

  return (
    <main className="min-h-screen bg-cream pb-24 pt-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.02] text-navy">
          Catálogo completo
        </h1>
        <p className="mt-3 text-navy/60">
          {filtered.length} de {properties.length} propiedades activas
          {zona || operacion || tipo || precioMax ? " con estos filtros" : ""}.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <select
            value={zona}
            onChange={(e) => {
              setZona(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-sm border border-navy/25 bg-cream px-3 py-2.5 text-sm text-navy focus-visible:outline-red-bridge"
          >
            <option value="">Todas las zonas</option>
            {zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>

          <select
            value={operacion}
            onChange={(e) => {
              setOperacion(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-sm border border-navy/25 bg-cream px-3 py-2.5 text-sm text-navy focus-visible:outline-red-bridge"
          >
            <option value="">Venta o alquiler</option>
            {OPERATIONS.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>

          <select
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-sm border border-navy/25 bg-cream px-3 py-2.5 text-sm text-navy focus-visible:outline-red-bridge"
          >
            <option value="">Todos los tipos</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <input
            type="number"
            inputMode="numeric"
            placeholder="Precio máximo (USD)"
            value={precioMax}
            onChange={(e) => {
              setPrecioMax(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-sm border border-navy/25 bg-cream px-3 py-2.5 text-sm text-navy placeholder:text-navy/70 focus-visible:outline-red-bridge"
          />
        </div>

        {(zona || operacion || tipo || precioMax) && (
          <button
            type="button"
            onClick={resetFilters}
            className="mt-3 text-xs font-semibold text-navy/60 underline decoration-navy/25 underline-offset-4 hover:text-navy"
          >
            Limpiar filtros
          </button>
        )}

        <div className="mt-8 divide-y divide-navy/10 border-y border-navy/10">
          {shown.length === 0 && (
            <p className="py-12 text-center text-navy/60">
              No hay propiedades activas con estos filtros. Probá con otra zona o subí el
              precio máximo.
            </p>
          )}
          {shown.map((p, i) => (
            <div
              key={`${p.direccion}-${p.agente}-${i}`}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`shrink-0 rounded-sm px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white ${
                    p.operacion === "Venta" ? "bg-navy" : "bg-red-bridge"
                  }`}
                >
                  {p.operacion}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-navy">
                    {p.tipo} · {p.zona}
                  </p>
                  <p className="text-xs text-navy/70">
                    {[
                      p.ambientes && `${p.ambientes} ambientes`,
                      p.dormitorios && `${p.dormitorios} dorm.`,
                      p.totalConstruido && `${p.totalConstruido} m²`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 sm:shrink-0">
                <p className="font-display text-sm font-bold text-navy">
                  {formatPrice(p.precio, p.operacion)}
                </p>
                <a
                  href={whatsappHrefFor(p)}
                  target="_blank"
                  rel="noreferrer"
                  className="whitespace-nowrap text-xs font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-red-deep hover:decoration-red-deep"
                >
                  Consultar →
                </a>
              </div>
            </div>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-sm border border-navy/30 px-7 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-cream"
            >
              Cargar más ({filtered.length - visible} restantes)
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

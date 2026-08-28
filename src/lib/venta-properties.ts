import raw from "../../data/venta-100.json";

// 100 propiedades EN VENTA reales de RE/MAX Diamond, con foto real — scrapeadas
// de remax.com.ec/diamond (oficina Diamond, filtro Venta, ordenadas por más
// recientes) el 27/08/2026. Reemplaza el set anterior de 9 propiedades curadas
// a mano: mismo origen real, mucho más cobertura. El resto del catálogo (alquiler
// + venta fuera de estas 100) sigue disponible sin foto en /propiedades más abajo.
export type VentaProperty = {
  slug: string;
  photo: string;
  /** URL original en el CDN de remax.com.ec — solo para trazabilidad, no se usa en la UI. */
  sourcePhoto?: string;
  precio: number | null;
  direccion: string;
  titulo: string;
  zona: string;
  agente: string;
  specs: {
    terreno?: string;
    totales?: string;
    cubiertos?: string;
    ambientes?: string;
    banos?: string;
  };
  order: number;
};

export const ventaProperties = raw as VentaProperty[];

export function formatVentaPrice(precio: number | null) {
  if (precio === null) return "Consultar precio";
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(precio);
}

export function ventaZonas() {
  return Array.from(new Set(ventaProperties.map((p) => p.zona))).sort();
}

export function findVentaBySlug(slug: string) {
  return ventaProperties.find((p) => p.slug === slug);
}

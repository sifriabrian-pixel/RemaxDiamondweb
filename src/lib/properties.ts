import rawProperties from "../../data/properties.json";

export type Property = {
  zona: string;
  barrio: string;
  direccion: string;
  operacion: string;
  tipo: string;
  precio: number | null;
  moneda: string;
  ambientes: string | null;
  dormitorios: string | null;
  parqueos: string | null;
  terreno: string | null;
  totalConstruido: string | null;
  estado: string | null;
  agente: string;
};

export const properties = rawProperties as Property[];

export function formatPrice(precio: number | null, operacion: string) {
  if (precio === null) return "Consultar precio";
  const formatted = new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(precio);
  return operacion === "Alquiler" ? `${formatted}/mes` : formatted;
}

export function uniqueZones(list: Property[] = properties) {
  return Array.from(new Set(list.map((p) => p.zona).filter(Boolean))).sort();
}

export function uniqueTypes(list: Property[] = properties) {
  return Array.from(new Set(list.map((p) => p.tipo).filter(Boolean))).sort();
}

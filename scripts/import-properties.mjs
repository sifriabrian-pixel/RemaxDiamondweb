#!/usr/bin/env node
// Importa el export del MLS Redremax (CSV, UTF-16, separado por comas con campos
// entrecomillados) a data/properties.json — solo campos públicos, nunca los datos
// del dueño (nombre/email/celular vienen en el CSV pero son PII y se descartan acá).
//
// Uso: node scripts/import-properties.mjs "C:\ruta\al\export.csv"
//
// Nota sobre el CSV: la fila 0 es un separador (`sep=,`), la fila 1 es el header real.
// La columna "Precio" (25) trae el número; la columna siguiente (26, sin nombre propio
// en el header) trae la moneda ("USD") — el header nombra "Tipo de moneda" en el
// índice 28, pero en los datos reales la moneda está en 26. No confiar en el nombre
// de columna del header para precio/moneda: usar los índices de datos verificados.

import { readFileSync, writeFileSync } from "node:fs";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Uso: node scripts/import-properties.mjs <ruta-al-csv>");
  process.exit(1);
}

function parseLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        cur += c;
      }
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") {
        out.push(cur);
        cur = "";
      } else cur += c;
    }
  }
  out.push(cur);
  return out;
}

const buf = readFileSync(inputPath);
const text = buf.toString("utf16le");
const lines = text.split(/\r?\n/).filter(Boolean);
const rows = lines.slice(2).map(parseLine).filter((r) => r.length >= 50);

const COL = {
  officina: 1,
  agente: 2,
  direccion: 5,
  localidad: 8,
  barrio: 9,
  status: 11,
  ambientes: 12,
  estadoPropiedad: 13,
  operacion: 14,
  tipo: 15,
  precio: 25,
  moneda: 26,
  parqueos: 35,
  terreno: 39,
  totalConstruido: 40,
  antiguedad: 42,
  dormitorios: 43,
};

const properties = rows
  .filter((r) => r[COL.status].trim() === "Activa")
  .map((r) => {
    const precioRaw = r[COL.precio].trim();
    const precio = /^[0-9.]+$/.test(precioRaw) ? Number(precioRaw) : null;
    return {
      zona: r[COL.localidad].trim() || r[COL.barrio].trim(),
      barrio: r[COL.barrio].trim(),
      direccion: r[COL.direccion].trim(),
      operacion: r[COL.operacion].trim(),
      tipo: r[COL.tipo].trim(),
      precio,
      moneda: r[COL.moneda].trim() || "USD",
      ambientes: r[COL.ambientes].trim() || null,
      dormitorios: r[COL.dormitorios].trim() || null,
      parqueos: r[COL.parqueos].trim() || null,
      terreno: r[COL.terreno].trim() || null,
      totalConstruido: r[COL.totalConstruido].trim() || null,
      estado: r[COL.estadoPropiedad].trim() || null,
      agente: r[COL.agente].trim(),
    };
  });

writeFileSync(
  new URL("../data/properties.json", import.meta.url),
  JSON.stringify(properties),
);

console.log(`Importadas ${properties.length} propiedades activas -> data/properties.json`);

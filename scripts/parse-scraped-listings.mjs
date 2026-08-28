#!/usr/bin/env node
// Parsea las 5 páginas scrapeadas de remax.com.ec/diamond (solo "Venta", oficina
// Diamond) en un dataset tipado, y sube la foto a resolución grande (860x440 en
// vez de la miniatura 360x200 de la lista). El nombre del agente se separa del
// título haciendo match contra la lista real de 37 agentes (data/properties.json)
// — el texto scrapeado no trae un separador confiable entre ambos.
import { readFileSync, writeFileSync } from "node:fs";

const scratchDir =
  "C:/Users/sifri/AppData/Local/Temp/claude/C--Users-sifri/6c0dda68-bd9c-428b-8767-5fed32e300d3/scratchpad/venta-scrape";

const properties = JSON.parse(readFileSync(new URL("../data/properties.json", import.meta.url)));
const knownAgents = [...new Set(properties.map((p) => p.agente))].sort((a, b) => b.length - a.length);
const normalize = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();

const pages = [0, 1, 2, 3, 4].map((n) =>
  JSON.parse(readFileSync(`${scratchDir}/page${n}.json`, "utf8")),
);
const all = pages.flat().slice(0, 100);

function bigPhotoUrl(url) {
  return url.replace("/360x200/", "/860x440/").replace(/\.webp(\?.*)?$/, ".jpg?node=ec");
}

function parseCard(raw, i) {
  const slug = raw.href.replace("/listings/", "");
  // download-venta-photos.mjs baja bigPhotoUrl(raw.img) a este mismo path local —
  // el dataset apunta a la copia local, no al CDN de remax.com.ec.
  const photo = `/properties/venta/${slug}.jpg`;
  let text = raw.text.replace(/\s*Whatsapp\s*$/, "").trim();
  text = text.replace(/\s*REMAX Diamond\s*$/, "").trim();

  // Agente: buscamos, al final del texto, cuál de los 37 nombres conocidos matchea
  // (normalizando espacios/mayúsculas — el CSV tiene inconsistencias de tipeo).
  let agente = null;
  for (const name of knownAgents) {
    const normName = normalize(name);
    const normText = normalize(text);
    if (normText.endsWith(normName)) {
      agente = name;
      text = text.slice(0, text.length - name.length).trim();
      break;
    }
  }

  let precio = null;
  const precioMatch = text.match(/^([\d.]+)\s*USD/);
  if (precioMatch) precio = Math.round(parseFloat(precioMatch[1].replace(/\./g, "")));
  text = text
    .replace(/^Solicitar precio\s*/, "")
    .replace(/^[\d.]+\s*USD(\s*\+\s*[\d.,]+\s*USD\s*expensas)?\s*/, "");

  const specs = {};
  const specPatterns = [
    [/([\d.]+)\s*m²\s*terreno/, "terreno"],
    [/([\d.]+)\s*m²\s*totales/, "totales"],
    [/([\d.]+)\s*m²\s*cubiertos/, "cubiertos"],
    [/(\d+)\s*ambientes?/, "ambientes"],
    [/(\d+)\s*baños?/, "banos"],
  ];
  let title = text;
  for (const [re, key] of specPatterns) {
    const m = title.match(re);
    if (m) specs[key] = m[1];
    title = title.replace(re, "");
  }
  title = title.replace(/\s+/g, " ").trim();

  // La dirección (mayúsculas, termina casi siempre en "S/N" o un número de
  // predio) y el título del anuncio (frase en minúsculas) vienen pegados sin
  // separador. Partimos en el último "S/N" — si no aparece, todo es dirección
  // y no hay título de anuncio separado (lo dejamos igual, no es un dato crítico).
  let direccion = title;
  let titulo = "";
  const snMatch = title.match(/^(.*?S\/N)\s*(.*)$/);
  if (snMatch) {
    direccion = snMatch[1].trim();
    titulo = snMatch[2].trim();
  }
  if (titulo) titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1);

  const haystack = normalize(`${direccion} ${titulo}`);
  const cities = ["Manta", "Portoviejo", "Jaramijó", "Montecristi", "Crucita", "Rocafuerte", "Tosagua", "Charapoto", "Jipijapa"];
  const zona = cities.find((c) => haystack.includes(normalize(c))) || "Manabí";

  return {
    slug,
    photo,
    sourcePhoto: bigPhotoUrl(raw.img),
    precio,
    direccion,
    titulo: titulo || direccion,
    zona,
    agente,
    specs,
    order: i,
  };
}

const parsed = all.map(parseCard);
const missingAgent = parsed.filter((p) => !p.agente).length;

writeFileSync(
  new URL("../data/venta-100.json", import.meta.url),
  JSON.stringify(parsed, null, 1),
);
console.log(`Parseadas ${parsed.length} propiedades -> data/venta-100.json`);
console.log(`Sin agente detectado: ${missingAgent}`);
console.log(parsed.slice(0, 3));

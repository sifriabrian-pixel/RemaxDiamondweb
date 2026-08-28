#!/usr/bin/env node
// Genera data/team-full.json: los 40 miembros reales de RE/MAX Diamond (broker +
// 39 asesores) con foto pública real (remax.com.ec/diamond, sección "Equipo" ->
// "Ver todos"), cruzados con la cantidad de propiedades activas de cada uno
// (data/properties.json, el mismo CSV del MLS usado en el resto del sitio).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const raw = JSON.parse(readFileSync(new URL("../data/team-photos-raw.json", import.meta.url)));
const properties = JSON.parse(readFileSync(new URL("../data/properties.json", import.meta.url)));

const normalize = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const counts = new Map();
for (const p of properties) {
  if (!p.agente) continue;
  const key = normalize(p.agente);
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

function slugify(name) {
  return normalize(name).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const outDir = new URL("../public/team/full/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const team = [];
let downloaded = 0;
let failed = [];

for (const entry of raw) {
  const slug = slugify(entry.name);
  const localPhoto = `/team/full/${slug}.webp`;
  const outPath = new URL(`${slug}.webp`, outDir);
  if (!existsSync(outPath)) {
    try {
      const res = await fetch(entry.photo);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      writeFileSync(outPath, buf);
    } catch (e) {
      failed.push({ name: entry.name, error: String(e) });
      continue;
    }
  }
  downloaded++;
  team.push({
    slug,
    name: entry.name,
    photo: localPhoto,
    listings: counts.get(normalize(entry.name)) ?? 0,
  });
}

const isBroker = (name) => normalize(name) === normalize("Yonny Tuarez Palacios");
team.sort((a, b) => {
  if (isBroker(a.name)) return -1;
  if (isBroker(b.name)) return 1;
  return b.listings - a.listings;
});

writeFileSync(
  new URL("../data/team-full.json", import.meta.url),
  JSON.stringify(team, null, 1),
);

console.log(`Descargadas/verificadas: ${downloaded}/${raw.length}`);
console.log(`Sin conteo de propiedades (0 matches): ${team.filter((t) => t.listings === 0).length}`);
if (failed.length) console.log("Fallaron:", failed);

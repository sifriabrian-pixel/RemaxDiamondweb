#!/usr/bin/env node
// Descarga las fotos de las 100 propiedades en venta a public/properties/venta/.
// Fuente: CDN público de remax.com.ec (propiedades reales de la oficina Diamond).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const listings = JSON.parse(
  readFileSync(new URL("../data/venta-100.json", import.meta.url)),
);

const outDir = new URL("../public/properties/venta/", import.meta.url);
mkdirSync(outDir, { recursive: true });

let ok = 0;
let failed = [];

for (const [i, listing] of listings.entries()) {
  const outPath = new URL(`${listing.slug}.jpg`, outDir);
  if (existsSync(outPath)) {
    ok++;
    continue;
  }
  try {
    const res = await fetch(listing.sourcePhoto);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(outPath, buf);
    ok++;
    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${listings.length}...`);
  } catch (e) {
    failed.push({ slug: listing.slug, error: String(e) });
  }
}

console.log(`Descargadas: ${ok}/${listings.length}`);
if (failed.length) {
  console.log("Fallaron:", failed);
}

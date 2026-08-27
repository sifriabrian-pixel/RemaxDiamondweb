const WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero más información sobre una propiedad en Manta.");

const RECRUIT_WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero información sobre sumarme como asesor de RE/MAX Diamond.");

export function SiteFooter() {
  return (
    <footer id="contacto" className="scroll-mt-24 bg-navy py-16 text-cream">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-extrabold">
              <span className="text-red">RE/MAX</span> Diamond
            </p>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-cream/60">
              Av. Flavio Reyes entre Av. 24 y Calle 23, CC Manta Shopping Maincentro,
              Local 26, Manta, Manabí.
            </p>
          </div>

          <div>
            {/* Tratamiento tipográfico propio: nunca el mismo peso/escala que un número
                de catálogo (ver franja de stats) — es un link de acción, no una métrica.
                Sin eyebrow label arriba: el teléfono es su propio encabezado. */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="inline-block font-display text-xl font-extrabold text-cream transition-colors hover:text-red"
            >
              +593 98 543 7529
            </a>
            <p className="mt-1 text-sm text-cream/70">WhatsApp — oficina Manta</p>
          </div>

          <div>
            <p className="max-w-[30ch] text-sm leading-relaxed text-cream/70">
              ¿Querés sumarte al equipo RE/MAX Diamond?
            </p>
            {/* Misma familia de botón que el CTA secundario del hero, en escala reducida. */}
            <a
              href={RECRUIT_WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block rounded-sm border border-cream/35 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream hover:text-navy"
            >
              Hablar con reclutamiento →
            </a>
          </div>
        </div>

        <p className="mt-16 border-t border-cream/12 pt-6 text-xs text-cream/60">
          © {new Date().getFullYear()} RE/MAX Diamond, Manta. Franquicia independiente RE/MAX.
        </p>
      </div>
    </footer>
  );
}

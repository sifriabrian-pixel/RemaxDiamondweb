import Image from "next/image";

const WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero más información sobre una propiedad en Manta.");

const RECRUIT_WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero información sobre sumarme como asesor de RE/MAX Diamond.");

const LEGAL_LINKS = [
  { href: "/terminos-y-condiciones", label: "Términos y condiciones" },
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
];

export function SiteFooter() {
  return (
    <footer id="contacto" className="scroll-mt-24 bg-navy py-16 text-cream">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/brand/logo-light.png" alt="RE/MAX" width={1112} height={308} sizes="100px" className="h-6 w-auto" />
              <span className="font-display text-lg font-extrabold text-red">Diamond</span>
            </div>
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
            <p className="text-sm leading-relaxed text-cream/70">
              Links
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/60 underline decoration-cream/25 underline-offset-4 transition-colors hover:text-cream hover:decoration-cream/50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/60">
            © {new Date().getFullYear()} RE/MAX Diamond, Manta. Franquicia independiente RE/MAX.
          </p>
          {/* Segundo punto de reclutamiento: un solo link discreto, no un CTA grande
              (ese ya está en la sección de equipo). */}
          <a
            href={RECRUIT_WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-cream/50 underline decoration-cream/20 underline-offset-4 transition-colors hover:text-cream hover:decoration-cream/50"
          >
            ¿Sos asesor y querés sumarte? →
          </a>
        </div>
      </div>
    </footer>
  );
}

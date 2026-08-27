"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, quiero más información sobre una propiedad en Manta.");

const NAV_LINKS = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Solo la home tiene un hero navy full-bleed debajo del header — ahí el header
  // arranca transparente y se vuelve sólido al pasar el hero. En cualquier otra
  // ruta (sin hero navy) el header es sólido siempre, o el texto crema queda
  // invisible sobre el fondo crema de la página.
  const solid = !isHome || scrolledPastHero;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.7);
      setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        solid ? "bg-navy/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/brand/logo-light.png"
            alt="RE/MAX"
            width={1112}
            height={308}
            sizes="120px"
            className="h-6 w-auto sm:h-7"
            priority
          />
          <span className="font-display text-lg font-extrabold text-red sm:text-xl">Diamond</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-cream/80 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-cream/30 px-4 py-2 text-base font-semibold text-cream transition-colors hover:border-cream hover:bg-cream hover:text-navy sm:inline-block"
          >
            +593 98 543 7529
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-cream/30 text-cream md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden bg-navy/98 backdrop-blur-sm transition-[max-height] duration-300 md:hidden ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-cream/10 py-3 text-base font-medium text-cream/85 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="mt-4 rounded-sm bg-red-bridge px-5 py-3 text-center text-sm font-semibold text-white"
          >
            +593 98 543 7529 — WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      {open ? (
        <path d="M3 3l12 12M15 3L3 15" />
      ) : (
        <path d="M2 5h14M2 9h14M2 13h14" />
      )}
    </svg>
  );
}

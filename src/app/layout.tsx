import type { Metadata } from "next";
import { Archivo, Work_Sans } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "RE/MAX Diamond — Manta",
  description:
    "RE/MAX Diamond, oficina inmobiliaria en Manta, Manabí. Catálogo real de propiedades en venta y alquiler en la costa de Ecuador.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${workSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy font-body antialiased">
        {/*
          THESIS: la costa como propiedad, no como postal — voz de categoría propia, nunca aspiracional genérica.
          OWN-WORLD: navy #000e35 de fondo en el hero, rojo #ff1200 como único acento saturado, crema #f7f5ee
          para secciones secundarias, Archivo (bold/black) como display, Work Sans como cuerpo.
          STORY: un comprador/vendedor entiende en el primer segundo que esto es una inmobiliaria seria en
          Manta con catálogo real, y actúa (ver propiedades / WhatsApp).
          FIRST VIEWPORT: navy full-bleed, headline de categoría a la izquierda/centro, CTA primario rojo +
          CTA secundario WhatsApp sin competir en jerarquía, foto real de una propiedad del catálogo de
          fondo, franja de stats reales fuera del hero.
          FORM: dirección pinneada por el cliente tras 3 exploraciones (fase 0) — sin roll de concept-seed,
          brief-pinned direction.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
          verdict, DESIGN.md, and every shipping raster carrying its provenance.
        */}
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de privacidad — RE/MAX Diamond" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream px-6 pb-24 pt-32 sm:px-10">
      <div className="mx-auto max-w-[700px]">
        <h1 className="font-display text-3xl font-extrabold text-navy">Política de privacidad</h1>
        {/* No inventar cláusulas legales — este texto queda pendiente hasta que
            Brian/Yonny entreguen el contenido real (o el de la franquicia RE/MAX
            Ecuador, si aplica el mismo). */}
        <p className="mt-6 leading-relaxed text-navy/70">
          Estamos terminando de redactar la política de protección de datos de este
          sitio. Mientras tanto, para cualquier consulta escribinos por WhatsApp o al
          email de la oficina.
        </p>
      </div>
    </main>
  );
}

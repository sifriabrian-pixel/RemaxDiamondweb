"use client";

import { useState, type FormEvent } from "react";

export type LeadFormField =
  | { type: "text"; name: string; label: string; required?: boolean }
  | { type: "tel"; name: string; label: string; required?: boolean }
  | { type: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { type: "radio"; name: string; label: string; options: string[]; required?: boolean }
  | { type: "textarea"; name: string; label: string; required?: boolean };

type Variant = "light" | "dark";

/**
 * Formulario genérico reutilizado por vendedor/reclutamiento (cada uno con su propio
 * set de campos y su propio Formspree form-id). Sin `formspreeId` real configurado
 * (variable de entorno vacía) el form no intenta el POST — muestra el fallback de
 * WhatsApp en vez de fallar en silencio contra un endpoint que no existe.
 * `variant="dark"` se usa sobre fondo navy (form de asesores) para que inputs y
 * texto sigan siendo legibles — nunca el mismo tratamiento crema-sobre-crema.
 */
export function LeadForm({
  fields,
  formspreeId,
  whatsappHref,
  submitLabel = "Enviar",
  whatsappLabel = "Hablar por WhatsApp",
  variant = "light",
}: {
  fields: LeadFormField[];
  formspreeId: string | undefined;
  whatsappHref: string;
  submitLabel?: string;
  whatsappLabel?: string;
  variant?: Variant;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const configured = Boolean(formspreeId);
  const dark = variant === "dark";

  // Sin Formspree configurado todavía: nada de campos vacíos ni de avisos de
  // "en configuración" — un solo CTA de WhatsApp, limpio. El form completo
  // (fields de abajo) vuelve solo cuando formspreeId sea real.
  if (!configured) {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-sm bg-red-bridge px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        {whatsappLabel} →
      </a>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className={`rounded-sm border px-6 py-8 text-center ${
          dark ? "border-cream/20 bg-navy-soft" : "border-navy/15 bg-cream"
        }`}
      >
        <p className={`font-display text-lg font-bold ${dark ? "text-cream" : "text-navy"}`}>
          ¡Listo, lo recibimos!
        </p>
        <p className={`mt-2 text-sm ${dark ? "text-cream/70" : "text-navy/60"}`}>
          Te contactamos a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <FieldInput key={field.name} field={field} dark={dark} />
      ))}

      {status === "error" && (
        <p className={`text-xs ${dark ? "text-red" : "text-red-deep"}`}>
          No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.
        </p>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-sm bg-red-bridge px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Enviando…" : submitLabel}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={`text-sm font-semibold underline underline-offset-4 transition-colors ${
            dark
              ? "text-cream decoration-cream/30 hover:text-red hover:decoration-red"
              : "text-navy decoration-navy/30 hover:text-red-deep hover:decoration-red-deep"
          }`}
        >
          ¿Preferís escribirnos directo? WhatsApp →
        </a>
      </div>
    </form>
  );
}

function FieldInput({ field, dark }: { field: LeadFormField; dark: boolean }) {
  const base = dark
    ? "rounded-sm border border-cream/30 bg-navy-soft px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/50 focus-visible:outline-red"
    : "rounded-sm border border-navy/25 bg-cream px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/70 focus-visible:outline-red-bridge";
  const labelColor = dark ? "text-cream/80" : "text-navy/70";

  if (field.type === "select") {
    return (
      <label className={`flex flex-col gap-1.5 text-sm ${labelColor}`}>
        {field.label}
        <select name={field.name} required={field.required} className={base} defaultValue="">
          <option value="" disabled className="text-navy">
            Elegí una opción
          </option>
          {field.options.map((opt) => (
            <option key={opt} value={opt} className="text-navy">
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "radio") {
    return (
      <fieldset className={`flex flex-col gap-1.5 text-sm ${labelColor}`}>
        <legend className="mb-1">{field.label}</legend>
        <div className="flex gap-5">
          {field.options.map((opt) => (
            <label key={opt} className={`flex items-center gap-2 ${dark ? "text-cream" : "text-navy"}`}>
              <input type="radio" name={field.name} value={opt} required={field.required} />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className={`flex flex-col gap-1.5 text-sm ${labelColor}`}>
        {field.label}
        <textarea name={field.name} rows={3} className={base} />
      </label>
    );
  }

  return (
    <label className={`flex flex-col gap-1.5 text-sm ${labelColor}`}>
      {field.label}
      <input type={field.type} name={field.name} required={field.required} className={base} />
    </label>
  );
}

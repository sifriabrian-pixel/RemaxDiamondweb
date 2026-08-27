"use client";

import { useState, type FormEvent } from "react";

export type LeadFormField =
  | { type: "text"; name: string; label: string; required?: boolean }
  | { type: "tel"; name: string; label: string; required?: boolean }
  | { type: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { type: "radio"; name: string; label: string; options: string[]; required?: boolean }
  | { type: "textarea"; name: string; label: string; required?: boolean };

/**
 * Formulario genérico reutilizado por comprador/vendedor/reclutamiento (cada uno con
 * su propio set de campos y su propio Formspree form-id). Sin `formspreeId` real
 * configurado (variable de entorno vacía) el form no intenta el POST — muestra el
 * fallback de WhatsApp en vez de fallar en silencio contra un endpoint que no existe.
 */
export function LeadForm({
  fields,
  formspreeId,
  whatsappHref,
  submitLabel = "Enviar",
}: {
  fields: LeadFormField[];
  formspreeId: string | undefined;
  whatsappHref: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const configured = Boolean(formspreeId);

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
      <div className="rounded-sm border border-navy/15 bg-cream px-6 py-8 text-center">
        <p className="font-display text-lg font-bold text-navy">¡Listo, lo recibimos!</p>
        <p className="mt-2 text-sm text-navy/60">Te contactamos a la brevedad.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <FieldInput key={field.name} field={field} />
      ))}

      {!configured && (
        <p className="text-xs text-navy/70">
          Formulario en configuración — por ahora, escribinos directo por WhatsApp.
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-deep">
          No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.
        </p>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!configured || status === "sending"}
          className="rounded-sm bg-red-bridge px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Enviando…" : submitLabel}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-red-deep hover:decoration-red-deep"
        >
          ¿Preferís escribirnos directo? WhatsApp →
        </a>
      </div>
    </form>
  );
}

function FieldInput({ field }: { field: LeadFormField }) {
  const base =
    "rounded-sm border border-navy/25 bg-cream px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/70 focus-visible:outline-red-bridge";

  if (field.type === "select") {
    return (
      <label className="flex flex-col gap-1.5 text-sm text-navy/70">
        {field.label}
        <select name={field.name} required={field.required} className={base} defaultValue="">
          <option value="" disabled>
            Elegí una opción
          </option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "radio") {
    return (
      <fieldset className="flex flex-col gap-1.5 text-sm text-navy/70">
        <legend className="mb-1">{field.label}</legend>
        <div className="flex gap-5">
          {field.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-navy">
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
      <label className="flex flex-col gap-1.5 text-sm text-navy/70">
        {field.label}
        <textarea name={field.name} rows={3} className={base} />
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-1.5 text-sm text-navy/70">
      {field.label}
      <input type={field.type} name={field.name} required={field.required} className={base} />
    </label>
  );
}

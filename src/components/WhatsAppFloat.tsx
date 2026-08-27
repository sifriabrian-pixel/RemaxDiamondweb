"use client";

const WHATSAPP_HREF =
  "https://wa.me/593985437529?text=" +
  encodeURIComponent("Hola, vi la web de RE/MAX Diamond y quiero más información 🏡");

// Burbuja fija de WhatsApp — siempre visible, en todas las páginas (a pedido
// del cliente), sin depender del scroll.
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon />
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.94.55 3.75 1.5 5.29L2 22l4.86-1.46a9.94 9.94 0 0 0 5.15 1.43h.01c5.52 0 10-4.48 10-10.01C22 6.48 17.53 2 12.01 2zm0 18.15h-.01a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-3.09.93.93-3.02-.2-.31a8.13 8.13 0 0 1-1.26-4.42c0-4.5 3.66-8.15 8.15-8.15 4.49 0 8.14 3.65 8.14 8.15 0 4.5-3.65 8.14-8.14 8.14zm4.47-6.1c-.24-.12-1.43-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01a.9.9 0 0 0-.65.3c-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

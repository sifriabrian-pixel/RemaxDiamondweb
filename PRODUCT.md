# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion. Deploy target: Vercel. Contacto primario vía WhatsApp (link directo, no formulario). Formspree como placeholder de formulario hasta tener ID real. Decisión del usuario, confirmada antes de scaffolding.

## Users

- **Compradores/inversores** de nivel medio-alto en la costa de Ecuador (Manta, Manabí), evaluando comprar o rentar.
- **Propietarios** evaluando vender o rentar su propiedad.
- **Candidatos a asesor** interesados en sumarse a la oficina (audiencia secundaria, no protagonista del hero).

## Product Purpose

Sitio web de RE/MAX Diamond, oficina/broker inmobiliario en Manta, Manabí, Ecuador (franquicia RE/MAX). Objetivo: posicionamiento premium y diferenciado en Manta — no una web de inmobiliaria genérica ni un microsite del template estándar de franquicia RE/MAX Ecuador. Éxito = que un visitante entienda en el primer segundo que es una inmobiliaria seria en la costa, con catálogo real, y actúe (ver propiedades / contactar por WhatsApp).

## Positioning

Identidad visual 100% independiente del template genérico remax.com.ec y de cualquier inmobiliaria de portal-de-clasificados de la región (mismo criterio que Seven Real Estate al separarse de Century21). No es un catálogo de cards planas: la voz de marca y el catálogo real conviven, con un punto de vista específico de la categoría (nunca copy aspiracional genérico que serviría para cualquier otro rubro).

## Operating Context

- Oficina física: Av. Flavio Reyes entre Av. 24 y Calle 23, CC Manta Shopping Maincentro, Local 26, Manta, Manabí.
- Teléfono/WhatsApp de oficina: +593 98 543 7529.
- El catálogo de propiedades se origina en un export CSV del MLS "Redremax" (formato UTF-16, ~879 filas al 2026-08-27), el mismo sistema que alimenta el agente de WhatsApp "Diamantito" de este cliente (proyecto de código separado, carpeta `remax-diamond`, no relacionado a este repo).
- Agentes reales identificados en el export: Alejandra Rivadeneira Mendez, Pablo Ramón Zambrano Pico, Jhonny Rovespierre Tuarez Guerron, Carmen Alexandra Pozo Alvarez, Francisca Vega, Brandon Josué Loor Cedeño (lista no exhaustiva — el CSV completo tiene más).
- Zonas con propiedades activas: Manta, Portoviejo, Jaramijó, Montecristi (y sub-zonas dentro de cada una).
- Tipos de propiedad en catálogo: Casa, Terreno, Terreno comercial, Local comercial, Departamento, Oficina, Galpón, Consultorio.

## Capabilities and Constraints

- El CSV del MLS trae datos de contacto del **dueño de cada propiedad** (nombre, email, celular) — es PII y no debe exponerse en ninguna página pública ni enviarse a servicios externos. Solo se muestran campos públicos por propiedad: dirección/barrio, tipo, precio, ambientes, m², agente asignado.
- El CSV **no trae fotos de propiedades**. No hay fotos reales de propiedades ni del equipo/agentes disponibles todavía.
- Política del cliente: cero contenido inventado en producción — sin testimonios ficticios, sin credenciales placeholder, sin fotos stock genéricas haciendo de foto real. Donde falte contenido real, se deja el espacio marcado como pendiente en el código (comentario o placeholder visible), nunca relleno inventado.
- Mascota de marca "Diamantito": uso autorizado solo en material promocional/redes — nunca como logo, imagen de perfil o firma institucional del sitio.

## Brand Commitments

- Marca: RE/MAX Diamond (oficina franquiciada, Manta). Manual de marca real disponible (Drive, PDF "MANUAL DE MARCA REMAX DIAMOND.EC").
- Paleta confirmada: Primary Red `#FF1200`, Primary Blue `#0043FF`, Dark Red `#660000`, Dark Blue `#000E35`, Cream `#F7F5EE`, Black `#000000`, White `#FFFFFF`, Bridge Red `#AA1120`, Bridge Blue `#0C2749`, Dark Charcoal Gray `#232323`.
- Tipografía de marca: Gotham (principal — Bold reservado a nombres de oficina; Light/Book/Medium para títulos y cuerpo), Arial o Berthold Akzidenz Grotesk (secundaria/subtítulos). Licencia de Gotham pendiente de obtener del cliente — hasta entonces, exploración visual usa una tipografía geométrica bold como aproximación temporal, declarada como tal en el código.
- 5 variantes de logo PNG y mascota "Diamantito" disponibles (carpeta Drive del cliente).
- Frases de marca ya en uso por el cliente: "Nadie en el mundo vende más bienes raíces que REMAX", "Múdate a la vida que quieres".
- Fase 0 (exploración visual) ya se corrió y el cliente aprobó una dirección de hero combinada — ver `## Evidence on Hand` y el DESIGN.md que new-work va a generar a partir de esta dirección.

## Evidence on Hand (actualizado 2026-08-27 — secciones post-hero)

- **Catálogo completo real** (`data/properties.json`, generado por `scripts/import-properties.mjs` desde el CSV del MLS): 866 propiedades activas, sin PII del dueño. Página `/propiedades` con filtros (zona, operación, tipo, precio máximo) y "cargar más" (24 por página) — no renderiza las 866 de una.
- **9 propiedades destacadas con foto real** (`src/lib/featured-properties.ts`, fotos en `public/properties/`): únicas con foto pública, bajadas de remax.com.ec/diamond y de las páginas de agentes, cada una visitada individualmente para verificar precio/m²/detalle antes de publicar. Tienen página de detalle propia (`/propiedades/[slug]`, estática).
- **Quiénes somos y stats del "equipo"** (`AboutSection.tsx`): solo cifras verificadas (866 propiedades, 4 zonas, 37 asesores). Año de fundación, cantidad de operaciones cerradas y certificaciones NO están confirmados — se dejaron fuera del copy en vez de inventar un número, con nota en el código de qué pedirle a Brian/Yonny si se quiere agregar.
- **Equipo restructurado**: broker (Yonny Tuárez) con jerarquía visual propia (card grande, separada), grid de los otros 4 asesores con foto debajo.
- **Zona/mapa**: iframe de Google Maps sin API key (`output=embed`), apuntando a la dirección real de la oficina.
- **3 formularios** (comprador, vendedor — ambos en home; reclutamiento — link en Equipo y en Footer, sin form propio todavía): usan Formspree vía `NEXT_PUBLIC_FORMSPREE_BUYER_ID` / `NEXT_PUBLIC_FORMSPREE_SELLER_ID`, sin configurar aún — sin esas env vars, el form no intenta el POST (evita fallar en silencio) y muestra el fallback de WhatsApp. Pendiente: Brian tiene que crear el proyecto en Formspree y pasar los IDs reales.
- **Páginas legales stub** (`/terminos-y-condiciones`, `/politica-de-privacidad`): sin texto legal inventado — página placeholder honesta hasta tener el contenido real.
- **Redes sociales del footer:** no se agregaron. Las únicas que aparecen en remax.com.ec son las de la marca nacional (@remax_ecuador), no cuentas propias de la oficina Diamond — no corresponde linkearlas como si fueran de Diamond sin confirmar que existen cuentas propias.

- **Fotos reales del equipo** (`public/team/*.webp`) y de la oficina (`public/office/diamond-office.webp`): descargadas del sitio oficial `remax.com.ec/diamond` (broker + 4 asesores con foto pública, cada uno con su propio email/celular real en `@remax.com.ec`). El roster público del sitio oficial (5 personas) es más chico que los 37 agentes con listings activos en el CSV del MLS — se priorizó cara real sobre cobertura total.
- **Foto real de propiedad para el hero** (`public/properties/hero-crucita-pool.jpg`): piscina con vista al mar, casa en venta en Crucita, Manabí — tomada del mismo sitio oficial (listing real del catálogo, no banco de imágenes). Reemplaza el placeholder "foto pendiente" que se usó antes de tener esto.
- **Discrepancia de contacto sin resolver:** el sitio oficial muestra `0999283821 / 052628090` (celular + fijo) y `diamond@remax.com.ec` como contacto de oficina, distinto del `+593 98 543 7529` que Brian pasó como "numero oficina". No se cambió el CTA de WhatsApp del sitio sin confirmar con Brian cuál es el correcto — verificar antes de asumir que son intercambiables.
- Manual de marca real (PDF, Drive) con paleta y tipografía — usado para `## Brand Commitments`.
- 5 logos PNG + 1 asset de mascota "Diamantito" (Drive, sin descargar aún a este repo).
- CSV real de catálogo `C:\Users\sifri\Downloads\reporte_propiedades-27082026.csv` (~879 filas, PII de dueños — ver constraint arriba).
- Dirección de hero aprobada por el cliente (2026-08-27), combinando 3 exploraciones previas:
  1. Headline con punto de vista específico de bienes raíces, no aspiracional genérico. Ejemplo aprobado: "La costa tiene dueño, no inquilino."
  2. Foto real de propiedad full-bleed o en split (dirección drone/atardecer) como protagonista visual — mientras no haya foto real, placeholder visible marcado en el código, nunca foto stock.
  3. CTA primario "Ver propiedades" + CTA secundario "Hablar por WhatsApp", sin competir en jerarquía entre sí.
  4. Franja de stats (866 propiedades activas — verificado del CSV real, no el ~879 estimado antes: 878 filas de datos, 866 con Status Listing "Activa" y 12 "Reservada"; zonas cubiertas; venta vs. alquiler) como sección **secundaria debajo del hero**, no como estructura del hero (un grid de números sueltos sin foto ni contexto fue rechazado por leer como landing de SaaS, no inmobiliaria). Evitar un rango de precio único: mezcla ventas (hasta $7.65M) con alquileres (desde $200/mes) y es engañoso — usar conteo por tipo de operación (708 venta / 170 alquiler) en su lugar si se necesita un tercer dato.
  5. Teléfono/WhatsApp de contacto con tratamiento tipográfico propio — nunca con el mismo tamaño/jerarquía que un número de catálogo (bug identificado y corregido en la dirección final).
  6. Mensajes de reclutamiento de asesores van **fuera del hero**, distribuidos en al menos dos puntos (sección de equipo con CTA "¿Querés ser parte del equipo?", y footer/contacto con CTA secundario) — siempre subordinados visualmente a los CTAs de comprador/vendedor.
  - Exploración visual completa: artifact `remax-diamond-fase0.html` (publicado, no versionado en este repo).
- Ausencias que el trabajo futuro no debe inventar: sin fotos reales de propiedades, sin fotos de equipo/agentes, sin testimonios, sin cifras de "años de experiencia" u otras credenciales no confirmadas.

## Product Principles

1. Identidad propia, no template de franquicia ni de portal inmobiliario genérico — cada decisión visual se mide contra "¿esto podría ser cualquier otra inmobiliaria de LATAM?".
2. El copy de categoría gana siempre a lo aspiracional genérico: si una frase serviría igual para autos, resorts o moda, no sirve acá.
3. Cero contenido inventado: falta de foto/dato real se marca como pendiente explícito en el código, nunca se rellena con placeholder que aparente ser real.
4. El foco primario de la web es comprador/vendedor de propiedades; reclutamiento de asesores es siempre secundario en jerarquía visual, nunca ausente del todo.
5. El sitio debe sentirse vivo (transiciones, scroll con propósito, microinteracciones) sin sacrificar claridad — nunca movimiento por decoración.

## Accessibility & Inclusion

Sin requisito específico confirmado por el cliente aún. Aplican los estándares base del proyecto (contraste de texto, `prefers-reduced-motion`, navegación por teclado) — a verificar en la pasada `harden` antes de deploy.

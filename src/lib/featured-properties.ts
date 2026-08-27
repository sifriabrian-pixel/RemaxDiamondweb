// Las únicas 9 propiedades del sitio con foto real (bajadas de remax.com.ec/diamond,
// verificadas una por una visitando cada listing — no vienen del CSV del MLS, que no
// trae fotos). Datos reales: precio, m², ambientes, dormitorios tal como figuran en
// cada publicación oficial al 27/08/2026.
export type FeaturedProperty = {
  slug: string;
  titulo: string;
  zona: string;
  direccion: string;
  operacion: "Venta" | "Alquiler";
  tipo: string;
  precio: number | null;
  m2: string;
  detalle: string;
  photo: string;
  descripcion: string;
};

export const featuredProperties: FeaturedProperty[] = [
  {
    slug: "casa-rentera-manta",
    titulo: "Casa rentera diagonal al Coral",
    zona: "Los Esteros, Manta",
    direccion: "Barrio Centenario S/N",
    operacion: "Venta",
    tipo: "Casa comercial",
    precio: 325000,
    m2: "1.094 m² totales",
    detalle: "36 ambientes · 12 dormitorios",
    photo: "/properties/casa-rentera-manta.jpg",
    descripcion:
      "Espectacular casa rentera de venta en Manta, diagonal al centro comercial El Coral. 11 años de antigüedad, 4 parqueaderos.",
  },
  {
    slug: "bodega-manta",
    titulo: "Bodega en Los Esteros",
    zona: "Los Esteros, Manta",
    direccion: "Vía Puerto-Aeropuerto S/N",
    operacion: "Alquiler",
    tipo: "Galpón",
    precio: 2450,
    m2: "700 m² cubiertos · 1.200 m² terreno",
    detalle: "10 parqueaderos",
    photo: "/properties/bodega-manta.jpg",
    descripcion:
      "Bodega en Manta, ubicada en Puerto-Aeropuerto, parroquia Tarqui, vías de acceso en buen estado, todos los servicios básicos. 14 años de antigüedad.",
  },
  {
    slug: "depto-manta",
    titulo: "Departamento en Flavio Reyes",
    zona: "Norte de Manta",
    direccion: "Av. Flavio Reyes, Tahalí",
    operacion: "Alquiler",
    tipo: "Departamento",
    precio: 220,
    m2: "45 m² totales",
    detalle: "1 dormitorio · 1 baño",
    photo: "/properties/depto-manta.jpg",
    descripcion:
      "Departamento de 45 m² en Flavio Reyes, con dormitorio, sala, cocina, comedor y baño remodelado, recién pintado. Desocupado, 2 parqueaderos.",
  },
  {
    slug: "casa-comercial-portoviejo",
    titulo: "Casa comercial Reales Tamarindos",
    zona: "Norte de Portoviejo",
    direccion: "Av. Reales Tamarindos S/N",
    operacion: "Venta",
    tipo: "Casa comercial",
    precio: 225000,
    m2: "356 m² totales",
    detalle: "8 ambientes · 2 baños",
    photo: "/properties/casa-comercial-portoviejo.jpg",
    descripcion:
      "Sector de alto desarrollo, tráfico comercial y residencial, sobre la Av. Reales Tamarindos. 2 dormitorios, 15 años de antigüedad.",
  },
  {
    slug: "casa-rotonda-portoviejo",
    titulo: "Casa estilo español, zona La Rotonda",
    zona: "Norte de Portoviejo",
    direccion: "Av. Reales Tamarindos S/N",
    operacion: "Venta",
    tipo: "Casa",
    precio: 160000,
    m2: "365 m² terreno",
    detalle: "3 dormitorios · 3 parqueaderos",
    photo: "/properties/casa-rotonda-portoviejo.jpg",
    descripcion:
      "Casa estilo español con acabados de calidad, gran amplitud con potencial de proyecto comercial por el aprovechamiento del terreno. 31 años de antigüedad.",
  },
  {
    slug: "local-portoviejo",
    titulo: "Local comercial junto al CC1",
    zona: "Centro de Portoviejo",
    direccion: "Calle 10 de Agosto y Córdova S/N",
    operacion: "Alquiler",
    tipo: "Local comercial",
    precio: 700,
    m2: "153 m² cubiertos",
    detalle: "2 baños",
    photo: "/properties/local-portoviejo.jpg",
    descripcion:
      "A una cuadra del Centro Comercial Número 1 (CC1), calle principal con alto flujo vehicular y peatonal. 16 años de antigüedad.",
  },
  {
    slug: "consultorio-portoviejo",
    titulo: "Consultorio médico u oficina",
    zona: "Centro de Portoviejo",
    direccion: "9 de Octubre S/N",
    operacion: "Venta",
    tipo: "Consultorio",
    precio: null,
    m2: "57 m² totales",
    detalle: "3 ambientes · 1 baño",
    photo: "/properties/consultorio-portoviejo.jpg",
    descripcion:
      "Consultorio médico u oficina en el corazón de Portoviejo, en excelente estado de conservación. 26 años de antigüedad.",
  },
  {
    slug: "terreno-jaramijo",
    titulo: "Terreno vía Manta – Jaramijó",
    zona: "Jaramijó",
    direccion: "Vía Manta – Jaramijó S/N",
    operacion: "Venta",
    tipo: "Terreno comercial",
    precio: 900000,
    m2: "15.000 m² terreno",
    detalle: "Zona de alta proyección de crecimiento",
    photo: "/properties/terreno-jaramijo.jpg",
    descripcion:
      "Lote ubicado estratégicamente en el Sitio Río Jaramijó, sector Colisa, en una de las zonas con mayor proyección de crecimiento del cantón.",
  },
  {
    slug: "terreno-montecristi",
    titulo: "Terreno segunda línea de playa",
    zona: "El Colorado, Montecristi",
    direccion: "Urbanización San José, Lote 27",
    operacion: "Venta",
    tipo: "Terreno",
    precio: 42999,
    m2: "225 m² terreno",
    detalle: "Playa privada de la urbanización",
    photo: "/properties/terreno-montecristi.jpg",
    descripcion:
      "Terreno de 225 m² en segunda línea de mar, con todos los servicios básicos, dentro de la urbanización San José, que cuenta con playa privada. 5 años de antigüedad, 2 parqueaderos.",
  },
];

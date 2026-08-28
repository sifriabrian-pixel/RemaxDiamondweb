import raw from "../../data/team-full.json";

// Los 40 miembros reales de RE/MAX Diamond (broker + 39 asesores) con foto
// pública real, sacada de la sección "Equipo" -> "Ver todos" de
// remax.com.ec/diamond. Cantidad de propiedades cruzada contra el CSV real
// del MLS (data/properties.json).
export type TeamMember = {
  slug: string;
  name: string;
  photo: string;
  listings: number;
};

export const team = raw as TeamMember[];
export const broker = team[0];
export const advisors = team.slice(1);

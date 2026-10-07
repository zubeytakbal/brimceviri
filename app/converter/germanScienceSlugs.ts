// Deutsche URL-Teile für Werkstoffe, chemische Verbindungen und Werkstoffvergleiche.
// Die Daten verwenden türkische Bezeichner (aluminyum, sofra-tuzu); die deutschen Seiten
// bekommen daraus abgeleitete deutsche Adressen. Alte Adressen leiten dauerhaft weiter
// (siehe germanScienceRedirects in next.config).
import { getAllCompoundProfiles } from "./compoundsHub";
import { compoundNamesDe } from "./compoundsDatabaseDe";
import { getAllMaterialComparisons } from "./materialComparisons";
import { materialNamesDe } from "./materialsDatabaseDe";
import { getAllMaterialProfiles } from "./materialsHub";

export function slugifyDe(text: string) {
  return text
    .toLocaleLowerCase("de")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const materialSlugDe = (id: string) => (materialNamesDe[id] ? slugifyDe(materialNamesDe[id]) : id);
export const compoundSlugDe = (id: string) => (compoundNamesDe[id] ? slugifyDe(compoundNamesDe[id]) : id);

export function comparisonSlugDe(slug: string) {
  const c = getAllMaterialComparisons().find((item) => item.slug === slug);
  return c ? `${materialSlugDe(c.first.id)}-${materialSlugDe(c.second.id)}-vergleich` : slug;
}

export const materialPathDe = (id: string) => `/de/werkstoffeigenschaften/${materialSlugDe(id)}`;
/** Verbindungen stehen auf einer Seite; die Auswahl kommt über ?v=. */
export const compoundPathDe = (id: string) => `/de/chemische-verbindungen?v=${id}#rechner`;
export const comparisonPathDe = (slug: string) => `/de/werkstoffvergleich/${comparisonSlugDe(slug)}`;

/** Deutscher URL-Teil → interner Bezeichner. */
export function materialIdFromDeSlug(slug: string) {
  return getAllMaterialProfiles().find((m) => materialSlugDe(m.id) === slug)?.id ?? null;
}

export function compoundIdFromDeSlug(slug: string) {
  return getAllCompoundProfiles().find((c) => compoundSlugDe(c.id) === slug)?.id ?? null;
}

export function comparisonIdFromDeSlug(slug: string) {
  return getAllMaterialComparisons().find((c) => comparisonSlugDe(c.slug) === slug)?.slug ?? null;
}

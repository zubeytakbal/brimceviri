// Ayri sayfasi olan il ciftleri: en cok aranan cikis noktalari (Istanbul, Ankara, Izmir) -> diger iller.
import { turkeyProvinces, type TurkeyProvince } from "./turkeyProvinces";

export const ROUTE_HUBS = ["istanbul", "ankara", "izmir"] as const;

export type RoutePair = { from: TurkeyProvince; to: TurkeyProvince };

let pairs: RoutePair[] | null = null;

export function routePairs(): RoutePair[] {
  if (pairs) return pairs;
  const out: RoutePair[] = [];
  ROUTE_HUBS.forEach((hubId, hubIndex) => {
    const from = turkeyProvinces.find((p) => p.id === hubId)!;
    for (const to of turkeyProvinces) {
      if (to.id === hubId) continue;
      // Merkezler arasi cift tek yonde (istanbul-ankara var, ankara-istanbul yok)
      const otherHub = ROUTE_HUBS.indexOf(to.id as (typeof ROUTE_HUBS)[number]);
      if (otherHub !== -1 && otherHub < hubIndex) continue;
      out.push({ from, to });
    }
  });
  pairs = out;
  return out;
}

/** Iki il icin (her iki yonde) ayri sayfa varsa yolu. */
export function routePairPath(a: TurkeyProvince, b: TurkeyProvince) {
  const hit = routePairs().find((p) => (p.from.id === a.id && p.to.id === b.id) || (p.from.id === b.id && p.to.id === a.id));
  return hit ? `/iller-arasi-mesafe/${hit.from.id}/${hit.to.id}` : null;
}

export function findRoutePair(fromId: string, toId: string) {
  return routePairs().find((p) => p.from.id === fromId && p.to.id === toId) ?? null;
}

import { findZone } from "./timeZoneOptions";

// EN'de cok aranan kisaltma ciftleri ("est to ist"). Kisaltma, ilgili bolgenin
// (yaz saatini de kapsayan) IANA bolgesine baglanir; sayfa her iki mevsimi de aciklar.
export type ZonePair = { slug: string; from: string; to: string; fromCode: string; toCode: string; fromName: string; toName: string };

const NAMES: Record<string, string> = {
  et: "Eastern Time",
  ct: "Central Time",
  pt: "Pacific Time",
  ist: "India Standard Time",
  gmt: "Greenwich Mean Time",
  utc: "Coordinated Universal Time",
  cet: "Central European Time",
  jst: "Japan Standard Time",
  aet: "Australian Eastern Time",
  uk: "UK time",
};

function pair(slug: string, from: string, to: string, fromCode: string, toCode: string): ZonePair {
  return { slug, from, to, fromCode, toCode, fromName: NAMES[from], toName: NAMES[to] };
}

export const zonePairs: ZonePair[] = [
  pair("est-to-ist", "et", "ist", "EST", "IST"),
  pair("ist-to-est", "ist", "et", "IST", "EST"),
  pair("pst-to-est", "pt", "et", "PST", "EST"),
  pair("est-to-pst", "et", "pt", "EST", "PST"),
  pair("cst-to-est", "ct", "et", "CST", "EST"),
  pair("est-to-cst", "et", "ct", "EST", "CST"),
  pair("pst-to-ist", "pt", "ist", "PST", "IST"),
  pair("ist-to-pst", "ist", "pt", "IST", "PST"),
  pair("gmt-to-est", "gmt", "et", "GMT", "EST"),
  pair("est-to-gmt", "et", "gmt", "EST", "GMT"),
  pair("utc-to-est", "utc", "et", "UTC", "EST"),
  pair("est-to-utc", "et", "utc", "EST", "UTC"),
  pair("cet-to-est", "cet", "et", "CET", "EST"),
  pair("est-to-cet", "et", "cet", "EST", "CET"),
  pair("jst-to-est", "jst", "et", "JST", "EST"),
  pair("aest-to-est", "aet", "et", "AEST", "EST"),
];

export function findPair(slug: string) {
  const found = zonePairs.find((p) => p.slug === slug);
  if (!found || !findZone(found.from) || !findZone(found.to)) return null;
  return found;
}

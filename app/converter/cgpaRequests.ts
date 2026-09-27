// "Universiten listede yok mu?" istekleri: ogrencilerin istedigi
// universiteler Redis'te sayilir; ayni universite 3 kez istenince site
// sahibine bir kez GitHub issue (e-posta) gider. Ham IP saklanmaz: yalnizca
// gunluk sinir icin tuzlu hash, 24 saat sonra silinir.
import { createHash } from "node:crypto";

export const REQUEST_ALERT_THRESHOLD = 3;
export const REQUESTS_PER_DAY_PER_VISITOR = 5;

export function normalizeUniversityName(raw: string) {
  return raw.normalize("NFKC").replace(/\s+/g, " ").trim();
}

export function validateUniversityName(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const name = normalizeUniversityName(raw);
  if (name.length < 2 || name.length > 120) return null;
  // Link ve kod parcasi kabul etme (spam).
  if (/https?:|www\.|<|>|\{|\}/i.test(name)) return null;
  if (!/\p{L}/u.test(name)) return null;
  return name;
}

export function requestKey(name: string) {
  return name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function visitorHash(ip: string, day: string) {
  return createHash("sha256").update(`${ip}|${day}|${process.env.CRON_SECRET ?? "birimceviri"}`).digest("hex").slice(0, 32);
}

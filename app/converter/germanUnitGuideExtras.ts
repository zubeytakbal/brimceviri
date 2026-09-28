// Deutsche Einheitenseiten: berechnete Umrechnungstabelle, häufige Werte und FAQ.
// Gegenstück zu unitGuideExtras.ts (Türkisch), damit jede Einheitenseite eigenen,
// nützlichen Inhalt hat.
import { convert } from "./convert";
import type { FaqItem } from "./faqSchema";
import { germanConversionPages } from "./localizedGermanConversionPages";
import { germanUnitPages, type LocalizedGermanUnitPage } from "./localizedGermanUnitPages";
import { getUnitsForCategory } from "./unitRegistry";

export type GermanUnitTableRow = { name: string; symbol: string; text: string; href: string | null };

const SUPERSCRIPT: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };

/** Deutsche Zahlenschreibweise; sehr große und sehr kleine Werte wissenschaftlich. */
export function formatGermanUnitValue(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e12 || abs < 1e-6) {
    const [mantissa, exponent] = value.toExponential(5).split("e");
    const m = Number(mantissa).toLocaleString("de-DE", { maximumFractionDigits: 5 });
    const e = String(Number(exponent))
      .split("")
      .map((ch) => SUPERSCRIPT[ch] ?? ch)
      .join("");
    return `${m} × 10${e}`;
  }
  return value.toLocaleString("de-DE", { maximumSignificantDigits: 8 });
}

function hrefFor(category: string, from: string, to: string) {
  const page = germanConversionPages.find((p) => p.category === category && p.fromUnit === from && p.toUnit === to);
  if (page) return `/de/${page.slug}`;
  const unit = germanUnitPages.find((p) => p.category === category && p.unit === to);
  return unit ? `/de/einheiten/${unit.slug}` : null;
}

/** 1 Einheit in den anderen Einheiten derselben Kategorie (direkte Umrechner zuerst). */
export function germanUnitConversionTable(unitPage: LocalizedGermanUnitPage, limit = 14): GermanUnitTableRow[] {
  const rows: Array<GermanUnitTableRow & { direct: boolean; order: number }> = [];
  getUnitsForCategory(unitPage.category).forEach((entry, order) => {
    if (entry.symbol === unitPage.unit || !entry.de) return;
    let value: number;
    try {
      value = convert(unitPage.category, 1, unitPage.unit, entry.symbol);
    } catch {
      return;
    }
    if (!Number.isFinite(value) || value === 0) return;
    const href = hrefFor(unitPage.category, unitPage.unit, entry.symbol);
    rows.push({
      name: entry.de.name,
      symbol: entry.displaySymbol ?? entry.symbol,
      text: formatGermanUnitValue(value),
      href,
      direct: Boolean(href?.startsWith("/de/") && !href.startsWith("/de/einheiten/")),
      order,
    });
  });
  return rows
    .sort((a, b) => Number(b.direct) - Number(a.direct) || a.order - b.order)
    .slice(0, limit)
    .map((row) => ({ name: row.name, symbol: row.symbol, text: row.text, href: row.href }));
}

const COMMON_AMOUNTS = [0.5, 1, 2, 5, 10, 20, 50, 100, 1000];

/** Häufige Werte in der ersten Zieleinheit der Tabelle. */
export function germanUnitCommonValues(unitPage: LocalizedGermanUnitPage, target: GermanUnitTableRow | undefined) {
  if (!target) return [];
  const targetSymbol = getUnitsForCategory(unitPage.category).find((u) => (u.displaySymbol ?? u.symbol) === target.symbol)?.symbol ?? target.symbol;
  return COMMON_AMOUNTS.map((amount) => {
    let value = NaN;
    try {
      value = convert(unitPage.category, amount, unitPage.unit, targetSymbol);
    } catch {
      /* ungültige Umrechnung */
    }
    return { amount, text: formatGermanUnitValue(value) };
  }).filter((row) => row.text !== "—");
}

/** Weitere Einheitenseiten derselben Kategorie. */
export function germanSiblingUnits(unitPage: LocalizedGermanUnitPage, limit = 12) {
  return germanUnitPages
    .filter((p) => p.category === unitPage.category && p.slug !== unitPage.slug)
    .slice(0, limit)
    .map((p) => ({ href: `/de/einheiten/${p.slug}`, label: `${p.name} (${p.symbol})` }));
}

/** FAQ aus den berechneten Werten und den Einheitendaten. */
export function germanUnitFaq(unitPage: LocalizedGermanUnitPage, table: GermanUnitTableRow[]): FaqItem[] {
  const items: FaqItem[] = table.slice(0, 3).map((row) => ({
    question: `Wie viel ${row.name} sind 1 ${unitPage.name}?`,
    answer: `1 ${unitPage.name} (${unitPage.symbol}) = ${row.text} ${row.symbol}. Für andere Werte nutzen Sie den Umrechner oder die Tabelle auf dieser Seite.`,
  }));
  items.push({
    question: `Welches Symbol hat ${unitPage.name}?`,
    answer: `Das Symbol ist ${unitPage.symbol}. Messsystem: ${unitPage.measurementSystem}. SI-Bezug: ${unitPage.siEquivalent}.`,
  });
  items.push({
    question: `Wofür wird ${unitPage.name} verwendet?`,
    answer: `${unitPage.commonUses}.`.replace(/\.\.$/, "."),
  });
  return items;
}

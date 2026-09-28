// Birim rehberi sayfalari icin hesaplanan ek icerik: diger birimlere donusum tablosu,
// sik kullanilan degerler, ayni kategorideki birimler ve SSS. Makalesi olmayan
// birim sayfalarinin da kendine ozgu, kullanisli icerik tasimasini saglar.
import { convert } from "./convert";
import { conversionPages } from "./conversionPages";
import type { FaqItem } from "./faqSchema";
import { unitPages, type UnitPage } from "./unitPages";
import { getUnitsForCategory } from "./unitRegistry";

export type UnitTableRow = {
  name: string;
  symbol: string;
  value: number;
  text: string;
  /** Dogrudan donusum sayfasi ya da hedef birimin rehber sayfasi */
  href: string | null;
};

const SUPERSCRIPT: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };

/** Turkce sayi yazimi; cok buyuk ve cok kucuk degerler bilimsel gosterimle. */
export function formatUnitValue(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e12 || abs < 1e-6) {
    const [mantissa, exponent] = value.toExponential(5).split("e");
    const m = Number(mantissa).toLocaleString("tr-TR", { maximumFractionDigits: 5 });
    const e = String(Number(exponent))
      .split("")
      .map((ch) => SUPERSCRIPT[ch] ?? ch)
      .join("");
    return `${m} × 10${e}`;
  }
  return value.toLocaleString("tr-TR", { maximumSignificantDigits: 8 });
}

function conversionHref(category: string, from: string, to: string) {
  const page = conversionPages.find((p) => p.category === category && p.fromUnit === from && p.toUnit === to);
  return page ? `/${page.slug}` : null;
}

function guideHref(category: string, symbol: string) {
  const page = unitPages.find((p) => p.category === category && p.unit === symbol);
  return page ? `/birimler/${page.slug}` : null;
}

/** 1 birimin ayni kategorideki diger birimlerdeki karsiligi (dogrudan donusum sayfasi olanlar once). */
export function unitConversionTable(unitPage: UnitPage, limit = 14): UnitTableRow[] {
  const rows: Array<UnitTableRow & { direct: boolean; order: number }> = [];
  getUnitsForCategory(unitPage.category).forEach((entry, order) => {
    if (entry.symbol === unitPage.unit || !entry.tr) return;
    let value: number;
    try {
      value = convert(unitPage.category, 1, unitPage.unit, entry.symbol);
    } catch {
      return;
    }
    if (!Number.isFinite(value) || value === 0) return;
    const direct = conversionHref(unitPage.category, unitPage.unit, entry.symbol);
    rows.push({
      name: entry.tr.name,
      symbol: entry.displaySymbol ?? entry.symbol,
      value,
      text: formatUnitValue(value),
      href: direct ?? guideHref(unitPage.category, entry.symbol),
      direct: Boolean(direct),
      order,
    });
  });
  return rows
    .sort((a, b) => Number(b.direct) - Number(a.direct) || a.order - b.order)
    .slice(0, limit)
    .map(({ direct: _direct, order: _order, ...row }) => row);
}

const COMMON_AMOUNTS = [0.5, 1, 2, 5, 10, 20, 50, 100, 1000];

/** Sik kullanilan miktarlarin ana hedef birimdeki karsiligi. */
export function unitCommonValues(unitPage: UnitPage, target: UnitTableRow | undefined) {
  if (!target) return [];
  const targetSymbol = getUnitsForCategory(unitPage.category).find((u) => (u.displaySymbol ?? u.symbol) === target.symbol)?.symbol ?? target.symbol;
  return COMMON_AMOUNTS.map((amount) => {
    let value = NaN;
    try {
      value = convert(unitPage.category, amount, unitPage.unit, targetSymbol);
    } catch {
      /* gecersiz donusum */
    }
    return { amount, text: formatUnitValue(value) };
  }).filter((row) => row.text !== "—");
}

/** Ayni kategorideki diger rehber sayfalari. */
export function siblingUnitGuides(unitPage: UnitPage, limit = 12) {
  return unitPages
    .filter((p) => p.category === unitPage.category && p.slug !== unitPage.slug)
    .slice(0, limit)
    .map((p) => ({ href: `/birimler/${p.slug}`, label: `${p.name} (${p.symbol})` }));
}

/** Makalesi olmayan birimler icin hesaplanan SSS. */
export function unitGuideFaq(unitPage: UnitPage, table: UnitTableRow[]): FaqItem[] {
  const items: FaqItem[] = table.slice(0, 3).map((row) => ({
    question: `1 ${unitPage.name} kaç ${row.name}?`,
    answer: `1 ${unitPage.name} (${unitPage.symbol}) = ${row.text} ${row.symbol}. Başka değerler için sayfadaki dönüştürücüyü ya da dönüşüm tablosunu kullanabilirsiniz.`,
  }));
  items.push({
    question: `${unitPage.name} sembolü nedir?`,
    answer: `${unitPage.name} biriminin sembolü: ${unitPage.symbol}. Ölçüm sistemi: ${unitPage.measurementSystem}. SI karşılığı: ${unitPage.siEquivalent}.`,
  });
  items.push({
    question: `${unitPage.name} nerelerde kullanılır?`,
    answer: `${unitPage.commonUses}.`.replace(/\.\.$/, "."),
  });
  return items;
}

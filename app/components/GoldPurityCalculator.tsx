"use client";

import { useState } from "react";
import { alloy, equivalentWeight, fineness, GOLD_GRADES, meltValue, pureGold, TROY_OUNCE_G, type PurityBasis } from "../converter/goldPurity";

export type GoldLang = "en" | "de" | "es" | "pt";

const LOCALE: Record<GoldLang, string> = { en: "en-US", de: "de-DE", es: "es-ES", pt: "pt-BR" };

const T = {
  en: {
    weight: "Weight (g)",
    grade: "Your gold",
    target: "Compare with / convert to",
    basis: "Purity basis",
    karatBasis: "Karat ÷ 24 (14K = 58.33%)",
    hallmarkBasis: "Hallmark stamp (585 = 58.5%)",
    price: "Price of pure gold (optional)",
    perGram: "per gram",
    perOz: "per troy ounce",
    grade_label: (k: number, h: number) => `${k}K (${h})`,
    pure: "Pure gold content",
    purity: (p: string) => `${p}% pure gold`,
    same: "Same pure gold in",
    sameNote: (t: string) => `weight of ${t} gold with the same amount of pure gold`,
    up: "To raise it, add pure gold",
    down: "To lower it, add alloy",
    final: (w: string) => `new total weight ${w} g`,
    noUp: "24K cannot be reached by adding gold",
    melt: "Melt value",
    meltNote: "pure gold × the price you entered; buyers pay less than melt value",
    enter: "Enter a weight in grams.",
  },
  de: {
    weight: "Gewicht (g)",
    grade: "Ihr Gold",
    target: "Vergleichen mit / umrechnen in",
    basis: "Berechnungsgrundlage",
    karatBasis: "Karat ÷ 24 (14 K = 58,33 %)",
    hallmarkBasis: "Feingehalt-Stempel (585 = 58,5 %)",
    price: "Feingoldpreis (optional)",
    perGram: "pro Gramm",
    perOz: "pro Feinunze",
    grade_label: (k: number, h: number) => `${h}er Gold (${k} K)`,
    pure: "Feingoldgehalt",
    purity: (p: string) => `${p} % Feingold`,
    same: "Gleicher Feingoldanteil in",
    sameNote: (t: string) => `Gewicht an ${t} mit gleich viel Feingold`,
    up: "Zum Hochlegieren Feingold zugeben",
    down: "Zum Herunterlegieren Legierung zugeben",
    final: (w: string) => `neues Gesamtgewicht ${w} g`,
    noUp: "999er Gold lässt sich durch Zugabe von Feingold nicht erreichen",
    melt: "Materialwert",
    meltNote: "Feingold × eingegebener Preis; Ankäufer zahlen weniger als den Materialwert",
    enter: "Geben Sie ein Gewicht in Gramm ein.",
  },
  es: {
    weight: "Peso (g)",
    grade: "Tu oro",
    target: "Comparar con / convertir a",
    basis: "Base de cálculo",
    karatBasis: "Quilates ÷ 24 (14 k = 58,33 %)",
    hallmarkBasis: "Contraste/ley (585 = 58,5 %)",
    price: "Precio del oro puro (opcional)",
    perGram: "por gramo",
    perOz: "por onza troy",
    grade_label: (k: number, h: number) => `Oro de ${k} quilates (${h})`,
    pure: "Oro puro",
    purity: (p: string) => `${p} % de oro puro`,
    same: "Mismo oro puro en",
    sameNote: (t: string) => `peso de ${t} con la misma cantidad de oro puro`,
    up: "Para subir de quilates, añade oro puro",
    down: "Para bajar de quilates, añade aleación",
    final: (w: string) => `nuevo peso total ${w} g`,
    noUp: "No se puede llegar a 24 quilates añadiendo oro",
    melt: "Valor de fundición",
    meltNote: "oro puro × el precio que escribiste; los compradores pagan menos",
    enter: "Escribe un peso en gramos.",
  },
  pt: {
    weight: "Peso (g)",
    grade: "Seu ouro",
    target: "Comparar com / converter para",
    basis: "Base de cálculo",
    karatBasis: "Quilates ÷ 24 (14 k = 58,33 %)",
    hallmarkBasis: "Teor gravado (585 = 58,5 %)",
    price: "Preço do ouro puro (opcional)",
    perGram: "por grama",
    perOz: "por onça troy",
    grade_label: (k: number, h: number) => `Ouro ${k}k (${h})`,
    pure: "Ouro puro",
    purity: (p: string) => `${p} % de ouro puro`,
    same: "Mesmo ouro puro em",
    sameNote: (t: string) => `peso de ${t} com a mesma quantidade de ouro puro`,
    up: "Para subir o teor, adicione ouro puro",
    down: "Para baixar o teor, adicione liga",
    final: (w: string) => `novo peso total ${w} g`,
    noUp: "Não é possível chegar a 24k adicionando ouro",
    melt: "Valor de fundição",
    meltNote: "ouro puro × o preço que você digitou; compradores pagam menos",
    enter: "Digite um peso em gramas.",
  },
} as const;

/** English uses 1,234.5; German, Spanish and Portuguese use 1.234,5. */
const num = (raw: string, lang: GoldLang) => {
  const s = raw.trim().replace(/\s/g, "");
  if (!s) return Number.NaN;
  const norm = lang === "en" ? s.replace(/,/g, "") : s.replace(/\./g, "").replace(",", ".");
  return Number(norm);
};

export default function GoldPurityCalculator({ lang, defaultBasis, defaultKarat = 14, defaultTarget = 18 }: { lang: GoldLang; defaultBasis: PurityBasis; defaultKarat?: number; defaultTarget?: number }) {
  const t = T[lang];
  const f = (n: number, d = 2) => n.toLocaleString(LOCALE[lang], { maximumFractionDigits: d });
  const [weight, setWeight] = useState("10");
  const [from, setFrom] = useState(defaultKarat);
  const [to, setTo] = useState(defaultTarget);
  const [basis, setBasis] = useState<PurityBasis>(defaultBasis);
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState<"g" | "oz">("g");

  const w = num(weight, lang);
  const g1 = GOLD_GRADES.find((g) => g.karat === from)!;
  const g2 = GOLD_GRADES.find((g) => g.karat === to)!;
  const p1 = fineness(g1, basis);
  const p2 = fineness(g2, basis);
  const pure = pureGold(w, p1);
  const eq = equivalentWeight(w, p1, p2);
  const a = alloy(w, p1, p2);
  const pr = num(price, lang);
  const melt = meltValue(w, p1, unit === "g" ? pr : pr / TROY_OUNCE_G);
  const label = (g: (typeof GOLD_GRADES)[number]) => t.grade_label(g.karat, g.hallmark);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <label className="date-calc-field">
            <span>{t.weight}</span>
            <input inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>{t.grade}</span>
            <select value={from} onChange={(e) => setFrom(Number(e.target.value))}>
              {GOLD_GRADES.map((g) => (
                <option key={g.karat} value={g.karat}>
                  {label(g)}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>{t.target}</span>
            <select value={to} onChange={(e) => setTo(Number(e.target.value))}>
              {GOLD_GRADES.map((g) => (
                <option key={g.karat} value={g.karat}>
                  {label(g)}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>{t.basis}</span>
            <select value={basis} onChange={(e) => setBasis(e.target.value as PurityBasis)}>
              <option value="karat">{t.karatBasis}</option>
              <option value="hallmark">{t.hallmarkBasis}</option>
            </select>
          </label>
        </div>
        <div className="date-calc-fields is-amounts">
          <label className="date-calc-field">
            <span>{t.price}</span>
            <input inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>&nbsp;</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value as "g" | "oz")} aria-label={t.price}>
              <option value="g">{t.perGram}</option>
              <option value="oz">{t.perOz}</option>
            </select>
          </label>
        </div>
      </div>

      {Number.isFinite(pure) && w > 0 ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{t.pure}</span>
            <strong>{f(pure, 3)} g</strong>
            <em>
              {label(g1)} · {t.purity(f(p1 * 100, 2))}
            </em>
          </div>
          {from !== to ? (
            <div className="date-calc-stat">
              <span>
                {t.same} {label(g2)}
              </span>
              <strong>{f(eq, 3)} g</strong>
              <em>{t.sameNote(label(g2))}</em>
            </div>
          ) : null}
          {from !== to ? (
            <div className="date-calc-stat">
              <span>{a?.direction === "down" ? t.down : t.up}</span>
              <strong>{a ? `${f(a.direction === "up" ? a.addPureGold : a.direction === "down" ? a.addAlloy : 0, 3)} g` : "—"}</strong>
              <em>{a ? t.final(f(a.finalWeight, 3)) : t.noUp}</em>
            </div>
          ) : null}
          {Number.isFinite(melt) ? (
            <div className="date-calc-stat">
              <span>{t.melt}</span>
              <strong>{f(melt, 2)}</strong>
              <em>{t.meltNote}</em>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">{t.enter}</p>
      )}
    </div>
  );
}

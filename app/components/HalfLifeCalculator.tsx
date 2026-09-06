"use client";

import { useMemo, useState } from "react";
import {
  calculateHalfLife,
  type HalfLifeTarget,
} from "../converter/halfLifeCalculator";

// Yil birimi paylasilan unitRegistry'de bulunmadigi icin (bkz.
// proje notlari: convert() kategori kisitlamasi), yari omur
// problemlerinde gercekten gerekli olan bu birim seti buraya
// ozel, bagimsiz olarak tanimlanmistir -- paylasilan "zaman"
// kategorisine dokunulmaz.
const timeUnits = [
  { symbol: "sn", label: "saniye", secondsPerUnit: 1 },
  { symbol: "dk", label: "dakika", secondsPerUnit: 60 },
  { symbol: "sa", label: "saat", secondsPerUnit: 3600 },
  { symbol: "gün", label: "gün", secondsPerUnit: 86400 },
  { symbol: "yıl", label: "yıl", secondsPerUnit: 365.25 * 86400 },
];

function toSeconds(value: number, unitSymbol: string) {
  const unit = timeUnits.find((item) => item.symbol === unitSymbol);
  return unit ? value * unit.secondsPerUnit : Number.NaN;
}

function fromSeconds(seconds: number, unitSymbol: string) {
  const unit = timeUnits.find((item) => item.symbol === unitSymbol);
  return unit ? seconds / unit.secondsPerUnit : Number.NaN;
}

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

const targetLabels: Record<HalfLifeTarget, string> = {
  kalan: "Kalan Miktar",
  baslangic: "Başlangıç Miktarı",
  sure: "Geçen Süre",
  yariOmur: "Yarı Ömür",
};

export default function HalfLifeCalculator() {
  const [target, setTarget] = useState<HalfLifeTarget>("kalan");
  const [kalanInput, setKalanInput] = useState("12.5");
  const [baslangicInput, setBaslangicInput] = useState("100");
  const [sureInput, setSureInput] = useState("17190");
  const [sureUnit, setSureUnit] = useState("yıl");
  const [yariOmurInput, setYariOmurInput] = useState("5730");
  const [yariOmurUnit, setYariOmurUnit] = useState("yıl");

  const gecenSureSaniye = useMemo(
    () => toSeconds(parseNumericValue(sureInput), sureUnit),
    [sureInput, sureUnit]
  );

  const yariOmurSaniye = useMemo(
    () => toSeconds(parseNumericValue(yariOmurInput), yariOmurUnit),
    [yariOmurInput, yariOmurUnit]
  );

  const result = useMemo(
    () =>
      calculateHalfLife({
        target,
        kalanMiktar: parseNumericValue(kalanInput),
        baslangicMiktar: parseNumericValue(baslangicInput),
        gecenSureSaniye,
        yariOmurSaniye,
      }),
    [target, kalanInput, baslangicInput, gecenSureSaniye, yariOmurSaniye]
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (target === "kalan") {
      return [
        {
          title: "1. Adım — Kalan miktar",
          lines: [
            "N = N₀ × (1/2)^(t / t½)",
            `N = ${formatNumber(result.baslangicMiktar)} × (1/2)^(${formatNumber(fromSeconds(result.gecenSureSaniye, sureUnit))} ${sureUnit} / ${formatNumber(fromSeconds(result.yariOmurSaniye, yariOmurUnit))} ${yariOmurUnit})`,
            `N ≈ ${formatNumber(result.kalanMiktar)}`,
          ],
        },
      ];
    }

    if (target === "baslangic") {
      return [
        {
          title: "1. Adım — Başlangıç miktarı",
          lines: [
            "N₀ = N × 2^(t / t½)",
            `N₀ = ${formatNumber(result.kalanMiktar)} × 2^(${formatNumber(result.gecenYariOmurSayisi)})`,
            `N₀ ≈ ${formatNumber(result.baslangicMiktar)}`,
          ],
        },
      ];
    }

    if (target === "sure") {
      return [
        {
          title: "1. Adım — Geçen süre",
          lines: [
            "t = t½ × log₂(N₀ / N)",
            `t = ${formatNumber(fromSeconds(result.yariOmurSaniye, yariOmurUnit))} ${yariOmurUnit} × log₂(${formatNumber(result.baslangicMiktar)} / ${formatNumber(result.kalanMiktar)})`,
            `t ≈ ${formatNumber(fromSeconds(result.gecenSureSaniye, sureUnit))} ${sureUnit}`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Yarı ömür",
        lines: [
          "t½ = t / log₂(N₀ / N)",
          `t½ = ${formatNumber(fromSeconds(result.gecenSureSaniye, sureUnit))} ${sureUnit} / log₂(${formatNumber(result.baslangicMiktar)} / ${formatNumber(result.kalanMiktar)})`,
          `t½ ≈ ${formatNumber(fromSeconds(result.yariOmurSaniye, yariOmurUnit))} ${yariOmurUnit}`,
        ],
      },
    ];
  }, [result, target, sureUnit, yariOmurUnit]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin üç değeri gir (başlangıç/kalan miktar,
          geçen süre, yarı ömür), eksik olan dördüncüyü biz bulalım.
        </p>

        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabels) as HalfLifeTarget[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${target === key ? " is-active" : ""}`}
                onClick={() => setTarget(key)}
              >
                {targetLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target !== "kalan" && (
            <label className="category-general-converter-field">
              <span>Kalan Miktar</span>
              <input
                inputMode="decimal"
                type="text"
                value={kalanInput}
                onChange={(event) => setKalanInput(event.target.value)}
              />
            </label>
          )}

          {target !== "baslangic" && (
            <label className="category-general-converter-field">
              <span>Başlangıç Miktarı</span>
              <input
                inputMode="decimal"
                type="text"
                value={baslangicInput}
                onChange={(event) => setBaslangicInput(event.target.value)}
              />
            </label>
          )}

          {target !== "sure" && (
            <>
              <label className="category-general-converter-field">
                <span>Geçen Süre</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={sureInput}
                  onChange={(event) => setSureInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Süre Birimi</span>
                <select
                  value={sureUnit}
                  onChange={(event) => setSureUnit(event.target.value)}
                >
                  {timeUnits.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {target !== "yariOmur" && (
            <>
              <label className="category-general-converter-field">
                <span>Yarı Ömür</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={yariOmurInput}
                  onChange={(event) => setYariOmurInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Yarı Ömür Birimi</span>
                <select
                  value={yariOmurUnit}
                  onChange={(event) => setYariOmurUnit(event.target.value)}
                >
                  {timeUnits.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {target === "sure" && (
            <label className="category-general-converter-field">
              <span>Süre Sonuç Birimi</span>
              <select
                value={sureUnit}
                onChange={(event) => setSureUnit(event.target.value)}
              >
                {timeUnits.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          {target === "yariOmur" && (
            <label className="category-general-converter-field">
              <span>Yarı Ömür Sonuç Birimi</span>
              <select
                value={yariOmurUnit}
                onChange={(event) => setYariOmurUnit(event.target.value)}
              >
                {timeUnits.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Kalan Miktar</span>
              <strong>{formatNumber(result.kalanMiktar)}</strong>
            </div>
            <div>
              <span>Başlangıç Miktarı</span>
              <strong>{formatNumber(result.baslangicMiktar)}</strong>
            </div>
            <div>
              <span>Geçen Süre</span>
              <strong>
                {formatNumber(fromSeconds(result.gecenSureSaniye, sureUnit))}{" "}
                {sureUnit}
              </strong>
            </div>
            <div>
              <span>Yarı Ömür</span>
              <strong>
                {formatNumber(fromSeconds(result.yariOmurSaniye, yariOmurUnit))}{" "}
                {yariOmurUnit}
              </strong>
            </div>
            <div>
              <span>Kaç Yarı Ömür Geçti</span>
              <strong>{formatNumber(result.gecenYariOmurSayisi, 2)}</strong>
            </div>
            <div>
              <span>Kalan Yüzde</span>
              <strong>{formatNumber(result.kalanYuzde, 2)} %</strong>
            </div>
          </div>
        )}
      </div>

      {steps && (
        <div className="calculator-steps">
          <h3>Adım Adım Çözüm</h3>
          {steps.map((step) => (
            <div className="calculator-step" key={step.title}>
              <p className="calculator-step-title">{step.title}</p>
              {step.lines.map((line) => (
                <p className="calculator-step-line" key={line}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

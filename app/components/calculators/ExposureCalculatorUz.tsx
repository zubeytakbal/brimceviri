"use client";

import { useMemo, useState } from "react";
import {
  calculateMissingAperture,
  calculateMissingIso,
  calculateMissingShutter,
  formatShutterSpeed,
  parseShutterSpeed,
} from "../../converter/exposureCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function formatAperture(value: number): string {
  return `f/${value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })}`;
}

export default function ExposureCalculatorUz() {
  const [iso1Input, setIso1Input] = useState("100");
  const [aperture1Input, setAperture1Input] = useState("5.6");
  const [shutter1Input, setShutter1Input] = useState("1/125");

  const [iso2Input, setIso2Input] = useState("");
  const [aperture2Input, setAperture2Input] = useState("");
  const [shutter2Input, setShutter2Input] = useState("");

  const iso1 = parseNumericValue(iso1Input);
  const aperture1 = parseNumericValue(aperture1Input);
  const shutter1 = parseShutterSpeed(shutter1Input);
  const currentInvalid = iso1 === null || aperture1 === null || shutter1 === null;

  const iso2 = parseNumericValue(iso2Input);
  const aperture2 = parseNumericValue(aperture2Input);
  const shutter2 = parseShutterSpeed(shutter2Input);

  const filledCount = [iso2, aperture2, shutter2].filter((value) => value !== null).length;

  const result = useMemo(() => {
    if (currentInvalid || iso1 === null || aperture1 === null || shutter1 === null) {
      return null;
    }

    if (filledCount === 2 && iso2 === null) {
      const value = calculateMissingIso(iso1, aperture1, shutter1, aperture2!, shutter2!);
      return value !== null ? { field: "iso" as const, value } : null;
    }

    if (filledCount === 2 && aperture2 === null) {
      const value = calculateMissingAperture(iso1, aperture1, shutter1, iso2!, shutter2!);
      return value !== null ? { field: "aperture" as const, value } : null;
    }

    if (filledCount === 2 && shutter2 === null) {
      const value = calculateMissingShutter(iso1, aperture1, shutter1, iso2!, aperture2!);
      return value !== null ? { field: "shutter" as const, value } : null;
    }

    return null;
  }, [currentInvalid, iso1, aperture1, shutter1, iso2, aperture2, shutter2, filledCount]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Mavjud Sozlamalar</span>
        </div>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>ISO</span>
            <input type="text" inputMode="numeric" value={iso1Input} onChange={(event) => setIso1Input(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Diafragma (f/)</span>
            <input type="text" inputMode="decimal" value={aperture1Input} onChange={(event) => setAperture1Input(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Chodir Tezligi (s)</span>
            <input type="text" value={shutter1Input} onChange={(event) => setShutter1Input(event.target.value)} placeholder="1/125" />
          </label>
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Yangi Sozlamalar — ikkitasini kiriting, uchinchisi hisoblanadi</span>
        </div>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>ISO</span>
            <input type="text" inputMode="numeric" value={iso2Input} onChange={(event) => setIso2Input(event.target.value)} placeholder="masalan 400" />
          </label>
          <label className="category-general-converter-field">
            <span>Diafragma (f/)</span>
            <input type="text" inputMode="decimal" value={aperture2Input} onChange={(event) => setAperture2Input(event.target.value)} placeholder="masalan 2.8" />
          </label>
          <label className="category-general-converter-field">
            <span>Chodir Tezligi (s)</span>
            <input type="text" value={shutter2Input} onChange={(event) => setShutter2Input(event.target.value)} placeholder="masalan 1/500" />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {currentInvalid ? (
            <strong>Mavjud sozlamalarni (ISO, diafragma, chodir tezligi) to&apos;g&apos;ri qiymatlar bilan to&apos;ldiring.</strong>
          ) : filledCount < 2 ? (
            <strong>Yangi sozlamalardan ikkitasini kiriting, uchinchisini hisoblab beramiz.</strong>
          ) : filledCount === 3 ? (
            <strong>Uchinchi maydonni hisoblatish uchun faqat ikkitasini to&apos;ldiring, birini bo&apos;sh qoldiring.</strong>
          ) : !result ? (
            <strong>To&apos;g&apos;ri qiymatlar kiritib natijani ko&apos;rishingiz mumkin.</strong>
          ) : result.field === "iso" ? (
            <strong>Kerakli ISO: {Math.round(result.value)}</strong>
          ) : result.field === "aperture" ? (
            <strong>Kerakli Diafragma: {formatAperture(result.value)}</strong>
          ) : (
            <strong>Kerakli Chodir Tezligi: {formatShutterSpeed(result.value)}</strong>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { calculateUzLicenseRenewal } from "../../converter/licenseRenewalCalculatorUz";

function formatDateUz(isoDate: string): string {
  try {
    return new Date(`${isoDate}T00:00:00`).toLocaleDateString("uz-UZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

function formatRemaining(daysRemaining: number): string {
  if (daysRemaining < 0) {
    return `${Math.abs(daysRemaining).toLocaleString("uz-UZ")} kun oldin tugagan`;
  }
  const years = Math.floor(daysRemaining / 365.25);
  const months = Math.floor((daysRemaining - years * 365.25) / 30.44);
  if (years <= 0 && months <= 0) {
    return `${daysRemaining} kun qoldi`;
  }
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yil`);
  if (months > 0) parts.push(`${months} oy`);
  return `${parts.join(" ")} qoldi`;
}

export default function LicenseRenewalCalculatorUz() {
  const [issueDate, setIssueDate] = useState("");

  const result = issueDate ? calculateUzLicenseRenewal({ issueDate }) : null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Guvohnomaning Berilgan/So&apos;nggi Yangilangan Sanasi</span>
          <input
            type="date"
            value={issueDate}
            onChange={(event) => setIssueDate(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Sanani kiritib yangilash sanasini ko&apos;ring.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>{result.isExpired ? "Muddati Tugagan" : "Yangilash Sanasi"}</strong>
                  </td>
                  <td>
                    <strong>{formatDateUz(result.expiryDate)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Qolgan Muddat</td>
                  <td>{formatRemaining(result.daysRemaining)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> O&apos;zbekistonda barcha
        toifadagi (A1, A, B, BE, C, CE, D, DE) haydovchilik
        guvohnomalari 10 yil amal qiladi. Muddati tugagan guvohnoma
        bilan transport vositasini haydash qonuniy emas. Yangilash
        uchun dolzarb tibbiy ma&apos;lumotnoma va davlat boji
        to&apos;lovi talab qilinadi. Bu hisoblash umumiy
        yo&apos;naltiruvchi ma&apos;lumot; aniq ma&apos;lumot uchun
        rasmiy manbani tekshirish tavsiya etiladi.
      </p>
    </div>
  );
}

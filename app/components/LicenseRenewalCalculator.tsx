"use client";

import { useState } from "react";
import { calculateLicenseRenewal } from "../converter/licenseRenewalCalculator";
import { licenseClasses, type LicenseClassId } from "../converter/licenseClassFinder";

function formatDateTr(isoDate: string): string {
  try {
    return new Date(`${isoDate}T00:00:00`).toLocaleDateString("tr-TR", {
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
    return `${Math.abs(daysRemaining).toLocaleString("tr-TR")} gün önce doldu`;
  }
  const years = Math.floor(daysRemaining / 365.25);
  const months = Math.floor((daysRemaining - years * 365.25) / 30.44);
  if (years <= 0 && months <= 0) {
    return `${daysRemaining} gün kaldı`;
  }
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yıl`);
  if (months > 0) parts.push(`${months} ay`);
  return `${parts.join(" ")} kaldı`;
}

export default function LicenseRenewalCalculator() {
  const [licenseClassId, setLicenseClassId] = useState<LicenseClassId>("B");
  const [issueDate, setIssueDate] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const result =
    issueDate && birthDate
      ? calculateLicenseRenewal({ licenseClassId, issueDate, birthDate })
      : null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Ehliyet Sınıfı</span>
          <select
            value={licenseClassId}
            onChange={(event) => setLicenseClassId(event.target.value as LicenseClassId)}
          >
            {Object.values(licenseClasses).map((licenseClass) => (
              <option key={licenseClass.id} value={licenseClass.id}>
                {licenseClass.label} Sınıfı ({licenseClass.validityYears} yıl geçerli)
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Ehliyetin Veriliş/Son Yenileme Tarihi</span>
          <input
            type="date"
            value={issueDate}
            onChange={(event) => setIssueDate(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Doğum Tarihi</span>
          <input
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Tarihleri girerek yenileme tarihini gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>{result.isExpired ? "Süresi Doldu" : "Yenileme Tarihi"}</strong>
                  </td>
                  <td>
                    <strong>{formatDateTr(result.expiryDate)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Kalan Süre</td>
                  <td>{formatRemaining(result.daysRemaining)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {result && result.ageCaution !== "none" && (
        <p className="calculator-usage-hint">
          <strong>Not:</strong> Yenileme tarihinde{" "}
          {result.ageCaution === "80-plus" ? "80" : "65"} yaş ve üzerinde
          olacaksın. Bu yaş grubunda yenileme süresi, doktorun düzenlediği
          sağlık raporunun geçerlilik süresine bağlı olarak daha kısa
          olabilir (genellikle {result.ageCaution === "80-plus" ? "2" : "3"}{" "}
          yıl) — bu sabit bir yasa maddesi değil, sağlık durumuna göre
          değişir. Kesin süre için güncel sağlık raporunu kontrol etmen
          önerilir.
        </p>
      )}

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Süresi dolan bir sürücü belgesiyle trafiğe
        çıkmak yasal değildir; belge fiilen geçersiz sayılır. Yenileme için
        güncel sağlık raporu ve harç/değerli kağıt ücreti gerekir. Bu
        hesaplama genel bir yönlendirmedir, kesin bilgi için resmi kaynağı
        kontrol etmen önerilir.
      </p>
    </div>
  );
}

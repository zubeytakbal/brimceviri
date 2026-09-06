"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateAttendance,
  type AttendanceMode,
} from "../converter/attendanceCalculator";

type SupportedLocale = "tr" | "en";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

const modeLabels: Record<AttendanceMode, string> = {
  gun: "Gün Bazlı (Okul)",
  yuzde: "Yüzde/Saat Bazlı (Üniversite)",
};

export default function AttendanceCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const [mode, setMode] = useState<AttendanceMode>("gun");

  const [totalSchoolDays, setTotalSchoolDays] = useState("180");
  const [allowedAbsenceDays, setAllowedAbsenceDays] = useState("10");
  const [usedAbsenceDays, setUsedAbsenceDays] = useState("0");

  const [totalClassHours, setTotalClassHours] = useState("100");
  const [allowedAbsencePercent, setAllowedAbsencePercent] = useState("30");
  const [usedAbsenceHours, setUsedAbsenceHours] = useState("0");

  const result = useMemo(
    () =>
      calculateAttendance({
        mode,
        totalSchoolDays: parseNumericValue(totalSchoolDays),
        allowedAbsenceDays: parseNumericValue(allowedAbsenceDays),
        usedAbsenceDays: parseNumericValue(usedAbsenceDays),
        totalClassHours: parseNumericValue(totalClassHours),
        allowedAbsencePercent: parseNumericValue(allowedAbsencePercent),
        usedAbsenceHours: parseNumericValue(usedAbsenceHours),
      }),
    [
      mode,
      totalSchoolDays,
      allowedAbsenceDays,
      usedAbsenceDays,
      totalClassHours,
      allowedAbsencePercent,
      usedAbsenceHours,
    ]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Hesaplama Türü</span>
          <div className="engineering-target-grid">
            {(Object.keys(modeLabels) as AttendanceMode[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${mode === key ? " is-active" : ""}`}
                onClick={() => setMode(key)}
              >
                {modeLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {mode === "gun" ? (
            <>
              <label className="category-general-converter-field">
                <span>Toplam Eğitim Günü</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={totalSchoolDays}
                  onChange={(event) => setTotalSchoolDays(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>İzin Verilen Devamsızlık (gün)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={allowedAbsenceDays}
                  onChange={(event) => setAllowedAbsenceDays(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Kullanılan Devamsızlık (gün)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={usedAbsenceDays}
                  onChange={(event) => setUsedAbsenceDays(event.target.value)}
                />
              </label>
            </>
          ) : (
            <>
              <label className="category-general-converter-field">
                <span>Toplam Ders Saati</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={totalClassHours}
                  onChange={(event) => setTotalClassHours(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>İzin Verilen Devamsızlık (%)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={allowedAbsencePercent}
                  onChange={(event) => setAllowedAbsencePercent(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Kullanılan Devamsızlık (saat)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={usedAbsenceHours}
                  onChange={(event) => setUsedAbsenceHours(event.target.value)}
                />
              </label>
            </>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result.success ? (
          <strong>{result.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>İzin Verilen Toplam</span>
              <strong>
                {formatLocalizedNumber(result.result.allowedTotal, locale, {
                  maximumFractionDigits: 2,
                })}{" "}
                {result.result.unitLabel}
              </strong>
            </div>
            <div>
              <span>Kullanılan</span>
              <strong>
                {formatLocalizedNumber(result.result.used, locale, {
                  maximumFractionDigits: 2,
                })}{" "}
                {result.result.unitLabel}
              </strong>
            </div>
            <div>
              <span>Kalan Hak</span>
              <strong>
                {formatLocalizedNumber(result.result.remaining, locale, {
                  maximumFractionDigits: 2,
                })}{" "}
                {result.result.unitLabel}
              </strong>
            </div>
            <div>
              <span>Kullanım Oranı</span>
              <strong>
                %{formatLocalizedNumber(result.result.usedPercent, locale, {
                  maximumFractionDigits: 1,
                })}
              </strong>
            </div>
            <div>
              <span>Durum</span>
              <strong>
                {result.result.isOverLimit ? "Sınır Aşıldı" : "Sınırın Altında"}
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">
        Not: her okul, üniversite ve ders için devamsızlık kuralları
        kurumun kendi yönetmeliğine göre değişir. Bu araç, sana bildirilen
        günlük/saatlik limitleri ve yüzdeyi kullanarak hesaplama yapar —
        kesin kural için kurumunun yönetmeliğini veya öğrenci işleri
        biriminizi esas al.
      </p>
    </div>
  );
}

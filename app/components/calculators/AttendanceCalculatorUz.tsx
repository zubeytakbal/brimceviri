"use client";

import { useMemo, useState } from "react";
import {
  calculateAttendance,
  type AttendanceMode,
} from "../../converter/attendanceCalculator";

const modeLabelsUz: Record<AttendanceMode, string> = {
  gun: "Kun Asosida (Maktab)",
  yuzde: "Foiz/Soat Asosida (Universitet)",
};

const errorMessagesUz: Record<string, string> = {
  "Toplam eğitim günü 0'dan büyük olmalı.": "Jami o'quv kuni 0 dan katta bo'lishi kerak.",
  "İzin verilen devamsızlık günü 0 veya daha büyük olmalı.": "Ruxsat etilgan davomatsizlik kuni 0 yoki undan katta bo'lishi kerak.",
  "Kullanılan devamsızlık günü 0 veya daha büyük olmalı.": "Ishlatilgan davomatsizlik kuni 0 yoki undan katta bo'lishi kerak.",
  "Toplam ders saati 0'dan büyük olmalı.": "Jami dars soati 0 dan katta bo'lishi kerak.",
  "İzin verilen devamsızlık yüzdesi 0-100 arasında olmalı.": "Ruxsat etilgan davomatsizlik foizi 0-100 oralig'ida bo'lishi kerak.",
  "Kullanılan devamsızlık saati 0 veya daha büyük olmalı.": "Ishlatilgan davomatsizlik soati 0 yoki undan katta bo'lishi kerak.",
};

const unitLabelsUz: Record<"gün" | "saat", string> = {
  gün: "kun",
  saat: "soat",
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function AttendanceCalculatorUz() {
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
          <span>Hisoblash Turi</span>
          <div className="engineering-target-grid">
            {(Object.keys(modeLabelsUz) as AttendanceMode[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${mode === key ? " is-active" : ""}`}
                onClick={() => setMode(key)}
              >
                {modeLabelsUz[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {mode === "gun" ? (
            <>
              <label className="category-general-converter-field">
                <span>Jami O&apos;quv Kuni</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={totalSchoolDays}
                  onChange={(event) => setTotalSchoolDays(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Ruxsat Etilgan Davomatsizlik (kun)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={allowedAbsenceDays}
                  onChange={(event) => setAllowedAbsenceDays(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Ishlatilgan Davomatsizlik (kun)</span>
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
                <span>Jami Dars Soati</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={totalClassHours}
                  onChange={(event) => setTotalClassHours(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Ruxsat Etilgan Davomatsizlik (%)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={allowedAbsencePercent}
                  onChange={(event) => setAllowedAbsencePercent(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Ishlatilgan Davomatsizlik (soat)</span>
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
          <strong>{errorMessagesUz[result.message] ?? result.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Ruxsat Etilgan Jami</span>
              <strong>
                {formatNumber(result.result.allowedTotal)}{" "}
                {unitLabelsUz[result.result.unitLabel]}
              </strong>
            </div>
            <div>
              <span>Ishlatilgan</span>
              <strong>
                {formatNumber(result.result.used)}{" "}
                {unitLabelsUz[result.result.unitLabel]}
              </strong>
            </div>
            <div>
              <span>Qolgan Huquq</span>
              <strong>
                {formatNumber(result.result.remaining)}{" "}
                {unitLabelsUz[result.result.unitLabel]}
              </strong>
            </div>
            <div>
              <span>Foydalanish Nisbati</span>
              <strong>%{formatNumber(result.result.usedPercent, 1)}</strong>
            </div>
            <div>
              <span>Holat</span>
              <strong>
                {result.result.isOverLimit ? "Chegara Oshib Ketdi" : "Chegara Ostida"}
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">
        Eslatma: har bir maktab, universitet va fan uchun davomatsizlik
        qoidalari muassasaning o&apos;z nizomiga qarab o&apos;zgaradi.
        Bu vosita sizga ma&apos;lum bo&apos;lgan kunlik/soatlik chegara
        va foizdan foydalanib hisoblaydi — aniq qoida uchun
        muassasangizning nizomini yoki talabalar bo&apos;limini asos
        qiling.
      </p>
    </div>
  );
}

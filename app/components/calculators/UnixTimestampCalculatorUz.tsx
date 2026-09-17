"use client";

import { useMemo, useState } from "react";
import { timestampToDate, type TimestampUnit } from "../../converter/unixTimestampCalculator";
import {
  formatTashkentDateTime,
  formatUtcDateTimeUz,
  getTashkentWeekday,
  tashkentDateTimeToTimestamp,
} from "../../converter/unixTimestampCalculatorUz";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

const DATE_INPUT_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;

export default function UnixTimestampCalculatorUz() {
  const [timestampInput, setTimestampInput] = useState("");
  const [unit, setUnit] = useState<TimestampUnit>("seconds");
  const [dateInput, setDateInput] = useState("");

  const timestampNumber = parseNumericValue(timestampInput);
  const dateFromTimestamp =
    timestampNumber !== null ? timestampToDate(timestampNumber, unit) : null;
  const timestampInvalid = timestampInput.trim().length > 0 && !dateFromTimestamp;

  const dateParts = useMemo(() => {
    const match = dateInput.match(DATE_INPUT_PATTERN);
    if (!match) return null;
    const [, y, mo, d, h, mi] = match;
    return {
      year: Number(y),
      month: Number(mo),
      day: Number(d),
      hour: Number(h),
      minute: Number(mi),
    };
  }, [dateInput]);

  const timestampFromDate = dateParts
    ? tashkentDateTimeToTimestamp(
        dateParts.year,
        dateParts.month,
        dateParts.day,
        dateParts.hour,
        dateParts.minute
      )
    : null;

  const handleNow = () => {
    const now = Date.now();
    setTimestampInput(unit === "seconds" ? String(Math.floor(now / 1000)) : String(now));
  };

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Birlik</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${unit === "seconds" ? " is-active" : ""}`}
              onClick={() => setUnit("seconds")}
            >
              Soniya
            </button>
            <button
              type="button"
              className={`engineering-target-button${unit === "milliseconds" ? " is-active" : ""}`}
              onClick={() => setUnit("milliseconds")}
            >
              Millisoniya
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Unix Vaqt Tamg&apos;asi</span>
            <input
              type="text"
              inputMode="numeric"
              value={timestampInput}
              onChange={(event) => setTimestampInput(event.target.value)}
              placeholder="1735689600"
            />
          </label>
          <button type="button" className="engineering-clear-button" onClick={handleNow}>
            Hozirgi Vaqt Tamg&apos;asi
          </button>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {timestampInvalid ? (
            <strong>To&apos;g&apos;ri vaqt tamg&apos;asini kiriting.</strong>
          ) : !dateFromTimestamp ? (
            <strong>Vaqt tamg&apos;asini kiritib sanani ko&apos;rishingiz mumkin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Toshkent Vaqti (UTC+5) — {getTashkentWeekday(dateFromTimestamp)}</span>
                <strong>{formatTashkentDateTime(dateFromTimestamp)}</strong>
              </div>
              <div>
                <span>UTC</span>
                <strong>{formatUtcDateTimeUz(dateFromTimestamp)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Sana va Vaqt (Toshkent vaqti bilan)</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Sana / Vaqt</span>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(event) => setDateInput(event.target.value)}
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {!timestampFromDate ? (
            <strong>Sana va vaqtni tanlab vaqt tamg&apos;asini ko&apos;rishingiz mumkin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Soniya</span>
                <strong>{timestampFromDate.seconds}</strong>
              </div>
              <div>
                <span>Millisoniya</span>
                <strong>{timestampFromDate.milliseconds}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

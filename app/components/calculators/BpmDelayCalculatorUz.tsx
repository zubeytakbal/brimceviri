"use client";

import { useMemo, useState } from "react";
import {
  calculateNoteTimings,
  msToBpm,
  noteDivisions,
} from "../../converter/bpmDelayCalculator";

const noteLabelsUz: Record<string, string> = {
  "1-1": "Butun Nota (1/1)",
  "1-2": "Yarim Nota (1/2)",
  "1-4": "Chorak Nota (1/4)",
  "1-8": "Sakkizlik (1/8)",
  "1-16": "O'n oltilik (1/16)",
  "1-32": "O'ttiz ikkilik (1/32)",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatMs(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 });
}

export default function BpmDelayCalculatorUz() {
  const [bpmInput, setBpmInput] = useState("120");
  const [msInput, setMsInput] = useState("");
  const [noteId, setNoteId] = useState(noteDivisions[2].id);

  const bpmNumber = parseNumericValue(bpmInput);
  const timings = bpmNumber !== null ? calculateNoteTimings(bpmNumber) : null;
  const bpmInvalid = bpmInput.trim().length > 0 && !timings;

  const selectedNote = noteDivisions.find((division) => division.id === noteId) ?? noteDivisions[2];
  const msNumber = parseNumericValue(msInput);
  const bpmFromMs = useMemo(
    () => (msNumber !== null ? msToBpm(msNumber, selectedNote.beats) : null),
    [msNumber, selectedNote]
  );
  const msInvalid = msInput.trim().length > 0 && !bpmFromMs;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Tempo (BPM)</span>
            <input
              type="text"
              inputMode="decimal"
              value={bpmInput}
              onChange={(event) => setBpmInput(event.target.value)}
              placeholder="120"
            />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="conversion-table-wrap">
        {bpmInvalid ? (
          <p>
            <strong>To&apos;g&apos;ri BPM qiymatini kiriting.</strong>
          </p>
        ) : !timings ? (
          <p>
            <strong>BPM qiymatini kiritib nota davomiyliklarini ko&apos;rishingiz mumkin.</strong>
          </p>
        ) : (
          <table className="conversion-table">
            <caption>{bpmInput} BPM uchun delay/reverb davomiyliklari (ms)</caption>
            <thead>
              <tr>
                <th scope="col">Nota Qiymati</th>
                <th scope="col">Oddiy</th>
                <th scope="col">Nuqtali (×1,5)</th>
                <th scope="col">Triol (×2/3)</th>
              </tr>
            </thead>
            <tbody>
              {timings.map((row) => (
                <tr key={row.id}>
                  <td>{noteLabelsUz[row.id] ?? row.label}</td>
                  <td>{formatMs(row.straightMs)} ms</td>
                  <td>{formatMs(row.dottedMs)} ms</td>
                  <td>{formatMs(row.tripletMs)} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Bilgan davomiyligimdan (ms) BPM topish</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Davomiylik (ms)</span>
            <input
              type="text"
              inputMode="decimal"
              value={msInput}
              onChange={(event) => setMsInput(event.target.value)}
              placeholder="500"
            />
          </label>
          <label className="category-general-converter-field">
            <span>Bu davomiylik qaysi nota qiymatiga to&apos;g&apos;ri keladi?</span>
            <select value={noteId} onChange={(event) => setNoteId(event.target.value)}>
              {noteDivisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {noteLabelsUz[division.id] ?? division.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {msInvalid ? (
            <strong>To&apos;g&apos;ri davomiylik kiriting.</strong>
          ) : !bpmFromMs ? (
            <strong>Davomiylik kiritib BPM ni ko&apos;rishingiz mumkin.</strong>
          ) : (
            <strong>{formatMs(bpmFromMs)} BPM</strong>
          )}
        </div>
      </div>
    </div>
  );
}

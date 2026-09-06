"use client";

import { useMemo, useState } from "react";
import {
  calculateNoteTimings,
  msToBpm,
  noteDivisions,
} from "../converter/bpmDelayCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatMs(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

export default function BpmDelayCalculator() {
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
            <strong>Geçerli bir BPM değeri gir.</strong>
          </p>
        ) : !timings ? (
          <p>
            <strong>Bir BPM değeri girerek nota sürelerini görebilirsin.</strong>
          </p>
        ) : (
          <table className="conversion-table">
            <caption>{bpmInput} BPM için delay/reverb süreleri (ms)</caption>
            <thead>
              <tr>
                <th scope="col">Nota Değeri</th>
                <th scope="col">Düz</th>
                <th scope="col">Noktalı (×1,5)</th>
                <th scope="col">Triole (×2/3)</th>
              </tr>
            </thead>
            <tbody>
              {timings.map((row) => (
                <tr key={row.id}>
                  <td>{row.label}</td>
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
          <span>Bildiğim süreden (ms) BPM bul</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Süre (ms)</span>
            <input
              type="text"
              inputMode="decimal"
              value={msInput}
              onChange={(event) => setMsInput(event.target.value)}
              placeholder="500"
            />
          </label>
          <label className="category-general-converter-field">
            <span>Bu süre hangi nota değerine denk geliyor?</span>
            <select value={noteId} onChange={(event) => setNoteId(event.target.value)}>
              {noteDivisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.label}
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
            <strong>Geçerli bir süre gir.</strong>
          ) : !bpmFromMs ? (
            <strong>Bir süre girerek BPM&apos;i görebilirsin.</strong>
          ) : (
            <strong>{formatMs(bpmFromMs)} BPM</strong>
          )}
        </div>
      </div>
    </div>
  );
}

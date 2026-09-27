"use client";

// Kronometre: saliselik gosterim, turlar (en hizli / en yavas), CSV indirme.
import { useState } from "react";
import { timeToolsCopy, type TimeToolsLocale } from "./timeToolsCopy";
import { formatDuration, useNow } from "./useNow";

export default function Stopwatch({ locale }: { locale: TimeToolsLocale }) {
  const copy = timeToolsCopy[locale];
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [accumulated, setAccumulated] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const running = startedAt !== null;
  const now = useNow(running);
  const elapsed = accumulated + (running && now ? now.getTime() - startedAt : 0);

  const lapDurations = laps.map((total, index) => total - (index > 0 ? laps[index - 1] : 0));
  const fastest = lapDurations.length > 1 ? Math.min(...lapDurations) : null;
  const slowest = lapDurations.length > 1 ? Math.max(...lapDurations) : null;

  const toggle = () => {
    if (running) {
      setAccumulated(elapsed);
      setStartedAt(null);
    } else {
      setStartedAt(Date.now());
    }
  };

  const download = () => {
    const rows = [["#", copy.stopwatch.lapTime, copy.stopwatch.total]];
    laps.forEach((total, index) => rows.push([String(index + 1), formatDuration(lapDurations[index], true), formatDuration(total, true)]));
    const blob = new Blob([rows.map((row) => row.join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "laps.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="time-tool category-general-converter">
      <div className="time-stopwatch-panel">
        <strong className="time-stopwatch-readout">{formatDuration(elapsed, true)}</strong>
        <div className="time-timer-controls">
          <button type="button" className="time-tool-button" onClick={toggle}>
            {running ? copy.stopwatch.stop : copy.stopwatch.start}
          </button>
          <button
            type="button"
            className="time-tool-button is-secondary"
            onClick={() => (running ? setLaps((current) => [...current, elapsed]) : (setAccumulated(0), setLaps([])))}
            disabled={!running && elapsed === 0}
          >
            {running ? copy.stopwatch.lap : copy.stopwatch.reset}
          </button>
        </div>
      </div>

      <div className="category-general-converter-result">
        <p className="sleep-result-intro">{copy.stopwatch.laps}</p>
        {laps.length === 0 ? (
          <p className="time-tool-empty">{copy.stopwatch.empty}</p>
        ) : (
          <>
            <ol className="time-lap-list">
              {laps
                .map((total, index) => ({ total, lap: lapDurations[index], index }))
                .reverse()
                .map(({ total, lap, index }) => (
                  <li key={index} className={lap === fastest ? "is-fastest" : lap === slowest ? "is-slowest" : undefined}>
                    <span>#{index + 1}</span>
                    <strong>{formatDuration(lap, true)}</strong>
                    <span>{formatDuration(total, true)}</span>
                    <em>{lap === fastest ? copy.stopwatch.fastest : lap === slowest ? copy.stopwatch.slowest : ""}</em>
                  </li>
                ))}
            </ol>
            <button type="button" className="time-tool-button is-secondary" onClick={download}>
              ⬇ {copy.stopwatch.download}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

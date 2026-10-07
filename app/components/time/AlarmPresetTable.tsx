// Hazır alarm saatleri tek sayfada: her kalkış saati için 90 dakikalık uyku döngüsüne göre
// önerilen yatış saatleri. Saat bağlantısı "?t=HH:MM" ile alarmı o saate kurar.
import { alarmPresetTimes } from "../../i18n/timeToolPaths";

const CYCLES = [6, 5, 4] as const;

function shift(time: string, delta: number) {
  const [h, m] = time.split(":").map(Number);
  const total = (((h * 60 + m + delta) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** 15 dakika uykuya dalma + n × 90 dakika döngü. */
export const bedTimeFor = (wake: string, cycles: number) => shift(wake, -15 - cycles * 90);

export default function AlarmPresetTable({
  id,
  heading,
  intro,
  wakeLabel,
  cycleLabel,
  format = (t: string) => t,
}: {
  id: string;
  heading: string;
  intro: string;
  wakeLabel: string;
  cycleLabel: (cycles: number, hours: number) => string;
  format?: (time: string) => string;
}) {
  return (
    <>
      <h2 id={id}>{heading}</h2>
      <p>{intro}</p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">{wakeLabel}</th>
              {CYCLES.map((c) => (
                <th scope="col" key={c}>
                  {cycleLabel(c, c * 1.5)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alarmPresetTimes.map((t) => (
              <tr key={t}>
                <th scope="row">
                  <a href={`?t=${t}`} rel="nofollow">
                    {format(t)}
                  </a>
                </th>
                {CYCLES.map((c) => (
                  <td key={c}>{format(bedTimeFor(t, c))}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

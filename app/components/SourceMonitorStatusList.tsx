import {
  sourceMonitorStatusLabels,
  type SourceMonitorDisplayEntry,
} from "../converter/licenseSourceMonitor";

export default function SourceMonitorStatusList({
  statuses,
}: {
  statuses: SourceMonitorDisplayEntry[];
}) {
  return (
    <>
      <h3>Otomatik kaynak izleme durumu</h3>
      <ul className="related-conversion-list">
        {statuses.map((entry) => {
          const display = sourceMonitorStatusLabels[entry.status] ?? sourceMonitorStatusLabels.not_configured;
          return (
            <li key={entry.id}>
              {display.icon} {entry.label} — {display.text}
              {entry.checkedAt ? ` (son kontrol: ${new Date(entry.checkedAt).toLocaleString("tr-TR")})` : ""}
            </li>
          );
        })}
      </ul>
      <p>
        Bu, kaynağın kendisini otomatik <em>değiştirmez</em> — sadece
        resmi kaynağın günlük olarak kontrol edilip değişip
        değişmediğini işaretleyen salt okunur bir izleme sistemidir.
      </p>
    </>
  );
}

// Hazır süreler tek sayfada: her süre ayrı bir sayfa yerine zamanlayıcının kendi sayfasında,
// kullanım örnekleriyle birlikte bir tabloda. Bağlantı "?s=saniye" ile süreyi kurar.
export type TimerPresetRow = { seconds: number; label: string; uses: string[] };

export default function TimerPresetTable({
  id,
  heading,
  intro,
  durationLabel,
  usesLabel,
  rows,
}: {
  id: string;
  heading: string;
  intro: string;
  durationLabel: string;
  usesLabel: string;
  rows: TimerPresetRow[];
}) {
  return (
    <>
      <h2 id={id}>{heading}</h2>
      <p>{intro}</p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">{durationLabel}</th>
              <th scope="col">{usesLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.seconds}>
                <th scope="row">
                  <a href={`?s=${r.seconds}`} rel="nofollow">
                    {r.label}
                  </a>
                </th>
                <td>{r.uses.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

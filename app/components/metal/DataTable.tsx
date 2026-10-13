/** Başlık satırı ve ilk sütunu satır başlığı olan basit veri tablosu. */
export default function DataTable({ caption, head, rows }: { caption: string; head: string[]; rows: Array<Array<string>> }) {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

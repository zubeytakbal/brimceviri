import CopyResultButton from "../CopyResultButton";

/** Anahtar–değer sonuç tablosu; her satırda kopyalama düğmesi. */
export default function SonucTablosu({
  satirlar,
  etiket,
}: {
  satirlar: Array<[string, string]>;
  etiket?: string;
}) {
  return (
    <table className="ag-sonuc" aria-label={etiket}>
      <tbody>
        {satirlar.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>
              <code>{v}</code>
            </td>
            <td>
              <CopyResultButton text={v} locale="tr" className="ag-kopyala" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Hesaplanan karsilastirma tablosu: satirdaki birimin 1 tanesi sutundaki birimden kac tane eder.
import { convert } from "../../converter/convert";
import type { CokluBirim } from "./CokluCevirici";
import { formatOkunur as formatSayi } from "./sayi";

export default function Matris({ category, birimler, semboller }: { category: string; birimler: CokluBirim[]; semboller: string[] }) {
  const bul = (v: string) => birimler.find((b) => b.value === v);
  const liste = semboller.filter((b) => bul(b));
  return (
    <div className="yy-tablo-kutu">
      <table className="yy-matris">
        <thead>
          <tr>
            <td />
            {liste.map((b) => (
              <th key={b} scope="col">
                {b}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {liste.map((satir) => (
            <tr key={satir}>
              <th scope="row">1 {bul(satir)!.label.toLocaleLowerCase("tr-TR")}</th>
              {liste.map((sutun) => (
                <td key={sutun} className={satir === sutun ? "yy-kosegen" : undefined}>
                  {formatSayi(convert(category, 1, satir, sutun))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

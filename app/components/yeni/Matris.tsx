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

/** Iki birimli kategoriler icin sik gorulen degerlerin karsilik tablosu (ör. 70, 100, 126 mg/dL -> mmol/L). */
export function DegerTablosu({
  category,
  birimler,
  semboller,
  degerler,
}: {
  category: string;
  birimler: CokluBirim[];
  semboller: string[];
  degerler: number[];
}) {
  // Ilk birim satirlardaki degerlerin birimi; digerleri birer sutun.
  const [kimden, ...kimeler] = semboller;
  // Ad zaten parantezli ("Desiteks (dtex)"), sembol parantezli ("mm (momme)") ya da adla ayniysa ("Tex") sembol eklenmez.
  const ad = (s: string) => {
    const l = birimler.find((b) => b.value === s)?.label ?? s;
    return l.includes("(") || s.includes("(") || l.toLowerCase() === s.toLowerCase() ? l : `${l} (${s})`;
  };
  return (
    <div className="yy-tablo-kutu">
      <table className="yy-matris yy-deger-tablosu">
        <thead>
          <tr>
            <th scope="col">{ad(kimden)}</th>
            {kimeler.map((k) => (
              <th key={k} scope="col">
                {ad(k)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {degerler.map((d) => (
            <tr key={d}>
              <td>{formatSayi(d)}</td>
              {kimeler.map((k) => (
                <td key={k}>{formatSayi(Number(convert(category, d, kimden, k).toPrecision(3)))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

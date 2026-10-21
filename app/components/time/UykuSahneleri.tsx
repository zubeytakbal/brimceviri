import GazeteBaslik from "../saat/GazeteBaslik";

// Uyku hesaplama sayfasının saat bölümü gazetesi: manşet, kalkış saatine göre yatış ve yatış saatine göre kalkış
// tabloları (15 dk uykuya dalma + 90 dk döngü) ve yaşa göre önerilen uyku süreleri (National Sleep Foundation, 2015).

const TR = "Europe/Istanbul";
const DALMA = 15;
const DONGU = 90;
const SUTUNLAR = [6, 5, 4];
const KALKISLAR = [5 * 60, 5 * 60 + 30, 6 * 60, 6 * 60 + 30, 7 * 60, 7 * 60 + 30, 8 * 60, 8 * 60 + 30, 9 * 60];
const YATISLAR = [21 * 60 + 30, 22 * 60, 22 * 60 + 30, 23 * 60, 23 * 60 + 30, 24 * 60, 24 * 60 + 30, 25 * 60, 26 * 60];

export const YAS_ONERILERI: Array<[string, string, number]> = [
  ["Yeni doğan (0-3 ay)", "14-17 saat", 17],
  ["Bebek (4-11 ay)", "12-15 saat", 15],
  ["1-2 yaş", "11-14 saat", 14],
  ["3-5 yaş", "10-13 saat", 13],
  ["6-13 yaş", "9-11 saat", 11],
  ["14-17 yaş", "8-10 saat", 10],
  ["18-64 yaş", "7-9 saat", 9],
  ["65 yaş ve üzeri", "7-8 saat", 8],
];

export const saatYaz = (dk: number) => {
  const m = ((dk % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};
export const yatisIcin = (kalkis: number, n: number) => saatYaz(kalkis - DALMA - n * DONGU);
export const kalkisIcin = (yatis: number, n: number) => saatYaz(yatis + DALMA + n * DONGU);

function Tablo({ satirlar, ilk, hesap }: { satirlar: number[]; ilk: string; hesap: (x: number, n: number) => string }) {
  return (
    <table className="sahne-tablo">
      <thead>
        <tr>
          <th>{ilk}</th>
          {SUTUNLAR.map((n) => (
            <th key={n}>
              {n} döngü ({(n * 1.5).toLocaleString("tr-TR")} sa)
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {satirlar.map((x) => (
          <tr key={x}>
            <td>
              <b>{saatYaz(x)}</b>
            </td>
            {SUTUNLAR.map((n) => (
              <td key={n}>{hesap(x, n)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function UykuSahneleri() {
  return (
    <div className="sahneler">
      <GazeteBaslik an={new Date()} timeZone={TR} baski="Türkiye" ad="Uyku Saati" />
      <div className="gazete-on is-fotosuz">
        <div className="gazete-manset-kutu">
          <p className="gazete-manset">Sabah 7&apos;de kalkacaksan 23:15&apos;te yat</p>
          <p className="gazete-spot">
            Uyku yaklaşık 90 dakikalık döngülerle ilerler; döngünün sonunda uyanmak ortasında uyanmaktan daha az sersemletir. 15 dakikalık
            uykuya dalma payıyla 07:00 için 5 döngü 23:15, 6 döngü 21:45 eder.
          </p>
        </div>
      </div>

      <section className="sahne is-sol" id="yatis-tablosu">
        <p className="sahne-etiket">01 · Kalkış saatine göre yatış saati</p>
        <h2 className="sahne-dev">Kaçta yatmalıyım?</h2>
        <p className="sahne-buyuk">
          <b>5-6 döngü</b> (7,5-9 saat) yetişkinler için önerilen aralık
        </p>
        <Tablo satirlar={KALKISLAR} ilk="Kalkış" hesap={yatisIcin} />
      </section>

      <section className="sahne is-sag" id="kalkis-tablosu">
        <p className="sahne-etiket">02 · Yatış saatine göre kalkış saati</p>
        <h2 className="sahne-dev">Kaçta kalkmalıyım?</h2>
        <p className="sahne-buyuk">
          &quot;şimdi uyusam&quot; sorusunun <b>hazır cevabı</b>
        </p>
        <Tablo satirlar={YATISLAR} ilk="Yatış" hesap={kalkisIcin} />
      </section>

      <section className="sahne" id="kac-saat">
        <p className="sahne-etiket">03 · Yaşa göre kaç saat uyumalıyım?</p>
        <h2 className="sahne-dev">7-9 saat</h2>
        <p className="sahne-buyuk">
          yetişkinler için; <b>çocuklarda ve gençlerde daha fazla</b>
        </p>
        <ul className="sahne-cubuklar">
          {YAS_ONERILERI.map(([grup, sure, ust]) => (
            <li key={grup}>
              <span className="sahne-cubuk-ad">{grup}</span>
              <span className="sahne-cubuk-alan">
                <span className="sahne-cubuk is-ileri" style={{ width: `${(ust / 17) * 50}%` }} />
              </span>
              <span className="sahne-cubuk-deger">{sure}</span>
            </li>
          ))}
        </ul>
        <p className="sahne-kucuk">Kaynak: National Sleep Foundation (Hirshkowitz ve ark., Sleep Health, 2015).</p>
      </section>
    </div>
  );
}

import Link from "@/app/components/SiteLink";
import type { YMD } from "../../converter/time/calendars";
import { weekdayOf, ymdKey } from "../../converter/time/dateMath";
import { turkeyHolidays } from "../../converter/time/holidays";
import GazeteBaslik from "../saat/GazeteBaslik";

// "Tarih hangi gün?" sayfasının saat bölümü gazetesi: bu yıl ve gelecek yıl önemli günlerin (resmî tatiller, bayramların
// ilk günü, 10 Kasım, Öğretmenler Günü, Sevgililer Günü) haftanın hangi gününe denk geldiği ve hafta sonuna gelen
// tatiller. Tarihler holidays.ts'den (2429 sayılı Kanun ve Diyanet takvimi) hesaplanır; site her gün yeniden derlenir.

const TR = "Europe/Istanbul";
const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const EK_GUNLER: Array<{ ad: string; month: number; day: number }> = [
  { ad: "Sevgililer Günü", month: 2, day: 14 },
  { ad: "Atatürk'ü Anma Günü (10 Kasım)", month: 11, day: 10 },
  { ad: "Öğretmenler Günü", month: 11, day: 24 },
];

function onemliGunler(year: number) {
  const tatil = turkeyHolidays(year)
    .filter((h) => h.kind === "full" && (h.dayIndex === undefined || h.dayIndex === 1))
    .map((h) => ({ ad: h.name.replace(/ 1\. Gün$/, ""), tarih: h.date, tatil: true, tahmini: Boolean(h.estimated) }));
  const ek = EK_GUNLER.map((e) => ({ ad: e.ad, tarih: { year, month: e.month, day: e.day } as YMD, tatil: false, tahmini: false }));
  return [...tatil, ...ek].sort((a, b) => ymdKey(a.tarih).localeCompare(ymdKey(b.tarih)));
}

export default function HangiGunSahneleri({ bugun }: { bugun: YMD }) {
  const yillar = [bugun.year, bugun.year + 1];
  const tablo = yillar.map((y) => ({ y, list: onemliGunler(y) }));
  const haftaSonu = turkeyHolidays(bugun.year + 1).filter((h) => h.kind === "full" && [0, 6].includes(weekdayOf(h.date)));
  const satirlar = tablo[0].list.map((g, i) => ({ g, sonraki: tablo[1].list.find((x) => x.ad === g.ad) ?? tablo[1].list[i] }));

  return (
    <div className="sahneler">
      <GazeteBaslik an={new Date(Date.UTC(bugun.year, bugun.month - 1, bugun.day, 9))} timeZone={TR} baski="Türkiye" />
      <div className="gazete-on is-fotosuz">
        <div className="gazete-manset-kutu">
          <p className="gazete-manset">
            {bugun.year + 1} yılında {haftaSonu.length} resmî tatil hafta sonuna denk geliyor
          </p>
          <p className="gazete-spot">
            Resmî tatiller her yıl haftanın başka bir gününe kayar; dini bayramlar ise Hicri takvime bağlı olduğu için yaklaşık 11
            gün öne gelir. Aşağıda {bugun.year} ve {bugun.year + 1} yıllarının önemli günleri hangi güne denk geliyor.
          </p>
        </div>
      </div>

      <section className="sahne is-sol" id="onemli">
        <p className="sahne-etiket">01 · Önemli günler hangi gün?</p>
        <table className="sahne-tablo">
          <thead>
            <tr>
              <th>Gün</th>
              <th>{yillar[0]}</th>
              <th>{yillar[1]}</th>
            </tr>
          </thead>
          <tbody>
            {satirlar.map(({ g, sonraki }) => (
              <tr key={g.ad}>
                <td>{g.ad}</td>
                <td>
                  {g.tarih.day} {AYLAR[g.tarih.month - 1]} <b>{GUNLER[weekdayOf(g.tarih)]}</b>
                </td>
                <td>
                  {sonraki ? (
                    <>
                      {sonraki.tarih.day} {AYLAR[sonraki.tarih.month - 1]} <b>{GUNLER[weekdayOf(sonraki.tarih)]}</b>
                      {sonraki.tahmini ? <small> (tahmini)</small> : null}
                    </>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="sahne is-sag" id="hafta-sonu">
        <p className="sahne-etiket">02 · {bugun.year + 1} hafta sonuna gelen tatiller</p>
        <h2 className="sahne-dev">{haftaSonu.length} gün</h2>
        <p className="sahne-buyuk">resmî tatil cumartesi ya da pazara denk geliyor</p>
        <ul className="sahne-kucuk">
          {haftaSonu.map((h) => (
            <li key={ymdKey(h.date)}>
              {h.date.day} {AYLAR[h.date.month - 1]} {GUNLER[weekdayOf(h.date)]}: {h.name}
            </li>
          ))}
          <li>
            Köprü günleri ve uzun hafta sonları için <Link href={`/resmi-tatiller/${bugun.year + 1}`}>{bugun.year + 1} resmî tatilleri</Link>.
          </li>
        </ul>
      </section>
    </div>
  );
}

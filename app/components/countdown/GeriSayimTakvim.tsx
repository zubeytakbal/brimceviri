// Türkçe geri sayım sayfalarının takvim bölümü: önceki tarihten bu yana geçen süre, kalan iş günü ve hafta sonu,
// hedefe kadar takvimdeki tatil, bayram, okul ve gökyüzü olayları ile hedef ayın takvimi. Site her gece yeniden
// derlendiği için derleme günü Türkiye'deki bugündür.
import Link from "@/app/components/SiteLink";
import { ayTumEtiketleri } from "../../converter/calendar/gokyuzuEtiketleri";
import { EVRE_ADI, trGunu, type Etiket } from "../../converter/calendar/gunEtiketleri";
import { AY_ADLARI, TAKVIM_YILLARI, takvimAyPath } from "../../converter/calendar/trTakvim";
import type { YMD } from "../../converter/time/calendars";
import { occurrenceInYear, type CountdownEvent, type DateParts } from "../../converter/time/countdownEvents";
import { addDaysYmd, diffDays, formatYmd, isWeekend, ymdKey } from "../../converter/time/dateMath";
import { turkeyHolidays } from "../../converter/time/holidays";

const EVRELER = new Set(Object.values(EVRE_ADI));
const ymd = (p: DateParts): YMD => ({ year: p.year, month: p.month, day: p.day });
const sayi = (n: number) => n.toLocaleString("tr-TR");

/** Bugün ile hedef arasındaki (ikisi hariç) günlerin dökümü. */
export function araDokum(bugun: YMD, hedef: YMD) {
  const tatil = new Map([bugun.year, hedef.year].flatMap((y) => turkeyHolidays(y)).map((h) => [ymdKey(h.date), h]));
  let isGunu = 0;
  let haftaSonu = 0;
  let tatilGunu = 0;
  for (let d = addDaysYmd(bugun, 1); diffDays(d, hedef) > 0; d = addDaysYmd(d, 1)) {
    const h = tatil.get(ymdKey(d));
    if (isWeekend(d)) haftaSonu += 1;
    else if (h?.kind === "full") tatilGunu += 1;
    else isGunu += h?.kind === "half" ? 0.5 : 1;
  }
  return { isGunu, haftaSonu, tatilGunu };
}

/** Hedefe kadar takvimdeki olaylar (ay evreleri ve fırtınalar hariç), aylara göre. */
export function aradakiOlaylar(bugun: YMD, hedef: YMD) {
  const aylar: Array<{ year: number; month: number; list: Array<{ day: number; e: Etiket }> }> = [];
  for (let i = bugun.year * 12 + bugun.month - 1; i <= hedef.year * 12 + hedef.month - 1 && aylar.length < 13; i += 1) {
    const y = Math.floor(i / 12);
    const m = (i % 12) + 1;
    const list = [...ayTumEtiketleri(y, m)]
      .filter(([day]) => {
        const d = { year: y, month: m, day };
        return diffDays(bugun, d) > 0 && diffDays(d, hedef) > 0;
      })
      .flatMap(([day, es]) => es.filter((e) => !e.devam && !EVRELER.has(e.ad) && e.href !== "/firtina-takvimi").map((e) => ({ day, e })))
      .sort((a, b) => a.day - b.day);
    if (list.length) aylar.push({ year: y, month: m, list });
  }
  return aylar;
}

/** kalan: sayaçla aynı kalan gün sayısı (tam günler). */
export default function GeriSayimTakvim({ event, next, now, kalan }: { event: CountdownEvent; next: DateParts; now: Date; kalan: number }) {
  const bugun = trGunu(now);
  const hedef = ymd(next);
  if (kalan <= 0 || diffDays(bugun, hedef) <= 0) return null;
  const onceki = occurrenceInYear(event, next.year - 1);
  const toplam = onceki ? diffDays(ymd(onceki), hedef) : 0;
  const yuzde = onceki && toplam > 0 ? Math.min(100, Math.max(0, Math.round((diffDays(ymd(onceki), bugun) / toplam) * 100))) : null;
  const d = araDokum(bugun, hedef);
  // Yalnızca hedeften önceki son 30 gün: liste her geri sayımda o güne özgü kalır.
  const aylar = aradakiOlaylar(kalan > 30 ? addDaysYmd(hedef, -31) : bugun, hedef);
  const hedefAy = AY_ADLARI[hedef.month - 1];
  return (
    <>
      <h2 id="takvim">{event.name} gelene kadar takvim</h2>
      {yuzde !== null && onceki ? (
        <figure className="gs-ilerleme">
          <div className="gs-ilerleme-cubuk" role="img" aria-label={`Önceki tarihten bu yana sürenin yüzde ${yuzde}'i geçti`}>
            <span style={{ width: `${yuzde}%` }} />
          </div>
          <figcaption>
            <span>Önceki: {formatYmd(ymd(onceki), "tr", false)}</span>
            <strong>
              %{yuzde} geçti · {sayi(kalan)} gün kaldı
            </strong>
            <span>{formatYmd(hedef, "tr", false)}</span>
          </figcaption>
        </figure>
      ) : null}
      <div className="date-calc-results">
        <div className="date-calc-stat">
          <span>Kalan iş günü</span>
          <strong>{String(d.isGunu).replace(".", ",")} gün</strong>
          <em>Hafta içi</em>
        </div>
        <div className="date-calc-stat">
          <span>Hafta sonu</span>
          <strong>{d.haftaSonu} gün</strong>
          <em>{Math.round(d.haftaSonu / 2)} hafta sonu</em>
        </div>
        <div className="date-calc-stat">
          <span>Arada resmî tatil</span>
          <strong>{d.tatilGunu} gün</strong>
          <em>Hafta içi, tam gün</em>
        </div>
      </div>
      {aylar.length ? (
        <>
          <h3>{event.name} öncesindeki {kalan > 30 ? "30 günde" : "günlerde"} takvimde neler var?</h3>
          {aylar.map((a) => (
            <section key={`${a.year}-${a.month}`} className="gs-ay">
              <h4>
                {TAKVIM_YILLARI.includes(a.year) ? (
                  <Link href={takvimAyPath(a.year, a.month)} prefetch={false}>
                    {AY_ADLARI[a.month - 1]} {a.year}
                  </Link>
                ) : (
                  `${AY_ADLARI[a.month - 1]} ${a.year}`
                )}
              </h4>
              <ul>
                {a.list.map(({ day, e }) => (
                  <li key={`${day}-${e.ad}`} className={`etk etk-${e.tur}`}>
                    <span className="etk-nokta" aria-hidden="true" />
                    <strong>
                      {day} {AY_ADLARI[a.month - 1]}
                    </strong>{" "}
                    <Link href={e.href} prefetch={false}>
                      {e.ad}
                    </Link>
                    {e.tahmini ? <small> (tahmini)</small> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      ) : null}
      {TAKVIM_YILLARI.includes(hedef.year) ? (
        <p>
          Ayın tüm günleri, tatilleri ve gökyüzü olayları:{" "}
          <Link href={takvimAyPath(hedef.year, hedef.month)}>
            {hedefAy} {hedef.year} takvimi
          </Link>
          .
        </p>
      ) : null}
    </>
  );
}

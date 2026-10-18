// Doğduğum gün sayfasının "bugün" bölümleri: bugünün tarihinde doğanların haftanın hangi günü doğduğu (yıl yıl),
// 7 sütunlu yıl tablosu ve bu tarihin önümüzdeki yıllarda denk geldiği günler. Site her gece yeniden derlendiği için
// derleme günü Türkiye'deki bugündür ve bu bölümler ham HTML'de her gün değişir.
import { AY_ADLARI, GUN_ADLARI } from "../../converter/calendar/trTakvim";
import { isLeapYear, weekdayOf } from "../../converter/time/dateMath";
import { trLocative } from "../../converter/turkishSuffix";
import type { TrDay } from "../sun/SunToday";

export const ILK_YIL = 1940;
// Pazartesi'den başlayan sütun sırası (weekdayOf: 0 = Pazar).
const SIRA = [1, 2, 3, 4, 5, 6, 0];
const KISA = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

export const gunAyMetni = (t: TrDay) => `${t.d} ${AY_ADLARI[t.m - 1]}`;

/** Bu gün ve ayın var olduğu yıllar (29 Şubat yalnızca artık yıllarda) ve haftanın günü. */
export function yillaraGore(t: TrDay, from: number, to: number) {
  const out: { year: number; wd: number }[] = [];
  for (let y = from; y <= to; y += 1) {
    if (t.m === 2 && t.d === 29 && !isLeapYear(y)) continue;
    out.push({ year: y, wd: weekdayOf({ year: y, month: t.m, day: t.d }) });
  }
  return out;
}

/** Kartlarda gösterilen doğum yılları: bugünden geriye 10'ar yıl (29 Şubat'ta en yakın artık yıl). */
export function ornekYillar(t: TrDay) {
  const yillar: number[] = [];
  for (let i = 1; i <= 5; i += 1) {
    let y = t.y - i * 10;
    if (t.m === 2 && t.d === 29) while (!isLeapYear(y)) y -= 1;
    yillar.push(y);
  }
  return yillar;
}

export const gunAdi = (t: TrDay, year: number) => GUN_ADLARI[weekdayOf({ year, month: t.m, day: t.d })];

export function DogumGunuBugunHero({ t }: { t: TrDay }) {
  const ga = gunAyMetni(t);
  const yillar = ornekYillar(t);
  const bugunGun = GUN_ADLARI[weekdayOf({ year: t.y, month: t.m, day: t.d })];
  return (
    <section className="sun-today" aria-labelledby="dogum-bugun-title">
      <h2 id="dogum-bugun-title">
        Bugün, {ga} {t.y} {bugunGun}
      </h2>
      <p className="sun-today-lead">
        {trLocative(ga)} doğduysanız doğduğunuz gün yılınıza göre değişir: {yillar[2]} yılında <strong>{gunAdi(t, yillar[2])}</strong>,{" "}
        {yillar[3]} yılında <strong>{gunAdi(t, yillar[3])}</strong>, {yillar[1]} yılında <strong>{gunAdi(t, yillar[1])}</strong>. Başka bir tarih için
        aşağıya doğum tarihinizi girin.
      </p>
      <div className="sun-today-cards birthday-cards">
        {yillar.map((y) => (
          <div className="golden-card" key={y}>
            <span>
              {ga} {y}
            </span>
            <strong>{gunAdi(t, y)}</strong>
            <em className="sun-card-note">{t.y - y} yıl önce</em>
          </div>
        ))}
      </div>
    </section>
  );
}

/** 7 sütunlu tablo: her sütunda bugünün tarihinin o güne denk geldiği yıllar. */
export function YilGunTablosu({ t }: { t: TrDay }) {
  const liste = yillaraGore(t, ILK_YIL, t.y);
  const ga = gunAyMetni(t);
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table birthday-year-grid">
        <caption>
          {ga} hangi yıl hangi güne denk geldi ({ILK_YIL}–{t.y})
        </caption>
        <thead>
          <tr>
            {SIRA.map((wd) => (
              <th scope="col" key={wd}>
                <span className="birthday-day-full">{GUN_ADLARI[wd]}</span>
                <abbr className="birthday-day-short" title={GUN_ADLARI[wd]}>
                  {KISA[wd]}
                </abbr>
                <small> ({liste.filter((x) => x.wd === wd).length})</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {SIRA.map((wd) => (
              <td key={wd} className={wd === 0 || wd === 6 ? "is-weekend" : undefined}>
                {liste
                  .filter((x) => x.wd === wd)
                  .map((x) => (
                    <span key={x.year} className="birthday-year">
                      {x.year}
                    </span>
                  ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** Bugünün tarihinin önümüzdeki yıllarda denk geldiği günler. */
export function GelecekYillarTablosu({ t }: { t: TrDay }) {
  const liste = yillaraGore(t, t.y + 1, t.y + 12).slice(0, 8);
  const ga = gunAyMetni(t);
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <caption>{ga} önümüzdeki yıllarda hangi gün?</caption>
        <thead>
          <tr>
            <th scope="col">Yıl</th>
            <th scope="col">Gün</th>
          </tr>
        </thead>
        <tbody>
          {liste.map((x) => (
            <tr key={x.year} className={x.wd === 0 || x.wd === 6 ? "is-weekend" : undefined}>
              <td>{x.year}</td>
              <td>
                {ga} <strong>{GUN_ADLARI[x.wd]}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

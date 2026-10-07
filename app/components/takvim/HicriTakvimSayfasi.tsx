import Link from "@/app/components/SiteLink";
import {
  DINI_DOGRULANAN,
  ETKINLIKLER,
  etkinlikTarihleri,
  ozelGunPath,
  tarihliAd,
  type Tarihli,
} from "../../converter/calendar/trTakvim";
import {
  gregorianToHijri,
  HIJRI_MONTHS_TR,
  type YMD,
} from "../../converter/time/calendars";
import {
  addDaysYmd,
  diffDays,
  formatYmd,
  formatYmdParts,
  ymdKey,
} from "../../converter/time/dateMath";
import type { FaqItem } from "../../converter/faqSchema";
import TimeToolPage from "../time/TimeToolPage";
import { TAKVIM_ARACLARI, trBugun } from "./TakvimSayfalari";

type HicriAy = { yil: number; ay: number; bas: YMD; bit: YMD; gun: number };

/** Bir Hicri yılın 12 ayının miladi başlangıç ve bitişleri (Umm al-Qura hesabı). */
export function hicriYilAylari(hicriYil: number, yaklasik: YMD): HicriAy[] {
  // yaklasik: yılın içinden bir miladi tarih; 1 Muharrem'i geriye doğru bul
  let d = yaklasik;
  for (let i = 0; i < 400; i += 1) {
    const h = gregorianToHijri(d);
    if (h.year === hicriYil && h.month === 1 && h.day === 1) break;
    d = addDaysYmd(
      d,
      h.year > hicriYil || (h.year === hicriYil && (h.month > 1 || h.day > 1))
        ? -1
        : 1,
    );
  }
  const out: HicriAy[] = [];
  let bas = d;
  for (let ay = 1; ay <= 12; ay += 1) {
    let bit = bas;
    while (gregorianToHijri(addDaysYmd(bit, 1)).month === ay)
      bit = addDaysYmd(bit, 1);
    out.push({ yil: hicriYil, ay, bas, bit, gun: diffDays(bas, bit) + 1 });
    bas = addDaysYmd(bit, 1);
  }
  return out;
}

const kisa = (d: YMD) =>
  formatYmdParts(d, "tr", { day: "numeric", month: "long", year: "numeric" });

function ayEtkinlikleri(a: HicriAy): Tarihli[] {
  const dini = ETKINLIKLER.filter(
    (e) => e.kategori === "dini" || e.kategori === "bayram",
  );
  return [a.bas.year, a.bit.year]
    .filter((y, i, arr) => arr.indexOf(y) === i)
    .flatMap((y) => dini.flatMap((e) => etkinlikTarihleri(e, y)))
    .filter(
      (t) => diffDays(a.bas, t.tarih) >= -1 && diffDays(t.tarih, a.bit) >= 0,
    )
    .sort((x, y) => ymdKey(x.tarih).localeCompare(ymdKey(y.tarih)));
}

export default function HicriTakvimSayfasi() {
  const bugun = trBugun();
  const h = gregorianToHijri(bugun);
  const yillar = [h.year, h.year + 1].map((y) => ({
    yil: y,
    aylar: hicriYilAylari(y, bugun),
  }));
  const faq: FaqItem[] = [
    {
      question: "Bugün Hicri takvime göre kaçı?",
      answer: `Bugün ${formatYmd(bugun, "tr")}, Hicri takvime göre ${h.day} ${HIJRI_MONTHS_TR[h.month - 1]} ${h.year} tarihidir.`,
    },
    {
      question: `Hicri ${h.year + 1} yılı ne zaman başlıyor?`,
      answer: `Hicri ${h.year + 1} yılı ${kisa(yillar[1].aylar[0].bas)} günü (1 Muharrem ${h.year + 1}) başlar. Hicri yılbaşı her yıl yaklaşık 11 gün öne gelir.`,
    },
    {
      question: "Hicri aylar kaç gün çeker?",
      answer:
        "Hicri aylar ayın evrelerine göre 29 veya 30 gündür; bir Hicri yıl 354 ya da 355 gündür. Bu yüzden Hicri takvim miladi takvimden her yıl yaklaşık 11 gün kısadır.",
    },
    {
      question: "Hicri tarihler neden bir gün farklı çıkabilir?",
      answer: `Ayın başlangıcı hesapla ya da hilalin gözlenmesiyle belirlenir; ülkeler farklı yöntem kullanır. Bu sayfa Umm al-Qura hesabını kullanır, dini günler Diyanet takvimine göre düzeltilmiştir. ${DINI_DOGRULANAN} sonrası tarihler Diyanet yayımlayana kadar ±1 gün sapabilir.`,
    },
  ];
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/takvim", label: "Takvim" },
        { label: "Hicri Takvim" },
      ]}
      crumbLabel="Sayfa yolu"
      title={`Hicri Takvim ${h.year} – ${h.year + 1}`}
      intro="Bugünün Hicri tarihi, Hicri ayların miladi takvimdeki başlangıç ve bitiş günleri, her ayın dini günleri ve Hicri yılbaşı."
      tool={
        <div className="date-calc">
          <div className="takvim-bugun">
            <div>
              <span>Bugün Hicri</span>
              <strong>
                {h.day} {HIJRI_MONTHS_TR[h.month - 1]} {h.year}
              </strong>
              <em>{formatYmd(bugun, "tr")}</em>
            </div>
          </div>
          {yillar.map(({ yil, aylar }) => (
            <div key={yil}>
              <h2 id={`hicri-${yil}`}>Hicri {yil} yılı</h2>
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <thead>
                    <tr>
                      <th scope="col">Hicri ay</th>
                      <th scope="col">Miladi başlangıç – bitiş</th>
                      <th scope="col">Dini günler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aylar.map((a) => (
                      <tr
                        key={a.ay}
                        className={
                          a.yil === h.year && a.ay === h.month
                            ? "is-half"
                            : undefined
                        }
                      >
                        <td>
                          <strong>{HIJRI_MONTHS_TR[a.ay - 1]}</strong>
                          <br />
                          <small>{a.gun} gün</small>
                        </td>
                        <td>
                          {formatYmdParts(a.bas, "tr", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          –{" "}
                          {formatYmdParts(a.bit, "tr", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td>
                          {ayEtkinlikleri(a).map((t, i) => (
                            <span key={t.etkinlik.id + ymdKey(t.tarih)}>
                              {i ? ", " : ""}
                              <Link
                                href={ozelGunPath(t.etkinlik.id)}
                                prefetch={false}
                              >
                                {tarihliAd(t)}
                              </Link>{" "}
                              <small>
                                (
                                {formatYmdParts(t.tarih, "tr", {
                                  day: "numeric",
                                  month: "short",
                                })}
                                )
                              </small>
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/tarih-cevirici", label: "Hicri – Miladi Tarih Çevirici" },
          { href: "/ozel-gunler", label: "Dini Günler ve Özel Günler" },
          { href: "/ozel-gunler#hicri-yilbasi", label: "Hicri Yılbaşı" },
          { href: "/dogdugum-gun-hangi-gun", label: "Hicri Doğum Tarihim" },
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        ...yillar.map(({ yil }) => ({
          id: `hicri-${yil}`,
          label: `Hicri ${yil} yılı`,
        })),
        { id: "nasil", label: "Hicri takvim nasıl işler?" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faq}
    >
      <h2 id="nasil">Hicri takvim nasıl işler?</h2>
      <p>
        Hicri takvim, Hz. Muhammed&apos;in Mekke&apos;den Medine&apos;ye
        hicretini (622) başlangıç alan bir ay takvimidir. On iki ayı vardır:
        Muharrem, Safer, Rebiülevvel, Rebiülahir, Cemaziyelevvel, Cemaziyelahir,
        Recep, Şaban, Ramazan, Şevval, Zilkade ve Zilhicce. Her ay yeni ayla
        başlar ve 29 ya da 30 gün sürer; bu yüzden Ramazan ve bayramlar miladi
        takvimde her yıl yaklaşık 11 gün öne gelir ve 33 yılda bir tüm
        mevsimleri dolaşır.
      </p>
      <p>
        Herhangi bir tarihi çevirmek için{" "}
        <Link href="/tarih-cevirici">tarih çeviriciyi</Link>, dini günleri ay ay
        görmek için <Link href="/takvim">Türkiye takvimini</Link>{" "}
        kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

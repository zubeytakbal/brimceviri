import Link from "@/app/components/SiteLink";
import {
  AY_ADLARI,
  DINI_DOGRULANAN,
  doluGunler,
  ETKINLIKLER,
  gunBilgisi,
  gunHaritasi,
  KATEGORI_ADI,
  ozelGunPath,
  halkMetni,
  sonrakiTarih,
  tarihliAd,
  TAKVIM_YILLARI,
  takvimAyPath,
  takvimGunPath,
  takvimYilPath,
  yilEtkinlikleri,
  etkinlikTarihleri,
  type Etkinlik,
  type Kategori,
  type Tarihli,
} from "../../converter/calendar/trTakvim";
import { ayFirtinalari } from "../../converter/calendar/firtinaTakvimi";
import type { FaqItem } from "../../converter/faqSchema";
import type { YMD } from "../../converter/time/calendars";
import {
  addDaysYmd,
  daysInMonth,
  diffDays,
  formatYmd,
  isWeekend,
  weekdayOf,
  ymdKey,
} from "../../converter/time/dateMath";
import { turkeyHolidays } from "../../converter/time/holidays";
import { moonPhasesBetween } from "../../converter/time/moon";
import HolidayIcsButton from "../dates/HolidayIcsButton";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import TakvimGorsel from "./TakvimGorsel";

const T = {
  crumbLabel: "Sayfa yolu",
  related: "İlginizi çekebilir",
  toc: "İçindekiler",
  faq: "Sık Sorulan Sorular",
};

const HOME = { href: "/", label: "Ana Sayfa" };
const HUB = { href: "/takvim", label: "Takvim" };
const OZEL_HUB = { href: "/ozel-gunler", label: "Özel Günler" };
const HAFTA_BASLIK = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export const TAKVIM_ARACLARI = [
  { href: "/resmi-tatiller", label: "Resmî Tatiller ve Köprü Günleri" },
  { href: "/geri-sayim", label: "Bayrama Kaç Gün Kaldı?" },
  { href: "/is-gunu-hesaplama", label: "İş Günü Hesaplama" },
  {
    href: "/iki-tarih-arasi-gun-hesaplama",
    label: "İki Tarih Arası Gün Hesaplama",
  },
  { href: "/tarih-cevirici", label: "Hicri – Miladi Tarih Çevirici" },
  { href: "/kacinci-hafta", label: "Bugün Kaçıncı Hafta?" },
  { href: "/ay-evreleri", label: "Ay Evreleri" },
  { href: "/firtina-takvimi", label: "Fırtına Takvimi" },
  { href: "/dogdugum-gun-hangi-gun", label: "Doğduğum Gün Hangi Gündü?" },
];

/** Türkiye saatine göre bugün (UTC+3). */
export function trBugun(): YMD {
  const d = new Date(Date.now() + 3 * 3600000);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
}

export const tarihMetni = (d: YMD, gun = true) => formatYmd(d, "tr", gun);
const kisaTarih = (d: YMD) => `${d.day} ${AY_ADLARI[d.month - 1]}`;
const aralik = (t: Tarihli) =>
  t.bitis && ymdKey(t.bitis) !== ymdKey(t.tarih)
    ? t.bitis.month === t.tarih.month
      ? `${t.tarih.day}–${kisaTarih(t.bitis)}`
      : `${kisaTarih(t.tarih)} – ${kisaTarih(t.bitis)}`
    : kisaTarih(t.tarih);

const saatMetni = (d: Date) =>
  new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  }).format(d);

function tatilHaritasi(year: number) {
  return new Map(turkeyHolidays(year).map((h) => [ymdKey(h.date), h]));
}

const sayfaVar = (d: YMD) =>
  TAKVIM_YILLARI.includes(d.year) && gunHaritasi(d.year).has(ymdKey(d));

function TatilEtiketi({ e }: { e: Etkinlik }) {
  if (e.tatil === "yok")
    return <span className="takvim-etiket">Resmî tatil değil</span>;
  return (
    <span className="takvim-etiket is-tatil">
      {e.tatil === "tam" ? "Resmî tatil" : "Resmî tatil · önceki gün yarım gün"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Ay ızgarası                                                          */

export function AyIzgarasi({
  year,
  month,
  bugun,
  buyuk = false,
}: {
  year: number;
  month: number;
  bugun?: YMD;
  buyuk?: boolean;
}) {
  const first = { year, month, day: 1 };
  const lead = (weekdayOf(first) + 6) % 7;
  const tatil = tatilHaritasi(year);
  const harita = gunHaritasi(year);
  return (
    <div className={`takvim-ay${buyuk ? " is-buyuk" : ""}`}>
      {HAFTA_BASLIK.map((w) => (
        <b key={w}>{w}</b>
      ))}
      {Array.from({ length: lead }, (_, i) => (
        <span key={`e${i}`} className="is-bos" />
      ))}
      {Array.from({ length: daysInMonth(year, month) }, (_, i) => {
        const d = { year, month, day: i + 1 };
        const key = ymdKey(d);
        const h = tatil.get(key);
        const ev = harita.get(key) ?? [];
        const cls = [
          isWeekend(d) ? "is-weekend" : "",
          h ? (h.kind === "full" ? "is-holiday" : "is-half") : "",
          ev.length ? "has-event" : "",
          bugun && ymdKey(bugun) === key ? "is-today" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const icerik = (
          <>
            <em>{i + 1}</em>
            {buyuk && ev.length ? (
              <small>
                {ev.slice(0, 2).map((t) => (
                  <i
                    key={t.etkinlik.id}
                    className={`kat-${t.etkinlik.kategori}`}
                  >
                    {tarihliAd(t)}
                  </i>
                ))}
              </small>
            ) : null}
          </>
        );
        const title =
          [h?.name, ...ev.map((t) => tarihliAd(t))]
            .filter(Boolean)
            .filter((v, j, a) => a.indexOf(v) === j)
            .join(" · ") || undefined;
        return ev.length && TAKVIM_YILLARI.includes(year) ? (
          <Link
            key={key}
            href={takvimGunPath(d)}
            prefetch={false}
            className={cls}
            title={title}
          >
            {icerik}
          </Link>
        ) : (
          <span key={key} className={cls || undefined} title={title}>
            {icerik}
          </span>
        );
      })}
    </div>
  );
}

function Lejant() {
  return (
    <p className="holiday-legend">
      <span className="is-holiday" /> Resmî tatil <span className="is-half" />{" "}
      Yarım gün <span className="takvim-lejant-etkinlik" /> Özel/dini gün{" "}
      <span className="is-weekend" /> Hafta sonu
    </p>
  );
}

function EtkinlikListesi({
  list,
  gorsel = true,
}: {
  list: Tarihli[];
  gorsel?: boolean;
}) {
  return (
    <ul className="takvim-liste">
      {list.map((t) => (
        <li key={`${t.etkinlik.id}-${ymdKey(t.tarih)}`}>
          {gorsel ? (
            <TakvimGorsel gorsel={t.etkinlik.gorsel} size={44} />
          ) : null}
          <div>
            <Link
              href={
                sayfaVar(t.tarih)
                  ? takvimGunPath(t.tarih)
                  : ozelGunPath(t.etkinlik.id)
              }
              prefetch={false}
            >
              <strong>{aralik(t)}</strong>
            </Link>{" "}
            <span className="takvim-gun-adi">
              {formatYmd(t.tarih, "tr").split(" ").pop()}
            </span>
            <br />
            <Link href={ozelGunPath(t.etkinlik.id)} prefetch={false}>
              {tarihliAd(t)}
            </Link>
            {t.tahmini ? <small> (tahmini)</small> : null}
            {t.saat ? <small> · saat {saatMetni(t.saat)}</small> : null}
          </div>
          <span className={`takvim-kat kat-${t.etkinlik.kategori}`}>
            {KATEGORI_ADI[t.etkinlik.kategori]}
          </span>
        </li>
      ))}
    </ul>
  );
}

function icsOgeleri(year: number) {
  return yilEtkinlikleri(year).flatMap((t) => {
    const out: Array<{ date: string; name: string }> = [];
    for (
      let d = t.tarih;
      diffDays(d, t.bitis ?? t.tarih) >= 0;
      d = addDaysYmd(d, 1)
    )
      out.push({ date: ymdKey(d), name: tarihliAd(t) });
    return out;
  });
}

function IcsKutusu({ year }: { year: number }) {
  return (
    <div className="takvim-ics">
      <HolidayIcsButton
        items={icsOgeleri(year)}
        fileName={`turkiye-takvimi-${year}.ics`}
        label={`${year} takvimini indir (.ics)`}
        calendarName={`Türkiye Takvimi ${year}`}
      />
      <a
        className="time-tool-button is-secondary"
        href={buildSiteUrl("/takvim.ics").replace(/^https?:/, "webcal:")}
      >
        🔔 Telefona abone ol (otomatik güncellenir)
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* /takvim                                                              */

export function TakvimHubSayfasi() {
  const bugun = trBugun();
  const b = gunBilgisi(bugun);
  const yaklasan = [
    ...yilEtkinlikleri(bugun.year),
    ...yilEtkinlikleri(bugun.year + 1),
  ]
    .filter((t) => ymdKey(t.bitis ?? t.tarih) >= ymdKey(bugun))
    .slice(0, 10);
  const faq: FaqItem[] = [
    {
      question: "Bugün hangi gün?",
      answer: `Bugün ${tarihMetni(bugun)}. Hicri takvime göre ${b.hicriMetin}, yılın ${b.yilinGunu}. günü ve ${b.hafta}. haftasıdır.`,
    },
    {
      question: "Bu takvimde hangi günler var?",
      answer:
        "Resmî tatiller, Ramazan ve Kurban Bayramı, kandiller ve diğer dini günler, milli ve anma günleri, Anneler Günü gibi özel günler ile ekinoks ve gündönümü anları. Her özel günün kendi sayfası vardır.",
    },
    {
      question: "Dini günlerin tarihleri nereden alınıyor?",
      answer: `Tarihler Diyanet İşleri Başkanlığı'nın yayımladığı dini günler takvimine göredir. ${DINI_DOGRULANAN} yılına kadarki tarihler Diyanet'in listesiyle karşılaştırılmıştır; sonraki yıllar hesaplamadır ve "tahmini" olarak işaretlenir.`,
    },
    {
      question: "Takvimi telefonuma ekleyebilir miyim?",
      answer:
        'Evet. "Telefona abone ol" bağlantısı Türkiye takvimini iPhone, Android ve Outlook takviminize ekler; yeni yılın günleri eklendikçe kendiliğinden güncellenir. Tek bir yılı .ics dosyası olarak da indirebilirsiniz.',
    },
  ];
  return (
    <TimeToolPage
      crumbs={[HOME, { label: "Takvim" }]}
      crumbLabel={T.crumbLabel}
      title={`Türkiye Takvimi ${bugun.year}`}
      intro="Bugünün tarihi, Hicri ve Rumi karşılığı, resmî tatiller, bayramlar, kandiller ve özel günler tek takvimde. Bir güne tıklayınca o günün sayfası açılır."
      tool={
        <div className="date-calc">
          <div className="takvim-bugun">
            <div>
              <span>Bugün</span>
              <strong>{tarihMetni(bugun)}</strong>
              <em>
                {b.hicriMetin} (Hicri)
                {b.rumiMetin ? ` · ${b.rumiMetin} (Rumi)` : ""}
              </em>
            </div>
            <dl>
              <div>
                <dt>Hafta</dt>
                <dd>{b.hafta}. hafta</dd>
              </div>
              <div>
                <dt>Yılın günü</dt>
                <dd>{b.yilinGunu}.</dd>
              </div>
              <div>
                <dt>Yılın bitmesine</dt>
                <dd>{b.kalanGun} gün</dd>
              </div>
              <div>
                <dt>Ay evresi</dt>
                <dd>{b.ayEvresi}</dd>
              </div>
              <div>
                <dt>Halk takvimi</dt>
                <dd>
                  <Link href="/firtina-takvimi" prefetch={false}>
                    {halkMetni(b.halk)}
                  </Link>
                </dd>
              </div>
            </dl>
            {b.etkinlikler.length ? (
              <p className="takvim-bugun-etkinlik">
                {b.etkinlikler.map((t) => (
                  <Link
                    key={t.etkinlik.id}
                    href={ozelGunPath(t.etkinlik.id)}
                    prefetch={false}
                  >
                    {tarihliAd(t)}
                  </Link>
                ))}
              </p>
            ) : null}
          </div>
          <div className="takvim-ay-baslik">
            <h2>
              <Link
                href={takvimAyPath(bugun.year, bugun.month)}
                prefetch={false}
              >
                {AY_ADLARI[bugun.month - 1]} {bugun.year}
              </Link>
            </h2>
          </div>
          <AyIzgarasi
            year={bugun.year}
            month={bugun.month}
            bugun={bugun}
            buyuk
          />
          <Lejant />
          <div className="time-tool-chips takvim-yillar">
            {TAKVIM_YILLARI.map((y) => (
              <Link key={y} href={takvimYilPath(y)} prefetch={false}>
                {y} takvimi
              </Link>
            ))}
            <Link href="/ozel-gunler" prefetch={false}>
              Özel günler
            </Link>
          </div>
        </div>
      }
      related={{ title: T.related, links: TAKVIM_ARACLARI }}
      tocTitle={T.toc}
      tocItems={[
        { id: "yaklasan", label: "Yaklaşan günler" },
        { id: "aylar", label: `${bugun.year} ayları` },
        { id: "faq", label: T.faq },
      ]}
      faqTitle={T.faq}
      faqItems={faq}
    >
      <h2 id="yaklasan">Yaklaşan özel günler</h2>
      <EtkinlikListesi list={yaklasan} />
      <h2 id="aylar">{bugun.year} ayları</h2>
      <p className="time-tool-chips takvim-yillar">
        {AY_ADLARI.map((a, i) => (
          <Link key={a} href={takvimAyPath(bugun.year, i + 1)} prefetch={false}>
            {a}
          </Link>
        ))}
      </p>
      <IcsKutusu year={bugun.year} />
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */
/* /takvim/[yil]                                                        */

export function yilMeta(year: number) {
  return {
    title: `${year} Takvimi: Resmî Tatiller, Bayramlar ve Özel Günler`,
    short: `${year} Takvimi ve Özel Günler`,
    description: `${year} Türkiye takvimi: resmî tatiller, Ramazan ve Kurban Bayramı, kandiller, Anneler Günü ve tüm özel günler ay ay. Telefona eklenebilir takvim.`,
  };
}

export function TakvimYilSayfasi({ year }: { year: number }) {
  const list = yilEtkinlikleri(year);
  const tatilGunu = turkeyHolidays(year).filter(
    (h) => h.kind === "full" && !isWeekend(h.date),
  ).length;
  const ramazan = list.find((t) => t.etkinlik.id === "ramazan-bayrami");
  const kurban = list.find((t) => t.etkinlik.id === "kurban-bayrami");
  const faq: FaqItem[] = [
    ramazan
      ? {
          question: `${year} Ramazan Bayramı ne zaman?`,
          answer: `${year} Ramazan Bayramı ${aralik(ramazan)} tarihleri arasındadır; arefe günü yarım gün tatildir.${ramazan.tahmini ? " Tarih tahminidir." : ""}`,
        }
      : null,
    kurban
      ? {
          question: `${year} Kurban Bayramı ne zaman?`,
          answer: `${year} Kurban Bayramı ${aralik(kurban)} tarihleri arasındadır; arefe günü yarım gün tatildir.${kurban.tahmini ? " Tarih tahminidir." : ""}`,
        }
      : null,
    {
      question: `${year} yılında kaç gün resmî tatil var?`,
      answer: `${year} yılında hafta içine denk gelen ${tatilGunu} tam gün resmî tatil vardır (yarım gün arefeler hariç). Köprü günleri için resmî tatiller sayfasına bakabilirsiniz.`,
    },
    {
      question: `${year} yılı kaç gün?`,
      answer: `${year} yılı ${diffDays({ year, month: 1, day: 1 }, { year: year + 1, month: 1, day: 1 })} gündür; ${formatYmd({ year, month: 1, day: 1 }, "tr").split(" ").pop()} günü başlar.`,
    },
  ].filter((x): x is FaqItem => Boolean(x));
  return (
    <TimeToolPage
      crumbs={[HOME, HUB, { label: String(year) }]}
      crumbLabel={T.crumbLabel}
      title={`${year} Takvimi`}
      intro={`${year} yılının Türkiye takvimi: resmî tatiller, dini bayramlar, kandiller, milli ve özel günler ile mevsim başlangıçları. Renkli günlere tıklayarak o günün sayfasına gidin.`}
      tool={
        <div className="date-calc">
          <div className="holiday-calendar takvim-yil">
            {AY_ADLARI.map((a, m) => (
              <div className="holiday-month" key={a}>
                <h3>
                  <Link href={takvimAyPath(year, m + 1)} prefetch={false}>
                    {a}
                  </Link>
                </h3>
                <AyIzgarasi year={year} month={m + 1} />
              </div>
            ))}
          </div>
          <Lejant />
          <IcsKutusu year={year} />
        </div>
      }
      related={{
        title: T.related,
        links: [
          { href: `/resmi-tatiller/${year}`, label: `${year} Resmî Tatilleri` },
          ...TAKVIM_YILLARI.filter((y) => y !== year).map((y) => ({
            href: takvimYilPath(y),
            label: `${y} Takvimi`,
          })),
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle={T.toc}
      tocItems={[
        { id: "gunler", label: `${year} özel günleri` },
        { id: "faq", label: T.faq },
      ]}
      faqTitle={T.faq}
      faqItems={faq}
    >
      <h2 id="gunler">{year} yılının özel günleri</h2>
      {AY_ADLARI.map((a, m) => {
        const ay = list.filter((t) => t.tarih.month === m + 1);
        if (!ay.length) return null;
        return (
          <section key={a}>
            <h3>
              <Link href={takvimAyPath(year, m + 1)} prefetch={false}>
                {a} {year}
              </Link>
            </h3>
            <EtkinlikListesi list={ay} gorsel={false} />
          </section>
        );
      })}
      {year > DINI_DOGRULANAN ? (
        <p>
          Dini günlerin tarihleri Diyanet İşleri Başkanlığı {year} takvimini
          yayımlayana kadar hesaplamaya dayalı tahmindir ve bir gün farklı
          çıkabilir.
        </p>
      ) : null}
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */
/* /takvim/[yil]/[ay]                                                   */

export function ayMeta(year: number, month: number) {
  const a = AY_ADLARI[month - 1];
  return {
    title: `${a} ${year} Takvimi: Resmî Tatiller ve Özel Günler`,
    short: `${a} ${year} Takvimi`,
    description: `${a} ${year} takvimi: ayın özel günleri, resmî tatiller, iş günü sayısı, dolunay ve yeni ay tarihleri ile Hicri karşılıklar.`,
  };
}

function ayIstatistik(year: number, month: number) {
  const tatil = tatilHaritasi(year);
  let isGunu = 0;
  let tatilGunu = 0;
  for (let d = 1; d <= daysInMonth(year, month); d += 1) {
    const g = { year, month, day: d };
    const h = tatil.get(ymdKey(g));
    if (h?.kind === "full") tatilGunu += 1;
    if (isWeekend(g)) continue;
    if (h?.kind === "full") continue;
    isGunu += h?.kind === "half" ? 0.5 : 1;
  }
  const evreler = moonPhasesBetween(
    new Date(Date.UTC(year, month - 1, 1, -3)),
    new Date(Date.UTC(year, month, 1, -3)),
  ).filter((e) => e.kind === "full" || e.kind === "new");
  return { isGunu, tatilGunu, evreler };
}

export function TakvimAySayfasi({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const a = AY_ADLARI[month - 1];
  const list = yilEtkinlikleri(year).filter(
    (t) =>
      t.tarih.month === month ||
      (t.bitis && t.bitis.month === month && t.tarih.month !== month),
  );
  const st = ayIstatistik(year, month);
  const onceki =
    month === 1 ? { y: year - 1, m: 12 } : { y: year, m: month - 1 };
  const sonraki =
    month === 12 ? { y: year + 1, m: 1 } : { y: year, m: month + 1 };
  const h1 = { year, month, day: 1 };
  const hSon = { year, month, day: daysInMonth(year, month) };
  const hb = gunBilgisi(h1).hicriMetin;
  const hs = gunBilgisi(hSon).hicriMetin;
  const evreMetni = st.evreler.map(
    (e) =>
      `${e.kind === "full" ? "Dolunay" : "Yeni ay"} ${e.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", timeZone: "Europe/Istanbul" })} ${saatMetni(e.date)}`,
  );
  const faq: FaqItem[] = [
    {
      question: `${a} ${year}'te kaç iş günü var?`,
      answer: `${a} ${year}'te hafta sonları ve resmî tatiller çıkarıldığında ${String(st.isGunu).replace(".", ",")} iş günü vardır (Cumartesi tatil kabul edilerek).`,
    },
    {
      question: `${a} ${year}'te resmî tatil var mı?`,
      answer: st.tatilGunu
        ? `Evet, ${a} ${year}'te ${st.tatilGunu} gün tam gün resmî tatil var: ${turkeyHolidays(
            year,
          )
            .filter((h) => h.date.month === month && h.kind === "full")
            .map((h) => `${kisaTarih(h.date)} ${h.name}`)
            .join(", ")}.`
        : `Hayır, ${a} ${year}'te resmî tatil yok.`,
    },
    {
      question: `${a} ${year} hangi gün başlıyor?`,
      answer: `${a} ${year} ${formatYmd(h1, "tr").split(" ").pop()} günü başlar ve ${formatYmd(hSon, "tr").split(" ").pop()} günü biter; ${daysInMonth(year, month)} gün çeker.`,
    },
    {
      question: `${a} ${year} Hicri takvimde hangi aylara denk geliyor?`,
      answer: `${a} ${year}, Hicri takvimde ${hb} ile ${hs} arasına denk gelir.`,
    },
  ];
  return (
    <TimeToolPage
      crumbs={[
        HOME,
        HUB,
        { href: takvimYilPath(year), label: String(year) },
        { label: a },
      ]}
      crumbLabel={T.crumbLabel}
      title={`${a} ${year} Takvimi`}
      intro={`${a} ${year} ayının Türkiye takvimi; resmî tatiller, dini ve özel günler, iş günü sayısı ve ay evreleri. Günlerin üzerine tıklayarak ayrıntılara ulaşabilirsiniz.`}
      tool={
        <div className="date-calc">
          <div className="takvim-ay-baslik">
            {TAKVIM_YILLARI.includes(onceki.y) ? (
              <Link
                href={takvimAyPath(onceki.y, onceki.m)}
                prefetch={false}
                aria-label="Önceki ay"
              >
                ‹ {AY_ADLARI[onceki.m - 1]}
              </Link>
            ) : (
              <span />
            )}
            <h2>
              {a} {year}
            </h2>
            {TAKVIM_YILLARI.includes(sonraki.y) ? (
              <Link
                href={takvimAyPath(sonraki.y, sonraki.m)}
                prefetch={false}
                aria-label="Sonraki ay"
              >
                {AY_ADLARI[sonraki.m - 1]} ›
              </Link>
            ) : (
              <span />
            )}
          </div>
          <AyIzgarasi year={year} month={month} buyuk />
          <Lejant />
          <div className="date-calc-results">
            <div className="date-calc-stat">
              <span>İş günü</span>
              <strong>{String(st.isGunu).replace(".", ",")} gün</strong>
              <em>
                {st.tatilGunu
                  ? `${st.tatilGunu} gün resmî tatil`
                  : "resmî tatil yok"}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Hicri</span>
              <strong>{hb.replace(/ \d+$/, "")}</strong>
              <em>{hs} tarihine kadar</em>
            </div>
            <div className="date-calc-stat">
              <span>Ay evreleri</span>
              <strong>{evreMetni[0] ?? "—"}</strong>
              <em>{evreMetni.slice(1).join(" · ")}</em>
            </div>
          </div>
        </div>
      }
      related={{
        title: T.related,
        links: [
          { href: takvimYilPath(year), label: `${year} Takvimi` },
          { href: `/resmi-tatiller/${year}`, label: `${year} Resmî Tatilleri` },
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle={T.toc}
      tocItems={[
        { id: "gunler", label: `${a} ${year} özel günleri` },
        ...(ayFirtinalari(month).length
          ? [{ id: "firtinalar", label: `${a} fırtınaları` }]
          : []),
        { id: "faq", label: T.faq },
      ]}
      faqTitle={T.faq}
      faqItems={faq}
    >
      <h2 id="gunler">
        {a} {year} özel günleri
      </h2>
      {list.length ? (
        <EtkinlikListesi list={list} />
      ) : (
        <p>Bu ayda takvimimizdeki özel günlerden biri bulunmuyor.</p>
      )}
      {ayFirtinalari(month).length ? (
        <>
          <h2 id="firtinalar">{a} fırtınaları (halk takvimi)</h2>
          <p>
            Denizcilerin kullandığı{" "}
            <Link href="/firtina-takvimi">fırtına takvimine</Link> göre {a}{" "}
            ayında beklenen fırtınalar; 1-3 gün sapabilir.
          </p>
          <ul>
            {ayFirtinalari(month).map((f) => (
              <li key={f.ad + f.gun}>
                <strong>
                  {f.gun} {a}
                </strong>
                : {f.ad}
                {f.sure ? ` (${f.sure} gün)` : ""}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */
/* /takvim/[yil]/[ay]/[gun]                                             */

export function gunMeta(d: YMD) {
  const b = gunBilgisi(d);
  const ad = b.etkinlikler.map((t) => tarihliAd(t));
  const tarih = `${d.day} ${AY_ADLARI[d.month - 1]} ${d.year}`;
  return {
    title: `${tarih}: ${ad.join(", ")}`,
    short: `${tarih} ${ad[0]}`,
    description:
      `${tarih} ${b.gunAdi}: ${ad.join(", ")}. ${b.etkinlikler[0]?.etkinlik.kisa ?? ""} Hicri ${b.hicriMetin}, resmî tatil durumu ve kaç gün kaldığı.`.slice(
        0,
        300,
      ),
  };
}

export function TakvimGunSayfasi({ d }: { d: YMD }) {
  const b = gunBilgisi(d);
  const tatil = tatilHaritasi(d.year).get(ymdKey(d));
  const tarih = `${d.day} ${AY_ADLARI[d.month - 1]} ${d.year}`;
  const hepsi = TAKVIM_YILLARI.flatMap(doluGunler);
  const i = hepsi.findIndex((g) => ymdKey(g) === ymdKey(d));
  const onceki = hepsi[i - 1];
  const sonraki = hepsi[i + 1];
  const tatilMetni = tatil
    ? tatil.kind === "full"
      ? `${tarih} tam gün resmî tatildir (${tatil.name}).`
      : `${tarih} öğleden sonra (13.00'ten itibaren) yarım gün resmî tatildir (${tatil.name}).`
    : `${tarih} resmî tatil değildir.`;
  const faq: FaqItem[] = [
    {
      question: `${tarih} hangi gün?`,
      answer: `${tarih} ${b.gunAdi} gününe denk gelir; yılın ${b.yilinGunu}. günü ve ${b.hafta}. haftasıdır.`,
    },
    {
      question: `${tarih} resmî tatil mi?`,
      answer: `${tatilMetni}${isWeekend(d) ? " Gün hafta sonuna denk gelir." : ""}`,
    },
    {
      question: `${tarih} Hicri tarih kaç?`,
      answer: `${tarih}, Hicri takvime göre ${b.hicriMetin} tarihine denk gelir.${b.rumiMetin ? ` Rumi takvimde ${b.rumiMetin}.` : ""}`,
    },
  ];
  return (
    <TimeToolPage
      crumbs={[
        HOME,
        HUB,
        { href: takvimYilPath(d.year), label: String(d.year) },
        { href: takvimAyPath(d.year, d.month), label: AY_ADLARI[d.month - 1] },
        { label: String(d.day) },
      ]}
      crumbLabel={T.crumbLabel}
      title={`${tarih} ${b.gunAdi}`}
      intro={`${b.etkinlikler.map((t) => tarihliAd(t)).join(", ")}. ${tatilMetni}`}
      tool={
        <div className="date-calc">
          {b.etkinlikler.map((t) => (
            <article className="takvim-kart" key={t.etkinlik.id}>
              <TakvimGorsel
                gorsel={t.etkinlik.gorsel}
                size={112}
                title={t.etkinlik.ad}
              />
              <div>
                <span className={`takvim-kat kat-${t.etkinlik.kategori}`}>
                  {KATEGORI_ADI[t.etkinlik.kategori]}
                </span>
                <h2>
                  <Link href={ozelGunPath(t.etkinlik.id)} prefetch={false}>
                    {tarihliAd(t)}
                  </Link>
                </h2>
                <p>
                  {t.etkinlik.kisa}
                  {t.saat
                    ? ` Ekinoks/gündönümü anı: saat ${saatMetni(t.saat)} (Türkiye saati).`
                    : ""}
                  {t.tahmini ? " Tarih tahminidir." : ""}
                </p>
                <p className="takvim-kart-alt">
                  <TatilEtiketi e={t.etkinlik} />
                  {t.bitis ? (
                    <span className="takvim-etiket">{aralik(t)}</span>
                  ) : null}
                </p>
              </div>
            </article>
          ))}
          <div className="date-calc-results">
            <div className="date-calc-stat">
              <span>Hicri</span>
              <strong>{b.hicriMetin}</strong>
              {b.rumiMetin ? <em>Rumi: {b.rumiMetin}</em> : null}
            </div>
            <div className="date-calc-stat">
              <span>Hafta · yılın günü</span>
              <strong>
                {b.hafta}. hafta · {b.yilinGunu}. gün
              </strong>
              <em>yılın bitmesine {b.kalanGun} gün</em>
            </div>
            <div className="date-calc-stat">
              <span>Ay evresi</span>
              <strong>{b.ayEvresi}</strong>
              <em>%{Math.round(b.ayAydinlik * 100)} aydınlık</em>
            </div>
            <div className="date-calc-stat">
              <span>Halk takvimi</span>
              <strong>{halkMetni(b.halk)}</strong>
              <em>
                <Link href="/firtina-takvimi" prefetch={false}>
                  Fırtına ve halk takvimi
                </Link>
              </em>
            </div>
          </div>
          <nav className="takvim-onceki-sonraki" aria-label="Diğer özel günler">
            {onceki ? (
              <Link href={takvimGunPath(onceki)} prefetch={false}>
                ‹ {kisaTarih(onceki)} {onceki.year}:{" "}
                {gunHaritasi(onceki.year).get(ymdKey(onceki))?.[0].etkinlik.ad}
              </Link>
            ) : (
              <span />
            )}
            {sonraki ? (
              <Link href={takvimGunPath(sonraki)} prefetch={false}>
                {kisaTarih(sonraki)} {sonraki.year}:{" "}
                {
                  gunHaritasi(sonraki.year).get(ymdKey(sonraki))?.[0].etkinlik
                    .ad
                }{" "}
                ›
              </Link>
            ) : null}
          </nav>
        </div>
      }
      related={{
        title: T.related,
        links: [
          ...b.etkinlikler.flatMap((t) => [
            ...(t.etkinlik.geriSayim
              ? [
                  {
                    href: `/geri-sayim/${t.etkinlik.geriSayim}`,
                    label: `${t.etkinlik.ad}: kaç gün kaldı?`,
                  },
                ]
              : []),
            ...(t.etkinlik.araclar ?? []),
          ]),
          {
            href: takvimAyPath(d.year, d.month),
            label: `${AY_ADLARI[d.month - 1]} ${d.year} Takvimi`,
          },
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle={T.toc}
      tocItems={[
        ...b.etkinlikler.map((t) => ({
          id: `hakkinda-${t.etkinlik.id}`,
          label: t.etkinlik.ad,
        })),
        { id: "ay", label: `${AY_ADLARI[d.month - 1]} ${d.year}` },
        { id: "faq", label: T.faq },
      ]}
      faqTitle={T.faq}
      faqItems={faq}
    >
      {b.etkinlikler.map((t) => (
        <section key={t.etkinlik.id}>
          <h2 id={`hakkinda-${t.etkinlik.id}`}>{t.etkinlik.ad}</h2>
          <p>{t.etkinlik.hakkinda}</p>
          <p>
            <Link href={ozelGunPath(t.etkinlik.id)} prefetch={false}>
              {t.etkinlik.ad} tarihleri ({TAKVIM_YILLARI.join(", ")})
            </Link>
          </p>
        </section>
      ))}
      <h2 id="ay">
        {AY_ADLARI[d.month - 1]} {d.year}
      </h2>
      <AyIzgarasi year={d.year} month={d.month} bugun={d} />
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */
/* /ozel-gunler                                                          */

const KATEGORI_SIRA: Kategori[] = [
  "resmi",
  "bayram",
  "dini",
  "milli",
  "ozel",
  "halk",
  "mevsim",
];

export function OzelGunlerHub() {
  const bugun = trBugun();
  const faq: FaqItem[] = [
    {
      question: "Türkiye'de kaç gün resmî tatil var?",
      answer:
        "Türkiye'de yılbaşı, 23 Nisan, 1 Mayıs, 19 Mayıs, 15 Temmuz, 30 Ağustos ve 29 Ekim ile Ramazan Bayramı (3 gün) ve Kurban Bayramı (4 gün) resmî tatildir; 28 Ekim ve bayram arefeleri yarım gündür.",
    },
    {
      question: "Dini günler neden her yıl değişiyor?",
      answer:
        "Kandiller ve bayramlar Hicri (ay) takvimine göre belirlenir. Hicri yıl yaklaşık 354 gün olduğu için bu günler miladi takvimde her yıl 10-11 gün öne gelir.",
    },
    {
      question: "Anneler Günü ve Babalar Günü hangi tarihte?",
      answer:
        "Anneler Günü Mayıs'ın ikinci pazarı, Babalar Günü Haziran'ın üçüncü pazarıdır; bu yüzden tarihleri her yıl değişir.",
    },
  ];
  return (
    <TimeToolPage
      crumbs={[HOME, HUB, { label: "Özel Günler" }]}
      crumbLabel={T.crumbLabel}
      title="Özel Günler ve Tarihleri"
      intro="Türkiye'deki resmî tatiller, bayramlar, kandiller, milli günler ve özel günler; her birinin bir sonraki tarihi, kaç gün kaldığı ve geçmiş/gelecek yıllardaki tarihleri."
      tool={
        <div className="takvim-hub">
          {KATEGORI_SIRA.map((k) => (
            <section key={k}>
              <h2 id={`kat-${k}`}>{KATEGORI_ADI[k]}</h2>
              <ul className="takvim-hub-liste">
                {ETKINLIKLER.filter((e) => e.kategori === k).map((e) => {
                  const s = sonrakiTarih(e, bugun);
                  const kalan = s ? diffDays(bugun, s.tarih) : null;
                  return (
                    <li key={e.id}>
                      <Link href={ozelGunPath(e.id)} prefetch={false}>
                        <TakvimGorsel gorsel={e.gorsel} size={56} />
                        <span>
                          <strong>{e.ad}</strong>
                          {s ? (
                            <em>
                              {tarihMetni(s.tarih)}
                              {kalan !== null
                                ? kalan <= 0
                                  ? " · bugün"
                                  : ` · ${kalan} gün kaldı`
                                : ""}
                            </em>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      }
      related={{ title: T.related, links: [HUB, ...TAKVIM_ARACLARI] }}
      tocTitle={T.toc}
      tocItems={[
        ...KATEGORI_SIRA.map((k) => ({
          id: `kat-${k}`,
          label: KATEGORI_ADI[k],
        })),
        { id: "faq", label: T.faq },
      ]}
      faqTitle={T.faq}
      faqItems={faq}
    >
      <p>
        Tüm günleri ay ay görmek için{" "}
        <Link href="/takvim">Türkiye takvimine</Link>, izin planı için{" "}
        <Link href="/resmi-tatiller">resmî tatiller ve köprü günleri</Link>{" "}
        sayfasına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */
/* /ozel-gunler/[id]                                                     */

const KURAL_ACIKLAMA: Record<Etkinlik["kural"]["tip"], string> = {
  sabit: "Her yıl aynı tarihte kutlanır.",
  coklu:
    "Halk takvimi eski (Rumi) takvime dayandığı için her yıl aynı miladi tarihlere denk gelir.",
  "haftanin-gunu":
    "Tarihi her yıl değişir; ayın belirli bir pazar gününe denk gelir.",
  hicri:
    "Hicri (ay) takvimine göre belirlendiği için miladi takvimde her yıl yaklaşık 11 gün öne gelir.",
  regaib:
    "Recep ayının ilk cumasına bağlı olduğu için her yıl yaklaşık 11 gün öne gelir.",
  resmi:
    "Hicri takvime göre belirlendiği için her yıl yaklaşık 11 gün öne gelir.",
  astro:
    "Güneş'in konumuna göre belirlenir; tarih 19-23 arasında değişir, saati her yıl farklıdır.",
};

export function ozelGunMeta(e: Etkinlik) {
  const y = trBugun().year;
  return {
    title: `${e.ad} Ne Zaman? ${TAKVIM_YILLARI.filter((x) => x >= y)
      .slice(0, 2)
      .join(" ve ")} Tarihleri`,
    short: `${e.ad} Ne Zaman?`,
    description:
      `${e.ad} ${TAKVIM_YILLARI.join(", ")} tarihleri ve günleri. ${e.kisa}`.slice(
        0,
        300,
      ),
  };
}

export function OzelGunSayfasi({ e }: { e: Etkinlik }) {
  const bugun = trBugun();
  const s = sonrakiTarih(e, bugun);
  const kalan = s ? diffDays(bugun, s.tarih) : null;
  const satirlar = TAKVIM_YILLARI.flatMap((y) => etkinlikTarihleri(e, y));
  const ilk = satirlar.find((t) => t.tarih.year === bugun.year) ?? satirlar[0];
  const faq: FaqItem[] = [
    ...TAKVIM_YILLARI.filter((y) => y >= bugun.year)
      .slice(0, 2)
      .map((y) => {
        const t = etkinlikTarihleri(e, y);
        return {
          question: `${y} ${e.ad} ne zaman?`,
          answer: t.length
            ? `${y} yılında ${e.ad} ${t.map((x) => `${aralik(x)} ${formatYmd(x.tarih, "tr").split(" ").pop()}${x.not ? ` (${x.not})` : ""}`).join(", ")} tarihindedir.${t.some((x) => x.tahmini) ? " Tarih tahminidir." : ""}`
            : `${e.ad} ${y} yılına denk gelmiyor.`,
        };
      }),
    {
      question: `${e.ad} resmî tatil mi?`,
      answer:
        e.tatil === "yok"
          ? `Hayır, ${e.ad} resmî tatil değildir; işyerleri ve okullar açıktır.`
          : e.tatil === "tam"
            ? `Evet, ${e.ad} tam gün resmî tatildir.`
            : `Evet. ${e.ad} resmî tatildir; bir önceki gün (arefe) öğleden sonra yarım gün tatildir.`,
    },
    {
      question:
        e.kural.tip === "sabit" || e.kural.tip === "coklu"
          ? `${e.ad} her yıl aynı gün mü?`
          : `${e.ad} neden her yıl aynı gün değil?`,
      answer: KURAL_ACIKLAMA[e.kural.tip],
    },
  ];
  return (
    <TimeToolPage
      crumbs={[HOME, HUB, OZEL_HUB, { label: e.ad }]}
      crumbLabel={T.crumbLabel}
      title={`${e.ad} Ne Zaman?`}
      intro={e.kisa}
      tool={
        <div className="date-calc">
          <article className="takvim-kart">
            <TakvimGorsel gorsel={e.gorsel} size={112} title={e.ad} />
            <div>
              <span className={`takvim-kat kat-${e.kategori}`}>
                {KATEGORI_ADI[e.kategori]}
              </span>
              {s ? (
                <>
                  <h2>
                    <Link
                      href={
                        sayfaVar(s.tarih)
                          ? takvimGunPath(s.tarih)
                          : takvimAyPath(s.tarih.year, s.tarih.month)
                      }
                      prefetch={false}
                    >
                      {tarihMetni(s.tarih)}
                    </Link>
                  </h2>
                  <p>
                    {kalan !== null && kalan > 0
                      ? `${kalan} gün kaldı.`
                      : "Bugün."}
                    {s.bitis ? ` ${aralik(s)} arası.` : ""}
                    {s.saat
                      ? ` Saat ${saatMetni(s.saat)} (Türkiye saati).`
                      : ""}
                    {s.tahmini ? " Tarih tahminidir." : ""}
                  </p>
                </>
              ) : null}
              <p className="takvim-kart-alt">
                <TatilEtiketi e={e} />
              </p>
            </div>
          </article>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Yıl</th>
                  <th scope="col">Tarih</th>
                  <th scope="col">Gün</th>
                </tr>
              </thead>
              <tbody>
                {satirlar.map((t) => (
                  <tr key={ymdKey(t.tarih)}>
                    <td>{t.tarih.year}</td>
                    <td>
                      <Link href={takvimGunPath(t.tarih)} prefetch={false}>
                        {aralik(t)}
                      </Link>
                      {t.saat ? <small> · {saatMetni(t.saat)}</small> : null}
                      {t.not ? <small> · {t.not}</small> : null}
                      {t.tahmini ? <small> (tahmini)</small> : null}
                    </td>
                    <td>{formatYmd(t.tarih, "tr").split(" ").pop()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      related={{
        title: T.related,
        links: [
          ...(e.geriSayim
            ? [
                {
                  href: `/geri-sayim/${e.geriSayim}`,
                  label: "Kaç gün kaldı? (canlı geri sayım)",
                },
              ]
            : []),
          ...(e.araclar ?? []),
          ...(ilk
            ? [
                {
                  href: takvimAyPath(ilk.tarih.year, ilk.tarih.month),
                  label: `${AY_ADLARI[ilk.tarih.month - 1]} ${ilk.tarih.year} Takvimi`,
                },
              ]
            : []),
          OZEL_HUB,
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle={T.toc}
      tocItems={[
        { id: "hakkinda", label: `${e.ad} hakkında` },
        { id: "faq", label: T.faq },
      ]}
      faqTitle={T.faq}
      faqItems={faq}
    >
      <h2 id="hakkinda">{e.ad} hakkında</h2>
      <p>{e.hakkinda}</p>
      <p>{KURAL_ACIKLAMA[e.kural.tip]}</p>
      {e.kategori === "dini" || e.kategori === "bayram" ? (
        <p>
          Tarihler Diyanet İşleri Başkanlığı'nın dini günler takvimine göredir;{" "}
          {DINI_DOGRULANAN} sonrası yıllar Diyanet takvimi yayımlanana kadar
          tahminidir.
        </p>
      ) : null}
    </TimeToolPage>
  );
}

import { doluGunler } from "../../converter/calendar/trTakvim";
import Link from "@/app/components/SiteLink";
import {
  AY_ADLARI,
  DINI_DOGRULANAN,
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
  GUN_ADLARI,
  type Etkinlik,
  type Kategori,
  type Tarihli,
} from "../../converter/calendar/trTakvim";
import { ayFirtinalari } from "../../converter/calendar/firtinaTakvimi";
import { siradakiOkulOlaylari } from "../../converter/calendar/okulTakvimi";
import { skyEvents } from "../../converter/time/skyEvents";
import { ayTumEtiketleri, yilGokyuzuEtiketleri } from "../../converter/calendar/gokyuzuEtiketleri";
import { trGunu, type Etiket } from "../../converter/calendar/gunEtiketleri";
import type { FaqItem } from "../../converter/faqSchema";
import { OZEL_GUN_SAYFALARI, type OzelGunIcerik } from "../../converter/calendar/ozelGunIcerik";
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
import { bridgePlans, holidayLookup, turkeyHolidays } from "../../converter/time/holidays";
import { moonPhasesBetween } from "../../converter/time/moon";
import { sunTimes } from "../../converter/time/solar";
import { trLocative } from "../../converter/turkishSuffix";
import HolidayIcsButton from "../dates/HolidayIcsButton";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import TakvimFiltre from "./TakvimFiltre";
import TakvimGezgini from "./TakvimGezgini";
import TakvimGorsel from "./TakvimGorsel";
import ScrollToQuery from "../ScrollToQuery";

const T = {
  crumbLabel: "Sayfa yolu",
  related: "İlginizi çekebilir",
  toc: "İçindekiler",
  faq: "Sık Sorulan Sorular",
};

const HOME = { href: "/", label: "Ana Sayfa" };
const HUB = { href: "/takvim", label: "Takvim" };
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
  { href: "/okul-takvimi", label: "Okul Takvimi" },
  { href: "/hicri-takvim", label: "Hicri Takvim" },
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
const aralik = (t: Pick<Tarihli, "tarih" | "bitis">) =>
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
  etiketler,
}: {
  year: number;
  month: number;
  bugun?: YMD;
  buyuk?: boolean;
  /** Verilirse büyük ızgarada her günün bütün etiketleri (tatil, okul, fırtına, ay, gökyüzü) yazılır. */
  etiketler?: Map<number, Etiket[]>;
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
        const etk = etiketler?.get(i + 1) ?? [];
        const cls = [
          isWeekend(d) ? "is-weekend" : "",
          h ? (h.kind === "full" ? "is-holiday" : "is-half") : "",
          ev.length ? "has-event" : "",
          etk.some((e) => e.tur === "okul") ? "is-okul" : "",
          bugun && ymdKey(bugun) === key ? "is-today" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const icerik = (
          <>
            <em>{i + 1}</em>
            {buyuk && etiketler ? (
              etk.some((e) => !e.devam) ? (
                <small>
                  {etk
                    .filter((e) => !e.devam)
                    .map((e) => (
                      <i key={e.ad} className={`etk etk-${e.tur}`}>
                        <b className="etk-nokta" aria-hidden="true" />
                        <span>{e.ad}</span>
                      </i>
                    ))}
                </small>
              ) : null
            ) : buyuk && ev.length ? (
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
          [h?.name, ...ev.map((t) => tarihliAd(t)), ...etk.map((e) => e.ad)]
            .filter(Boolean)
            .filter((v, j, a) => a.indexOf(v) === j)
            .join(" · ") || undefined;
        return (ev.length || etk.length) && TAKVIM_YILLARI.includes(year) ? (
          <Link
            key={key}
            href={sayfaVar(d) ? takvimGunPath(d) : `${takvimAyPath(year, month)}#gun-${d.day}`}
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

function Lejant({ okul = false }: { okul?: boolean }) {
  return (
    <p className="holiday-legend">
      <span className="is-holiday" /> Resmî tatil <span className="is-half" />{" "}
      Yarım gün <span className="takvim-lejant-etkinlik" /> Özel/dini gün{" "}
      <span className="is-weekend" /> Hafta sonu
      {okul ? (
        <>
          {" "}
          <span className="takvim-lejant-okul" /> Okul tatili
        </>
      ) : null}
    </p>
  );
}

type Siradaki = { baslik: string; ad: string; tarih: YMD; bitis?: YMD; href: string };

/** Bugünden sonraki ilk tatil, bayram, kandil, özel gün, okul olayı ve gökyüzü olayı; kaç gün kaldığıyla. */
function siradakiler(bugun: YMD): Siradaki[] {
  const bk = ymdKey(bugun);
  const etk = [...yilEtkinlikleri(bugun.year), ...yilEtkinlikleri(bugun.year + 1)].filter((t) => ymdKey(t.bitis ?? t.tarih) >= bk);
  const ilk = (f: (t: Tarihli) => boolean, baslik: string): Siradaki | null => {
    const t = etk.find(f);
    return t
      ? { baslik, ad: tarihliAd(t), tarih: t.tarih, bitis: t.bitis, href: t.etkinlik.geriSayim ? `/geri-sayim/${t.etkinlik.geriSayim}` : ozelGunPath(t.etkinlik.id) }
      : null;
  };
  const tatil = [...turkeyHolidays(bugun.year), ...turkeyHolidays(bugun.year + 1)].find((h) => h.kind === "full" && ymdKey(h.date) >= bk);
  const okul = siradakiOkulOlaylari(bugun)[0];
  const simdi = new Date(Date.UTC(bugun.year, bugun.month - 1, bugun.day, -3));
  const gok = skyEvents(simdi, new Date(simdi.getTime() + 120 * 86400000)).find(
    (e) => e.kind === "meteor" || e.kind === "eclipse" || (e.kind === "moon" && e.title !== "Dolunay") || (e.kind === "planet" && e.title.includes("karşı konumda")),
  );
  return [
    tatil ? { baslik: "Sıradaki resmî tatil", ad: tatil.name, tarih: tatil.date, href: "/resmi-tatiller" } : null,
    ilk((t) => t.etkinlik.kategori === "bayram", "Sıradaki bayram"),
    ilk((t) => t.etkinlik.kategori === "dini" && /kandil|kadir/.test(t.etkinlik.id), "Sıradaki kandil"),
    ilk((t) => t.etkinlik.kategori === "ozel" || t.etkinlik.kategori === "milli", "Sıradaki özel gün"),
    okul ? { baslik: "Okul takvimi", ad: okul.ad, tarih: okul.bas, bitis: okul.bit, href: "/okul-takvimi" } : null,
    gok ? { baslik: "Gökyüzünde sıradaki", ad: gok.title.replace(/ zirvesi$/, ""), tarih: trGunu(gok.at), href: "/gokyuzu-olaylari-takvimi" } : null,
  ].filter((x): x is Siradaki => Boolean(x));
}

function SiradakiKartlar({ bugun }: { bugun: YMD }) {
  return (
    <div className="takvim-siradaki">
      {siradakiler(bugun).map((s) => {
        const kalan = diffDays(bugun, s.tarih);
        return (
          <Link key={s.baslik} href={s.href} prefetch={false}>
            <span>{s.baslik}</span>
            <strong>{s.ad}</strong>
            <em>
              {s.bitis ? `${aralik(s)} ${s.bitis.year}` : tarihMetni(s.tarih)} ·{" "}
              <b>{kalan > 0 ? `${kalan} gün kaldı` : kalan === 0 ? "bugün" : "sürüyor"}</b>
            </em>
          </Link>
        );
      })}
    </div>
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
              href={sayfaVar(t.tarih) ? takvimGunPath(t.tarih) : ozelGunPath(t.etkinlik.id)}
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
          <SiradakiKartlar bugun={bugun} />
          <TakvimGezgini bugun={bugun} gokyuzu={yilGokyuzuEtiketleri([bugun.year, bugun.year + 1])} />
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

const META_SIRA = ["tatil", "dini", "milli", "ozel", "okul", "halk", "gokyuzu"];

export function ayMeta(year: number, month: number) {
  const a = AY_ADLARI[month - 1];
  // Açıklamadaki örnekler: ayın en önemli üç günü (önce tatiller, sonra dini, milli ve özel günler).
  const ornek = [...ayTumEtiketleri(year, month)]
    .flatMap(([day, list]) => list.filter((e) => !e.devam).map((e) => ({ day, e })))
    .sort((x, y) => META_SIRA.indexOf(x.e.tur) - META_SIRA.indexOf(y.e.tur) || x.day - y.day)
    .slice(0, 3)
    .sort((x, y) => x.day - y.day)
    .map(({ day, e }) => `${day} ${a} ${e.ad}`);
  return {
    title: `${a} ${year} Takvimi: Resmî Tatiller ve Özel Günler`,
    short: `${a} ${year} Takvimi`,
    description: `${a} ${year} takvimi gün gün: ${ornek.join(", ")}. Resmî tatiller, kandiller, okul tatilleri, fırtınalar, ay evreleri ve gökyüzü olayları.`,
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

// Ayin 1'i, 15'i ve son gunu icin il merkezinde gun dogumu / batimi (Turkiye saati).
const IL_KOORD = {
  ankara: { ad: "Ankara", lat: 39.93, lon: 32.86 },
  edirne: { ad: "Edirne", lat: 41.68, lon: 26.56 },
  van: { ad: "Van", lat: 38.49, lon: 43.38 },
} as const;

function gunesSatiri(year: number, month: number, day: number, il: keyof typeof IL_KOORD) {
  const k = IL_KOORD[il];
  const g = sunTimes(year, month, day, k.lat, k.lon);
  return g.kind === "normal" ? g : null;
}

const dakikaMetni = (dk: number) => `${Math.floor(dk / 60)} sa ${dk % 60} dk`;

function GunesVeAyBolumu({ year, month, a }: { year: number; month: number; a: string }) {
  const son = daysInMonth(year, month);
  const gunler = [1, 15, son];
  const satirlar = gunler.map((d) => ({ d, g: gunesSatiri(year, month, d, "ankara") }));
  const ilk = satirlar[0].g;
  const sonG = satirlar[2].g;
  const fark = ilk && sonG ? sonG.dayLengthMinutes - ilk.dayLengthMinutes : 0;
  const ed = gunesSatiri(year, month, 15, "edirne");
  const van = gunesSatiri(year, month, 15, "van");
  const doguBatiFarki = ed && van ? Math.round((ed.sunrise.getTime() - van.sunrise.getTime()) / 60000) : 0;
  const evreler = moonPhasesBetween(new Date(Date.UTC(year, month - 1, 1, -3)), new Date(Date.UTC(year, month, 1, -3)));
  const EVRE = { new: "Yeni ay", first: "İlk dördün", full: "Dolunay", last: "Son dördün" } as const;
  return (
    <>
      <h2 id="gunes">
        {a} {trLocative(year)} gün doğumu, gün batımı ve gün uzunluğu
      </h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Tarih (Ankara)</th>
              <th>Gün doğumu</th>
              <th>Gün batımı</th>
              <th>Gün uzunluğu</th>
            </tr>
          </thead>
          <tbody>
            {satirlar.map(({ d, g }) => (
              <tr key={d}>
                <td>
                  {d} {a}
                </td>
                <td>{g ? saatMetni(g.sunrise) : "—"}</td>
                <td>{g ? saatMetni(g.sunset) : "—"}</td>
                <td>{g ? dakikaMetni(g.dayLengthMinutes) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {fark === 0
          ? `${a} boyunca Ankara'da gün uzunluğu neredeyse değişmez.`
          : `${a} boyunca Ankara'da günler toplam ${Math.abs(fark)} dakika ${fark > 0 ? "uzar" : "kısalır"}.`}{" "}
        Türkiye tek saat dilimini kullandığı için Güneş doğuda batıdan çok daha erken doğar: {a} ortasında Van&apos;da gün
        doğumu Edirne&apos;den yaklaşık {doguBatiFarki} dakika öncedir. Saatler düz ufuk ve deniz seviyesi için hesaplanmıştır;
        ilinize ve gününüze göre saatler için <Link href="/gunes-dogusu-ve-batisi">güneş doğuşu ve batışı</Link> sayfasına bakabilirsiniz.
      </p>

      <h2 id="evreler">
        {a} {year} ay evreleri
      </h2>
      <ul>
        {evreler.map((e) => (
          <li key={e.date.toISOString()}>
            <strong>{EVRE[e.kind]}</strong>:{" "}
            {e.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long", timeZone: "Europe/Istanbul" })}{" "}
            saat {saatMetni(e.date)}
          </li>
        ))}
      </ul>
      <p>
        Ayın her günkü görünümü, doğuş ve batış saatleri için <Link href="/ay-evreleri">ay evreleri</Link> sayfasını
        kullanabilirsiniz.
      </p>
    </>
  );
}

/** Ayın her günü: haftanın günü, Hicri karşılığı ve o günün bütün etiketleri. Satırlar #gun-N çapasıyla açılır. */
function GunGunTablosu({ year, month, etiketler, bugun }: { year: number; month: number; etiketler: Map<number, Etiket[]>; bugun: YMD }) {
  const a = AY_ADLARI[month - 1];
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table takvim-gun-gun">
        <caption>
          {a} {year}: her gün hangi güne denk geliyor, Hicri tarihi ve o gün neler var
        </caption>
        <thead>
          <tr>
            <th scope="col">Tarih</th>
            <th scope="col">Hicri</th>
            <th scope="col">O gün</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: daysInMonth(year, month) }, (_, i) => {
            const d = { year, month, day: i + 1 };
            const etk = etiketler.get(i + 1) ?? [];
            const cls = [isWeekend(d) ? "is-weekend" : "", ymdKey(d) === ymdKey(bugun) ? "is-today" : ""].filter(Boolean).join(" ");
            return (
              <tr key={i} id={`gun-${i + 1}`} className={cls || undefined}>
                <th scope="row">
                  {i + 1} {a} <span className="takvim-gun-adi">{formatYmd(d, "tr").split(" ").pop()}</span>
                </th>
                <td>{gunBilgisi(d).hicriMetin}</td>
                <td>
                  {etk.map((e, j) => (
                    <span key={e.ad} className={`etk etk-${e.tur}`}>
                      {j ? " " : ""}
                      <span className="etk-nokta" aria-hidden="true" />
                      <Link href={e.href} prefetch={false}>
                        {e.ad}
                      </Link>
                      {e.tahmini ? <small> (tahmini)</small> : null}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
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
  const etiketler = ayTumEtiketleri(year, month);
  const bugun = trBugun();
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
      question: `${a} ${trLocative(year)} kaç iş günü var?`,
      answer: `${a} ${trLocative(year)} hafta sonları ve resmî tatiller çıkarıldığında ${String(st.isGunu).replace(".", ",")} iş günü vardır (Cumartesi tatil kabul edilerek).`,
    },
    {
      question: `${a} ${trLocative(year)} resmî tatil var mı?`,
      answer: st.tatilGunu
        ? `Evet, ${a} ${trLocative(year)} ${st.tatilGunu} gün tam gün resmî tatil var: ${turkeyHolidays(
            year,
          )
            .filter((h) => h.date.month === month && h.kind === "full")
            .map((h) => `${kisaTarih(h.date)} ${h.name}`)
            .join(", ")}.`
        : `Hayır, ${a} ${trLocative(year)} resmî tatil yok.`,
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
      intro={`${a} ${year} takvimi: resmî tatiller, özel günler ve ay evreleri.`}
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
          <TakvimFiltre>
            <AyIzgarasi year={year} month={month} bugun={bugun} buyuk etiketler={etiketler} />
          </TakvimFiltre>
          <Lejant okul />
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
          ...TAKVIM_ARACLARI.slice(0, 3),
        ],
      }}
      tocTitle={T.toc}
      tocItems={[
        { id: "gun-gun", label: `${a} ${year} gün gün` },
        { id: "gunler", label: `${a} ${year} özel günleri` },
        { id: "gunes", label: "Gün doğumu ve gün uzunluğu" },
        { id: "evreler", label: `${a} ay evreleri` },
        ...(ayFirtinalari(month).length
          ? [{ id: "firtinalar", label: `${a} fırtınaları` }]
          : []),
        { id: "faq", label: T.faq },
      ]}
      faqTitle={T.faq}
      faqItems={faq}
    >
      <h2 id="gun-gun">
        {a} {year} gün gün
      </h2>
      <p>
        {a} {year} takviminin her günü: haftanın hangi gününe denk geldiği, Hicri tarihi ve o gün olanlar. Resmî tatil
        ve bayramların yanında kandiller, özel günler, halk takvimindeki fırtınalar, MEB okul takvimi, ay evreleri ve
        meteor yağmuru, tutulma gibi gökyüzü olayları birlikte gösterilir.
      </p>
      <GunGunTablosu year={year} month={month} etiketler={etiketler} bugun={bugun} />
      <h2 id="gunler">
        {a} {year} özel günleri
      </h2>
      {list.length ? (
        <EtkinlikListesi list={list} />
      ) : (
        <p>Bu ayda takvimimizdeki özel günlerden biri bulunmuyor.</p>
      )}
      <GunesVeAyBolumu year={year} month={month} a={a} />
      {ayFirtinalari(month).length ? (
        <>
          <h2 id="firtinalar">{a} fırtınaları (halk takvimi)</h2>
          <p>
            <Link href="/firtina-takvimi">Fırtına takvimine</Link> göre (1-3 gün sapabilir):
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
/* /ozel-gunler                                                          */

const KATEGORI_SIRA: Kategori[] = [
  "resmi",
  "bayram",
  "dini",
  "milli",
  "ozel",
  "hristiyan",
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
                      <a href={`#${e.id}`}>
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
                      </a>
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
      <ScrollToQuery param="gun" />
      {KATEGORI_SIRA.map((k) =>
        ETKINLIKLER.filter((e) => e.kategori === k).map((e) => {
          const s = sonrakiTarih(e, bugun);
          const kalan = s ? diffDays(bugun, s.tarih) : null;
          const satirlar = TAKVIM_YILLARI.flatMap((y) => etkinlikTarihleri(e, y));
          return (
            <section key={e.id} id={e.id} className="takvim-ozel-gun">
              <h2>{e.ad} ne zaman?</h2>
              <p>
                <strong>
                  {s ? `${tarihMetni(s.tarih)}${kalan !== null ? (kalan <= 0 ? " (bugün)" : ` (${kalan} gün kaldı)`) : ""}` : ""}
                </strong>{" "}
                <TatilEtiketi e={e} />
              </p>
              <p>{e.hakkinda}</p>
              <p>
                {satirlar.map((t, i) => (
                  <span key={ymdKey(t.tarih)}>
                    {i > 0 ? " · " : ""}
                    {t.tarih.year}: {aralik(t)}
                    {t.tahmini ? " (tahmini)" : ""}
                  </span>
                ))}
              </p>
              {e.geriSayim ? (
                <p>
                  <Link href={`/geri-sayim/${e.geriSayim}`} prefetch={false}>
                    {e.ad} için canlı geri sayım
                  </Link>
                </p>
              ) : null}
              {OZEL_GUN_SAYFALARI.includes(e.id) ? (
                <p>
                  <Link href={`/ozel-gunler/${e.id}`} prefetch={false}>
                    {e.ad}: anlamı, gelenekleri ve yıllara göre tarihleri
                  </Link>
                </p>
              ) : null}
            </section>
          );
        }),
      )}
      <p>
        Bayram ve kandillerin tarihleri Hicri (ay) takvimine göre belirlendiği için her yıl yaklaşık 11 gün öne gelir;
        Anneler ve Babalar Günü ayın belirli bir pazarına denk gelir. Dini günler Diyanet İşleri Başkanlığı&apos;nın
        takvimine göredir; {DINI_DOGRULANAN} sonrası yıllar Diyanet takvimi yayımlanana kadar tahminidir.
      </p>
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
/* /ozel-gunler/<id>: kendi sayfası olan özel günler                   */

export function OzelGunDetay({ e, icerik }: { e: Etkinlik; icerik: OzelGunIcerik }) {
  const bugun = trBugun();
  const s = sonrakiTarih(e, bugun);
  const kalan = s ? diffDays(bugun, s.tarih) : null;
  const satirlar = TAKVIM_YILLARI.flatMap((y) => etkinlikTarihleri(e, y));
  const iliskili = icerik.iliskili.ids
    .map((id) => ETKINLIKLER.find((x) => x.id === id))
    .filter((x): x is Etkinlik => Boolean(x))
    .map((x) => ({ x, t: sonrakiTarih(x, bugun) }))
    .filter((r): r is { x: Etkinlik; t: Tarihli } => Boolean(r.t))
    .sort((a, b) => ymdKey(a.t.tarih).localeCompare(ymdKey(b.t.tarih)));
  const path = `/ozel-gunler/${e.id}`;
  return (
    <TimeToolPage
      crumbs={[HOME, HUB, { href: "/ozel-gunler", label: "Özel Günler" }, { href: path, label: e.ad }]}
      crumbLabel={T.crumbLabel}
      title={icerik.h1}
      intro={icerik.intro}
      tool={
        <div className="takvim-kart">
          <TakvimGorsel gorsel={e.gorsel} size={72} />
          <div>
            <span className={`takvim-kat kat-${e.kategori}`}>{KATEGORI_ADI[e.kategori]}</span>
            <p>
              <strong>
                {s ? `${s.not ? `${s.not}: ` : ""}${tarihMetni(s.tarih)}` : "—"}
                {kalan !== null ? (kalan <= 0 ? " · bugün" : ` · ${kalan} gün kaldı`) : ""}
                {s?.tahmini ? " (tahmini)" : ""}
              </strong>
            </p>
            <p>{e.kisa}</p>
            <p>
              <TatilEtiketi e={e} />
            </p>
          </div>
        </div>
      }
      related={{ title: T.related, links: [{ href: "/ozel-gunler", label: "Tüm özel günler" }, ...(e.araclar ?? []), HUB, ...TAKVIM_ARACLARI.slice(0, 4)] }}
      tocTitle={T.toc}
      tocItems={[
        { id: "tarihler", label: `Yıllara göre ${e.ad.toLocaleLowerCase("tr-TR")} tarihleri` },
        { id: "iliskili", label: icerik.iliskili.baslik },
        ...icerik.bolumler.map((b) => ({ id: b.id, label: b.baslik })),
        { id: "faq", label: T.faq },
      ]}
      faqTitle={T.faq}
      faqItems={icerik.sss}
    >
      <h2 id="tarihler">Yıllara göre {e.ad.toLocaleLowerCase("tr-TR")} tarihleri</h2>
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
                <th scope="row">{t.tarih.year}</th>
                <td>
                  {t.not ? `${t.not}: ` : ""}
                  {aralik(t)}
                  {t.tahmini ? " (tahmini)" : ""}
                </td>
                <td>{GUN_ADLARI[weekdayOf(t.tarih)]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{e.hakkinda}</p>

      <h2 id="iliskili">{icerik.iliskili.baslik}</h2>
      <ul className="takvim-liste">
        {iliskili.map(({ x, t }) => (
          <li key={x.id + ymdKey(t.tarih)}>
            <strong>{tarihliAd(t)}</strong>: {tarihMetni(t.tarih)}
            {t.tahmini ? " (tahmini)" : ""} · {diffDays(bugun, t.tarih) <= 0 ? "bugün" : `${diffDays(bugun, t.tarih)} gün sonra`}
          </li>
        ))}
      </ul>

      {icerik.bolumler.map((b) => (
        <section key={b.id}>
          <h2 id={b.id}>{b.baslik}</h2>
          {b.paragraflar.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </section>
      ))}
      {e.kategori === "dini" ? (
        <p>
          <small>
            Dini günler Diyanet İşleri Başkanlığı&apos;nın takvimine göredir; {DINI_DOGRULANAN} sonrası yıllar Diyanet takvimi yayımlanana kadar
            tahminidir.
          </small>
        </p>
      ) : null}
    </TimeToolPage>
  );
}


/* ---- Birleştirmeden önce bu dosyada olan tanımlar (21 Ekim 2026, sayfalar geri getirildi) ---- */
const OZEL_HUB = { href: "/ozel-gunler", label: "Özel Günler" };

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
  advent: "Noel'den önceki dördüncü pazar gününe göre belirlendiği için tarihi her yıl değişir.",
  paskalya: "Paskalya'ya göre belirlendiği için tarihi her yıl değişir; Paskalya ilkbahar dolunayından sonraki ilk pazardır.",
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



/* ---- Birleştirmeden önce bu dosyada olan tanımlar (21 Ekim 2026, sayfalar geri getirildi) ---- */
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

const gunluTarih = (d: YMD) => `${kisaTarih(d)} ${d.year} ${GUN_ADLARI[weekdayOf(d)]}`;
const sayiMetni = (n: number) => String(n).replace(".", ",");

/** Her resmî tatilin ilk tam günü (bayramlar tek kayıt), takvim yıllarının bir öncesi ve sonrasıyla. */
function resmiTatilBaslangiclari() {
  const yillar = [TAKVIM_YILLARI[0] - 1, ...TAKVIM_YILLARI, TAKVIM_YILLARI[TAKVIM_YILLARI.length - 1] + 1];
  return yillar
    .flatMap(turkeyHolidays)
    .filter((h) => h.kind === "full" && (h.dayIndex === undefined || h.dayIndex === 1))
    .map((h) => ({ id: h.id, ad: h.name.replace(/ \d+\. Gün$/, ""), tarih: h.date, tahmini: !!h.estimated }));
}

/** d gününden başlayan kesintisiz boş gün bloğu (hafta sonu ve tam gün resmî tatiller). */
function bosBlok(d: YMD) {
  const lookup = holidayLookup("tr", d.year - 1, d.year + 1);
  const bos = (x: YMD) => isWeekend(x) || lookup(x)?.kind === "full";
  if (!bos(d)) return null;
  let bas = d;
  let son = d;
  while (bos(addDaysYmd(bas, -1))) bas = addDaysYmd(bas, -1);
  while (bos(addDaysYmd(son, 1))) son = addDaysYmd(son, 1);
  const gun = diffDays(bas, son) + 1;
  return { bas, son, gun, haftaSonu: Array.from({ length: gun }, (_, i) => addDaysYmd(bas, i)).some(isWeekend) };
}

/** Güne özgü hesaplanan bilgiler: tatil süresi, köprü, komşu resmî tatiller, yıllara göre gün, aynı hafta, güneş. */
function gunAyrintilari(d: YMD) {
  const tarih = `${d.day} ${AY_ADLARI[d.month - 1]} ${d.year}`;
  const tatilBul = holidayLookup("tr", d.year - 1, d.year + 1);
  const resmi = tatilBul(d);
  // Arefe iş gününe düşerse tatil ertesi gün başlar.
  const arefe = resmi?.kind === "half" && !isWeekend(d);
  const blok = resmi ? bosBlok(arefe ? addDaysYmd(d, 1) : d) : null;
  const blokMetni = blok
    ? blok.gun > 1
      ? `${arefe ? "Ertesi günden itibaren " : ""}${gunluTarih(blok.bas)} ile ${gunluTarih(blok.son)} arası ${blok.gun} gün kesintisiz tatildir${blok.haftaSonu ? " (hafta sonu dahil)" : ""}.`
      : arefe
        ? `Ertesi gün (${gunluTarih(blok.bas)}) tam gün tatildir; ondan sonraki gün iş günüdür.`
        : `${tarih} tek günlük tatildir; önceki ve sonraki gün iş günüdür.`
    : null;
  const haftaSonuNotu = resmi?.kind === "full" && isWeekend(d) ? " Türkiye'de hafta sonuna denk gelen resmî tatil başka bir güne kaydırılmaz." : "";
  const kopru = resmi
    ? bridgePlans("tr", d.year)
        .filter((p) => ymdKey(p.start) <= ymdKey(d) && ymdKey(d) <= ymdKey(p.end))
        .sort((a, b) => b.totalDays / b.leaveCost - a.totalDays / a.leaveCost)[0]
    : undefined;
  const kopruMetni = kopru
    ? `Araya giren ${kopru.leaveDays.map((x) => `${kisaTarih(x)} ${GUN_ADLARI[weekdayOf(x)]}${tatilBul(x)?.kind === "half" ? " (yarım gün)" : ""}`).join(", ")} yıllık izinle birleştirilirse ${gunluTarih(kopru.start)} – ${gunluTarih(kopru.end)} arası ${kopru.totalDays} gün tatil yapılabilir (${sayiMetni(kopru.leaveCost)} gün izinle).`
    : null;

  const tatiller = resmiTatilBaslangiclari();
  const key = ymdKey(d);
  const yakin = (t: (typeof tatiller)[number]) => resmi && t.id === resmi.id && Math.abs(diffDays(t.tarih, d)) < 10;
  const onceki = tatiller.filter((t) => ymdKey(t.tarih) < key && !yakin(t)).at(-1);
  const sonraki = tatiller.find((t) => ymdKey(t.tarih) > key && !yakin(t));
  const komsuMetni = (t: typeof onceki, yon: "önce" | "sonra") =>
    t ? `${t.ad} (${gunluTarih(t.tarih)}${t.tahmini ? ", tahmini" : ""}), ${Math.abs(diffDays(d, t.tarih))} gün ${yon}` : null;

  const bugunku = gunHaritasi(d.year).get(key) ?? [];
  const yillar = bugunku
    .map((t) => {
      const liste = TAKVIM_YILLARI.map((y) => etkinlikTarihleri(t.etkinlik, y).find((x) => x.not === t.not)).filter(
        (x): x is Tarihli => !!x,
      );
      if (liste.length < 2) return null;
      const tip = t.etkinlik.kural.tip;
      const kayma =
        tip === "hicri" || tip === "regaib"
          ? " Hicri takvime bağlı olduğu için her yıl yaklaşık 11 gün öne kayar."
          : tip === "sabit" || tip === "coklu"
            ? " Tarihi her yıl aynıdır; denk geldiği gün değişir."
            : "";
      return {
        id: t.etkinlik.id,
        metin: `${tarihliAd(t)} ${liste
          .map((x) => `${trLocative(x.tarih.year)} ${kisaTarih(x.tarih)} ${GUN_ADLARI[weekdayOf(x.tarih)]}`)
          .join(", ")} gününe denk gelir.${kayma}`,
      };
    })
    .filter((x) => x !== null);

  const pazartesi = addDaysYmd(d, -((weekdayOf(d) + 6) % 7));
  const buIdler = new Set(bugunku.map((t) => t.etkinlik.id));
  const hafta = Array.from({ length: 7 }, (_, i) => addDaysYmd(pazartesi, i))
    .filter((x) => ymdKey(x) !== key && sayfaVar(x))
    .map((x) => ({ d: x, adlar: gunHaritasi(x.year).get(ymdKey(x))!.filter((t) => !buIdler.has(t.etkinlik.id)).map((t) => tarihliAd(t)) }))
    .filter((x) => x.adlar.length > 0);
  const gunes = gunesSatiri(d.year, d.month, d.day, "ankara");
  return { tarih, resmi, blok, blokMetni, haftaSonuNotu, kopruMetni, onceki: komsuMetni(onceki, "önce"), sonraki: komsuMetni(sonraki, "sonra"), sonrakiTatil: sonraki, yillar, hafta, gunes };
}

export function TakvimGunSayfasi({ d }: { d: YMD }) {
  const b = gunBilgisi(d);
  const a = gunAyrintilari(d);
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
    ...(a.blokMetni
      ? [{ question: `${tarih} tatili kaç gün sürüyor?`, answer: `${a.blokMetni}${a.haftaSonuNotu}${a.kopruMetni ? ` ${a.kopruMetni}` : ""}` }]
      : []),
    ...(a.sonraki ? [{ question: `${tarih} sonrasındaki ilk resmî tatil ne zaman?`, answer: `Bir sonraki resmî tatil ${a.sonraki}.` }] : []),
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
        { id: "ayrinti", label: `${tarih} ayrıntıları` },
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
      <h2 id="ayrinti">{tarih} ayrıntıları</h2>
      {a.blokMetni ? (
        <p>
          {a.blokMetni}
          {a.haftaSonuNotu}
          {a.kopruMetni ? ` ${a.kopruMetni}` : ""}
        </p>
      ) : null}
      {a.yillar.map((y) => (
        <p key={y.id}>{y.metin}</p>
      ))}
      <ul className="tool-hub-list">
        {a.onceki ? <li>Önceki resmî tatil: {a.onceki}.</li> : null}
        {a.sonraki ? <li>Sonraki resmî tatil: {a.sonraki}.</li> : null}
        {a.gunes ? (
          <li>
            Ankara'da gün doğumu {saatMetni(a.gunes.sunrise)}, gün batımı {saatMetni(a.gunes.sunset)}; gün uzunluğu{" "}
            {dakikaMetni(a.gunes.dayLengthMinutes)}.
          </li>
        ) : null}
      </ul>
      {a.hafta.length > 0 ? (
        <>
          <h3>Aynı haftadaki diğer özel günler</h3>
          <ul className="tool-hub-list">
            {a.hafta.map((x) => (
              <li key={ymdKey(x.d)}>
                <Link href={takvimGunPath(x.d)} prefetch={false}>
                  {kisaTarih(x.d)} {GUN_ADLARI[weekdayOf(x.d)]}: {x.adlar.join(", ")}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <h2 id="ay">
        {AY_ADLARI[d.month - 1]} {d.year}
      </h2>
      <AyIzgarasi year={d.year} month={d.month} bugun={d} />
    </TimeToolPage>
  );
}


// "Saat ve Tarih" bölüm ana sayfası (Türkçe): canlı saat, bugünün bilgileri,
// yaklaşan günler ve tüm tarih-saat araçları tek yerde.
import Link from "@/app/components/SiteLink";
import { ETKINLIKLER, gunBilgisi, KATEGORI_ADI, ozelGunPath, sonrakiTarih, tarihliAd } from "../../converter/calendar/trTakvim";
import type { FaqItem } from "../../converter/faqSchema";
import { diffDays, formatYmd, ymdKey } from "../../converter/time/dateMath";
import { turkeyHolidays } from "../../converter/time/holidays";
import { DecorativeIcon, type SiteIconName } from "../siteIcons";
import { trBugun } from "../takvim/TakvimSayfalari";
import TimeToolPage from "../time/TimeToolPage";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { worldCities } from "../../converter/time/worldCities";
import DayNightMap from "./DayNightMap";
import TimeHubHero, { type HubHeroCopy } from "./TimeHubHero";

export const TR_TIME_HUB_PATH = "/saat-ve-tarih";

type Group = { id: string; title: string; icon: SiteIconName; links: Array<{ href: string; label: string; note: string }> };

const GROUPS: Group[] = [
  {
    id: "saat",
    title: "Saat",
    icon: "time",
    links: [
      { href: "/online-saat", label: "Online Saat", note: "34 temalı canlı saat, tam ekran" },
      { href: "/online-alarm-kur", label: "Online Alarm", note: "Sesli alarm, tarayıcıda" },
      { href: "/zamanlayici", label: "Zamanlayıcı", note: "Geri sayan sayaç" },
      { href: "/kronometre", label: "Kronometre", note: "Tur kaydı ve CSV" },
      { href: "/pomodoro", label: "Pomodoro", note: "25+5 çalışma düzeni" },
      { href: "/tabata-zamanlayici", label: "Tabata ve Aralık", note: "Antrenman sayacı" },
    ],
  },
  {
    id: "takvim",
    title: "Takvim ve Günler",
    icon: "dateCalculator",
    links: [
      { href: "/takvim", label: "Türkiye Takvimi", note: "Ay ay, tatiller işaretli" },
      { href: "/kacinci-hafta", label: "Kaçıncı Hafta?", note: "Bu haftanın numarası" },
      { href: "/resmi-tatiller", label: "Resmî Tatiller", note: "Köprüler ve izin planı" },
      { href: "/ozel-gunler", label: "Özel Günler", note: "Bayram, kandil, milli günler" },
      { href: "/okul-takvimi", label: "Okul Takvimi", note: "Dönem ve tatil tarihleri" },
      { href: "/geri-sayim", label: "Geri Sayım", note: "Kaç gün kaldı?" },
    ],
  },
  {
    id: "hesapla",
    title: "Tarih Hesapla",
    icon: "weekNumber",
    links: [
      { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki Tarih Arası Gün", note: "Gün, hafta, ay, yıl" },
      { href: "/tarihe-gun-ekleme", label: "Tarihe Gün Ekleme", note: "90 gün sonra ne zaman?" },
      { href: "/yas-hesaplama", label: "Yaş Hesaplama", note: "Gün gün yaşınız" },
      { href: "/is-gunu-hesaplama", label: "İş Günü Hesaplama", note: "Tatiller düşülerek" },
      { href: "/yillik-izin-hesaplama", label: "Yıllık İzin", note: "Kıdeme göre izin günü" },
      { href: "/dogdugum-gun-hangi-gun", label: "Doğduğum Gün", note: "Hangi güne denk geldi?" },
    ],
  },
  {
    id: "dunya",
    title: "Dünya Saatleri",
    icon: "greatCircleCalculator",
    links: [
      { href: "/dunya-saatleri", label: "Dünya Saatleri", note: "97 şehirde şu anki saat" },
      { href: "/saat-dilimi-cevirici", label: "Saat Dilimi Çevirici", note: "Toplantı saati bulun" },
      { href: "/yerel-saat-hesaplama", label: "Yerel Saat Hesaplama", note: "Boylama göre güneş saati" },
      { href: "/unix-zaman-damgasi-cevirici", label: "Unix Zaman Damgası", note: "Yazılımcılar için" },
    ],
  },
  {
    id: "gokyuzu",
    title: "Gökyüzü",
    icon: "sleepCalculator",
    links: [
      { href: "/ay-evreleri", label: "Ay Evreleri", note: "Dolunay ve yeni ay saatleri" },
      { href: "/altin-saat", label: "Altın Saat", note: "Fotoğraf için en iyi ışık" },
    ],
  },
  {
    id: "turkiye",
    title: "Türkiye'ye Özel",
    icon: "hijriCalendarCalculator",
    links: [
      { href: "/hicri-takvim", label: "Hicri Takvim", note: "Bugünün hicri tarihi" },
      { href: "/tarih-cevirici", label: "Hicri, Rumi, Miladi Çevirici", note: "Eski belgeler için" },
      { href: "/firtina-takvimi", label: "Fırtına Takvimi", note: "Halk takviminden" },
    ],
  },
];

const HERO_COPY: HubHeroCopy = {
  ariaLabel: "Şu anki saat",
  zoneLabel: "Türkiye saati (UTC+3)",
  dateLine: "{date} · {week}. hafta · yılın {doy}. günü",
  deviceTime: "Cihazınızın saati: {time} ({zone})",
  sun: "Güneş",
  placeLabel: "İl seçin",
  dayLength: "{h} sa {m} dk gündüz",
  same: "aynı saat",
  hourAbbr: "sa",
};

const STRIP_SLUGS = ["new-york", "londra", "berlin", "moskova", "mekke", "dubai", "pekin", "tokyo", "sidney"];

function TrHero() {
  const strip = STRIP_SLUGS.map((slug) => worldCities.find((c) => c.tr === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ name: c.nameTr, timeZone: c.timeZone, href: `/dunya-saatleri/${c.tr}` }));
  return (
    <TimeHubHero
      intlLocale="tr-TR"
      timeZone="Europe/Istanbul"
      copy={HERO_COPY}
      places={turkeyProvinces.map((p) => ({ id: p.id, name: p.name, lat: p.lat, lon: p.lon }))}
      defaultPlace="istanbul"
      storageKey="saat-ve-tarih-il"
      strip={strip}
    />
  );
}

const MAP_CITIES = ["istanbul", "london", "new-york", "los-angeles", "sao-paulo", "cairo", "johannesburg", "moscow", "new-delhi", "beijing", "tokyo", "sydney"];

function mapCities() {
  return MAP_CITIES.map((slug) => worldCities.find((c) => c.en === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ name: c.nameTr, lat: c.lat, lon: c.lon, timeZone: c.timeZone }));
}

/** Bugünden itibaren en yakın özel günler (bugün dahil). */
function upcoming(today: { year: number; month: number; day: number }, count: number) {
  return ETKINLIKLER.map((e) => sonrakiTarih(e, today))
    .filter((t) => t !== null)
    .map((t) => ({ t, days: diffDays(today, t.tarih) }))
    .filter((x) => x.days >= 0)
    .sort((a, b) => a.days - b.days || a.t.etkinlik.ad.localeCompare(b.t.etkinlik.ad, "tr"))
    .slice(0, count);
}

export default function TrTimeHubPage() {
  const today = trBugun();
  const info = gunBilgisi(today);
  const nextHoliday = [...turkeyHolidays(today.year), ...turkeyHolidays(today.year + 1)].find((h) => h.kind === "full" && diffDays(today, h.date) > 0);
  const soon = upcoming(today, 8);
  const todayEvents = info.etkinlikler;

  const faq: FaqItem[] = [
    {
      question: "Türkiye hangi saat dilimini kullanıyor?",
      answer: "Türkiye 2016'dan beri yıl boyunca UTC+3 saatini kullanır; yaz ve kış saati uygulaması yoktur. Bu yüzden Avrupa'daki saat değişimlerinde aradaki fark 1 saat değişir.",
    },
    {
      question: "Hafta numarası nasıl hesaplanır?",
      answer: `Türkiye'de ISO 8601 kuralı geçerlidir: hafta pazartesi başlar ve yılın ilk perşembesini içeren hafta 1. haftadır. Bugün ${info.hafta}. haftadayız.`,
    },
    {
      question: "Hicri tarih neden her yıl kayar?",
      answer: `Hicri takvim aya göre işler ve yılı yaklaşık 354 gündür. Bu yüzden bayram ve kandiller miladi takvimde her yıl 10-11 gün öne gelir. Bugün hicri takvime göre ${info.hicriMetin}.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[{ href: "/", label: "Ana Sayfa" }, { label: "Saat ve Tarih" }]}
      crumbLabel="Sayfa yolu"
      title="Saat ve Tarih"
      intro="Türkiye'de saat şu an kaç, bugün ne günü, sıradaki tatile kaç gün var? Canlı saat, bugünün hicri ve rumi tarihi, ay evresi, güneşin doğuş ve batış saatleri ile bütün saat ve takvim araçları bu sayfada."
      tool={<TrHero />}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "bugun", label: "Bugün" },
        { id: "gece-gunduz", label: "Gece ve gündüz haritası" },
        { id: "yaklasan", label: "Yaklaşan günler" },
        { id: "araclar", label: "Tüm saat ve tarih araçları" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faq}
    >
      <h2 id="bugun">Bugün: {formatYmd(today, "tr", true)}</h2>
      <div className="timehub-today">
        <div className="timehub-today-item">
          <span>Hicri</span>
          <strong>{info.hicriMetin}</strong>
        </div>
        {info.rumiMetin ? (
          <div className="timehub-today-item">
            <span>Rumi</span>
            <strong>{info.rumiMetin}</strong>
          </div>
        ) : null}
        <div className="timehub-today-item">
          <span>Ay</span>
          <strong>{info.ayEvresi}</strong>
          <em>%{Math.round(info.ayAydinlik * 100)} aydınlık</em>
        </div>
        <div className="timehub-today-item">
          <span>Yıl</span>
          <strong>{info.yilinGunu}. gün</strong>
          <em>yılın bitmesine {info.kalanGun} gün</em>
        </div>
        <div className="timehub-today-item">
          <span>Halk takvimi</span>
          <strong>
            {info.halk.buyuk.ad}, {info.halk.buyuk.gun}. gün
          </strong>
          {info.halk.kucuk ? (
            <em>
              {info.halk.kucuk.ad}: {info.halk.kucuk.gun}/{info.halk.kucuk.toplam}
            </em>
          ) : null}
        </div>
        {nextHoliday ? (
          <div className="timehub-today-item is-accent">
            <span>Sıradaki resmî tatil</span>
            <strong>{nextHoliday.name}</strong>
            <em>
              {formatYmd(nextHoliday.date, "tr", true)} · {diffDays(today, nextHoliday.date)} gün kaldı
            </em>
          </div>
        ) : null}
      </div>
      {todayEvents.length ? (
        <p>
          Bugün:{" "}
          {todayEvents.map((t, i) => (
            <span key={`${t.etkinlik.id}-${i}`}>
              {i ? ", " : ""}
              <Link href={ozelGunPath(t.etkinlik.id)}>{tarihliAd(t)}</Link>
            </span>
          ))}
          .
        </p>
      ) : null}

      <h2 id="gece-gunduz">Dünyada şu an neresi gece, neresi gündüz?</h2>
      <p>
        Koyu bölge şu an gece olan yerleri gösterir; sarı nokta güneşin tam tepede olduğu yer. Harita her dakika güncellenir. Gece ile gündüzün
        sınırı mevsime göre eğilir: sonbahar ekinoksundan (22-23 Eylül) ilkbahar ekinoksuna (20-21 Mart) kadar kuzey yarım kürede geceler gündüzlerden uzundur.
      </p>
      <DayNightMap ariaLabel="Gece ve gündüz dünya haritası" lang="tr" intlLocale="tr-TR" cities={mapCities()} dayLabel="gündüz" nightLabel="gece" />

      <h2 id="yaklasan">Yaklaşan günler</h2>
      <ul className="timehub-upcoming">
        {soon.map(({ t, days }) => (
          <li key={`${t.etkinlik.id}-${ymdKey(t.tarih)}`}>
            <Link href={ozelGunPath(t.etkinlik.id)}>
              <strong>{tarihliAd(t)}</strong>
              <span>{formatYmd(t.tarih, "tr", true)}</span>
              <em>
                {days === 0 ? "bugün" : `${days} gün`} · {KATEGORI_ADI[t.etkinlik.kategori]}
              </em>
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/ozel-gunler">Bütün özel günler</Link> · <Link href="/resmi-tatiller">Resmî tatiller ve köprü günleri</Link> ·{" "}
        <Link href="/takvim">Türkiye takvimi</Link>
      </p>

      <h2 id="araclar">Tüm saat ve tarih araçları</h2>
      <div className="timehub-groups">
        {GROUPS.map((group) => (
          <section className="timehub-group" key={group.id} aria-labelledby={`grup-${group.id}`}>
            <h3 id={`grup-${group.id}`}>
              <span className="home-category-icon-box" aria-hidden="true">
                <DecorativeIcon className="home-category-icon-svg" name={group.icon} size={28} />
              </span>
              {group.title}
            </h3>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <strong>{link.label}</strong>
                    <span>{link.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </TimeToolPage>
  );
}

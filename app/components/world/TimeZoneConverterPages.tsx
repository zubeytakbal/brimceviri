import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { cityPath, describeDifference, hourMapping } from "../../converter/time/cityFacts";
import { findZone, zoneOptions } from "../../converter/time/timeZoneOptions";
import { zonePairs, type ZonePair } from "../../converter/time/timeZonePairs";
import { differenceMinutes, formatUtcOffset, offsetMinutes } from "../../converter/time/timezones";
import { worldCities } from "../../converter/time/worldCities";
import TimeToolPage from "../time/TimeToolPage";
import TimeZoneConverter, { type ConverterCopy } from "./TimeZoneConverter";

// Saat dilimi cevirici sayfalari: TR/EN ana sayfa + EN kisaltma cifti sayfalari.

const COPY: Record<"tr" | "en", ConverterCopy> = {
  tr: {
    from: "Kaynak saat dilimi",
    to: "Hedef saat dilimi",
    date: "Tarih",
    time: "Saat",
    now: "Şimdi",
    swap: "Yer değiştir",
    add: "Saat dilimi ekle",
    remove: "Kaldır",
    share: "Paylaşım linkini kopyala",
    copied: "Kopyalandı ✓",
    planner: "Toplantı planlayıcı",
    plannerHint: "Sütunlar kaynak saat diliminin 24 saatidir. Yeşil: mesai (09-18), koyu: gece. Bir saate dokunarak onu seçebilirsin.",
    abbrGroup: "Saat dilimleri",
    cityGroup: "Şehirler",
    work: "Mesai saati",
    night: "Gece",
    nextDay: "Ertesi gün",
    prevDay: "Önceki gün",
  },
  en: {
    from: "From time zone",
    to: "To time zone",
    date: "Date",
    time: "Time",
    now: "Now",
    swap: "Swap",
    add: "Add time zone",
    remove: "Remove",
    share: "Copy share link",
    copied: "Copied ✓",
    planner: "Meeting planner",
    plannerHint: "Columns are the 24 hours of the source time zone. Green: business hours (9–6), dark: night. Tap an hour to select it.",
    abbrGroup: "Time zones",
    cityGroup: "Cities",
    work: "Business hours",
    night: "Night",
    nextDay: "Next day",
    prevDay: "Previous day",
  },
};

function converterOptions(lang: "tr" | "en") {
  return zoneOptions.map((o) => ({ id: o.id, label: lang === "tr" ? o.tr : o.en, timeZone: o.timeZone, group: o.group }));
}

export function TimeZoneConverterHub({ lang }: { lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const now = new Date();
  const basePath = tr ? "/saat-dilimi-cevirici" : "/en/time-zone-converter";
  const popular = ["london", "new-york", "dubai", "berlin", "tokyo", "los-angeles", "moscow", "sydney", "new-delhi", "baku"]
    .map((slug) => worldCities.find((c) => c.en === slug)!)
    .map((city) => ({ city, diff: differenceMinutes(tr ? "Europe/Istanbul" : "America/New_York", city.timeZone, now) }));

  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Saat dilimi çevirici yaz saatini hesaba katıyor mu?",
          answer: "Evet. Her bölge IANA saat dilimi veritabanına bağlıdır; seçtiğin tarihte yaz saati geçerliyse fark otomatik uygulanır. Örneğin New York ile İstanbul arası yazın 7, kışın 8 saattir.",
        },
        {
          question: "EST ile ET arasındaki fark nedir?",
          answer: "EST (UTC−5), ABD doğusunun kış saatidir; yazın bölge EDT'ye (UTC−4) geçer. ET ikisini birlikte ifade eder. Çeviricide \"ET\" seçersen doğru olanı tarihe göre kendisi seçer.",
        },
        {
          question: "Farklı ülkelerdeki kişilerle toplantı saatini nasıl bulurum?",
          answer: "Tüm katılımcıların şehirlerini ekle ve toplantı planlayıcıya bak: her şehrin satırında yeşil hücreler mesai saatleridir. Tüm satırların yeşil olduğu sütun en uygun saattir.",
        },
        {
          question: "Sonucu başkasıyla paylaşabilir miyim?",
          answer: "Evet. \"Paylaşım linkini kopyala\" düğmesi seçtiğin saat dilimlerini, tarihi ve saati içeren bir link oluşturur.",
        },
      ]
    : [
        {
          question: "Does the converter handle daylight saving time?",
          answer: "Yes. Every zone is tied to the IANA time zone database, so if daylight saving applies on the date you pick, the offset is applied automatically. For example New York is 4 hours behind London most of the year but 5 hours behind for a few weeks in March and late October/November.",
        },
        {
          question: "What is the difference between EST and ET?",
          answer: "EST (UTC−5) is US Eastern Standard Time, used in winter; in summer the region switches to EDT (UTC−4). \"ET\" covers both — pick ET and the converter uses the right one for your date.",
        },
        {
          question: "How do I find a meeting time across time zones?",
          answer: "Add every participant's city and check the meeting planner: green cells are business hours in each row. A column that is green in every row is the best slot.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: basePath, label: tr ? "Saat Dilimi Çevirici" : "Time Zone Converter" },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      title={tr ? "Saat Dilimi Çevirici" : "Time Zone Converter"}
      intro={
        tr
          ? "Bir saati aynı anda birden çok şehre çevir: İstanbul 15:00 iken New York, Londra ve Tokyo'da saat kaç? Yaz saati otomatik uygulanır; toplantı planlayıcı ortak uygun saati gösterir."
          : "Convert a time to several cities at once: when it's 3 pm in New York, what time is it in London, Delhi and Tokyo? Daylight saving is applied automatically, and the meeting planner shows the best common slot."
      }
      tool={
        <TimeZoneConverter
          options={converterOptions(lang)}
          lang={lang}
          copy={COPY[lang]}
          initialFrom={tr ? "istanbul" : "et"}
          initialTo={tr ? ["new-york", "london", "tokyo"] : ["uk", "ist", "pt"]}
          basePath={basePath}
        />
      }
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: tr
          ? [
              { href: "/dunya-saatleri", label: "Dünya Saatleri" },
              { href: "/online-saat", label: "Online Saat" },
              { href: "/geri-sayim", label: "Geri Sayım" },
              { href: "/unix-zaman-damgasi-cevirici", label: "Unix Zaman Damgası Çevirici" },
            ]
          : [
              ...zonePairs.slice(0, 10).map((p) => ({ href: `/en/time-zone-converter/${p.slug}`, label: `${p.fromCode} to ${p.toCode}` })),
              { href: "/en/world-clock", label: "World Clock" },
              { href: "/en/countdown", label: "Countdown" },
            ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "nasil", label: tr ? "Nasıl kullanılır?" : "How to use it" },
        { id: "farklar", label: tr ? "Türkiye ile popüler saat farkları" : "Popular differences from New York" },
        ...(tr ? [] : [{ id: "kisaltmalar", label: "Time zone abbreviation converters" }]),
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="nasil">{tr ? "Nasıl kullanılır?" : "How to use it"}</h2>
      <ol>
        {tr ? (
          <>
            <li>Kaynak saat dilimini (ör. İstanbul ya da TRT), tarihi ve saati seç; &quot;Şimdi&quot; şu anki saati getirir.</li>
            <li>Hedef şehirler anında güncellenir; &quot;Saat dilimi ekle&quot; ile 8 bölgeye kadar karşılaştır.</li>
            <li>Toplantı planlayıcıda tüm satırların yeşil olduğu sütunu seç; paylaşım linkiyle katılımcılara gönder.</li>
          </>
        ) : (
          <>
            <li>Pick the source time zone (e.g. ET or a city), date and time — &quot;Now&quot; fills in the current time.</li>
            <li>Target cities update instantly; add up to 8 zones to compare.</li>
            <li>In the meeting planner pick a column that is green in every row, then share the link with participants.</li>
          </>
        )}
      </ol>

      <h2 id="farklar">{tr ? "Türkiye ile popüler saat farkları" : "Popular differences from New York"}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Şehir" : "City"}</th>
              <th>UTC</th>
              <th>{tr ? "Türkiye'ye göre" : "Compared with New York"}</th>
            </tr>
          </thead>
          <tbody>
            {popular.map(({ city, diff }) => (
              <tr key={city.en}>
                <td>
                  <Link href={cityPath(city, lang)} prefetch={false}>
                    {tr ? city.nameTr : city.nameEn}
                  </Link>
                </td>
                <td>{formatUtcOffset(offsetMinutes(city.timeZone, now))}</td>
                <td>{describeDifference(diff, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!tr && (
        <>
          <h2 id="kisaltmalar">Time zone abbreviation converters</h2>
          <ul className="tz-pair-list">
            {zonePairs.map((p) => (
              <li key={p.slug}>
                <Link href={`/en/time-zone-converter/${p.slug}`} prefetch={false}>
                  {p.fromCode} to {p.toCode}
                </Link>{" "}
                — {p.fromName} to {p.toName}
              </li>
            ))}
          </ul>
        </>
      )}
    </TimeToolPage>
  );
}

function seasonDiff(pair: ZonePair, month: number) {
  const from = findZone(pair.from)!;
  const to = findZone(pair.to)!;
  const year = new Date().getUTCFullYear();
  return differenceMinutes(from.timeZone, to.timeZone, new Date(Date.UTC(year, month, 15, 12)));
}

export function pairTitle(pair: ZonePair) {
  return `${pair.fromCode} to ${pair.toCode} Converter: ${pair.fromName} to ${pair.toName}`;
}

export function TimeZonePairPage({ pair }: { pair: ZonePair }) {
  const now = new Date();
  const from = findZone(pair.from)!;
  const to = findZone(pair.to)!;
  const diffNow = differenceMinutes(from.timeZone, to.timeZone, now);
  const winter = seasonDiff(pair, 0);
  const summer = seasonDiff(pair, 6);
  const mapping = hourMapping(from.timeZone, to.timeZone, now, "en");
  const path = `/en/time-zone-converter/${pair.slug}`;
  const reverse = zonePairs.find((p) => p.from === pair.to && p.to === pair.from);
  const fmt12 = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  };

  const seasonal =
    winter === summer
      ? `The difference stays the same all year: ${pair.toCode} is ${describeDifference(winter, "en")} ${pair.fromCode}.`
      : `The gap changes with daylight saving time: around January ${pair.toCode} is ${describeDifference(winter, "en")}, and around July ${describeDifference(summer, "en")} ${pair.fromCode}. During the few weeks when only one side has switched clocks, the gap can differ again — the converter above always uses the exact date.`;
  const fixSentence = (text: string) => text.replace(/ ahead (?=[A-Z])/g, " ahead of ");

  const faqItems: FaqItem[] = [
    {
      question: `What is the time difference between ${pair.fromCode} and ${pair.toCode}?`,
      answer: fixSentence(`Right now ${pair.toCode} is ${describeDifference(diffNow, "en")} ${pair.fromCode}. ${seasonal}`),
    },
    {
      question: `What time is 9 AM ${pair.fromCode} in ${pair.toCode}?`,
      answer: `9:00 AM ${pair.fromCode} is ${fmt12(mapping[9].to)} ${pair.toCode}${mapping[9].dayNote ? ` (${mapping[9].dayNote})` : ""}, using today's offsets.`,
    },
    {
      question: `Is ${pair.fromCode} the same as ${pair.fromName}?`,
      answer:
        pair.from === "et" || pair.from === "pt" || pair.from === "ct"
          ? `${pair.fromCode} is the winter (standard) form of US ${pair.fromName}; in summer the region uses daylight time (${pair.fromCode.replace("S", "D")}). People often say ${pair.fromCode} all year — this page converts ${pair.fromName} with the correct offset for the date.`
          : `${pair.fromCode} refers to ${pair.fromName}. This page converts it with the correct offset for the date.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/time-zone-converter", label: "Time Zone Converter" },
        { href: path, label: `${pair.fromCode} to ${pair.toCode}` },
      ]}
      crumbLabel="Breadcrumb"
      title={`${pair.fromCode} to ${pair.toCode} Converter`}
      intro={fixSentence(`Convert ${pair.fromName} (${pair.fromCode}) to ${pair.toName} (${pair.toCode}). Right now ${pair.toCode} is ${describeDifference(diffNow, "en")} ${pair.fromCode}; daylight saving is applied automatically for any date.`)}
      tool={
        <TimeZoneConverter
          options={converterOptions("en")}
          lang="en"
          copy={COPY.en}
          initialFrom={pair.from}
          initialTo={[pair.to]}
          basePath={path}
        />
      }
      related={{
        title: "You may also like",
        links: [
          ...(reverse ? [{ href: `/en/time-zone-converter/${reverse.slug}`, label: `${reverse.fromCode} to ${reverse.toCode}` }] : []),
          ...zonePairs
            .filter((p) => p.slug !== pair.slug && p.slug !== reverse?.slug && (p.from === pair.from || p.to === pair.to || p.from === pair.to))
            .slice(0, 6)
            .map((p) => ({ href: `/en/time-zone-converter/${p.slug}`, label: `${p.fromCode} to ${p.toCode}` })),
          { href: "/en/time-zone-converter", label: "Time Zone Converter" },
          { href: "/en/world-clock", label: "World Clock" },
        ],
      }}
      tocTitle="Contents"
      tocItems={[
        { id: "table", label: `${pair.fromCode} to ${pair.toCode} conversion table` },
        { id: "dst", label: "Daylight saving time" },
        { id: "faq", label: "FAQ" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="table">
        {pair.fromCode} to {pair.toCode} conversion table
      </h2>
      <p>
        Every hour of the {pair.fromName} day with today&apos;s offsets ({formatUtcOffset(offsetMinutes(from.timeZone, now))} →{" "}
        {formatUtcOffset(offsetMinutes(to.timeZone, now))}). Highlighted rows are business hours (9 AM–6 PM) in both zones.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table city-hour-table">
          <thead>
            <tr>
              <th>{pair.fromCode}</th>
              <th>{pair.toCode}</th>
            </tr>
          </thead>
          <tbody>
            {mapping.map((row) => (
              <tr key={row.from} className={row.overlap ? "is-overlap" : undefined}>
                <td>{fmt12(row.from)}</td>
                <td>
                  <strong>{fmt12(row.to)}</strong> {row.dayNote && <small>({row.dayNote})</small>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="dst">Daylight saving time</h2>
      <p>{fixSentence(seasonal)}</p>
    </TimeToolPage>
  );
}

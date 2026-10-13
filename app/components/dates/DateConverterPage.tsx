import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import {
  gregorianToHijri,
  gregorianToRumi,
  HIJRI_MONTHS_EN,
  HIJRI_MONTHS_TR,
  hijriToGregorian,
  RUMI_MONTHS,
  type YMD,
} from "../../converter/time/calendars";
import TimeToolPage from "../time/TimeToolPage";
import DateConverter, { type DateConverterCopy } from "./DateConverter";

// Hicri / Rumi / Miladi tarih cevirici sayfasi (TR) ve Hijri converter (EN).

const COPY: Record<"tr" | "en", DateConverterCopy> = {
  tr: {
    modes: { gregorian: "Miladi", hijri: "Hicri", rumi: "Rumi" },
    day: "Gün",
    month: "Ay",
    year: "Yıl",
    today: "Bugün",
    results: { gregorian: "Miladi", hijri: "Hicri", rumi: "Rumi (Osmanlı mali takvimi)", julian: "Jülyen" },
    invalid: "Bu tarih geçerli değil. Gün ve ayı kontrol et.",
    rumiOutOfRange: "Rumi takvim 13 Mart 1840 – 31 Aralık 1925 (1 Mart 1256 – 31 Kanunuevvel 1341) arasında kullanıldı.",
    hijriNote: "Tarihi belgelerde ±1 gün fark olabilir",
    julianNote: "Rumi takvimin 1917'ye kadar dayandığı takvim",
  },
  en: {
    modes: { gregorian: "Gregorian", hijri: "Hijri", rumi: "Ottoman Rumi" },
    day: "Day",
    month: "Month",
    year: "Year",
    today: "Today",
    results: { gregorian: "Gregorian", hijri: "Hijri (Islamic)", rumi: "Rumi (Ottoman fiscal calendar)", julian: "Julian" },
    invalid: "This date is not valid. Check the day and month.",
    rumiOutOfRange: "The Rumi calendar was used from 13 March 1840 to 31 December 1925.",
    hijriNote: "Historical dates may differ by ±1 day",
    julianNote: "Old Style date",
  },
};

const MILESTONES: Array<{ date: YMD; tr: string; en: string }> = [
  { date: { year: 1876, month: 12, day: 23 }, tr: "Kanun-ı Esasi'nin ilanı", en: "First Ottoman constitution" },
  { date: { year: 1908, month: 7, day: 23 }, tr: "II. Meşrutiyet", en: "Second Constitutional Era" },
  { date: { year: 1919, month: 5, day: 19 }, tr: "Atatürk'ün Samsun'a çıkışı", en: "Atatürk lands at Samsun" },
  { date: { year: 1920, month: 4, day: 23 }, tr: "TBMM'nin açılışı", en: "Grand National Assembly opens" },
  { date: { year: 1922, month: 8, day: 30 }, tr: "Başkomutanlık Meydan Muharebesi", en: "Battle of Dumlupınar" },
  { date: { year: 1923, month: 10, day: 29 }, tr: "Cumhuriyetin ilanı", en: "Proclamation of the Republic" },
];

function fmtGregorian(date: YMD, lang: "tr" | "en") {
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(date.year, date.month - 1, date.day))
  );
}

export default function DateConverterPage({ lang }: { lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const now = new Date();
  const today = { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1, day: now.getUTCDate() };
  const hijriToday = gregorianToHijri(today);
  const hijriNames = tr ? HIJRI_MONTHS_TR : HIJRI_MONTHS_EN;
  const monthStarts = hijriNames.map((name, index) => ({ name, start: hijriToGregorian({ year: hijriToday.year, month: index + 1, day: 1 }) }));
  const path = tr ? "/tarih-cevirici" : "/en/hijri-date-converter";

  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Rumi tarih miladiye nasıl çevrilir?",
          answer:
            "Kaba hesap için Rumi yıla 584 eklenir (Ocak-Şubat aylarında 585). Ancak 1917'ye kadar Rumi takvim Jülyen takvime dayandığı için gün de 12-13 gün kayar: örneğin 1 Mart 1316, 14 Mart 1900'dür. Kesin sonuç için yukarıdaki çeviriciyi kullanın.",
        },
        {
          question: "Hicri tarih miladiye nasıl çevrilir?",
          answer:
            "Hicri takvim Ay'a dayanır ve bir Hicri yıl yaklaşık 354 gündür; bu yüzden basit bir toplama ile çevrilemez. Çevirici, Umm al-Qura hesabını kullanır. Eski belgelerde ay başı hilalin görülmesine göre belirlendiği için ±1 gün fark çıkabilir.",
        },
        {
          question: "Rumi takvim ne zaman kaldırıldı?",
          answer:
            "26 Aralık 1925'te kabul edilen kanunla 1 Ocak 1926'dan itibaren Miladi takvime geçildi. Rumi takvimin son günü 31 Kanunuevvel 1341'dir.",
        },
        {
          question: "Teşrinievvel ve Kanunusani hangi aylar?",
          answer: "Teşrinievvel Ekim, Teşrinisani Kasım, Kanunuevvel Aralık, Kanunusani ise Ocak ayıdır. Bu adlar 1945'e kadar resmî yazışmalarda da kullanıldı.",
        },
        { question: "Bugün Hicri takvime göre kaçı?", answer: `Bugün ${hijriToday.day} ${HIJRI_MONTHS_TR[hijriToday.month - 1]} ${hijriToday.year} (Umm al-Qura hesabı).` },
      ]
    : [
        {
          question: "How do I convert a Hijri date to Gregorian?",
          answer:
            "The Islamic (Hijri) calendar is lunar and a Hijri year is about 354 days, so it cannot be converted by simple addition. This converter uses the Umm al-Qura calculation; for historical documents the start of a month depended on sighting the crescent, so results can differ by ±1 day.",
        },
        { question: "What is today's Hijri date?", answer: `Today is ${hijriToday.day} ${HIJRI_MONTHS_EN[hijriToday.month - 1]} ${hijriToday.year} AH (Umm al-Qura).` },
        {
          question: "What is the Ottoman Rumi calendar?",
          answer:
            "The Rumi (Ottoman fiscal) calendar was used for official records from 1840 to 1925. It was based on the Julian calendar with the year starting on 1 March, and its year numbers were about 584 lower than Gregorian years.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: path, label: tr ? "Tarih Çevirici" : "Hijri Date Converter" },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      title={tr ? "Hicri, Rumi ve Miladi Tarih Çevirici" : "Hijri Date Converter (Islamic ↔ Gregorian)"}
      intro={
        tr
          ? `Eski tapu, nüfus ve arşiv belgelerindeki Rumi ya da Hicri tarihleri gün gün Miladiye çevir; ya da tersini yap. Bugün: ${hijriToday.day} ${HIJRI_MONTHS_TR[hijriToday.month - 1]} ${hijriToday.year} (Hicri).`
          : `Convert Hijri (Islamic) dates to Gregorian and back, day by day — plus the Ottoman Rumi calendar used in records from 1840 to 1925. Today is ${hijriToday.day} ${HIJRI_MONTHS_EN[hijriToday.month - 1]} ${hijriToday.year} AH.`
      }
      tool={<DateConverter lang={lang} copy={COPY[lang]} />}
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: tr
          ? [
              { href: "/tarihi-olcu-birimleri", label: "Tarihi Ölçü Birimleri" },
              { href: "/geri-sayim/ramazan-bayrami", label: "Ramazan Bayramı'na kaç gün kaldı?" },
              { href: "/geri-sayim/kurban-bayrami", label: "Kurban Bayramı'na kaç gün kaldı?" },
              { href: "/ay-evreleri", label: "Ay Evreleri" },
              { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
              { href: "/geri-sayim", label: "Geri Sayım" },
            ]
          : [
              { href: "/en/moon-phases", label: "Moon Phases" },
              { href: "/en/historical-units", label: "Historical Units" },
              { href: "/en/countdown", label: "Countdown" },
              { href: "/en/world-clock", label: "World Clock" },
            ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        ...(tr ? [{ id: "rumi", label: "Rumi takvim nedir?" }] : []),
        { id: "hicri", label: tr ? "Hicri takvim nedir?" : "About the Hijri calendar" },
        { id: "aylar", label: tr ? `${hijriToday.year} Hicri ay başları` : `Islamic months of ${hijriToday.year} AH` },
        { id: "ornekler", label: tr ? "Önemli tarihler üç takvimde" : "Historic dates in three calendars" },
        ...(tr ? [{ id: "ay-adlari", label: "Rumi ay adları" }] : []),
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      {tr && (
        <>
          <h2 id="rumi">Rumi takvim nedir?</h2>
          <p>
            Rumi takvim (mali takvim), Osmanlı Devleti&apos;nde 1840&apos;tan 1925 sonuna kadar resmî işlerde kullanılan güneş
            takvimidir. Jülyen takvime dayanır, yıl 1 Mart&apos;ta başlar ve yıl sayısı Hicret&apos;ten başlatıldığı için Miladi yılın
            yaklaşık 584 gerisindedir. 1917&apos;de 13 gün atlanarak günler Gregoryen takvimle eşitlendi (16 Şubat 1332 günü 1 Mart
            1333 sayıldı); 1918&apos;de yılbaşı Ocak ayına alındı ve 1 Ocak 1926&apos;da Miladi takvime geçildi.
          </p>
          <p>
            Bu yüzden eski tapu, nüfus, askerlik ve mahkeme kayıtlarında yazan bir Rumi tarihi çevirirken yalnızca 584 eklemek
            yetmez: 1917 öncesinde gün de 12-13 gün kayar. Çevirici bu kuralların hepsini uygular.
          </p>
        </>
      )}

      <h2 id="hicri">{tr ? "Hicri takvim nedir?" : "About the Hijri calendar"}</h2>
      <p>
        {tr
          ? "Hicri takvim, Hz. Muhammed'in Mekke'den Medine'ye hicretini (622) başlangıç alan bir Ay takvimidir. Aylar 29 ya da 30 gün, yıl yaklaşık 354 gündür; bu yüzden Ramazan ve bayramlar her yıl Miladi takvimde yaklaşık 11 gün öne gelir. Osmanlı belgelerinde Rumi tarihin yanında çoğunlukla Hicri tarih de yazılıdır."
          : "The Hijri calendar is a lunar calendar counted from the Prophet Muhammad's migration (Hijra) from Mecca to Medina in 622 CE. Months have 29 or 30 days and a year has about 354 days, so Ramadan and the Eids move about 11 days earlier each Gregorian year."}
      </p>

      <h2 id="aylar">{tr ? `${hijriToday.year} Hicri ay başları` : `Islamic months of ${hijriToday.year} AH`}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Hicri ay" : "Month"}</th>
              <th>{tr ? "1. günü (Miladi)" : "First day (Gregorian)"}</th>
            </tr>
          </thead>
          <tbody>
            {monthStarts.map(({ name, start }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{start ? fmtGregorian(start, lang) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="ornekler">{tr ? "Önemli tarihler üç takvimde" : "Historic dates in three calendars"}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Olay" : "Event"}</th>
              <th>{tr ? "Miladi" : "Gregorian"}</th>
              <th>Rumi</th>
              <th>{tr ? "Hicri" : "Hijri"}</th>
            </tr>
          </thead>
          <tbody>
            {MILESTONES.map((m) => {
              const rumi = gregorianToRumi(m.date);
              const hijri = gregorianToHijri(m.date);
              return (
                <tr key={m.tr}>
                  <td>{tr ? m.tr : m.en}</td>
                  <td>{fmtGregorian(m.date, lang)}</td>
                  <td>{rumi ? `${rumi.day} ${RUMI_MONTHS[rumi.month - 1]} ${rumi.year}` : "—"}</td>
                  <td>{`${hijri.day} ${hijriNames[hijri.month - 1]} ${hijri.year}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {tr && (
        <>
          <h2 id="ay-adlari">Rumi ay adları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Rumi ay</th>
                  <th>Bugünkü karşılığı</th>
                </tr>
              </thead>
              <tbody>
                {RUMI_MONTHS.map((name, index) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"][index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Eski belgelerdeki uzunluk ve ağırlık birimleri için <Link href="/tarihi-olcu-birimleri">tarihi ölçü birimleri</Link>{" "}
            çeviricisine de bakabilirsin.
          </p>
        </>
      )}
    </TimeToolPage>
  );
}

import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import type { YMD } from "../../converter/time/calendars";
import { addDaysYmd, formatYmdParts, isoWeek, isoWeeksInYear, isoWeekStart } from "../../converter/time/dateMath";
import { timeToolAlternates, timeToolPaths, type TimeToolId } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import { BusinessDayCalculator, DateAddCalculator, DateDiffCalculator, WeekNumberTool } from "./DateCalculators";

type Lang = "tr" | "en";
type DateToolId = Extract<TimeToolId, "dateDiff" | "businessDays" | "dateAdd" | "weekNumber">;

const RELATED: Record<Lang, Array<{ id: DateToolId | "holidays" | "age" | "countdown" | "hijri"; href: string; label: string }>> = {
  tr: [
    { id: "dateDiff", href: "/iki-tarih-arasi-gun-hesaplama", label: "İki Tarih Arası Gün Hesaplama" },
    { id: "businessDays", href: "/is-gunu-hesaplama", label: "İş Günü Hesaplama" },
    { id: "dateAdd", href: "/tarihe-gun-ekleme", label: "Tarihe Gün Ekleme" },
    { id: "weekNumber", href: "/kacinci-hafta", label: "Bugün Kaçıncı Hafta?" },
    { id: "holidays", href: "/resmi-tatiller", label: "Resmî Tatiller" },
    { id: "age", href: "/yas-hesaplama", label: "Yaş Hesaplama" },
    { id: "countdown", href: "/geri-sayim", label: "Geri Sayım" },
    { id: "hijri", href: "/tarih-cevirici", label: "Hicri Rumi Tarih Çevirici" },
  ],
  en: [
    { id: "dateDiff", href: "/en/days-between-dates", label: "Days Between Dates" },
    { id: "businessDays", href: "/en/business-day-calculator", label: "Business Day Calculator" },
    { id: "dateAdd", href: "/en/date-calculator", label: "Date Calculator" },
    { id: "weekNumber", href: "/en/week-number", label: "What Week Is It?" },
    { id: "holidays", href: "/en/federal-holidays", label: "US Federal Holidays" },
    { id: "countdown", href: "/en/countdown", label: "Countdown" },
    { id: "hijri", href: "/en/hijri-date-converter", label: "Hijri Date Converter" },
  ],
};

function todayUtc(): YMD {
  const d = new Date();
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

const META: Record<DateToolId, Record<Lang, { title: string; description: string }>> = {
  dateDiff: {
    tr: {
      title: "İki Tarih Arası Gün Hesaplama: Kaç Gün, Hafta, Ay?",
      description: "İki tarih arasında kaç gün, hafta, ay ve yıl olduğunu hesaplayın. İş günü, hafta sonu ve resmî tatil sayısı da gösterilir; bitiş günü dahil seçeneği.",
    },
    en: {
      title: "Days Between Dates Calculator: Days, Weeks & Months",
      description: "Count the days between two dates, with the result in weeks, months and years, plus business days, weekend days and US federal holidays in the range.",
    },
  },
  businessDays: {
    tr: {
      title: "İş Günü Hesaplama: Resmî Tatiller Hariç Çalışma Günü",
      description: "İki tarih arasındaki iş gününü resmî tatiller ve arefe yarım günleri düşülerek hesaplayın ya da bir tarihe iş günü ekleyin. Cumartesi çalışılan işyerleri için seçenek.",
    },
    en: {
      title: "Business Day Calculator: Working Days Between Dates",
      description: "Count working days between two dates excluding weekends and US federal holidays, or add business days to a date to find a deadline.",
    },
  },
  dateAdd: {
    tr: {
      title: "Tarihe Gün Ekleme ve Çıkarma: 30, 60, 90 Gün Sonrası",
      description: "Bir tarihe gün, hafta, ay veya yıl ekleyin ya da çıkarın. Bugünden 30, 45, 60, 90, 180 gün sonrası hangi tarih ve hangi gün? Anında hesaplayın.",
    },
    en: {
      title: "Date Calculator: Add or Subtract Days From a Date",
      description: "Add or subtract days, weeks, months or years from any date. Find the date 30, 60, 90 or 180 days from today, with the weekday and week number.",
    },
  },
  weekNumber: {
    tr: {
      title: "Bugün Yılın Kaçıncı Haftası? Hafta Numarası Hesaplama",
      description: "Bugün yılın kaçıncı haftası ve kaçıncı günü? ISO 8601 hafta numarası, herhangi bir tarihin haftası ve tüm yılın hafta tablosu.",
    },
    en: {
      title: "What Week Is It? Current Week Number (ISO & US)",
      description: "Today's week number in ISO 8601 and US systems, the week number of any date, and a full table of this year's weeks with start and end dates.",
    },
  },
};

export function dateToolMetadata(id: DateToolId, lang: Lang, dynamicTitle?: string): Metadata {
  const { title, description } = META[id][lang];
  const path = timeToolPaths[id][lang]!;
  const finalTitle = dynamicTitle ?? title;
  return {
    title: finalTitle,
    description,
    alternates: { canonical: path, ...timeToolAlternates(id) },
    openGraph: { title: finalTitle, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: lang === "tr" ? "tr_TR" : "en_US", type: "website" },
  };
}

function shell(id: DateToolId, lang: Lang) {
  const tr = lang === "tr";
  const path = timeToolPaths[id][lang]!;
  return {
    crumbs: [
      { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
      { href: path, label: RELATED[lang].find((r) => r.id === id)!.label },
    ],
    crumbLabel: tr ? "Sayfa yolu" : "Breadcrumb",
    related: { title: tr ? "İlginizi çekebilir" : "You may also like", links: RELATED[lang].filter((r) => r.id !== id) },
    tocTitle: tr ? "İçindekiler" : "On this page",
    faqTitle: tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions",
  };
}

/* ------------------------------------------------------------------ */

export function DateDiffPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "İki tarih arasındaki gün sayısı nasıl hesaplanır?",
          answer:
            "Bitiş tarihinden başlangıç tarihi çıkarılır. Örneğin 1 Ocak ile 31 Ocak arası 30 gündür; iki gün de sayılırsa 31 gün olur. Hesaplayıcıdaki \"Bitiş gününü de say\" kutusu bu +1 günü ekler.",
        },
        {
          question: "Bitiş günü dahil mi edilmeli?",
          answer:
            "Süre (kaç gün geçti) sorusunda dahil edilmez. Bir etkinliğin ya da iznin kaç gün sürdüğünü (ilk ve son gün birlikte) sayıyorsanız dahil edin: 10-14 Temmuz izni 5 gündür.",
        },
        {
          question: "Artık yıllar hesaba katılıyor mu?",
          answer: "Evet. Şubat'ın 29 çektiği yıllar (2024, 2028 gibi) otomatik olarak hesaba katılır; 1900 gibi 400'e bölünmeyen yüzyıl yılları artık yıl değildir.",
        },
        {
          question: "Ay sayısı neden bazen farklı çıkar?",
          answer:
            "Aylar 28-31 gün arasında değiştiği için \"ay\" sabit bir gün sayısı değildir. Hesaplayıcı takvim ayını sayar: 31 Ocak'tan 28 Şubat'a 1 ay kabul edilir; kalan günler ayrıca gösterilir.",
        },
      ]
    : [
        {
          question: "How do you calculate the number of days between two dates?",
          answer:
            "Subtract the start date from the end date. January 1 to January 31 is 30 days; if you count both the first and last day it is 31. Tick \"Include the end date\" to add that extra day.",
        },
        {
          question: "Should I include the end date?",
          answer:
            "Not when you want elapsed time. Include it when counting how many calendar days an event or vacation covers, where both the first and last day count: July 10–14 is 5 days.",
        },
        {
          question: "Does the calculator handle leap years?",
          answer: "Yes. February 29 is counted in leap years such as 2024 and 2028; century years not divisible by 400 (like 1900) are not leap years.",
        },
        {
          question: "How many business days are in the range?",
          answer:
            "The result shows business days with weekends and US federal holidays removed, counting both dates. For deadlines and more options use the business day calculator.",
        },
      ];
  const s = shell("dateDiff", lang);
  return (
    <TimeToolPage
      {...s}
      title={tr ? "İki Tarih Arası Gün Hesaplama" : "Days Between Dates"}
      intro={
        tr
          ? "İki tarih seçin: aradaki gün, hafta, ay ve yıl anında hesaplansın. İş günü, hafta sonu ve resmî tatil sayısı da gösterilir."
          : "Pick two dates to see the days between them, in weeks, months and years, with business days and holidays counted too."
      }
      tool={<DateDiffCalculator lang={lang} />}
      tocItems={[
        { id: "nasil", label: tr ? "Nasıl hesaplanır?" : "How it works" },
        { id: "ornekler", label: tr ? "Örnek hesaplar" : "Examples" },
        { id: "faq", label: s.faqTitle },
      ]}
      faqItems={faqItems}
    >
      <h2 id="nasil">{tr ? "İki tarih arası gün nasıl hesaplanır?" : "How the days between dates are counted"}</h2>
      {tr ? (
        <p>
          Hesaplayıcı her iki tarihi takvim günü olarak alır ve farkı gün cinsinden bulur; saat dilimi ya da yaz saati farkından etkilenmez.
          Sonuç aynı zamanda yıl-ay-gün, hafta ve saat olarak gösterilir. İş günü sayısında hafta sonları ve Türkiye&apos;deki resmî tatiller
          düşülür; arefe günleri yarım gün olduğu için iş günü sayılır. Resmî tatillerin tam listesi için{" "}
          <Link href="/resmi-tatiller">resmî tatiller sayfasına</Link> bakın.
        </p>
      ) : (
        <p>
          Both dates are treated as calendar days, so time zones and daylight saving time do not affect the result. The difference is also
          broken down into years, months and days, weeks and hours. Business days exclude Saturdays, Sundays and{" "}
          <Link href="/en/federal-holidays">US federal holidays</Link> (on their observed dates).
        </p>
      )}
      <h2 id="ornekler">{tr ? "Örnek hesaplar" : "Examples"}</h2>
      <ul>
        {tr ? (
          <>
            <li>1 Ocak – 31 Aralık (aynı yıl): 364 gün; iki gün de sayılırsa 365 gün (artık yılda 366).</li>
            <li>Bir bebeğin doğumundan 100. gününe: doğum tarihine 99 gün ekleyin (doğum günü 1. gün sayılır) — <Link href="/tarihe-gun-ekleme">tarihe gün ekleme</Link>.</li>
            <li>Yaşınızı gün olarak bulmak için doğum tarihinizi ve bugünü seçin ya da <Link href="/yas-hesaplama">yaş hesaplamayı</Link> kullanın.</li>
          </>
        ) : (
          <>
            <li>January 1 to December 31 of the same year: 364 days, or 365 counting both dates (366 in a leap year).</li>
            <li>90 days from today: use the <Link href="/en/date-calculator">date calculator</Link> to add days instead.</li>
            <li>Days until a holiday: the <Link href="/en/countdown">countdown</Link> shows a live timer to the minute.</li>
          </>
        )}
      </ul>
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */

export function BusinessDayPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "İş günü nedir, cumartesi iş günü mü?",
          answer:
            "Kamu kurumlarında iş günleri pazartesi-cuma arasıdır; cumartesi, pazar ve resmî tatiller iş günü değildir. İş Kanunu'nda haftalık çalışma 6 güne yayılabildiği için bazı özel işyerlerinde cumartesi iş günüdür; bu durumda \"Cumartesi iş günü\" kutusunu işaretleyin.",
        },
        {
          question: "Arefe günü iş günü sayılır mı?",
          answer:
            "Ramazan ve Kurban Bayramı arefeleri ile 28 Ekim, 13:00'ten itibaren yarım gün tatildir; sabahı çalışıldığı için hesaplayıcı bu günleri iş günü sayar ve sonuçta ayrıca belirtir.",
        },
        {
          question: "Bir tarihe 10 iş günü nasıl eklenir?",
          answer:
            "\"Tarihe iş günü ekle\" sekmesinde başlangıç tarihini ve 10 değerini girin. Başlangıç günü sayılmaz; ertesi günden itibaren hafta sonları ve resmî tatiller atlanarak 10. iş günü bulunur.",
        },
        {
          question: "Yasal süreler iş günüyle mi hesaplanır?",
          answer:
            "Çoğu yasal süre (ör. itiraz ve dava süreleri) takvim günüyle hesaplanır; süre resmî tatile denk gelirse izleyen ilk iş gününe uzar. \"İş günü\" olarak belirtilen süreler için bu hesaplayıcıyı kullanabilirsiniz; kesin sonuç için ilgili mevzuatı kontrol edin.",
        },
      ]
    : [
        {
          question: "What counts as a business day?",
          answer:
            "In the US a business day is Monday through Friday, excluding federal holidays. Tick \"Saturday is a working day\" if your workplace runs six days a week.",
        },
        {
          question: "How do I add 10 business days to a date?",
          answer:
            "Open \"Add business days\", pick the start date and enter 10. The start date is not counted; weekends and federal holidays are skipped until the 10th working day.",
        },
        {
          question: "Are federal holidays business days?",
          answer:
            "No. Federal offices, the Federal Reserve and most banks are closed. When a holiday falls on a weekend the observed weekday is treated as the holiday.",
        },
        {
          question: "How many business days are in a year?",
          answer:
            "A year has 260 or 261 weekdays (262 in some leap years). Removing the 11 federal holidays that fall on weekdays leaves about 250 business days.",
        },
      ];
  const s = shell("businessDays", lang);
  return (
    <TimeToolPage
      {...s}
      title={tr ? "İş Günü Hesaplama" : "Business Day Calculator"}
      intro={
        tr
          ? "İki tarih arasındaki iş gününü resmî tatiller düşülerek hesaplayın ya da bir tarihe iş günü ekleyerek teslim tarihini bulun."
          : "Count working days between two dates, or add business days to a date to find a deadline. Weekends and US federal holidays are skipped."
      }
      tool={<BusinessDayCalculator lang={lang} />}
      tocItems={[
        { id: "kurallar", label: tr ? "Hangi günler düşülür?" : "Which days are excluded" },
        { id: "yillik", label: tr ? "Yılda kaç iş günü var?" : "Business days per year" },
        { id: "faq", label: s.faqTitle },
      ]}
      faqItems={faqItems}
    >
      <h2 id="kurallar">{tr ? "Hangi günler düşülür?" : "Which days are excluded"}</h2>
      {tr ? (
        <p>
          Cumartesi ve pazar ile 2429 sayılı Kanun&apos;daki resmî tatiller (yılbaşı, 23 Nisan, 1 Mayıs, 19 Mayıs, 15 Temmuz, 30 Ağustos, 29 Ekim,
          Ramazan ve Kurban Bayramı günleri) düşülür. Bayram tarihleri Diyanet takvimine göredir. Tarih aralığındaki tatiller sonuçta listelenir;
          yıllık listeyi <Link href="/resmi-tatiller">resmî tatiller</Link> sayfasında görebilirsiniz. Hükümetin ayrıca ilan ettiği idari izin
          (köprü) günleri otomatik olarak düşülmez.
        </p>
      ) : (
        <p>
          Saturdays, Sundays and the 11 <Link href="/en/federal-holidays">federal holidays</Link> are excluded, using the observed date when a
          holiday falls on a weekend. State holidays (such as Patriots&apos; Day or Cesar Chavez Day) and company-specific days off are not
          included; subtract them manually if they apply to you.
        </p>
      )}
      <h2 id="yillik">{tr ? "Yılda kaç iş günü var?" : "Business days per year"}</h2>
      {tr ? (
        <p>
          Bir yılda 260-262 hafta içi gün vardır. Hafta içine denk gelen resmî tatiller çıkarıldığında Türkiye&apos;de yılda yaklaşık 250 iş günü
          kalır; bu sayı bayramların haftanın hangi gününe denk geldiğine göre her yıl değişir. Bir yılın tam sayısı için başlangıcı 1 Ocak, bitişi 31
          Aralık seçin.
        </p>
      ) : (
        <p>
          There are 260 to 262 weekdays in a year; after removing federal holidays, about 250 business days remain. Set the range from January 1 to
          December 31 to get the exact figure for any year.
        </p>
      )}
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */

export function DateAddPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const today = todayUtc();
  const offsets = [30, 45, 60, 90, 120, 180];
  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Bugünden 90 gün sonra hangi tarih?",
          answer: `Bu sayfa güncellendiğinde bugünden 90 gün sonrası ${formatYmdParts(addDaysYmd(today, 90), "tr", { day: "numeric", month: "long", year: "numeric", weekday: "long" })} idi. Güncel sonuç için hesaplayıcıda +90 gün düğmesine basın.`,
        },
        {
          question: "Bir tarihe ay eklerken gün nasıl hesaplanır?",
          answer:
            "Aynı gün numarası korunur: 15 Mart + 2 ay = 15 Mayıs. Hedef ayda o gün yoksa ayın son günü alınır: 31 Ocak + 1 ay = 28 Şubat (artık yılda 29 Şubat).",
        },
        {
          question: "30 gün ile 1 ay aynı mı?",
          answer: "Hayır. 1 ay, takvim ayıdır ve 28-31 gün arasında değişir. Sözleşmelerde \"30 gün\" yazıyorsa gün, \"1 ay\" yazıyorsa ay eklenmelidir.",
        },
        {
          question: "Geriye doğru tarih hesaplanabilir mi?",
          answer: "Evet. \"Çıkar\" seçeneğiyle bir tarihten gün, hafta, ay ya da yıl çıkarabilirsiniz; örneğin bir son tarihten 45 gün öncesini bulabilirsiniz.",
        },
      ]
    : [
        {
          question: "What date is 90 days from today?",
          answer: `When this page was last updated, 90 days from today was ${formatYmdParts(addDaysYmd(today, 90), "en", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}. Press +90 days in the calculator for a live answer.`,
        },
        {
          question: "How are months added to a date?",
          answer:
            "The day number is kept: March 15 + 2 months = May 15. If that day does not exist in the target month, the last day is used: January 31 + 1 month = February 28 (29 in leap years).",
        },
        {
          question: "Is 30 days the same as one month?",
          answer: "No. A month is 28 to 31 days long. If a contract says \"30 days\", add days; if it says \"one month\", add a calendar month.",
        },
        {
          question: "Can I subtract days from a date?",
          answer: "Yes. Choose Subtract to go back in time, for example to find the date 45 days before a deadline.",
        },
      ];
  const s = shell("dateAdd", lang);
  return (
    <TimeToolPage
      {...s}
      title={tr ? "Tarihe Gün Ekleme ve Çıkarma" : "Date Calculator: Add or Subtract Days"}
      intro={
        tr
          ? "Bir tarihe gün, hafta, ay ya da yıl ekleyin veya çıkarın; sonuç tarihi, haftanın günü ve hafta numarasıyla birlikte görün."
          : "Add or subtract days, weeks, months or years from any date and see the resulting date, weekday and week number."
      }
      tool={<DateAddCalculator lang={lang} />}
      tocItems={[
        { id: "tablo", label: tr ? "Bugünden itibaren sık aranan tarihler" : "Common dates from today" },
        { id: "kurallar", label: tr ? "Ay ve yıl ekleme kuralları" : "Adding months and years" },
        { id: "faq", label: s.faqTitle },
      ]}
      faqItems={faqItems}
    >
      <h2 id="tablo">{tr ? "Bugünden itibaren sık aranan tarihler" : "Common dates from today"}</h2>
      <p>
        <small>
          {tr
            ? `Tablo ${formatYmdParts(today, "tr", { day: "numeric", month: "long", year: "numeric" })} tarihine göredir ve her gün yenilenir.`
            : `Based on ${formatYmdParts(today, "en", { month: "long", day: "numeric", year: "numeric" })}; the table refreshes daily.`}
        </small>
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">{tr ? "Süre" : "Offset"}</th>
              <th scope="col">{tr ? "Sonraki tarih" : "Date after"}</th>
              <th scope="col">{tr ? "Önceki tarih" : "Date before"}</th>
            </tr>
          </thead>
          <tbody>
            {offsets.map((n) => (
              <tr key={n}>
                <td>
                  <Link href={`${timeToolPaths.dateAdd[lang]}?days=${n}`} prefetch={false}>
                    {tr ? `${n} gün` : `${n} days`}
                  </Link>
                </td>
                <td>{formatYmdParts(addDaysYmd(today, n), lang, { day: "numeric", month: "long", year: "numeric", weekday: "short" })}</td>
                <td>{formatYmdParts(addDaysYmd(today, -n), lang, { day: "numeric", month: "long", year: "numeric", weekday: "short" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 id="kurallar">{tr ? "Ay ve yıl ekleme kuralları" : "Adding months and years"}</h2>
      {tr ? (
        <p>
          Önce yıl ve ay eklenir, sonra hafta ve gün. Ay eklerken gün numarası korunur, hedef ayda yoksa ayın son gününe sabitlenir. 29 Şubat&apos;a 1
          yıl eklemek 28 Şubat verir. İş günü (hafta sonu ve tatiller hariç) eklemek için <Link href="/is-gunu-hesaplama">iş günü hesaplayıcıyı</Link>,
          iki tarih arasını ölçmek için <Link href="/iki-tarih-arasi-gun-hesaplama">gün farkı hesaplayıcıyı</Link> kullanın.
        </p>
      ) : (
        <p>
          Years and months are added first, then weeks and days. The day of the month is kept where possible and clamped to the month&apos;s last day
          otherwise, so February 29 + 1 year gives February 28. To skip weekends and holidays use the{" "}
          <Link href="/en/business-day-calculator">business day calculator</Link>.
        </p>
      )}
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */

export function weekNumberTitle(lang: Lang) {
  const w = isoWeek(todayUtc());
  return lang === "tr" ? `Bugün Yılın Kaçıncı Haftası? (${w.year}: ${w.week}. hafta)` : `What Week Is It? Week ${w.week} of ${w.year}`;
}

export function WeekNumberPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const today = todayUtc();
  const current = isoWeek(today);
  const year = current.year;
  const weeks = isoWeeksInYear(year);
  const fmt = (d: YMD) => formatYmdParts(d, lang, { day: "numeric", month: "short" });
  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Bugün yılın kaçıncı haftası?",
          answer: `Bu sayfa güncellendiğinde ${formatYmdParts(today, "tr", { day: "numeric", month: "long", year: "numeric" })}, ISO 8601'e göre ${year} yılının ${current.week}. haftasıydı. Sayfanın üstündeki kutu her zaman güncel haftayı gösterir.`,
        },
        {
          question: "Hafta numarası nasıl hesaplanır?",
          answer:
            "Türkiye ve Avrupa'da kullanılan ISO 8601'e göre haftalar pazartesi başlar ve yılın ilk perşembesini içeren hafta 1. haftadır. Bu yüzden 1 Ocak bazen önceki yılın 52. ya da 53. haftasına düşer.",
        },
        {
          question: "Bir yılda kaç hafta vardır?",
          answer: `Bir yıl 52 ya da 53 ISO haftasından oluşur. ${year} yılı ${weeks} haftadır. Perşembe ile başlayan yıllar ve çarşamba ile başlayan artık yıllar 53 haftalıktır.`,
        },
        {
          question: "Gebelik haftası ile takvim haftası aynı mı?",
          answer: "Hayır. Gebelik haftası son adet tarihinden itibaren sayılır. Bunun için gebelik haftası hesaplayıcısını kullanın.",
        },
      ]
    : [
        {
          question: "What week number is it today?",
          answer: `When this page was last updated (${formatYmdParts(today, "en", { month: "long", day: "numeric", year: "numeric" })}), it was ISO week ${current.week} of ${year}. The box at the top always shows the live week.`,
        },
        {
          question: "What is the difference between ISO and US week numbers?",
          answer:
            "ISO 8601 weeks start on Monday and week 1 is the week with the year's first Thursday. The US system starts weeks on Sunday and week 1 is the week containing January 1, so the two can differ by one.",
        },
        {
          question: "How many weeks are in a year?",
          answer: `A year has 52 or 53 ISO weeks; ${year} has ${weeks}. Years starting on a Thursday, and leap years starting on a Wednesday, have 53.`,
        },
        {
          question: "Which week system does Excel use?",
          answer: "ISOWEEKNUM() returns the ISO week. WEEKNUM() uses the US system by default (Sunday start, week 1 contains January 1).",
        },
      ];
  const s = shell("weekNumber", lang);
  return (
    <TimeToolPage
      {...s}
      title={tr ? "Bugün Yılın Kaçıncı Haftası?" : "What Week Is It?"}
      intro={
        tr
          ? "Bugünün hafta numarası, yılın kaçıncı günü ve yıl sonuna kalan gün. Herhangi bir tarihin haftasını bulun ya da tüm yılın hafta tablosuna bakın."
          : "Today's week number, the day of the year and days left in the year. Look up the week of any date or browse this year's full week table."
      }
      tool={<WeekNumberTool lang={lang} />}
      tocItems={[
        { id: "tablo", label: tr ? `${year} hafta tablosu` : `${year} week table` },
        { id: "iso", label: tr ? "ISO 8601 hafta kuralı" : "ISO 8601 week rules" },
        { id: "faq", label: s.faqTitle },
      ]}
      faqItems={faqItems}
    >
      <h2 id="tablo">{tr ? `${year} yılı hafta numaraları` : `${year} week numbers`}</h2>
      <div className="week-table">
        {Array.from({ length: weeks }, (_, i) => {
          const start = isoWeekStart(year, i + 1);
          return (
            <div key={i} className={i + 1 === current.week ? "is-current" : undefined}>
              <b>{i + 1}</b>
              <span>
                {fmt(start)} – {fmt(addDaysYmd(start, 6))}
              </span>
            </div>
          );
        })}
      </div>
      <h2 id="iso">{tr ? "ISO 8601 hafta kuralı" : "ISO 8601 week rules"}</h2>
      {tr ? (
        <p>
          Türkiye&apos;de takvimler, planlama yazılımları ve Excel&apos;in ISOHAFTASAY işlevi ISO 8601&apos;i kullanır: hafta pazartesi başlar, pazar
          biter; 4 Ocak her zaman 1. haftadadır. Bir tarihe hafta eklemek için <Link href="/tarihe-gun-ekleme">tarihe gün ekleme</Link> aracını,
          gebelik takibi için <Link href="/gebelik-haftasi-hesaplama">gebelik haftası hesaplamayı</Link> kullanabilirsiniz.
        </p>
      ) : (
        <p>
          ISO 8601 weeks run Monday to Sunday and January 4 is always in week 1; this is the system used across Europe and in most planning tools.
          US calendars often number weeks from the Sunday week containing January 1 instead. Week {current.week} of {year} started on{" "}
          {formatYmdParts(isoWeekStart(year, current.week), "en", { weekday: "long", month: "long", day: "numeric" })}.
        </p>
      )}
    </TimeToolPage>
  );
}

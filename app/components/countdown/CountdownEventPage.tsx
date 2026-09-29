import Link from "@/app/components/SiteLink";
import {
  countdownEvents,
  countdownPath,
  daysUntil,
  hasStarted,
  upcomingOccurrences,
  type CountdownEvent,
  type DateParts,
} from "../../converter/time/countdownEvents";
import type { FaqItem } from "../../converter/faqSchema";
import TimeToolPage from "../time/TimeToolPage";
import CountdownDisplay from "./CountdownDisplay";
import { countdownCopy } from "./countdownCopy";

// Etkinlik geri sayim sayfasi (TR + EN). Tarihler her yenilemede yeniden hesaplanir;
// bu yil gecince otomatik olarak bir sonraki yila gecer.

export function formatEventDate(parts: DateParts, lang: "tr" | "en" | "de", withWeekday = true) {
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withWeekday ? { weekday: "long" as const } : {}),
    timeZone: "UTC",
  }).format(new Date(Date.UTC(parts.year, parts.month - 1, parts.day)));
}

function weeksAndDays(days: number, lang: "tr" | "en") {
  const weeks = Math.floor(days / 7);
  const rest = days % 7;
  if (lang === "tr") return weeks ? `${weeks} hafta${rest ? ` ${rest} gün` : ""}` : `${rest} gün`;
  return weeks ? `${weeks} week${weeks === 1 ? "" : "s"}${rest ? ` ${rest} day${rest === 1 ? "" : "s"}` : ""}` : `${rest} day${rest === 1 ? "" : "s"}`;
}

export function eventSummary(event: CountdownEvent, now: Date) {
  const next = upcomingOccurrences(event, now, 1)[0] ?? null;
  return { next, days: next ? daysUntil(next, event.zone, now) : null, started: next ? hasStarted(next, event.zone, now) : false };
}

export default function CountdownEventPage({ event }: { event: CountdownEvent }) {
  const tr = event.lang === "tr";
  // Diese Seite deckt TR und EN ab; deutsche Anlässe nutzen GermanCountdownEventPage.
  const lang: "tr" | "en" = event.lang === "tr" ? "tr" : "en";
  const now = new Date();
  const occurrences = upcomingOccurrences(event, now, 6);
  const next = occurrences[0];
  const days = next ? daysUntil(next, event.zone, now) : null;
  const path = countdownPath(event);
  const hubPath = tr ? "/geri-sayim" : "/en/countdown";
  const dateText = next ? formatEventDate(next, lang) : "";
  const estimated = Boolean(next?.estimated);

  const others = countdownEvents
    .filter((e) => e.lang === lang && e.id !== event.id)
    .map((e) => ({ event: e, ...eventSummary(e, now) }))
    .filter((e) => e.days !== null)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0));

  const started = next ? hasStarted(next, event.zone, now) : false;
  const daysSentence =
    days === null
      ? ""
      : days === 0 && !started
        ? tr
          ? `${event.name} için 1 günden az kaldı.`
          : `Less than a day to go until ${event.name}.`
        : days === 0
        ? tr
          ? `${event.name} bugün!`
          : `${event.name} is today!`
        : tr
          ? `${event.name} için ${days} gün (${weeksAndDays(days, "tr")}) kaldı.`
          : `There are ${days} days (${weeksAndDays(days, "en")}) until ${event.name}.`;

  const faqItems: FaqItem[] = tr
    ? [
        { question: `${event.name} ne zaman?`, answer: next ? `Bir sonraki ${event.name} ${dateText} günü${estimated ? " (tahmini)" : ""}.` : "Tarih henüz belli değil." },
        { question: event.question, answer: `${daysSentence} Sayfadaki sayaç Türkiye saatiyle (UTC+3) günün başlangıcına, yani 00:00'a göre saniyesi saniyesine sayar.` },
        { question: `${event.name} resmî tatil mi?`, answer: event.holiday },
        ...(event.rule.kind === "hijri"
          ? [
              {
                question: "Bu tarihler kesin mi?",
                answer:
                  "Diyanet İşleri Başkanlığı'nın ilan ettiği yıllar resmî takvimden alınmıştır. Henüz ilan edilmemiş yıllar Umm al-Qura Hicri takvimiyle hesaplanır ve \"tahmini\" olarak işaretlenir; bu hesap 2025-2028 için Diyanet tarihleriyle birebir örtüşmektedir.",
              },
            ]
          : []),
      ]
    : [
        { question: `When is ${event.name}?`, answer: next ? `The next ${event.name} is on ${dateText}.` : "The date has not been set yet." },
        { question: event.question, answer: `${daysSentence} The live countdown counts to midnight at the start of the day in your own time zone.` },
        { question: `Is ${event.name} a public holiday?`, answer: event.holiday },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: hubPath, label: tr ? "Geri Sayım" : "Countdown" },
        { href: path, label: event.name },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      title={event.question}
      intro={next ? `${tr ? `${event.name}: ${dateText}` : `${event.name}: ${dateText}`}${estimated ? (tr ? " (tahmini)" : " (estimated)") : ""}. ${daysSentence}` : ""}
      tool={
        <CountdownDisplay
          targets={occurrences.map(({ year, month, day }) => ({ year, month, day }))}
          zone={event.zone}
          lang={lang}
          title={event.name}
          copy={countdownCopy[lang]}
        />
      }
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: [
          ...others.slice(0, 8).map((o) => ({ href: countdownPath(o.event), label: tr ? `${o.event.name} (${o.days} gün)` : `${o.event.name} (${o.days} days)` })),
          ...(tr
            ? [
                { href: hubPath, label: "Tüm geri sayımlar" },
                { href: "/resmi-tatiller", label: "Resmî Tatiller ve Köprü Günleri" },
                { href: "/dunya-saatleri", label: "Dünya Saatleri" },
                { href: "/zamanlayici", label: "Zamanlayıcı" },
                { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
              ]
            : [
                { href: hubPath, label: "All countdowns" },
                { href: "/en/federal-holidays", label: "US Federal Holidays" },
                { href: "/en/world-clock", label: "World Clock" },
                { href: "/en/timer", label: "Timer" },
              ]),
        ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "ozet", label: tr ? "Tarih ve kalan süre" : "Date and time left" },
        { id: "yillar", label: tr ? `Yıllara göre ${event.name} tarihleri` : `${event.name} dates by year` },
        { id: "hakkinda", label: tr ? `${event.name} hakkında` : `About ${event.name}` },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="ozet">{tr ? "Tarih ve kalan süre" : "Date and time left"}</h2>
      {next && (
        <div className="conversion-table-wrap">
          <table className="conversion-table city-facts-table">
            <tbody>
              <tr>
                <th scope="row">{tr ? "Tarih" : "Date"}</th>
                <td>
                  {dateText}
                  {estimated && (tr ? " (tahmini)" : " (estimated)")}
                </td>
              </tr>
              <tr>
                <th scope="row">{tr ? "Kalan" : "Time left"}</th>
                <td>{days === 0 ? (started ? (tr ? "Bugün" : "Today") : tr ? "1 günden az" : "Less than a day") : `${days} ${tr ? "gün" : "days"} · ${weeksAndDays(days ?? 0, lang)}`}</td>
              </tr>
              <tr>
                <th scope="row">{tr ? "Resmî tatil mi?" : "Public holiday?"}</th>
                <td>{event.holiday}</td>
              </tr>
              {event.source && (
                <tr>
                  <th scope="row">{tr ? "Kaynak" : "Source"}</th>
                  <td>{event.source}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <h2 id="yillar">{tr ? `Yıllara göre ${event.name} tarihleri` : `${event.name} dates by year`}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Yıl" : "Year"}</th>
              <th>{tr ? "Tarih" : "Date"}</th>
              {event.rule.kind === "hijri" && <th>{tr ? "Durum" : "Status"}</th>}
            </tr>
          </thead>
          <tbody>
            {occurrences.map((parts) => (
              <tr key={parts.year}>
                <td>{parts.year}</td>
                <td>{formatEventDate(parts, lang)}</td>
                {event.rule.kind === "hijri" && <td>{parts.estimated ? (tr ? "Tahmini (Hicri takvim)" : "Estimated") : tr ? "Diyanet takvimi" : "Official"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="hakkinda">{tr ? `${event.name} hakkında` : `About ${event.name}`}</h2>
      <p>{event.about}</p>
      <p>
        {tr ? "Diğer önemli günlere ne kadar kaldığını " : "See how long is left until other dates on the "}
        <Link href={hubPath}>{tr ? "geri sayım sayfasında" : "countdown page"}</Link>
        {tr ? " görebilir, kendi geri sayımını da oluşturabilirsin." : ", or create your own countdown."}
      </p>
    </TimeToolPage>
  );
}

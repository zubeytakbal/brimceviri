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
import { ETKINLIKLER, ozelGunPath } from "../../converter/calendar/trTakvim";
import type { FaqItem } from "../../converter/faqSchema";
import TimeToolPage from "../time/TimeToolPage";
import CountdownDisplay from "./CountdownDisplay";
import GeriSayimTakvim from "./GeriSayimTakvim";
import YilbasiSayaci from "./YilbasiSayaci";
import { yeniYilSirasi, yilbasiTatili } from "../../converter/time/yeniYil";
import { occurrencesInYear, startMs } from "../../converter/time/countdownEvents";
import SaatKabugu from "../saat/SaatKabugu";
import GeriSayimHero from "./GeriSayimHero";
import GeriSayimSahneleri from "./GeriSayimSahneleri";
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

  const selfDays = eventSummary(event, now).days;
  const others = countdownEvents
    .filter((e) => e.lang === lang && e.id !== event.id)
    .map((e) => ({ event: e, ...eventSummary(e, now) }))
    .filter((e) => e.days !== null)
    // Bu güne tarihçe en yakın olanlar: liste her sayfada farklı olur.
    .sort((a, b) => Math.abs((a.days ?? 0) - (selfDays ?? 0)) - Math.abs((b.days ?? 0) - (selfDays ?? 0)));

  const started = next ? hasStarted(next, event.zone, now) : false;
  // Yılbaşına özel: gece temalı sayaç, dünyada yeni yıla giriş sırası ve tatil bilgisi.
  const yilbasi = event.id === "yilbasi" && next ? next : null;
  const sira = yilbasi ? yeniYilSirasi(yilbasi.year) : [];
  const tatil = yilbasi ? yilbasiTatili(yilbasi.year) : null;
  const GUN_ADI = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const trSaat = (ms: number) => new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }).format(ms);
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
        { question: event.question, answer: `${daysSentence} Sayaç Türkiye saatiyle 00:00'a göre sayar.` },
        { question: `${event.name} resmî tatil mi?`, answer: event.holiday },
        ...((event.rule.kind === "hijri" || event.rule.kind === "regaib")
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

  if (yilbasi && tatil) {
    faqItems.push(
      { question: "Yılbaşı gecesi ne zaman?", answer: `Yılbaşı gecesi 31 Aralık'ı 1 Ocak'a bağlayan gecedir. ${yilbasi.year} yılına Türkiye saatiyle 31 Aralık ${yilbasi.year - 1} gece 00:00'da girilir.` },
      { question: "31 Aralık resmî tatil mi?", answer: "Hayır. 31 Aralık Türkiye'de resmî tatil değildir, yarım gün de değildir; resmî tatil olan gün 1 Ocak'tır." },
      {
        question: `${yilbasi.year} yılbaşı tatili kaç gün?`,
        answer: `1 Ocak ${yilbasi.year} ${GUN_ADI[tatil.gun]} gününe denk geliyor; ${tatil.sure === 1 ? "tatil yalnızca 1 Ocak'tır" : tatil.gun === 6 || tatil.gun === 0 ? "hafta sonuna denk geldiği için ek tatil günü oluşmaz" : `hafta sonuyla birlikte ${tatil.sure} günlük tatil olur`}.${tatil.kopru ? ` ${tatil.kopru} tatil yapılabilir.` : ""}`,
      },
      { question: "Dünyada yeni yıla ilk kim girer?", answer: `Yeni yıla ilk giren yer, UTC+14 saat dilimindeki Kiribati'nin Line Adaları'dır (Kiritimati): Türkiye saatiyle ${trSaat(sira[0].an)}. En son Amerikan Samoası gibi UTC−11 bölgeleri girer: Türkiye saatiyle ${trSaat(sira[sira.length - 1].an)}.` },
    );
  }

  const yilbasiBolumu =
    yilbasi && tatil ? (
      <>
        <h2 id="dunya">Dünyada yeni yıla kim, ne zaman giriyor?</h2>
        <p>
          Dünyada yaklaşık 38 farklı yerel saat kullanıldığı için yeni yıl yaklaşık 26 saat boyunca yerden yere gelir. İlk Kiribati&apos;nin Line Adaları,
          en son Amerikan Samoası yeni yıla girer. Aşağıdaki saatler Türkiye saatine göredir (her şehrin kendi yerel saatiyle 1 Ocak{" "}
          {yilbasi.year} 00:00).
        </p>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>Sıra</th>
                <th>Yer</th>
                <th>Türkiye saatiyle</th>
              </tr>
            </thead>
            <tbody>
              {sira
                .filter((x, i, a) => i === 0 || x.an !== a[i - 1].an || x.ulke === "Türkiye")
                .map((x, i) => (
                  <tr key={x.ad} className={x.ulke === "Türkiye" ? "is-vurgu" : undefined}>
                    <td>{i + 1}</td>
                    <td>
                      {x.ad} <small>({x.ulke})</small>
                    </td>
                    <td>{trSaat(x.an)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p>Aynı anda yeni yıla giren şehirlerden yalnızca biri listelenmiştir. Hesap, her şehrin saat dilimine ve o tarihte geçerli yaz saati uygulamasına göre yapılır.</p>

        <h2 id="tatil">{yilbasi.year} yılbaşı tatili</h2>
        <p>
          1 Ocak {yilbasi.year} <strong>{GUN_ADI[tatil.gun]}</strong> gününe denk geliyor.{" "}
          {tatil.sure === 1
            ? "Yılbaşı tatili yalnızca 1 Ocak'tır."
            : tatil.gun === 6 || tatil.gun === 0
              ? "Hafta sonuna denk geldiği için ek bir tatil günü oluşmaz."
              : `Hafta sonuyla birlikte ${tatil.sure} günlük tatil olur.`}
          {tatil.kopru ? ` ${tatil.kopru} tatil yapılabilir.` : ""} 31 Aralık resmî tatil değildir. Türkiye&apos;de miladi takvim ve 1 Ocak yılbaşı, 26
          Aralık 1925 tarihli kanunlarla 1 Ocak 1926&apos;dan itibaren kullanılmaktadır. Diğer tatiller ve köprü günleri için{" "}
          <Link href="/resmi-tatiller">resmî tatiller</Link> sayfasına bakabilirsiniz.
        </p>
      </>
    ) : null;

  const ilgili = {
    title: tr ? "İlginizi çekebilir" : "You may also like",
    links: [
      ...(tr
        ? ETKINLIKLER.filter((e) => e.geriSayim === event.slug).map((e) => ({ href: ozelGunPath(e.id), label: `${e.ad} tarihleri ve takvim` }))
        : []),
      ...others.slice(0, 4).map((o) => ({ href: countdownPath(o.event), label: tr ? `${o.event.name} (${o.days} gün)` : `${o.event.name} (${o.days} days)` })),
      ...(tr
        ? [
            { href: hubPath, label: "Tüm geri sayımlar" },
            { href: "/takvim", label: "Türkiye Takvimi" },
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
  };

  if (tr) {
    // Saat bölümü görünümü: dev sayaç başlığı, gazete (tarih ve yıllar) ve sade içerik.
    const onceki = next
      ? ([...occurrencesInYear(event, next.year - 1), ...occurrencesInYear(event, next.year)].filter((o) => startMs(o, "istanbul") < startMs(next, "istanbul")).pop() ?? null)
      : null;
    return (
      <SaatKabugu
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: hubPath, label: "Geri Sayım" },
          { href: path, label: event.name },
        ]}
        faqItems={faqItems}
        hero={
          yilbasi ? (
            <section className="saat-hero gs-hero is-yilbasi">
              <div className="saat-hero-ic">
                <h1 className="saat-baslik">{event.question}</h1>
                <p className="saat-ulke">
                  {dateText} · {daysSentence}
                </p>
                <YilbasiSayaci hedefMs={startMs(yilbasi, "istanbul")} yil={yilbasi.year} olusturma={now.getTime()} sira={sira.map((x) => ({ ad: x.ad, ulke: x.ulke, an: x.an }))} />
              </div>
            </section>
          ) : (
            <GeriSayimHero
              baslik={event.question}
              ad={event.name}
              hedefler={occurrences.map((o) => startMs(o, "istanbul"))}
              oncekiMs={onceki ? startMs(onceki, "istanbul") : null}
              olusturma={now.getTime()}
              tahmini={estimated}
            />
          )
        }
        sahneler={next ? <GeriSayimSahneleri event={event} tarihler={occurrences} kalan={days ?? 0} basladi={started} /> : null}
      >
        {next && days ? <GeriSayimTakvim event={event} next={next} now={now} kalan={days} /> : null}
        {yilbasiBolumu}
        <h2 id="hakkinda">{event.name} hakkında</h2>
        <p>{event.about}</p>
        <h2 id="diger">Diğer geri sayımlar ve takvimler</h2>
        <ul className="saat-linkler">
          {ilgili.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </SaatKabugu>
    );
  }

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
        yilbasi ? (
          <YilbasiSayaci hedefMs={startMs(yilbasi, "istanbul")} yil={yilbasi.year} olusturma={now.getTime()} sira={sira.map((x) => ({ ad: x.ad, ulke: x.ulke, an: x.an }))} />
        ) : (
        <CountdownDisplay
          targets={occurrences.map(({ year, month, day }) => ({ year, month, day }))}
          zone={event.zone}
          lang={lang}
          title={event.name}
          copy={countdownCopy[lang]}
        />
        )
      }
      related={ilgili}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "ozet", label: tr ? "Tarih ve kalan süre" : "Date and time left" },
        ...(tr && next && days ? [{ id: "takvim", label: `${event.name} gelene kadar takvim` }] : []),
        ...(yilbasi ? [{ id: "dunya", label: "Dünyada yeni yıla kim, ne zaman giriyor?" }, { id: "tatil", label: `${yilbasi.year} yılbaşı tatili` }] : []),
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

      {tr && next && days ? <GeriSayimTakvim event={event} next={next} now={now} kalan={days} /> : null}

      {yilbasiBolumu}

      <h2 id="yillar">{tr ? `Yıllara göre ${event.name} tarihleri` : `${event.name} dates by year`}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Yıl" : "Year"}</th>
              <th>{tr ? "Tarih" : "Date"}</th>
              {(event.rule.kind === "hijri" || event.rule.kind === "regaib") && <th>{tr ? "Durum" : "Status"}</th>}
            </tr>
          </thead>
          <tbody>
            {occurrences.map((parts) => (
              <tr key={parts.year}>
                <td>{parts.year}</td>
                <td>{formatEventDate(parts, lang)}</td>
                {(event.rule.kind === "hijri" || event.rule.kind === "regaib") && <td>{parts.estimated ? (tr ? "Tahmini (Hicri takvim)" : "Estimated") : tr ? "Diyanet takvimi" : "Official"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="hakkinda">{tr ? `${event.name} hakkında` : `About ${event.name}`}</h2>
      <p>{event.about}</p>
    </TimeToolPage>
  );
}

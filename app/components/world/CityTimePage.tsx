import Link from "@/app/components/SiteLink";
import { cityFacts, cityName, cityPath, describeDifference, hourMapping, nearbyCities, type Lang } from "../../converter/time/cityFacts";
import type { FaqItem } from "../../converter/faqSchema";
import type { WorldCity } from "../../converter/time/worldCities";
import { worldCities } from "../../converter/time/worldCities";
import { differenceMinutes } from "../../converter/time/timezones";
import TimeToolPage from "../time/TimeToolPage";
import CityLiveClock from "./CityLiveClock";

// Sehir saati sayfasi (TR + EN). Tum sayilar sunucuda gercek tz verisinden hesaplanir.

function coordinates(city: WorldCity, lang: Lang) {
  const fmt = (value: number) => Math.abs(value).toLocaleString(lang === "tr" ? "tr-TR" : "en-US", { maximumFractionDigits: 2 });
  const ns = city.lat >= 0 ? (lang === "tr" ? "K" : "N") : lang === "tr" ? "G" : "S";
  const ew = city.lon >= 0 ? (lang === "tr" ? "D" : "E") : lang === "tr" ? "B" : "W";
  return `${fmt(city.lat)}° ${ns}, ${fmt(city.lon)}° ${ew}`;
}

export function cityPageTitle(city: WorldCity, lang: Lang) {
  return lang === "tr"
    ? `${city.nameTr} Saat Kaç? Canlı Saat ve Saat Farkı`
    : `Current Time in ${city.nameEn}: Live Clock & Time Zone`;
}

export function cityPageDescription(city: WorldCity, lang: Lang, now: Date) {
  const facts = cityFacts(city, now, lang);
  if (lang === "tr") {
    const diff = city.region === "turkey" ? "Türkiye saati (UTC+3)" : `Türkiye'den ${describeDifference(facts.diffFromIstanbul, "tr")}`;
    return `${city.inTr} şu an saat kaç? Canlı saat, ${diff}, ${facts.utcLabel} saat dilimi, yaz saati tarihleri ve gün doğumu-batımı saatleri.`;
  }
  return `What time is it in ${city.nameEn} right now? Live clock, ${facts.utcLabel} time zone (${facts.zoneName}), daylight saving dates, time differences and sunrise-sunset times.`;
}

export default function CityTimePage({ city, lang }: { city: WorldCity; lang: Lang }) {
  const now = new Date();
  const tr = lang === "tr";
  const name = cityName(city, lang);
  const country = tr ? city.countryTr : city.countryEn;
  const facts = cityFacts(city, now, lang);
  const inTurkey = city.region === "turkey";
  const path = cityPath(city, lang);
  const hubPath = tr ? "/dunya-saatleri" : "/en/world-clock";

  // Saat eslestirme tablosu: TR'de Istanbul'a gore; EN'de New York'a (Amerika icin Londra'ya) gore.
  const compareCity = tr
    ? worldCities.find((c) => c.en === "istanbul")!
    : worldCities.find((c) => c.en === (city.region === "americas" ? "london" : "new-york"))!;
  const showMapping = !(tr && inTurkey) && compareCity.en !== city.en;
  const compareName = cityName(compareCity, lang);
  const mapping = showMapping ? hourMapping(compareCity.timeZone, city.timeZone, now, lang) : [];
  const overlapCount = mapping.filter((row) => row.overlap).length;

  const sun = facts.sunRows[0];
  const dstText = facts.observesDst
    ? tr
      ? `${city.inTr} yaz saati uygulanır. Şu an ${facts.dstNow ? "yaz saati" : "kış (standart) saati"} geçerlidir.`
      : `${name} observes daylight saving time. It is currently on ${facts.dstNow ? "daylight (summer) time" : "standard (winter) time"}.`
    : tr
      ? `${city.inTr} yaz saati uygulaması yoktur; saat yıl boyunca ${facts.utcLabel} olarak kalır.`
      : `${name} does not observe daylight saving time; the clock stays at ${facts.utcLabel} all year.`;
  const transitionText = facts.transition
    ? tr
      ? `Bir sonraki saat değişikliği ${facts.transition.date} günü: yerel saat ${facts.transition.time} olduğunda saatler 1 saat ${facts.transition.forward ? "ileri" : "geri"} alınarak ${facts.transition.newTime} yapılır ve UTC farkı ${facts.transition.newOffset} olur.`
      : `The next clock change is on ${facts.transition.date}: at ${facts.transition.time} local time clocks go ${facts.transition.forward ? "forward" : "back"} 1 hour to ${facts.transition.newTime} (${facts.transition.newOffset}).`
    : "";

  const faqItems: FaqItem[] = tr
    ? [
        inTurkey
          ? {
              question: "Türkiye'de yaz saati uygulaması var mı?",
              answer:
                "Hayır. Türkiye Eylül 2016'dan bu yana yıl boyu UTC+3 (TRT, Türkiye Saati) kullanır; ilkbahar ve sonbaharda saatler ileri-geri alınmaz. Avrupa ülkeleri yaz saatine geçtiğinde Türkiye ile aradaki fark 1 saat azalır.",
            }
          : {
              question: `${name} ile Türkiye arasında kaç saat fark var?`,
              answer: `Şu an ${name}, Türkiye'den ${describeDifference(facts.diffFromIstanbul, "tr")}. ${
                facts.observesDst ? `${city.inTr} yaz saati uygulandığı ve Türkiye uygulamadığı için bu fark yıl içinde 1 saat değişir.` : "Her iki tarafta da yaz saati uygulanmadığı için fark yıl boyu aynıdır."
              }`,
            },
        {
          question: `${name} hangi saat diliminde?`,
          answer: `${name}, ${facts.zoneName} saat dilimindedir (${facts.utcLabel}). IANA saat dilimi kimliği: ${city.timeZone}.`,
        },
        { question: `${city.inTr} yaz saati uygulaması var mı?`, answer: `${dstText} ${transitionText}`.trim() },
        {
          question: `${city.inTr} altın saat kaçta?`,
          answer: `${sun.date} için ${city.inTr} akşam altın saati ${facts.light.eveningGolden}, sabah altın saati ${facts.light.morningGolden} arasındadır (yerel saat).`,
        },
        {
          question: `${city.inTr} güneş kaçta doğuyor ve batıyor?`,
          answer: `${sun.date} için ${city.inTr} gün doğumu ${sun.sunrise}, gün batımı ${sun.sunset}; gün uzunluğu ${sun.dayLength}. Saatler yerel saattir.`,
        },
      ]
    : [
        {
          question: `What is the time difference between ${name} and ${compareName}?`,
          answer: `${englishGap(differenceMinutes(compareCity.timeZone, city.timeZone, now), name, compareName)} ${facts.observesDst ? "Because daylight saving rules differ between places, this gap can change by an hour during parts of the year." : ""}`.trim(),
        },
        {
          question: `What time zone is ${name} in?`,
          answer: `${name} is in ${facts.zoneName} (${facts.utcLabel}). IANA time zone ID: ${city.timeZone}.`,
        },
        { question: `Does ${name} observe daylight saving time?`, answer: `${dstText} ${transitionText}`.trim() },
        {
          question: `When is golden hour in ${name}?`,
          answer: `On ${sun.date}, evening golden hour in ${name} runs ${facts.light.eveningGolden} and morning golden hour ${facts.light.morningGolden} (local time).`,
        },
        {
          question: `What time is sunrise and sunset in ${name}?`,
          answer: `On ${sun.date}, sunrise in ${name} is at ${sun.sunrise} and sunset at ${sun.sunset}, a day length of ${sun.dayLength} (local time).`,
        },
      ];

  const related = nearbyCities(city, 10).map((c) => ({
    href: cityPath(c, lang),
    label: tr ? `${c.nameTr} saati` : `Time in ${c.nameEn}`,
  }));
  const tools = tr
    ? [
        { href: hubPath, label: "Dünya Saatleri" },
        { href: "/online-saat", label: "Online Saat" },
        { href: "/online-alarm-kur", label: "Online Alarm" },
        { href: "/zamanlayici", label: "Zamanlayıcı" },
      ]
    : [
        { href: hubPath, label: "World Clock" },
        { href: "/en/online-clock", label: "Online Clock" },
        { href: "/en/alarm-clock", label: "Alarm Clock" },
        { href: "/en/timer", label: "Timer" },
      ];

  const tocItems = [
    { id: "ozet", label: tr ? `${name} saat dilimi bilgileri` : `${name} time zone facts` },
    ...(showMapping ? [{ id: "saat-farki", label: tr ? `İstanbul ile ${name} saat farkı` : `${compareName} to ${name} time converter` }] : []),
    { id: "dunya", label: tr ? "Dünya şehirleriyle karşılaştırma" : "Compared with world cities" },
    { id: "yaz-saati", label: tr ? "Yaz saati uygulaması" : "Daylight saving time" },
    { id: "gunes", label: tr ? "Gün doğumu ve gün batımı" : "Sunrise and sunset" },
    { id: "altin-saat", label: tr ? "Altın saat ve mavi saat" : "Golden hour and blue hour" },
    { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: hubPath, label: tr ? "Dünya Saatleri" : "World Clock" },
        { href: path, label: name },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      install={{ name: tr ? "Dünya Saatleri" : "World Clock", lang: lang }}
      title={tr ? `${city.inTr} saat kaç?` : `Current time in ${name}`}
      intro={
        tr
          ? `${name} (${country}) şu an ${facts.zoneName} (${facts.utcLabel}) kullanır. ${
              inTurkey ? "Türkiye yıl boyu tek saat dilimi (TRT) kullanır." : `Şu an İstanbul'dan ${describeDifference(facts.diffFromIstanbul, "tr")}.`
            }`
          : `${name} (${country}) uses ${facts.zoneName}: ${facts.utcLabel}. The live clock below shows the exact local time and how far it is from yours.`
      }
      tool={
        <CityLiveClock
          timeZone={city.timeZone}
          lang={lang}
          cityName={name}
          copy={
            tr
              ? { localCaption: `${name} yerel saati`, yourTime: "Senin saatine göre", sameAsYou: "seninle aynı saat", ahead: "ileride", behind: "geride" }
              : { localCaption: `Local time in ${name}`, yourTime: "Compared with you", sameAsYou: "same as your time", ahead: "ahead", behind: "behind" }
          }
        />
      }
      related={{ title: tr ? "İlginizi çekebilir" : "You may also like", links: [...related, ...tools] }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={tocItems}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="ozet">{tr ? `${name} saat dilimi bilgileri` : `${name} time zone facts`}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table city-facts-table">
          <tbody>
            <tr>
              <th scope="row">{tr ? "Tarih" : "Date"}</th>
              <td>{facts.today}</td>
            </tr>
            <tr>
              <th scope="row">{tr ? "Saat dilimi" : "Time zone"}</th>
              <td>
                {facts.zoneName} ({city.timeZone})
              </td>
            </tr>
            <tr>
              <th scope="row">{tr ? "UTC farkı" : "UTC offset"}</th>
              <td>{facts.utcLabel}</td>
            </tr>
            {tr && !inTurkey && (
              <tr>
                <th scope="row">Türkiye ile fark</th>
                <td>{describeDifference(facts.diffFromIstanbul, "tr")}</td>
              </tr>
            )}
            <tr>
              <th scope="row">{tr ? "Yaz saati" : "Daylight saving"}</th>
              <td>
                {facts.observesDst
                  ? tr
                    ? `Uygulanıyor (şu an ${facts.dstNow ? "yaz saati" : "kış saati"})`
                    : `Yes (currently ${facts.dstNow ? "summer time" : "standard time"})`
                  : tr
                    ? "Uygulanmıyor"
                    : "Not observed"}
              </td>
            </tr>
            {facts.transition && (
              <tr>
                <th scope="row">{tr ? "Sonraki saat değişikliği" : "Next clock change"}</th>
                <td>
                  {facts.transition.date}, {facts.transition.time} → {facts.transition.newTime}, {facts.transition.newOffset} (
                  {tr ? (facts.transition.forward ? "1 saat ileri" : "1 saat geri") : facts.transition.forward ? "1 hour forward" : "1 hour back"})
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">{tr ? "Gün doğumu / batımı" : "Sunrise / sunset"}</th>
              <td>
                {sun.sunrise} / {sun.sunset} ({sun.date})
              </td>
            </tr>
            <tr>
              <th scope="row">{tr ? "Ülke" : "Country"}</th>
              <td>
                {country}
                {" — "}
                {city.countryWide
                  ? tr
                    ? "ülke genelinde tek saat dilimi"
                    : "one time zone nationwide"
                  : tr
                    ? "ülkede birden fazla saat dilimi var"
                    : "several time zones in the country"}
              </td>
            </tr>
            <tr>
              <th scope="row">{tr ? "Koordinatlar" : "Coordinates"}</th>
              <td>{coordinates(city, lang)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showMapping && (
        <>
          <h2 id="saat-farki">{tr ? `İstanbul ile ${name} saat farkı` : `${compareName} to ${name} time converter`}</h2>
          <p>
            {tr
              ? `İstanbul'da saat şu iken ${city.inTr} saat kaç? Yeşil satırlar iki şehirde de mesai saatine (09:00–18:00) denk gelen, toplantı ve arama için en uygun saatlerdir${overlapCount ? ` (${overlapCount} saat)` : ""}.`
              : `When it is a given hour in ${compareName}, what time is it in ${name}? Highlighted rows fall inside business hours (9 am–6 pm) in both cities — the best window for calls and meetings${overlapCount ? ` (${overlapCount} hours)` : ""}.`}
            {!overlapCount && (tr ? " Bu iki şehrin mesai saatleri çakışmıyor." : " These two cities' business hours don't overlap.")}
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table city-hour-table">
              <thead>
                <tr>
                  <th>{compareName}</th>
                  <th>{name}</th>
                </tr>
              </thead>
              <tbody>
                {mapping.map((row) => (
                  <tr key={row.from} className={row.overlap ? "is-overlap" : undefined}>
                    <td>{row.from}</td>
                    <td>
                      <strong>{row.to}</strong> {row.dayNote && <small>({row.dayNote})</small>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h2 id="dunya">{tr ? `${name} saati ile dünya şehirleri` : `${name} time compared with world cities`}</h2>
      <p>
        {tr
          ? `Farklar ${name} saatine göredir. Yaz saati uygulayan şehirlerde fark yıl içinde 1 saat değişebilir.`
          : `Differences are relative to ${name}. Where daylight saving applies, a gap can change by an hour during the year.`}
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Şehir" : "City"}</th>
              <th>{tr ? "UTC farkı" : "UTC offset"}</th>
              <th>{tr ? `${name} saatine göre` : `Compared with ${name}`}</th>
            </tr>
          </thead>
          <tbody>
            {facts.references.map((ref) => (
              <tr key={ref.city.en}>
                <td>
                  <Link href={cityPath(ref.city, lang)} prefetch={false}>
                    {cityName(ref.city, lang)}
                  </Link>
                </td>
                <td>{ref.utc}</td>
                <td>{ref.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="yaz-saati">{tr ? "Yaz saati uygulaması" : "Daylight saving time"}</h2>
      <p>
        {dstText} {transitionText}
      </p>
      {tr && facts.observesDst && !inTurkey && (
        <p>Türkiye yaz saati uygulamadığından, {city.inTr} saatler değiştiğinde Türkiye ile aradaki fark da 1 saat değişir.</p>
      )}

      <h2 id="gunes">{tr ? `${city.inTr} gün doğumu ve gün batımı` : `Sunrise and sunset in ${name}`}</h2>
      <p>
        {tr
          ? "Önümüzdeki 7 günün gün doğumu, gün batımı ve gün uzunluğu (yerel saat, atmosferik kırılma dahil, ±2 dakika)."
          : "Sunrise, sunset and day length for the next 7 days (local time, including atmospheric refraction, ±2 minutes)."}
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Gün" : "Day"}</th>
              <th>{tr ? "Gün doğumu" : "Sunrise"}</th>
              <th>{tr ? "Gün batımı" : "Sunset"}</th>
              <th>{tr ? "Gün uzunluğu" : "Day length"}</th>
            </tr>
          </thead>
          <tbody>
            {facts.sunRows.map((row) => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>{row.sunrise}</td>
                <td>{row.sunset}</td>
                <td>{row.dayLength}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="altin-saat">{tr ? `${city.inTr} altın saat ve mavi saat` : `Golden hour and blue hour in ${name}`}</h2>
      <p>
        {tr
          ? `Fotoğrafçıların sevdiği yumuşak, sıcak ışık (altın saat) güneş ufkun 6° üstü ile 4° altı arasındayken; mavi saat ise 4° ile 6° altı arasındayken yaşanır. ${sun.date} için yerel saatler:`
          : `Photographers' soft, warm light (golden hour) happens while the sun is between 6° above and 4° below the horizon; blue hour follows between 4° and 6° below. Local times for ${sun.date}:`}
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <tbody>
            <tr>
              <th scope="row">{tr ? "Sabah mavi saat" : "Morning blue hour"}</th>
              <td>{facts.light.morningBlue}</td>
            </tr>
            <tr>
              <th scope="row">{tr ? "Sabah altın saat" : "Morning golden hour"}</th>
              <td>{facts.light.morningGolden}</td>
            </tr>
            <tr>
              <th scope="row">{tr ? "Akşam altın saat" : "Evening golden hour"}</th>
              <td>{facts.light.eveningGolden}</td>
            </tr>
            <tr>
              <th scope="row">{tr ? "Akşam mavi saat" : "Evening blue hour"}</th>
              <td>{facts.light.eveningBlue}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <Link href={tr ? "/altin-saat" : "/en/golden-hour"}>{tr ? "Başka bir tarih ya da konum için altın saat hesaplayıcı" : "Golden hour calculator for any date or location"}</Link>
      </p>
    </TimeToolPage>
  );
}

function englishGap(minutes: number, name: string, other: string) {
  if (minutes === 0) return `${name} is currently on the same time as ${other}.`;
  const gap = describeDifference(minutes, "en");
  return `${name} is currently ${minutes > 0 ? gap.replace(/ ahead$/, " ahead of") : gap} ${other}.`;
}

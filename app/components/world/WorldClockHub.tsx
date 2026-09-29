import Link from "@/app/components/SiteLink";
import { cityName, cityPath } from "../../converter/time/cityFacts";

type Lang = "tr" | "en";
import type { FaqItem } from "../../converter/faqSchema";
import { formatUtcOffset, offsetMinutes } from "../../converter/time/timezones";
import { regionNames, worldCities, worldRegions } from "../../converter/time/worldCities";
import TimeToolPage from "../time/TimeToolPage";
import WorldClockBoard from "./WorldClockBoard";

// Dunya saatleri hub'i (TR + EN): canli pano + rehber + tum sehirlerin UTC tablosu.
export default function WorldClockHub({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const now = new Date();
  const cities = worldCities.map((city) => ({
    slug: city.en,
    href: cityPath(city, lang),
    name: cityName(city, lang),
    country: tr ? city.countryTr : city.countryEn,
    timeZone: city.timeZone,
    region: city.region,
  }));
  const regions = worldRegions.map((id) => ({ id, name: regionNames[id][lang] }));

  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Dünyada kaç saat dilimi var?",
          answer:
            "Teorik olarak 15 derecelik 24 ana saat dilimi vardır. Ancak Hindistan (UTC+5:30), Nepal (UTC+5:45) ve İran (UTC+3:30) gibi yarım ve çeyrek saatlik farklar nedeniyle dünyada 35'ten fazla farklı yerel saat kullanılır.",
        },
        {
          question: "Dünyadaki en büyük saat farkı kaç saattir?",
          answer:
            "En ileri saat UTC+14 (Kiribati, Line Adaları), en geri saat UTC−12'dir (ıssız Baker ve Howland adaları). Bu iki yer arasında 26 saat fark vardır; yani aynı anda iki farklı takvim günü yaşanabilir.",
        },
        {
          question: "Türkiye hangi saat dilimini kullanır?",
          answer: "Türkiye Eylül 2016'dan bu yana yıl boyu UTC+3 (TRT, Türkiye Saati) kullanır ve yaz saati uygulamaz.",
        },
        {
          question: "Yaz saatine hangi ülkeler geçer?",
          answer:
            "Avrupa Birliği ülkeleri, İngiltere, ABD'nin büyük bölümü, Kanada, Meksika'nın sınır bölgeleri, Avustralya'nın güneydoğusu, Yeni Zelanda ve Şili gibi ülkeler yaz saati uygular. Asya ve Afrika'nın büyük kısmı, Türkiye ve Rusya uygulamaz.",
        },
      ]
    : [
        {
          question: "How many time zones are there in the world?",
          answer:
            "There are 24 main time zones of 15 degrees each, but half- and quarter-hour offsets such as India (UTC+5:30), Nepal (UTC+5:45) and Iran (UTC+3:30) mean more than 35 different local times are in use.",
        },
        {
          question: "What is the largest time difference on Earth?",
          answer:
            "The furthest-ahead time is UTC+14 (Line Islands, Kiribati) and the furthest-behind is UTC−12 (uninhabited Baker and Howland islands) — a 26-hour spread, so two different calendar dates can exist at once.",
        },
        {
          question: "What is the difference between UTC and GMT?",
          answer:
            "GMT is a time zone (used by the UK in winter); UTC is the atomic-clock time standard that all time zones are defined from. In everyday use they show the same time, but UTC never changes for daylight saving.",
        },
        {
          question: "Which countries use daylight saving time?",
          answer:
            "The EU, the UK, most of the US and Canada, south-eastern Australia, New Zealand and Chile, among others. Most of Asia and Africa, as well as Türkiye and Russia, do not.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: tr ? "/dunya-saatleri" : "/en/world-clock", label: tr ? "Dünya Saatleri" : "World Clock" },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      install={{ name: tr ? "Dünya Saatleri" : "World Clock", lang: lang }}
      title={tr ? "Dünya Saatleri" : "World Clock"}
      intro={
        tr
          ? `${worldCities.length} şehrin canlı saati tek ekranda. Şehri ara, bölgeye göre süz, sık baktıklarını yıldızla; kartta senin saatinle farkı ve gece-gündüz durumu yazar.`
          : `Live time in ${worldCities.length} cities on one screen. Search, filter by region and star the ones you check often; each card shows the difference from your time and whether it is day or night.`
      }
      tool={
        <WorldClockBoard
          cities={cities}
          regions={regions}
          lang={lang}
          copy={
            tr
              ? {
                  search: "Şehir veya ülke ara…",
                  all: "Tümü",
                  favorites: "Favoriler",
                  addFavorite: "Favorilere ekle",
                  removeFavorite: "Favorilerden çıkar",
                  yourTime: "Senin saatin",
                  noResults: "Eşleşen şehir yok. Favorilere eklemek için kartlardaki ☆ simgesine dokun.",
                  today: "Bugün",
                  tomorrow: "Yarın",
                  yesterday: "Dün",
                }
              : {
                  search: "Search a city or country…",
                  all: "All",
                  favorites: "Favorites",
                  addFavorite: "Add to favorites",
                  removeFavorite: "Remove from favorites",
                  yourTime: "Your time",
                  noResults: "No matching cities. Tap ☆ on a card to add it to your favorites.",
                  today: "Today",
                  tomorrow: "Tomorrow",
                  yesterday: "Yesterday",
                }
          }
        />
      }
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: tr
          ? [
              { href: "/online-saat", label: "Online Saat" },
              { href: "/online-alarm-kur", label: "Online Alarm" },
              { href: "/zamanlayici", label: "Zamanlayıcı" },
              { href: "/kronometre", label: "Kronometre" },
              { href: "/unix-zaman-damgasi-cevirici", label: "Unix Zaman Damgası Çevirici" },
            ]
          : [
              { href: "/en/online-clock", label: "Online Clock" },
              { href: "/en/alarm-clock", label: "Alarm Clock" },
              { href: "/en/timer", label: "Timer" },
              { href: "/en/stopwatch", label: "Stopwatch" },
            ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "dilimler", label: tr ? "Saat dilimleri nasıl çalışır?" : "How time zones work" },
        { id: "utc-gmt", label: "UTC & GMT" },
        { id: "yaz-saati", label: tr ? "Yaz saati uygulaması" : "Daylight saving time" },
        ...(tr ? [{ id: "turkiye", label: "Türkiye saati (TRT)" }] : []),
        { id: "sehirler", label: tr ? "Şehirlere göre UTC farkları" : "UTC offsets by city" },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      {tr ? (
        <>
          <h2 id="dilimler">Saat dilimleri nasıl çalışır?</h2>
          <p>
            Dünya 24 saatte 360 derece döndüğü için her 15 derecelik boylam yaklaşık bir saatlik farka karşılık gelir. Saat dilimleri
            bu mantıkla, ama ülke sınırlarına ve siyasi kararlara göre çizilir. Bu yüzden Çin koca ülkede tek saat (UTC+8) kullanırken,
            ABD dört ana saat dilimine ayrılır; Hindistan ve Nepal gibi ülkeler ise yarım ya da çeyrek saatlik farklar kullanır.
          </p>
          <h2 id="utc-gmt">UTC ve GMT arasındaki fark</h2>
          <p>
            UTC (Eşgüdümlü Evrensel Zaman), atom saatleriyle tutulan ve tüm saat dilimlerinin referans aldığı standarttır. GMT ise
            Greenwich&apos;e göre tanımlanmış bir saat dilimidir ve İngiltere kışın bunu kullanır. Günlük hayatta ikisi aynı saati gösterir;
            fark, UTC&apos;nin hiçbir zaman yaz saatine geçmemesidir. Türkiye saati bu yüzden &quot;UTC+3&quot; ya da &quot;GMT+3&quot;
            olarak yazılır.
          </p>
          <h2 id="yaz-saati">Yaz saati uygulaması</h2>
          <p>
            Avrupa&apos;da saatler Mart&apos;ın son pazarı 1 saat ileri, Ekim&apos;in son pazarı 1 saat geri alınır. ABD ve Kanada&apos;da
            değişiklik Mart&apos;ın ikinci pazarı ve Kasım&apos;ın ilk pazarı yapılır. Güney yarımkürede (Avustralya, Yeni Zelanda, Şili)
            mevsimler ters olduğu için yaz saati Ekim-Nisan arasındadır. Bu tarihlerde Türkiye ile aradaki fark 1 saat değişir; her
            şehir sayfasında bir sonraki değişikliğin tarihini bulabilirsiniz.
          </p>
          <h2 id="turkiye">Türkiye saati (TRT)</h2>
          <p>
            Türkiye tek saat dilimi kullanır: UTC+3. Eylül 2016&apos;dan bu yana yaz-kış saati uygulaması yoktur; saatler yıl boyu
            aynı kalır. Orta Avrupa (Berlin, Paris) kışın Türkiye&apos;den 2 saat (Londra 3 saat), yazın 1 saat (Londra 2 saat) geridedir.
          </p>
        </>
      ) : (
        <>
          <h2 id="dilimler">How time zones work</h2>
          <p>
            Earth turns 360 degrees in 24 hours, so every 15 degrees of longitude is roughly one hour. Time zones follow that idea
            but are drawn along borders and political decisions — China uses a single time (UTC+8) across the whole country, the
            contiguous US has four main zones, and places like India and Nepal use half- or quarter-hour offsets.
          </p>
          <h2 id="utc-gmt">UTC vs GMT</h2>
          <p>
            UTC (Coordinated Universal Time) is the atomic-clock standard every time zone is defined from. GMT is a time zone based
            on Greenwich, used by the UK in winter. They show the same time day to day, but UTC never shifts for daylight saving.
          </p>
          <h2 id="yaz-saati">Daylight saving time</h2>
          <p>
            In Europe clocks go forward on the last Sunday of March and back on the last Sunday of October. The US and Canada change
            on the second Sunday of March and the first Sunday of November. In the southern hemisphere (Australia, New Zealand, Chile)
            summer time runs from about October to April. Each city page shows the exact date of its next clock change.
          </p>
        </>
      )}

      <h2 id="sehirler">{tr ? "Şehirlere göre UTC farkları" : "UTC offsets by city"}</h2>
      {worldRegions.map((region) => (
        <div key={region}>
          <h3>{regionNames[region][lang]}</h3>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{tr ? "Şehir" : "City"}</th>
                  <th>{tr ? "Ülke" : "Country"}</th>
                  <th>{tr ? "UTC farkı" : "UTC offset"}</th>
                </tr>
              </thead>
              <tbody>
                {worldCities
                  .filter((city) => city.region === region)
                  .map((city) => (
                    <tr key={city.en}>
                      <td>
                        <Link href={cityPath(city, lang)} prefetch={false}>
                          {cityName(city, lang)}
                        </Link>
                      </td>
                      <td>{tr ? city.countryTr : city.countryEn}</td>
                      <td>{formatUtcOffset(offsetMinutes(city.timeZone, now))}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </TimeToolPage>
  );
}

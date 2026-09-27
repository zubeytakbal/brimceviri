import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { cityPath, formatTime } from "../../converter/time/cityFacts";
import { lightWindows } from "../../converter/time/solar";
import { localDateParts } from "../../converter/time/timezones";
import { worldCities } from "../../converter/time/worldCities";
import TimeToolPage from "../time/TimeToolPage";
import GoldenHourTool, { type GoldenCopy } from "./GoldenHourTool";

const COPY: Record<"tr" | "en", GoldenCopy> = {
  tr: {
    city: "Şehir",
    date: "Tarih",
    useLocation: "Konumumu kullan",
    myLocation: "Konumum",
    locationError: "Konum alınamadı. Tarayıcı izni verip tekrar dene ya da listeden şehir seç.",
    morningBlue: "Sabah mavi saat",
    morningGolden: "Sabah altın saat",
    eveningGolden: "Akşam altın saat",
    eveningBlue: "Akşam mavi saat",
    sunrise: "Gün doğumu",
    sunset: "Gün batımı",
    dayLength: "Gün uzunluğu",
    night: "Gece",
    day: "Gündüz",
    golden: "Altın saat",
    blue: "Mavi saat",
    polar: "Bu tarihte bu konumda güneş batmıyor ya da doğmuyor (kutup günü/gecesi).",
  },
  en: {
    city: "City",
    date: "Date",
    useLocation: "Use my location",
    myLocation: "My location",
    locationError: "Couldn't get your location. Allow location access and try again, or pick a city.",
    morningBlue: "Morning blue hour",
    morningGolden: "Morning golden hour",
    eveningGolden: "Evening golden hour",
    eveningBlue: "Evening blue hour",
    sunrise: "Sunrise",
    sunset: "Sunset",
    dayLength: "Day length",
    night: "Night",
    day: "Day",
    golden: "Golden hour",
    blue: "Blue hour",
    polar: "The sun doesn't set or rise here on this date (polar day or night).",
  },
};

export default function GoldenHourPage({ lang }: { lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const now = new Date();
  const cities = worldCities.map((c) => ({ slug: c.en, name: tr ? `${c.nameTr} (${c.countryTr})` : `${c.nameEn} (${c.countryEn})`, lat: c.lat, lon: c.lon, timeZone: c.timeZone }));
  const featured = ["istanbul", "ankara", "izmir", "london", "paris", "new-york", "tokyo", "dubai"].map((slug) => worldCities.find((c) => c.en === slug)!);
  const rows = featured.map((city) => {
    const p = localDateParts(city.timeZone, now);
    const w = lightWindows(p.year, p.month, p.day, city.lat, city.lon);
    const span = (pair: [Date, Date] | null) => (pair ? `${formatTime(pair[0], city.timeZone, lang)} – ${formatTime(pair[1], city.timeZone, lang)}` : "—");
    return { city, morning: span(w.morningGolden), evening: span(w.eveningGolden) };
  });

  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Altın saat nedir?",
          answer:
            "Altın saat, gün doğumundan hemen sonra ve gün batımından hemen önce güneşin ufka yakın olduğu dönemdir. Işık atmosferde daha uzun yol kat ettiği için yumuşak, sıcak ve yönlüdür; gölgeler uzar. Bu sayfa güneşin ufkun 6° üstü ile 4° altı arasında olduğu süreyi esas alır.",
        },
        {
          question: "Mavi saat nedir?",
          answer: "Mavi saat, gün doğumundan önce ve gün batımından sonra güneşin ufkun 4° ile 6° altında olduğu kısa dönemdir. Gökyüzü koyu maviye döner; şehir ışıkları ve gece manzarası çekimleri için idealdir.",
        },
        {
          question: "Altın saat ne kadar sürer?",
          answer: "Konuma ve mevsime göre değişir. Türkiye'de genellikle 45 dakika ile 1,5 saat arasındadır; kuzeye gidildikçe ve yaz aylarında uzar, ekvatora yaklaştıkça kısalır.",
        },
        {
          question: "Hesaplama ne kadar doğru?",
          answer: "Güneşin konumu NOAA formülleriyle hesaplanır ve birkaç dakika içinde doğrudur. Dağlar, binalar ve bulutlar gerçek ışığı etkileyebilir; çekimden önce birkaç dakika pay bırakın.",
        },
      ]
    : [
        {
          question: "What is golden hour?",
          answer:
            "Golden hour is the time shortly after sunrise and before sunset when the sun is low. Light travels through more atmosphere, so it is soft, warm and directional, with long shadows. This page uses the common definition of the sun between 6° above and 4° below the horizon.",
        },
        {
          question: "What is blue hour?",
          answer: "Blue hour is the short period before sunrise and after sunset when the sun is 4° to 6° below the horizon and the sky turns deep blue — ideal for cityscapes and night scenes.",
        },
        {
          question: "How long does golden hour last?",
          answer: "It depends on latitude and season: usually 40 minutes to 1.5 hours at mid-latitudes, longer in summer and further from the equator, shorter near the equator.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: tr ? "/altin-saat" : "/en/golden-hour", label: tr ? "Altın Saat" : "Golden Hour" },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      title={tr ? "Altın Saat ve Mavi Saat Hesaplama" : "Golden Hour & Blue Hour Calculator"}
      intro={
        tr
          ? "Fotoğraf için en güzel ışık ne zaman? Şehrini ya da konumunu ve tarihi seç; sabah ve akşam altın saat ile mavi saati dakikası dakikasına gör."
          : "When is the best light for photos? Pick a city or use your location and a date to see the exact morning and evening golden hour and blue hour."
      }
      tool={<GoldenHourTool cities={cities} lang={lang} copy={COPY[lang]} initialCity={tr ? "istanbul" : "new-york"} />}
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: tr
          ? [
              { href: "/ay-evreleri", label: "Ay Evreleri" },
              { href: "/dunya-saatleri", label: "Dünya Saatleri" },
              { href: "/online-saat", label: "Online Saat" },
              { href: "/zamanlayici", label: "Zamanlayıcı" },
            ]
          : [
              { href: "/en/moon-phases", label: "Moon Phases" },
              { href: "/en/world-clock", label: "World Clock" },
              { href: "/en/online-clock", label: "Online Clock" },
            ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "bugun", label: tr ? "Bugün şehirlerde altın saat" : "Golden hour today in major cities" },
        { id: "ipuclari", label: tr ? "Altın saatte fotoğraf ipuçları" : "Golden hour photo tips" },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="bugun">{tr ? "Bugün şehirlerde altın saat" : "Golden hour today in major cities"}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Şehir" : "City"}</th>
              <th>{tr ? "Sabah" : "Morning"}</th>
              <th>{tr ? "Akşam" : "Evening"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ city, morning, evening }) => (
              <tr key={city.en}>
                <td>
                  <Link href={cityPath(city, lang)} prefetch={false}>
                    {tr ? city.nameTr : city.nameEn}
                  </Link>
                </td>
                <td>{morning}</td>
                <td>{evening}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{tr ? "Saatler her şehrin yerel saatidir. Diğer şehirler için şehir sayfalarındaki altın saat bölümüne bakabilirsin." : "Times are local to each city. Every city page on the world clock has its own golden hour section."}</p>

      <h2 id="ipuclari">{tr ? "Altın saatte fotoğraf ipuçları" : "Golden hour photo tips"}</h2>
      <ul>
        {tr ? (
          <>
            <li>Yere 15-20 dakika önce git; en sıcak ışık gün batımından hemen önceki son dakikalardadır.</li>
            <li>Portrede güneşi konunun arkasına al: saçlarda doğal bir parıltı (arka ışık) oluşur.</li>
            <li>Beyaz dengesini &quot;otomatik&quot; yerine &quot;gün ışığı&quot;na al; yoksa kamera sıcak tonları bastırabilir.</li>
            <li>Mavi saatte tripod kullan; şehir ışıkları yanarken gökyüzü hâlâ renklidir.</li>
          </>
        ) : (
          <>
            <li>Arrive 15–20 minutes early; the warmest light is in the last minutes before sunset.</li>
            <li>For portraits, put the sun behind your subject for a natural rim light in the hair.</li>
            <li>Set white balance to &quot;daylight&quot; instead of auto so the camera doesn&apos;t neutralise the warm tones.</li>
            <li>Bring a tripod for blue hour — city lights come on while the sky still has colour.</li>
          </>
        )}
      </ul>
    </TimeToolPage>
  );
}

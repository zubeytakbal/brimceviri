// Güneş doğuşu/batışı ve gündönümü sayfaları. Bütün sayılar derleme anında solar.ts ile hesaplanır;
// sayfa metni tarihten bağımsızdır (gündönümü, ekinoks ve yıllık uç değerler), günlük saatler araçtadır.
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { sunAtElevation, sunTimes } from "../../converter/time/solar";
import { atClock, durationLabel, firstSunsetAtOrAfter, toClock, sunExtremes, sunYear, trClock, trDayLabel, trSeasons } from "../../converter/time/sunYear";
import { trDative, trLocative } from "../../converter/turkishSuffix";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import { directSunMinutes, noonElevation, perpendicularTilt, shadowLength } from "../../converter/time/sunGeometry";
import { formatTr } from "../../converter/metal/metalWeight";
import { ShadowTool } from "./ShadowTools";
import { SolsticeTool, SunriseTool, type SunCity } from "./SunTools";
import { DayLengthYear, SunTodayHero, TodayProvinceTable, todaySummary, trDayText, trToday } from "./SunToday";

export const SUN_PATHS = { sunrise: "/gunes-dogusu-ve-batisi", solstice: "/en-uzun-gun-ve-en-kisa-gun", shadow: "/gunes-acisi-ve-golge-boyu-hesaplama" } as const;

/** Sayfadaki sabit tablolar derleme yılı için hesaplanır. */
const YEAR = new Date().getFullYear();
const collator = new Intl.Collator("tr");
const provinces = [...turkeyProvinces].sort((a, b) => collator.compare(a.name, b.name));
const cities: SunCity[] = provinces.map((p) => ({ id: p.id, name: p.name, lat: p.lat, lon: p.lon }));
const byId = (id: string) => turkeyProvinces.find((p) => p.id === id)!;

function times(id: string, m: number, d: number) {
  const p = byId(id);
  const s = sunTimes(YEAR, m, d, p.lat, p.lon);
  if (s.kind !== "normal") throw new Error("Türkiye'de kutup günü olmaz");
  return s;
}

const meta = (path: string, title: string, description: string): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
});

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: Array<Array<React.ReactNode>> }) {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (j === 0 ? <th scope="row" key={j}>{cell}</th> : <td key={j}>{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ilLink = (p: { id: string; name: string }) => <Link href={`/il-rakimlari/${p.id}`}>{p.name}</Link>;

/* ---------------- Güneş doğuşu ve batışı ---------------- */

function sunriseData() {
  const rows = provinces.map((p) => {
    const jun = times(p.id, 6, 21);
    const dec = times(p.id, 12, 21);
    const after = firstSunsetAtOrAfter(YEAR, p.lat, p.lon, 18);
    return { p, jun, dec, after };
  });
  const by = (f: (r: (typeof rows)[number]) => number, max: boolean) => rows.reduce((a, b) => ((max ? f(b) > f(a) : f(b) < f(a)) ? b : a));
  const firstRise = by((r) => r.jun.sunrise.getTime(), false);
  const lastSet = by((r) => r.jun.sunset.getTime(), true);
  const firstDark = by((r) => r.dec.sunset.getTime(), false);
  const lastRiseDec = by((r) => r.dec.sunrise.getTime(), true);
  const ank = byId("ankara");
  const ankJun = times("ankara", 6, 21);
  const ankDec = times("ankara", 12, 21);
  const ankMar = times("ankara", 3, 21);
  // Yüksek bir noktadan bakınca ufuk alçalır: eğim ≈ 1,76′ × √h (h metre). 1000 m için ~0,93°.
  const dip = (1.76 / 60) * Math.sqrt(1000);
  const highRise = sunAtElevation(YEAR, 3, 21, ank.lat, ank.lon, -0.833 - dip)!;
  const dipMinutes = Math.round((ankMar.sunrise.getTime() - highRise.morning.getTime()) / 60000);
  const tw = { civil: sunAtElevation(YEAR, 3, 21, ank.lat, ank.lon, -6)!, nautical: sunAtElevation(YEAR, 3, 21, ank.lat, ank.lon, -12)!, astro: sunAtElevation(YEAR, 3, 21, ank.lat, ank.lon, -18)! };
  return { rows, firstRise, lastSet, firstDark, lastRiseDec, ankJun, ankDec, ankMar, dipMinutes, tw };
}

/** Sayfa her gece yeniden derlenir: "bugün" Türkiye'de derleme günüdür. */
const TODAY = trToday();
const todayPlaces = ["istanbul", "ankara", "izmir"].map((id) => cities.find((c) => c.id === id)!);

export function sunriseMetadata(): Metadata {
  const ist = todaySummary(todayPlaces[0], TODAY);
  return meta(
    SUN_PATHS.sunrise,
    "Güneş Doğuşu ve Batışı Saatleri: 81 İl",
    `${trDayText(TODAY)}: İstanbul'da gün doğumu ${trClock(ist.sunrise)}, gün batımı ${trClock(ist.sunset)} (gün ${durationLabel(ist.dayLengthMinutes)}). 81 ilde bugünkü doğuş, batış ve alacakaranlık saatleri.`,
  );
}

const sunriseFaq = (d: ReturnType<typeof sunriseData>): FaqItem[] => [
  {
    question: "Ankara'da güneş kaçta doğar?",
    answer: `Mevsime göre değişir: 21 Haziran'da ${trClock(d.ankJun.sunrise)}, 21 Aralık'ta ${trClock(d.ankDec.sunrise)}. Belirli bir gün için yukarıdaki araçta tarihi seçin.`,
  },
  {
    question: "Türkiye'de güneş ilk nerede doğar?",
    answer: `En doğudaki illerde. 21 Haziran'da en erken doğuş ${trLocative(d.firstRise.p.name)} (${trClock(d.firstRise.jun.sunrise)}), en geç batış ${trLocative(d.lastSet.p.name)} (${trClock(d.lastSet.jun.sunset)}) olur.`,
  },
  {
    question: "Kışın hava en erken hangi ilde kararır?",
    answer: `21 Aralık'ta güneş en erken ${trLocative(d.firstDark.p.name)} batar (${trClock(d.firstDark.dec.sunset)}). Tek saat dilimi kullanıldığı için doğudaki illerde akşam batıdakilerden yaklaşık bir saat önce kararır.`,
  },
  {
    question: "Namaz vakitlerindeki güneş saati ile buradaki saat aynı mı?",
    answer: "Aynı olmayabilir. Burada astronomik gün doğumu, yani güneş diskinin üst kenarının düz ufukta göründüğü an verilir. Diyanet'in yayımladığı vakitlerde ihtiyat payları uygulanır; namaz için Diyanet takvimini kullanın.",
  },
];

export function SunrisePage() {
  const d = sunriseData();
  const faq = sunriseFaq(d);
  const riseGap = Math.round((d.lastSet.jun.sunrise.getTime() - d.firstRise.jun.sunrise.getTime()) / 60000);
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Saat ve Tarih" },
        { href: SUN_PATHS.sunrise, label: "Güneş Doğuşu ve Batışı" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Güneş Doğuşu ve Batışı Saatleri"
      intro="İli ve tarihi seçin; güneşin doğuş ve batış saatini, gün uzunluğunu, alacakaranlık sürelerini, güneşin en tepede olduğu anı ve yıl boyunca nasıl değiştiğini görün. İki ili karşılaştırabilir ya da konumunuzu kullanabilirsiniz."
      tool={
        <>
          <SunTodayHero places={todayPlaces} t={TODAY} />
          <SunriseTool cities={cities} />
        </>
      }
      related={{
        title: "İlgili araçlar",
        links: [
          { href: SUN_PATHS.solstice, label: "En Uzun ve En Kısa Gün" },
          { href: "/ay-evreleri", label: "Ay Evreleri" },
          { href: "/yerel-saat-hesaplama", label: "Yerel Saat Hesaplama" },
        ],
      }}
      tocTitle="Bu sayfada"
      tocItems={[
        { id: "bugun-iller", label: "81 ilde bugün gün doğumu ve batımı" },
        { id: "yil", label: "Yıl boyunca gün uzunluğu" },
        { id: "iller", label: "81 ilde en uzun ve en kısa günde saatler" },
        { id: "dogu-bati", label: "Türkiye'de güneş ilk nerede doğar?" },
        { id: "alacakaranlik", label: "Alacakaranlık türleri" },
        { id: "tanim", label: "Gün doğumu nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faq}
    >
      <h2 id="bugun-iller">81 ilde bugün gün doğumu ve batımı</h2>
      <p>
        Saatler {trDayText(TODAY)} için il merkezinde, Türkiye saatiyle (UTC+3) verilmiştir ve her gün yenilenir. Başka bir gün ya da konum için yukarıdaki aracı kullanın.
      </p>
      <TodayProvinceTable places={cities} t={TODAY} />

      <h2 id="yil">Yıl boyunca gün uzunluğu</h2>
      <DayLengthYear place={todayPlaces[0]} t={TODAY} />

      <h2 id="iller">81 ilde en uzun ve en kısa günde saatler ({YEAR})</h2>
      <p>
        Tablo yılın en uzun (21 Haziran) ve en kısa (21 Aralık) günündeki saatleri ve güneşin yılbaşından sonra ilk kez akşam 18:00&apos;den sonra battığı günü gösterir. Saatler il merkezi için, Türkiye saatiyle
        (UTC+3) verilmiştir. İl adına tıklayarak ilin rakımını ve hava basıncını görebilirsiniz.
      </p>
      <Table
        caption={`İl merkezlerinde gün doğumu ve gün batımı, ${YEAR}`}
        head={["İl", "21 Haziran doğuş", "21 Haziran batış", "21 Aralık doğuş", "21 Aralık batış", "18:00 sonrası ilk batış"]}
        rows={d.rows.map((r) => [ilLink(r.p), trClock(r.jun.sunrise), trClock(r.jun.sunset), trClock(r.dec.sunrise), trClock(r.dec.sunset), r.after ? trDayLabel(r.after.month, r.after.day) : "—"])}
      />

      <h2 id="dogu-bati">Türkiye&apos;de güneş ilk nerede doğar?</h2>
      <p>
        Türkiye 2016&apos;dan bu yana bütün yıl tek saat dilimi (UTC+3) kullanır. Ülke doğu-batı yönünde yaklaşık 19 boylam genişliğindedir ve güneş her boylamı 4 dakikada geçer. Bu yüzden aynı saati kullanan
        iller arasında güneşin doğuşu bir saati aşan farkla gerçekleşir. 21 Haziran&apos;da güneş en erken {trLocative(d.firstRise.p.name)} ({trClock(d.firstRise.jun.sunrise)}) doğar; en geç batış ise{" "}
        {trLocative(d.lastSet.p.name)} ({trClock(d.lastSet.jun.sunset)}) olur. {d.lastSet.p.name} ile {d.firstRise.p.name} arasında doğuş farkı {riseGap} dakikadır.
      </p>
      <p>
        Kışın bu fark akşamları belirginleşir: 21 Aralık&apos;ta güneş en erken {trLocative(d.firstDark.p.name)} {atClock(d.firstDark.dec.sunset)} batar, sabah en geç {trLocative(d.lastRiseDec.p.name)}{" "}
        {atClock(d.lastRiseDec.dec.sunrise)} doğar. İki şehrin farkını araçtaki &quot;Karşılaştırılacak il&quot; seçimiyle herhangi bir gün için görebilirsiniz. Boylama göre güneş saatini{" "}
        <Link href="/yerel-saat-hesaplama">yerel saat hesaplama</Link> sayfası açıklar.
      </p>

      <h2 id="alacakaranlik">Alacakaranlık türleri</h2>
      <p>Güneş battıktan sonra gökyüzü bir süre aydınlık kalır. Bu süre güneşin ufkun ne kadar altında olduğuna göre üçe ayrılır:</p>
      <ul>
        <li>
          <strong>Sivil alacakaranlık</strong> (güneş 0–6° altta): Dışarıda lamba olmadan okunabilir. 21 Mart&apos;ta Ankara&apos;da sabah {atClock(d.tw.civil.morning)} başlar, akşam {atClock(d.tw.civil.evening)} biter.
        </li>
        <li>
          <strong>Denizcilik alacakaranlığı</strong> (6–12°): Deniz ufku hâlâ seçilebilir; parlak yıldızlar görünür. Ankara&apos;da akşam {toClock(d.tw.nautical.evening)} kadar sürer.
        </li>
        <li>
          <strong>Astronomik alacakaranlık</strong> (12–18°): Gökyüzü gözle karanlık görünür ama sönük gökcisimleri için yeterince karanlık değildir. Ankara&apos;da {atClock(d.tw.astro.evening)} tam gece başlar.
        </li>
      </ul>
      <p>
        Fotoğrafçıların kullandığı altın saat ve mavi saat de bu aralıklarla ilgilidir.
      </p>

      <h2 id="tanim">Gün doğumu nasıl hesaplanır?</h2>
      <p>
        Gün doğumu, güneş diskinin üst kenarının düz ufukta göründüğü andır. Hava ışığı kırdığı için güneş aslında ufkun yaklaşık 34′ altındayken görünür; diskin yarıçapı da 16′ olduğundan hesapta güneşin merkezi
        ufkun 0,833° altında alınır. Saatler ABD Ulusal Okyanus ve Atmosfer İdaresi&apos;nin (NOAA) güneş hesabı formülleriyle bulunur ve PyEphem astronomi kütüphanesiyle karşılaştırıldığında farkı 81 ilin tamamında
        yıl boyunca 5 saniyenin altındadır.
      </p>
      <p>
        Hesap deniz seviyesinde düz bir ufuk varsayar. Yüksek bir yerden bakıldığında ufuk alçalır ve güneş daha erken doğar: 1000 m yükseklikteki bir tepeden açık ufka bakan biri 21 Mart&apos;ta güneşi yaklaşık{" "}
        {d.dipMinutes} dakika erken görür. Önünde dağ olan vadilerde ise güneş hesaplanandan geç görünür.
      </p>
    </TimeToolPage>
  );
}

/* ---------------- En uzun gün ve en kısa gün ---------------- */

function solsticeData() {
  const years = Array.from({ length: 11 }, (_, i) => YEAR - 1 + i);
  const table = years.map((y) => ({ y, s: trSeasons(y) }));
  const juneOn20 = table.filter((t) => new Date(t.s[1].date.getTime() + 180 * 60000).getUTCDate() === 20).map((t) => t.y);
  const rows = provinces.map((p) => ({ p, e: sunExtremes(YEAR, p.lat, p.lon) }));
  const longest = rows.reduce((a, b) => (b.e.longest.dayLength > a.e.longest.dayLength ? b : a));
  const shortestLong = rows.reduce((a, b) => (b.e.longest.dayLength < a.e.longest.dayLength ? b : a));
  const ank = byId("ankara");
  const ankE = rows.find((r) => r.p.id === "ankara")!.e;
  const ankDec21 = times("ankara", 12, 21);
  const ankYear = sunYear(YEAR, ank.lat, ank.lon);
  const marchEq = trSeasons(YEAR)[0].date;
  const eqDay = new Date(marchEq.getTime() + 180 * 60000);
  const ankEq = ankYear.find((d) => d.month === eqDay.getUTCMonth() + 1 && d.day === eqDay.getUTCDate())!;
  const equilux = ankYear.find((d) => d.month <= 3 && d.dayLength >= 720)!;
  return { years, table, juneOn20, rows, longest, shortestLong, ankE, ankDec21, ankEq, equilux, eqDay };
}

const trFullDate = (d: Date) => {
  const t = new Date(d.getTime() + 180 * 60000);
  return `${trDayLabel(t.getUTCMonth() + 1, t.getUTCDate())} ${trClock(d)}`;
};

export function solsticeMetadata(): Metadata {
  const d = solsticeData();
  const cur = d.table.find((t) => t.y === YEAR)!.s;
  return meta(
    SUN_PATHS.solstice,
    "En Uzun Gün, En Kısa Gün ve Ekinoks",
    `Gündönümü ve ekinoks tarihleri, 81 ilde en uzun ve en kısa gün. ${YEAR} yaz gündönümü ${trFullDate(cur[1].date)}; Ankara'da en uzun gün ${durationLabel(d.ankE.longest.dayLength)}.`,
  );
}

export function SolsticePage() {
  const d = solsticeData();
  const cur = d.table.find((t) => t.y === YEAR)!.s;
  const faq: FaqItem[] = [
    {
      question: "Yılın en uzun günü hangisi?",
      answer: `Haziran gündönümünün olduğu gün; ${trLocative(YEAR)} ${trFullDate(cur[1].date)} (Türkiye saati). Ankara'da o gün güneş ${durationLabel(d.ankE.longest.dayLength)} ufkun üstünde kalır.`,
    },
    {
      question: "Yılın en kısa günü hangisi?",
      answer: `Aralık gündönümünün olduğu gün; ${trLocative(YEAR)} ${trFullDate(cur[3].date)}. Ankara'da gün uzunluğu ${durationLabel(d.ankE.shortest.dayLength)} olur.`,
    },
    {
      question: "21 Aralık'tan sonra akşamlar neden hemen uzamıyor gibi görünür?",
      answer: `Akşamlar aslında aralık başından beri uzuyor: Ankara'da en erken gün batımı ${trLocative(trDayLabel(d.ankE.earliestSunset.month, d.ankE.earliestSunset.day))} yaşanır. Sabahlar ise ${trDative(trDayLabel(d.ankE.latestSunrise.month, d.ankE.latestSunrise.day))} kadar geç kalmaya devam eder.`,
    },
    {
      question: "Ekinoksta gece ve gündüz eşit mi?",
      answer: `Tam eşit değildir. Ankara'da mart ekinoksu günü gündüz ${durationLabel(d.ankEq.dayLength)} sürer; gündüz ilk kez ${trLocative(trDayLabel(d.equilux.month, d.equilux.day))} 12 saate ulaşır. Fark, ışığın havada kırılmasından ve güneş diskinin genişliğinden gelir.`,
    },
  ];
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Saat ve Tarih" },
        { href: SUN_PATHS.solstice, label: "En Uzun ve En Kısa Gün" },
      ]}
      crumbLabel="Sayfa yolu"
      title="En Uzun Gün, En Kısa Gün ve Ekinoks"
      intro="Yaz ve kış gündönümü ile ilkbahar ve sonbahar ekinoksunun Türkiye saatiyle tam anı, sıradakine kalan süre ve seçtiğiniz ilde yılın en uzun ve en kısa günü, en erken gün batımı ile en geç gün doğumu."
      tool={<SolsticeTool cities={cities} />}
      related={{
        title: "İlgili araçlar",
        links: [
          { href: SUN_PATHS.sunrise, label: "Güneş Doğuşu ve Batışı" },
          { href: "/ay-evreleri", label: "Ay Evreleri" },
          { href: "/takvim", label: "Takvim" },
        ],
      }}
      tocTitle="Bu sayfada"
      tocItems={[
        { id: "tarihler", label: "Gündönümü ve ekinoks tarihleri" },
        { id: "21-haziran", label: "En uzun gün her zaman 21 Haziran mı?" },
        { id: "iller", label: "81 ilde en uzun ve en kısa gün" },
        { id: "erken-batis", label: "En erken gün batımı neden 21 Aralık'ta değil?" },
        { id: "ekinoks", label: "Ekinoksta gece ve gündüz eşit mi?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faq}
    >
      <h2 id="tarihler">Gündönümü ve ekinoks tarihleri ({d.years[0]}–{d.years[d.years.length - 1]})</h2>
      <p>
        Gündönümü güneşin gökyüzünde en kuzeye (haziran) ya da en güneye (aralık) ulaştığı, ekinoks ise ekvatorun tam üstünden geçtiği andır. Bu anlar günün belli bir dakikasına denk gelir; tabloda Türkiye saatiyle
        verilmiştir.
      </p>
      <Table
        caption="Ekinoks ve gündönümü anları (Türkiye saati, ±1 dakika)"
        head={["Yıl", "Mart ekinoksu", "Haziran gündönümü", "Eylül ekinoksu", "Aralık gündönümü"]}
        rows={d.table.map((t) => [String(t.y), ...t.s.map((s) => trFullDate(s.date))])}
      />

      <h2 id="21-haziran">En uzun gün her zaman 21 Haziran mı?</h2>
      <p>
        Hayır. Takvim yılı (365 gün) ile güneş yılı (yaklaşık 365,2422 gün) arasındaki fark yüzünden gündönümü anı her yıl yaklaşık 6 saat ileri kayar, artık yıllarda bir gün geri gelir. Türkiye saatiyle haziran
        gündönümü tablodaki yıllardan {d.juneOn20.length ? d.juneOn20.join(", ") : "hiçbirinde"} {d.juneOn20.length ? "yıllarında 20 Haziran'a" : "20 Haziran'a"} denk gelir; diğer yıllarda 21 Haziran&apos;dadır. Aralık
        gündönümü de aynı nedenle 21 ya da 22 Aralık olabilir.
      </p>

      <h2 id="iller">81 ilde en uzun ve en kısa gün ({YEAR})</h2>
      <p>
        Kuzeye gidildikçe yazın günler uzar, kışın kısalır. En uzun yaz günü {trLocative(d.longest.p.name)} ({durationLabel(d.longest.e.longest.dayLength)}), en kısası {trLocative(d.shortestLong.p.name)} (
        {durationLabel(d.shortestLong.e.longest.dayLength)}) yaşanır. Tabloda ayrıca her ilde akşamın en erken karardığı ve sabahın en geç aydınlandığı gün yer alır.
      </p>
      <Table
        caption={`İl merkezlerinde gün uzunluğu ve uç değerler, ${YEAR} (Türkiye saati)`}
        head={["İl", "En uzun gün", "En kısa gün", "En erken gün batımı", "En geç gün doğumu"]}
        rows={d.rows.map((r) => [
          ilLink(r.p),
          durationLabel(r.e.longest.dayLength),
          durationLabel(r.e.shortest.dayLength),
          `${trDayLabel(r.e.earliestSunset.month, r.e.earliestSunset.day)} ${trClock(r.e.earliestSunset.sunset)}`,
          `${trDayLabel(r.e.latestSunrise.month, r.e.latestSunrise.day)} ${trClock(r.e.latestSunrise.sunrise)}`,
        ])}
      />

      <h2 id="erken-batis">En erken gün batımı neden 21 Aralık&apos;ta değil?</h2>
      <p>
        En kısa gün 21 Aralık olsa da Ankara&apos;da güneş en erken {trLocative(trDayLabel(d.ankE.earliestSunset.month, d.ankE.earliestSunset.day))} ({trClock(d.ankE.earliestSunset.sunset)}) batar; 21 Aralık&apos;ta batış saati{" "}
        {trClock(d.ankDec21.sunset)} olur. Sabahları ise tersine, güneş en geç {trLocative(trDayLabel(d.ankE.latestSunrise.month, d.ankE.latestSunrise.day))} ({trClock(d.ankE.latestSunrise.sunrise)}) doğar.
      </p>
      <p>
        Bunun nedeni Dünya&apos;nın yörüngesinin elips olması ve ekseninin eğik olmasıdır: güneşin gökyüzünde en tepeye çıktığı öğle anı yıl boyunca saate göre ileri geri kayar (zaman denklemi). Aralık sonunda öğle anı
        her gün yaklaşık yarım dakika gecikir; bu kayma hem sabahı hem akşamı ileri iter. Bu yüzden akşamlar aralık başından itibaren uzamaya başlar, sabahlar ocak başına kadar geç aydınlanır.
      </p>

      <h2 id="ekinoks">Ekinoksta gece ve gündüz eşit mi?</h2>
      <p>
        &quot;Ekinoks&quot; gece-gündüz eşitliği anlamına gelse de o gün gündüz biraz daha uzundur. {YEAR} mart ekinoksu günü ({trDayLabel(d.eqDay.getUTCMonth() + 1, d.eqDay.getUTCDate())}) Ankara&apos;da gündüz{" "}
        {durationLabel(d.ankEq.dayLength)} sürer. Bunun iki nedeni vardır: gün doğumu güneşin merkezi değil üst kenarı göründüğünde başlar ve hava ışığı kırdığı için güneş ufkun altındayken görünür. Ankara&apos;da
        gündüz ilk kez {trLocative(trDayLabel(d.equilux.month, d.equilux.day))} 12 saate ulaşır.
      </p>
      <p>
        Gün içindeki doğuş ve batış saatleri için <Link href={SUN_PATHS.sunrise}>güneş doğuşu ve batışı</Link> aracını kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

/* ---------------- Güneş açısı ve gölge boyu ---------------- */

const fx = formatTr;
const dg = (v: number) => `${fx(v, 1)}°`;

function shadowData() {
  const rows = provinces.map((p) => {
    const jun = noonElevation(YEAR, 6, 21, p.lat, p.lon);
    const dec = noonElevation(YEAR, 12, 21, p.lat, p.lon);
    return { p, jun, dec, decShadow: shadowLength(1, dec)!, junShadow: shadowLength(1, jun)! };
  });
  const ank = byId("ankara");
  const ankDec = noonElevation(YEAR, 12, 21, ank.lat, ank.lon);
  const ankJun = noonElevation(YEAR, 6, 21, ank.lat, ank.lon);
  // Örnek: güneye bakan pencere, karşıda 15 m bina, pencere 3 m yükseklikte, 20 m mesafe.
  const above = 15 - 3;
  const need = (Math.atan(above / 20) * 180) / Math.PI;
  const months = Array.from({ length: 12 }, (_, i) => ({ m: i + 1, ...directSunMinutes(YEAR, i + 1, 21, ank.lat, ank.lon, 180, above, 20) }));
  const dark = months.filter((r) => r.minutes === 0).map((r) => r.m);
  const decSun = months[11];
  const tilts = Array.from({ length: 12 }, (_, i) => perpendicularTilt(noonElevation(YEAR, i + 1, 15, ank.lat, ank.lon)));
  const avgTilt = tilts.reduce((a, b) => a + b, 0) / 12;
  const south = rows.reduce((a, b) => (b.dec > a.dec ? b : a));
  const north = rows.reduce((a, b) => (b.dec < a.dec ? b : a));
  return { rows, ankDec, ankJun, need, months, dark, decSun, avgTilt, south, north };
}

export function shadowMetadata(): Metadata {
  const d = shadowData();
  return meta(
    SUN_PATHS.shadow,
    "Güneş Açısı ve Gölge Boyu Hesaplama",
    `Güneşin yüksekliği ve yönü, gölge boyu, gölgeden yükseklik ve evin kışın güneş alıp almadığı. Ankara'da 21 Aralık öğle güneşi ${dg(d.ankDec)}, 1 m çubuğun gölgesi ${fx(shadowLength(1, d.ankDec)!, 2)} m.`,
  );
}

export function ShadowPage() {
  const d = shadowData();
  const ex10 = shadowLength(10, d.ankDec)!;
  const darkNames = d.dark.map((m) => ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"][m - 1]);
  const faq: FaqItem[] = [
    {
      question: "Gölge boyu nasıl hesaplanır?",
      answer: `Gölge boyu = cismin boyu ÷ tan(güneş yüksekliği). Ankara'da 21 Aralık öğlesinde güneş ${dg(d.ankDec)} yükseklikte olduğu için 10 m'lik bir ağacın gölgesi yaklaşık ${fx(ex10, 1)} m olur.`,
    },
    {
      question: "Gölgesini ölçerek bir binanın yüksekliğini bulabilir miyim?",
      answer: "Evet. Boyu bilinen bir çubuğu dik tutun, çubuğun ve binanın gölgesini aynı anda ölçün: bina yüksekliği = bina gölgesi × çubuk boyu ÷ çubuk gölgesi. Saat ya da konum bilmeniz gerekmez.",
    },
    {
      question: "Kışın güneş evime girer mi?",
      answer: `Karşı binanın pencerenizden ne kadar yüksek olduğuna ve aradaki mesafeye bağlıdır. Ankara'da güneye bakan bir pencerenin önünde 20 m ötede, pencereden 12 m yüksek bir bina varsa güneşin binayı aşması için ${dg(d.need)} yükseklikte olması gerekir; 21 Aralık öğlesinde güneş ${dg(d.ankDec)} yüksekliktedir.`,
    },
    {
      question: "Güneş paneli kaç derece eğimle konmalı?",
      answer: `Panelin öğle güneşine dik bakması için eğim 90° eksi öğle güneş yüksekliğidir; Ankara'da bu açı yıl boyunca ortalama ${dg(d.avgTilt)} olur. Yıllık üretimi en yüksek yapan sabit açı bulutluluğa da bağlı olduğu için kurulumdan önce bir üretim hesaplayıcısına bakın.`,
    },
  ];
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Saat ve Tarih" },
        { href: SUN_PATHS.shadow, label: "Güneş Açısı ve Gölge Boyu" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Güneş Açısı ve Gölge Boyu Hesaplama"
      intro="İl, tarih ve saat seçin; güneşin ufuktan yüksekliğini, yönünü ve bir cismin gölge boyunu görün. Gölgeden bina ya da ağaç yüksekliği bulun, evinizin kışın güneş alıp almadığını ve güneş panelinin öğle güneşine dik açısını hesaplayın."
      tool={<ShadowTool cities={cities} />}
      related={{
        title: "İlgili araçlar",
        links: [
          { href: SUN_PATHS.sunrise, label: "Güneş Doğuşu ve Batışı" },
          { href: SUN_PATHS.solstice, label: "En Uzun ve En Kısa Gün" },
          { href: "/gunes-paneli-amortisman-hesaplama", label: "Güneş Paneli Amortismanı" },
          { href: "/kible-yonu-hesaplama", label: "Kıble Yönü" },
        ],
      }}
      tocTitle="Bu sayfada"
      tocItems={[
        { id: "formul", label: "Gölge boyu nasıl hesaplanır?" },
        { id: "iller", label: "81 ilde öğle güneşi ve gölge" },
        { id: "kis", label: "Evim kışın güneş alır mı?" },
        { id: "yukseklik", label: "Gölgeyle yükseklik ölçme" },
        { id: "panel", label: "Güneş paneli eğimi" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faq}
    >
      <h2 id="formul">Gölge boyu nasıl hesaplanır?</h2>
      <p>
        Güneş ışınları paralel geldiği için cisim, gölgesi ve ışın bir dik üçgen oluşturur. Güneşin ufuktan yüksekliği α ise gölge boyu = boy ÷ tan α olur. Güneş 45°&apos;deyken gölge boya eşittir; 30°&apos;de boyun
        yaklaşık 1,73 katı, 15°&apos;de 3,7 katıdır. Ankara&apos;da 21 Aralık öğlesinde güneş {dg(d.ankDec)} yüksekliktedir ve 10 m&apos;lik bir ağacın gölgesi {fx(ex10, 1)} m uzar; 21 Haziran öğlesinde güneş{" "}
        {dg(d.ankJun)}&apos;e çıkar ve aynı ağacın gölgesi {fx(shadowLength(10, d.ankJun)!, 1)} m&apos;ye kısalır.
      </p>
      <p>
        Gölge, güneşin tam ters yönüne düşer. Türkiye kuzey yarımkürede ve Yengeç dönencesinin kuzeyinde olduğu için öğle güneşi her zaman güneydedir; öğle gölgesi de her zaman kuzeyi gösterir. Bu yüzden öğle
        gölgesiyle kuzey yönü bulunabilir.
      </p>

      <h2 id="iller">81 ilde öğle güneşi ve gölge ({YEAR})</h2>
      <p>
        Güneye gidildikçe öğle güneşi yükselir: 21 Aralık&apos;ta öğle güneşi en yüksek {trLocative(d.south.p.name)} ({dg(d.south.dec)}), en alçak {trLocative(d.north.p.name)} ({dg(d.north.dec)}) olur. Tablodaki
        gölge boyları 1 m&apos;lik dik bir çubuk içindir; başka bir boy için çarpın.
      </p>
      <Table
        caption={`İl merkezlerinde öğle güneşinin yüksekliği ve 1 m çubuğun öğle gölgesi, ${YEAR}`}
        head={["İl", "21 Haziran öğle güneşi", "1 m gölge (Haziran)", "21 Aralık öğle güneşi", "1 m gölge (Aralık)"]}
        rows={d.rows.map((r) => [ilLink(r.p), dg(r.jun), `${fx(r.junShadow, 2)} m`, dg(r.dec), `${fx(r.decShadow, 2)} m`])}
      />

      <h2 id="kis">Evim kışın güneş alır mı?</h2>
      <p>
        Pencerenin güneş alması için güneşin karşıdaki binanın üst kenarını aşması gerekir. Karşı bina pencerenizden h metre yüksek ve d metre uzaktaysa gereken güneş yüksekliği atan(h ÷ d) olur. Güneş cepheye
        yandan geldiğinde ışın binaya daha uzun yoldan ulaştığı için bu açı küçülür; araç bunu da hesaba katar.
      </p>
      <p>
        Örnek: Ankara&apos;da güneye bakan bir pencere 3 m yükseklikte, karşısındaki 15 m&apos;lik bina 20 m uzakta olsun. Güneşin binayı aşması için {dg(d.need)} yükseklikte olması gerekir.{" "}
        {d.dark.length
          ? `Bu durumda pencere ${darkNames.join(", ")} aylarının 21'inde hiç doğrudan güneş almaz.`
          : `Bu durumda pencere 21 Aralık'ta günde ${durationLabel(d.decSun.minutes)} doğrudan güneş alır.`}{" "}
        Ev bakarken karşı binanın yüksekliğini ve mesafesini araçtaki &quot;Evim güneş alır mı?&quot; sekmesine girerek her ay için güneş alma süresini görebilirsiniz.
      </p>

      <h2 id="yukseklik">Gölgeyle yükseklik ölçme</h2>
      <p>
        Bir binanın ya da ağacın boyunu ölçmek için iki yol vardır. Birincisi güneş açısını kullanmaktır: gölgeyi ölçtüğünüz tarih ve saati araca girin, yükseklik = gölge × tan α hesaplanır. İkincisi tarih ve saat
        gerektirmez: boyu bilinen bir çubuğu dik tutup çubuğun ve cismin gölgesini aynı anda ölçersiniz. Benzer üçgenlerden yükseklik = cismin gölgesi × çubuk boyu ÷ çubuk gölgesi bulunur. Antik çağda Thales&apos;in
        piramidin yüksekliğini bu yolla ölçtüğü anlatılır.
      </p>

      <h2 id="panel">Güneş paneli eğimi</h2>
      <p>
        Güneye bakan bir panel, eğimi 90° eksi öğle güneş yüksekliği olduğunda öğle güneşine tam dik bakar. Ankara&apos;da bu açı haziranda {dg(perpendicularTilt(d.ankJun))}, aralıkta{" "}
        {dg(perpendicularTilt(d.ankDec))}, yıl ortalamasında {dg(d.avgTilt)} olur. Sabit panellerde yıllık üretimi en yükselten açı bulutluluk ve dağınık ışık nedeniyle bu geometrik değerden birkaç derece farklı
        olabilir. Yatırımın geri dönüşü için <Link href="/gunes-paneli-amortisman-hesaplama">güneş paneli amortisman hesaplama</Link> aracını kullanın.
      </p>
    </TimeToolPage>
  );
}

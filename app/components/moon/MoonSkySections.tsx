import Link from "@/app/components/SiteLink";
import { moonPhasesBetween } from "../../converter/time/moon";
import { moonPosition, moonSign, signIngresses, ZODIAC_EN, ZODIAC_TR } from "../../converter/time/moonPosition";

// Ay evreleri sayfasının iki bölümü: Ay'ın bulunduğu burç (tropikal zodyak) ve yılın en yakın / en uzak dolunayları.
// Değerler derleme anında hesaplanır; site her gece yeniden derlenir.

const DAY = 86400000;

function formatter(lang: "tr" | "en", withTime: boolean) {
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    timeZone: lang === "tr" ? "Europe/Istanbul" : "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : { year: "numeric" }),
  });
}

export function MoonSignSection({ lang, now }: { lang: "tr" | "en"; now: Date }) {
  const tr = lang === "tr";
  const names = tr ? ZODIAC_TR : ZODIAC_EN;
  const fmt = formatter(lang, true);
  const current = moonSign(now);
  const list = signIngresses(now, new Date(now.getTime() + 15 * DAY));
  return (
    <>
      <h2 id="burc">{tr ? "Ay bugün hangi burçta?" : "Which zodiac sign is the Moon in?"}</h2>
      <p>
        {tr ? (
          <>
            Ay şu an <strong>{names[current.sign]}</strong> burcunda; {fmt.format(current.ingress)} sularında{" "}
            <strong>{names[current.next]}</strong> burcuna geçer. Ay gökyüzünde her gün yaklaşık 13° ilerlediği için bir burçta ortalama 2,5 gün
            kalır ve bütün burçları 27,3 günde dolaşır.
          </>
        ) : (
          <>
            The Moon is in <strong>{names[current.sign]}</strong> and enters <strong>{names[current.next]}</strong> on {fmt.format(current.ingress)} (UTC).
            It moves about 13° a day, spending roughly 2.5 days in each sign.
          </>
        )}
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Burç" : "Sign"}</th>
              <th>{tr ? "Ay'ın girişi (Türkiye saati)" : "Moon enters (UTC)"}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e) => (
              <tr key={e.at.getTime()}>
                <td>
                  <strong>{names[e.sign]}</strong>
                </td>
                <td>{fmt.format(e.at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tr && (
        <p>
          Burç, Ay&apos;ın ekliptik boylamının 30°&apos;lik dilimlere bölünmesiyle bulunur (tropikal zodyak: 0° Koç, ilkbahar ekinoksu noktasıdır).
          Hesap Jean Meeus&apos;un Ay konumu formülleriyle yapılır; geçiş saatleri birkaç dakika içinde doğrudur. Bu bölüm Ay&apos;ın gökyüzündeki
          konumunu verir, astrolojik yorum içermez. Burçlar, aynı adı taşıyan takımyıldızlarla artık örtüşmez: yer ekseninin yalpalaması
          (presesyon) yüzünden Ay, Koç burcundayken çoğu zaman Balık takımyıldızının önünde görünür. Doğduğunuz andaki Ay burcunu ve yükselen
          burcu <Link href="/yukselen-burc-hesaplama">yükselen burç hesaplama</Link> aracıyla bulabilirsiniz.
        </p>
      )}
    </>
  );
}

export function SupermoonSection({ lang, now }: { lang: "tr" | "en"; now: Date }) {
  const tr = lang === "tr";
  const year = Number(new Intl.DateTimeFormat("en", { timeZone: "Europe/Istanbul", year: "numeric" }).format(now));
  const fmt = formatter(lang, true);
  const years = [year, year + 1].map((y) => {
    const fulls = moonPhasesBetween(new Date(Date.UTC(y, 0, 1) - 3 * 3600000), new Date(Date.UTC(y + 1, 0, 1) - 3 * 3600000))
      .filter((e) => e.kind === "full")
      .map((e) => ({ date: e.date, km: moonPosition(e.date).distance }));
    const near = fulls.reduce((a, b) => (b.km < a.km ? b : a));
    const far = fulls.reduce((a, b) => (b.km > a.km ? b : a));
    return { y, fulls, near, far };
  });
  const km = (v: number) => Math.round(v).toLocaleString(tr ? "tr-TR" : "en-US");
  const first = years[0];
  const bigger = Math.round((first.far.km / first.near.km - 1) * 100);
  return (
    <>
      <h2 id="super-ay">{tr ? "Süper ay ve mikro ay: yılın en büyük ve en küçük dolunayı" : "Supermoon and micromoon"}</h2>
      <p>
        {tr ? (
          <>
            Ay&apos;ın yörüngesi elips olduğu için Dünya&apos;ya uzaklığı yaklaşık 356.500 ile 406.700 km arasında değişir. Dünya&apos;ya en yakınken
            gerçekleşen dolunaya &quot;süper ay&quot;, en uzaktayken gerçekleşene &quot;mikro ay&quot; denir. {first.y} yılının en yakın dolunayı{" "}
            <strong>{fmt.format(first.near.date)}</strong> ({km(first.near.km)} km), en uzak dolunayı <strong>{fmt.format(first.far.date)}</strong> (
            {km(first.far.km)} km). Süper ay, mikro aya göre gökyüzünde yaklaşık %{bigger} daha büyük görünür; fark gözle yan yana
            konmadan zor anlaşılır.
          </>
        ) : (
          <>
            The Moon&apos;s distance varies between about 356,500 and 406,700 km. The closest full moon of {first.y} is on {fmt.format(first.near.date)} (
            {km(first.near.km)} km) and the farthest on {fmt.format(first.far.date)} ({km(first.far.km)} km); the closest looks about {bigger}% larger.
          </>
        )}
      </p>
      {years.map(({ y, fulls, near, far }) => (
        <div className="conversion-table-wrap" key={y}>
          <table className="conversion-table">
            <caption>{tr ? `${y} dolunayları ve Ay'ın uzaklığı` : `${y} full moons and distance`}</caption>
            <thead>
              <tr>
                <th>{tr ? "Dolunay (Türkiye saati)" : "Full moon (UTC)"}</th>
                <th>{tr ? "Uzaklık" : "Distance"}</th>
                <th>{tr ? "Not" : "Note"}</th>
              </tr>
            </thead>
            <tbody>
              {fulls.map((f) => (
                <tr key={f.date.getTime()}>
                  <td>{fmt.format(f.date)}</td>
                  <td>{km(f.km)} km</td>
                  <td>{f === near ? (tr ? "Yılın en büyük dolunayı (süper ay)" : "Closest (supermoon)") : f === far ? (tr ? "Yılın en küçük dolunayı (mikro ay)" : "Farthest (micromoon)") : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {tr && (
        <p>
          Uzaklıklar Dünya&apos;nın merkezinden Ay&apos;ın merkezine ölçülür ve Meeus&apos;un formülleriyle hesaplanır; yayımlanmış süper ay tablolarıyla
          birkaç kilometre içinde örtüşür. &quot;Süper ay&quot; için kullanılan uzaklık eşiği kaynaklara göre değiştiği için tabloda her yılın
          yalnızca en yakın ve en uzak dolunayı işaretlenmiştir.
        </p>
      )}
    </>
  );
}

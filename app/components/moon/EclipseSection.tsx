import { LUNAR_ECLIPSES, SOLAR_ECLIPSES, TURKEY_SOLAR_DETAILS } from "../../converter/time/eclipses";

// Ay ve Gunes tutulmalari (2026-2035). Gecmis tutulmalar her gece yeniden yayinda elenir.

const LUNAR_KIND = {
  tr: { total: "Tam ay tutulması", partial: "Parçalı ay tutulması", penumbral: "Yarı gölge ay tutulması" },
  en: { total: "Total lunar eclipse", partial: "Partial lunar eclipse", penumbral: "Penumbral lunar eclipse" },
} as const;
const SOLAR_KIND = {
  tr: { total: "Tam güneş tutulması", annular: "Halkalı güneş tutulması", partial: "Parçalı güneş tutulması", hybrid: "Melez güneş tutulması" },
  en: { total: "Total solar eclipse", annular: "Annular solar eclipse", partial: "Partial solar eclipse", hybrid: "Hybrid solar eclipse" },
} as const;
const VIS_TR = { full: "Evet", partly: "Kısmen (Ay doğarken ya da batarken)", none: "Hayır" } as const;

export default function EclipseSection({ lang, now }: { lang: "tr" | "en"; now: Date }) {
  const tr = lang === "tr";
  const locale = tr ? "tr-TR" : "en-US";
  const timeZone = tr ? "Europe/Istanbul" : "UTC";
  const fmt = (iso: string, withTime = true) =>
    new Intl.DateTimeFormat(locale, {
      timeZone,
      day: "numeric",
      month: "long",
      year: "numeric",
      ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    }).format(new Date(iso));
  const upcoming = <T extends { peak: string }>(list: T[]) => list.filter((e) => new Date(e.peak).getTime() > now.getTime() - 86400000);
  const lunar = upcoming(LUNAR_ECLIPSES);
  const solar = upcoming(SOLAR_ECLIPSES);
  const solarTr = solar.filter((e) => e.obscuration.ankara > 0 || e.obscuration.istanbul > 0 || e.obscuration.van > 0);
  const solarElsewhere = solar.filter((e) => !solarTr.includes(e));
  const dayKey = (iso: string) => iso.slice(0, 10);
  const annular2030 = TURKEY_SOLAR_DETAILS["2030-06-01"];

  if (!tr) {
    return (
      <>
        <h2 id="eclipses">Lunar and solar eclipses (to 2035)</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>Date and time of maximum (UTC)</th>
                <th>Eclipse</th>
              </tr>
            </thead>
            <tbody>
              {[...lunar.map((e) => ({ peak: e.peak, label: LUNAR_KIND.en[e.kind] })), ...solar.map((e) => ({ peak: e.peak, label: SOLAR_KIND.en[e.kind] }))]
                .sort((a, b) => a.peak.localeCompare(b.peak))
                .map((e) => (
                  <tr key={e.peak}>
                    <td>{fmt(e.peak)}</td>
                    <td>{e.label}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className="moon-strip-note">
          Computed with the astronomy-engine library and checked against published eclipse lists. Never look at the Sun without a certified
          eclipse filter (ISO 12312-2), even during a partial eclipse.
        </p>
      </>
    );
  }

  return (
    <>
      <h2 id="tutulmalar">Ay ve Güneş tutulmaları (2035&apos;e kadar)</h2>
      <p>
        Ay tutulması dolunayda, Dünya&apos;nın gölgesi Ay&apos;ın üzerine düştüğünde; Güneş tutulması ise yeni ayda, Ay Güneş&apos;in önünden
        geçtiğinde olur. Her dolunayda tutulma olmaz, çünkü Ay&apos;ın yörüngesi Dünya&apos;nınkine yaklaşık 5° eğiktir. Aşağıdaki tarihler ve
        Türkiye&apos;den görünürlük, il merkezlerine göre hesaplanmıştır.
      </p>

      {annular2030 && new Date("2030-06-01T12:00Z") > now && (
        <div className="moon-eclipse-highlight">
          <h3>1 Haziran 2030: Türkiye&apos;den halkalı güneş tutulması</h3>
          <p>
            Bu tutulmanın halkalı evre yolu Türkiye&apos;nin kuzeybatısından geçer. Halkalı evre şu il merkezlerinden görülür:{" "}
            <strong>{annular2030.annular?.join(", ")}</strong>. İzmir ve Manisa&apos;nın kuzeyindeki {annular2030.annularDistricts?.join(", ")}{" "}
            gibi ilçeler de yolun içindedir. Halkalı evre yere göre birkaç dakika sürer ve Türkiye saatiyle yaklaşık{" "}
            {annular2030.annularWindow?.replace("-", " ile ")} arasında yaşanır. Türkiye&apos;nin geri kalanında parçalı tutulma görülür; Güneş&apos;in
            %{annular2030.min[1]} ({annular2030.min[0]}) ile %{annular2030.max[1]} ({annular2030.max[0]}) arasındaki kısmı örtülür.
          </p>
        </div>
      )}

      <h3>Türkiye&apos;den görülecek Güneş tutulmaları</h3>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Tutulma (dünya genelinde)</th>
              <th>Türkiye&apos;de örtülme (parçalı)</th>
              <th>Ankara&apos;da en yüksek an</th>
            </tr>
          </thead>
          <tbody>
            {solarTr.map((e) => {
              const d = TURKEY_SOLAR_DETAILS[dayKey(e.peak)];
              return (
                <tr key={e.peak}>
                  <td>{fmt(e.peak, false)}</td>
                  <td>{SOLAR_KIND.tr[e.kind]}</td>
                  <td>
                    {d ? `%${d.min[1]} (${d.min[0]}) – %${d.max[1]} (${d.max[0]})` : `%${e.obscuration.ankara} (Ankara)`}
                    {d?.annular ? "; kuzeybatıda halkalı" : ""}
                  </td>
                  <td>{e.ankaraPeak ? fmt(e.ankaraPeak).split(" ").slice(-1)[0] : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3>Ay tutulmaları</h3>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Tutulmanın en yüksek anı (TSİ)</th>
              <th>Tutulma</th>
              <th>Tam evre</th>
              <th>Türkiye&apos;den görünür mü?</th>
            </tr>
          </thead>
          <tbody>
            {lunar.map((e) => (
              <tr key={e.peak}>
                <td>{fmt(e.peak)}</td>
                <td>{LUNAR_KIND.tr[e.kind]}</td>
                <td>{e.totalMinutes > 0 ? `${e.totalMinutes} dakika` : "—"}</td>
                <td>{VIS_TR[e.turkey]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="moon-strip-note">
        Yarı gölge ay tutulmalarında Ay yalnızca hafifçe kararır ve çoğu zaman gözle fark edilmez. Ay tutulmasını çıplak gözle izlemek
        güvenlidir.
      </p>

      {solarElsewhere.length > 0 && (
        <p>
          <strong>Türkiye&apos;den görülmeyen Güneş tutulmaları:</strong>{" "}
          {solarElsewhere.map((e) => `${fmt(e.peak, false)} (${SOLAR_KIND.tr[e.kind].replace(" güneş tutulması", "")})`).join(", ")}.
        </p>
      )}

      <p className="moon-strip-note">
        <strong>Göz güvenliği:</strong> Güneş tutulmasını, parçalı evrede bile, güneş gözlüğüyle ya da çıplak gözle izlemeyin. ISO 12312-2
        standardına uygun tutulma gözlüğü kullanın; dürbün, teleskop ve fotoğraf makinesi için ayrıca güneş filtresi gerekir. Hesaplar
        astronomy-engine kütüphanesiyle yapılmış ve yayımlanmış tutulma listeleriyle karşılaştırılmıştır.
      </p>
    </>
  );
}

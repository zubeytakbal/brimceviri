import type { CountdownEvent, DateParts } from "../../converter/time/countdownEvents";
import GazeteBaslik from "../saat/GazeteBaslik";

// Türkçe geri sayım sayfalarının saat bölümü gazetesi: manşet, sıradaki tarih (takvim yaprağı, kalan gün, resmî tatil
// durumu, kaynak) ve yıllara göre tarihler. Sayfa her gün yeniden derlenir; kalan gün derleme gününe göredir
// (canlı sayaç başlıkta).

const TR = "Europe/Istanbul";
const tarihYaz = (p: DateParts, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("tr-TR", { timeZone: "UTC", ...o }).format(Date.UTC(p.year, p.month - 1, p.day));
const haftaGun = (g: number) => (g >= 7 ? `${Math.floor(g / 7)} hafta${g % 7 ? ` ${g % 7} gün` : ""}` : `${g} gün`);

export default function GeriSayimSahneleri({
  event,
  tarihler,
  kalan,
  basladi,
}: {
  event: CountdownEvent;
  tarihler: DateParts[];
  kalan: number;
  basladi: boolean;
}) {
  const an = new Date();
  const next = tarihler[0];
  const bugun = kalan === 0 && basladi;
  const manset = bugun ? `${event.name} bugün` : kalan === 0 ? `${event.name} yarın` : `${event.name}: ${kalan.toLocaleString("tr-TR")} gün kaldı`;
  const hicri = event.rule.kind === "hijri";
  // Manşet altında soru-cevap kalıbı ("Evet.", "Hayır,") düşülür.
  const tatil = event.holiday.replace(/^(Evet|Hayır)[.,]\s*/, "");
  const tatilCumlesi = tatil.charAt(0).toLocaleUpperCase("tr-TR") + tatil.slice(1);

  return (
    <div className="sahneler">
      <GazeteBaslik an={an} timeZone={TR} baski="Türkiye" />
      <div className="gazete-on is-fotosuz">
        <div className="gazete-manset-kutu">
          <p className="gazete-manset">{manset}</p>
          <p className="gazete-spot">
            {tarihYaz(next, { day: "numeric", month: "long", year: "numeric", weekday: "long" })}
            {next.estimated ? " (tahmini)" : ""}. {tatilCumlesi}
          </p>
        </div>
      </div>

      <section className="sahne is-sol" id="ozet">
        <p className="sahne-etiket">01 · Tarih ve kalan süre</p>
        <div className="sahne-takvim-satir">
          <div className="sahne-takvim" aria-hidden="true">
            <span>{tarihYaz(next, { month: "long" })}</span>
            <b>{next.day}</b>
            <span>{tarihYaz(next, { weekday: "long" })}</span>
          </div>
          <div>
            <h2 className="sahne-dev">{bugun ? "Bugün" : kalan === 0 ? "Yarın" : `${kalan.toLocaleString("tr-TR")} gün`}</h2>
            <p className="sahne-buyuk">
              <b>{tarihYaz(next, { day: "numeric", month: "long", year: "numeric" })}</b>, {tarihYaz(next, { weekday: "long" })}
              {next.estimated ? " (tahmini)" : ""}
            </p>
            <ul className="sahne-kucuk">
              {kalan >= 7 ? <li>{haftaGun(kalan)} sonra.</li> : null}
              <li>Resmî tatil mi? {event.holiday}</li>
              {event.source ? <li>Kaynak: {event.source}.</li> : null}
              <li>Sayaç Türkiye saatiyle 00:00&apos;a göre sayar.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sahne is-sag" id="yillar">
        <p className="sahne-etiket">02 · Yıllara göre {event.name} tarihleri</p>
        <table className="sahne-tablo">
          <thead>
            <tr>
              <th>Yıl</th>
              <th>Tarih</th>
              <th>Gün</th>
              {hicri && <th>Durum</th>}
            </tr>
          </thead>
          <tbody>
            {tarihler.map((p) => (
              <tr key={`${p.year}-${p.month}-${p.day}`}>
                <td>{p.year}</td>
                <td>{tarihYaz(p, { day: "numeric", month: "long" })}</td>
                <td>{tarihYaz(p, { weekday: "long" })}</td>
                {hicri && <td>{p.estimated ? "Tahmini (Hicri takvim)" : "Diyanet takvimi"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

import { moonPhasesBetween, moonState, phaseName, type PhaseKind, type PhaseName } from "../../converter/time/moon";
import { moonEventsForDay } from "../../converter/time/moonRiseSet";
import { moonSign, ZODIAC_TR } from "../../converter/time/moonPosition";
import GazeteBaslik from "../saat/GazeteBaslik";
import MoonIcon from "./MoonIcon";

// Ay evreleri sayfasının saat bölümü "gazetesi": dev Ay başlığının altında manşet, sıradaki ana evreler ve bu gece
// İstanbul'da ayın doğuş-batışı. Şehir sayfalarındaki gibi .sahne-* düzeni; sayfa her gün yeniden derlenir, sayılar
// derleme anına göredir (canlı değerler başlıkta).

const TR = "Europe/Istanbul";
const GUN = 86400000;
const ISTANBUL = { lat: 41.01, lon: 28.98 };

const tarihYaz = (d: Date, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("tr-TR", { timeZone: TR, ...o }).format(d);
const saatYaz = (d: Date | null) => (d ? tarihYaz(d, { hour: "2-digit", minute: "2-digit" }) : "—");

/** Türkiye saatiyle bugünün gece yarısı. */
function bugunBasi(an: Date) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: TR, year: "numeric", month: "2-digit", day: "2-digit" }).format(an).split("-").map(Number);
  return new Date(Date.UTC(p[0], p[1] - 1, p[2]) - 3 * 3600000);
}

export default function AySahneleri({ adlar, anaAdlar }: { adlar: Record<PhaseName, string>; anaAdlar: Record<PhaseKind, string> }) {
  const an = new Date();
  const durum = moonState(an);
  const evre = phaseName(durum.age);
  const burc = moonSign(an);
  const sirada = moonPhasesBetween(an, new Date(an.getTime() + 40 * GUN)).slice(0, 4);
  const ilk = sirada[0];
  const ilkGun = Math.max(0, Math.round((bugunBasi(ilk.date).getTime() - bugunBasi(an).getTime()) / GUN));
  const dolunay = sirada.find((e) => e.kind === "full");
  const yeniAy = sirada.find((e) => e.kind === "new");
  const gunSonra = (d: Date) => Math.round((bugunBasi(d).getTime() - bugunBasi(an).getTime()) / GUN);
  const yuzde = Math.round(durum.illumination * 100);
  const manset = durum.waxing
    ? dolunay
      ? `Ay %${yuzde} aydınlık, dolunaya ${gunSonra(dolunay.date)} gün`
      : `Ay %${yuzde} aydınlık ve büyüyor`
    : yeniAy
      ? `Ay küçülüyor: %${yuzde}, yeni aya ${gunSonra(yeniAy.date)} gün`
      : `Ay %${yuzde} aydınlık ve küçülüyor`;
  const bugun = bugunBasi(an);
  const gece = moonEventsForDay(bugun, ISTANBUL.lat, ISTANBUL.lon);
  const yarin = moonEventsForDay(new Date(bugun.getTime() + GUN), ISTANBUL.lat, ISTANBUL.lon);
  // Bu geceki doğuş ve ondan sonraki ilk batış (ay gece yarısından sonra batabilir).
  const dogus = gece.rise ?? yarin.rise;
  const batis = [gece.set, yarin.set].find((d) => d && dogus && d > dogus) ?? null;
  const tepe = [gece.transit, yarin.transit].find((d) => d && dogus && d > dogus) ?? null;

  return (
    <div className="sahneler">
      <GazeteBaslik an={an} timeZone={TR} baski="Türkiye" ad="Ay Takvimi" />
      <div className="gazete-on">
        <div className="gazete-manset-kutu">
          <p className="gazete-manset">{manset}</p>
          <p className="gazete-spot">
            {adlar[evre]} · ay yaşı {durum.age.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} gün · {ZODIAC_TR[burc.sign]} burcunda · Türkiye&apos;den
            bakıldığında ay sağdan dolar, sağdan boşalır
          </p>
        </div>
        <figure className="gazete-foto ay-gazete-foto">
          <span className="gazete-foto-cerceve">
            <MoonIcon fraction={durum.fraction} size={480} label={`Ay, ${tarihYaz(an, { day: "numeric", month: "long" })}: ${adlar[evre]}`} />
          </span>
          <figcaption>
            Ay, {tarihYaz(an, { day: "numeric", month: "long", year: "numeric" })}: {adlar[evre].toLocaleLowerCase("tr-TR")}, %{yuzde} aydınlık (hesaplanan
            görünüm). Görüntü: NASA Scientific Visualization Studio
          </figcaption>
        </figure>
      </div>

      <section className="sahne is-sol" id="ozet">
        <p className="sahne-etiket">01 · Sıradaki ana evre</p>
        <div className="sahne-takvim-satir">
          <div className="sahne-takvim" aria-hidden="true">
            <span>{tarihYaz(ilk.date, { month: "long" })}</span>
            <b>{tarihYaz(ilk.date, { day: "numeric" })}</b>
            <span>{tarihYaz(ilk.date, { weekday: "long" })}</span>
          </div>
          <div>
            <h2 className="sahne-dev">{ilkGun === 0 ? "Bugün" : `${ilkGun} gün sonra`}</h2>
            <p className="sahne-buyuk">
              <b>{anaAdlar[ilk.kind].toLocaleLowerCase("tr-TR")}</b>, saat {saatYaz(ilk.date)}
            </p>
            <ul className="sahne-kucuk">
              {sirada.map((e) => (
                <li key={e.date.getTime()}>
                  {anaAdlar[e.kind]}: {tarihYaz(e.date, { day: "numeric", month: "long", weekday: "long" })}, {saatYaz(e.date)}
                </li>
              ))}
              <li>Saatler Türkiye saatidir; ana evreler tek bir andır, ay o günün önü ve arkasında da aynı görünür.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sahne is-sag" id="bu-gece">
        <p className="sahne-etiket">02 · Bu gece İstanbul&apos;da ay</p>
        <div className="sahne-gunes-satir">
          <div>
            <small>Doğuş</small>
            <h2 className="sahne-dev">{saatYaz(dogus)}</h2>
          </div>
          <div>
            <small>Batış</small>
            <p className="sahne-dev">{saatYaz(batis)}</p>
          </div>
        </div>
        <p className="sahne-buyuk">
          en yüksek noktası <b>{saatYaz(tepe)}</b>
        </p>
        <ul className="sahne-kucuk">
          <li>Ay her gün ortalama 50 dakika geç doğar; şehre göre bir saate kadar fark olur.</li>
          <li>
            <a href="#dogus">81 il ve dünya şehirleri için doğuş ve batış saatleri →</a>
          </li>
        </ul>
      </section>
    </div>
  );
}

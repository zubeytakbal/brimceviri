import { alarmPresetTimes } from "../../i18n/timeToolPaths";
import GazeteBaslik from "../saat/GazeteBaslik";
import { bedTimeFor } from "./AlarmPresetTable";

// Alarm sayfasının saat bölümü gazetesi: manşet, kalkış saatine göre yatış saati tablosu (90 dakikalık uyku
// döngüsü + 15 dakika uykuya dalma) ve alarmın güvenle çalması için notlar. Sabit bilgiler; yalnızca tarih satırı günlüktür.

const TR = "Europe/Istanbul";
const DONGU = [6, 5, 4] as const;

export default function AlarmSahneleri() {
  const an = new Date();
  return (
    <div className="sahneler">
      <GazeteBaslik an={an} timeZone={TR} baski="Türkiye" ad="Alarm Saati" />
      <div className="gazete-on is-fotosuz">
        <div className="gazete-manset-kutu">
          <p className="gazete-manset">Alarmı uyku döngüsünün sonuna kurun</p>
          <p className="gazete-spot">
            Uyku yaklaşık 90 dakikalık döngülerle ilerler. Bir döngünün ortasında çalan alarm sersem uyandırır; sonunda çalan alarm daha
            dinç. 7:00&apos;de kalkacaksanız 21:45, 23:15 ya da 00:45&apos;te yatmak döngüleri tam bitirir.
          </p>
        </div>
      </div>

      <section className="sahne is-sol" id="saatler">
        <p className="sahne-etiket">01 · Kalkış saatine göre yatış saati</p>
        <h2 className="sahne-dev">90 dakika</h2>
        <p className="sahne-buyuk">
          bir uyku döngüsü; uykuya dalmaya <b>15 dakika</b> eklendi
        </p>
        <table className="sahne-tablo">
          <caption>Saate dokunun, alarm o saate ayarlansın</caption>
          <thead>
            <tr>
              <th>Kalkış</th>
              {DONGU.map((c) => (
                <th key={c}>
                  {c} döngü ({(c * 1.5).toLocaleString("tr-TR")} sa)
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alarmPresetTimes.map((t) => (
              <tr key={t}>
                <td>
                  <a href={`?t=${t}`} rel="nofollow">
                    {t}
                  </a>
                </td>
                {DONGU.map((c) => (
                  <td key={c}>{bedTimeFor(t, c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="sahne is-sag" id="guvenilir">
        <p className="sahne-etiket">02 · Alarmın güvenle çalması için</p>
        <h2 className="sahne-dev">Sekme açık</h2>
        <p className="sahne-buyuk">
          alarm tarayıcıda çalar; <b>sekmeyi kapatmayın</b>
        </p>
        <ul className="sahne-kucuk">
          <li>Başka sekmeye geçmek sorun değildir; sekmeyi kapatmak alarmı da kapatır.</li>
          <li>Bilgisayar uyku moduna geçerse alarm çalmaz; &quot;Ekranı açık tut&quot; ya da &quot;Gece modu&quot;nu kullanın.</li>
          <li>Telefonda ekran kilitlenince tarayıcı durabilir: gece modunda, şarjda bırakın.</li>
          <li>Cihazın sesini kontrol edin; kulaklık takılıysa ses oradan gelir. &quot;Sesi dene&quot; ile önceden deneyin.</li>
          <li>Kaçırılmaması gereken uyanışlarda telefonun kendi alarmını yedek kurun.</li>
        </ul>
      </section>
    </div>
  );
}

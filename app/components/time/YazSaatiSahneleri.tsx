import Link from "@/app/components/SiteLink";
import { BOLGELER, farkMetni, sonrakiGecisler, TR_FARK, utcFarki, yilGecisleri, YAZ_SAATI_SEHIRLERI } from "../../converter/time/yazSaati";
import GazeteBaslik from "../saat/GazeteBaslik";

// Yaz saati sayfasının saat bölümü gazetesi: manşet (Avrupa'daki sıradaki geçiş, Türkiye'de değişiklik yok),
// Türkiye ile saat farkının geçişten önce ve sonra nasıl değiştiği, yıllara göre geçiş tarihleri. Bütün tarih ve
// farklar saat dilimi verisinden hesaplanır (app/converter/time/yazSaati.ts); site her gün yeniden derlenir.

const TR = "Europe/Istanbul";
const tarih = (an: number, o: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric", weekday: "long" }) =>
  new Intl.DateTimeFormat("tr-TR", { timeZone: TR, ...o }).format(an);
const saat = (an: number) => new Intl.DateTimeFormat("tr-TR", { timeZone: TR, hour: "2-digit", minute: "2-digit" }).format(an);
const yon = (once: number, sonra: number) => (sonra < once ? "geri" : "ileri");

export default function YazSaatiSahneleri() {
  const an = new Date().getTime();
  const ab = sonrakiGecisler("Europe/Berlin", an, 1)[0];
  const yil = new Date(an).getUTCFullYear();
  const yillar = [yil, yil + 1, yil + 2, yil + 3, yil + 4];
  const satirlar = YAZ_SAATI_SEHIRLERI.map((c) => {
    const g = sonrakiGecisler(c.tz, an, 1)[0];
    const simdi = TR_FARK - utcFarki(c.tz, an);
    const sonra = g ? TR_FARK - g.sonra : simdi;
    return { ...c, simdi, sonra, gecis: g };
  });

  return (
    <div className="sahneler">
      <GazeteBaslik an={new Date(an)} timeZone={TR} baski="Türkiye" />
      <div className="gazete-on is-fotosuz">
        <div className="gazete-manset-kutu">
          <p className="gazete-manset">
            {ab ? `Avrupa'da saatler ${tarih(ab.an, { day: "numeric", month: "long" })} günü ${yon(ab.once, ab.sonra)} alınıyor, Türkiye'de değişmiyor` : "Türkiye'de saatler değişmiyor"}
          </p>
          <p className="gazete-spot">
            Türkiye&apos;de saatler en son 2016 baharında ileri alındı ve o günden beri geri alınmadı; ülke yıl boyunca UTC+3 kullanıyor.
            Saat değiştiren ülkelerle aradaki fark ise yılda iki kez 1 saat değişir.
          </p>
        </div>
      </div>

      <section className="sahne is-sol" id="fark">
        <p className="sahne-etiket">01 · Türkiye ile saat farkı</p>
        <h2 className="sahne-dev">{ab ? `${tarih(ab.an, { day: "numeric", month: "long" })} sonrası` : "Saat farkı"}</h2>
        <p className="sahne-buyuk">
          bir sonraki geçişten <b>önce</b> ve <b>sonra</b> Türkiye&apos;nin kaç saat önde olduğu
        </p>
        <table className="sahne-tablo">
          <thead>
            <tr>
              <th>Şehir</th>
              <th>Şu an</th>
              <th>Geçişten sonra</th>
              <th>Geçiş</th>
            </tr>
          </thead>
          <tbody>
            {satirlar.map((s) => (
              <tr key={s.slug}>
                <td>
                  <Link href={`/dunya-saatleri/${s.slug}`} prefetch={false}>
                    {s.ad}
                  </Link>{" "}
                  <small>({s.ulke})</small>
                </td>
                <td>
                  {s.simdi === 0 ? "aynı saat" : `${farkMetni(s.simdi)} ${s.simdi > 0 ? "ileri" : "geri"}`}
                </td>
                <td>
                  <b>{s.sonra === 0 ? "aynı saat" : `${farkMetni(s.sonra)} ${s.sonra > 0 ? "ileri" : "geri"}`}</b>
                </td>
                <td>{s.gecis ? tarih(s.gecis.an, { day: "numeric", month: "long" }) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="sahne-kucuk">
          <li>&quot;İleri&quot;: Türkiye o şehirden ileride (orada saat daha erken); &quot;geri&quot;: Türkiye geride (Sidney gibi).</li>
          <li>Aynı ülkede de bölgeye göre saat değişebilir; tablodaki şehirlerin saat dilimine göredir.</li>
        </ul>
      </section>

      <section className="sahne is-sag" id="tarihler">
        <p className="sahne-etiket">02 · Yıllara göre saat geçişleri</p>
        <table className="sahne-tablo">
          <thead>
            <tr>
              <th>Yıl</th>
              {BOLGELER.map((b) => (
                <th key={b.tz}>{b.ad}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yillar.map((y) => (
              <tr key={y}>
                <td>{y}</td>
                {BOLGELER.map((b) => (
                  <td key={b.tz}>
                    {yilGecisleri(b.tz, y).map((g) => (
                      <span key={g.an} style={{ display: "block" }}>
                        {tarih(g.an, { day: "numeric", month: "long" })}: {yon(g.once, g.sonra)}
                      </span>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="sahne-kucuk">
          {BOLGELER.map((b) => (
            <li key={b.tz}>
              {b.ad}: {b.kural}.
            </li>
          ))}
          <li>Türkiye saatiyle geçiş anı: Avrupa&apos;da {ab ? saat(ab.an) : "04:00"}; tarih sütunlarında Türkiye takvimine göre gün yazılır.</li>
        </ul>
      </section>
    </div>
  );
}

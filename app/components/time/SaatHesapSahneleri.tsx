import GazeteBaslik from "../saat/GazeteBaslik";

// Saat hesaplama sayfasının saat bölümü gazetesi: dakikanın ondalık saat karşılığı (puantaj ve mesai formları için)
// ve İş Kanunu'na göre ara dinlenme ve haftalık çalışma sınırı. Sabit bilgiler; yalnızca tarih satırı günlüktür.

const TR = "Europe/Istanbul";
const DAKIKALAR = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export default function SaatHesapSahneleri() {
  const an = new Date();
  return (
    <div className="sahneler">
      <GazeteBaslik an={an} timeZone={TR} baski="Türkiye" />
      <div className="gazete-on is-fotosuz">
        <div className="gazete-manset-kutu">
          <p className="gazete-manset">Saatler 60&apos;lık, hesap makinesi 10&apos;luk sayar</p>
          <p className="gazete-spot">
            8:45 ile 1:30 toplanınca 9:75 değil 10:15 olur; çünkü bir saat 100 değil 60 dakikadır. Puantaj ve mesai formlarında
            istenen &quot;ondalık saat&quot; ise dakikanın 60&apos;a bölünmesiyle bulunur: 45 dakika 0,75 saattir.
          </p>
        </div>
      </div>

      <section className="sahne is-sol" id="ondalik">
        <p className="sahne-etiket">01 · Dakika → ondalık saat</p>
        <h2 className="sahne-dev">45 dk = 0,75 sa</h2>
        <p className="sahne-buyuk">
          dakikayı <b>60&apos;a böl</b>, saate ekle
        </p>
        <table className="sahne-tablo">
          <thead>
            <tr>
              <th>Dakika</th>
              <th>Ondalık saat</th>
              <th>Dakika</th>
              <th>Ondalık saat</th>
            </tr>
          </thead>
          <tbody>
            {DAKIKALAR.slice(0, 6).map((d, i) => {
              const d2 = DAKIKALAR[i + 6];
              return (
                <tr key={d}>
                  <td>{d} dk</td>
                  <td>{(d / 60).toLocaleString("tr-TR", { maximumFractionDigits: 3 })}</td>
                  <td>{d2} dk</td>
                  <td>{(d2 / 60).toLocaleString("tr-TR", { maximumFractionDigits: 3 })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul className="sahne-kucuk">
          <li>Örnek: 7 sa 20 dk = 7 + 20/60 = 7,33 saat.</li>
          <li>Tersine: 0,4 saat × 60 = 24 dakika.</li>
        </ul>
      </section>

      <section className="sahne is-sag" id="yasal">
        <p className="sahne-etiket">02 · İş Kanunu&apos;na göre çalışma süresi</p>
        <h2 className="sahne-dev">45 saat</h2>
        <p className="sahne-buyuk">
          haftalık en çok çalışma süresi; aşan kısım <b>fazla çalışmadır</b>
        </p>
        <table className="sahne-tablo">
          <caption>Ara dinlenme (4857 sayılı İş Kanunu, madde 68)</caption>
          <thead>
            <tr>
              <th>Günlük çalışma</th>
              <th>En az ara dinlenme</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4 saat veya daha az</td>
              <td>15 dakika</td>
            </tr>
            <tr>
              <td>4 saatten fazla, 7,5 saate kadar</td>
              <td>30 dakika</td>
            </tr>
            <tr>
              <td>7,5 saatten fazla</td>
              <td>1 saat</td>
            </tr>
          </tbody>
        </table>
        <ul className="sahne-kucuk">
          <li>Ara dinlenme çalışma süresinden sayılmaz; mesai hesabında moladan düşülür.</li>
          <li>Haftalık 45 saat, aksi kararlaştırılmadıkça çalışılan günlere eşit bölünür (madde 63).</li>
          <li>Kesin hakları için iş sözleşmesine ve toplu sözleşmeye bakılmalıdır.</li>
        </ul>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import EzaniTool, { type EzaniCity } from "../components/ezani/EzaniTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { turkeyProvinces } from "../converter/geo/turkeyProvinces";
import { fromEzani, sunsetMs } from "../converter/time/ezani";
import { toClock, trClock } from "../converter/time/sunYear";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/ezani-saat-cevirme";
const title = "Ezani Saat Çevirme: Alaturka Saat Hesaplama";
const description =
  "Ezani (alaturka) saati normal saate, normal saati ezani saate çevirin: gün batımı ezani 12:00'dır. 81 ilde ve her tarihte batış saatine göre hesap, aylık tablo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const YEAR = new Date().getFullYear();
const cities: EzaniCity[] = [...turkeyProvinces]
  .sort((a, b) => a.name.localeCompare(b.name, "tr"))
  .map((p) => ({ id: p.id, name: p.name, lat: p.lat, lon: p.lon }));
const byId = (id: string) => turkeyProvinces.find((p) => p.id === id)!;
const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const TABLE_CITIES = ["istanbul", "ankara", "izmir", "erzurum"];

function sunsetClock(id: string, m: number) {
  const p = byId(id);
  const s = sunsetMs(YEAR, m, 1, p.lat, p.lon);
  return s === null ? "—" : trClock(new Date(s));
}

const ist = byId("istanbul");
const istJune = (h: number) => toClock(new Date(fromEzani(YEAR, 6, 21, h, 0, "gece", ist.lat, ist.lon)!));
const istDec = (h: number) => toClock(new Date(fromEzani(YEAR, 12, 21, h, 0, "gece", ist.lat, ist.lon)!));

const faqItems: FaqItem[] = [
  { question: "Ezani saat nedir?", answer: "Günün güneşin batışıyla başladığı geleneksel saat sistemidir. Güneş battığı an saat 12:00 kabul edilir; sonraki saatler 1, 2, 3 diye sayılır. Batış saati her gün değiştiği için ezani saatin normal saat karşılığı da her gün birkaç dakika kayar." },
  { question: "Ezani saat 12 ne zamandır?", answer: "Bulunduğunuz yerde güneşin battığı andır. İstanbul'da 21 Haziran'da bu an yaklaşık saat " + trClock(new Date(sunsetMs(YEAR, 6, 21, ist.lat, ist.lon)!)) + ", 21 Aralık'ta yaklaşık saat " + trClock(new Date(sunsetMs(YEAR, 12, 21, ist.lat, ist.lon)!)) + "." },
  { question: "Türkiye'de ezani saat ne zaman bırakıldı?", answer: "26 Aralık 1925 tarihli 697 sayılı Kanun'la uluslararası saate geçilmesine karar verildi ve 1 Ocak 1926'dan itibaren resmî işlerde bugünkü saat kullanılmaya başlandı. Bazı camilerin ve tarihi saat kulelerinin ezani saat göstermesi bu eski düzenden kalmadır." },
  { question: "Sabahki ezani saat nasıl bulunur?", answer: "Ezani gün bir önceki akşamın gün batımıyla başlar. Batıştan 12 saat sonra saat yeniden 12:00 olur ve gündüz dilimi başlar; örneğin batıştan 14 saat sonrası ezani gündüz 2:00'dır. Çevirici bu hesabı seçtiğiniz il ve tarihe göre yapar." },
];

export default function EzaniPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Tarih ve Saat" },
        { href: PATH, label: "Ezani Saat Çevirme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Ezani Saat Çevirme"
      intro="Ezani (alaturka) saatte gün güneşin batışıyla başlar ve batış anı 12:00 kabul edilir. İlinizi ve tarihi seçin; normal saati ezani saate ya da ezani saati normal saate çevirin."
      tool={<EzaniTool cities={cities} defaultCity="istanbul" />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/gunes-dogusu-ve-batisi", label: "Güneş Doğuşu ve Batışı" },
          { href: "/tarih-cevirici", label: "Hicri Rumi Tarih Çevirici" },
          { href: "/hicri-takvim", label: "Hicri Takvim" },
          { href: "/yerel-saat-hesaplama", label: "Yerel Saat Hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Ezani saat nasıl hesaplanır?" },
        { id: "tablo", label: `${YEAR} gün batımı (ezani 12:00) tablosu` },
        { id: "tarihce", label: "Kısa tarihçe" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Ezani saat nasıl hesaplanır?</h2>
      <p>
        Ezani saati bulmak için son gün batımından bu yana geçen süre hesaplanır. Batış anı 12:00'dır; ondan 1 saat sonra ezani 1:00, 3 saat 15 dakika
        sonra 3:15 olur. Batıştan 12 saat sonra saat yeniden 12:00'yı gösterir ve gündüz dilimi başlar.
      </p>
      <p>
        Yazın günler uzun olduğu için ezani saatler normal saate göre geç, kışın erken düşer. Örneğin İstanbul'da {YEAR} yılının 21 Haziran akşamı ezani 3:00
        yaklaşık {istJune(3)}, 21 Aralık akşamı ise {istDec(3)} karşılık gelir. Batış saatleri için{" "}
        <Link href="/gunes-dogusu-ve-batisi">güneş doğuşu ve batışı</Link> sayfasına bakabilirsiniz.
      </p>

      <h2 id="tablo">{YEAR} gün batımı (ezani 12:00) tablosu</h2>
      <p>Her ayın 1'inde gün batımı; bu saat o akşam ezani 12:00'ye karşılık gelir (Türkiye saati).</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Tarih</th>
              {TABLE_CITIES.map((id) => (
                <th key={id}>{byId(id).name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MONTHS.map((name, i) => (
              <tr key={name}>
                <td>1 {name}</td>
                {TABLE_CITIES.map((id) => (
                  <td key={id}>{sunsetClock(id, i + 1)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="tarihce">Kısa tarihçe</h2>
      <p>
        Osmanlı'da namaz vakitlerine bağlı günlük hayat nedeniyle saatler gün batımına göre ayarlanırdı; saat kulelerindeki saatler ve cep saatleri her akşam
        güneş batarken 12'ye kurulurdu. 26 Aralık 1925 tarihli 697 sayılı Kanun'la 1 Ocak 1926'dan itibaren uluslararası saat sistemine geçildi. Bugün
        bazı camilerde ve tarihi yapılarda hâlâ ezani saat gösteren kadranlar görülür.
      </p>
    </TimeToolPage>
  );
}

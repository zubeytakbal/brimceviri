import type { Metadata } from "next";
import Link from "next/link";
import ApiPlayground from "../components/ApiPlayground";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Birim Çevirme API'si (Ücretsiz, Geliştiriciler İçin)",
  description:
    "BirimCeviri.app'in birim dönüşüm motorunu ücretsiz bir JSON API üzerinden kullanın. Uzunluk, kütle, basınç, enerji ve daha fazlası için 30+ kategori.",
  alternates: {
    canonical: "/gelistirici-api",
  },
  openGraph: {
    title: "Birim Çevirme API'si (Ücretsiz, Geliştiriciler İçin)",
    description:
      "BirimCeviri.app'in birim dönüşüm motorunu ücretsiz bir JSON API üzerinden kullanın.",
    url: buildSiteUrl("/gelistirici-api"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const categoriesUrl = buildSiteUrl("/api/v1/categories");
const convertExampleUrl = buildSiteUrl(
  "/api/v1/convert?category=uzunluk&from=m&to=km&value=5"
);

export default function DeveloperApiPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Geliştirici API&apos;si</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Birim Çevirme API&apos;si</h1>

          <p>
            BirimCeviri.app&apos;in dönüşüm motorunu ücretsiz bir JSON
            API olarak kullanabilirsin — kayıt, API anahtarı veya ücret
            yok. Uzunluk, kütle, basınç, enerji, elektrik gibi 30&apos;dan
            fazla kategoride, yüzlerce birim arasında dönüşüm yapar.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Uç Noktalar</h2>
          <p>
            <strong>
              <code>GET /api/v1/categories</code>
            </strong>
            <br />
            Kullanılabilir tüm kategorileri ve her kategorideki birim
            sembollerini listeler.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>İstek</td>
                  <td>
                    <code>GET {categoriesUrl}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>
              <code>
                GET /api/v1/convert?category=&amp;from=&amp;to=&amp;value=
              </code>
            </strong>
            <br />
            Belirtilen kategori içinde iki birim arasında dönüşüm yapar.
            Kategori ve birim sembolleri <code>/api/v1/categories</code>{" "}
            uç noktasından alınmalıdır.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Parametre</th>
                  <th scope="col">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>category</code>
                  </td>
                  <td>Kategori adı (ör. &quot;uzunluk&quot;, &quot;kutle&quot;)</td>
                </tr>
                <tr>
                  <td>
                    <code>from</code>
                  </td>
                  <td>Kaynak birim sembolü (ör. &quot;m&quot;)</td>
                </tr>
                <tr>
                  <td>
                    <code>to</code>
                  </td>
                  <td>Hedef birim sembolü (ör. &quot;km&quot;)</td>
                </tr>
                <tr>
                  <td>
                    <code>value</code>
                  </td>
                  <td>Dönüştürülecek sayısal değer</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Örnek İstek</h2>
          <code className="embed-code-box-snippet">
            curl &quot;{convertExampleUrl}&quot;
          </code>

          <h2>Örnek Yanıt</h2>
          <pre className="api-playground-response">
{`{
  "category": "uzunluk",
  "from": "m",
  "to": "km",
  "value": 5,
  "result": 0.005
}`}
          </pre>

          <h2>Hatalar</h2>
          <p>
            Geçersiz kategori, birim veya değer durumunda API{" "}
            <code>400</code> durum koduyla{" "}
            <code>{`{ "error": "..." }`}</code> formatında bir yanıt
            döner. Dakikada 60 isteği aşan istemciler{" "}
            <code>429</code> alır.
          </p>

          <h2>CORS</h2>
          <p>
            Tüm uç noktalar <code>Access-Control-Allow-Origin: *</code>{" "}
            başlığıyla döner — tarayıcıdan doğrudan <code>fetch()</code>{" "}
            ile herhangi bir siteden çağırabilirsin.
          </p>

          <h2>Google E-Tablolar Entegrasyonu</h2>
          <p>
            Bu API&apos;yi Google E-Tablolar (Sheets) içinde{" "}
            <code>=BIRIMCEVIR(...)</code> gibi özel bir formül olarak da
            kullanabilirsin — tablo düzenlerken hücrelerde canlı birim
            dönüşümü yapmak için pratik.
          </p>
          <ol>
            <li>
              Google E-Tablolar&apos;da <strong>Uzantılar &gt; Apps
              Script</strong>&apos;i aç.
            </li>
            <li>
              Varsayılan kodu sil, aşağıdaki fonksiyonu yapıştırıp kaydet.
            </li>
            <li>
              Herhangi bir hücreye <code>=BIRIMCEVIR(100, &quot;sicaklik&quot;, &quot;C&quot;, &quot;F&quot;)</code>{" "}
              yazarak dene — ilk çalıştırmada Google yetkilendirme
              isteyecektir, izin ver.
            </li>
          </ol>
          <pre className="api-playground-response">
{`function BIRIMCEVIR(deger, kategori, kaynakBirim, hedefBirim) {
  var url = "https://www.birimceviri.app/api/v1/convert" +
    "?category=" + encodeURIComponent(kategori) +
    "&from=" + encodeURIComponent(kaynakBirim) +
    "&to=" + encodeURIComponent(hedefBirim) +
    "&value=" + encodeURIComponent(deger);
  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var body = JSON.parse(response.getContentText());
  if (response.getResponseCode() !== 200) {
    throw new Error(body.error || "Dönüşüm başarısız oldu.");
  }
  return body.result;
}`}
          </pre>
          <p>
            Kategori parametresi zorunludur — bazı birim sembolleri
            kategoriler arası çakışır (ör. <code>F</code> hem Fahrenheit
            hem Farad olabilir), bu yüzden otomatik tahmin güvenli
            değildir. Önbellekleme, birim listeleme fonksiyonları ve
            tam kurulum adımları için depodaki{" "}
            <code>google-sheets-addon/</code> klasörüne bakabilirsin.
          </p>

          <h2>Canlı Dene</h2>
          <ApiPlayground />
        </section>
      </div>
    </main>
  );
}

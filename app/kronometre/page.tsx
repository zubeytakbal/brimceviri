import type { Metadata } from "next";
import { appManifestPath, findInstallableApp } from "../converter/time/installableApps";
import Link from "@/app/components/SiteLink";
import Stopwatch from "../components/time/Stopwatch";
import TimeToolPage from "../components/time/TimeToolPage";
import { timeRelated } from "../components/time/timeRelatedLinks";
import type { FaqItem } from "../converter/faqSchema";
import { timeToolAlternates } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

const title = "Online Kronometre: Tur Kayıtlı Süre Ölçer";
const description =
  "Salise hassasiyetinde ücretsiz online kronometre: başlat, tur kaydet, en hızlı ve en yavaş turu gör, sonuçları CSV olarak indir.";

export const metadata: Metadata = {
  title,
  description,
  manifest: appManifestPath("kronometre"),
  appleWebApp: { capable: true, title: findInstallableApp("kronometre")!.shortName },
  alternates: { canonical: "/kronometre", ...timeToolAlternates("stopwatch") },
  openGraph: { title, description, url: buildSiteUrl("/kronometre"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Kronometre ne kadar hassas?",
    answer: "Ekranda salise (1/100 saniye) gösterilir. Ölçüm gerçek saate göre yapıldığı için sekme arka plandayken de süre kaymaz.",
  },
  {
    question: "Tur (lap) nedir?",
    answer: "Tur, kronometre durmadan ara süre kaydetmektir. Koşuda her tur, yüzmede her havuz boyu için \"Tur\" düğmesine basılır; en hızlı ve en yavaş tur renkle işaretlenir.",
  },
  {
    question: "Sonuçları kaydedebilir miyim?",
    answer: "Evet. \"CSV indir\" düğmesi tur numarası, tur süresi ve toplam süreyi Excel ya da Google E-Tablolar'da açılabilen bir dosyaya kaydeder.",
  },
  {
    question: "Klavyeyle kullanılabilir mi?",
    answer: "Düğmeler klavyeyle odaklanabilir; Tab ile düğmeye gelip Enter ya da Boşluk tuşuna basabilirsiniz.",
  },
];

export default function StopwatchPage() {
  return (
    <TimeToolPage
      crumbs={[{ href: "/", label: "Ana Sayfa" }, { href: "/kronometre", label: "Kronometre" }]}
      crumbLabel="Sayfa yolu"
      install={{ name: "Kronometre", lang: "tr" }}
      title="Online Kronometre"
      intro="Başlat'a bas, süre salise hassasiyetinde işlesin. Tur kaydet, en hızlı ve en yavaş turu gör, sonuçları CSV olarak indir."
      tool={<Stopwatch locale="tr" />}
      related={{ title: "Diğer zaman araçları", links: timeRelated.tr.tools.filter((t) => t.href !== "/kronometre") }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Kronometre nasıl kullanılır?" },
        { id: "fark", label: "Kronometre ile zamanlayıcı farkı" },
        { id: "kullanim", label: "Nerelerde kullanılır?" },
        { id: "salise", label: "Salise ne demek?" },
        { id: "tepki", label: "Elle ölçümde tepki payı" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Kronometre nasıl kullanılır?</h2>
      <ol>
        <li>&quot;Başlat&quot;a basın; süre saat, dakika, saniye ve salise olarak işler.</li>
        <li>Ara süre almak için &quot;Tur&quot;a basın; her tur listede görünür.</li>
        <li>&quot;Durdur&quot; ile duraklatın, &quot;Devam&quot; ile sürdürün, &quot;Sıfırla&quot; ile temizleyin.</li>
      </ol>

      <h2 id="fark">Kronometre ile zamanlayıcı farkı</h2>
      <p>
        Kronometre sıfırdan yukarı sayar ve geçen süreyi ölçer: koşu, yüzme, deney ya da görev süresi için idealdir. Zamanlayıcı
        ise belirlediğiniz süreden geriye sayar ve bitince uyarır. Geri sayım için <Link href="/zamanlayici">online zamanlayıcıyı</Link>{" "}
        kullanın.
      </p>

      <h2 id="kullanim">Nerelerde kullanılır?</h2>
      <ul>
        <li>
          <strong>Koşu ve yüzme:</strong> Her tur ya da havuz boyu için &quot;Tur&quot;a basın; liste tur sürelerini ve toplamı tutar, en hızlı ve
          en yavaş tur ayrıca işaretlenir. Tur sürelerinden tempoyu bulmak için <Link href="/kosu-pace-hesaplama">koşu pace hesaplama</Link>{" "}
          aracına bakın.
        </li>
        <li>
          <strong>Sunum ve sınav provası:</strong> Konuşmanızın her bölümü için tur alarak hangi bölümün uzun sürdüğünü görebilirsiniz.
        </li>
        <li>
          <strong>Deney ve ölçüm:</strong> Okul deneylerinde bir olayın süresi birkaç kez ölçülüp CSV ile indirilir, ortalama E-Tablolar&apos;da alınır.
        </li>
        <li>
          <strong>İş ve görev süresi:</strong> Bir işin gerçekte ne kadar sürdüğünü ölçmek, sonraki planları daha doğru yapmayı sağlar. Belirli
          aralıklarla çalışıp mola vermek istiyorsanız <Link href="/zamanlayici">zamanlayıcı</Link> daha uygundur.
        </li>
      </ul>

      <h2 id="salise">Salise ne demek?</h2>
      <p>
        Kronometrenin en sağdaki iki hanesi saniyenin yüzde birini gösterir ve günlük dilde &quot;salise&quot; diye okunur. Sözlükte ise salise
        saniyenin altmışta biridir; yüzde bir saniyenin bilimsel adı santisaniyedir. Bu sayfadaki kronometrede iki hane yüzde bir saniyedir: 12,57
        saniye, 12 saniye ve 57 yüzde bir saniye demektir.
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Birim</th>
              <th scope="col">Saniye karşılığı</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 dakika</td>
              <td>60 saniye</td>
            </tr>
            <tr>
              <td>1 saniye</td>
              <td>100 santisaniye = 1.000 milisaniye</td>
            </tr>
            <tr>
              <td>1 santisaniye (kronometre hanesi)</td>
              <td>0,01 saniye</td>
            </tr>
            <tr>
              <td>1 salise (sözlük anlamı)</td>
              <td>1/60 saniye ≈ 0,0167 saniye</td>
            </tr>
            <tr>
              <td>1 milisaniye</td>
              <td>0,001 saniye</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="tepki">Elle ölçümde tepki payı</h2>
      <p>
        Düğmeye elle basıldığında ölçüme insanın tepki süresi de girer: bir sesi ya da hareketi görüp parmağı hareket ettirmek genellikle saniyenin
        onda biri ile üçte biri arasında sürer. Başlatırken ve durdururken aynı gecikme olursa ikisi birbirini büyük ölçüde götürür, ama yarışma
        gibi saniyenin yüzde birinin önemli olduğu ölçümlerde elektronik zamanlama kullanılır. Elle ölçümde daha tutarlı sonuç için aynı kişinin,
        aynı işarete bakarak, birkaç ölçüm yapıp ortalamasını alması önerilir.
      </p>
    </TimeToolPage>
  );
}

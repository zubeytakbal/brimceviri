import type { Metadata } from "next";
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
      title="Online Kronometre"
      intro="Başlat'a bas, süre salise hassasiyetinde işlesin. Tur kaydet, en hızlı ve en yavaş turu gör, sonuçları CSV olarak indir."
      tool={<Stopwatch locale="tr" />}
      related={{ title: "Diğer zaman araçları", links: timeRelated.tr.tools.filter((t) => t.href !== "/kronometre") }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Kronometre nasıl kullanılır?" },
        { id: "fark", label: "Kronometre ile zamanlayıcı farkı" },
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
    </TimeToolPage>
  );
}

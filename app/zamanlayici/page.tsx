import type { Metadata } from "next";
import { appManifestPath, findInstallableApp } from "../converter/time/installableApps";
import CountdownTimer from "../components/time/CountdownTimer";
import TimeToolPage from "../components/time/TimeToolPage";
import { timeRelated } from "../components/time/timeRelatedLinks";
import type { FaqItem } from "../converter/faqSchema";
import { timeToolAlternates } from "../i18n/timeToolPaths";
import TimerPresetTable from "../components/time/TimerPresetTable";
import { timerPresets } from "../i18n/timerPresets";
import { buildSiteUrl } from "../siteConfig";

const title = "Online Zamanlayıcı: Geri Sayım Sayacı";
const description =
  "Ücretsiz online zamanlayıcı: süreyi seç, başlat; bitince sesli uyarı alsın. 1-60 dakika hazır süreler, tam ekran, duraklatma ve +1 dakika.";

export const metadata: Metadata = {
  title,
  description,
  manifest: appManifestPath("zamanlayici"),
  appleWebApp: { capable: true, title: findInstallableApp("zamanlayici")!.shortName },
  alternates: { canonical: "/zamanlayici", ...timeToolAlternates("timer") },
  openGraph: { title, description, url: buildSiteUrl("/zamanlayici"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};


const faqItems: FaqItem[] = [
  {
    question: "Zamanlayıcı arka planda çalışmaya devam eder mi?",
    answer:
      "Evet. Süre gerçek saate göre hesaplandığı için başka sekmeye geçseniz de doğru biter. Sekmeyi kapatmayın; telefonda \"Ekranı açık tut\" düğmesini kullanın.",
  },
  {
    question: "Süre bitince ne olur?",
    answer: "Seçtiğiniz ses çalar, halka dolar ve sekme başlığı uyarı gösterir. \"Durdur\" ile sesi kapatabilir, aynı süreyi yeniden başlatabilirsiniz.",
  },
  {
    question: "Tam ekran nasıl açılır?",
    answer: "Sayacın altındaki \"Tam ekran\" düğmesine basın. Sunum, sınav ya da sınıf ortamında sayacı uzaktan okumak için idealdir.",
  },
  {
    question: "Saatlerce süren geri sayım kurabilir miyim?",
    answer: "Evet. Saat, dakika ve saniye alanlarından 99 saate kadar herhangi bir süre girebilirsiniz.",
  },
];

export default function TimerPage() {
  const related = timeRelated.tr;
  return (
    <TimeToolPage
      crumbs={[{ href: "/", label: "Ana Sayfa" }, { href: "/zamanlayici", label: "Zamanlayıcı" }]}
      crumbLabel="Sayfa yolu"
      install={{ name: "Zamanlayıcı", lang: "tr" }}
      title="Online Zamanlayıcı"
      intro="Hazır sürelerden birine dokun ya da kendi süreni gir, başlat. Süre bitince sesli uyarı alırsın. Duraklat, +1 dakika ekle ya da tam ekrana geç."
      tool={<CountdownTimer locale="tr" />}
      related={{ title: "Diğer zaman araçları", links: related.tools.filter((t) => t.href !== "/zamanlayici") }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Zamanlayıcı nasıl kullanılır?" },
        { id: "sureler", label: "Hazır süreler ve kullanım alanları" },
        { id: "kullanim", label: "Nerelerde işe yarar?" },
        { id: "dogruluk", label: "Ne kadar doğru?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Zamanlayıcı nasıl kullanılır?</h2>
      <ol>
        <li>Hazır sürelerden birine (1, 5, 10, 30 dakika…) dokunun ya da saat, dakika ve saniyeyi girin.</li>
        <li>&quot;Başlat&quot;a basın. Halka ve sekme başlığı kalan süreyi gösterir.</li>
        <li>Gerekirse &quot;Duraklat&quot;, &quot;+1 dk&quot; ya da &quot;Sıfırla&quot;yı kullanın.</li>
        <li>Süre bitince seçtiğiniz ses çalar.</li>
      </ol>

      <TimerPresetTable
        id="sureler"
        heading="Hazır süreler ve kullanım alanları"
        intro="Bir süreye dokunduğunuzda zamanlayıcı o süreye kurulur; adres de paylaşılabilir hale gelir."
        durationLabel="Süre"
        usesLabel="Ne için?"
        rows={timerPresets.map((p) => ({ seconds: p.seconds, label: p.labelTr, uses: p.usesTr }))}
      />

      <h2 id="kullanim">Nerelerde işe yarar?</h2>
      <ul>
        <li>Mutfak: yumurta haşlama (7-10 dakika), makarna (8-12 dakika), demlenen çay (15 dakika).</li>
        <li>Ders ve odak: 25 dakika çalışma + 5 dakika mola.</li>
        <li>Spor: plank, esneme ve dinlenme aralıkları.</li>
        <li>Sınıf, sunum ve toplantılarda konuşma süresi.</li>
      </ul>

      <h2 id="dogruluk">Ne kadar doğru?</h2>
      <p>
        Sayaç her karede gerçek saati okur; tarayıcı arka plandaki sekmeleri yavaşlatsa bile kalan süre kaymaz ve süre doğru anda
        biter. Ses, cihazın ses ayarlarına bağlıdır; önceden &quot;Sesi dene&quot; ile kontrol edin.
      </p>
    </TimeToolPage>
  );
}

import type { Metadata } from "next";
import { appManifestPath, findInstallableApp } from "../converter/time/installableApps";
import Link from "@/app/components/SiteLink";
import AlarmPresetTable from "../components/time/AlarmPresetTable";
import AlarmClock from "../components/time/AlarmClock";
import TimeToolPage from "../components/time/TimeToolPage";
import { timeRelated } from "../components/time/timeRelatedLinks";
import type { FaqItem } from "../converter/faqSchema";
import { timeToolAlternates } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

const title = "Online Alarm Kur: Ücretsiz Çalar Saat";
const description =
  "Tarayıcıda anında alarm kur: saat seç, sesi ve etiketi belirle, birden çok alarm ekle. Erteleme, ekranı açık tutma ve kurulum gerektirmeyen çalar saat.";

export const metadata: Metadata = {
  title,
  description,
  manifest: appManifestPath("alarm"),
  appleWebApp: { capable: true, title: findInstallableApp("alarm")!.shortName },
  alternates: { canonical: "/online-alarm-kur", ...timeToolAlternates("alarm") },
  openGraph: { title, description, url: buildSiteUrl("/online-alarm-kur"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Sekme kapalıyken alarm çalar mı?",
    answer:
      "Hayır. Online alarm tarayıcı sekmesi açıkken çalışır. Sekmeyi arka planda bırakabilirsiniz ama kapatmamalısınız; bilgisayar uyku moduna geçerse de alarm çalmaz.",
  },
  {
    question: "Telefonda kullanabilir miyim?",
    answer:
      "Evet, ancak telefonlar ekran kilitlenince sayfayı durdurabilir. \"Ekranı açık tut\" düğmesine basın ve telefonu şarjda bırakın. Sabah kritik bir uyanış için telefonunuzun kendi alarmını yedek olarak kurmanız önerilir.",
  },
  {
    question: "Alarmlarım kaydediliyor mu?",
    answer:
      "Alarmlar yalnızca bu tarayıcıda (localStorage) saklanır; sunucuya gönderilmez. Sayfayı yeniden açtığınızda listeniz yerinde olur.",
  },
  {
    question: "Ses neden çalmadı?",
    answer:
      "Tarayıcılar, kullanıcı sayfayla etkileşime girmeden ses çalınmasına izin vermez. Alarmı kurarken bir düğmeye basmanız yeterlidir; emin olmak için \"Sesi dene\" düğmesini kullanın ve cihaz sesinin açık olduğunu kontrol edin.",
  },
  {
    question: "Kaç alarm kurabilirim?",
    answer: "Sınır yok. Her alarmın kendi etiketi, sesi ve ses düzeyi olabilir; tek tek açıp kapatabilirsiniz.",
  },
];

export default function OnlineAlarmPage() {
  const related = timeRelated.tr;
  return (
    <TimeToolPage
      crumbs={[{ href: "/", label: "Ana Sayfa" }, { href: "/online-alarm-kur", label: "Online Alarm" }]}
      crumbLabel="Sayfa yolu"
      install={{ name: "Online Alarm", lang: "tr" }}
      title="Online Alarm Kur"
      intro="Saati seç, bir ses belirle ve alarmı ekle. Uygulama indirmeden, tarayıcıda çalışan ücretsiz çalar saat: birden çok alarm, 5 dakika erteleme ve ekranı açık tutma desteği."
      tool={<AlarmClock locale="tr" />}
      related={{ title: "Diğer zaman araçları", links: related.tools.filter((t) => t.href !== "/online-alarm-kur") }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Online alarm nasıl kurulur?" },
        { id: "guvenilir", label: "Alarmın güvenle çalması için" },
        { id: "sesler", label: "Alarm sesleri" },
        { id: "uyku", label: "Hangi saate alarm kurmalıyım?" },
        { id: "saatler", label: "Kalkış saatine göre yatış saati" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Online alarm nasıl kurulur?</h2>
      <ol>
        <li>Saat ve dakikayı seçin ya da &quot;+10 dk&quot;, &quot;+30 dk&quot; gibi hızlı düğmelerden birine basın.</li>
        <li>İsterseniz alarma bir etiket verin (ör. &quot;İlaç&quot;, &quot;Toplantı&quot;).</li>
        <li>Sesi ve ses düzeyini seçip &quot;Sesi dene&quot; ile kontrol edin.</li>
        <li>&quot;Alarmı ekle&quot;ye basın. Kalan süre listede ve sekme başlığında görünür.</li>
      </ol>
      <p>Alarm çaldığında &quot;5 dk ertele&quot; ile ertelebilir ya da &quot;Durdur&quot; ile kapatabilirsiniz.</p>

      <h2 id="guvenilir">Alarmın güvenle çalması için</h2>
      <ul>
        <li>Sekmeyi kapatmayın; başka sekmeye geçmek sorun değildir.</li>
        <li>Bilgisayarın uyku moduna geçmesini engelleyin ya da &quot;Ekranı açık tut&quot; düğmesini kullanın.</li>
        <li>Cihazın sesini ve hoparlörü kontrol edin; kulaklık takılıysa ses oradan gelir.</li>
        <li>Önemli uyanışlarda telefonunuzun yerleşik alarmını yedek olarak kurun.</li>
      </ul>

      <h2 id="sesler">Alarm sesleri</h2>
      <p>
        Dört ses bulunur: klasik zil, yumuşak çan, dijital bip ve sakin ton. Sesler dosya indirmeden, tarayıcıda anlık olarak
        üretilir; bu yüzden internet yavaş olsa bile gecikmeden çalar.
      </p>

      <h2 id="uyku">Hangi saate alarm kurmalıyım?</h2>
      <p>
        Uyku yaklaşık 90 dakikalık döngülerden oluşur ve bir döngünün sonunda uyanmak daha dinç hissettirir. Yatış saatinize göre
        en uygun kalkış saatini <Link href="/uyku-hesaplama">uyku hesaplama</Link> aracıyla bulup buradan alarmını kurabilirsiniz.
      </p>

      <AlarmPresetTable
        id="saatler"
        heading="Kalkış saatine göre yatış saati"
        intro="90 dakikalık uyku döngüsü ve 15 dakikalık uykuya dalma süresiyle hesaplanmıştır. Bir saate dokunduğunuzda alarm o saate ayarlanır."
        wakeLabel="Kalkış"
        cycleLabel={(c, h) => `${c} döngü (${h.toLocaleString("tr-TR")} sa)`}
      />
    </TimeToolPage>
  );
}

import type { Metadata } from "next";
import { appManifestPath, findInstallableApp } from "../converter/time/installableApps";
import Link from "@/app/components/SiteLink";
import AlarmSaat from "../components/time/AlarmSaat";
import AlarmSahneleri from "../components/time/AlarmSahneleri";
import SaatKabugu from "../components/saat/SaatKabugu";
import type { FaqItem } from "../converter/faqSchema";
import { timeToolAlternates } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

const title = "Alarm Kur: Ücretsiz Online Çalar Saat, Sesli ve Kurulumsuz";
const description =
  "Hemen alarm kur: saati seç, alarm sesini dinle ve başlat. Kayıt ve uygulama gerektirmeyen ücretsiz çalar saat; erteleme, birden çok alarm ve hazır saatler.";

export const metadata: Metadata = {
  title: { absolute: title },
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
    question: "Gece modu ne işe yarar?",
    answer:
      "Gece modu ekranı tamamen karartır, saati ve sıradaki alarmı sönük kırmızı rakamlarla gösterir ve ekranın kapanmasını engeller. Telefon ya da tablet başucunda şarjdayken göz almadan saati görmenizi sağlar; çıkmak için ekrana dokunun.",
  },
  {
    question: "Kendi şarkımı alarm sesi yapabilir miyim?",
    answer:
      "Evet. \"Ses, not ve tekrar\" bölümünde ses listesinden \"Kendi müziğin\"i seçip cihazınızdan bir ses dosyası seçin. Dosya yüklenmez, yalnızca bu tarayıcıda çalınır.",
  },
  {
    question: "Kaç alarm kurabilirim?",
    answer: "Sınır yok. Her alarmın kendi etiketi, sesi ve ses düzeyi olabilir; tek tek açıp kapatabilirsiniz.",
  },
];

export default function OnlineAlarmPage() {
  return (
    <SaatKabugu
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/online-alarm-kur", label: "Online Alarm" },
      ]}
      faqItems={faqItems}
      hero={<AlarmSaat />}
      sahneler={<AlarmSahneleri />}
    >
      <h2 id="nasil">Online alarm nasıl kurulur?</h2>
      <ol>
        <li>Saat ve dakikayı seçin ya da hazır saatlerden (05:00 – 08:30) birine dokunun.</li>
        <li>
          Akşam 18:00&apos;den sonra görünen &quot;Şimdi yatarsan dinç uyanırsın&quot; satırı, şu an uyursanız 4, 5 ya da 6 uyku döngüsünün
          sonunu gösterir; birine dokunmak saati oraya ayarlar.
        </li>
        <li>İsterseniz &quot;Ses, not ve tekrar&quot; bölümünden sesi, notu (ör. &quot;İlaç&quot;) ve tekrarı (her gün, hafta içi) seçin.</li>
        <li>
          &quot;Alarm kur&quot;a basın. Kalan süre saatin altında ve sekme başlığında görünür. Birkaç dakika sonrası için &quot;Hızlı
          kur&quot; düğmeleri tek dokunuşta alarm kurar.
        </li>
      </ol>
      <p>
        Alarm çaldığında ekranın tamamı alarm olur: &quot;Ertele&quot; 5 dakika sonraya yeni bir alarm kurar, &quot;Durdur&quot; kapatır.
        Gece başucunda &quot;Gece modu&quot; ekranı karartır, saati sönük kırmızıyla gösterir ve ekranın kapanmasını engeller.
      </p>

      <h2 id="sesler">Alarm sesleri</h2>
      <p>
        Dört hazır ses bulunur: klasik zil, yumuşak çan, dijital bip ve sakin ton. Sesler dosya indirmeden, tarayıcıda anlık olarak
        üretilir; bu yüzden internet yavaş olsa bile gecikmeden çalar. &quot;Kendi müziğin&quot; seçeneğiyle cihazınızdaki bir şarkıyı da alarm
        sesi yapabilirsiniz; dosya yalnızca bu tarayıcıda kalır.
      </p>
      <p>
        Uyanma saatinizi yatış saatinizden hesaplamak için <Link href="/uyku-hesaplama">uyku hesaplama</Link>, belirli bir süre sonrası
        için <Link href="/zamanlayici">zamanlayıcı</Link> aracını kullanabilirsiniz.
      </p>
    </SaatKabugu>
  );
}

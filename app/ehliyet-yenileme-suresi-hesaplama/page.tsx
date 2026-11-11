import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LicenseRenewalCalculator from "../components/LicenseRenewalCalculator";
import SourceMonitorStatusList from "../components/SourceMonitorStatusList";
import TrustBar from "../components/TrustBar";
import type { FaqItem } from "../converter/faqSchema";
import { getSourceMonitorStatuses } from "../converter/licenseSourceMonitor";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

export const revalidate = 3600;

const faqItems: FaqItem[] = [
  {
    question: "Ehliyet kaç yılda bir yenilenir?",
    answer:
      "B, B1, BE, M, A1, A2, A sınıfı sürücü belgeleri 10 yılda bir; C, C1, C1E, CE, D1, D1E, D, DE gibi ticari/ağır vasıta sınıfları 5 yılda bir yenilenir.",
  },
  {
    question: "Süresi dolan ehliyetle araç kullanılabilir mi?",
    answer:
      "Hayır. Süresi dolan sürücü belgesiyle trafiğe çıkmak yasal değildir; belge geçersiz sayılır ve fiziki olarak geri alınabilir. Yeni belge çıkana kadar araç kullanılmamalıdır.",
  },
  {
    question: "65 yaş üstü sürücüler için yenileme süresi değişir mi?",
    answer:
      "65 yaş ve üzeri sürücülerde yenileme süresi, doktorun düzenlediği sağlık raporunun geçerlilik süresine bağlı olarak daha kısa olabilir (genellikle 65+ için 3 yıl, 80+ için 2 yıl civarında) — bu, kişinin sağlık durumuna göre değişen bir değer olup sabit bir yasa maddesi değildir.",
  },
  {
    question: "Ehliyet yenilemek için hangi belgeler gerekir?",
    answer:
      "Güncel bir sağlık raporu ve harç/değerli kağıt ücretinin ödenmesi gerekir. Kesin belge listesi için nüfus müdürlüğü veya resmi kaynak kontrol edilmelidir.",
  },
];

export const metadata: Metadata = {
  title: "Ehliyet Yenileme Süresi Hesaplama",
  description:
    "Ehliyet sınıfın ve veriliş tarihine göre sürücü belgenin ne zaman yenilenmesi gerektiğini hesapla; yenileme süreci ve gerekli belgeler hakkında bilgi al.",
  alternates: {
    canonical: "/ehliyet-yenileme-suresi-hesaplama",
    languages: {
    },
  },
  openGraph: {
    title: "Ehliyet Yenileme Süresi Hesaplama",
    description: "Sürücü belgenin ne zaman yenilenmesi gerektiğini hesapla.",
    url: buildSiteUrl("/ehliyet-yenileme-suresi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default async function LicenseRenewalPage() {
  const monitorStatuses = await getSourceMonitorStatuses();

  return (
    <AracSayfasi
      yol="/ehliyet-yenileme-suresi-hesaplama"
      baslik="Ehliyet Yenileme Süresi Hesaplama"
      hesap={<TrustBar
          sources={[
            {
              label: "Karayolları Trafik Yönetmeliği (mevzuat.gov.tr)",
              href: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=8182&MevzuatTur=7&MevzuatTertip=5",
            },
          ]}
          lastVerified="Eylül 2026"
        />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"ehliyet-yenileme-suresi-nasil-belirlenir","baslik":"Ehliyet Yenileme Süresi Nasıl Belirlenir?"},{"id":"yenileme-icin-ne-gerekir","baslik":"Yenileme İçin Ne Gerekir?"},{"id":"suresi-dolarsa-ne-olur","baslik":"Süresi Dolarsa Ne Olur?"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <LicenseRenewalCalculator />
          <h2 id="ehliyet-yenileme-suresi-nasil-belirlenir">Ehliyet Yenileme Süresi Nasıl Belirlenir?</h2>
          <p>
            Türkiye&apos;de sürücü belgeleri sınıfına göre belirli
            aralıklarla yenilenir:
          </p>
          <ul>
            <li>
              <strong>B, B1, BE, M, A1, A2, A</strong> (otomobil,
              hafif dört tekerlekli araç, motosiklet/moped): 10
              yılda bir.
            </li>
            <li>
              <strong>C, C1, C1E, CE, D1, D1E, D, DE</strong> (kamyon,
              otobüs, ticari/ağır vasıta): 5 yılda bir.
            </li>
            <li>
              <strong>65 yaş ve üzeri</strong> sürücülerde yenileme
              süresi, doktorun düzenlediği sağlık raporunun
              geçerlilik süresine bağlı olarak daha kısa olabilir.
            </li>
          </ul>
          <h2 id="yenileme-icin-ne-gerekir">Yenileme İçin Ne Gerekir?</h2>
          <p>
            Yenileme sırasında güncel bir sağlık raporu alınması ve
            harç/değerli kağıt ücretinin ödenmesi gerekir. Süreç ve
            gerekli belgeler zamanla değişebileceği için, kesin ve
            güncel bilgi için resmi kaynağı veya nüfus müdürlüğünü
            kontrol etmen önerilir.
          </p>
          <h2 id="suresi-dolarsa-ne-olur">Süresi Dolarsa Ne Olur?</h2>
          <p>
            Süresi dolan bir sürücü belgesiyle trafiğe çıkmak yasal
            değildir — sürücü araç kullanmaktan men edilir ve belge
            geçersiz sayılabilir. Yeni belge çıkana kadar araç
            kullanılmamalıdır.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Aracına göre hangi ehliyet sınıfına ihtiyacın olduğunu
            görmek için{" "}
            Hangi Ehliyet Sınıfı Gerekli?
            {" "}sayfasına, diğer otomotiv araçları için{" "}
            <Link href="/hesaplayicilar#enerji-ve-arac">Enerji, Fatura ve Araç</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Bu sayfadaki sürelere ilişkin bilgiler, Karayolları Trafik
            Yönetmeliği ile birden fazla bağımsız kaynaktan çapraz
            doğrulanmıştır. 65/80 yaş eşiklerine ilişkin bilgi,
            kaynaklarda sabit bir yasa maddesi olarak değil, sağlık
            raporuna bağlı değişken bir uygulama olarak belirtildiği
            için genel bir yönlendirme niteliğindedir.
          </p>
          <p>
            <a
              href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=8182&MevzuatTur=7&MevzuatTertip=5"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              → Resmi Karayolları Trafik Yönetmeliği&apos;ni Görüntüle (mevzuat.gov.tr)
            </a>
          </p>
          <p>
            <em>Son doğrulama: Eylül 2026.</em>
          </p>
          <SourceMonitorStatusList statuses={monitorStatuses} />
        </>
      }
    />
  );
}

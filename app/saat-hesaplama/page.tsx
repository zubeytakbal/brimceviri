import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SaatKabugu from "../components/saat/SaatKabugu";
import SaatHesap from "../components/time/SaatHesap";
import SaatHesapSahneleri from "../components/time/SaatHesapSahneleri";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/saat-hesaplama";
const title = "Saat Hesaplama: İki Saat Arası Süre, Saat Toplama ve Mesai Hesabı";
const description =
  "İki saat arası kaç saat ve dakika olduğunu (gece yarısını geçen dahil), bir saate süre eklemeyi, birden çok süreyi toplamayı ve molalı mesaiyi hesaplayın. Ondalık saat tablosu ve İş Kanunu'na göre ara dinlenme.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "İki saat arası kaç saat nasıl hesaplanır?",
    answer:
      "Bitiş saatinden başlangıç saati çıkarılır; dakika eksiye düşerse bir saat (60 dakika) ödünç alınır. Örneğin 08:30 ile 17:45 arası 9 saat 15 dakikadır. Bitiş başlangıçtan küçükse gece yarısı geçilmiştir; 24 saat eklenir: 22:30 ile 06:15 arası 7 saat 45 dakikadır.",
  },
  {
    question: "Saatler nasıl toplanır?",
    answer:
      "Saatler ve dakikalar ayrı ayrı toplanır, dakika 60'ı geçerse her 60 dakika bir saate çevrilir. 2:30 + 1:45 + 0:50 = 3 saat 125 dakika = 5 saat 5 dakikadır.",
  },
  {
    question: "45 dakika kaç saat eder?",
    answer: "45 / 60 = 0,75 saat. 15 dakika 0,25, 30 dakika 0,5, 20 dakika yaklaşık 0,33 saattir.",
  },
  {
    question: "Mesai nasıl hesaplanır?",
    answer:
      "Çıkış saatinden giriş saati çıkarılır, kullanılan mola (ara dinlenme) düşülür. 09:00–18:00 arası, 1 saat molayla 8 saat net çalışmadır; haftada 5 gün 40 saat eder. İş Kanunu'na göre haftalık 45 saati aşan çalışma fazla çalışmadır.",
  },
  {
    question: "Saate süre nasıl eklenir?",
    answer:
      "Dakikalar eklenir, 60'ı geçen kısım saate aktarılır; saat 24'ü geçerse ertesi güne geçilir. 21:50'ye 3 saat 25 dakika eklenince ertesi gün 01:15 olur.",
  },
];

export default function SaatHesaplamaPage() {
  return (
    <SaatKabugu
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Saat ve Tarih" },
        { href: PATH, label: "Saat hesaplama" },
      ]}
      faqItems={faqItems}
      hero={<SaatHesap />}
      sahneler={<SaatHesapSahneleri />}
    >
      <h2 id="nasil">Saat hesaplama nasıl yapılır?</h2>
      <p>
        Saat hesaplarında zorluk, saatin 60 dakikadan oluşmasıdır. İki saat arasındaki süreyi bulmak için saatler ve dakikalar
        ayrı ayrı çıkarılır; dakika eksiye düşerse saatten 60 dakika ödünç alınır. Toplamada ise 60&apos;ı geçen dakikalar saate
        aktarılır. Yukarıdaki hesaplayıcı bunları kendisi yapar ve sonucu hem saat-dakika hem de ondalık saat olarak gösterir.
      </p>
      <ul>
        <li>
          <strong>İki saat arası:</strong> vardiya süresi, yolculuk süresi, uyku süresi. Gece yarısını geçen aralıklar (22:00–06:00)
          da doğru hesaplanır.
        </li>
        <li>
          <strong>Saate süre ekle:</strong> fırından çıkış, toplantı bitişi, ilaç saati. Sonuç ertesi güne geçerse belirtilir.
        </li>
        <li>
          <strong>Süre topla:</strong> haftalık mesai, ders saatleri, video süreleri.
        </li>
        <li>
          <strong>Mesai:</strong> giriş, çıkış ve mola süresinden günlük net çalışma ve haftalık toplam.
        </li>
      </ul>
      <p>
        Tarihler arasındaki gün sayısı için <Link href="/iki-tarih-arasi-gun-hesaplama">iki tarih arası gün hesaplama</Link>, bir
        tarihe gün eklemek için <Link href="/tarihe-gun-ekleme">tarihe gün ekleme</Link>, belirli bir süreye geri sayım için{" "}
        <Link href="/zamanlayici">zamanlayıcı</Link> kullanılabilir. Saatlerin ne kadar uyku ettiğini{" "}
        <Link href="/uyku-hesaplama">uyku hesaplama</Link> gösterir.
      </p>
    </SaatKabugu>
  );
}

import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HicriYasHesaplama } from "../components/dini/DiniAraclar2";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/hicri-yas-hesaplama";
const title = "Hicri Yaş Hesaplama: Hicri Takvime Göre Kaç Yaşındayım?";
const description = "Doğum tarihinizi girin: Hicri takvime göre yaşınızı, Hicri doğum tarihinizi ve bir sonraki Hicri doğum gününüzü görün.";

export const metadata: Metadata = {
  title: seoTitle(title, "Hicri Yaş Hesaplama"),
  description,
  alternates: { canonical: path, languages: { tr: path, ar: "/ar/hijri-age-calculator", "x-default": path } },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  { question: "Hicri yaş neden Miladi yaştan büyüktür?", answer: "Hicri yıl ayın hareketine göre 354 ya da 355 gündür, Miladi yıldan yaklaşık 11 gün kısadır. Bu fark birikir: yaklaşık her 33 yılda Hicri yaş Miladi yaşı bir yıl geçer." },
  { question: "Hicri doğum tarihi hangi takvime göre hesaplanıyor?", answer: "Hesap, Ümmü'l-Kurâ takvimine göre yapılır. Türkiye'de Diyanet'in yayımladığı Hicri takvimle bazı aylarda bir günlük fark olabilir." },
];

export default function HicriYasPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Hicri Yaş Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Hicri Yaş Hesaplama"
      intro="Doğum tarihinizi girin: Hicri takvime göre yaşınızı, Hicri doğum tarihinizi ve bir sonraki Hicri doğum gününüzü görün."
      tool={<HicriYasHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "fark", label: "Hicri ve Miladi yaş farkı" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="fark">Hicri ve Miladi yaş farkı</h2>
      <p>
        Hicri takvim ay yılına dayanır ve bir yılı Miladi yıldan yaklaşık 11 gün kısadır. Bu yüzden Hicri yaşınız Miladi yaşınızla aynı ya da
        daha büyüktür; fark yaklaşık her 33 yılda bir yaş açılır. Miladi yaşınızı ayrıntılı görmek için <Link href="/yas-hesaplama">yaş hesaplama</Link>, tarihleri birbirine çevirmek
        için <Link href="/tarih-cevirici">Hicri–Miladi tarih çevirici</Link> aracını kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

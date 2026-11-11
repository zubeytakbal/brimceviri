import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import BoltTorqueCalculator from "../components/BoltTorqueCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import EngineeringNextSteps from "../components/engineering/EngineeringNextSteps";
import { ENGINEERING_FLOWS } from "../converter/engineeringFlows";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Cıvata sıkma torku nasıl belirlenir?",
    answer:
      "Cıvata sıkma torku; cıvata ölçüsüne (M6, M8, M10...) ve dayanım sınıfına (8.8, 10.9, 12.9) göre DIN 13 gibi standartlara dayanan referans tablolardan alınır. Bu araçtaki değerler, birbirinden bağımsız iki kaynaktan çapraz doğrulanmış genel referans değerleridir.",
  },
  {
    question: "K-faktör (nut factor) yöntemi nedir?",
    answer:
      "T = K × D × F formülü, uygulanan tork (T) ile elde edilen sıkma kuvveti (F) arasındaki ilişkiyi tahmin eder. K, sürtünme koşullarına bağlı bir katsayıdır (kuru/hafif yağlı bağlantılar için genelde ~0,2 kabul edilir); D cıvatanın nominal çapıdır.",
  },
  {
    question: "Neden bu değerler kesin kabul edilmemeli?",
    answer:
      "Gerçek gereken tork; yüzey kaplaması, yağlama durumu, somun tipi ve bağlantının özel tasarım gereksinimlerine göre önemli ölçüde değişebilir. Kritik veya standarda tabi montajlarda cıvata üreticisinin veya tasarımcının belirttiği kesin değer kullanılmalıdır.",
  },
];

export const metadata: Metadata = {
  title: "Cıvata Torku Hesaplama (DIN 13, 8.8/10.9/12.9)",
  description:
    "Cıvata ölçüsü ve dayanım sınıfından önerilen sıkma torkunu (Nm), K-faktör yöntemiyle de tahmini sıkma kuvvetini hesapla.",
  alternates: {
    canonical: "/civata-torku-hesaplama",
  },
  openGraph: {
    title: "Cıvata Torku Hesaplama (DIN 13, 8.8/10.9/12.9)",
    description: "Cıvata ölçüsü ve sınıfından sıkma torku hesapla.",
    url: buildSiteUrl("/civata-torku-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function BoltTorqueCalculatorPage() {

  return (
    <AracSayfasi
      yol="/civata-torku-hesaplama"
      baslik="Cıvata Torku Hesaplama"
      hesap={<BoltTorqueCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <EngineeringNextSteps links={ENGINEERING_FLOWS["/civata-torku-hesaplama"]} />
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Kaynak işleri için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına, CNC/torna işleri için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Tork değerleri, DIN 13 normuna dayanan ve iki bağımsız
            kaynaktan (birbirine yakın sonuçlar veren) çapraz
            doğrulanmış genel referanslardır. K-faktör yöntemi,
            cıvata mühendisliğinde yaygın kullanılan T = K × D × F
            bağıntısına dayanır. Bu araç mühendislik onayı yerine
            geçmez.
          </p>
        </>
      }
    />
  );
}

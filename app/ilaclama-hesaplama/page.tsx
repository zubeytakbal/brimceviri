import type { Metadata } from "next";
import { IlaclamaHesaplama } from "../components/HayvancilikAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { tarimRelated } from "../i18n/tarimAraclari";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/ilaclama-hesaplama";
const title = "İlaçlama Hesaplama: Depoya Kaç ml İlaç, Dekara Kaç Litre Su?";
const description =
  "Etiketteki dozu (dekara ya da 100 litre suya), dekara su miktarını ve depo hacmini girin: depo başına ilaç, kaç depo gerektiği, toplam ilaç ve su miktarı.";

export const metadata: Metadata = {
  title: seoTitle(title, "İlaçlama Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Depoya ne kadar ilaç konur?",
    answer: "Etikette doz dekara verilmişse: depo başına ilaç = doz × depo hacmi ÷ dekara su. Örneğin dekara 50 ml, dekara 20 litre su ve 200 litrelik depoda 50 × 200 ÷ 20 = 500 ml ilaç konur; bu depo 10 dekar ilaçlar.",
  },
  {
    question: "100 litre suya doz verilmişse nasıl hesaplanır?",
    answer: "Depo hacmi 100'e bölünüp dozla çarpılır: 100 litre suya 150 ml yazan bir ilaçtan 600 litrelik depoya 6 × 150 = 900 ml konur. Bu kullanım genellikle bahçe ve sera ilaçlamalarında görülür.",
  },
  {
    question: "Dekara kaç litre su gider?",
    answer: "Tarla pülverizatörlerinde (boom) dekara genellikle 20–40 litre, bahçe atomizörlerinde ağacın büyüklüğüne göre 50–150 litre su kullanılır. Etikette önerilen su miktarı varsa ona uyun. Kendi makinenizi 1 dekarı temiz suyla ilaçlayarak ölçebilirsiniz.",
  },
  {
    question: "Sırt pompasına ne kadar ilaç konur?",
    answer: "Aynı hesap geçerlidir: depo hacmine 16 veya 20 litre yazın. Dekara 20 litre suyla çalışılıyorsa 20 litrelik bir sırt pompası 1 dekar ilaçlar ve depoya dekar dozu kadar ilaç konur.",
  },
];

export default function IlaclamaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ciftci-araclari", label: "Tarım ve Hayvancılık" },
        { href: path, label: "İlaçlama Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="İlaçlama Hesaplama (Depo Karışımı)"
      intro="İlaç etiketindeki dozu, dekara attığınız su miktarını ve depo hacmini girin; depoya kaç ml ilaç koymanız gerektiğini, alanınız için kaç depo ve toplam ne kadar ilaç gerektiğini görün."
      tool={<IlaclamaHesaplama />}
      related={{ title: "Diğer tarım ve hayvancılık araçları", links: tarimRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "formul", label: "Hesap nasıl yapılır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="formul">Hesap nasıl yapılır?</h2>
      <ul>
        <li>
          <strong>Bir depo kaç dekar ilaçlar:</strong> depo hacmi ÷ dekara su
        </li>
        <li>
          <strong>Depo başına ilaç (dekara doz):</strong> doz × depo hacmi ÷ dekara su
        </li>
        <li>
          <strong>Depo başına ilaç (100 L suya doz):</strong> doz × depo hacmi ÷ 100
        </li>
        <li>
          <strong>Kaç depo:</strong> alan × dekara su ÷ depo hacmi
        </li>
      </ul>
      <p>
        İlacı önce ayrı bir kapta biraz suyla karıştırın, depoyu yarıya kadar doldurup karıştırıcı çalışırken ilaçlı suyu ekleyin ve depoyu tamamlayın. Etiket dozunu
        aşmayın, koruyucu ekipman kullanın ve hasat öncesi bekleme süresine uyun.
      </p>
    </TimeToolPage>
  );
}

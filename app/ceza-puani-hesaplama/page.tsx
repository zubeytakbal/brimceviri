import type { Metadata } from "next";
import { CezaPuaniHesaplama } from "../components/AracSahibiAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import { PUAN_YAPTIRIM } from "../converter/aracHesaplari";
import type { FaqItem } from "../converter/faqSchema";
import { aracRelated } from "../i18n/aracAraclari";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/ceza-puani-hesaplama";
const title = "Ceza Puanı Hesaplama: Puanım Ne Zaman Silinir, 100'e Kaç Kaldı?";
const description =
  "İhlal tarihlerini ve puanlarını girin: bugün geçerli ceza puanınız, her puanın silineceği gün ve ehliyete el konulmasına kaç puan kaldığı. 100 puanda ehliyet kaç ay alınır?";

export const metadata: Metadata = {
  title: seoTitle(title, "Ceza Puanı Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Ceza puanı kaç olursa ehliyet alınır?",
    answer: "1 yıl içinde toplam 100 ceza puanına ulaşan sürücünün belgesine geçici olarak el konulur. 99 puanda bir şey olmaz; 100 ve üzeri sınırı aşmak demektir.",
  },
  {
    question: "100 ceza puanında ehliyet kaç ay alınır?",
    answer: "İlk seferde 2 ay, ikinci seferde 4 ay. Üçüncü kez 100 puanı dolduranın sürücü belgesi süresiz alınır. İlk seferde sürücü davranışlarını geliştirme eğitimi, ikincide ek olarak psikoteknik değerlendirme gerekir.",
  },
  {
    question: "Ceza puanı ne zaman silinir?",
    answer: "Her ihlalin puanı, ihlal tarihinden 1 yıl sonra düşer. Puanlar topluca yılbaşında sıfırlanmaz; her biri kendi tarihinde silinir. Bu yüzden toplamınız yıl içinde parça parça azalır.",
  },
  {
    question: "Hangi ihlal kaç puan?",
    answer:
      "Ceza puanı ihlale göre 5 ile 20 arasında değişir; örneğin kırmızı ışıkta geçmek ve alkollü araç kullanmak 20 puandır. Puanlar kanun değişikliğiyle güncellenebildiği için kendi cezanızın puanını tutanakta veya e-Devlet'teki ceza puanı sorgulamasında görün.",
  },
  {
    question: "Ceza puanını nereden öğrenirim?",
    answer: "e-Devlet'te Emniyet Genel Müdürlüğü'nün \"Sürücü Belgesi Ceza Puanı Sorgulama\" hizmeti geçerli puanınızı ve ihlalleri gösterir.",
  },
  {
    question: "Para cezasını ödemek puanı siler mi?",
    answer: "Hayır. Cezayı erken ödemek yalnızca para cezasında %25 indirim sağlar; puan, ihlal tarihinden 1 yıl geçene kadar kaydınızda kalır.",
  },
];

export default function CezaPuaniPage() {
  const now = new Date();
  const initialDate = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/otomotiv-araclari", label: "Otomotiv Araçları" },
        { href: path, label: "Ceza Puanı Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Ceza Puanı Hesaplama ve Silinme Tarihi"
      intro="Aldığınız cezaların tarihini ve puanını ekleyin; bugün kaç puanınız olduğunu, hangi puanın hangi gün düşeceğini ve 100 puana kaç kaldığını görün."
      tool={<CezaPuaniHesaplama initialDate={initialDate} />}
      related={{ title: "Diğer araç sahibi araçları", links: aracRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "sistem", label: "Ceza puanı nasıl işler?" },
        { id: "yaptirim", label: "100 puanda ne olur?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="sistem">Ceza puanı nasıl işler?</h2>
      <p>
        Her trafik ihlalinin para cezasının yanında bir puanı vardır. Puanlar sürücü belgesine işlenir ve <strong>ihlal tarihinden 1 yıl sonra</strong> silinir. Herhangi
        bir anda son 1 yıldaki puanların toplamı 100&apos;e ulaşırsa belgeye el konulur. Örnek: 14 Şubat&apos;ta 20, 3 Haziran&apos;da 10 puan aldıysanız toplam 30&apos;dur; 14
        Şubat ertesi yılda 20 puan düşer ve toplam 10&apos;a iner.
      </p>
      <h2 id="yaptirim">100 puanda ne olur?</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Kaçıncı kez</th>
              <th scope="col">Ehliyet</th>
              <th scope="col">Ek şart</th>
            </tr>
          </thead>
          <tbody>
            {PUAN_YAPTIRIM.map((x) => (
              <tr key={x.kez}>
                <th scope="row">{x.kez}. kez</th>
                <td>{x.sure === "iptal" ? "Süresiz alınır" : `${x.sure} alınır`}</td>
                <td>{x.not}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Bazı ağır ihlallerde (alkol, aşırı hız, kırmızı ışık tekrarı gibi) puandan bağımsız olarak ehliyete doğrudan el konulabilir; bu araç yalnızca puan toplamını izler.
      </p>
    </TimeToolPage>
  );
}

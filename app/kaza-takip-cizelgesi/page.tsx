import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { KazaTakip } from "../components/dini/DiniAraclar3";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/kaza-takip-cizelgesi";
const title = "Kaza Namazı Takip Çizelgesi: Üyeliksiz Kaza Sayacı";
const description = "Kaza namazı ve orucu borcunuzu girin, kıldıkça işaretleyin. Kalan vakit, rekât ve ilerleme cihazınızda saklanır; üyelik gerekmez.";

export const metadata: Metadata = {
  title: seoTitle(title, "Kaza Namazı Takip Çizelgesi"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Kayıtlarım nerede saklanıyor?",
    answer: "Yalnızca kullandığınız tarayıcıda (yerel depolama). Hesap açmanız gerekmez ve hiçbir veri sunucuya gönderilmez. Tarayıcı verilerini silerseniz ya da başka bir cihaz kullanırsanız kayıtlar görünmez.",
  },
  {
    question: "Kaza namazlarında sıra gözetmek gerekir mi?",
    answer: "Kaza namazı altı vakit ya da daha fazla olan kişi için sıra gözetmek gerekmez. Kılarken “kılmadığım ilk öğle namazı” ya da “son öğle namazı” diye niyet etmek yeterlidir.",
  },
  {
    question: "Borcumu bilmiyorum, nasıl başlarım?",
    answer: "Önce kaza namazı hesaplama aracıyla kılınmayan dönemden kaç gün borç çıktığını bulun, sonra o gün sayısını “Borca yaz” alanına yazın. Her vakte o kadar borç yazılır.",
  },
];

export default function KazaTakipPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Kaza Takip Çizelgesi" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kaza Namazı Takip Çizelgesi"
      intro="Her vakit için kaza borcunuzu yazın, kıldıkça +1'e basın. Kalan vakit ve rekât sayısını ve ilerlemenizi görün; kayıtlar üyelik olmadan bu cihazda saklanır."
      tool={<KazaTakip />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "kullanim", label: "Nasıl kullanılır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="kullanim">Nasıl kullanılır?</h2>
      <p>
        Borcunuz biliniyorsa her vaktin yanındaki “Borç” alanına yazın. Yalnızca gün sayısını biliyorsanız (örneğin 3 yıl kılınmadıysa yaklaşık
        1.095 gün) bunu üstteki alana yazıp “Borca yaz”a basın; sabah, öğle, ikindi, akşam, yatsı ve vitir için o kadar borç yazılır. Bir kaza
        namazı kıldığınızda o vaktin +1 düğmesine, bir günün bütün vakitlerini kıldığınızda alttaki düğmeye basın. Yanlışlıkla bastıysanız −1 ile
        geri alabilirsiniz. Toplam borcu hesaplamak için <Link href="/kaza-namazi-hesaplama">kaza namazı hesaplama</Link>, oruç borcu için{" "}
        <Link href="/kaza-orucu-hesaplama">kaza orucu hesaplama</Link> araçlarını kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

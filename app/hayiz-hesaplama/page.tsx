import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HayizHesaplama } from "../components/dini/DiniAraclar3";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { HAYIZ_MAX_SAAT, HAYIZ_MIN_SAAT, NIFAS_MAX_SAAT, TEMIZLIK_MIN_GUN } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/hayiz-hesaplama";
const title = "Hayız Hesaplama (Hanefî): Âdet mi, İstihaze mi?";
const description = "Kanamanın başladığı ve kesildiği anı girin: Hanefî ölçülerine göre hayız, nifas ve istihaze günlerini, gusül zamanını hesaplayın.";

export const metadata: Metadata = {
  title: seoTitle(title, "Hayız Hesaplama (Hanefî)"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const enAz = HAYIZ_MIN_SAAT / 24;
const enCok = HAYIZ_MAX_SAAT / 24;
const nifas = NIFAS_MAX_SAAT / 24;

const faqItems: FaqItem[] = [
  {
    question: "Hayız en az ve en çok kaç gündür?",
    answer: `Hanefî mezhebine göre hayızın en azı ${enAz} gün (${HAYIZ_MIN_SAAT} saat), en çoğu ${enCok} gündür. ${enAz} günden az süren kanama hayız değil istihazedir.`,
  },
  {
    question: "Kanama 10 günü geçerse ne olur?",
    answer: `Âdeti belli olan kadının alışılmış âdet günleri hayız, fazlası istihaze sayılır. İlk kez kanama gören kadın için ${enCok} gün hayız, kalanı istihazedir.`,
  },
  {
    question: "İki âdet arasında en az kaç gün olmalı?",
    answer: `İki hayız arasındaki temizlik süresi en az ${TEMIZLIK_MIN_GUN} gündür. Temizlikten sonra ${TEMIZLIK_MIN_GUN} gün dolmadan görülen kan hayız sayılmaz; bu durumda hüküm önceki âdete göre ayrıca değerlendirilir.`,
  },
  {
    question: "Lohusalık (nifas) kaç gün sürer?",
    answer: `Nifasın en azı için bir sınır yoktur; kan kesilince gusledilip namaza başlanır. En çoğu ${nifas} gündür; ${nifas} günü geçen kan istihazedir.`,
  },
];

export default function HayizPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Hayız Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Hayız ve Nifas Hesaplama (Hanefî)"
      intro="Kanamanın başladığı ve kesildiği anı, biliyorsanız alışılmış âdet sürenizi girin. Hanefî mezhebinin ölçülerine göre hangi sürenin hayız ya da nifas, hangisinin istihaze olduğunu ve gusül zamanını görün."
      tool={<HayizHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "olculer", label: "Hanefî mezhebinde ölçüler" },
        { id: "uyari", label: "Bu araç neyi hesaplamaz?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="olculer">Hanefî mezhebinde ölçüler</h2>
      <ul>
        <li>
          Hayız en az {enAz} gün ({HAYIZ_MIN_SAAT} saat), en çok {enCok} gündür.
        </li>
        <li>İki hayız arasındaki temizlik en az {TEMIZLIK_MIN_GUN} gündür.</li>
        <li>Nifas (lohusalık) için en az süre yoktur; en çok {nifas} gündür.</li>
        <li>Hayız ve nifas sınırlarının dışında kalan kan istihazedir (özür kanı): namaz kılınır, oruç tutulur.</li>
      </ul>
      <h2 id="uyari">Bu araç neyi hesaplamaz?</h2>
      <p>
        Araç, Diyanet İşleri Başkanlığı'nın da esas aldığı Hanefî ölçülerini uygular ve yalnızca süreleri ayırır. Şâfiî mezhebindeki farklı
        ölçüler, ara ara kesilen kanamalar, {TEMIZLIK_MIN_GUN} günden kısa temizlikler ve âdeti düzensiz olanların durumu ayrıntılı değerlendirme
        gerektirir. Şüphede kalırsanız Diyanet'in 190 numaralı Alo Fetva hattına ya da bulunduğunuz yerin müftülüğüne danışın. İki tarih arasında
        kaç gün olduğunu <Link href="/iki-tarih-arasi-gun-hesaplama">gün hesaplama</Link> aracıyla bulabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

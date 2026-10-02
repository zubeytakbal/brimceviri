import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { Zikirmatik } from "../components/dini/DiniAraclar3";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/zikirmatik";
const title = "Online Zikirmatik: Dijital Tesbih Sayacı (33, 99, 100)";
const description = "Ekrana dokunarak zikir çekin: 33, 99, 100 ya da 1000 hedefli dijital tesbih. Hedefe ulaşınca titreşir, sayı cihazınızda saklanır; uygulama gerekmez.";

export const metadata: Metadata = {
  title: seoTitle(title, "Online Zikirmatik: Dijital Tesbih", "Online Zikirmatik"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Namazdan sonra tesbihat kaçar kez çekilir?",
    answer: "Farz namazlardan sonra 33 kez Sübhânallah, 33 kez Elhamdülillâh ve 33 kez Allâhu Ekber denir. Hedefi 33'e ayarlayıp her zikirden sonra sayacı sıfırlayabilirsiniz.",
  },
  {
    question: "Sayaç kapatınca sıfırlanır mı?",
    answer: "Hayır. Sayı tarayıcınızda saklanır; sayfayı yeniden açtığınızda kaldığınız yerden devam eder. Telefonunuzda ana ekrana ekleyerek uygulama gibi kullanabilirsiniz.",
  },
  {
    question: "Titreşim neden çalışmıyor?",
    answer: "Titreşim Android telefonlardaki tarayıcılarda çalışır; iPhone'daki Safari web sitelerinin titreşim kullanmasına izin vermez.",
  },
];

export default function ZikirmatikPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Zikirmatik" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Online Zikirmatik"
      intro="Zikri ve hedefi seçin, büyük daireye dokunarak sayın. Hedefe her ulaştığınızda bir tur tamamlanır; sayı bu cihazda saklanır."
      tool={<Zikirmatik />}
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
        Listeden zikri, yanından hedefi (33, 99, 100, 500, 1000 ya da hedefsiz) seçin ve ortadaki daireye dokunun. Daire, o turdaki sayıyı ve
        tamamlanan tur sayısını gösterir. Yanlış dokunduysanız “Geri al” ile bir eksiltebilirsiniz. Klavyede daireye odaklanıp boşluk ya da
        Enter tuşuyla da sayabilirsiniz. Allah'ın 99 ismini anlamlarıyla <Link href="/esmaul-husna">Esmâ-i Hüsnâ</Link> sayfasında
        bulabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

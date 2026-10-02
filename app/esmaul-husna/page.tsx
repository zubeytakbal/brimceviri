import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { EsmaListesi } from "../components/dini/DiniAraclar3";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { ESMAUL_HUSNA } from "../converter/esmaulHusna";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/esmaul-husna";
const title = "Esmaül Hüsna: Allah'ın 99 İsmi ve Anlamları";
const description = "Esmâ-i Hüsnâ: Allah'ın 99 güzel ismi sırasıyla ve kısa anlamlarıyla. İsim ya da anlama göre arayın.";

export const metadata: Metadata = {
  title: seoTitle(title, "Esmaül Hüsna: 99 İsim ve Anlamları"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const bul = (ad: string) => ESMAUL_HUSNA.find((e) => e.ad === ad)!;
const rahman = bul("Er-Rahmân");
const rahim = bul("Er-Rahîm");

const faqItems: FaqItem[] = [
  {
    question: "Esmaül Hüsna ne demek?",
    answer: "“En güzel isimler” demektir. Kur'an'da “En güzel isimler Allah'ındır; O'na bu isimlerle dua edin” (A'râf 7/180) buyrulur.",
  },
  {
    question: "Allah'ın 99 ismi nereden gelir?",
    answer: `Bu sayfadaki sıralama, Tirmizî'nin rivayet ettiği hadisteki listedir: “Allah'ın doksan dokuz ismi vardır; onları sayan (öğrenip benimseyen) cennete girer.” İlk isim Allah, ${ESMAUL_HUSNA.length}. isim ${ESMAUL_HUSNA[ESMAUL_HUSNA.length - 1].ad}'dur.`,
  },
  {
    question: "Rahmân ile Rahîm arasındaki fark nedir?",
    answer: `${rahman.ad}: ${rahman.anlam.toLocaleLowerCase("tr-TR")}. ${rahim.ad}: ${rahim.anlam.toLocaleLowerCase("tr-TR")}.`,
  },
];

export default function EsmaulHusnaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Esmaül Hüsna" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Esmaül Hüsna: Allah'ın 99 İsmi"
      intro="Allah'ın 99 güzel ismi sırasıyla ve kısa anlamlarıyla. Aradığınız ismi ya da anlamı yazarak listeyi daraltın."
      tool={<EsmaListesi />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "hakkinda", label: "Esmâ-i Hüsnâ hakkında" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="hakkinda">Esmâ-i Hüsnâ hakkında</h2>
      <p>
        Allah'ın isimleri Kur'an'da ve hadislerde geçer; en bilinen liste Tirmizî'nin rivayetindeki 99 isimdir. Anlamlar, Türkçe kaynaklardaki
        yaygın açıklamalara göre kısaltılmıştır; bir ismin bütün anlam derinliğini tek cümle karşılamaz. İsimlerle zikir çekerken saymak için{" "}
        <Link href="/zikirmatik">online zikirmatik</Link> aracını kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

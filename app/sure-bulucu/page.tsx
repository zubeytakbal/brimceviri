import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { SureBulucu } from "../components/dini/DiniAraclar";
import { EzberPlani } from "../components/dini/KuranAraclari";
import { ayetId, sayfaOf } from "../converter/kuranPlan";
import { SAFII_SECDE, SECDE_AYETLERI, SURE_META } from "../converter/sureMeta";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { SURELER, TOPLAM_AYET } from "../converter/sureler";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/sure-bulucu";
const title = "Sure Bulucu: Kaç Ayet, Hangi Cüzde, Kaçıncı Sayfada?";
const description = `Kur'an-ı Kerim'in 114 suresi tek tabloda: ayet sayısı, cüz, Mekkî/Medenî, iniş sırası ve Medine mushafındaki sayfası. Ezber planı ile bir sureyi günde kaç ayetle kaç günde ezberleyeceğinizi hesaplayın.`;

export const metadata: Metadata = {
  title: seoTitle(title, "Sure Bulucu"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const enUzun = [...SURELER].sort((a, b) => b.ayet - a.ayet)[0];
const enKisa = SURELER.filter((s) => s.ayet === Math.min(...SURELER.map((x) => x.ayet)));

const mekkiSayisi = SURELER.filter((s) => SURE_META[s.no].mekki).length;
const ad = (no: number) => SURELER[no - 1].ad;

const faqItems: FaqItem[] = [
  { question: "Kur'an-ı Kerim'de kaç sure ve kaç ayet var?", answer: `114 sure ve ${TOPLAM_AYET.toLocaleString("tr-TR")} ayet vardır (Hafs rivayeti, Kûfe sayımı). Kur'an 30 cüze ayrılır.` },
  { question: "En uzun ve en kısa sure hangisi?", answer: `En uzun sure ${enUzun.ayet} ayetle ${enUzun.ad} Suresi'dir. En kısa sureler 3'er ayetle ${enKisa.map((s) => s.ad).join(", ")} sureleridir.` },
  { question: "Sayfa numaraları hangi mushafa göre?", answer: "Sayfalar 604 sayfalık Medine mushafına göredir. Türkiye'de basılan bazı mushaflarda sure başları bir iki sayfa kayabilir; cüz ve ayet bilgisi ise baskıdan bağımsızdır." },
  { question: "Mekkî ve Medenî sure ne demek?", answer: `Hicretten önce inen surelere Mekkî, hicretten sonra inenlere Medenî denir. 114 surenin ${mekkiSayisi}'i Mekkî, ${114 - mekkiSayisi}'si Medenî kabul edilir. Tablodaki iniş sırası, yaygın kabul gören nüzul sıralamasıdır.` },
];

export default function SureBulucuPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Sure Bulucu" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Sure Bulucu"
      intro="Sure adını ya da sıra numarasını yazın: ayet sayısını, cüzünü, Mekkî mi Medenî mi olduğunu, iniş sırasını ve Medine mushafındaki sayfasını görün."
      tool={<SureBulucu />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "ezber", label: "Ezber planı" },
        { id: "secde", label: "Secde ayetleri" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="ezber">Ezber planı</h2>
      <p>
        Sureyi ve günde kaç ayet ezberlemek istediğinizi seçin; plan gün gün hangi ayetleri ezberleyeceğinizi gösterir.
        Uzun ayetli surelerde (Bakara, Nisa gibi) günlük ayet sayısını düşük tutmak daha gerçekçidir.
      </p>
      <EzberPlani />

      <h2 id="secde">Secde ayetleri</h2>
      <p>
        Hanefî mezhebine göre Kur&apos;an&apos;da {SECDE_AYETLERI.length - 1} secde ayeti vardır; okunduğunda ya da
        dinlendiğinde tilavet secdesi yapılır:
      </p>
      <ul>
        {SECDE_AYETLERI.filter(([s, a]) => !(s === SAFII_SECDE[0] && a === SAFII_SECDE[1])).map(([s, a]) => (
          <li key={`${s}-${a}`}>
            {ad(s)} Suresi {a}. ayet (sayfa {sayfaOf(ayetId(s, a))})
          </li>
        ))}
      </ul>
      <p>
        Şafiî mezhebinde bunlara {ad(SAFII_SECDE[0])} Suresi {SAFII_SECDE[1]}. ayet de eklenir. Cüzlerin başladığı
        ayetler ve hatim dağıtımı için <Link href="/cuzler">Cüzler ve Hatim Dağıtımı</Link> sayfasına bakın.
      </p>
    </TimeToolPage>
  );
}

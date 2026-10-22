import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AnnualOutdatedNotice from "../components/de/AnnualOutdatedNotice";
import MaasHesaplama from "../components/MaasHesaplama";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import {
  ASGARI_BRUT,
  MAAS_YILI,
  SGK_TAVAN,
  yillikBordro,
} from "../converter/turkishMaas";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 86400;

const path = "/brutten-nete-maas-hesaplama";
const title = `Brütten Nete Maaş Hesaplama ${MAAS_YILI}`;
const description = `Brütten nete ve netten brüte maaş hesaplama ${MAAS_YILI}: SGK, işsizlik, gelir vergisi (kümülatif), damga vergisi ve asgari ücret istisnasıyla 12 aylık bordro ve işveren maliyeti.`;

export const metadata: Metadata = {
  title: `${title}: 12 Aylık Bordro`,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const tl = (n: number) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;
const ornekler = [ASGARI_BRUT, 40000, 50000, 60000, 75000, 100000, 150000];

const faqItems: FaqItem[] = [
  {
    question: "Brüt maaştan hangi kesintiler yapılır?",
    answer:
      "SGK işçi payı %14, işsizlik sigortası işçi payı %1, gelir vergisi (%15–%40, yıl içindeki toplam matraha göre) ve binde 7,59 damga vergisi. Asgari ücret kadar kısmın gelir ve damga vergisi alınmaz; bu istisna her çalışana uygulanır.",
  },
  {
    question: "Neden yılın sonuna doğru net maaşım düşüyor?",
    answer:
      "Gelir vergisi kümülatif hesaplanır: yıl başından beri kazandığınız toplam matrah 190.000 TL'yi geçince %20, 400.000 TL'yi geçince %27 dilimine girersiniz. Brüt maaşınız aynı kalsa da üst dilime geçilen aylarda net maaşınız azalır ve Ocak'ta yeniden yükselir.",
  },
  {
    question: `${MAAS_YILI} asgari ücret net ne kadar?`,
    answer: `Brüt ${tl(ASGARI_BRUT)}, net ${tl(ASGARI_BRUT * 0.85)}. Asgari ücretten yalnız SGK (%14) ve işsizlik (%1) primi kesilir; gelir ve damga vergisi alınmaz. İşverene maliyeti teşviksiz ${tl(ASGARI_BRUT * 1.2375)}'dir.`,
  },
  {
    question: "SGK tavanı nedir?",
    answer: `Prime esas kazancın üst sınırıdır: ${MAAS_YILI}'da brüt asgari ücretin 9 katı, yani ${tl(SGK_TAVAN)}. Bunun üzerindeki maaş kısmından SGK ve işsizlik primi kesilmez, ama gelir vergisi alınır.`,
  },
  {
    question: "Emekli çalışanın maaşından ne kesilir?",
    answer:
      "Emekli olup çalışanlar sosyal güvenlik destek primine (SGDP) tabidir: işçi payı %7,5, işsizlik sigortası kesilmez. Gelir ve damga vergisi normal çalışanlarla aynı şekilde hesaplanır.",
  },
];

export default function MaasPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/muhasebeci-araclari", label: "Muhasebeci Araçları" },
        { href: path, label: "Brütten Nete Maaş" },
      ]}
      crumbLabel="Sayfa yolu"
      title={title}
      intro={`Brüt maaşınızın ${MAAS_YILI} yılı boyunca her ay ne kadar net ödeneceğini veya istediğiniz net maaş için gereken brütü hesaplayın. SGK, işsizlik, kümülatif gelir vergisi, damga vergisi ve asgari ücret istisnası dahildir.`}
      tool={
        <>
          <AnnualOutdatedNotice id="tr-maas" lang="tr" />
          <MaasHesaplama />
        </>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          {
            href: "/kidem-tazminati-hesaplama",
            label: "Kıdem ve İhbar Tazminatı Hesaplama",
          },
          { href: "/kdv-hesaplama", label: "KDV Hesaplama" },
          { href: "/altin-hesaplama", label: "Altın Hesaplama" },
          { href: "/muhasebeci-araclari", label: "Muhasebeci Araçları" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: `${MAAS_YILI} brüt – net maaş tablosu` },
        { id: "oranlar", label: "Kesinti oranları ve vergi dilimleri" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">{MAAS_YILI} brüt – net maaş tablosu</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Brüt</th>
              <th scope="col">Ocak net</th>
              <th scope="col">Aralık net</th>
              <th scope="col">Yıllık ortalama net</th>
            </tr>
          </thead>
          <tbody>
            {ornekler.map((b) => {
              const y = yillikBordro(b, { emekli: false, tesvikPuan: 0 });
              return (
                <tr key={b}>
                  <td>{tl(b)}</td>
                  <td>{tl(y.aylar[0].net)}</td>
                  <td>{tl(y.aylar[11].net)}</td>
                  <td>{tl(y.netYil / 12)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="oranlar">Kesinti oranları ve vergi dilimleri ({MAAS_YILI})</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <tbody>
            <tr>
              <th scope="row">SGK işçi payı</th>
              <td>%14 (emekli SGDP: %7,5)</td>
            </tr>
            <tr>
              <th scope="row">İşsizlik sigortası işçi payı</th>
              <td>%1</td>
            </tr>
            <tr>
              <th scope="row">Gelir vergisi dilimleri (ücret)</th>
              <td>
                190.000 TL'ye kadar %15 · 400.000 TL'ye kadar %20 · 1.500.000
                TL'ye kadar %27 · 5.300.000 TL'ye kadar %35 · üzeri %40
              </td>
            </tr>
            <tr>
              <th scope="row">Damga vergisi</th>
              <td>binde 7,59 (asgari ücret kadar kısım istisna)</td>
            </tr>
            <tr>
              <th scope="row">SGK tavanı</th>
              <td>{tl(SGK_TAVAN)}</td>
            </tr>
            <tr>
              <th scope="row">İşveren payı</th>
              <td>SGK %21,75 + işsizlik %2; teşvikle 2 veya 5 puan indirim</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        İşten ayrılırken alacağınız tazminatı{" "}
        <Link href="/kidem-tazminati-hesaplama">
          kıdem ve ihbar tazminatı hesaplama
        </Link>{" "}
        ile bulabilirsiniz.
      </p>
      <p>
        <small>
          Dayanak: 5510 sayılı Kanun, 4447 sayılı Kanun, Gelir Vergisi Kanunu
          md. 23/18 ve 103, Damga Vergisi Kanunu; {MAAS_YILI} asgari ücret ve
          SGK tavanı. Engellilik indirimi, BES kesintisi ve özel sigorta hesaba
          katılmaz; hesaplama bilgilendirme amaçlıdır.
        </small>
      </p>
    </TimeToolPage>
  );
}

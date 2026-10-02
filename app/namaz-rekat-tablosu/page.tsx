import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { GUNLUK_FARZ_REKAT, toplamRekat, VAKIT_NAMAZLARI, type RekatKalemi } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/namaz-rekat-tablosu";
const title = "Namazlar Kaç Rekât? Beş Vakit Namaz Rekât Tablosu";
const description = "Sabah, öğle, ikindi, akşam ve yatsı namazı kaç rekât? Farz, sünnet ve vacip rekâtlar tek tabloda; cuma, bayram ve teravih namazı rekâtları.";

export const metadata: Metadata = {
  title: seoTitle(title, "Namazlar Kaç Rekât? Rekât Tablosu", "Namaz Rekât Tablosu"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const HUKUM: Record<RekatKalemi["hukum"], string> = {
  farz: "farz",
  vacip: "vacip",
  "sunnet-muekked": "müekked sünnet",
  "sunnet-gayrimuekked": "gayr-i müekked sünnet",
};

const gunlukToplam = VAKIT_NAMAZLARI.reduce((t, n) => t + toplamRekat(n), 0);
const vakit = (id: string) => VAKIT_NAMAZLARI.find((n) => n.id === id)!;
const ozet = (id: string) =>
  vakit(id)
    .kalemler.map((k) => `${k.rekat} rekât ${k.ad.toLocaleLowerCase("tr-TR")}`)
    .join(", ");

const faqItems: FaqItem[] = [
  ...VAKIT_NAMAZLARI.map((n) => ({
    question: `${n.ad} namazı kaç rekât?`,
    answer: `${n.ad} namazı toplam ${toplamRekat(n)} rekâttır: ${ozet(n.id)}.`,
  })),
  {
    question: "Günde toplam kaç rekât namaz kılınır?",
    answer: `Beş vakitte ${GUNLUK_FARZ_REKAT} rekât farz, 3 rekât vitir (vacip) ve sünnetlerle birlikte toplam ${gunlukToplam} rekât kılınır.`,
  },
];

export default function NamazRekatPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Namaz Rekât Tablosu" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Namaz Rekât Tablosu"
      intro={`Beş vakit namazın farz, sünnet ve vacip rekâtları kılınış sırasıyla. Günde ${GUNLUK_FARZ_REKAT} rekât farz, toplam ${gunlukToplam} rekât.`}
      tool={
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Vakit</th>
                <th scope="col">Kılınış sırası</th>
                <th scope="col">Farz</th>
                <th scope="col">Toplam</th>
              </tr>
            </thead>
            <tbody>
              {VAKIT_NAMAZLARI.map((n) => (
                <tr key={n.id}>
                  <td>
                    <strong>{n.ad}</strong>
                  </td>
                  <td>
                    {n.kalemler.map((k, i) => (
                      <span key={k.ad}>
                        {i > 0 ? " → " : ""}
                        {k.rekat} {k.ad.toLocaleLowerCase("tr-TR")}
                        {k.hukum.startsWith("sunnet") ? <small> ({HUKUM[k.hukum]})</small> : null}
                      </span>
                    ))}
                  </td>
                  <td>{toplamRekat(n, "farz")}</td>
                  <td>{toplamRekat(n)}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>Günlük</strong>
                </td>
                <td>farz + vitir + sünnetler</td>
                <td>{GUNLUK_FARZ_REKAT}</td>
                <td>{gunlukToplam}</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "diger", label: "Cuma, bayram ve teravih namazı" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="diger">Cuma, bayram ve teravih namazı</h2>
      <ul>
        <li>
          <strong>Cuma namazı:</strong> 4 rekât ilk sünnet, 2 rekât farz, 4 rekât son sünnet. Türkiye'de bunlara ek olarak çoğunlukla 4 rekât
          zuhr-i âhir ve 2 rekât vaktin sünneti kılınır.
        </li>
        <li>
          <strong>Bayram namazı:</strong> Hanefî mezhebinde 2 rekât, vaciptir; ilave tekbirlerle kılınır.
        </li>
        <li>
          <strong>Teravih namazı:</strong> Ramazan'da yatsının farzından sonra 20 rekât; vitir, teravihten sonra kılınır.
        </li>
        <li>
          <strong>Cenaze namazı:</strong> Rükû ve secdesi yoktur; ayakta dört tekbirle kılınır.
        </li>
      </ul>
      <p>
        Tablo, Diyanet İşleri Başkanlığı'nın esas aldığı Hanefî mezhebine göredir. Kaza edilen namazlarda yalnızca farzlar ve vitir kaza edilir;
        borcunuzu <Link href="/kaza-namazi-hesaplama">kaza namazı hesaplama</Link> aracıyla bulabilir, kıldıklarınızı{" "}
        <Link href="/kaza-takip-cizelgesi">kaza takip çizelgesi</Link> ile işaretleyebilirsiniz.
      </p>
    </TimeToolPage>
  );
}

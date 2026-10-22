import type { Metadata } from "next";
import { MuayeneTarihiHesaplama } from "../components/AracSahibiAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import { MUAYENE, type MuayeneTuru } from "../converter/aracHesaplari";
import type { FaqItem } from "../converter/faqSchema";
import { aracRelated } from "../i18n/aracAraclari";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/arac-muayene-tarihi-hesaplama";
const title = "Araç Muayene Tarihi Hesaplama: Sıfır Araç İlk Muayene Ne Zaman?";
const description =
  "Ruhsattaki tescil tarihini ya da son muayene gününü girin: ilk muayene ve sonraki muayeneler ne zaman, kaç gün kaldı? Hususi otomobil, ticari araç ve motosiklet süreleri.";

export const metadata: Metadata = {
  title: seoTitle(title, "Araç Muayene Tarihi Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Sıfır araç ilk muayene ne zaman?",
    answer:
      "Hususi otomobil ve motosiklette ilk muayene, ruhsattaki ilk tescil tarihinden 3 yıl sonradır; ardından 2 yılda bir yapılır. Ticari araçlarda (taksi, kamyonet, minibüs, kamyon, otobüs) ilk muayene 1 yıl sonra, sonra her yıl.",
  },
  {
    question: "Araç muayenesi kaç yılda bir yapılır?",
    answer: "Hususi otomobilde 2 yılda bir, ticari araçlarda her yıl. Motosiklet hususi otomobille aynıdır: ilk 3 yıl, sonra 2 yılda bir.",
  },
  {
    question: "Muayene tarihimi nasıl öğrenirim?",
    answer:
      "Ruhsatın arka yüzündeki muayene kaşesinde geçerlilik tarihi yazar. e-Devlet'te \"Araç Muayene Bilgileri Sorgulama\" ve TÜVTÜRK sitesinde plaka ile de sorgulanabilir.",
  },
  {
    question: "Muayeneyi erken yaptırırsam sonraki tarih ne olur?",
    answer:
      "Sonraki muayene, muayeneden geçtiğiniz günden itibaren sayılır. Bu yüzden çok erken gitmek bir sonraki muayeneyi de öne çeker; hesaplayıcıda son muayene gününü girerek görebilirsiniz.",
  },
  {
    question: "Muayene tarihi geçerse ne olur?",
    answer:
      "Her geciken ay için gecikme bedeli ödenir; bu bedel her ay ÜFE ile güncellendiği için tutarı randevu sırasında TÜVTÜRK gösterir. Muayenesiz araçla trafiğe çıkmak ayrıca para cezası ve trafikten men sebebidir.",
  },
  {
    question: "İkinci el araçta muayene süresi sıfırlanır mı?",
    answer: "Hayır. Araç satılınca muayene tarihi değişmez; ruhsatta yazan geçerlilik tarihi yeni sahip için de geçerlidir.",
  },
];

const turler: MuayeneTuru[] = ["hususi", "motosiklet", "ticari"];

export default function MuayenePage() {
  const now = new Date();
  const initialDate = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/otomotiv-araclari", label: "Otomotiv Araçları" },
        { href: path, label: "Araç Muayene Tarihi Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Araç Muayene Tarihi Hesaplama"
      intro="Araç türünü seçin, sıfır araçsa ruhsattaki ilk tescil tarihini, daha önce muayene olduysa muayeneden geçtiği günü girin; sonraki muayenelerin son gününü görün."
      tool={<MuayeneTarihiHesaplama initialDate={initialDate} />}
      related={{ title: "Diğer araç sahibi araçları", links: aracRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "sureler", label: "Araç türüne göre muayene süreleri" },
        { id: "nasil", label: "Muayene tarihi nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="sureler">Araç türüne göre muayene süreleri</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Araç</th>
              <th scope="col">İlk muayene</th>
              <th scope="col">Sonra</th>
            </tr>
          </thead>
          <tbody>
            {turler.map((t) => (
              <tr key={t}>
                <th scope="row">{MUAYENE[t].ad}</th>
                <td>{MUAYENE[t].ilk} yaşında</td>
                <td>{MUAYENE[t].periyot === 1 ? "Her yıl" : `${MUAYENE[t].periyot} yılda bir`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Traktör, iş makinesi ve römork gibi araçlar için süre farklı olabilir; ruhsattaki muayene geçerlilik tarihine bakın.</p>
      <h2 id="nasil">Muayene tarihi nasıl hesaplanır?</h2>
      <p>
        Sıfır araçta sayım ruhsattaki <strong>ilk tescil tarihinden</strong> başlar: 15 Mart 2024&apos;te tescil edilen hususi otomobilin ilk muayenesi en geç 15 Mart
        2027&apos;dedir. Muayeneden geçen aracın bir sonraki muayenesi, <strong>muayeneden geçtiği günden</strong> itibaren 2 yıl (ticari araçta 1 yıl) sonradır. Kesin
        tarih her zaman ruhsattaki kaşede yazandır.
      </p>
    </TimeToolPage>
  );
}

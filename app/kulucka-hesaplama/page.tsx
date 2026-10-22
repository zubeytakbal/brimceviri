import type { Metadata } from "next";
import { KuluckaHesaplama } from "../components/HayvancilikAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { KANATLILAR, KILIT_GUN, type KanatliTuru } from "../converter/hayvancilik";
import { tarimRelated } from "../i18n/tarimAraclari";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/kulucka-hesaplama";
const title = "Kuluçka Hesaplama: Civciv Kaç Günde Çıkar? Kuluçka Takvimi";
const description =
  "Yumurtaları kuluçkaya koyduğunuz günü girin: tavuk, bıldırcın, hindi, ördek ve kaz için ışık kontrolü, çevirmeyi bırakma ve çıkım günü; civciv ısısı ve kuluçka randımanı.";

export const metadata: Metadata = {
  title: seoTitle(title, "Kuluçka Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Yumurta kuluçkada kaç günde çıkar?",
    answer: `Tavuk ${KANATLILAR.tavuk.gun}, bıldırcın ${KANATLILAR.bildircin.gun}, hindi ve ördek ${KANATLILAR.hindi.gun}, kaz ${KANATLILAR.kaz.gun}, Mısır ördeği ${KANATLILAR.mordek.gun} günde çıkar. Sıcaklık düşükse çıkım bir iki gün gecikebilir.`,
  },
  {
    question: "Döl kontrolü (ışık kontrolü) ne zaman yapılır?",
    answer: "Tavukta 7. günde damarlanma görülür; döllü olmayan yumurtalar ayrılır. 14. günde ikinci kontrolle gelişimi duran yumurtalar çıkarılır. Bıldırcında 5. ve 10. günler uygundur.",
  },
  {
    question: "Kuluçkanın son 3 günü ne yapılmalı?",
    answer: `Çıkımdan ${KILIT_GUN} gün önce (tavukta 18. gün) yumurta çevirme bırakılır, nem %65–70'e çıkarılır ve makine olabildiğince açılmaz. Civcivler bu dönemde hava boşluğuna geçip kabuğu deler.`,
  },
  {
    question: "Kuluçkaya konan yumurta kaç günlük olmalı?",
    answer: "En iyi sonuç 7 günden eski olmayan yumurtalarla alınır. Yumurtalar 15–18 °C'de, sivri ucu aşağı bakacak şekilde saklanmalı; 10 günü geçen yumurtalarda çıkış oranı belirgin düşer. Yıkanmış yumurta kuluçkaya konmamalıdır.",
  },
  {
    question: "Civcivlerde ısı kaç gün yüksek tutulur?",
    answer: "İlk hafta ısıtıcı altında 33–35 °C gerekir; sonra her hafta yaklaşık 3 °C düşürülür. Tüylenme tamamlanan 5–6. haftada ısıtıcı kaldırılabilir. Civcivler ısıtıcının altına yığılıyorsa üşüyor, uzak duruyorsa fazla sıcaktır.",
  },
  {
    question: "Boş çıkan yumurtalar ne zaman alınır?",
    answer: "Çıkım gününden sonra 1–2 gün daha beklenir; bu sürede çıkmayan yumurtalar alınır. Işık kontrollerinde döllü olmadığı anlaşılan yumurtalar ise 7. günde ayrılmalıdır.",
  },
];

export default function KuluckaPage() {
  const now = new Date();
  const initialDate = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ciftci-araclari", label: "Tarım ve Hayvancılık" },
        { href: path, label: "Kuluçka Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kuluçka Hesaplama ve Kuluçka Takvimi"
      intro="Yumurtaları kuluçka makinesine ya da gurk tavuğun altına koyduğunuz günü girin; ışık kontrolü, çevirmeyi bırakma ve çıkım günlerini, civciv ısıtıcı sıcaklığını görün ve kuluçka randımanınızı hesaplayın."
      tool={<KuluckaHesaplama initialDate={initialDate} />}
      related={{ title: "Diğer tarım ve hayvancılık araçları", links: tarimRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "sureler", label: "Kanatlılarda kuluçka süreleri" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="sureler">Kanatlılarda kuluçka süreleri</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Tür</th>
              <th scope="col">Çıkım</th>
              <th scope="col">Işık kontrolü</th>
              <th scope="col">Çevirmeyi bırak</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(KANATLILAR) as KanatliTuru[]).map((k) => {
              const x = KANATLILAR[k];
              return (
                <tr key={k}>
                  <th scope="row">{x.ad}</th>
                  <td>{x.gun}. gün</td>
                  <td>
                    {x.kontrol[0]}. ve {x.kontrol[1]}. gün
                  </td>
                  <td>{x.gun - KILIT_GUN}. gün</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>
        Makine sıcaklığı genellikle 37,5–37,8 °C, nem gelişim döneminde %50–55, son {KILIT_GUN} günde %65–70 tutulur. Su kanatlılarında (ördek, kaz) nem biraz daha
        yüksek olmalıdır; makinenizin kılavuzundaki değerler önceliklidir.
      </p>
    </TimeToolPage>
  );
}

import type { Metadata } from "next";
import { ErkenOdemeHesaplama } from "../components/AracSahibiAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import { ERKEN_ODEME_INDIRIM } from "../converter/aracHesaplari";
import type { FaqItem } from "../converter/faqSchema";
import { aracRelated } from "../i18n/aracAraclari";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/trafik-cezasi-erken-odeme-hesaplama";
const title = "Trafik Cezası Erken Ödeme İndirimi Hesaplama: Son Gün Ne Zaman?";
const description =
  "Ceza tutarını ve tebliğ tarihini girin: %25 indirimle ne kadar ödersiniz, indirimin son günü hangi tarih, kaç gün kaldı? Elden, posta ve e-Tebligat için ayrı hesap.";

export const metadata: Metadata = {
  title: seoTitle(title, "Trafik Cezası Erken Ödeme Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const tl = (x: number) => `${x.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} TL`;
const ornekler = [500, 1000, 1500, 2000, 2500, 3000, 5000, 7500, 10000, 20000];

const faqItems: FaqItem[] = [
  {
    question: "Trafik cezası erken ödeme indirimi kaç gün?",
    answer:
      "Tebliğ tarihinden itibaren 1 ay. Süre ay ile hesaplandığı için son gün, tebliğ gününün bir sonraki aydaki karşılığıdır: 3 Ekim'de tebliğ edilen cezanın indirimli son günü 3 Kasım'dır. 2024'ten önce bu süre 15 gündü.",
  },
  {
    question: "Erken ödemede yüzde kaç indirim var?",
    answer: "%25. Cezanın dörtte üçünü ödersiniz: 2.000 TL'lik ceza 1.500 TL, 5.000 TL'lik ceza 3.750 TL olur.",
  },
  {
    question: "Tebliğ tarihi hangi gün sayılır?",
    answer:
      "Ceza size elden yazıldıysa tutanağı imzaladığınız gün tebliğ günüdür. Posta ile geldiyse tebligatı teslim aldığınız gün; e-Tebligat ile geldiyse elektronik adresinize ulaştığı günü izleyen 5. günün sonunda tebliğ edilmiş sayılır.",
  },
  {
    question: "Plakaya yazılan (radar, EDS) ceza ne zaman tebliğ edilir?",
    answer:
      "Kamera ve radar cezaları araç sahibine posta ya da e-Tebligat ile gönderilir. Ceza e-Devlet'te daha önce görünse bile indirim süresi tebligatın size ulaştığı günden başlar; yine de görür görmez ödemek en güvenlisidir.",
  },
  {
    question: "Süre geçerse ne olur?",
    answer:
      "İndirim kaybolur ve ceza tam tutarıyla ödenir. Ödeme süresi de geçerse vergi dairesi her ay gecikme zammı ekler; güncel borcu e-Devlet veya vergi dairesi gösterir.",
  },
  {
    question: "Taksitle ödersem indirim alır mıyım?",
    answer:
      "Bazı bankalar kredi kartıyla taksit sunar; ödeme 1 ay içinde yapıldığı sürece indirimli tutar üzerinden işlem görür. Bazı ağır ihlallerde indirim uygulanmayabilir; tutanaktaki indirimli tutar satırına bakın.",
  },
];

export default function ErkenOdemePage() {
  const now = new Date();
  const initialDate = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/otomotiv-araclari", label: "Otomotiv Araçları" },
        { href: path, label: "Trafik Cezası Erken Ödeme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Trafik Cezası Erken Ödeme İndirimi Hesaplama"
      intro="Ceza tutarını ve cezanın size tebliğ edildiği günü girin; %25 indirimli tutarı, indirimin son gününü ve kaç gün kaldığını görün."
      tool={<ErkenOdemeHesaplama initialDate={initialDate} />}
      related={{ title: "Diğer araç sahibi araçları", links: aracRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "kural", label: "Erken ödeme kuralı" },
        { id: "tablo", label: "İndirimli tutar tablosu" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="kural">Erken ödeme kuralı</h2>
      <p>
        Karayolları Trafik Kanunu&apos;na göre trafik idari para cezası, <strong>tebliğ tarihinden itibaren 1 ay içinde</strong> ödenirse dörtte bir (%25) indirimle ödenir.
        Hesap kısaca: <strong>indirimli tutar = ceza × 0,75</strong>. Süre, cezanın size tebliğ edildiği günden başlar; ihlal tarihinden değil. Elden yazılan cezada
        ikisi aynı gündür, posta ve e-Tebligat ile gelen cezada tebliğ günü sonraya kayar.
      </p>
      <h2 id="tablo">İndirimli tutar tablosu</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Ceza</th>
              <th scope="col">1 ay içinde ödenecek</th>
              <th scope="col">İndirim</th>
            </tr>
          </thead>
          <tbody>
            {ornekler.map((x) => (
              <tr key={x}>
                <th scope="row">{tl(x)}</th>
                <td>{tl(x * (1 - ERKEN_ODEME_INDIRIM))}</td>
                <td>{tl(x * ERKEN_ODEME_INDIRIM)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}

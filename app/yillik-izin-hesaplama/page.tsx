import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import YillikIzinHesaplama from "../components/YillikIzinHesaplama";
import { takvimMetadata } from "../components/takvim/takvimMeta";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";

export const metadata: Metadata = takvimMetadata("/yillik-izin-hesaplama", {
  title: "Yıllık İzin Hesaplama: Kaç Gün İzin Hakkım Var?",
  short: "Yıllık İzin Hesaplama",
  description:
    "İş Kanunu'na göre yıllık izin hakkını hesapla: kıdeme göre 14, 20 veya 26 gün, izin dönüş tarihi (Pazar ve resmî tatiller hariç) ve kullanılmayan izin ücreti.",
});

const faq: FaqItem[] = [
  {
    question: "Yıllık izin kaç gündür?",
    answer:
      "4857 sayılı İş Kanunu'nun 53. maddesine göre kıdemi 1 yıldan 5 yıla kadar (5 yıl dahil) olan işçiye en az 14 gün, 5 yıldan fazla 15 yıldan az olana 20 gün, 15 yıl ve daha fazla olana 26 gün yıllık ücretli izin verilir. 18 yaş ve altı ile 50 yaş ve üstü işçilerin izni 20 günden az olamaz; yer altı işlerinde süreler 4 gün artırılır.",
  },
  {
    question: "Yıllık izne ne zaman hak kazanılır?",
    answer:
      "Deneme süresi dahil işe başlanan tarihten itibaren en az bir yıl çalışan işçi yıllık izne hak kazanır. Sonraki hak edişler her yıl işe giriş tarihinin yıl dönümündedir.",
  },
  {
    question: "Resmî tatiller ve hafta sonu yıllık izinden sayılır mı?",
    answer:
      "Hayır. İzin süresine rastlayan ulusal bayram, hafta tatili ve genel tatil günleri izin süresinden sayılmaz (İş Kanunu md. 56). Cumartesi ise Yargıtay'a göre kural olarak iş günüdür ve izinden sayılır; sözleşmede Cumartesi hafta tatili olarak belirlenmişse sayılmaz.",
  },
  {
    question: "Yıllık izin bölünebilir mi?",
    answer:
      "İzin kural olarak toptan kullandırılır; ancak taraflar anlaşırsa bir bölümü 10 günden az olmamak üzere bölümler halinde kullanılabilir. İznini başka bir yerde geçirecek işçiye istemesi ve belgelemesi halinde toplam 4 güne kadar ücretsiz yol izni verilir.",
  },
  {
    question: "Kullanılmayan yıllık izin ücreti ne zaman ödenir?",
    answer:
      "İş sözleşmesi herhangi bir nedenle sona erdiğinde, kullanılmayan izin sürelerinin ücreti son ücret üzerinden işçiye ödenir (md. 59). Çalışma devam ederken izin yerine ücret ödenmesi mümkün değildir.",
  },
];

export default function YillikIzinRoute() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/muhasebeci-araclari", label: "Muhasebeci Araçları" },
        { label: "Yıllık İzin Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Yıllık İzin Hesaplama"
      intro="İşe giriş tarihine göre kaç gün yıllık izin hakkın olduğunu, izin dönüş tarihini ve kullanılmayan izin ücretini İş Kanunu'na göre hesapla."
      tool={<YillikIzinHesaplama />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          {
            href: "/resmi-tatiller",
            label: "Resmî Tatiller ve İzin Planlayıcı",
          },
          {
            href: "/kidem-tazminati-hesaplama",
            label: "Kıdem Tazminatı Hesaplama",
          },
          {
            href: "/brutten-nete-maas-hesaplama",
            label: "Brütten Nete Maaş Hesaplama",
          },
          { href: "/is-gunu-hesaplama", label: "İş Günü Hesaplama" },
          { href: "/takvim", label: "Türkiye Takvimi" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "sureler", label: "Yıllık izin süreleri" },
        { id: "sayilmayan", label: "İzinden sayılmayan günler" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faq}
    >
      <h2 id="sureler">Yıllık izin süreleri</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Kıdem</th>
              <th scope="col">En az izin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 yıldan 5 yıla kadar (5 yıl dahil)</td>
              <td>14 gün</td>
            </tr>
            <tr>
              <td>5 yıldan fazla, 15 yıldan az</td>
              <td>20 gün</td>
            </tr>
            <tr>
              <td>15 yıl ve daha fazla</td>
              <td>26 gün</td>
            </tr>
            <tr>
              <td>18 yaş ve altı, 50 yaş ve üstü</td>
              <td>en az 20 gün</td>
            </tr>
            <tr>
              <td>Yer altı işleri</td>
              <td>+4 gün</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Süreler 4857 sayılı İş Kanunu&apos;nun 53. maddesindeki asgari
        sürelerdir; iş sözleşmesi veya toplu sözleşmeyle artırılabilir,
        azaltılamaz. Kıdem, aynı işverenin bir veya değişik işyerlerinde geçen
        süreler birleştirilerek hesaplanır. Kanun her yıl değişmediği için
        hesaplama güncelleme gerektirmez.
      </p>
      <h2 id="sayilmayan">İzinden sayılmayan günler</h2>
      <p>
        İzin süresine denk gelen Pazar (hafta tatili), resmî tatil ve bayram
        günleri izinden düşülmez; bu yüzden aynı izin, içinde bayram olan bir
        döneme denk gelirse daha uzun sürer. Arefe günleri yarım gün tatil
        olduğu için yarım gün izin sayılır. Tatil günlerini görmek için{" "}
        <Link href="/resmi-tatiller">resmî tatiller</Link> sayfasındaki izin
        planlayıcıyı kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

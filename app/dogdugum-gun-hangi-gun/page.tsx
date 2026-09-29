import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import DogumGunuHesaplama from "../components/takvim/DogumGunuHesaplama";
import { takvimMetadata } from "../components/takvim/takvimMeta";
import { TAKVIM_ARACLARI } from "../components/takvim/TakvimSayfalari";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";

export const metadata: Metadata = takvimMetadata("/dogdugum-gun-hangi-gun", {
  title: "Doğduğum Gün Hangi Gündü? Doğum Günü Hesaplama",
  short: "Doğduğum Gün Hangi Gündü?",
  description:
    "Doğum tarihini gir: haftanın hangi günü doğduğunu, Hicri ve Rumi doğum tarihini, o gece ayın evresini, kaç gün yaşadığını ve doğum gününün önümüzdeki yıllarda hangi güne denk geleceğini gör.",
});

const faq: FaqItem[] = [
  {
    question: "Doğduğum günün hangi gün olduğunu nasıl bulurum?",
    answer:
      "Doğum tarihinizi girmeniz yeterli; araç tarihin haftanın hangi gününe denk geldiğini (Pazartesi, Salı…) takvim hesabıyla bulur. 1900'den bugüne kadar her tarih için çalışır.",
  },
  {
    question: "Hicri doğum günü nedir?",
    answer:
      "Doğduğunuz günün Hicri (ay) takvimindeki karşılığıdır. Hicri yıl yaklaşık 354 gün olduğu için Hicri doğum gününüz miladi takvimde her yıl yaklaşık 11 gün öne gelir ve Hicri yaşınız miladi yaşınızdan biraz büyüktür.",
  },
  {
    question: "Doğum günüm neden her yıl farklı bir güne denk geliyor?",
    answer:
      "365 gün 52 hafta ve 1 gün ettiği için doğum gününüz her yıl haftanın bir sonraki gününe kayar; artık yıllarda iki gün kayar. Bu yüzden takvim ancak 28 yılda bir aynı sıraya döner.",
  },
  {
    question: "29 Şubat doğumluların doğum günü ne zaman kutlanır?",
    answer:
      "29 Şubat yalnızca artık yıllarda (4 yılda bir) vardır. Bu araç artık olmayan yıllarda doğum gününü 1 Mart olarak gösterir; birçok kişi 28 Şubat'ta da kutlar.",
  },
];

export default function DogdugumGunRoute() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/takvim", label: "Takvim" },
        { label: "Doğduğum Gün Hangi Gündü?" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Doğduğum Gün Hangi Gündü?"
      intro="Doğum tarihini gir; haftanın hangi günü doğduğunu, Hicri ve Rumi doğum tarihini, o gece ayın hangi evrede olduğunu ve doğum gününün önümüzdeki yıllarda hangi güne denk geleceğini gör."
      tool={<DogumGunuHesaplama />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
          { href: "/tarih-cevirici", label: "Hicri – Miladi Tarih Çevirici" },
          { href: "/ozel-gunler", label: "Özel Günler" },
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Nasıl hesaplanır?" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faq}
    >
      <h2 id="nasil">Nasıl hesaplanır?</h2>
      <p>
        Haftanın günü, 1 Ocak 1900&apos;den itibaren geçen gün sayısının
        7&apos;ye bölümünden kalanla bulunur; araç bu hesabı Türkiye&apos;de
        kullanılan miladi (Gregoryen) takvime göre yapar. Hicri karşılık
        Diyanet&apos;in de esas aldığı ay takvimiyle, Rumi karşılık Osmanlı mali
        takvimiyle hesaplanır; eski belgelerdeki tarihler için{" "}
        <Link href="/tarih-cevirici">tarih çeviriciyi</Link> kullanabilirsiniz.
      </p>
      <p>
        Doğduğunuz gün bir bayrama, kandile ya da milli bir güne denk geliyorsa
        araç bunu da gösterir; tüm günleri{" "}
        <Link href="/takvim">Türkiye takviminde</Link> ve{" "}
        <Link href="/ozel-gunler">özel günler</Link> sayfasında görebilirsiniz.
        Tam yaşınızı yıl, ay ve gün olarak hesaplamak için{" "}
        <Link href="/yas-hesaplama">yaş hesaplama</Link> aracını kullanın.
      </p>
    </TimeToolPage>
  );
}

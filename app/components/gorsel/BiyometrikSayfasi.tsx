import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import VesikalikArac, { type VesikalikOlcu } from "./VesikalikArac";

export const BIYOMETRIK_YOLU = "/biyometrik-fotograf";

/** NVİ: kimlik kartı, pasaport ve sürücü belgesi için 50×60 mm; 300 DPI'da 591×709 piksel. */
export const BIYOMETRIK_OLCU: VesikalikOlcu = {
  ad: "Biyometrik 50×60 mm (300 DPI)",
  genislik: 591,
  yukseklik: 709,
  dpi: 300,
  baskiSayfasi: true,
};

export const biyometrikMeta = () =>
  takvimMetadata(BIYOMETRIK_YOLU, {
    title:
      "Biyometrik Fotoğraf Hazırlama: 50×60 mm (Kimlik, Pasaport, Ehliyet)",
    short: "Biyometrik Fotoğraf",
    description:
      "Fotoğrafınızı 50×60 mm biyometrik ölçüye (300 DPI, 591×709 piksel) kırpın; 10×15 cm baskı sayfasında 4 adet olarak indirin. Ücretsiz, yüklemesiz.",
  });

const SSS: FaqItem[] = [
  {
    question: "Biyometrik fotoğraf ölçüsü kaç cm, kaç piksel?",
    answer:
      "Kimlik kartı, pasaport ve sürücü belgesi için biyometrik fotoğraf 50×60 mm (5×6 cm) olmalıdır. Baskı için 300 DPI'da bu ölçü 591×709 piksel eder; araç fotoğrafı bu ölçüde ve 300 DPI bilgisiyle kaydeder.",
  },
  {
    question: "10×15 baskı sayfası ne işe yarar?",
    answer:
      "Hazırlanan fotoğrafı 10×15 cm'lik bir sayfaya kesim çizgileriyle 4 adet yerleştirir. Bu dosyayı herhangi bir fotoğrafçıda veya fotoğraf baskı makinesinde tek bir 10×15 baskı olarak bastırıp keserek dört biyometrik fotoğraf elde edersiniz.",
  },
  {
    question: "Araç arka planı beyaz yapar mı?",
    answer:
      "Hayır. Biyometrik fotoğrafta fon beyaz, desensiz ve gölgesiz olmalıdır; bunun için fotoğrafı düz beyaz bir duvarın önünde, yüz aydınlık ve gölge düşmeyecek şekilde çekin. Araç yalnızca kırpar, ölçülendirir ve baskıya hazırlar.",
  },
  {
    question: "Fotoğraf başvuruda kabul edilir mi?",
    answer:
      "Fotoğrafın biyometrik kurallara uygunluğunu başvuru sırasında görevli kontrol eder. Ölçüyü araç sağlar; ifade, ışık, fon ve fotoğrafın son 6 ay içinde çekilmiş olması gibi kurallara sizin dikkat etmeniz gerekir.",
  },
];

export function BiyometrikSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { label: "Biyometrik Fotoğraf" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Biyometrik Fotoğraf Hazırlama (50×60 mm)"
        intro="Telefonla çektiğiniz fotoğrafı kimlik kartı, pasaport ve ehliyet için 50×60 mm biyometrik ölçüye getirin. Yüzü kılavuza oturtun, tek fotoğraf olarak veya 10×15 cm baskı sayfasında 4 adet olarak indirin."
        tool={<VesikalikArac olcu={BIYOMETRIK_OLCU} />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            {
              href: "/e-okul-fotograf-kucultme",
              label: "e-Okul Fotoğraf Küçültme",
            },
            { href: "/fotograf-kirpma", label: "Fotoğraf Kırpma" },
            { href: "/resim-boyutlandirma", label: "Resim Boyutlandırma" },
            {
              href: "/piksel-cm-dpi-hesaplama",
              label: "Piksel, CM ve DPI Hesaplama",
            },
            {
              href: "/ehliyet-yenileme-suresi-hesaplama",
              label: "Ehliyet Yenileme Süresi",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "kurallar", label: "Biyometrik fotoğraf kuralları" },
          { id: "cekim", label: "Evde çekim ipuçları" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="kurallar">Biyometrik fotoğraf kuralları</h2>
        <p>
          Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü'nün belirttiği temel
          kurallar:
        </p>
        <ul>
          <li>Ölçü 50 mm × 60 mm olmalıdır.</li>
          <li>Fon beyaz ve desensiz olmalı, fonda gölge oluşmamalıdır.</li>
          <li>
            Fotoğraf, kişinin son halini göstermesi için son 6 ay içinde
            çekilmiş olmalıdır.
          </li>
          <li>Yüz tam karşıdan, net ve eşit aydınlatılmış olmalıdır.</li>
        </ul>
        <p>
          Bu kurallar kimlik kartı, pasaport ve sürücü belgesi başvurularında
          geçerlidir.
        </p>
        <h2 id="cekim">Evde çekim ipuçları</h2>
        <ul>
          <li>
            Düz beyaz bir duvarın yaklaşık yarım metre önünde durun; böylece
            fona gölge düşmez.
          </li>
          <li>
            Pencereye karşı durun ya da iki yandan eşit ışık alın; tavan lambası
            yüzde gölge yapar.
          </li>
          <li>
            Telefonu göz hizasında ve dik tutun; mümkünse başka biri çeksin.
          </li>
          <li>
            Kırpma alanındaki kesikli oval, yüzün yerini gösterir; baş ve
            omuzların üstü görünmelidir.
          </li>
        </ul>
        <p>
          Farklı bir ölçüye ihtiyacınız varsa{" "}
          <Link href="/resim-boyutlandirma">Resim Boyutlandırma</Link> aracının
          santimetre modunu kullanabilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}

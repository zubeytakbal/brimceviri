import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { METIN_ARACLARI_YOLU } from "../../converter/metin/metinAraclari";
import DosyaAracCubugu from "../gorsel/DosyaAracCubugu";
import DosyaAracPaneli from "../gorsel/DosyaAracPaneli";
import { takvimMetadata } from "../takvim/takvimMeta";
import TimeToolPage from "../time/TimeToolPage";

export const metinAraclariMeta = () =>
  takvimMetadata(METIN_ARACLARI_YOLU, {
    title:
      "Metin Araçları: Türkçe Karakter, Harf Dönüştürme, IBAN ve TC Doğrulama",
    short: "Metin Araçları",
    description:
      "Türkçe karakter düzeltme ve kaldırma, büyük küçük harf, sayıyı yazıya çevirme, hece ayırma; IBAN, TC kimlik no ve vergi no doğrulama. Ücretsiz, tarayıcıda çalışır.",
  });

const SSS: FaqItem[] = [
  {
    question: "Metinlerim veya numaralarım bir yere gönderiliyor mu?",
    answer:
      "Hayır. Tüm araçlar tarayıcınızda çalışır; yazdığınız metin, IBAN, TC kimlik veya vergi numarası hiçbir sunucuya gönderilmez ve kaydedilmez.",
  },
  {
    question: "Bu araçlar Türkçeye özel mi?",
    answer:
      "Evet. Büyük-küçük harf dönüşümü Türkçe İ/ı kuralına, heceleme Türkçe hece kurallarına, sayıyı yazıya çevirme Türkçe sayı okunuşuna ve para yazımına göre yapılır.",
  },
];

export function MetinAraclariSayfasi() {
  return (
    <>
      <DosyaAracCubugu koleksiyon="metin" />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { label: "Metin Araçları" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Metin Araçları"
        intro="Türkçe yazım, sayıyı yazıya çevirme ve numara doğrulama araçları tek yerde. Hepsi ücretsiz; metinleriniz tarayıcınızdan çıkmaz."
        tool={<DosyaAracPaneli koleksiyon="metin" />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: "/dosya-araclari", label: "Dosya Araçları" },
            { href: "/ag-araclari", label: "Ağ Araçları" },
            {
              href: "/resimden-yaziya-cevirme",
              label: "Resimden Yazıya Çevirme",
            },
            { href: "/qr-kod-olusturucu", label: "QR Kod Oluşturucu" },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "neler", label: "Hangi araç ne işe yarar?" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="neler">Hangi araç ne işe yarar?</h2>
        <ul>
          <li>
            <Link href="/turkce-karakter-duzeltme">
              Türkçe Karakter Düzeltme
            </Link>
            : &quot;cok guzel&quot; yazısını &quot;çok güzel&quot; yapar.
          </li>
          <li>
            <Link href="/sayiyi-yaziya-cevirme">Sayıyı Yazıya Çevirme</Link>:
            Çek, senet ve fatura için tutarı yazıyla yazar.
          </li>
          <li>
            <Link href="/iban-dogrulama">IBAN Doğrulama</Link>: Para göndermeden
            önce IBAN&apos;da yazım hatası olup olmadığını gösterir.
          </li>
          <li>
            <Link href="/hece-ayirma">Hece Ayırma</Link>: Kelimeleri hecelerine
            ayırır, şiirde hece ölçüsünü bulur.
          </li>
        </ul>
      </TimeToolPage>
    </>
  );
}

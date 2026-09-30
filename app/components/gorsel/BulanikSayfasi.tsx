import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import FotoBulanik from "./FotoBulanik";

export const BULANIK_YOLU = "/fotograf-bulaniklastirma";

export const bulanikMeta = () =>
  takvimMetadata(BULANIK_YOLU, {
    title:
      "Fotoğraf Bulanıklaştırma: Yüz ve Plaka Kapatma (Mozaik, Siyah Kutu)",
    short: "Fotoğraf Bulanıklaştırma",
    description:
      "Fotoğraftaki yüzleri, plakaları ve yazıları bulanıklaştırın, pikselleştirin veya siyah kutuyla kapatın. Birden fazla alan, tam çözünürlük, yüklemesiz.",
  });

const SSS: FaqItem[] = [
  {
    question: "Fotoğrafta yüz nasıl bulanıklaştırılır?",
    answer:
      "Fotoğrafı seçin, 'Bulanık' etkisini işaretleyin ve yüzün üzerinde sürükleyerek bir alan çizin. Birden fazla yüz için her birine ayrı alan çizin, etki gücünü ayarlayın ve 'Uygula' ile indirin.",
  },
  {
    question: "Plaka veya kimlik numarası için hangi etki güvenli?",
    answer:
      "Siyah kutu en güvenli yöntemdir, çünkü altındaki bilgi tamamen silinir. Zayıf bulanıklık veya iri olmayan mozaik uygulanmış yazılar bazı durumlarda tahmin edilebilir; bu yüzden yazı ve rakamlarda siyah kutu ya da yüksek güçte mozaik kullanın.",
  },
  {
    question: "Bulanıklaştırılan alan sonradan geri açılabilir mi?",
    answer:
      "Hayır. Araç alanı çok küçültüp yeniden büyüterek bulanıklaştırır; bu sırada ayrıntı kaybolur ve dosyaya yalnızca sonuç kaydedilir. Orijinal fotoğrafınız değişmez, onu paylaşmayın.",
  },
  {
    question: "Fotoğraf bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. Tüm işlem tarayıcınızda yapılır; fotoğraf bilgisayarınızdan çıkmaz.",
  },
];

export function BulanikSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { label: "Fotoğraf Bulanıklaştırma" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Fotoğraf Bulanıklaştırma ve Sansürleme"
        intro="Paylaşmadan önce fotoğraftaki yüzleri, araç plakalarını, adresleri veya belge numaralarını gizleyin. Alanı çizin; bulanık, pikselli (mozaik) ya da siyah kutu olarak kapatın."
        tool={<FotoBulanik />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            {
              href: "/fotograf-konum-bilgisi-silme",
              label: "Konum Bilgisi (EXIF) Silme",
            },
            { href: "/fotografa-filigran-ekleme", label: "Filigran Ekleme" },
            { href: "/fotograf-kirpma", label: "Fotoğraf Kırpma" },
            {
              href: "/fotograf-boyutu-kucultme",
              label: "Fotoğraf Boyutu Küçültme",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "ne-zaman", label: "Hangi durumlarda gizlemelisiniz?" },
          { id: "etkiler", label: "Bulanık, mozaik ve siyah kutu farkı" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="ne-zaman">Hangi durumlarda gizlemelisiniz?</h2>
        <ul>
          <li>
            Sosyal medyada paylaşılan fotoğraflarda çocukların ve izni alınmamış
            kişilerin yüzleri
          </li>
          <li>Araç ilanlarında ve kaza fotoğraflarında plakalar</li>
          <li>
            Kargo etiketi, fatura, kimlik ya da kart fotoğraflarındaki ad, adres
            ve numaralar
          </li>
          <li>
            Ekran görüntülerindeki telefon numaraları, e-posta adresleri ve
            mesaj içerikleri
          </li>
        </ul>
        <h2 id="etkiler">Bulanık, mozaik ve siyah kutu farkı</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Etki</th>
                <th scope="col">Görünüm</th>
                <th scope="col">Uygun olduğu yer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Bulanık</th>
                <td>Yumuşak, fotoğrafla uyumlu</td>
                <td>Yüzler, arka plandaki kişiler</td>
              </tr>
              <tr>
                <th scope="row">Pikselli (mozaik)</th>
                <td>Belirgin kareler</td>
                <td>Yüzler, logolar; yüksek güçte plaka</td>
              </tr>
              <tr>
                <th scope="row">Siyah kutu</th>
                <td>Tamamen kapalı</td>
                <td>Plaka, kimlik numarası, adres, yazı</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Paylaşmadan önce fotoğraftaki konum bilgisini de silmek için{" "}
          <Link href="/fotograf-konum-bilgisi-silme">Konum Bilgisi Silme</Link>{" "}
          aracını kullanın.
        </p>
      </TimeToolPage>
    </>
  );
}

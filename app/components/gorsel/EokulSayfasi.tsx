import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import VesikalikArac, { type VesikalikOlcu } from "./VesikalikArac";

export const EOKUL_YOLU = "/e-okul-fotograf-kucultme";

/** e-Okul ve MEBBİS fotoğraf ölçüsü (MEB, 20 Şubat 2014'ten beri). Sınırlar güvenli tarafta tutulur. */
export const EOKUL_OLCU: VesikalikOlcu = {
  ad: "e-Okul ve MEBBİS",
  genislik: 133,
  yukseklik: 171,
  minBayt: 21000,
  maxBayt: 150000,
  sinirMetni: "20–150 KB",
};

export const eokulMeta = () =>
  takvimMetadata(EOKUL_YOLU, {
    title: "e-Okul Fotoğraf Küçültme: 133×171 ve 20–150 KB (Toplu)",
    short: "e-Okul Fotoğraf Küçültme",
    description:
      "Öğrenci fotoğraflarını e-Okul ve MEBBİS'e uygun 133×171 piksel, 20–150 KB JPG yapın. Program kurmadan, toplu, yüklemesiz; yüzü kırpma alanıyla ortalayın.",
  });

const SSS: FaqItem[] = [
  {
    question: "e-Okul fotoğraf boyutu kaç piksel ve kaç KB olmalı?",
    answer:
      "e-Okul'a yüklenen öğrenci fotoğrafı 133×171 piksel ölçüsünde, JPG formatında ve 20 KB ile 150 KB arasında olmalıdır. Bu ölçü 20 Şubat 2014'te eski 105×120 piksel ölçüsünün yerine geçmiştir.",
  },
  {
    question: "Fotoğraf neden '20 KB'tan küçük' diye reddediliyor?",
    answer:
      "133×171 piksel çok küçük bir ölçü olduğu için en yüksek kalitede kaydedilse bile dosya çoğu zaman 20 KB'a ulaşmaz. Bu araç böyle durumlarda dosyaya görüntüyü değiştirmeyen bir açıklama alanı ekleyerek boyutu 20 KB'ın üstüne çıkarır.",
  },
  {
    question: "MEBBİS için de aynı ölçü mü geçerli?",
    answer:
      "Evet. MEB il ve ilçe müdürlüklerinin duyurularında e-Okul ve MEBBİS fotoğrafları için aynı 133×171 piksel ve 20 KB üstü kuralı belirtilir.",
  },
  {
    question: "Bütün sınıfın fotoğraflarını aynı anda hazırlayabilir miyim?",
    answer:
      "Evet. 60 fotoğrafa kadar seçebilirsiniz. Her fotoğraf otomatik olarak kırpılır; gerekirse dosya adına tıklayıp kırpma alanını düzeltir, sonunda hepsini tek bir ZIP dosyası olarak indirirsiniz.",
  },
  {
    question: "Öğrenci fotoğrafları bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. Fotoğraflar tarayıcınızın içinde işlenir ve bilgisayarınızdan çıkmaz. Kişisel veri içeren öğrenci fotoğrafları için bu önemlidir.",
  },
];

export function EokulSayfasi() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
        { label: "e-Okul Fotoğraf Küçültme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="e-Okul Fotoğraf Küçültme"
      intro="Öğrenci fotoğraflarını e-Okul ve MEBBİS'in istediği 133×171 piksel, 20–150 KB JPG ölçüsüne getirin. Program kurmanıza gerek yok; bütün sınıfın fotoğraflarını tek seferde hazırlayıp ZIP olarak indirin."
      tool={<VesikalikArac olcu={EOKUL_OLCU} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
          {
            href: "/fotograf-boyutu-kucultme",
            label: "Fotoğraf Boyutu Küçültme",
          },
          { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
          { href: "/okul-takvimi", label: "Okul Takvimi" },
          { href: "/ogretmen-araclari", label: "Öğretmen Araçları" },
          { href: "/devamsizlik-hesaplama", label: "Devamsızlık Hesaplama" },
          { href: "/harf-notu-hesaplama", label: "Harf Notu Hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "olculer", label: "e-Okul fotoğraf ölçüleri" },
        { id: "nasil", label: "Nasıl kullanılır?" },
        { id: "ipuclari", label: "İyi bir öğrenci fotoğrafı için" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={SSS}
    >
      <h2 id="olculer">e-Okul fotoğraf ölçüleri</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <tbody>
            <tr>
              <th scope="row">Piksel ölçüsü</th>
              <td>133 × 171 (genişlik × yükseklik)</td>
            </tr>
            <tr>
              <th scope="row">Dosya boyutu</th>
              <td>En az 20 KB, en fazla 150 KB</td>
            </tr>
            <tr>
              <th scope="row">Format</th>
              <td>JPG (JPEG)</td>
            </tr>
            <tr>
              <th scope="row">Geçerlilik</th>
              <td>20 Şubat 2014'ten beri (önceki ölçü 105 × 120 piksel)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Aynı ölçü MEBBİS'teki personel ve öğrenci fotoğrafları için de
        kullanılır.
      </p>
      <h2 id="nasil">Nasıl kullanılır?</h2>
      <ol>
        <li>
          Fotoğrafları seçin veya sürükleyip bırakın; telefonla çekilmiş
          fotoğraflar da olur.
        </li>
        <li>
          Her fotoğraf otomatik kırpılır. Yüz ortada değilse dosya adına
          tıklayın, kutuyu sürükleyin ve &quot;Yakınlaştır&quot; ile ayarlayın.
        </li>
        <li>
          Sağdaki önizlemede sonucu ve dosya boyutunu görün; tek tek veya
          &quot;Tümünü ZIP olarak indir&quot; ile indirin.
        </li>
        <li>
          İndirdiğiniz dosyaları e-Okul'daki öğrenci fotoğrafı yükleme alanından
          yükleyin.
        </li>
      </ol>
      <h2 id="ipuclari">İyi bir öğrenci fotoğrafı için</h2>
      <ul>
        <li>
          Düz ve açık renkli bir duvarın önünde, yüz aydınlık olacak şekilde
          çekin.
        </li>
        <li>Telefonu göz hizasında tutun; öğrenci doğrudan kameraya baksın.</li>
        <li>
          Baş ve omuzların üst kısmı görünsün; kırpma alanındaki kesikli oval
          yüzün yerini gösterir.
        </li>
        <li>
          Fotoğrafı yatay çektiyseniz de sorun olmaz; araç dikey 133×171
          oranında kırpar.
        </li>
      </ul>
      <p>
        Başka bir KB sınırı olan başvurular için{" "}
        <Link href="/fotograf-boyutu-kucultme">Fotoğraf Boyutu Küçültme</Link>{" "}
        aracını kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}

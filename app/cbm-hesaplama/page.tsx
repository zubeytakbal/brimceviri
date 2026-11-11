import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CbmCalculator from "../components/CbmCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "CBM nedir, nasıl hesaplanır?",
    answer:
      "CBM (Cubic Meter), bir kolinin veya paletin metreküp cinsinden hacmidir. Formül: CBM = Uzunluk(m) × Genişlik(m) × Yükseklik(m). Nakliye ve lojistikte fiyatlandırma ve konteyner/kamyon doluluk planlaması için kullanılır.",
  },
  {
    question: "Hacimsel ağırlık nedir, gerçek ağırlıktan farkı ne?",
    answer:
      "Hacimsel (volümetrik) ağırlık, kolinin kapladığı hacmin taşıma moduna göre bir katsayıyla çarpılmasıyla bulunan 'sanal' ağırlıktır. Nakliye ücreti, gerçek ağırlık ile hacimsel ağırlığın büyük olanı (ücrete esas ağırlık) üzerinden hesaplanır — hafif ama hacimli kargolarda hacimsel ağırlık devreye girer.",
  },
  {
    question: "Hacimsel ağırlık katsayısı taşıma moduna göre neden değişiyor?",
    answer:
      "Her taşıma modunda (deniz, kara, hava) araçların kapasite/hacim oranı farklı olduğu için sektörde farklı standart katsayılar kullanılır: deniz yolunda 1 m³ = 1000 kg, kara yolunda 1 m³ ≈ 333 kg, hava yolunda 1 m³ ≈ 167 kg. Taşıyıcı firmaya göre küçük farklılıklar olabilir.",
  },
];

export const metadata: Metadata = {
  title: "CBM ve Hacimsel Ağırlık Hesaplama",
  description:
    "Koli/palet ölçülerinden toplam CBM (m³), hacimsel ağırlık ve ücrete esas ağırlığı hesapla. Deniz, kara ve hava yolu katsayıları dahil.",
  alternates: {
    canonical: "/cbm-hesaplama",
    languages: {
    },
  },
  openGraph: {
    title: "CBM ve Hacimsel Ağırlık Hesaplama",
    description: "Toplam CBM, hacimsel ağırlık ve ücrete esas ağırlığı hesaplayın.",
    url: buildSiteUrl("/cbm-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


const divisorTable = [
  ["Deniz Yolu", "1000", "1 m³ = 1000 kg"],
  ["Kara Yolu", "3000", "1 m³ ≈ 333 kg"],
  ["Hava Yolu", "6000 (bazı taşıyıcılarda 5000)", "1 m³ ≈ 167 kg (bazı taşıyıcılarda 200 kg)"],
];

export default function CbmPage() {

  return (
    <AracSayfasi
      yol="/cbm-hesaplama"
      baslik="CBM ve Hacimsel Ağırlık Hesaplama"
      hesap={<CbmCalculator />}
      serbestIcindekiler={[{"id":"tasima-moduna-gore-hacimsel-agirlik-katsayilari","baslik":"Taşıma Moduna Göre Hacimsel Ağırlık Katsayıları"},{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="tasima-moduna-gore-hacimsel-agirlik-katsayilari">Taşıma Moduna Göre Hacimsel Ağırlık Katsayıları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın kullanılan standart katsayılar (taşıyıcıya göre değişebilir)</caption>
              <thead>
                <tr>
                  <th scope="col">Taşıma Modu</th>
                  <th scope="col">Katsayı (cm³ / katsayı = kg)</th>
                  <th scope="col">m³ Karşılığı</th>
                </tr>
              </thead>
              <tbody>
                {divisorTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>CBM nedir, nasıl hesaplanır?</strong>
            <br />
            CBM (Cubic Meter), bir kolinin veya paletin metreküp
            cinsinden hacmidir. Formül: CBM = Uzunluk(m) ×
            Genişlik(m) × Yükseklik(m). Nakliye ve lojistikte
            fiyatlandırma ve konteyner/kamyon doluluk planlaması
            için kullanılır.
          </p>
          <p>
            <strong>Hacimsel ağırlık nedir, gerçek ağırlıktan farkı ne?</strong>
            <br />
            Hacimsel (volümetrik) ağırlık, kolinin kapladığı hacmin
            taşıma moduna göre bir katsayıyla çarpılmasıyla bulunan
            &quot;sanal&quot; ağırlıktır. Nakliye ücreti, gerçek
            ağırlık ile hacimsel ağırlığın büyük olanı (ücrete esas
            ağırlık) üzerinden hesaplanır — hafif ama hacimli
            kargolarda hacimsel ağırlık devreye girer.
          </p>
          <p>
            <strong>
              Hacimsel ağırlık katsayısı taşıma moduna göre neden
              değişiyor?
            </strong>
            <br />
            Her taşıma modunda araçların kapasite/hacim oranı farklı
            olduğu için sektörde farklı standart katsayılar
            kullanılır. Taşıyıcı firmaya göre küçük farklılıklar
            olabilir; kesin hesap için &quot;Özel katsayı&quot;
            seçeneğini kullanabilirsin.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer nakliyeci ve lojistik araçları için{" "}
            <Link href="/hesaplayicilar#enerji-ve-arac">Enerji, Fatura ve Araç</Link>{" "}
            sayfasına, hacim birimleri arasında genel dönüşüm için{" "}
            <Link href="/kategoriler/hacim">Hacim Dönüşümleri</Link>{" "}
            sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Katsayılar, uluslararası nakliye ve lojistik sektöründe
            yaygın kullanılan standart değerlere dayanmaktadır. Kesin
            navlun hesabı için taşıyıcı firmanın kendi tarifesine
            danışılmalıdır.
          </p>
        </>
      }
    />
  );
}

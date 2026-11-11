import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PregnancyCalculator from "../components/PregnancyCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Tahmini doğum tarihi kesin midir?",
    answer:
      "Hayır — bu, istatistiksel bir ortalamadır (SAT + 280 gün). Gerçek doğum tarihi, düzensiz adet döngüsü, ultrason ölçümleri gibi faktörlere göre birkaç gün ile birkaç hafta arasında farklılık gösterebilir. Kesin takip için doktor kontrolü esastır.",
  },
  {
    question: "Adet döngüm düzensizse bu hesap doğru olur mu?",
    answer:
      "Düzensiz döngülerde SAT bazlı hesap daha az güvenilir olur; bu durumda doktorun yapacağı ultrason bazlı tarihlendirme daha doğru sonuç verir.",
  },
];

export const metadata: Metadata = {
  title: "Gebelik Haftası Hesaplama: Kaçıncı Haftadayım?",
  description:
    "Son adet tarihini gir: kaçıncı haftada ve hangi trimesterde olduğunu, tahmini doğum tarihini ve doğuma kalan gün sayısını anında hesapla.",
  alternates: {
    canonical: "/gebelik-haftasi-hesaplama",
  },
  openGraph: {
    title: "Gebelik Haftası Hesaplama: Kaçıncı Haftadayım?",
    description:
      "Son adet tarihinden gebelik haftasını ve tahmini doğum tarihini hesaplayın.",
    url: buildSiteUrl("/gebelik-haftasi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


// Örnek: SAT 1 Ocak 2026 + 280 gün.
const dogumOrnek = new Date(Date.UTC(2026, 0, 1 + 280)).toLocaleDateString("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function PregnancyCalculatorPage() {

  return (
    <AracSayfasi
      yol="/gebelik-haftasi-hesaplama"
      baslik="Gebelik Haftası Hesaplama"
      hesap={<PregnancyCalculator />}
      serbestIcindekiler={[{"id":"gebelik-haftasi-neden-son-adet-tarihinden","baslik":"Gebelik haftası neden son adet tarihinden hesaplanır?"},{"id":"trimesterler-nasil-ayrilir","baslik":"Trimesterler nasıl ayrılır?"},{"id":"ornek-tahmini-dogum-tarihi","baslik":"Örnek: tahmini doğum tarihi"},{"id":"dogum-zamani-nasil-adlandirilir","baslik":"Doğum zamanı nasıl adlandırılır?"},{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="gebelik-haftasi-neden-son-adet-tarihinden">Gebelik haftası neden son adet tarihinden hesaplanır?</h2>
          <p>
            Döllenmenin gerçekleştiği tam tarih genelde bilinmediği için,
            hekimlikte standart uygulama gebeliği son adet tarihinin
            (SAT) ilk gününden itibaren saymaktır. Bu yönteme göre
            gebelik toplam 280 gün (40 hafta) sürer — döllenme genelde
            SAT&apos;tan yaklaşık 2 hafta sonra gerçekleştiği için, hesaplanan
            &quot;gebelik haftası&quot; ile gerçek embriyonik yaş arasında
            yaklaşık 2 haftalık bir fark vardır. Bu, hata değil, tıbbi
            standart tanımın kendisidir.
          </p>
          <h2 id="trimesterler-nasil-ayrilir">Trimesterler nasıl ayrılır?</h2>
          <p>
            Gebelik üç trimestere bölünür: <strong>1. trimester</strong>{" "}
            0-13. haftalar arası, <strong>2. trimester</strong> 13-27.
            haftalar arası ve <strong>3. trimester</strong> 27. haftadan
            doğuma kadar olan dönemdir.
          </p>
          <h2 id="ornek-tahmini-dogum-tarihi">Örnek: tahmini doğum tarihi</h2>
          <p>
            Son adet tarihi 1 Ocak 2026 olan bir gebelikte Naegele kuralıyla tahmini doğum tarihi SAT + 280 gün ={" "}
            {dogumOrnek}. 40 haftanın tamamlandığı gün budur.
          </p>
          <h2 id="dogum-zamani-nasil-adlandirilir">Doğum zamanı nasıl adlandırılır?</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Gebelik haftası</th>
                  <th>Tanım</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>37+0 öncesi</td><td>Erken doğum (preterm)</td></tr>
                <tr><td>37+0 – 38+6</td><td>Erken term</td></tr>
                <tr><td>39+0 – 40+6</td><td>Tam term</td></tr>
                <tr><td>41+0 – 41+6</td><td>Geç term</td></tr>
                <tr><td>42+0 ve sonrası</td><td>Miadı geçmiş (post-term)</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <small>Tanımlar Amerikan Kadın Doğum Uzmanları Derneği&apos;nin (ACOG) sınıflamasına göredir. &quot;37+0&quot;, 37 hafta 0 gün demektir.</small>
          </p>
          <p>
            Gebelik takibindeki bazı incelemeler belirli haftalarda yapılır: ense kalınlığı ölçümü genellikle 11–14. haftalarda,
            ayrıntılı ultrason 18–22. haftalarda, gebelik şekeri testi 24–28. haftalarda planlanır. Takvim hekime ve kuruma göre
            değişebilir.
          </p>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>Tahmini doğum tarihi kesin midir?</strong>
            <br />
            Hayır — bu, istatistiksel bir ortalamadır (SAT + 280 gün).
            Gerçek doğum tarihi, düzensiz adet döngüsü, ultrason
            ölçümleri gibi faktörlere göre birkaç gün ile birkaç hafta
            arasında farklılık gösterebilir. Kesin takip için doktor
            kontrolü esastır.
          </p>
          <p>
            <strong>Adet döngüm düzensizse bu hesap doğru olur mu?</strong>
            <br />
            Düzensiz döngülerde SAT bazlı hesap daha az güvenilir olur;
            bu durumda doktorun yapacağı ultrason bazlı tarihlendirme
            daha doğru sonuç verir.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Gebelik öncesi döngü takibi için{" "}
            <Link href="/yumurtlama-hesaplama">Yumurtlama ve Adet Takvimi Hesaplama</Link>,{" "}
            genel tarih/yaş hesaplamaları için{" "}
            <Link href="/yas-hesaplama">Yaş Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Hesaplama yöntemi (SAT + 280 gün / 40 hafta, trimester
            sınırları), kadın doğum pratiğinde yaygın kullanılan
            standart gebelik tarihlendirme kurallarına dayanır. Bu araç
            bilgilendirme amaçlıdır, tıbbi tavsiye yerine geçmez.
          </p>
        </>
      }
    />
  );
}

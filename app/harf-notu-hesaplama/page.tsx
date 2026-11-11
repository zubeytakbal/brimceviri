import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LetterGradeCalculator from "../components/LetterGradeCalculator";
import { letterGradeScale } from "../converter/letterGradeCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "100'lük not, harf notuna nasıl çevrilir?",
    answer:
      "Türkiye'de birçok üniversitede yaygın kullanılan bir tabloya göre 90-100 arası AA, 85-89 arası BA, 80-84 arası BB şeklinde devam eder. Ancak kesin eşik değerleri kurumdan kuruma değişebilir.",
  },
  {
    question: "Bu tablo her okul/üniversite için geçerli mi?",
    answer:
      "Hayır. Bu tablo yaygın kullanılan genel bir referanstır; senin okulunun veya üniversitenin kendi yönetmeliğinde farklı eşik değerleri olabilir. Kesin sonuç için kurumunun resmi kaynağına bakmalısın.",
  },
];

const katsayi = (harf: string) => letterGradeScale.find((r) => r.letter === harf)!.gpa;
const ORNEK_DERSLER: Array<[string, number, string]> = [
  ["Matematik", 6, "BB"],
  ["Fizik", 5, "CB"],
  ["Programlama", 6, "AA"],
  ["İngilizce", 3, "BA"],
  ["Tarih", 2, "CC"],
];
const TOPLAM_AKTS = ORNEK_DERSLER.reduce((t, d) => t + d[1], 0);
const TOPLAM_PUAN = ORNEK_DERSLER.reduce((t, d) => t + d[1] * katsayi(d[2]), 0);

export const metadata: Metadata = {
  title: "Harf Notu Hesaplama (100'lük - 4'lük Sistem)",
  description:
    "100'lük puanı, yaygın kullanılan bir referans tabloya göre harf notuna (AA, BA, BB...) ve 4'lük sisteme çevir.",
  alternates: {
    canonical: "/harf-notu-hesaplama",
    languages: {
    },
  },
  openGraph: {
    title: "Harf Notu Hesaplama (100'lük - 4'lük Sistem)",
    description: "100'lük puandan harf notu ve 4'lük sistem karşılığını hesapla.",
    url: buildSiteUrl("/harf-notu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function LetterGradeCalculatorPage() {

  return (
    <AracSayfasi
      yol="/harf-notu-hesaplama"
      baslik="Harf Notu Hesaplama"
      hesap={<LetterGradeCalculator />}
      giris={<><p>
            Yaygın kullanılan bir referans
            tabloya göre harf notunu ve 4&apos;lük sistem karşılığını
            gör.
          </p></>}
      sss={faqItems}
      serbestIcindekiler={[{"id":"tablo","baslik":"100'lük not hangi harf notu ve 4'lük nota denk gelir?"},{"id":"ortalama","baslik":"Dönem ortalaması nasıl hesaplanır?"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="tablo">100&apos;lük not hangi harf notu ve 4&apos;lük nota denk gelir?</h2>
          <p>
            Türkiye&apos;de birçok üniversitenin kullandığı aralıklar aşağıdadır. Sınırlar kuruma, hatta bağıl değerlendirme
            yapılan derslerde sınıfın ortalamasına göre değişebilir; kesin tablo üniversitenizin eğitim-öğretim
            yönetmeliğindedir.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>100&apos;lük not</th>
                  <th>Harf</th>
                  <th>4&apos;lük karşılık</th>
                </tr>
              </thead>
              <tbody>
                {letterGradeScale.map((r, i) => (
                  <tr key={r.letter}>
                    <td>
                      {r.minScore}–{i === 0 ? 100 : letterGradeScale[i - 1].minScore - 1}
                    </td>
                    <td>{r.letter}</td>
                    <td>{r.gpa.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 id="ortalama">Dönem ortalaması nasıl hesaplanır?</h2>
          <p>
            Dönem ortalaması (genellikle &quot;yarıyıl not ortalaması&quot;), her dersin 4&apos;lük karşılığının dersin AKTS
            ya da kredisiyle çarpılıp toplanması ve toplam krediye bölünmesiyle bulunur. Örnek bir dönem:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Ders</th>
                  <th>AKTS</th>
                  <th>Not</th>
                  <th>AKTS × katsayı</th>
                </tr>
              </thead>
              <tbody>
                {ORNEK_DERSLER.map(([ad, akts, harf]) => (
                  <tr key={ad}>
                    <td>{ad}</td>
                    <td>{akts}</td>
                    <td>{harf}</td>
                    <td>{(akts * katsayi(harf)).toLocaleString("tr-TR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Toplam {TOPLAM_PUAN.toLocaleString("tr-TR")} puan, {TOPLAM_AKTS} AKTS&apos;ye bölününce dönem ortalaması{" "}
            <strong>{(TOPLAM_PUAN / TOPLAM_AKTS).toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</strong> çıkar. Krediyi
            yüksek bir dersteki düşük not, ortalamayı küçük bir dersteki aynı nottan daha çok etkiler.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer öğretmen araçları için{" "}
            <Link href="/hesaplayicilar#olcu-ve-gunluk">Mutfak, Beden ve Okul</Link>
            {" "}sayfasına, ağırlıklı not ortalaması hesaplama için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">Ortalama Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Tablo, Türkiye&apos;de üniversitelerde yaygın kullanılan
            genel bir 100&apos;lük-4&apos;lük dönüşüm referansına
            dayanır; resmi bir standart değildir.
          </p>
        </>
      }
    />
  );
}

// /konsantrasyon sayfasinin icerigi: konsantrasyon (ppm, yuzde), kan sekeri, D vitamini ve su sertligi tek sayfada.
// Sayilar cevirici ile ayni fonksiyondan (convert) uretilir.
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { BirlesikIcerik } from "./tipler";

const k = (kategori: string, deger: number, kimden: string, kime: string) => formatSayi(convert(kategori, deger, kimden, kime));
// "yaklaşık" denen yerlerde yuvarlanmis deger.
const y = (kategori: string, deger: number, kimden: string, kime: string, basamak = 1) =>
  formatSayi(Number(convert(kategori, deger, kimden, kime).toFixed(basamak)));

export const konsantrasyonIcerigi: BirlesikIcerik = {
  baslik: "Konsantrasyon Çevirici: ppm, Yüzde, Kan Şekeri (mg/dL – mmol/L), D Vitamini ve Su Sertliği",
  aciklama:
    "ppm, ppb, yüzde ve binde arasında; kan şekerinde mg/dL ile mmol/L, D vitamininde ng/mL ile nmol/L, su sertliğinde Fransız, Alman ve İngiliz derecesi ile mg/L CaCO₃ arasında çeviri.",
  h1: "Konsantrasyon ve Tahlil Birimleri Çevirici",
  ozet: (
    <>
      Bir karışımın içinde bir maddenin ne kadar bulunduğu farklı yerlerde farklı birimlerle yazılır: suyun
      sertliği derece ile, kan şekeri mg/dL ile, bir kirleticinin miktarı ppm ile. Bu sayfada en sık karşılaşılan dört
      konsantrasyon ölçüsü için ayrı çeviriciler var.
    </>
  ),
  giris: [],
  parcalar: [
    {
      id: "ppm",
      kategori: "konsantrasyon",
      sekme: "ppm ve yüzde",
      baslik: "Yüzde, binde, ppm ve ppb",
      govde: (
        <>
          <p>
            Yüzde yüzde bir, binde binde bir, ppm (parts per million) milyonda bir, ppb (parts per billion) milyarda
            bir parça demektir. Hepsi aynı oranın farklı büyüklükteki yazılışıdır: %1 = {k("konsantrasyon", 1, "%", "‰")}‰ ={" "}
            {k("konsantrasyon", 1, "%", "ppm")} ppm. Kütle oranında ppm, miligram/kilogram ile aynıdır; ppb de
            mikrogram/kilogram ile. Gıdalardaki kalıntı sınırları ve topraktaki ağır metaller bu yüzden mg/kg ile
            yazılır.
          </p>
          <p>
            Suda çalışırken ppm çoğu zaman mg/L ile aynı kabul edilir, çünkü 1 litre su yaklaşık 1 kilogramdır. Havadaki
            gazlarda ise ppm hacimce orandır: atmosferdeki karbondioksitin 400 ppm&apos;in üzerinde olduğu söylendiğinde
            havanın her milyon hacminin 400&apos;ünün CO₂ olduğu kastedilir.
          </p>
          <p>
            Binde (promil) en çok kanda alkol için duyulur. Türkiye&apos;de özel araç sürücüleri için yasal sınır 0,50
            promildir. Bir çözeltiyi istenen yüzdeye seyreltmek için{" "}
            <Link href="/alkol-seyreltme-hesaplama">alkol seyreltme hesaplama</Link> aracı kullanılabilir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "ppm", deger: 1 },
        gruplar: [
          { ad: "Oran", birimler: ["%", "‰", "ppm", "ppb"] },
          { ad: "Kütle oranı", birimler: ["g/kg", "mg/kg", "µg/kg"] },
        ],
      },
      tablo: { baslik: "Oran birimleri karşılaştırma tablosu", birimler: ["%", "‰", "ppm", "ppb", "mg/kg"] },
    },
    {
      id: "kan-sekeri",
      kategori: "kan-sekeri",
      sekme: "Kan şekeri",
      baslik: "Kan şekeri: mg/dL ve mmol/L",
      govde: (
        <>
          <p>
            Türkiye&apos;de ve ABD&apos;de kan şekeri (glukoz) mg/dL ile, İngiltere, Kanada ve birçok Avrupa ülkesinde
            mmol/L ile yazılır. İkisi arasındaki çarpan glukozun mol kütlesinden gelir: 1 mmol/L,{" "}
            {k("kan_sekeri", 1, "mmol/L", "mg/dL")} mg/dL&apos;dir. Pratikte mmol/L değerini 18 ile çarpmak, mg/dL
            değerini 18&apos;e bölmek yeterlidir.
          </p>
          <p>
            Amerikan Diyabet Derneği&apos;nin (ADA) ölçütlerine göre açlık kan şekerinin 100 mg/dL&apos;nin
            ({y("kan_sekeri", 100, "mg/dL", "mmol/L")} mmol/L) altında olması normal kabul edilir; 100–125 mg/dL arası
            gizli şeker (prediyabet), iki ayrı ölçümde 126 mg/dL ({y("kan_sekeri", 126, "mg/dL", "mmol/L")} mmol/L) ve
            üzeri diyabet sınırıdır. 70 mg/dL&apos;nin altı düşük şeker (hipoglisemi) olarak değerlendirilir. Yurt
            dışından alınan bir şeker ölçüm cihazı ya da yabancı bir kaynak mmol/L gösteriyorsa çeviriciyle kendi
            alıştığınız birime çevirebilirsiniz.
          </p>
          <p>
            Tahlil sonucunuzu laboratuvarın yazdığı referans aralığına göre ve hekiminizle birlikte değerlendirin; bu
            sayfa yalnızca birim çevirir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "mg/dL", deger: 100 },
        gruplar: [{ ad: "Kan şekeri (glukoz)", birimler: ["mg/dL", "mmol/L"] }],
      },
      tablo: {
        baslik: "Sık görülen kan şekeri değerleri",
        birimler: ["mg/dL", "mmol/L"],
        degerler: [54, 70, 100, 126, 140, 180, 200, 250, 300],
      },
    },
    {
      id: "d-vitamini",
      kategori: "vitamin-d",
      sekme: "D vitamini",
      baslik: "D vitamini: ng/mL ve nmol/L",
      govde: (
        <>
          <p>
            D vitamini tahlilinde ölçülen 25-hidroksi D vitaminidir ve laboratuvarlar sonucu iki farklı birimle verir:
            ng/mL ya da nmol/L. 1 ng/mL, {k("vitamin_d", 1, "ng/mL", "nmol/L")} nmol/L&apos;dir; yani nmol/L değeri,
            ng/mL değerinin yaklaşık iki buçuk katıdır. Aynı kişinin iki farklı laboratuvarda 20 ve 50 gibi çok farklı
            görünen sonuçları aslında aynı düzeyi gösterebilir.
          </p>
          <p>
            Birçok kılavuz ve laboratuvar 20 ng/mL&apos;nin (yaklaşık {y("vitamin_d", 20, "ng/mL", "nmol/L", 0)} nmol/L) altını
            eksiklik olarak kabul eder; yeterli düzey için verilen sınırlar kaynağa göre değişir. Sonucunuzu
            laboratuvarın referans aralığına göre okuyun ve takviye dozunu hekiminize sorun.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "ng/mL", deger: 30 },
        gruplar: [{ ad: "D vitamini (25-OH)", birimler: ["ng/mL", "nmol/L"] }],
      },
      tablo: { baslik: "Sık görülen D vitamini değerleri", birimler: ["ng/mL", "nmol/L"], degerler: [10, 12, 20, 30, 40, 50, 100] },
    },
    {
      id: "su-sertligi",
      kategori: "su-sertligi",
      sekme: "Su sertliği",
      baslik: "Su sertliği: Fransız, Alman ve İngiliz derecesi",
      govde: (
        <>
          <p>
            Su sertliği, suda çözünmüş kalsiyum ve magnezyumun miktarıdır; çaydanlıkta ve çamaşır makinesinde kireç
            olarak görülür. Her ülke kendi derecesini kullanmıştır. Türkiye&apos;de su idareleri sertliği çoğunlukla
            Fransız sertliği (°fH) ile açıklar: 1 °fH, litrede 10 mg kalsiyum karbonata eşittir. Bulaşık makinesi ve
            kahve makinesi kılavuzlarında ise sık sık Alman sertliği (°dH) görülür: 1 °dH yaklaşık{" "}
            {y("su_sertligi", 1, "°dH", "°fH", 2)} °fH&apos;dir.
          </p>
          <p>
            Makinenin sertlik ayarını yaparken belediyenizin açıkladığı değeri makinenin istediği birime çevirin: 25 °fH
            yaklaşık {y("su_sertligi", 25, "°fH", "°dH")} °dH eder. ABD&apos;de satılan su yumuşatıcıları grain/galon
            (gpg) kullanır; 1 gpg yaklaşık {y("su_sertligi", 1, "gpg", "mg/L CaCO₃")} mg/L CaCO₃&apos;tır.
          </p>
          <p>
            Sert su sağlığa zararlı değildir; Dünya Sağlık Örgütü sertlik için sağlık temelli bir sınır koymaz. Sorun
            daha çok kireçlenme, deterjan tüketimi ve cihaz ömrüdür.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "°fH", deger: 20 },
        gruplar: [
          { ad: "Derece", birimler: ["°fH", "°dH", "°e"] },
          { ad: "Miktar", birimler: ["mg/L CaCO₃", "mmol/L", "meq/L", "gpg"] },
        ],
      },
      tablo: { baslik: "Su sertliği birimleri karşılaştırma tablosu", birimler: ["°fH", "°dH", "°e", "mg/L CaCO₃", "mmol/L"] },
    },
  ],
  bolumler: [],
  ilgili: [
    { href: "/alkol-seyreltme-hesaplama", ad: "Alkol seyreltme hesaplama" },
    { href: "/klor-dozaji-hesaplama", ad: "Klor dozajı hesaplama" },
    { href: "/bilim-hesaplayicilari/kimya/mol-hesaplama", ad: "Mol hesaplama" },
    { href: "/bilim-hesaplayicilari/matematik/yuzde-hesaplama", ad: "Yüzde hesaplama" },
  ],
  sss: [
    {
      question: "1 ppm kaç mg/L?",
      answer: "Suda 1 ppm yaklaşık 1 mg/L'dir, çünkü 1 litre su yaklaşık 1 kilogramdır. Kütle oranında 1 ppm tam olarak 1 mg/kg'dır.",
    },
    {
      question: "Yüzde 1 kaç ppm?",
      answer: `%1, ${k("konsantrasyon", 1, "%", "ppm")} ppm'dir. 1 ppm ise ${k("konsantrasyon", 1, "ppm", "ppb")} ppb eder.`,
    },
    {
      question: "mmol/L kan şekeri mg/dL'ye nasıl çevrilir?",
      answer: `mmol/L değerini yaklaşık 18 ile çarpın. Tam çarpan ${k("kan_sekeri", 1, "mmol/L", "mg/dL")}; örneğin 5,5 mmol/L yaklaşık ${y("kan_sekeri", 5.5, "mmol/L", "mg/dL", 0)} mg/dL eder.`,
    },
    {
      question: "D vitamini ng/mL nmol/L'ye nasıl çevrilir?",
      answer: `ng/mL değerini ${k("vitamin_d", 1, "ng/mL", "nmol/L")} ile çarpın. 30 ng/mL yaklaşık ${y("vitamin_d", 30, "ng/mL", "nmol/L", 0)} nmol/L eder.`,
    },
    {
      question: "Fransız sertliği Alman sertliğine nasıl çevrilir?",
      answer: `°fH değerini yaklaşık 1,78'e bölün. 1 °dH = ${y("su_sertligi", 1, "°dH", "°fH", 2)} °fH; 20 °fH yaklaşık ${y("su_sertligi", 20, "°fH", "°dH")} °dH eder.`,
    },
  ],
  kaynaklar: [
    { ad: "American Diabetes Association, Standards of Care in Diabetes: Diagnosis and Classification", href: "https://diabetesjournals.org/care" },
    { ad: "ABD Ulusal Sağlık Enstitüleri (NIH ODS), Vitamin D: Fact Sheet for Health Professionals", href: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/" },
    { ad: "Dünya Sağlık Örgütü, Hardness in Drinking-water (2011)", href: "https://www.who.int/publications/m/item/hardness-in-drinking-water" },
    { ad: "IUPAC, Compendium of Chemical Terminology (Gold Book)", href: "https://goldbook.iupac.org/" },
    { ad: "Karayolları Trafik Yönetmeliği, alkollü araç kullanma sınırları" },
  ],
  guncelleme: "2026-11-12",
};

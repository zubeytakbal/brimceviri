// /hacim sayfasinin icerigi. Sayilar cevirici ile ayni fonksiyondan (convert) uretilir.
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { KategoriIcerigi } from "./tipler";

const h = (deger: number, kimden: string, kime: string) => formatSayi(convert("hacim", deger, kimden, kime));
// "yaklaşık" denen yerlerde yuvarlanmis deger.
const y = (deger: number, kimden: string, kime: string, basamak = 1) =>
  formatSayi(Number(convert("hacim", deger, kimden, kime).toFixed(basamak)));

export const hacimIcerigi: KategoriIcerigi = {
  baslik: "Hacim Çevirici: Litre, Metreküp, Mililitre, Galon ve Su Bardağı",
  aciklama:
    "Litre, metreküp, mililitre, galon, varil, su bardağı ve yemek kaşığı arasında anında çeviri. Hesaplanmış çeviri tablosu, ABD ve İngiliz galonu farkı, mutfak ölçüleri ve kile, şinik gibi eski Türk hacim ölçüleri.",
  ozet: (
    <>
      Bir kutuya değer yazın, diğer bütün birimler aynı anda hesaplansın. Litre ve metreküpün yanında mutfakta
      kullanılan su bardağı ve kaşık ölçüleri, ABD ve İngiliz galonu, petrolün birimi varil ve Osmanlı'dan kalma kile
      de burada.
    </>
  ),
  cevirici: {
    baslangic: { birim: "L", deger: 1 },
    gruplar: [
      { ad: "Metrik", birimler: ["mL", "L", "m³"] },
      { ad: "Mutfak", birimler: ["çk", "yk", "sb", "cup"] },
      { ad: "ABD / İngiliz", birimler: ["fl oz", "pt", "gal", "imp gal", "bbl"] },
      { ad: "Eski Türk ölçüleri", birimler: ["şinik", "kile"] },
    ],
  },
  ilgili: [
    { href: "/mutfak-olculeri-cevirici", ad: "Mutfak ölçüleri çevirici" },
    { href: "/tank-hacmi-hesaplama", ad: "Tank hacmi hesaplama" },
    { href: "/havuz-hacmi-hesaplama", ad: "Havuz hacmi hesaplama" },
    { href: "/beton-hesaplama", ad: "Beton hesaplama" },
    { href: "/kokteyl-olcusu-cevirici", ad: "Kokteyl ölçüsü çevirici" },
  ],
  // Yayindaki cift sayfalari; gunluk kullanimdaki ceviriler once.
  populer: [
    "litre-metrekup", "metrekup-litre", "litre-mililitre", "mililitre-litre", "galon-litre", "litre-galon",
    "varil-litre", "yemek-kasigi-mililitre",
  ],
  tablo: { baslik: "Sık kullanılan birimler arasında çeviri tablosu", birimler: ["mL", "L", "m³", "sb", "gal", "imp gal", "bbl"] },
  bolumler: [
    {
      id: "litre-metrekup",
      baslik: "Litre, metreküp ve santimetreküp",
      govde: (
        <>
          <p>
            Litre, kenarı 10 santimetre olan bir küpün hacmidir; bu yüzden 1 litre tam olarak 1 desimetreküpe eşittir.
            Kenarı 1 metre olan küpün içine bu küplerden 10 × 10 × 10 = 1.000 tane sığar: 1 metreküp{" "}
            {h(1, "m³", "L")} litredir. Aynı mantıkla 1 mililitre de 1 santimetreküptür; ilaç şişesinde ya da şırıngada
            görülen &quot;cc&quot; kısaltması da santimetreküp demektir.
          </p>
          <p>
            Su faturasındaki tüketim metreküp ile yazılır. 1 metreküp su 1.000 litredir ve yaklaşık 1 ton gelir; çünkü
            1 litre su yaklaşık 1 kilogramdır. Faturanızda 12 m³ görüyorsanız, o ay evinize {h(12, "m³", "L")} litre su
            girmiş demektir.
          </p>
          <p>
            Araç ruhsatındaki silindir hacmi de santimetreküp ile yazılır. &quot;1.6&quot; diye anılan bir motor yaklaşık
            1.600 cm³, yani 1,6 litredir. Doğalgaz da metreküp ile ölçülür, ama gazın hacmi basınca ve sıcaklığa göre
            değiştiği için faturada ayrıca kilovatsaate çevrilir.
          </p>
        </>
      ),
    },
    {
      id: "mutfak",
      baslik: "Mutfakta: su bardağı, yemek kaşığı ve çay kaşığı",
      govde: (
        <>
          <p>
            Türk tariflerinde ölçü çoğu zaman bardak ve kaşıkla verilir. Çeviricide su bardağı {h(1, "sb", "mL")} mL,
            yemek kaşığı {h(1, "yk", "mL")} mL, çay kaşığı da {h(1, "çk", "mL")} mL kabul edilir. Bir su bardağı
            böylece yaklaşık {y(1, "sb", "yk", 0)} yemek kaşığı eder.
          </p>
          <p>
            Yabancı tariflerdeki &quot;cup&quot; bizim su bardağımızla aynı değildir: ABD&apos;de 1 cup{" "}
            {y(1, "cup", "mL")} mL, yani su bardağından biraz büyüktür. Kek ve ekmek gibi oranın önemli olduğu tariflerde
            bu fark sonucu değiştirebilir; tarif hangi ülkeden geliyorsa o ülkenin ölçüsünü kullanın.
          </p>
          <p>
            Unutmayın, bardak bir hacim ölçüsüdür. Bir bardak un ile bir bardak şekerin ağırlığı farklıdır. Malzemeyi
            grama çevirmek istiyorsanız <Link href="/mutfak-olculeri-cevirici">mutfak ölçüleri çevirici</Link>{" "}
            malzemenin yoğunluğuna göre hesap yapar.
          </p>
        </>
      ),
    },
    {
      id: "galon",
      baslik: "Galon: ABD mi, İngiliz mi?",
      govde: (
        <>
          <p>
            İki ayrı galon vardır ve aralarındaki fark yaklaşık yüzde 20&apos;dir. ABD galonu {h(1, "gal", "L")} litre,
            İngiliz (imperial) galonu ise {h(1, "imp gal", "L")} litredir. ABD&apos;de benzin fiyatı ve araç yakıt
            tüketimi ABD galonu ile, İngiltere&apos;de eski kaynaklardaki ölçüler İngiliz galonu ile yazılır. Bir metinde
            yalnızca &quot;galon&quot; görüyorsanız kaynağın hangi ülkeden geldiğine bakın.
          </p>
          <p>
            Aynı fark galonun alt birimlerinde de sürer. İngiliz pint&apos;i {h(1, "imp pt", "mL")} mL, ABD pint&apos;i{" "}
            {h(1, "pt", "mL")} mL&apos;dir; İngiltere&apos;de barda istenen &quot;bir pint bira&quot; bu yüzden ABD&apos;dekinden
            daha büyük bir bardaktır. İşin ilginç yanı, sıvı onsta durum tersine döner: ABD sıvı onsu (
            {y(1, "fl oz", "mL", 2)} mL) İngiliz sıvı onsundan ({y(1, "imp fl oz", "mL", 2)} mL) biraz büyüktür. İngiliz
            pint&apos;i 20, ABD pint&apos;i 16 ons olduğu için pint yine İngiltere&apos;de büyük kalır.
          </p>
        </>
      ),
    },
    {
      id: "varil",
      baslik: "Varil: petrolün birimi",
      govde: (
        <>
          <p>
            Haberlerde petrol fiyatı varil başına dolar olarak verilir. Petrol varili 42 ABD galonudur, yani{" "}
            {h(1, "bbl", "L")} litre. Bu ölçü 19. yüzyılda ABD&apos;deki ilk petrol sahalarında kullanılan ahşap
            fıçılardan kalmıştır; bugün petrol fıçıyla taşınmasa da ticaret hâlâ bu birimle yapılır.
          </p>
          <p>
            Varil fiyatını litreye çevirmek için fiyatı {y(1, "bbl", "L", 0)}&apos;a bölmek yeterlidir. Bu, ham
            petrolün litre fiyatıdır; pompadaki benzin fiyatına rafineri, taşıma ve vergiler de eklenir.
          </p>
        </>
      ),
    },
    {
      id: "kile",
      baslik: "Kile ve şinik",
      govde: (
        <>
          <p>
            Osmanlı&apos;da buğday, arpa gibi tahıllar ağırlıkla değil hacimle, kile ve şinikle ölçülürdü. Kilenin değeri
            bölgeye ve döneme göre değişirdi; çeviricide İstanbul kilesi esas alınır ve 1 kile {h(1, "kile", "L")} litre
            kabul edilir. Şinik kilenin dörtte biridir: {h(1, "şinik", "L")} litre.
          </p>
          <p>
            Bu ölçüler 1931&apos;de kabul edilen 1782 sayılı Ölçüler Kanunu ile yerini litreye bıraktı. İlginç bir
            benzerlik olarak, ABD&apos;de tahıl ticaretinde hâlâ kullanılan bushel ({y(1, "bu", "L")} litre) kileye çok
            yakındır; ikisi de bir çuval tahılı ölçmek için doğmuş birimlerdir.
          </p>
        </>
      ),
    },
    {
      id: "odun",
      baslik: "Ster ve kord: odunun ölçüsü",
      govde: (
        <>
          <p>
            Yakacak odun genellikle ster ile satılır. 1 ster, 1 metre en, 1 metre boy ve 1 metre yükseklikte istiflenmiş
            odundur; dış ölçüsü 1 metreküptür ama kütükler arasında boşluk kaldığı için içindeki katı odun bundan azdır.
            Bu yüzden ster ile metreküp aynı miktarda odun anlamına gelmez.
          </p>
          <p>
            ABD ve Kanada&apos;da aynı iş için kord kullanılır: 4 × 4 × 8 fitlik istif, yani yaklaşık{" "}
            {y(1, "cord", "m³", 2)} metreküp.
          </p>
        </>
      ),
    },
  ],
  sss: [
    {
      question: "1 metreküp kaç litre?",
      answer: `1 metreküp ${h(1, "m³", "L")} litredir. 1 litre ise 1 desimetreküp, yani 0,001 metreküptür.`,
    },
    {
      question: "1 litre kaç mililitre?",
      answer: "1 litre 1.000 mililitredir. 1 mililitre de 1 santimetreküpe (cc) eşittir.",
    },
    {
      question: "1 galon kaç litre?",
      answer: `1 ABD galonu ${h(1, "gal", "L")} litre, 1 İngiliz galonu ise ${h(1, "imp gal", "L")} litredir.`,
    },
    {
      question: "1 varil kaç litre?",
      answer: `1 petrol varili 42 ABD galonu, yani ${h(1, "bbl", "L")} litredir.`,
    },
    {
      question: "1 su bardağı kaç mililitre?",
      answer: `Çeviricide 1 su bardağı ${h(1, "sb", "mL")} mL kabul edilir. ABD tariflerindeki 1 cup ise yaklaşık ${y(1, "cup", "mL")} mL'dir.`,
    },
    {
      question: "1 yemek kaşığı kaç mililitre?",
      answer: `1 yemek kaşığı ${h(1, "yk", "mL")} mL, 1 çay kaşığı ise ${h(1, "çk", "mL")} mL kabul edilir.`,
    },
  ],
  kaynaklar: [
    { ad: "BIPM, Uluslararası Birimler Sistemi (SI Broşürü), 9. baskı", href: "https://www.bipm.org/en/publications/si-brochure" },
    { ad: "NIST, Inch-pound ve SI birimleri arasında dönüşüm faktörleri (SP 811)", href: "https://www.nist.gov/pml/special-publication-811" },
    { ad: "Birleşik Krallık, Weights and Measures Act 1985", href: "https://www.legislation.gov.uk/ukpga/1985/72" },
    { ad: "ABD Enerji Bilgi İdaresi (EIA), Oil and petroleum products explained", href: "https://www.eia.gov/energyexplained/oil-and-petroleum-products/" },
    { ad: "1782 sayılı Ölçüler Kanunu (Resmî Gazete, 1931)" },
  ],
  guncelleme: "2026-11-11",
};

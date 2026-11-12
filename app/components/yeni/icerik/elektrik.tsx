// /elektrik sayfasinin icerigi: elektrik (gerilim ve akim), direnc, kapasitans, enduktans, elektrik yuku,
// elektrik iletkenligi, manyetik alan ve manyetik aki tek sayfada. Sayilar cevirici ile ayni fonksiyondan (convert).
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { BirlesikIcerik } from "./tipler";

const e = (kategori: string, deger: number, kimden: string, kime: string) => formatSayi(convert(kategori, deger, kimden, kime));

export const elektrikIcerigi: BirlesikIcerik = {
  baslik: "Elektrik Birimleri Çevirici: Volt, Amper, Ohm, Farad, Henry, Siemens ve Weber",
  aciklama:
    "Volt, kilovolt, amper, miliamper, ohm, kiloohm, mikrofarad, nanofarad, pikofarad, henry, coulomb, µS/cm ve oersted arasında çeviri. Kondansatör kodları, mAh ile coulomb, su ve toprakta iletkenlik (EC) ve şebeke gerilimleri.",
  h1: "Elektrik Birimleri Çevirici",
  ozet: (
    <>
      Gerilim, akım, direnç, kondansatör ve bobin değerleri, elektrik yükü, iletkenlik ve manyetik büyüklükler tek
      sayfada. Bu büyüklükler birbirine çevrilemediği için her birinin kendi çeviricisi var; çeviricinin üstündeki sekmelerden
      seçebilirsiniz.
    </>
  ),
  giris: [
    {
      id: "ohm-yasasi",
      baslik: "Gerilim, akım ve direnç birbirine nasıl bağlı?",
      govde: (
        <>
          <p>
            Volt, amper ve ohm birbirine çevrilmez, ama Ohm yasasıyla birbirine bağlıdır: gerilim = akım × direnç
            (V = I × R). 12 voltluk bir aküye 4 ohm&apos;luk bir yük bağlanırsa devreden 3 amper geçer. Gücü
            bulmak için gerilimi akımla çarpmak yeterlidir: aynı devrede 12 V × 3 A = 36 watt harcanır.
          </p>
          <p>
            Bir değeri büyütüp küçültmek ise basit bir ön ek işidir. Kilo bin kat, mili binde bir, mikro milyonda bir,
            nano milyarda bir, piko trilyonda bir demektir. 4,7 kΩ&apos;luk direnç 4.700 Ω, 220 nF&apos;lık kondansatör
            0,22 µF&apos;tır. Çeviricinin en sık kullanıldığı yer de bu ön ekler arasındaki geçiştir.
          </p>
        </>
      ),
    },
  ],
  parcalar: [
    {
      id: "gerilim",
      kategori: "elektrik",
      altKategori: "elektrik_gerilim",
      sekme: "Gerilim",
      baslik: "Gerilim: volt, milivolt ve kilovolt",
      govde: (
        <>
          <p>
            Türkiye&apos;de evlerdeki priz gerilimi 230 volt, frekansı 50 hertzdir. Elektrik santralden evlere kadar
            farklı gerilimlerde taşınır: uzun mesafeli iletim hatlarında 154 kV ve 380 kV, şehir içi dağıtımda
            çoğunlukla 34,5 kV kullanılır; trafo bu gerilimi evlerin 230 voltuna düşürür. Gerilim yükseldikçe aynı güç
            daha düşük akımla taşınır ve kablolardaki kayıp azalır.
          </p>
          <p>
            Küçük gerilimler milivolt ile ölçülür: termokupl gibi sıcaklık sensörleri ve kas ile kalp sinyalleri (EKG)
            milivolt düzeyindedir. Otomobil aküsü 12 V, USB çıkışı ise 5 V&apos;tur. 1 kV {e("elektrik_gerilim", 1, "kV", "V")}{" "}
            V, 1 V da {e("elektrik_gerilim", 1, "V", "mV")} mV eder.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "V", deger: 230 },
        gruplar: [{ ad: "Gerilim", birimler: ["kV", "V", "mV"] }],
      },
      tablo: { baslik: "Gerilim birimleri karşılaştırma tablosu", birimler: ["kV", "V", "mV"] },
    },
    {
      id: "akim",
      kategori: "elektrik",
      altKategori: "elektrik_akim",
      sekme: "Akım",
      baslik: "Akım: amper ve miliamper",
      govde: (
        <>
          <p>
            Amper, bir iletkenden saniyede geçen elektrik yüküdür. Evde priz hatları genellikle 16 amperlik, aydınlatma
            hatları 10 amperlik sigortayla korunur. Telefon şarj cihazlarının çıkışı 1 ile 3 amper arasındadır; küçük
            elektronik devreler, LED&apos;ler ve sensörler ise miliamper düzeyinde akım çeker.
          </p>
          <p>
            Miliamper güvenlik açısından da önemlidir. Konutlarda priz devrelerine konan kaçak akım koruma rölesi
            30 mA&apos;lik kaçakta devreyi keser; çünkü vücuttan geçen birkaç on miliamperlik akım bile tehlikelidir.
            1 A {e("elektrik_akim", 1, "A", "mA")} mA, 30 mA da {e("elektrik_akim", 30, "mA", "A")} A eder.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "A", deger: 1 },
        gruplar: [{ ad: "Akım", birimler: ["kA", "A", "mA"] }],
      },
      tablo: { baslik: "Akım birimleri karşılaştırma tablosu", birimler: ["kA", "A", "mA"] },
    },
    {
      id: "direnc",
      kategori: "direnc",
      sekme: "Direnç",
      baslik: "Direnç: ohm, kiloohm ve megaohm",
      govde: (
        <>
          <p>
            Direnç, bir malzemenin akıma ne kadar karşı koyduğunu gösterir. Elektronik devrelerdeki dirençler
            çoğunlukla ohm ve kiloohm ile, kablo ve motor sargılarının yalıtım direnci ise megaohm ile ölçülür. Yalıtım
            ölçüm cihazında (megger) düşük bir megaohm değeri, yalıtımın bozulduğunu ve kaçak olabileceğini gösterir.
          </p>
          <p>
            Dirençlerin üzerinde değer çoğu zaman renk halkalarıyla ya da &quot;4K7&quot;, &quot;1M0&quot; gibi
            kodlarla yazılır; burada K kiloohm, M megaohm demektir ve harf ondalık virgülün yerini tutar. 4K7, 4,7 kΩ
            yani {e("elektrik_direnc", 4.7, "kΩ", "Ω")} Ω&apos;dur.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "kΩ", deger: 1 },
        gruplar: [{ ad: "Direnç", birimler: ["MΩ", "kΩ", "Ω"] }],
      },
      tablo: { baslik: "Direnç birimleri karşılaştırma tablosu", birimler: ["MΩ", "kΩ", "Ω"] },
    },
    {
      id: "kapasitans",
      kategori: "kapasitans",
      sekme: "Kapasitans",
      baslik: "Kapasitans: farad, mikrofarad, nanofarad ve pikofarad",
      govde: (
        <>
          <p>
            Farad, kondansatörün ne kadar yük biriktirebildiğini gösterir ve çok büyük bir birimdir; günlük kullanımdaki
            kondansatörler mikrofarad, nanofarad ve pikofarad düzeyindedir. Klima ve çamaşır makinesi motorlarındaki
            çalışma kondansatörleri birkaç ile birkaç on mikrofarad arasındadır; elektronik kartlardaki küçük seramik
            kondansatörler nanofarad ve pikofarad ile yazılır.
          </p>
          <p>
            Seramik kondansatörlerin üzerindeki üç rakamlı kod pikofarad cinsindendir: ilk iki rakam değeri, üçüncüsü
            eklenecek sıfır sayısını verir. &quot;104&quot; kodu 10 ve dört sıfır, yani 100.000 pF&apos;tır; bu da{" "}
            {e("kapasitans", 100000, "pF", "nF")} nF ya da {e("kapasitans", 100000, "pF", "µF")} µF eder.
            Arızalı bir kondansatörü değiştirirken aynı değeri farklı birimle yazan bir parça bulursanız çeviriciyle
            karşılaştırabilirsiniz.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "µF", deger: 1 },
        gruplar: [{ ad: "Kapasitans", birimler: ["F", "mF", "µF", "nF", "pF"] }],
      },
      tablo: { baslik: "Kapasitans birimleri karşılaştırma tablosu", birimler: ["F", "mF", "µF", "nF", "pF"] },
    },
    {
      id: "enduktans",
      kategori: "enduktans",
      sekme: "Endüktans",
      baslik: "Endüktans: henry, milihenry ve mikrohenry",
      govde: (
        <>
          <p>
            Endüktans, bir bobinin içinden geçen akımdaki değişime karşı koyma özelliğidir ve henry ile ölçülür. Akım
            saniyede 1 amper değiştiğinde 1 voltluk gerilim oluşturan bobinin endüktansı 1 henry&apos;dir. Pratikte
            karşılaşılan değerler küçüktür: anahtarlamalı güç kaynaklarındaki bobinler mikrohenry, ses filtrelerindeki
            ve şok bobinlerindeki değerler milihenry düzeyindedir.
          </p>
          <p>
            1 H {e("enduktans", 1, "H", "mH")} mH, 1 mH de {e("enduktans", 1, "mH", "µH")} µH eder. Bobinlerin üzerindeki
            kod, kondansatörlerdeki gibi okunur ama birim mikrohenrydir: &quot;101&quot; 100 µH demektir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "mH", deger: 1 },
        gruplar: [{ ad: "Endüktans", birimler: ["H", "mH", "µH"] }],
      },
      tablo: { baslik: "Endüktans birimleri karşılaştırma tablosu", birimler: ["H", "mH", "µH"] },
    },
    {
      id: "elektrik-yuku",
      kategori: "elektrik-yuku",
      sekme: "Yük",
      baslik: "Elektrik yükü: coulomb ve pil kapasitesi (mAh)",
      govde: (
        <>
          <p>
            Coulomb, 1 amperlik akımın 1 saniyede taşıdığı yüktür. Statik elektrik ve kondansatör hesaplarında mikro ve
            nanocoulomb gibi küçük değerler karşınıza çıkar.
          </p>
          <p>
            Telefon ve powerbank pillerinin üzerindeki mAh (miliamper-saat) da aslında bir yük birimidir: 1 mAh, 1
            miliamperlik akımın bir saat boyunca taşıdığı yüktür ve 3,6 coulomb eder. Bu durumda 5.000 mAh&apos;lik bir
            pil 18.000 coulomb yük taşır. Pilin içindeki enerjiyi bulmak için mAh değerini pil gerilimiyle çarpmak
            gerekir: 5.000 mAh × 3,7 V = 18.500 mWh, yani 18,5 Wh.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "C", deger: 1 },
        gruplar: [{ ad: "Elektrik yükü", birimler: ["C", "mC", "µC", "nC"] }],
      },
      tablo: { baslik: "Elektrik yükü birimleri karşılaştırma tablosu", birimler: ["C", "mC", "µC", "nC"] },
    },
    {
      id: "iletkenlik",
      kategori: "elektrik-iletkenligi",
      sekme: "İletkenlik",
      baslik: "İletkenlik: su ve toprakta EC, metallerde % IACS",
      govde: (
        <>
          <p>
            Elektrik iletkenliği direncin tersidir ve siemens/metre ile ölçülür. Günlük hayatta en çok suyun ve
            toprağın tuzluluğunu ölçmek için kullanılır, çünkü suda çözünmüş tuz arttıkça iletkenlik de artar. Su
            ölçüm cihazları genellikle µS/cm, toprak analizleri ise dS/m gösterir. 1 dS/m tam olarak{" "}
            {e("elektrik_iletkenligi", 1, "dS/m", "mS/cm")} mS/cm, yani {e("elektrik_iletkenligi", 1, "dS/m", "µS/cm")}{" "}
            µS/cm&apos;dir.
          </p>
          <p>
            Saf su çok az iletir; laboratuvarlarda kullanılan ultra saf suyun özdirenci 18,2 MΩ·cm&apos;dir. Musluk
            suyunun iletkenliği bölgeye göre birkaç yüz µS/cm, deniz suyununki ise yaklaşık 50 mS/cm&apos;dir. Tarımda
            toprak çözeltisinin iletkenliği 4 dS/m&apos;yi geçen topraklar tuzlu kabul edilir ve hassas bitkilerde
            verim düşer. Hidroponik ve akvaryumda da besin çözeltisinin yoğunluğu EC ile takip edilir.
          </p>
          <p>
            Metallerde iletkenlik çoğu zaman tavlanmış bakıra göre yüzde olarak verilir: 100 % IACS,{" "}
            {e("elektrik_iletkenligi", 100, "% IACS", "MS/m")} MS/m&apos;dir ve bakırın özdirenci yaklaşık 0,0172
            Ω·mm²/m eder. Alüminyumun iletkenliği bakırın yaklaşık %61&apos;i olduğu için aynı akım için daha kalın
            alüminyum kablo gerekir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "µS/cm", deger: 500 },
        gruplar: [
          { ad: "Su ve toprak (EC)", birimler: ["µS/cm", "mS/cm", "dS/m", "S/m"] },
          { ad: "Metaller", birimler: ["MS/m", "% IACS", "Ω·mm²/m"] },
          { ad: "Özdirenç", birimler: ["Ω·m", "Ω·cm", "MΩ·cm"] },
        ],
      },
      tablo: { baslik: "İletkenlik birimleri karşılaştırma tablosu", birimler: ["S/m", "mS/cm", "µS/cm", "dS/m", "mS/m"] },
    },
    {
      id: "manyetik-alan",
      kategori: "manyetik-alan",
      sekme: "Manyetik alan",
      baslik: "Manyetik alan şiddeti: amper/metre ve oersted",
      govde: (
        <>
          <p>
            Manyetik alan şiddeti, bir akımın ya da mıknatısın çevresinde oluşturduğu alanı anlatır. SI birimi
            amper/metre&apos;dir; eski CGS sisteminden kalan oersted ise mıknatıs ve manyetik malzeme kataloglarında
            hâlâ çok kullanılır. Kalıcı mıknatısların ne kadar zor manyetikliğini kaybettiğini gösteren koersivite
            değeri çoğu zaman kiloersted (kOe) ile yazılır.
          </p>
          <p>
            1 Oe yaklaşık {e("manyetik_alan", 1, "Oe", "A/m")} A/m&apos;dir (tam değeri 1.000 / 4π). Alan şiddeti,
            mıknatısın &quot;gücü&quot; olarak bilinen manyetik akı yoğunluğuyla (tesla, gauss) aynı şey değildir;
            ikisi arasındaki ilişki ortamın malzemesine bağlıdır.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "Oe", deger: 1 },
        gruplar: [{ ad: "Manyetik alan", birimler: ["A/m", "kA/m", "Oe"] }],
      },
      tablo: { baslik: "Manyetik alan birimleri karşılaştırma tablosu", birimler: ["A/m", "kA/m", "Oe"] },
    },
    {
      id: "manyetik-aki",
      kategori: "manyetik-aki",
      sekme: "Manyetik akı",
      baslik: "Manyetik akı: weber",
      govde: (
        <>
          <p>
            Manyetik akı, bir yüzeyden geçen toplam manyetik alandır ve weber ile ölçülür. Faraday yasasına göre bir
            bobinden geçen akı değiştiğinde bobinde gerilim oluşur: akı saniyede 1 weber değişirse 1 voltluk gerilim
            doğar. Jeneratörler, transformatörler ve elektrik motorları bu ilkeyle çalışır; bu yüzden weber
            transformatör ve motor hesaplarında karşınıza çıkar.
          </p>
          <p>
            Pratik değerler çoğunlukla mili- ve mikroweber düzeyindedir. 1 Wb {e("manyetik_aki", 1, "Wb", "mWb")} mWb,
            1 mWb de {e("manyetik_aki", 1, "mWb", "µWb")} µWb eder.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "mWb", deger: 1 },
        gruplar: [{ ad: "Manyetik akı", birimler: ["Wb", "mWb", "µWb", "nWb"] }],
      },
      tablo: { baslik: "Manyetik akı birimleri karşılaştırma tablosu", birimler: ["Wb", "mWb", "µWb", "nWb"] },
    },
  ],
  bolumler: [
    {
      id: "guc-ve-tuketim",
      baslik: "Güç ve tüketim hesapları",
      govde: (
        <>
          <p>
            Watt ve kilovatsaat bu sayfada değil, çünkü güç ve enerji ayrı birimlerdir. Watt, kilowatt ve beygir gücü
            arasında çeviri için <Link href="/kategoriler/guc">güç birimleri</Link> sayfasına, bir cihazın aylık
            faturaya etkisi için <Link href="/elektrik-tuketimi-hesaplama">elektrik tüketimi hesaplama</Link> aracına
            bakabilirsiniz. Kilowatt değerinden çekilecek akımı bulmak ya da kablo kesitini seçmek için{" "}
            <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama">kW&apos;tan ampere</Link>{" "}
            hesabı ve <Link href="/awg-mm2-cevirici">AWG – mm² çevirici</Link> işinizi görür.
          </p>
        </>
      ),
    },
  ],
  ilgili: [
    { href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama", ad: "kW'tan ampere hesaplama" },
    { href: "/kva-kw-hesaplama", ad: "kVA – kW hesaplama" },
    { href: "/elektrik-tuketimi-hesaplama", ad: "Elektrik tüketimi hesaplama" },
    { href: "/awg-mm2-cevirici", ad: "AWG – mm² çevirici" },
    { href: "/kategoriler/guc", ad: "Güç birimleri" },
  ],
  sss: [
    {
      question: "1 kilovolt kaç volt?",
      answer: `1 kilovolt ${e("elektrik_gerilim", 1, "kV", "V")} volttur. 1 volt da ${e("elektrik_gerilim", 1, "V", "mV")} milivolt eder.`,
    },
    {
      question: "1 amper kaç miliamper?",
      answer: `1 amper ${e("elektrik_akim", 1, "A", "mA")} miliamperdir. 500 mA ise ${e("elektrik_akim", 500, "mA", "A")} A eder.`,
    },
    {
      question: "1 kiloohm kaç ohm?",
      answer: `1 kΩ ${e("elektrik_direnc", 1, "kΩ", "Ω")} Ω, 1 MΩ ise ${e("elektrik_direnc", 1, "MΩ", "kΩ")} kΩ eder.`,
    },
    {
      question: "1 mikrofarad kaç nanofarad?",
      answer: `1 µF ${e("kapasitans", 1, "µF", "nF")} nF, yani ${e("kapasitans", 1, "µF", "pF")} pF eder. 100 nF da 0,1 µF'tır.`,
    },
    {
      question: "Kondansatör üzerindeki 104 ne demek?",
      answer:
        "Kod pikofarad cinsindendir: ilk iki rakam 10, üçüncü rakam eklenecek sıfır sayısıdır. 104 = 100.000 pF = 100 nF = 0,1 µF.",
    },
    {
      question: "1 dS/m kaç µS/cm?",
      answer: `1 dS/m, 1 mS/cm'ye ve ${e("elektrik_iletkenligi", 1, "dS/m", "µS/cm")} µS/cm'ye eşittir.`,
    },
    {
      question: "mAh kaç coulomb?",
      answer: "1 mAh 3,6 coulomb'dur. 5.000 mAh'lik bir pil 18.000 coulomb yük taşır.",
    },
  ],
  kaynaklar: [
    { ad: "BIPM, Uluslararası Birimler Sistemi (SI Broşürü), 9. baskı", href: "https://www.bipm.org/en/publications/si-brochure" },
    { ad: "IEC 60050, Uluslararası Elektroteknik Sözlüğü (Electropedia)", href: "https://www.electropedia.org/" },
    { ad: "IEC 60062, Direnç ve kondansatörler için işaretleme kodları" },
    { ad: "IEC 60028, Bakır için uluslararası direnç standardı (IACS)" },
    { ad: "TS EN 50160, Dağıtım şebekelerinde gerilim özellikleri" },
  ],
  guncelleme: "2026-11-12",
};

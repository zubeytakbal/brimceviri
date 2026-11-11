// /kutle sayfasinin icerigi. Sayilar cevirici ile ayni fonksiyondan (convert) uretilir.
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { KategoriIcerigi } from "./tipler";

const k = (deger: number, kimden: string, kime: string) => formatSayi(convert("kutle", deger, kimden, kime));
// "yaklaşık" denen yerlerde yuvarlanmis deger.
const y = (deger: number, kimden: string, kime: string, basamak = 1) =>
  formatSayi(Number(convert("kutle", deger, kimden, kime).toFixed(basamak)));

export const kutleIcerigi: KategoriIcerigi = {
  baslik: "Kütle Çevirici: Kilogram, Gram, Ton, Pound, Ons ve Okka",
  aciklama:
    "Kilogram, gram, miligram, ton, pound, ons, troy ons, karat ve okka arasında anında çeviri. Hesaplanmış çeviri tablosu, altında troy ons ve karat, pound ve stone, okka, dirhem ve batman gibi eski Türk ağırlık ölçüleri.",
  ozet: (
    <>
      Bir kutuya değer yazın, diğer bütün birimler aynı anda hesaplansın. Kilogram ve gramın yanında pound, ons ve
      stone gibi İngiliz ölçüleri, kuyumcuda kullanılan troy ons ve karat, Osmanlı&apos;dan kalma okka, dirhem ve batman
      da burada.
    </>
  ),
  cevirici: {
    baslangic: { birim: "kg", deger: 1 },
    gruplar: [
      { ad: "Metrik", birimler: ["mg", "g", "kg", "q", "ton"] },
      { ad: "İngiliz / ABD", birimler: ["oz", "lb", "st"] },
      { ad: "Kuyumcu", birimler: ["ct", "ozt"] },
      { ad: "Eski Türk ölçüleri", birimler: ["dirhem", "miskal", "okka", "batman"] },
    ],
  },
  ilgili: [
    { href: "/altin-hesaplama", ad: "Altın hesaplama" },
    { href: "/demir-agirlik-hesaplama", ad: "Demir ağırlık hesaplama" },
    { href: "/gezegenlerde-kac-kilo-gelirim", ad: "Gezegenlerde kaç kilo gelirim?" },
    { href: "/ideal-kilo-hesaplama", ad: "İdeal kilo hesaplama" },
    { href: "/cbm-hesaplama", ad: "CBM ve hacimsel ağırlık" },
  ],
  // Yayindaki cift sayfalari; gunluk kullanimdaki ceviriler once.
  populer: [
    "kilogram-gram", "gram-kilogram", "pound-kilogram", "ton-kilogram", "kilogram-ton", "gram-miligram",
    "miligram-gram", "ons-gram", "karat-gram", "okka-kilogram", "dirhem-gram",
  ],
  tablo: { baslik: "Sık kullanılan birimler arasında çeviri tablosu", birimler: ["g", "kg", "ton", "oz", "lb", "ozt", "okka"] },
  bolumler: [
    {
      id: "kutle-agirlik",
      baslik: "Kütle mi, ağırlık mı?",
      govde: (
        <>
          <p>
            Günlük dilde &quot;ağırlığım 70 kilo&quot; deriz, ama kilogram aslında kütlenin birimidir. Kütle bir cismin
            ne kadar madde içerdiğini gösterir ve nerede olursanız olun değişmez. Ağırlık ise yer çekiminin o kütleye
            uyguladığı kuvvettir ve bilimde newton ile ölçülür.
          </p>
          <p>
            Farkı en iyi Ay gösterir. Ay&apos;ın çekimi Dünya&apos;nınkinin yaklaşık altıda biri olduğu için orada tartıya
            çıkan biri çok daha hafif görünür, ama kütlesi aynıdır. Hangi gezegende ne kadar geleceğinizi{" "}
            <Link href="/gezegenlerde-kac-kilo-gelirim">gezegenlerde kaç kilo gelirim</Link> aracıyla
            hesaplayabilirsiniz. Dünya üzerinde ise tartının gösterdiği kilogram, kütlenizle aynı kabul edilir; bu
            sayfadaki bütün çeviriler de kütle çevirisidir.
          </p>
        </>
      ),
    },
    {
      id: "kilogram",
      baslik: "Kilogram: bir metal silindirden doğa sabitine",
      govde: (
        <>
          <p>
            1889&apos;dan 2019&apos;a kadar dünyadaki bütün kilogramlar, Paris yakınlarında bir kasada saklanan
            platin-iridyum bir silindire bağlıydı. Uluslararası kilogram prototipi denen bu silindirin kütlesi, tanım
            gereği tam 1 kilogramdı. Kopyalarıyla yapılan karşılaştırmalar, yıllar içinde aralarında mikrogram
            düzeyinde farklar oluştuğunu gösterdi.
          </p>
          <p>
            2019&apos;dan beri kilogram bir nesneye değil, Planck sabitine bağlı. Böylece kilogram da metre ve saniye
            gibi, dünyanın herhangi bir yerinde bir doğa sabitinden yeniden üretilebilen bir birim oldu. Mutfak
            tartınızın gösterdiği değer bundan etkilenmedi; değişiklik tanımın kendisindeydi.
          </p>
        </>
      ),
    },
    {
      id: "ton-kental",
      baslik: "Ton, kental ve üç farklı ton",
      govde: (
        <>
          <p>
            Metrik ton {k(1, "ton", "kg")} kilogramdır. Tarımda verim çoğu zaman kental ile söylenir: 1 kental{" "}
            {k(1, "q", "kg")} kilogramdır ve 10 kental 1 ton eder. &quot;Dekardan 5 kental buğday&quot; dendiğinde
            kastedilen, dekar başına 500 kilogramdır.
          </p>
          <p>
            İngilizce kaynaklarda &quot;ton&quot; kelimesi dikkat ister. ABD&apos;de kullanılan kısa ton{" "}
            {y(1, "sh tn", "kg")} kg, İngiltere&apos;deki uzun ton ise {y(1, "lg tn", "kg")} kg eder. Uluslararası
            ticarette ve gemi yüklerinde çoğunlukla metrik ton kullanılır; ama ABD kaynaklı bir belgede birimin yanında
            &quot;metric&quot; yazmıyorsa kısa ton olabilir.
          </p>
        </>
      ),
    },
    {
      id: "pound-ons",
      baslik: "Pound, ons ve stone",
      govde: (
        <>
          <p>
            1 pound tam olarak {k(1, "lb", "kg")} kilogramdır; bu değer 1959&apos;da yapılan uluslararası anlaşmayla
            sabitlendi. Kabaca hesap için pound&apos;u 2,2&apos;ye bölmek yeterlidir: 150 pound yaklaşık{" "}
            {y(150, "lb", "kg")} kg eder. 1 pound 16 ons olduğu için 1 ons yaklaşık {y(1, "oz", "g", 2)} gramdır.
          </p>
          <p>
            İngiltere&apos;de vücut ağırlığı çoğu zaman stone ile söylenir. 1 stone 14 pound, yani yaklaşık{" "}
            {y(1, "st", "kg", 2)} kg&apos;dır. &quot;11 stone&quot; diyen biri yaklaşık {y(11, "st", "kg", 0)} kilodur.
            Yabancı tariflerde ve beslenme etiketlerinde ons ve pound sık geçer; mutfakta gram cinsinden çalışmak için
            bu çeviriler yeterlidir.
          </p>
        </>
      ),
    },
    {
      id: "kuyumcu",
      baslik: "Kuyumcuda: troy ons ve karat",
      govde: (
        <>
          <p>
            Haberlerde altının fiyatı &quot;ons başına dolar&quot; olarak verilir. Buradaki ons, mutfaktaki ons değil
            troy onstur: {k(1, "ozt", "g")} gram. Mutfak onsundan ({y(1, "oz", "g", 2)} g) yaklaşık yüzde 10 ağırdır. Ons
            fiyatından gram altın fiyatına gitmek için ons fiyatını {y(1, "ozt", "g", 2)}&apos;e bölüp dolar kuruyla
            çarpmak gerekir; kuyumcudaki fiyata işçilik ve kâr da eklenir. Gram, çeyrek ve ayar hesapları için{" "}
            <Link href="/altin-hesaplama">altın hesaplama</Link> aracına bakabilirsiniz.
          </p>
          <p>
            Karat ise değerli taşların ağırlığıdır: 1 karat tam {k(1, "ct", "mg")} miligram, yani 0,2 gramdır. Altındaki
            &quot;22 ayar&quot; ile karıştırılmamalıdır; ayar bir saflık oranıdır, karat bir ağırlıktır. 1 karatlık bir
            pırlanta 0,2 gram gelir.
          </p>
        </>
      ),
    },
    {
      id: "eski-olculer",
      baslik: "Okka, dirhem, miskal ve batman",
      govde: (
        <>
          <p>
            1931&apos;de kabul edilen 1782 sayılı Ölçüler Kanunu&apos;ndan önce çarşıda ağırlık okka ile ölçülürdü. Bu
            ölçüler birbirine bağlıydı:
          </p>
          <ul>
            <li>
              <strong>Dirhem:</strong> yaklaşık {y(1, "dirhem", "g", 2)} gram. Baharat ve ilaç gibi küçük miktarlar için.
            </li>
            <li>
              <strong>Miskal:</strong> 1,5 dirhem, yaklaşık {y(1, "miskal", "g", 2)} gram. Altın, gümüş ve değerli
              ilaçlar için.
            </li>
            <li>
              <strong>Okka:</strong> 400 dirhem, yaklaşık {y(1, "okka", "kg", 3)} kilogram. Günlük alışverişin temel
              ölçüsü.
            </li>
            <li>
              <strong>Batman:</strong> çeviricide 6 okka, yaklaşık {y(1, "batman", "kg", 2)} kilogram. Değeri bölgeye
              göre 2 ile 8 okka arasında değişirdi.
            </li>
          </ul>
          <p>
            Eski bir tarifte &quot;yarım okka un&quot; görüyorsanız, bu yaklaşık {formatSayi(Math.round(convert("kutle", 0.5, "okka", "g") / 10) * 10)} gramdır. Eski
            tapu, vakıf ya da tereke kayıtlarında geçen batman ve kantar gibi ölçülerin değeri yere göre değiştiği için
            kesin sonuç gerekiyorsa kaydın ait olduğu bölgenin ölçüsüne bakmak gerekir.
          </p>
        </>
      ),
    },
    {
      id: "miligram",
      baslik: "Miligram ve mikrogram: ilaç kutusundaki fark",
      govde: (
        <>
          <p>
            İlaç ve vitamin kutularında iki küçük birim sık geçer: miligram (mg) ve mikrogram (µg ya da mcg). 1 miligram{" "}
            {k(1, "mg", "µg")} mikrogramdır. İkisini karıştırmak dozu bin kat değiştirir; bu yüzden etiketteki birimi
            her zaman dikkatle okuyun.
          </p>
          <p>
            D vitamini gibi bazı vitaminlerin dozu ayrıca uluslararası ünite (IU) ile yazılır. IU bir kütle birimi
            değildir ve her madde için başka bir karşılığı vardır; bu çeviricide yer almaz. İlaç ve takviye dozları
            için doktorunuza ya da eczacınıza danışın.
          </p>
        </>
      ),
    },
  ],
  sss: [
    {
      question: "1 kilogram kaç gram?",
      answer: "1 kilogram 1.000 gramdır. 1 gram ise 1.000 miligramdır.",
    },
    {
      question: "1 pound kaç kilogram?",
      answer: `1 pound tam olarak ${k(1, "lb", "kg")} kilogramdır. 1 kilogram ise yaklaşık ${y(1, "kg", "lb", 2)} pounddur.`,
    },
    {
      question: "1 ton kaç kilogram?",
      answer: `1 metrik ton ${k(1, "ton", "kg")} kilogramdır. ABD'deki kısa ton yaklaşık ${y(1, "sh tn", "kg")} kg, İngiliz uzun tonu yaklaşık ${y(1, "lg tn", "kg")} kg'dır.`,
    },
    {
      question: "1 ons kaç gram?",
      answer: `Mutfakta kullanılan ons yaklaşık ${y(1, "oz", "g", 2)} gramdır. Altın fiyatlarında kullanılan troy ons ise ${k(1, "ozt", "g")} gramdır.`,
    },
    {
      question: "1 okka kaç kilogram?",
      answer: `1 okka 400 dirhemdir ve yaklaşık ${y(1, "okka", "kg", 3)} kilogram eder.`,
    },
    {
      question: "1 karat kaç gram?",
      answer: "1 karat tam olarak 0,2 gram, yani 200 miligramdır. Altının saflığını gösteren ayar ile aynı şey değildir.",
    },
  ],
  kaynaklar: [
    { ad: "BIPM, Uluslararası Birimler Sistemi (SI Broşürü), 9. baskı", href: "https://www.bipm.org/en/publications/si-brochure" },
    { ad: "NIST, Inch-pound ve SI birimleri arasında dönüşüm faktörleri (SP 811)", href: "https://www.nist.gov/pml/special-publication-811" },
    { ad: "Birleşik Krallık, Weights and Measures Act 1985", href: "https://www.legislation.gov.uk/ukpga/1985/72" },
    { ad: "1782 sayılı Ölçüler Kanunu (Resmî Gazete, 1931)" },
  ],
  guncelleme: "2026-11-11",
};

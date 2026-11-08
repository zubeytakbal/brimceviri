// /uzunluk sayfasinin icerigi. Sayilar cevirici ile ayni fonksiyondan (convert) uretilir.
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { KategoriIcerigi } from "./tipler";

const u = (deger: number, kimden: string, kime: string) => formatSayi(convert("uzunluk", deger, kimden, kime));

// 16:9 ekranda kosegenden en ve boy (inc).
const ORAN = Math.hypot(16, 9);
const ekran = (inc: number) => ({
  kosegen: u(inc, "in", "cm"),
  en: formatSayi(Number(((inc * 16) / ORAN * 2.54).toFixed(1))),
  boy: formatSayi(Number(((inc * 9) / ORAN * 2.54).toFixed(1))),
});
const tv55 = ekran(55);
const tv65 = ekran(65);

export const uzunlukIcerigi: KategoriIcerigi = {
  baslik: "Uzunluk Çevirici: Metre, Santimetre, İnç, Fit, Mil ve Arşın",
  aciklama:
    "Metre, santimetre, inç, fit, yarda, mil, deniz mili ve arşın arasında anında çeviri. Hesaplanmış çeviri tablosu, televizyon ve lastik ölçüleri gibi gündelik örnekler ve eski Türk uzunluk ölçüleri.",
  ozet: (
    <>
      Bir kutuya değer yazın, diğer bütün birimler aynı anda hesaplansın. Metrik birimlerin yanında inç, fit ve mil
      gibi İngiliz ölçüleri, denizcilikte kullanılan deniz mili ve Osmanlı'dan kalma arşın da burada.
    </>
  ),
  cevirici: {
    baslangic: { birim: "m", deger: 1 },
    gruplar: [
      { ad: "Metrik", birimler: ["mm", "cm", "m", "km"] },
      { ad: "İngiliz / ABD", birimler: ["in", "ft", "yd", "mi"] },
      { ad: "Denizcilik ve gökbilim", birimler: ["nmi", "AU", "ly"] },
      { ad: "Eski Türk ölçüleri", birimler: ["arşın", "mimar arşını", "endaze", "fersah (Osm.)"] },
    ],
  },
  ilgili: [
    { href: "/alan", ad: "Alan çevirici" },
    { href: "/lastik-ebati-hesaplama", ad: "Lastik ebadı hesaplama" },
    { href: "/boru-capi-donusum-hesaplama", ad: "Boru çapı dönüşümü" },
    { href: "/ayakkabi-numarasi-cevirme", ad: "Ayakkabı numarası çevirme" },
    { href: "/bisiklet-jant-olcusu", ad: "Bisiklet jant ölçüsü" },
  ],
  // Search Console, son 3 ay gosterim sirasi (2026-11).
  populer: [
    "metre-santimetre", "kilometre-metre", "santimetre-milimetre", "fit-metre", "inc-santimetre", "milimetre-metre",
    "santimetre-metre", "milimetre-santimetre", "metre-milimetre", "deniz-mili-kilometre", "metre-kilometre",
    "isik-yili-kilometre", "arsin-metre", "yarda-metre", "inc-milimetre", "mikrometre-milimetre", "arsin-santimetre",
    "milimetre-mikrometre", "desimetre-metre", "angstrom-nanometre", "arsin-endaze", "astronomik-birim-kilometre",
    "metre-fit", "santimetre-inc",
  ],
  tablo: { baslik: "Sık kullanılan birimler arasında çeviri tablosu", birimler: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"] },
  bolumler: [
    {
      id: "metre",
      baslik: "Metre: bir meridyenden ışık hızına",
      govde: (
        <>
          <p>
            Metre 1790'larda Fransa'da doğdu. Tanımı iddialıydı: Kuzey Kutbu'ndan Ekvator'a uzanan meridyenin on
            milyonda biri. Ölçümler yapıldı, bir platin çubuk döküldü ve uzun süre &quot;metre&quot; o çubuğun boyu
            oldu. 1889'da yerini platin-iridyumdan yapılmış uluslararası bir prototip aldı.
          </p>
          <p>
            Çubuk ne kadar özenle saklanırsa saklansın bir nesneydi; ısınır, aşınır, kopyaları birebir aynı olmaz.
            Bu yüzden 1983'ten beri metre bir doğa sabitine bağlı: ışığın boşlukta 1/299.792.458 saniyede aldığı
            yol. Bugün dünyanın herhangi bir laboratuvarı metreyi, bir çubuğa bakmadan yeniden üretebilir.
          </p>
          <p>
            Santimetre, milimetre ve kilometre bu tanımın onlu katlarıdır; aralarında çeviri yapmak virgülü kaydırmaktan
            ibarettir. Asıl zorluk, metrik olmayan birimlerle karşılaşınca başlar.
          </p>
        </>
      ),
    },
    {
      id: "turkiye",
      baslik: "Türkiye metreye ne zaman geçti?",
      govde: (
        <>
          <p>
            Osmanlı'da uzunluk; arşın, endaze, parmak ve fersah gibi birimlerle ölçülürdü ve bunların değeri yere ve
            işe göre değişirdi. Kumaşçının arşını ile mimarın arşını aynı değildi. 1931'de kabul edilen 1782 sayılı
            Ölçüler Kanunu metrik sistemi resmî ölçü yaptı ve eski birimler 1933'ten itibaren ticarette kullanılmaz
            oldu.
          </p>
          <p>
            Yine de bu birimler dilde yaşamaya devam ediyor: &quot;arşınlamak&quot; bir yeri adım adım dolaşmak
            demek, &quot;endazesi bozuk&quot; ise ölçüsünü kaçırmış biri için söylenir.
          </p>
        </>
      ),
    },
    {
      id: "inc",
      baslik: "İnç hayatımızın neresinde?",
      govde: (
        <>
          <p>
            Türkiye metrik bir ülke ama inç evimizin her yerinde. 1 inç tam olarak 2,54 santimetredir; bu değer 1959'da
            ABD, İngiltere ve diğer ülkeler arasında yapılan anlaşmayla sabitlendi.
          </p>
          <p>
            <strong>Televizyon ve telefon ekranı.</strong> Ekran ölçüsü bir köşeden karşı köşeye çekilen çizginin
            uzunluğudur, yani en değil köşegendir. 55 inçlik bir televizyonun köşegeni {tv55.kosegen} cm; 16:9 ekranda
            bu, yaklaşık {tv55.en} cm en ve {tv55.boy} cm boy demek. 65 inçte en {tv65.en} cm'ye çıkar. Televizyon
            ünitesi alırken bakmanız gereken ölçü köşegen değil, endir (çerçeve de birkaç santim ekler).
          </p>
          <p>
            <strong>Araba lastiği.</strong> 205/55 R16 yazan bir lastikte üç farklı ölçü bir arada: 205 milimetre
            taban genişliği, 55 yüzde olarak yanak yüksekliği ve 16 inç jant çapı ({u(16, "in", "cm")} cm). Aynı
            etikette hem milimetre hem inç olmasının sebebi, jant ölçülerinin ABD standartlarından gelmesi. Hesabın
            tamamı için <Link href="/lastik-ebati-hesaplama">lastik ebadı hesaplama</Link> aracına bakabilirsiniz.
          </p>
          <p>
            <strong>Su borusu.</strong> Tesisatçının &quot;yarım parmak&quot; ya da &quot;1/2 inç&quot; dediği boru
            12,7 milimetre değildir. Boru inçleri nominaldir, yani bir isimdir; 1/2 inçlik çelik borunun dış çapı
            yaklaşık 21,3 mm'dir. Bu yüzden boru ölçüsünü inçten santimetreye düz çevirmek yanlış sonuç verir;{" "}
            <Link href="/boru-capi-donusum-hesaplama">boru çapı dönüşüm</Link> tablosunu kullanın.
          </p>
        </>
      ),
    },
    {
      id: "fit-yarda",
      baslik: "Fit ve yarda: futbol sahasındaki küsuratlar",
      govde: (
        <>
          <p>
            1 fit 12 inç, yani 30,48 cm; 1 yarda 3 fit, yani 91,44 cm. Bu birimleri günlük hayatta pek kullanmasak
            da her hafta televizyonda görürüz.
          </p>
          <p>
            Futbol kuralları İngiltere'de yazıldı ve ölçüler yarda ile belirlendi. Kale ağzının 7,32 metre olması
            tesadüf değil: tam olarak 8 yarda. Kalenin yüksekliği 2,44 m, yani 8 fit. Ceza sahasının 16,5 metrelik
            derinliği 18 yardadan, penaltı noktasının 11 metresi de 12 yardadan ({u(12, "yd", "m")} m) gelir. Metrik
            kural kitabında küsuratlı görünen sayıların hepsi, aslında yuvarlak yarda değerleridir.
          </p>
          <p>
            Uçak irtifası da fit ile söylenir. Pilotun anonsundaki 35.000 fit, yaklaşık {u(35000, "ft", "km")} km
            eder.
          </p>
        </>
      ),
    },
    {
      id: "mil",
      baslik: "Mil mi, deniz mili mi?",
      govde: (
        <>
          <p>
            İkisi aynı şey değildir. Kara mili (İngiliz mili) {u(1, "mi", "m")} metredir ve ABD ile İngiltere'de
            yol mesafeleri ve hız sınırları bununla yazılır. Deniz mili ise tam 1.852 metredir.
          </p>
          <p>
            Deniz milinin hikâyesi farklıdır: Dünya üzerinde bir enlem dakikasına (bir derecenin altmışta biri)
            karşılık gelen yay uzunluğundan türetilmiştir. Harita üzerinde enlem çizgilerinden doğrudan
            okunabildiği için gemiciler ve pilotlar bugün de onu kullanır. Saatte bir deniz mili hıza da
            &quot;knot&quot; (deniz mili/saat) denir.
          </p>
          <p>
            Pratik fark büyüktür: 100 kara mili {u(100, "mi", "km")} km, 100 deniz mili ise {u(100, "nmi", "km")} km
            eder. Bir tekne turu ilanında &quot;mil&quot; görüyorsanız, kastedilen neredeyse her zaman deniz
            milidir.
          </p>
        </>
      ),
    },
    {
      id: "eski-olculer",
      baslik: "Arşın, endaze ve fersah",
      govde: (
        <>
          <p>
            Eski ölçülerin değeri tek değildir; şehirden şehre, dönemden döneme ve işe göre değişirdi. Çeviricide
            kullandığımız değerler, Ölçüler Kanunu'ndan önceki en yaygın karşılıklardır:
          </p>
          <ul>
            <li>
              <strong>Çarşı arşını:</strong> {u(1, "arşın", "cm")} cm. Kumaş ve halı gibi malların ölçüsü.
            </li>
            <li>
              <strong>Mimar arşını:</strong> {u(1, "mimar arşını", "cm")} cm. Bina, arsa ve inşaat ölçüleri.
            </li>
            <li>
              <strong>Endaze:</strong> {u(1, "endaze", "cm")} cm. Özellikle ince kumaş ve ipekli ölçümünde.
            </li>
            <li>
              <strong>Fersah:</strong> yaklaşık {u(1, "fersah (Osm.)", "km")} km. Kabaca bir saatlik yürüme
              mesafesi; yol ve menzil anlatmak için kullanılırdı.
            </li>
          </ul>
          <p>
            Eski bir tapu, vakıf kaydı ya da ferman okuyorsanız, hangi arşının kastedildiğini bağlamdan çıkarmak
            gerekir. Bina ve arsa söz konusuysa büyük ihtimalle mimar arşınıdır.
          </p>
        </>
      ),
    },
    {
      id: "cok-kucuk-cok-buyuk",
      baslik: "Gözle görülmeyenler ve uzaydakiler",
      govde: (
        <>
          <p>
            Metrenin önekleri her iki yönde de devam eder. Bir insan saç teli kabaca 50–100 mikrometre kalınlığındadır;
            kırmızı kan hücresi 7–8 mikrometre. Gözümüzün gördüğü ışığın dalga boyu 380 ile 750 nanometre
            arasındadır. Atomlar ise angström (0,1 nanometre) düzeyindedir.
          </p>
          <p>
            Uzayda kilometre hızla yetersiz kalır. Dünya ile Güneş arasındaki ortalama uzaklık 1 astronomik birim
            kabul edilir: tam olarak 149.597.870,7 km, kabaca 150 milyon km. Işık yılı ise ışığın bir yılda aldığı
            yoldur, yaklaşık 9,46 trilyon km. Bize en yakın yıldız Proxima Centauri 4,2 ışık yılı uzaklıkta; arabayla saatte
            100 km gitseydik yolculuk 45 milyon yıldan uzun sürerdi.
          </p>
        </>
      ),
    },
  ],
  sss: [
    {
      question: "1 inç kaç santimetre?",
      answer: "1 inç tam olarak 2,54 santimetredir. Bu değer 1959'daki uluslararası anlaşmayla sabitlenmiştir; yuvarlama değil, tanımdır.",
    },
    {
      question: "1 fit kaç metre?",
      answer: "1 fit 0,3048 metre, yani 30,48 santimetredir. 1 metre ise yaklaşık 3,28 fittir.",
    },
    {
      question: "1 metre kaç santimetre?",
      answer: "1 metre 100 santimetre ve 1.000 milimetredir. Metrik birimler arasında çeviri, virgülü kaydırmaktan ibarettir.",
    },
    {
      question: "1 mil kaç kilometre?",
      answer: `1 kara mili ${u(1, "mi", "km")} kilometredir. Denizcilikte kullanılan deniz mili ise 1,852 kilometredir.`,
    },
    {
      question: "55 inç televizyon kaç santimetre?",
      answer: `55 inç ekranın köşegeni ${tv55.kosegen} santimetredir. 16:9 bir ekranda bu yaklaşık ${tv55.en} cm en ve ${tv55.boy} cm boy demektir.`,
    },
    {
      question: "1 arşın kaç santimetre?",
      answer: `Çarşı arşını ${u(1, "arşın", "cm")} cm, mimar arşını ise ${u(1, "mimar arşını", "cm")} cm kabul edilir. Değer bölgeye ve döneme göre değişebilir.`,
    },
  ],
  kaynaklar: [
    { ad: "BIPM, Uluslararası Birimler Sistemi (SI Broşürü), 9. baskı", href: "https://www.bipm.org/en/publications/si-brochure" },
    { ad: "NIST, Inch-pound ve SI birimleri arasında dönüşüm faktörleri (SP 811)", href: "https://www.nist.gov/pml/special-publication-811" },
    { ad: "1782 sayılı Ölçüler Kanunu (Resmî Gazete, 1931)" },
    { ad: "IFAB, Futbol Oyun Kuralları — Kural 1: Oyun Alanı", href: "https://www.theifab.com/laws/latest/the-field-of-play/" },
    { ad: "IAU 2012 Kararı B2: Astronomik birimin yeniden tanımı", href: "https://www.iau.org/static/resolutions/IAU2012_English.pdf" },
  ],
  guncelleme: "2026-11-08",
};

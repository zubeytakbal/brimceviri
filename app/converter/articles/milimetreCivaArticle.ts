import type { UnitArticle } from "../unitArticles";

export const milimetreCivaArticle: UnitArticle = {
  slug: "milimetre-civa",

  introduction: [
    "Milimetre cıva (mmHg), bir cıva sütununun bir milimetrelik yüksekliğinin oluşturduğu basınca eşit, SI dışı bir birimdir. Tıpta, özellikle kan basıncı ölçümünde, hâlâ dünya genelinde standart birim olarak kullanılır.",

    "mmHg, cıvalı barometre ve manometrelerin yaygın olduğu dönemden miras kalan bir birimdir. SI dışı olmasına rağmen tıbbi cihazlarda ve bazı vakum uygulamalarında yerini korumaktadır.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "mmHg (bazen Torr ile eş anlamlı kullanılır)",
    },
    {
      label: "1 mmHg",
      value: "133,322387415 Pa (konvansiyonel, kesin değer)",
    },
    {
      label: "1 mmHg",
      value: "≈ 0,00131579 atm (1/760 atm)",
    },
    {
      label: "1 mmHg",
      value: "≈ 0,0193368 psi",
    },
    {
      label: "Birim sistemi",
      value: "SI dışı, tarihsel ve tıbbi mühendislik birimi",
    },
  ],

  sections: [
    {
      title: "mmHg nedir ve nasıl türetilir?",
      paragraphs: [
        "Milimetre cıva, kapalı bir tüp içindeki cıva sütununun bir milimetrelik yüksekliğinin, sütunun tabanında oluşturduğu basınca eşittir. Bu basınç, P = ρ·g·h hidrostatik bağıntısıyla hesaplanır; burada ρ cıvanın yoğunluğunu, g yerçekimi ivmesini ve h sütun yüksekliğini ifade eder.",

        "mmHg'nin büyüklüğü doğrudan cıvanın yüksek yoğunluğundan kaynaklanır: cıva suya göre yaklaşık 13,6 kat daha yoğun olduğu için nispeten kısa bir cıva sütunu, oldukça büyük bir su sütununa eşdeğer basınç oluşturabilir. Bu özellik, mmHg'yi kompakt barometre ve manometre tasarımları için tarihsel olarak elverişli kılmıştır.",

        "mmHg değerleri günlük tıbbi ölçümlerde küçük, kolay okunabilir sayılarla ifade edilir; örneğin tipik bir kan basıncı okuması 120/80 mmHg biçiminde iki değerle gösterilir.",
      ],
    },
    {
      title: "mmHg'nin kesin tanımı: konvansiyonel cıva yoğunluğu",
      paragraphs: [
        "mmHg'nin modern kesin değeri, cıvanın konvansiyonel yoğunluğu (13 595,1 kg/m³) ile standart yerçekimi ivmesinin (9,80665 m/s²) çarpımından türetilir: 1 mmHg = 13 595,1 kg/m³ × 9,80665 m/s² × 0,001 m = 133,322387415 Pa.",

        "Bu tanımda kullanılan cıva yoğunluğu, gerçek bir ölçüm sonucu değil, 0 santigrat derecede kabul edilen konvansiyonel bir referans değeridir. Gerçek cıva yoğunluğu sıcaklığa bağlı olarak hafifçe değişir; ancak mmHg birimi bu değişkenlikten bağımsız, sabit bir tanıma dayanır.",

        "Bu yaklaşım, tıpkı standart atmosfer ve teknik atmosfer birimlerinde olduğu gibi, tarihsel bir ölçüm aracının davranışını modern, tekrarlanabilir bir sabit tanıma dönüştürme örneğidir.",
      ],
    },
    {
      title: "mmHg ile Torr arasındaki milyonda birkaçlık fark",
      paragraphs: [
        "Torr birimi, 1950'lerde Evangelista Torricelli'nin onuruna verilmiş ve tam olarak standart atmosferin 1/760'ı olarak tanımlanmıştır: 1 Torr = 101 325 Pa / 760 = 133,322368421... Pa.",

        "Konvansiyonel mmHg (133,322387415 Pa) ile Torr (133,322368421 Pa) arasındaki fark yaklaşık 0,000019 Pa'dır; bu da aralarındaki bağıl farkın milyonda birkaç birim (yaklaşık 0,14 ppm) mertebesinde olduğu anlamına gelir. Pratik hiçbir uygulamada bu fark ölçülebilir bir sonuç doğurmaz.",

        "Bu ayrım, iki biriminin bağımsız biçimde (biri cıva yoğunluğu üzerinden, diğeri standart atmosferin kesin bölümü olarak) tanımlanmasından kaynaklanır. Günlük ve klinik kullanımda mmHg ve Torr birbirinin yerine geçebilir kabul edilir.",
      ],
    },
    {
      title: "Kan basıncı neden hâlâ mmHg ile ölçülüyor?",
      paragraphs: [
        "Kan basıncı ölçümü, cıvalı sfigmomanometrenin 19. yüzyıl sonunda klinik pratiğe girmesinden bu yana mmHg cinsinden raporlanmaktadır. Bu gelenek, dünya genelinde tıp eğitimi, klinik rehberler ve tanı eşik değerleri (örneğin 120/80 mmHg) içine derinlemesine yerleşmiştir.",

        "Dünya Sağlık Örgütü ve çeşitli metroloji kurumları zaman zaman SI uyumlu kilopascal (kPa) birimine geçişi teşvik etmiş olsa da klinik pratikte mmHg baskın kullanım biçimi olmayı sürdürmektedir; bu durum büyük ölçüde mevcut referans değerlerin ve cihaz kalibrasyonlarının mmHg üzerine kurulu olmasından kaynaklanır.",

        "Modern dijital tansiyon ölçerler artık cıva içermez; ancak sonuçlarını yine de tarihsel süreklilik ve klinik karşılaştırılabilirlik nedeniyle mmHg cinsinden gösterirler.",
      ],
    },
    {
      title: "mmHg ve diğer basınç birimleri",
      paragraphs: [
        "1 mmHg tam olarak 133,322387415 Pa'a eşittir. Standart atmosfer 760 mmHg'ye yaklaşık olarak eşit kabul edilir; ancak bu iki birim bağımsız tanımlandığı için matematiksel olarak tam eşit değildir.",

        "Bar cinsinden 1 mmHg yaklaşık 0,00133322 bar'a, psi cinsinden ise yaklaşık 0,0193368 psi'ye eşittir. Bu küçük değerler, mmHg'nin genellikle düşük basınç ve vakum ölçümlerinde tercih edilmesinin nedenlerinden biridir.",

        "Vakum teknolojisinde mmHg (veya Torr), atmosfer basıncına göre ne kadar düşük basınca ulaşıldığını sezgisel biçimde ifade etmek için hâlâ yaygın kullanılır; örneğin 'yüksek vakum' genellikle 10⁻³ Torr'un altındaki basınçları ifade eder.",
      ],
    },
  ],

  timeline: [
    {
      year: "1896",
      title: "Riva-Rocci sfigmomanometresi",
      description:
        "İtalyan hekim Scipione Riva-Rocci, cıvalı manometre ve kola sarılan bir manşet kullanan sfigmomanometreyi geliştirdi; bu cihaz kan basıncının mmHg cinsinden klinik ölçümünü standartlaştırdı.",
    },
    {
      year: "1950'ler",
      title: "Torr biriminin adlandırılması",
      description:
        "Vakum fiziği çevrelerinde, Evangelista Torricelli'nin onuruna 'Torr' adı verildi ve birim tam olarak standart atmosferin 1/760'ı olarak tanımlandı.",
    },
  ],

  questions: [
    {
      question: "1 mmHg kaç Pascal'dır?",
      answer:
        "1 mmHg tam olarak 133,322387415 Pa'a eşittir. Bu değer, cıvanın konvansiyonel yoğunluğu ve standart yerçekimi ivmesi üzerinden tanımlanır.",
    },
    {
      question: "mmHg ile Torr tam olarak aynı mı?",
      answer:
        "Hayır, ancak birbirine son derece yakındır. mmHg cıva yoğunluğu üzerinden, Torr ise standart atmosferin tam 1/760'ı olarak tanımlanır; aralarındaki fark milyonda birkaç birim mertebesindedir ve pratikte ihmal edilebilir.",
    },
    {
      question: "Kan basıncı neden hâlâ mmHg ile ölçülüyor?",
      answer:
        "Kan basıncı ölçümü tarihsel olarak cıvalı sfigmomanometreyle mmHg cinsinden standartlaştı. Klinik rehberler, tanı eşik değerleri ve cihaz kalibrasyonları bu birime dayandığı için mmHg kullanımı günümüzde de sürmektedir.",
    },
    {
      question: "1 mmHg kaç bar eder?",
      answer:
        "1 mmHg yaklaşık 0,00133322 bar'a eşittir. mmHg'yi bara çevirmek için değer yaklaşık 0,00133322 ile çarpılır.",
    },
  ],
};

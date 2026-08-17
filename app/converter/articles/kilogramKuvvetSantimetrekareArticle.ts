import type { UnitArticle } from "../unitArticles";

export const kilogramKuvvetSantimetrekareArticle: UnitArticle = {
  slug: "kilogram-kuvvet-santimetrekare",

  introduction: [
    "Kilogram-kuvvet/santimetrekare (kgf/cm²), bir kilogram-kuvvetin bir santimetrekarelik alana uyguladığı basınca eşit, SI dışı bir birimdir. Aynı büyüklük, özellikle Avrupa mühendislik geleneğinde 'teknik atmosfer' (sembolü at) adıyla da anılır.",

    "kgf/cm² ve teknik atmosfer aynı birimin iki farklı adıdır ve tam olarak 98 066,5 pascala eşittir. Standart atmosferle (101 325 Pa) karıştırılmaması gereken, kütle temelli ayrı bir referans değerdir.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "kgf/cm² (teknik atmosfer için: at)",
    },
    {
      label: "1 kgf/cm²",
      value: "98 066,5 Pa (tanımlı, kesin değer)",
    },
    {
      label: "1 kgf/cm²",
      value: "0,980665 bar (kesin)",
    },
    {
      label: "Birim sistemi",
      value: "SI dışı, eski metrik mühendislik (yerçekimsel) birim",
    },
    {
      label: "Standart atmosferle ilişkisi",
      value: "1 at ≈ 0,967841 atm (aynı birim değildir)",
    },
  ],

  sections: [
    {
      title: "kgf/cm² (teknik atmosfer) nedir?",
      paragraphs: [
        "kgf/cm², bir kilogram-kuvvetin bir santimetrekarelik alana dik biçimde uyguladığı basınca eşit bir birimdir. Kilogram-kuvvet ise bir kilogramlık kütleye standart yerçekimi ivmesinin uyguladığı ağırlık kuvvetidir.",

        "Bu birim, 'yerçekimsel metrik sistem' (gravitational metric system) olarak bilinen ve kuvveti doğrudan kütle üzerinden tanımlayan eski bir mühendislik yaklaşımının ürünüdür. Aynı büyüklüğe, özellikle Avrupa'da, 'teknik atmosfer' adı da verilir ve at sembolüyle gösterilir.",

        "Teknik atmosfer adı, standart atmosfere (101 325 Pa) yakın ama ondan farklı, daha 'pratik' ve yuvarlak bir mühendislik referansı sunma amacından gelir; bununla birlikte iki birim birbirinin yerine kullanılamaz.",
      ],
    },
    {
      title: "Kilogram-kuvvet neden ayrı bir kuvvet birimine dönüştü?",
      paragraphs: [
        "SI sisteminde kuvvetin birimi newton'dur ve kütleden bağımsız, doğrudan F = m·a bağıntısıyla tanımlanır. Ancak 19. ve 20. yüzyılın başında mühendislik pratiğinde kuvveti günlük hayatta daha tanıdık olan kilogram cinsinden ifade etme eğilimi yaygındı.",

        "Bu yaklaşımda bir kilogram-kuvvet, bir kilogramlık kütlenin standart yerçekimi altındaki ağırlığı olarak tanımlandı. Standart yerçekimi ivmesi (g₀ = 9,80665 m/s²) sabit kabul edildiği için kilogram-kuvvet de kesin bir değere sahip oldu: 1 kgf = 9,80665 N.",

        "Bu tanım, kütle ve kuvvetin günlük dilde birbirine karıştırılmasına da zemin hazırladı; SI sisteminin newton'u temel kuvvet birimi olarak benimsemesinin nedenlerinden biri de bu kavramsal karışıklığı ortadan kaldırmaktı.",
      ],
    },
    {
      title: "Teknik atmosfer ile standart atmosfer karıştırılmamalı",
      paragraphs: [
        "Teknik atmosfer (at, 98 066,5 Pa) ile standart atmosfer (atm, 101 325 Pa) benzer isimlere sahip olsa da yaklaşık yüzde 3,3 farklı iki ayrı referans değeridir. Standart atmosfer barometrik ölçümlerden, teknik atmosfer ise kilogram-kuvvet tanımından türer.",

        "Bu iki birimin karıştırılması, özellikle eski Avrupa kaynaklı teknik dokümanlarda ve kalibrasyon sertifikalarında hesaplama hatalarına yol açabilir. Bir değerin 'at' mi yoksa 'atm' mi olduğu açıkça belirtilmediğinde dönüşüm belirsizliği ortaya çıkar.",

        "Pratikte 'atmosfer' kelimesi günlük kullanımda çoğunlukla standart atmosferi (atm) ifade eder; teknik atmosfer (at) ise özellikle kgf/cm² ile birlikte anılan, daha dar bir mühendislik geleneğine özgü bir terimdir.",
      ],
    },
    {
      title: "kgf/cm² nerelerde kullanılır?",
      paragraphs: [
        "kgf/cm², SI birimlerinin tam olarak yerleşmediği dönemlerden kalma pompa, kompresör ve kazan göstergelerinde hâlâ karşılaşılabilen bir birimdir. Özellikle eski Avrupa ve Japon menşeli endüstriyel ekipmanların etiket ve kullanım kılavuzlarında görülür.",

        "Otomotiv servis kitapçıklarında ve bazı hidrolik sistem dokümanlarında da tarihsel olarak kgf/cm² cinsinden basınç değerlerine rastlanabilir; günümüzde bu değerler genellikle bar veya kilopascal cinsinden değerlerle birlikte veya onların yerine gösterilir.",

        "Yeni tasarlanan sistemlerde kgf/cm² artık tercih edilmez; SI uyumlu bar, kilopascal veya megapascal birimleri güncel mühendislik dokümanlarında standart hâline gelmiştir.",
      ],
    },
    {
      title: "kgf/cm² ve bar arasındaki yakın ilişki",
      paragraphs: [
        "1 kgf/cm² tam olarak 0,980665 bar'a eşittir; bu da iki birimin sayısal olarak birbirine çok yakın olduğu, ancak tam olarak eşit olmadığı anlamına gelir. Bu yakınlık, bazı eski kaynaklarda iki biriminin dikkatsizce birbirinin yerine kullanılmasına yol açmıştır.",

        "Sayısal yakınlık (yaklaşık yüzde 2'den az fark) küçük ölçekli, kritik olmayan uygulamalarda genellikle sorun yaratmaz. Ancak hassas mühendislik hesaplamalarında, kalibrasyon işlemlerinde veya güvenlik marjı dar sistemlerde bu küçük fark ihmal edilmemelidir.",

        "Dönüşüm yapılırken kgf/cm² değerinin bar'a çevrilmesi için 0,980665 ile çarpma, pascal'a çevrilmesi için ise 98 066,5 ile çarpma işlemi uygulanır.",
      ],
    },
  ],

  timeline: [
    {
      year: "1901",
      title: "Standart yerçekiminin tanımlanması",
      description:
        "3. CGPM, standart yerçekimi ivmesini g₀ = 9,80665 m/s² olarak tanımladı; bu değer kilogram-kuvvetin ve dolayısıyla teknik atmosferin kesin tanımının temelini oluşturdu.",
    },
  ],

  questions: [
    {
      question: "1 kgf/cm² kaç bar eder?",
      answer:
        "1 kgf/cm² tam olarak 0,980665 bar'a eşittir. kgf/cm²'yi bara çevirmek için değer 0,980665 ile çarpılır.",
    },
    {
      question: "1 kgf/cm² kaç Pascal'dır?",
      answer:
        "1 kgf/cm² (teknik atmosfer) tam olarak 98 066,5 Pa'a eşittir. Bu değer, standart yerçekimi ivmesinin kesin tanımından türetilir.",
    },
    {
      question:
        "Teknik atmosfer (at) ile standart atmosfer (atm) arasındaki fark nedir?",
      answer:
        "Teknik atmosfer 98 066,5 Pa'a, standart atmosfer ise 101 325 Pa'a eşittir. Benzer isimlere sahip olsalar da yaklaşık yüzde 3,3 farklı, birbirinden bağımsız tanımlanmış iki ayrı referans değeridir.",
    },
    {
      question: "kgf/cm² günümüzde hâlâ kullanılıyor mu?",
      answer:
        "kgf/cm², yeni tasarlanan sistemlerde artık tercih edilmez; ancak eski pompa, kompresör ve kazan göstergelerinde, bazı servis kitapçıklarında ve kalibrasyon sertifikalarında hâlâ karşılaşılabilir.",
    },
  ],
};

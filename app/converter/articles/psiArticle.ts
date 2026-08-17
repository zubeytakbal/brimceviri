import type { UnitArticle } from "../unitArticles";

export const psiArticle: UnitArticle = {
  slug: "psi",

  introduction: [
    "PSI (pound-force per square inch / inçkareye düşen pound-kuvvet), basıncı ifade etmek için kullanılan ve psi sembolüyle gösterilen bir birimdir. Bir pound-kuvvetin bir inçkarelik alana düzgün biçimde dağılmasıyla oluşan basınca eşittir: 1 psi = 1 lbf/in².",

    "PSI, İngiliz ve Amerikan mühendislik geleneğinden gelen, SI dışı bir birimdir; ancak otomotiv, hidrolik ve endüstriyel proses ekipmanlarında dünya genelinde yaygın biçimde kullanılmaya devam eder.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "psi",
    },
    {
      label: "1 psi",
      value: "6894,757293168 Pa (tanımlı, kesin değer)",
    },
    {
      label: "1 bar",
      value: "≈ 14,5038 psi",
    },
    {
      label: "Birim sistemi",
      value: "SI dışı, İngiliz/Amerikan mühendislik birimi",
    },
    {
      label: "Basınç türü ayrımı",
      value: "Gösterge (psig) ve mutlak (psia) olarak ikiye ayrılır",
    },
  ],

  sections: [
    {
      title: "PSI'nin tanımı ve türetilişi",
      paragraphs: [
        "PSI, bir yüzeye dik doğrultuda etkiyen kuvvetin pound-kuvvet (lbf) biriminde, bu kuvvetin yayıldığı alanın ise inçkare (in²) biriminde ölçüldüğü bir basınç birimidir. Adı, 'pound-force per square inch' ifadesinin kısaltmasından gelir.",

        "Pound-kuvvet ve inç, İngiliz imparatorluk ölçü sisteminin temel kuvvet ve uzunluk birimleri olduğu için PSI de bu sistemin doğal bir basınç birimi olarak ortaya çıkar. 1959 Uluslararası Yarda ve Pound Anlaşması ile pound ve inç SI birimleri cinsinden kesin biçimde tanımlandığından, 1 psi de tam olarak 6894,757293168 Pa'a eşitlenmiştir.",

        "PSI değerleri günlük hayatta genellikle küçük sayılarla ifade edilir; örneğin bir otomobil lastiği tipik olarak 30-35 psi ile şişirilir. Endüstriyel hidrolik sistemlerde ise değerler binlerce psi mertebesine çıkabilir.",
      ],
    },
    {
      title: "Otomotiv kullanımı: lastik basıncı",
      paragraphs: [
        "Otomobil, motosiklet ve bisiklet lastiklerinin basıncı dünya genelinde yaygın biçimde PSI cinsinden belirtilir; bu durum SI birimlerinin resmî olduğu ülkelerde bile geçerlidir. Bir binek otomobil lastiği tipik olarak 30-35 psi ile şişirilirken bisiklet lastikleri 40 ile 100 psi'nin üzerine çıkabilir.",

        "Lastik üreticileri, araç kapı çerçevesindeki etiketlerde ve kullanım kılavuzlarında önerilen basınç değerlerini genellikle hem PSI hem de bar veya kilopascal cinsinden birlikte gösterir. Bu ikili gösterim, PSI'nin küresel otomotiv sektöründeki köklü kullanımından kaynaklanır.",

        "Araç lastik basıncı göstergelerinin çoğu, çevredeki atmosfer basıncına göre sıfırlanmış gösterge basıncını (psig) ölçer; yani ekranda görünen değer, lastik içindeki mutlak basınçtan atmosfer basıncı çıkarılarak elde edilen farktır.",
      ],
    },
    {
      title: "PSI, bar ve pascal sayısal karşılaştırması",
      paragraphs: [
        "1 psi tam olarak 6894,757293168 Pa'a eşittir. Bu değer, pound-kuvvet ve inçin SI birimleri cinsinden kesin tanımlarından türetildiği için ölçüme dayalı değil, tam bir orandır.",

        "Bar cinsinden ifade edildiğinde 1 psi yaklaşık 0,0689476 bar'a karşılık gelir; tersinden bakıldığında 1 bar yaklaşık 14,5038 psi'ye eşittir. Bu nedenle bar ve psi arasında dönüşüm yaparken sayısal değer önemli ölçüde değişir.",

        "Pascal, bar ve psi aynı fiziksel büyüklüğü (basınç) ifade etse de kullanım alanları bölgesel ve sektörel geleneklere göre farklılaşır: pascal ve bar Avrupa merkezli mühendislik ve meteorolojide, psi ise Anglo-Amerikan otomotiv ve endüstriyel uygulamalarda daha yaygındır.",
      ],
    },
    {
      title: "Gösterge basıncı (psig) ve mutlak basınç (psia) farkı",
      paragraphs: [
        "PSIG (pound-force per square inch gauge), çevredeki atmosfer basıncına göre sıfırlanmış gösterge basıncını ifade eder. Bir basınç göstergesi, ölçüm yapılan ortamdaki atmosfer basıncını referans (sıfır) kabul eder.",

        "PSIA (pound-force per square inch absolute) ise mutlak boşluğu (sıfır basınç) referans alan mutlak basıncı ifade eder. Deniz seviyesinde standart atmosfer basıncı yaklaşık 14,696 psi olduğu için psia değeri, psig değerine bu sabit eklenerek hesaplanır: psia = psig + 14,696.",

        "Bu ayrım özellikle vakum sistemleri, uçuş yüksekliği hesapları ve termodinamik denklemlerde önemlidir; çünkü ideal gaz yasası gibi pek çok bağıntı gösterge basıncı değil mutlak basınç gerektirir.",
      ],
    },
    {
      title: "Mühendislik bağlamında PSI kullanımı",
      paragraphs: [
        "Proses endüstrisinde reaktör, boru hattı ve basınçlı kap tasarım basınçları, özellikle ABD kaynaklı standartlarda (ASME gibi) sıklıkla PSI cinsinden belirtilir. Çalışma basıncı sınıfları, malzeme dayanımı hesaplarıyla doğrudan aynı birim ailesinde karşılaştırılabilir.",

        "Malzeme mühendisliğinde çekme dayanımı, akma dayanımı ve elastisite modülü gibi büyüklükler genellikle ksi (kilopsi, 1000 psi) cinsinden ifade edilir. Örneğin yumuşak çeliğin akma dayanımı yaklaşık 36 ksi mertebesindedir.",

        "Havacılık ve otomotiv mühendisliğinde de hidrolik sistem basınçları ve bazı yapısal test değerleri PSI cinsinden raporlanır; bu durum, ABD merkezli teknik standartların küresel tedarik zincirlerindeki etkisinden kaynaklanır.",
      ],
    },
  ],

  timeline: [
    {
      year: "1959",
      title: "Uluslararası Yarda ve Pound Anlaşması",
      description:
        "Pound ve inç, SI birimleri cinsinden tam olarak tanımlandı (1 pound = 0,45359237 kg, 1 inç = 25,4 mm); bu tanım, PSI'nin pascal cinsinden kesin değerinin (6894,757293168 Pa) temelini oluşturdu.",
    },
  ],

  questions: [
    {
      question: "1 bar kaç PSI eder?",
      answer:
        "1 bar yaklaşık 14,5038 psi'ye eşittir. Barı psi'ye çevirmek için değer yaklaşık 14,5038 ile çarpılır.",
    },
    {
      question: "PSIG ve PSIA arasındaki fark nedir?",
      answer:
        "PSIG, atmosfer basıncına göre sıfırlanmış gösterge basıncını; PSIA ise mutlak boşluğa göre ölçülen mutlak basıncı ifade eder. Deniz seviyesinde psia değeri, psig değerine yaklaşık 14,696 eklenerek bulunur.",
    },
    {
      question: "Lastik basıncı neden PSI ile ölçülür?",
      answer:
        "Lastik basıncı ölçümü tarihsel olarak Anglo-Amerikan otomotiv sektöründe PSI birimiyle standartlaştı. Bu gelenek küresel otomotiv sektöründe sürdüğü için pek çok ülkede lastik etiketlerinde PSI değeri hâlâ gösterilir.",
    },
    {
      question: "1 PSI kaç Pascal'dır?",
      answer:
        "1 psi tam olarak 6894,757293168 Pa'a eşittir. Bu değer, pound-kuvvet ve inçin SI cinsinden kesin tanımlarından türetilen sabit bir orandır.",
    },
  ],
};

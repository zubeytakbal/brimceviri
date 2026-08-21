import type { UnitArticle } from "../unitArticles";

export const gigabaytArticle: UnitArticle = {
  slug: "gigabayt",

  introduction: [
    "Gigabayt (GB), dijital verinin yaygın kullanılan birimlerinden biridir ve akıllı telefon depolama alanından harici disk kapasitesine kadar günlük hayatta sürekli karşımıza çıkar. SI (Uluslararası Birim Sistemi) tanımına göre 1 gigabayt tam olarak 1.000.000.000 (1 milyar) bayta eşittir.",

    "Gigabayt, aynı zamanda teknoloji dünyasındaki en kafa karıştırıcı birimlerden biridir: bir cihazın 'kaç GB' olduğu, hangi hesaplama yönteminin kullanıldığına göre farklı sayılar verebilir. Bu sayfa hem doğru dönüşümü hem de bu karışıklığın nereden geldiğini açıklıyor.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "GB",
    },
    {
      label: "1 gigabayt (SI/ondalık)",
      value: "1.000.000.000 bayt",
    },
    {
      label: "1 gigabayt (ikili/bilgisayar standardı)",
      value: "1.073.741.824 bayt",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, kat birim)",
    },
    {
      label: "1 GB",
      value: "1000 MB (ondalık)",
    },
  ],

  sections: [
    {
      title: "Gigabayt nedir?",
      paragraphs: [
        "Gigabayt, bilgisayar belleği, depolama aygıtları ve dosya boyutlarını ifade etmek için kullanılan bir veri birimidir. 'Giga' ön eki, SI sisteminde 10⁹ (1 milyar) çarpanını temsil eder; bu nedenle 1 gigabayt, SI tanımına göre tam olarak 1.000.000.000 bayttır.",

        "Günümüzde akıllı telefonlar, bilgisayarlar, harici diskler ve bulut depolama hizmetleri kapasitelerini gigabayt cinsinden ilan eder. Bir fotoğraf yaklaşık 2-5 MB, bir HD film ise yaklaşık 1-4 GB civarında yer kaplayabilir.",

        "Gigabaytın büyük katı olan terabayt (1000 GB) ise günümüzde harici disklerde ve sunucu depolama alanlarında sıkça kullanılan bir başka standart birimdir.",
      ],
    },
    {
      title: "Neden 1 GB bazen 1000 MB, bazen 1024 MB?",
      paragraphs: [
        "Bu, teknoloji dünyasındaki en yaygın karışıklıklardan biridir ve iki farklı sayı sisteminden kaynaklanır. SI (metrik) sisteminde 'kilo', 'mega' ve 'giga' ön ekleri her zaman 10'un katları (1000, 1.000.000, 1.000.000.000) anlamına gelir — tıpkı kilogram veya kilometre gibi.",

        "Ancak bilgisayarlar ikili (binary) sistemde çalışır ve bellek adresleme doğal olarak 2'nin katlarıyla ilerler. Bu yüzden erken bilgisayar mühendisleri 'kilo'yu pratik bir yaklaşımla 1024 (2¹⁰) olarak kullanmaya başladı — 1000'e yakın, hesaplamalarla uyumlu bir sayı olduğu için.",

        "1998 yılında Uluslararası Elektroteknik Komisyonu (IEC), bu belirsizliği gidermek için ayrı bir 'ikili ön ek' sistemi tanımladı: kibi (Ki, 1024), mebi (Mi, 1.048.576), gibi (Gi, 1.073.741.824). Bu sisteme göre 1024 baytlık birime aslında 'kibibayt (KiB)' denmesi gerekir, 'kilobayt (KB)' değil.",
      ],
    },
    {
      title: "Windows neden 1 TB'lık diski 931 GB gösteriyor?",
      paragraphs: [
        "Bu sorunun cevabı tam olarak yukarıdaki karışıklıktan kaynaklanır. Disk üreticileri (Seagate, Western Digital, Samsung gibi) kapasiteyi SI standardına uygun olarak ondalık (1000 tabanlı) hesaplar — 1 TB, tam olarak 1.000.000.000.000 bayttır.",

        "Ancak Windows ve çoğu işletim sistemi, depolama alanını ikili (1024 tabanlı) sistemle hesaplayıp yine de 'GB' veya 'TB' etiketiyle gösterir. Bu nedenle 1.000.000.000.000 baytlık bir disk, Windows'ta yaklaşık 931 GiB (ama ekranda 'GB' yazan) olarak görünür — aradaki fark disk kaybı değil, sadece farklı bir sayma yöntemidir.",

        "Google'ın kendi hesap makinesi ve Microsoft Windows Hesap Makinesi uygulaması gibi araçlar, güncel SI standardını (1000 tabanlı) kullanır; bu sayfadaki dönüşümler de bu standarda göre hesaplanmıştır.",
      ],
    },
    {
      title: "Gigabayt ve diğer veri birimleri",
      paragraphs: [
        "1 gigabayt (SI) 1000 megabayta, 1.000.000 kilobayta ve 1.000.000.000 bayta eşittir. Daha büyük veri kümeleri için terabayt (1000 GB), petabayt (1000 TB) gibi üst birimler kullanılır.",

        "Ağ hızları (internet bağlantısı) ise genellikle bayt yerine bit üzerinden ölçülür — megabit/saniye (Mbps) gibi. 1 bayt 8 bit olduğundan, 100 Mbps'lik bir internet bağlantısı teorik olarak saniyede yaklaşık 12,5 MB indirme hızına karşılık gelir.",

        "Dosya boyutu ile depolama kapasitesi arasındaki dönüşümlerde her zaman aynı standardı (ondalık veya ikili) kullanmak, yanlış hesaplama yapmamak için önemlidir.",
      ],
    },
  ],

  timeline: [
    {
      year: "1960'lar",
      title: "Bayt kavramının doğuşu",
      description:
        "IBM mühendisleri, bir karakteri temsil etmek için gereken bit grubunu ifade etmek üzere 'bayt' terimini kullanmaya başladı; zamanla 8 bit olarak standartlaştı.",
    },
    {
      year: "1970-1980'ler",
      title: "'Kilo'nun ikili kullanımı yaygınlaşıyor",
      description:
        "Bilgisayar belleğinin ikili adresleme yapısı nedeniyle mühendisler 'kilobayt'ı pratikte 1024 bayt olarak kullanmaya başladı.",
    },
    {
      year: "1998",
      title: "IEC ikili ön ekleri tanımlıyor",
      description:
        "Uluslararası Elektroteknik Komisyonu, kibi/mebi/gibi gibi ikili ön ekleri resmî standart olarak kabul ederek SI ile ikili sistem arasındaki belirsizliği gidermeyi amaçladı.",
    },
    {
      year: "2000'ler sonrası",
      title: "Disk üreticileri SI standardını benimsiyor",
      description:
        "Hard disk ve SSD üreticileri, kapasite beyanlarında SI (ondalık) standardını benimsedi; bu da işletim sistemi gösterimleriyle (ikili) arasındaki görünür farkın kaynağı oldu.",
    },
  ],

  questions: [
    {
      question: "1 GB kaç MB'dir?",
      answer:
        "SI (ondalık) standardına göre 1 GB tam olarak 1000 MB'dir. Bilgisayarların kullandığı ikili sistemde ise 1 GB yaklaşık 1024 MB'ye karşılık gelir. Bu sayfa SI standardını (1000 tabanlı) kullanır.",
    },
    {
      question: "1 MB kaç GB'dir?",
      answer:
        "1 megabayt, 0,001 gigabayta (1000'de bir) eşittir. Megabaytı gigabayta çevirmek için değer 1000'e bölünür.",
    },
    {
      question: "Neden diskim etikette yazandan daha az gösteriyor?",
      answer:
        "Disk üreticileri kapasiteyi 1000 tabanlı (SI) hesaplarken, işletim sistemi (Windows, macOS) depolamayı 1024 tabanlı (ikili) hesaplayıp yine de 'GB' etiketiyle gösterir. Bu bir veri kaybı değil, sadece iki farklı sayma yöntemi arasındaki farktır.",
    },
    {
      question: "1 GB kaç bayttır?",
      answer:
        "SI standardına göre 1 gigabayt tam olarak 1.000.000.000 (1 milyar) bayttır.",
    },
  ],
};

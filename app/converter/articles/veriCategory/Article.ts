import type { CategoryArticle } from "../../categoryArticles";

export const veriCategoryArticle: CategoryArticle = {
  slug: "veri",

  introduction: [
    "Veri (bilgi) depolama birimi, bir bilgisayar sisteminde saklanan veya işlenen bilginin miktarını ifade eder. En temel birim bittir; sekiz bit bir araya gelerek bir baytı oluşturur.",

    "Depolama ve internet hızı konuşulurken kilobayt, megabayt, gigabayt ve terabayt gibi ondalık (1000 tabanlı) birimlerin yanı sıra, işletim sistemlerinin kullandığı kibibayt, mebibayt ve gibibayt gibi ikilik (1024 tabanlı) birimler de karşımıza çıkar -- bu iki sistem arasındaki fark, satın alınan bir diskin neden 'eksik' göründüğünün başlıca nedenidir.",
  ],

  facts: [
    {
      label: "En küçük birim",
      value: "Bit (0 veya 1)",
    },
    {
      label: "Temel birim",
      value: "Bayt (Byte) = 8 bit",
    },
    {
      label: "Ondalık (SI) sistem",
      value: "1 KB = 1000 bayt, 1 MB = 1000 KB",
    },
    {
      label: "İkilik (IEC) sistem",
      value: "1 KiB = 1024 bayt, 1 MiB = 1024 KiB",
    },
    {
      label: "1000 ile 1024 farkı",
      value: "1 GB (ondalık) ile 1 GiB (ikilik) arasında ≈%7,4 fark",
    },
  ],

  sections: [
    {
      title: "Bit ve bayt nedir?",
      paragraphs: [
        "Bit (binary digit), bir bilgisayarın işleyebildiği en küçük bilgi birimidir ve yalnızca iki değer alabilir: 0 veya 1. Sekiz bit bir araya gelerek bir bayt oluşturur; bir bayt, 256 (2⁸) farklı değeri temsil edebilir -- örneğin bir metin karakterini kodlamak için yeterlidir.",
        "Bit, genellikle küçük harf 'b' ile, bayt ise büyük harf 'B' ile kısaltılır; bu ayrım özellikle internet hızlarında (Mbps = megabit/saniye) ile dosya boyutlarında (MB = megabayt) karışıklığa yol açabilir -- 100 Mbps'lik bir internet bağlantısı, teorik olarak saniyede yaklaşık 12,5 MB indirme hızına karşılık gelir (100 ÷ 8).",
      ],
    },
    {
      title: "Neden iki farklı birim sistemi var?",
      paragraphs: [
        "Bilgisayarlar ikilik (binary) sistemde çalıştığı için bellek adresleme doğal olarak 2'nin kuvvetleriyle (1024, 1048576 gibi) ilişkilidir. Bu yüzden yazılım dünyası tarihsel olarak 'kilobayt' derken 1024 baytı kastetmiştir.",
        "Disk üreticileri ise pazarlama ve hesaplama kolaylığı açısından ondalık (1000 tabanlı) SI önekini tercih eder -- bir üreticinin '1 TB' dediği disk, aslında tam olarak 1.000.000.000.000 bayttır, ancak işletim sistemi bu diski 1024 tabanlı hesapladığı için ekranda '931 GB' gibi daha küçük bir sayı gösterir.",
      ],
    },
    {
      title: "IEC standardı: KiB, MiB, GiB",
      paragraphs: [
        "Bu karışıklığı gidermek için 1998'de Uluslararası Elektroteknik Komisyonu (IEC), ikilik tabanlı birimler için ayrı isimler (kibibayt, mebibayt, gibibayt, tebibayt) ve semboller (KiB, MiB, GiB, TiB) standartlaştırmıştır.",
        "Bu standarda göre KB/MB/GB gibi geleneksel önekler yalnızca 1000 tabanlı (ondalık) anlamda kullanılmalı, 1024 tabanlı değerler için KiB/MiB/GiB gibi 'ikilik' önekler tercih edilmelidir. Ancak günlük kullanımda ve birçok yazılımda bu ayrım hâlâ tutarlı şekilde uygulanmamaktadır.",
      ],
    },
    {
      title: "1000 ile 1024 arasındaki fark neden büyür?",
      paragraphs: [
        "Kilobayt seviyesinde (1000 vs 1024) fark yalnızca %2,4 iken, bu fark her bir üst birimde büyür: megabayt seviyesinde ≈%4,9, gigabayt seviyesinde ≈%7,4, terabayt seviyesinde ise ≈%10'a ulaşır.",
        "Bu yüzden büyük depolama kapasitelerinde (1 TB'lık bir disk gibi) ondalık ve ikilik hesaplama arasındaki fark, kullanıcının gözle görülür şekilde 'eksik alan' algılamasına yol açacak kadar büyür (yaklaşık 90 GB fark).",
      ],
    },
    {
      title: "Bit tabanlı depolama birimleri: kilobit, megabit, gigabit",
      paragraphs: [
        "İnternet servis sağlayıcıları bağlantı hızını genellikle bit tabanlı birimlerle (kilobit/saniye, megabit/saniye, gigabit/saniye) ifade eder; bu, ağ mühendisliğinde tarihsel bir gelenektir.",
        "Kullanıcılar dosya indirme hızını genellikle bayt cinsinden (MB/saniye) beklediği için, bir '100 Mbps' bağlantının gerçek indirme hızının yaklaşık 12,5 MB/saniye olduğunu bilmemek, bağlantının 'yavaş' olduğu yanılgısına yol açabilir.",
      ],
    },
    {
      title: "Günlük hayatta veri boyutları",
      paragraphs: [
        "Bir metin belgesi (bir sayfa) tipik olarak birkaç kilobayt, sıkıştırılmış bir fotoğraf (JPEG) birkaç megabayt, sıkıştırılmış bir müzik dosyası (MP3) ortalama 3-5 megabayt boyutundadır.",
        "Standart tanımlı (HD) bir film yaklaşık 1-4 gigabayt, 4K çözünürlükte bir film ise 15-25 gigabayt civarında yer kaplayabilir; bu farklar, çözünürlük ve sıkıştırma yöntemine bağlı olarak değişir.",
      ],
    },
    {
      title: "Veri depolama biriminin tarihçesi",
      paragraphs: [
        "1956'da IBM'in tanıttığı ilk sabit disk sürücüsü (RAMAC 305), yaklaşık 3,75 megabayt kapasiteye sahipti ve bir odayı kaplayacak büyüklükteydi. Günümüzde ise bir mikroSD kart bunun milyonlarca katı kapasiteyi avuç içi büyüklüğünde barındırabilir.",
        "Bu muazzam kapasite artışı, depolama teknolojisindeki gelişmenin (manyetik disklerden flash belleğe geçiş gibi) yanı sıra, birim başına maliyetin sürekli düşmesiyle de yakından ilişkilidir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Bit",
      symbol: "bit",
      referenceValue: "0,125 bayt",
      system: "İkilik",
      commonUse: "Ağ hızı (bps, Mbps)",
    },
    {
      name: "Bayt",
      symbol: "B",
      referenceValue: "1 bayt (8 bit)",
      system: "Temel birim",
      commonUse: "Dosya boyutu temel birimi",
    },
    {
      name: "Kilobayt",
      symbol: "KB",
      referenceValue: "1000 bayt",
      system: "Ondalık (SI)",
      commonUse: "Metin belgeleri",
    },
    {
      name: "Kibibayt",
      symbol: "KiB",
      referenceValue: "1024 bayt",
      system: "İkilik (IEC)",
      commonUse: "İşletim sistemi bellek gösterimi",
    },
    {
      name: "Megabayt",
      symbol: "MB",
      referenceValue: "1.000.000 bayt",
      system: "Ondalık (SI)",
      commonUse: "Fotoğraf ve müzik dosyaları",
    },
    {
      name: "Mebibayt",
      symbol: "MiB",
      referenceValue: "1.048.576 bayt",
      system: "İkilik (IEC)",
      commonUse: "RAM (bellek) kapasitesi",
    },
    {
      name: "Gigabayt",
      symbol: "GB",
      referenceValue: "1.000.000.000 bayt",
      system: "Ondalık (SI)",
      commonUse: "Disk kapasitesi (üretici etiketi)",
    },
    {
      name: "Gibibayt",
      symbol: "GiB",
      referenceValue: "1.073.741.824 bayt",
      system: "İkilik (IEC)",
      commonUse: "İşletim sistemi disk gösterimi",
    },
    {
      name: "Terabayt",
      symbol: "TB",
      referenceValue: "1.000.000.000.000 bayt",
      system: "Ondalık (SI)",
      commonUse: "Büyük hacimli depolama",
    },
    {
      name: "Petabayt",
      symbol: "PB",
      referenceValue: "1.000.000.000.000.000 bayt",
      system: "Ondalık (SI)",
      commonUse: "Veri merkezi ve bulut depolama",
    },
  ],
};

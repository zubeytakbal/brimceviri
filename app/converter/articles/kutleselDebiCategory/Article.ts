import type { CategoryArticle } from "../../categoryArticles";

export const kutleselDebiCategoryArticle: CategoryArticle = {
  slug: "kutlesel-debi",

  introduction: [
    "Kütlesel debi, birim zamanda bir kesitten geçen akışkanın kütlesini ifade eden mühendislik büyüklüğüdür. Kimya mühendisliği, yanma sistemleri ve endüstriyel proseslerde, özellikle akışkanın yoğunluğunun değişebildiği durumlarda hacimsel debiden daha güvenilir bir ölçüttür.",

    "Uluslararası Birimler Sistemi'nde kütlesel debinin türetilmiş birimi kilogram/saniyedir (kg/s); endüstriyel uygulamalarda ise kilogram/saat (kg/h) ve laboratuvar ölçeğinde gram/saniye (g/s) gibi birimler tercih edilir.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Kütlesel debi",
    },
    {
      label: "Boyut sembolü",
      value: "[MT⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Kilogram/Saniye",
    },
    {
      label: "SI birim sembolü",
      value: "kg/s",
    },
    {
      label: "Temel formül",
      value: "ṁ = ρ × Q (Yoğunluk × Hacimsel Debi)",
    },
  ],

  sections: [
    {
      title: "Kütlesel debi nedir?",
      paragraphs: [
        "Kütlesel debi, bir kesitten birim zamanda geçen akışkanın kütlesini ifade eder ve genellikle ṁ (m üzerinde nokta) sembolüyle gösterilir. Yoğunluk (ρ) ve hacimsel debi (Q) ile ṁ = ρ × Q formülüyle ilişkilidir.",
        "Kütlenin korunumu ilkesi gereği, kararlı (steady-state) bir akışta bir borunun herhangi bir kesitinden geçen kütlesel debi, boru boyunca sabit kalır -- kesit alanı veya akış hızı değişse bile.",
      ],
    },
    {
      title: "Kütlesel debi neden hacimsel debiden farklıdır?",
      paragraphs: [
        "Hacimsel debi (m³/s), bir akışkanın hacmini ölçerken, kütlesel debi doğrudan kütleyi ölçer. Sıkıştırılabilir akışkanlarda (gazlar gibi) yoğunluk basınç ve sıcaklıkla değiştiği için, aynı kütlesel debiye sahip bir gaz akışı, boru boyunca farklı noktalarda farklı hacimsel debi gösterebilir.",
        "Bu yüzden yanma sistemleri, gaz türbinleri ve kompresörler gibi yoğunluğun önemli ölçüde değiştiği uygulamalarda mühendisler genellikle kütlesel debiyi tercih eder -- bu, kütlenin korunumu ilkesiyle doğrudan uyumlu, basınç/sıcaklıktan bağımsız bir ölçüttür.",
      ],
    },
    {
      title: "Yanma ve motor sistemlerinde kütlesel debi",
      paragraphs: [
        "İçten yanmalı motorlarda ve jet motorlarında hava ve yakıtın kütlesel debisi, yanma verimliliğini ve motor performansını doğrudan etkiler. Hava-yakıt oranı (kütlece), verimli ve temiz bir yanma için hassas şekilde kontrol edilmesi gereken kritik bir parametredir.",
        "Modern araçlarda kullanılan 'hava kütle akış sensörü' (Mass Air Flow - MAF sensörü), motora giren havanın kütlesel debisini doğrudan ölçerek yakıt enjeksiyon sisteminin doğru miktarda yakıt püskürtmesini sağlar.",
      ],
    },
    {
      title: "Kimya mühendisliğinde kütlesel debi",
      paragraphs: [
        "Kimyasal proses tasarımında reaktanların ve ürünlerin kütlesel debisi, kütle dengesi (mass balance) hesaplarının temelidir; bir reaktöre giren toplam kütle, çıkan toplam kütleye (reaksiyon sırasında madde kaybı olmadığı sürece) eşit olmalıdır.",
        "Bu prensip, endüstriyel tesislerin tasarımında ve verimlilik analizinde kullanılan en temel mühendislik araçlarından biridir ve genellikle kg/saat veya ton/saat cinsinden ifade edilir.",
      ],
    },
    {
      title: "Kütlesel debi nasıl ölçülür?",
      paragraphs: [
        "Coriolis tipi debimetreler, akışkanın kütlesel debisini doğrudan ölçebilen hassas cihazlardır; akışkanın titreşen bir boru içinden geçerken oluşturduğu Coriolis kuvvetini ölçerek çalışırlar ve yoğunluk değişiminden etkilenmezler.",
        "Alternatif olarak, hacimsel debi ölçülüp ayrıca ölçülen yoğunlukla çarpılarak da kütlesel debi dolaylı olarak hesaplanabilir; ancak bu yöntem, yoğunluğun doğru ve güncel şekilde bilinmesini gerektirir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Gram/Saat",
      symbol: "g/h",
      referenceValue: "≈0,00000028 kg/s",
      system: "SI/metrik",
      commonUse: "Laboratuvar dozajlama sistemleri",
    },
    {
      name: "Gram/Saniye",
      symbol: "g/s",
      referenceValue: "0,001 kg/s",
      system: "SI/metrik",
      commonUse: "Laboratuvar ve küçük ölçekli proses",
    },
    {
      name: "Kilogram/Saat",
      symbol: "kg/h",
      referenceValue: "≈0,000278 kg/s",
      system: "SI/metrik",
      commonUse: "Endüstriyel proses ve üretim hattı",
    },
    {
      name: "Kilogram/Saniye",
      symbol: "kg/s",
      referenceValue: "1 kg/s",
      system: "SI",
      commonUse: "Motor, türbin ve büyük proses hesapları",
    },
  ],
};

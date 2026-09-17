import type { CategoryArticle } from "../../categoryArticles";

export const acisalHizCategoryArticle: CategoryArticle = {
  slug: "acisal-hiz",

  introduction: [
    "Açısal hız, bir cismin dönme eksenindeki dönüş oranını ifade eden fiziksel büyüklüktür. Motor devrinden gezegen dönüşüne, santrifüj makinelerinden dönen makine parçalarına kadar birçok mühendislik ve fizik uygulamasında temel bir kavramdır.",

    "Uluslararası Birimler Sistemi'nde açısal hızın türetilmiş birimi radyan/saniyedir (rad/s); günlük hayatta ve otomotiv/makine mühendisliğinde ise devir/dakika (RPM) çok daha yaygın kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Açısal hız",
    },
    {
      label: "Boyut sembolü",
      value: "[T⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Radyan/Saniye",
    },
    {
      label: "SI birim sembolü",
      value: "rad/s",
    },
    {
      label: "RPM-rad/s dönüşümü",
      value: "1 RPM = 2π/60 rad/s ≈ 0,1047 rad/s",
    },
  ],

  sections: [
    {
      title: "Açısal hız nedir?",
      paragraphs: [
        "Açısal hız (ω, omega), bir cismin bir dönme ekseni etrafında birim zamanda kat ettiği açıyı ifade eder. Doğrusal hızın dönme hareketindeki karşılığı olarak düşünülebilir; genellikle rad/s cinsinden ifade edilir.",
        "Açısal hız, doğrusal hızla v = ω × r formülüyle ilişkilidir; burada r, dönme merkezine olan mesafedir. Bu, aynı açısal hıza sahip bir diskin merkeze yakın noktalarının, kenara yakın noktalarına göre daha düşük doğrusal hıza sahip olduğunu gösterir.",
      ],
    },
    {
      title: "Açısal hızın SI birimi: radyan/saniye",
      paragraphs: [
        "Radyan/saniye (rad/s), açısal hızın SI türetilmiş birimidir ve bir cismin saniyede kaç radyanlık açı taradığını ifade eder. Bir tam tur (360°, 2π radyan) saniyede tamamlanıyorsa, açısal hız 2π rad/s'dir.",
        "Radyan, boyutsuz bir büyüklük olduğu için (yay uzunluğu/yarıçap oranı), açısal hızın SI boyutu basitçe T⁻¹ (zamanın tersi) olarak gösterilir -- bu, açısal hızın matematiksel olarak frekansla (Hz) aynı boyuta sahip olduğu, ancak farklı bir fiziksel anlam taşıdığı anlamına gelir.",
      ],
    },
    {
      title: "RPM: motor ve makine dünyasının birimi",
      paragraphs: [
        "RPM (Revolutions Per Minute, devir/dakika), motorların, türbinlerin ve dönen makine parçalarının hızını ifade etmek için otomotiv ve makine mühendisliğinde standart olarak kullanılan bir birimdir.",
        "1 RPM, dakikada tam bir devir anlamına gelir ve rad/s cinsine çevrilirken 2π/60 (yaklaşık 0,1047) ile çarpılır -- bu, bir dakikanın 60 saniyeye ve bir devrin 2π radyana karşılık gelmesinden kaynaklanır.",
      ],
    },
    {
      title: "Motor devri ve tork ilişkisi",
      paragraphs: [
        "Bir motorun ürettiği güç, tork ile açısal hızın çarpımına eşittir (P = τ × ω); bu ilişki, aynı güce sahip iki motorun neden farklı tork ve devir kombinasyonlarına sahip olabileceğini açıklar.",
        "Düşük devirde yüksek tork üreten motorlar (dizel motorlar gibi) genellikle çekiş gücü gerektiren uygulamalarda (kamyon, traktör), yüksek devirde çalışan motorlar ise yüksek güç yoğunluğu gerektiren uygulamalarda (spor araçlar) tercih edilir.",
      ],
    },
    {
      title: "Santrifüj kuvvet ve açısal hız",
      paragraphs: [
        "Bir cismin dairesel hareket sırasında hissettiği merkezkaç etkisi, açısal hızın karesiyle doğru orantılıdır (F = m × ω² × r); bu yüzden açısal hızdaki küçük bir artış, oluşan kuvvette çok daha büyük bir artışa yol açar.",
        "Bu ilişki, santrifüj cihazlarının (laboratuvar santrifüjleri, çamaşır makinesi sıkma modu gibi) neden çok yüksek RPM değerlerinde çalıştığını açıklar -- yüksek açısal hız, ayrıştırma veya sıkma işlemi için gereken kuvveti önemli ölçüde artırır.",
      ],
    },
    {
      title: "Açısal hız nasıl ölçülür?",
      paragraphs: [
        "Açısal hız, takometre (devir ölçer) adı verilen cihazlarla doğrudan ölçülebilir; motorlu araçların gösterge panelindeki devir göstergesi bu ölçümü sürekli olarak yapar.",
        "Endüstriyel uygulamalarda optik veya manyetik sensörler kullanılarak dönen bir milin veya diskin hızı hassas şekilde ölçülür; bu ölçümler, motor kontrol sistemlerinde geri bildirim (feedback) sağlamak için de kullanılır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Derece/Saniye",
      symbol: "°/s",
      referenceValue: "≈0,01745 rad/s",
      system: "Geleneksel",
      commonUse: "Robotik ve kamera hareketi",
    },
    {
      name: "Radyan/Saniye",
      symbol: "rad/s",
      referenceValue: "1 rad/s",
      system: "SI",
      commonUse: "Fizik ve mühendislik hesapları",
    },
    {
      name: "Devir/Dakika (RPM)",
      symbol: "rpm",
      referenceValue: "≈0,1047 rad/s",
      system: "Makine mühendisliği",
      commonUse: "Motor ve makine devri",
    },
    {
      name: "Devir/Saniye",
      symbol: "Hz",
      referenceValue: "2π rad/s (≈6,2832 rad/s)",
      system: "Genel",
      commonUse: "Dönme frekansı",
    },
  ],
};

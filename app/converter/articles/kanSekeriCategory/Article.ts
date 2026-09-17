import type { CategoryArticle } from "../../categoryArticles";

export const kanSekeriCategoryArticle: CategoryArticle = {
  slug: "kan-sekeri",

  introduction: [
    "Kan şekeri (kan glukozu), kandaki glukoz (şeker) miktarını ifade eden ve diyabet takibinde temel rol oynayan bir ölçümdür. Dünya genelinde iki farklı birim sistemi kullanılır: SI birimi olan milimol/litre (mmol/L) ve özellikle ABD'de yaygın olan miligram/desilitre (mg/dL).",

    "Bu iki birim arasındaki fark, uluslararası tıbbi literatürü takip eden veya yurt dışında test yaptıran kişiler için sıkça karışıklığa yol açar -- aynı sayısal değer (örneğin '100') iki farklı birimde tamamen farklı bir kan şekeri seviyesini ifade edebilir.",
  ],

  facts: [
    {
      label: "Ölçülen madde",
      value: "Glukoz (kan şekeri)",
    },
    {
      label: "SI birimi (dünya geneli)",
      value: "Milimol/Litre (mmol/L)",
    },
    {
      label: "ABD'de yaygın birim",
      value: "Miligram/Desilitre (mg/dL)",
    },
    {
      label: "Dönüşüm faktörü",
      value: "mg/dL = mmol/L × 18,016",
    },
    {
      label: "Glukozun molar kütlesi",
      value: "≈180,16 g/mol",
    },
  ],

  sections: [
    {
      title: "Kan şekeri neden iki farklı birimle ölçülür?",
      paragraphs: [
        "Dünya Sağlık Örgütü ve çoğu ülke, kan glukozunu SI birim sistemine uygun olarak milimol/litre (mmol/L) cinsinden ifade eder. ABD ise geleneksel olarak miligram/desilitre (mg/dL) birimini kullanmaya devam eder.",
        "Bu iki birim arasındaki dönüşüm faktörü (18,016), glukozun molar kütlesinden (yaklaşık 180,16 g/mol) türetilir -- bu, 1 milimol glukozun kütlece 180,16 miligrama, yani 1 desilitre (0,1 litre) için 18,016 miligrama karşılık gelmesinden kaynaklanır.",
      ],
    },
    {
      title: "mg/dL'den mmol/L'ye dönüşüm nasıl yapılır?",
      paragraphs: [
        "mg/dL biriminden mmol/L'ye geçmek için değer 18,016'ya bölünür: mmol/L = mg/dL ÷ 18,016. Örneğin 100 mg/dL'lik bir değer, yaklaşık 5,55 mmol/L'ye karşılık gelir.",
        "Ters yönde, mmol/L'den mg/dL'ye geçmek için değer 18,016 ile çarpılır: mg/dL = mmol/L × 18,016. Bu basit çarpım/bölüm ilişkisi, glukozun sabit bir molar kütleye sahip tek bir molekül olmasından kaynaklanır.",
      ],
    },
    {
      title: "Genel referans aralıkları (bilgilendirme amaçlı)",
      paragraphs: [
        "Açlık kan şekeri için yaygın olarak kullanılan genel referans aralıkları: normal aralık genellikle 70-99 mg/dL (3,9-5,5 mmol/L) civarındadır; 100-125 mg/dL (5,6-6,9 mmol/L) aralığı 'prediyabet' olarak, 126 mg/dL (7,0 mmol/L) ve üzeri ise (tekrarlanan testlerde) diyabet göstergesi olarak değerlendirilebilir.",
        "Bu değerler yalnızca genel bilgilendirme amaçlıdır ve kesin tıbbi eşikler; kullanılan test yöntemine, laboratuvara ve kişinin klinik durumuna göre değişebilir. Kan şekeri sonuçlarının yorumlanması ve tanı, her zaman bir hekim tarafından yapılmalıdır.",
      ],
    },
    {
      title: "Kan şekeri ölçüm yöntemleri",
      paragraphs: [
        "Kan şekeri, parmaktan alınan kapiller kan örneğiyle glukometre (ev tipi ölçüm cihazı) kullanılarak veya laboratuvarda venöz kan örneğinden ölçülebilir. İki yöntem arasında küçük farklılıklar olabilir, bu yüzden kesin tanı için laboratuvar ölçümü tercih edilir.",
        "Sürekli glukoz izleme (CGM) sistemleri ise cilt altına yerleştirilen bir sensörle günün her saatinde glukoz seviyesini otomatik olarak takip eder; bu, özellikle diyabet hastalarının glukoz dalgalanmalarını daha yakından izlemesini sağlar.",
      ],
    },
    {
      title: "HbA1c ile anlık kan şekeri farkı",
      paragraphs: [
        "Anlık kan şekeri ölçümü (mg/dL veya mmol/L), yalnızca o andaki glukoz seviyesini gösterirken, HbA1c testi (glikozillenmiş hemoglobin) geçmiş 2-3 aylık ortalama kan şekeri seviyesini yansıtır ve genellikle yüzde (%) cinsinden ifade edilir.",
        "Bu iki ölçüm birbirini tamamlar: anlık ölçüm günlük dalgalanmaları, HbA1c ise uzun vadeli kontrol düzeyini gösterir; diyabet yönetiminde ikisi birlikte değerlendirilir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Milimol/Litre",
      symbol: "mmol/L",
      referenceValue: "1 mmol/L",
      system: "SI (dünya geneli)",
      commonUse: "Avrupa, Türkiye ve çoğu ülkede laboratuvar sonucu",
    },
    {
      name: "Miligram/Desilitre",
      symbol: "mg/dL",
      referenceValue: "≈0,0555 mmol/L",
      system: "Geleneksel (ABD)",
      commonUse: "ABD'de laboratuvar ve glukometre sonucu",
    },
  ],
};

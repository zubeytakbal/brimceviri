import type { CategoryArticle } from "../../categoryArticles";

export const manyetikAlanCategoryArticle: CategoryArticle = {
  slug: "manyetik-alan",

  introduction: [
    "Manyetik alan şiddeti, bir manyetik alanın kaynağının (akım taşıyan bir tel veya mıknatıs) ne kadar güçlü bir manyetize edici etki oluşturduğunu ifade eden fiziksel büyüklüktür. Elektromıknatıslardan manyetik kayıt cihazlarına kadar birçok uygulamanın temelini oluşturur.",

    "Uluslararası Birimler Sistemi'nde manyetik alan şiddetinin türetilmiş birimi amper/metredir (A/m); eski CGS sisteminden gelen oersted (Oe) birimi ise özellikle manyetik malzeme endüstrisinde hâlâ yaygın kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Manyetik alan şiddeti",
    },
    {
      label: "Boyut sembolü",
      value: "[IL⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Amper/Metre",
    },
    {
      label: "SI birim sembolü",
      value: "A/m",
    },
    {
      label: "Oersted dönüşümü",
      value: "1 Oe ≈ 79,5775 A/m",
    },
  ],

  sections: [
    {
      title: "Manyetik alan şiddeti nedir?",
      paragraphs: [
        "Manyetik alan şiddeti (H), bir manyetik alanın kaynağı tarafından oluşturulan 'manyetize edici güç'ü ifade eder ve genellikle H sembolüyle gösterilir. Bir akım taşıyan telin veya bir bobinin etrafında oluşturduğu manyetik etkinin şiddetini tanımlar.",
        "Manyetik alan şiddeti, manyetik akı yoğunluğundan (B, Tesla cinsinden ölçülür) farklı bir büyüklüktür -- H, ortamın manyetik özelliklerinden (geçirgenlik) bağımsız olarak yalnızca kaynağa bağlıyken, B ortamın manyetik geçirgenliğine de bağlıdır.",
      ],
    },
    {
      title: "Manyetik alanın SI birimi: amper/metre",
      paragraphs: [
        "Amper/metre (A/m), manyetik alan şiddetinin SI türetilmiş birimidir; bir bobinin sarım sayısı ve içinden geçen akımın, bobinin uzunluğuna oranlanmasıyla elde edilir.",
        "Bu birim, manyetik alanın doğrudan elektrik akımıyla (Amper) ilişkisini yansıtır -- Ampère Yasası'na göre bir manyetik alan, yalnızca hareket eden elektrik yükleri (akım) tarafından oluşturulabilir.",
      ],
    },
    {
      title: "Oersted: CGS sisteminin manyetik alan birimi",
      paragraphs: [
        "Oersted (Oe), CGS (santimetre-gram-saniye) birim sisteminden gelen ve Danimarkalı fizikçi Hans Christian Ørsted'in onuruna adlandırılmış bir manyetik alan şiddeti birimidir; 1 oersted yaklaşık 79,5775 A/m'ye eşittir.",
        "Oersted, günümüzde resmî olarak SI sisteminin dışında kalsa da, mıknatıs ve manyetik kayıt malzemesi endüstrisinde (özellikle malzemenin 'zorlayıcı alan' - coercivity değerini ifade etmek için) hâlâ yaygın olarak kullanılır.",
      ],
    },
    {
      title: "Manyetik alan ve elektromıknatıslar",
      paragraphs: [
        "Bir elektromıknatısın gücü, bobinin sarım sayısı, içinden geçen akım ve bobinin geometrisiyle doğrudan ilişkilidir; daha fazla sarım veya daha yüksek akım, daha güçlü bir manyetik alan şiddeti oluşturur.",
        "Bu ilke, kapı zillerinden MRI cihazlarındaki dev süperiletken mıknatıslara kadar birçok uygulamanın temelini oluşturur -- istenen manyetik alan şiddetine ulaşmak için sarım sayısı ve akım dengeli şekilde tasarlanır.",
      ],
    },
    {
      title: "Manyetik malzemelerde zorlayıcı alan (coercivity)",
      paragraphs: [
        "Bir kalıcı mıknatısın 'zorlayıcı alanı' (coercivity), o mıknatısın manyetizasyonunu tersine çevirmek için gereken dışarıdan uygulanan manyetik alan şiddetidir ve genellikle oersted veya kA/m cinsinden ifade edilir.",
        "Yüksek zorlayıcı alana sahip malzemeler (sert manyetik malzemeler) kalıcı mıknatıs üretiminde tercih edilirken, düşük zorlayıcı alana sahip malzemeler (yumuşak manyetik malzemeler) transformatör çekirdekleri gibi sürekli manyetize/demanyetize olması gereken uygulamalarda kullanılır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Amper/Metre",
      symbol: "A/m",
      referenceValue: "1 A/m",
      system: "SI",
      commonUse: "Elektromıknatıs ve bobin hesapları",
    },
    {
      name: "Kiloamper/Metre",
      symbol: "kA/m",
      referenceValue: "1000 A/m",
      system: "SI/metrik",
      commonUse: "Manyetik malzeme özellikleri",
    },
    {
      name: "Oersted",
      symbol: "Oe",
      referenceValue: "≈79,5775 A/m",
      system: "CGS",
      commonUse: "Mıknatıs endüstrisi ve manyetik kayıt",
    },
  ],
};

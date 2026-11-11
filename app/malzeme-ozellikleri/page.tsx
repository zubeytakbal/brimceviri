import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../converter/faqSchema";
import {
  materialCategoryLabels,
  type MaterialCategory,
} from "../converter/materialsDatabase";
import { getAllMaterialProfiles } from "../converter/materialsHub";
import { getAllMaterialComparisons } from "../converter/materialComparisons";
import { buildSiteUrl } from "../siteConfig";
import MaterialExplorer from "../components/MaterialExplorer";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki yoğunluk değerleri ne kadar güvenilir?",
    answer:
      "Değerler, yaygın kabul gören mühendislik referans tablolarından derlenmiş, oda sıcaklığına yakın genel değerlerdir. Gerçek değerler malzemenin türüne, saflığına, alaşımına ve sıcaklığa göre küçük farklılıklar gösterebilir.",
  },
  {
    question: "Bir malzemenin ısıl iletkenliği veya elastisite modülü neden gösterilmiyor?",
    answer:
      "Sadece güvenilir kaynaklardan doğrulanmış veriye sahip olduğumuz malzemeler için ek özellikler gösteriyoruz; her malzeme için her özellik mevcut değildir.",
  },
];

const categoryOrder: MaterialCategory[] = [
  "metal",
  "sivi",
  "gida",
  "plastik",
  "yapi-malzemesi",
  "ahsap",
  "gaz",
];


export const metadata: Metadata = {
  title: "Malzeme Özellikleri: Yoğunluk ve Isıl İletkenlik",
  description:
    "100'den fazla metal, sıvı, plastik, ahşap ve yapı malzemesinin yoğunluğunu ve mühendislik özelliklerini gör, birimler arasında anında çevir.",
  alternates: {
    canonical: "/malzeme-ozellikleri",
    languages: {
      de: "/de/werkstoffeigenschaften",
    },
  },
  openGraph: {
    title: "Malzeme Özellikleri: Yoğunluk ve Isıl İletkenlik",
    description: "100'den fazla malzemenin yoğunluğunu ve özelliklerini gör.",
    url: buildSiteUrl("/malzeme-ozellikleri"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function MaterialsHubPage() {
  const materials = getAllMaterialProfiles();
  const comparisons = getAllMaterialComparisons();

  return (
    <AracSayfasi
      yol="/malzeme-ozellikleri"
      baslik="Malzeme Özellikleri"
      hesap={<MaterialExplorer locale="tr" />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"populer-yogunluk-karsilastirmalari","baslik":"Popüler Yoğunluk Karşılaştırmaları"}]}
      serbestIcerik={
        <>
          {categoryOrder.map((category) => {
            const categoryMaterials = materials
              .filter((material) => material.category === category)
              .sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));

            if (categoryMaterials.length === 0) return null;

            return (
              <div key={category}>
                <h2>{materialCategoryLabels[category]}</h2>
                <ul className="related-conversion-list">
                  {categoryMaterials.map((material) => (
                    <li key={material.id}>
                      <Link href={`/malzeme-ozellikleri/${material.id}`}>
                        {material.nameTr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <h2 id="populer-yogunluk-karsilastirmalari">Popüler Yoğunluk Karşılaştırmaları</h2>
          <ul>
            {comparisons.map((comparison) => (
              <li key={comparison.slug}>
                <Link href={`/malzeme-karsilastirma/${comparison.slug}`}>
                  {comparison.first.nameTr} – {comparison.second.nameTr}
                </Link>
                : {comparison.context}
              </li>
            ))}
          </ul>
        </>
      }
    />
  );
}

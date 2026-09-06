import { calculatorPages } from "./calculatorPages";
import { everydayCalculators } from "./everydayCalculators";
import { getLiveElectricalCalculatorItems } from "./engineeringHubs";
import { geometriTools } from "./geometriTools";
import { kimyaTools } from "./kimyaTools";
import { matematikTools } from "./matematikTools";

export interface CalculatorSearchEntry {
  id: string;
  href: string;
  label: string;
  categoryLabel: string;
}

/** Site genelindeki bütün hesaplayıcı sayfalarının (dönüşüm sayfaları hariç)
 * tek, birleşik arama dizini — her biri kendi hub'ının (matematik, kimya,
 * mühendislik, günlük) kaynak listesinden türetilir, böylece yeni bir araç
 * sadece o hub'a eklendiğinde otomatik olarak aranabilir hale gelir. */
export const calculatorSearchIndex: CalculatorSearchEntry[] = [
  ...matematikTools.map((tool) => ({
    id: `matematik-${tool.id}`,
    href: tool.href,
    label: tool.title,
    categoryLabel: "Matematik Hesaplayıcısı",
  })),
  ...kimyaTools.map((tool) => ({
    id: `kimya-${tool.id}`,
    href: tool.href,
    label: tool.title,
    categoryLabel: "Kimya Hesaplayıcısı",
  })),
  ...geometriTools.map((tool) => ({
    id: `geometri-${tool.id}`,
    href: tool.href,
    label: tool.title,
    categoryLabel: "Geometri Hesaplayıcısı",
  })),
  ...getLiveElectricalCalculatorItems("tr").map((item) => ({
    id: `muhendislik-${item.sourceSlug}`,
    href: item.href,
    label: item.title,
    categoryLabel: "Mühendislik Hesaplayıcısı",
  })),
  ...calculatorPages.map((page) => ({
    id: `muhendislik-${page.slug}`,
    href: `/hesaplayicilar/${page.slug}`,
    label: page.title,
    categoryLabel: "Mühendislik Hesaplayıcısı",
  })),
  ...everydayCalculators.map((tool) => ({
    id: `gunluk-${tool.id}`,
    href: tool.href,
    label: tool.label,
    categoryLabel: "Günlük Hesaplayıcı",
  })),
];

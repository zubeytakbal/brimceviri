import type { SiteIconName } from "../components/siteIcons";
import { englishEverydayCalculatorGroups } from "./englishEverydayCalculatorGroups";
import { englishStandaloneTools } from "./englishStandaloneTools";

// "You may also like": birbiriyle ilgili Ingilizce sayfalar kumeler halinde.
// Bir sayfa hangi kumedeyse, sayfanin altinda o kumenin diger sayfalari
// kart olarak gosterilir. Kumede olmayan araclar, ayni araç grubundaki
// (englishEverydayCalculatorGroups) diger araclari gosterir.

export type RelatedPageCard = { href: string; title: string; description: string; icon: SiteIconName };

const goldCluster: RelatedPageCard[] = [
  { href: "/en/gold-karat-calculator", title: "Gold Karat Calculator", description: "Pure gold in 10k–22k, 14k to 18k alloying and melt value.", icon: "goldKarat" },
  { href: "/en/gold-price-calculator-india", title: "Gold Price Calculator India", description: "Jewellery price with making charges and 3% GST.", icon: "goldKarat" },
  { href: "/en/22k-gold-to-24k-gold", title: "22K to 24K Gold", description: "Pure gold content of 22K (916) gold.", icon: "goldKarat" },
  { href: "/en/24k-gold-to-22k-gold", title: "24K to 22K Gold", description: "How much 22K gold a given amount of pure gold makes.", icon: "goldKarat" },
  { href: "/en/18k-gold-to-22k-gold", title: "18K to 22K Gold", description: "Compare 18K (750) and 22K (916) gold.", icon: "goldKarat" },
  { href: "/en/grams-to-carats", title: "Grams to Carats", description: "Gemstone weight: 1 carat = 0.2 grams.", icon: "mass" },
  { href: "/en/grain-to-grams", title: "Grains to Grams", description: "1 grain = 0.0648 grams.", icon: "mass" },
  { href: "/en/indian-weight-converter", title: "Tola, Ratti & Maund Converter", description: "1 tola = 11.66 g; gemstone ratti ≈ 0.91 ct.", icon: "mass" },
];

const landCluster: RelatedPageCard[] = [
  { href: "/en/india-land-area-converter", title: "India Land Area Converter", description: "Bigha, katha, gaj, guntha and cent by state.", icon: "area" },
  { href: "/en/bigha-to-square-feet", title: "Bigha to Square Feet", description: "1 Bengal bigha = 14,400 sq ft.", icon: "area" },
  { href: "/en/acre-to-bigha", title: "Acres to Bigha", description: "1 acre = 3.025 Bengal bigha.", icon: "area" },
  { href: "/en/gaj-to-square-feet", title: "Gaj to Square Feet", description: "1 gaj = 1 square yard = 9 sq ft.", icon: "area" },
  { href: "/en/marla-to-gaj", title: "Marla to Gaj", description: "1 marla = 30.25 gaj (272.25 sq ft).", icon: "area" },
  { href: "/en/cent-to-square-feet", title: "Cent to Square Feet", description: "1 cent = 435.6 sq ft.", icon: "area" },
  { href: "/en/guntha-to-square-feet", title: "Guntha to Square Feet", description: "1 guntha = 1,089 sq ft.", icon: "area" },
  { href: "/en/marla-to-square-feet", title: "Marla to Square Feet", description: "1 marla = 272.25 sq ft.", icon: "area" },
  { href: "/en/acres-to-hectares", title: "Acres to Hectares", description: "1 acre = 0.4047 hectare.", icon: "area" },
  { href: "/en/bigha-to-square-meters", title: "Bigha to Square Meters", description: "Bengal bigha (14,400 sq ft) in m².", icon: "area" },
  { href: "/en/bigha-to-katha", title: "Bigha to Katha", description: "1 bigha = 20 katha in West Bengal.", icon: "area" },
  { href: "/en/guntha-to-square-meters", title: "Guntha to Square Meters", description: "1 guntha = 1,089 sq ft.", icon: "area" },
  { href: "/en/cent-land-to-square-meters", title: "Cent to Square Meters", description: "1 cent = 435.6 sq ft = 1/100 acre.", icon: "area" },
  { href: "/en/square-yards-to-square-meters", title: "Gaj (Square Yards) to m²", description: "1 gaj = 9 sq ft = 0.836 m².", icon: "area" },
  { href: "/en/acre-to-square-meters", title: "Acres to Square Meters", description: "1 acre = 4,046.86 m².", icon: "area" },
  { href: "/en/kanal-to-marla", title: "Kanal to Marla", description: "1 kanal = 20 marla (Punjab, Haryana).", icon: "area" },
  { href: "/en/square-footage-calculator", title: "Square Footage Calculator", description: "Measure a room or plot in sq ft.", icon: "area" },
];

const numbersCluster: RelatedPageCard[] = [
  { href: "/en/lakh-crore-converter", title: "Lakh & Crore Converter", description: "Lakh and crore to million and billion.", icon: "numberBaseCalculator" },
  { href: "/en/gold-price-calculator-india", title: "Gold Price Calculator India", description: "Jewellery price with making charges and GST.", icon: "goldKarat" },
  { href: "/en/india-land-area-converter", title: "India Land Area Converter", description: "Bigha, gaj, guntha and acres by state.", icon: "area" },
  { href: "/en/gst-calculator-india", title: "GST Calculator India", description: "Add or remove GST with CGST/SGST split.", icon: "vatCalculator" },
  { href: "/en/emi-calculator", title: "EMI Calculator", description: "Monthly EMI and total interest for any loan.", icon: "amortismanCalculator" },
  { href: "/en/indian-weight-converter", title: "Tola, Ratti & Maund Converter", description: "Traditional Indian weights in grams.", icon: "mass" },
  { href: "/en/mathematics-calculators/percentage", title: "Percentage Calculator", description: "What percentage one number is of another.", icon: "numberBaseCalculator" },
];

const constructionCluster: RelatedPageCard[] = [
  { href: "/en/steel-weight-calculator", title: "Steel Bar Weight Calculator", description: "Rebar kg per meter with D²/162.", icon: "mass" },
  { href: "/en/cement-sand-aggregate-calculator", title: "Concrete Mix Calculator", description: "Cement bags, sand and aggregate for M20, M25.", icon: "concreteCalculator" },
  { href: "/en/n-mm2-to-mpa", title: "N/mm² to MPa", description: "1 N/mm² = 1 MPa: concrete and steel strength.", icon: "pressure" },
  { href: "/en/n-mm2-to-kg-cm2", title: "N/mm² to kg/cm²", description: "1 N/mm² = 10.197 kgf/cm².", icon: "pressure" },
  { href: "/en/kn-m2-to-t-m2", title: "kN/m² to t/m²", description: "Soil bearing capacity: 1 t/m² = 9.81 kN/m².", icon: "pressure" },
  { href: "/en/brick-calculator", title: "Brick Calculator", description: "Bricks and mortar for a wall.", icon: "brickCalculator" },
  { href: "/en/concrete-calculator", title: "Concrete Volume Calculator", description: "Volume of slabs, footings and columns.", icon: "concreteCalculator" },
  { href: "/en/gaj-to-square-feet", title: "Gaj to Square Feet", description: "Plot sizes: 1 gaj = 9 sq ft.", icon: "area" },
];

const studyCluster: RelatedPageCard[] = [
  { href: "/en/cgpa-to-percentage", title: "CGPA to Percentage Calculator", description: "Official formulas for VTU, Anna, DU, SPPU and more.", icon: "numberBaseCalculator" },
  { href: "/en/cgpa-to-percentage/vtu", title: "VTU CGPA to Percentage", description: "(CGPA − 0.75) × 10.", icon: "numberBaseCalculator" },
  { href: "/en/cgpa-to-percentage/anna-university", title: "Anna University CGPA to %", description: "CGPA × 10.", icon: "numberBaseCalculator" },
  { href: "/en/cgpa-to-percentage/delhi-university", title: "Delhi University CGPA to %", description: "CGPA × 9.5 (CBCS).", icon: "numberBaseCalculator" },
  { href: "/en/cgpa-to-percentage/cbse", title: "CBSE CGPA to Percentage", description: "Indicative percentage = CGPA × 9.5.", icon: "numberBaseCalculator" },
  { href: "/en/mathematics-calculators/percentage", title: "Percentage Calculator", description: "What percentage one number is of another.", icon: "numberBaseCalculator" },
  { href: "/en/grade-calculator", title: "Grade Calculator", description: "Weighted grades and the score you need.", icon: "numberBaseCalculator" },
];

const clusters: RelatedPageCard[][] = [goldCluster, landCluster, numbersCluster, constructionCluster, studyCluster];

const extraClusterMembers: Record<string, RelatedPageCard[]> = {
  // Kumede kart olarak gosterilmeyen ama kumenin sayfalarini gostermesi gereken sayfalar.
  "/en/carats-to-grams": goldCluster,
  "/en/grams-to-grain": goldCluster,
  "/en/gold-karat-calculator": goldCluster,
  "/en/14k-gold-to-18k-gold": goldCluster,
  "/en/18k-gold-to-14k-gold": goldCluster,
  "/en/22k-gold-to-18k-gold": goldCluster,
  "/en/square-meters-to-bigha": landCluster,
  "/en/katha-to-bigha": landCluster,
  "/en/katha-to-square-meters": landCluster,
  "/en/square-meters-to-katha": landCluster,
  "/en/bigha-to-decimal-land": landCluster,
  "/en/decimal-land-to-bigha": landCluster,
  "/en/decimal-land-to-acre": landCluster,
  "/en/acre-to-decimal-land": landCluster,
  "/en/square-meters-to-guntha": landCluster,
  "/en/square-meters-to-cent-land": landCluster,
  "/en/ground-to-square-meters": landCluster,
  "/en/square-meters-to-ground": landCluster,
  "/en/biswa-to-square-meters": landCluster,
  "/en/square-meters-to-biswa": landCluster,
  "/en/square-meters-to-square-yards": landCluster,
  "/en/square-meters-to-acre": landCluster,
  "/en/marla-to-kanal": landCluster,
  "/en/killa-to-acre": landCluster,
  "/en/acre-to-killa": landCluster,
  "/en/katha-to-decimal-land": landCluster,
  "/en/decimal-land-to-katha": landCluster,
  "/en/hectares-to-square-meters": landCluster,
  "/en/square-feet-to-bigha": landCluster,
  "/en/bigha-to-acre": landCluster,
  "/en/bigha-to-hectares": landCluster,
  "/en/hectares-to-bigha": landCluster,
  "/en/katha-to-square-feet": landCluster,
  "/en/square-feet-to-katha": landCluster,
  "/en/square-feet-to-cent": landCluster,
  "/en/cent-to-acre": landCluster,
  "/en/acre-to-cent": landCluster,
  "/en/square-feet-to-guntha": landCluster,
  "/en/guntha-to-acre": landCluster,
  "/en/acre-to-guntha": landCluster,
  "/en/square-feet-to-marla": landCluster,
  "/en/kanal-to-square-feet": landCluster,
  "/en/square-feet-to-kanal": landCluster,
  "/en/biswa-to-square-feet": landCluster,
  "/en/square-feet-to-biswa": landCluster,
  "/en/ground-to-square-feet": landCluster,
  "/en/square-feet-to-ground": landCluster,
  "/en/square-feet-to-square-yards": landCluster,
  "/en/acre-to-square-feet": landCluster,
  "/en/square-feet-to-acre": landCluster,
  "/en/hectares-to-acres": landCluster,
  "/en/square-meters-to-hectares": landCluster,
  "/en/square-feet-to-gaj": landCluster,
  "/en/gaj-to-square-meters": landCluster,
  "/en/square-meters-to-gaj": landCluster,
  "/en/gaj-to-marla": landCluster,
  "/en/bigha-to-gaj": landCluster,
  "/en/gaj-to-bigha": landCluster,
  "/en/acre-to-gaj": landCluster,
  "/en/gaj-to-acre": landCluster,
  "/en/mpa-to-n-mm2": constructionCluster,
  "/en/kg-cm2-to-n-mm2": constructionCluster,
  "/en/n-mm2-to-psi": constructionCluster,
  "/en/psi-to-n-mm2": constructionCluster,
  "/en/t-m2-to-kn-m2": constructionCluster,
  "/en/kn-m2-to-kpa": constructionCluster,
  "/en/kpa-to-kn-m2": constructionCluster,
  "/en/t-m2-to-kg-cm2": constructionCluster,
  "/en/kg-cm2-to-t-m2": constructionCluster,
};

export function getEnglishYouMayAlsoLike(path: string, limit = 6): RelatedPageCard[] {
  // Tum CGPA kurum sayfalari calisma kumesini gosterir.
  const extra = extraClusterMembers[path] ?? (path.startsWith("/en/cgpa-to-percentage/") ? studyCluster : []);
  const pool = [...clusters.filter((cluster) => cluster.some((card) => card.href === path)).flat(), ...extra];
  const seen = new Set<string>([path]);
  const picked: RelatedPageCard[] = [];
  for (const card of pool) {
    if (seen.has(card.href)) continue;
    seen.add(card.href);
    picked.push(card);
    if (picked.length >= limit) return picked;
  }
  if (picked.length > 0) return picked;

  // Kumede degilse: ayni gruptaki diger araclar.
  const tool = englishStandaloneTools.find((candidate) => candidate.englishPath === path);
  if (!tool) return [];
  const group = englishEverydayCalculatorGroups.find((candidate) => candidate.tools.includes(tool.component));
  if (!group) return [];
  return group.tools
    .map((component) => englishStandaloneTools.find((candidate) => candidate.component === component))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate) && candidate!.englishPath !== path)
    .slice(0, limit)
    .map((candidate) => ({ href: candidate.englishPath, title: candidate.title, description: candidate.cardDescription, icon: candidate.iconName as SiteIconName }));
}

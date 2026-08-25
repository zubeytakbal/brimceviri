import {
  Activity,
  AirVent,
  Anvil,
  ArrowLeftRight,
  Baby,
  Battery,
  Blocks,
  BookOpen,
  Cable,
  Cake,
  ChefHat,
  CircleGauge,
  CircuitBoard,
  ClipboardList,
  Droplet,
  Droplets,
  Footprints,
  Gauge,
  Gem,
  Grid3x3,
  Layers,
  MoonStar,
  PaintRoller,
  PlugZap,
  Puzzle,
  ReceiptTurkishLira,
  Rocket,
  RotateCw,
  Ruler,
  Scale,
  Search,
  Sparkles,
  Thermometer,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap = {
  length: Ruler,
  mass: Scale,
  pressure: Gauge,
  temperature: Thermometer,
  energy: Zap,
  speed: Gauge,
  pressureForceArea: CircleGauge,
  hydrostaticPressure: Waves,
  unitGuide: BookOpen,
  allConversions: ArrowLeftRight,
  search: Search,
  flowRate: Droplets,
  density: Layers,
  force: Anvil,
  torque: RotateCw,
  momentum: Rocket,
  viscosity: Droplet,
  resistance: CircuitBoard,
  capacitance: Battery,
  inductance: Cable,
  charge: Sparkles,
  shoeSize: Footprints,
  kitchenMeasures: ChefHat,
  recipe: ClipboardList,
  ringSize: Gem,
  embed: Puzzle,
  paintCalculator: PaintRoller,
  tileCalculator: Grid3x3,
  brickCalculator: Blocks,
  dateCalculator: Cake,
  vatCalculator: ReceiptTurkishLira,
  bmiCalculator: Activity,
  pregnancyCalculator: Baby,
  acCapacityCalculator: AirVent,
  electricityConsumptionCalculator: PlugZap,
  sleepCalculator: MoonStar,
} as const satisfies Record<string, LucideIcon>;

export type SiteIconName = keyof typeof iconMap;

const categoryIconMap = {
  uzunluk: "length",
  length: "length",
  kutle: "mass",
  mass: "mass",
  basinc: "pressure",
  pressure: "pressure",
  sicaklik: "temperature",
  temperature: "temperature",
  enerji: "energy",
  energy: "energy",
  hiz: "speed",
  speed: "speed",
  debi: "flowRate",
  yogunluk: "density",
  kuvvet: "force",
  tork: "torque",
  momentum: "momentum",
  viskozite_dinamik: "viscosity",
  elektrik_direnc: "resistance",
  kapasitans: "capacitance",
  enduktans: "inductance",
  elektrik_yuk: "charge",
} as const satisfies Record<string, SiteIconName>;

const calculatorIconMap = {
  "isi-enerjisi": "energy",
  "heat-energy": "energy",
  "isi-iletimi": "temperature",
  "heat-conduction": "temperature",
  "reynolds-sayisi": "speed",
  "reynolds-number": "speed",
  "basinc-kuvvet-alan": "pressureForceArea",
  "pressure-force-area": "pressureForceArea",
  "hidrostatik-basinc": "hydrostaticPressure",
  "hydrostatic-pressure": "hydrostaticPressure",
  "kw-to-amper-hesaplama": "energy",
  "amper-to-kw-hesaplama": "energy",
  "gerilim-dusumu-hesaplama": "energy",
  "kablo-kesiti-hesaplama": "energy",
  "motor-akimi-hesaplama": "energy",
  "ohm-yasasi": "resistance",
  "ohms-law": "resistance",
} as const satisfies Record<string, SiteIconName>;

export function getCategoryIconName(category: string) {
  return (
    categoryIconMap[category as keyof typeof categoryIconMap] ??
    "allConversions"
  );
}

export function getCalculatorIconName(slug: string) {
  return (
    calculatorIconMap[slug as keyof typeof calculatorIconMap] ??
    "allConversions"
  );
}

export function DecorativeIcon({
  name,
  size = 20,
  className,
}: {
  name: SiteIconName;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name];

  return (
    <Icon
      aria-hidden="true"
      className={className}
      size={size}
      strokeWidth={1.7}
    />
  );
}

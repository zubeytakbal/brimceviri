import {
  ArrowLeftRight,
  BookOpen,
  CircleGauge,
  Gauge,
  Ruler,
  Scale,
  Search,
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

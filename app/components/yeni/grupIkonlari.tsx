// Grup simgeleri (lucide). Ana sayfa kartlarinda ve grup sayfasi basliginda kullanilir.
import {
  ArrowLeftRight,
  Atom,
  Building2,
  CalendarDays,
  Calculator,
  Coins,
  Dna,
  Droplet,
  Ellipsis,
  FlaskConical,
  Gauge,
  HeartPulse,
  Leaf,
  Plug,
  Ruler,
  Shirt,
  Sigma,
  Sun,
  Thermometer,
  Utensils,
  Wheat,
  type LucideIcon,
} from "lucide-react";

const IKON: Readonly<Record<string, LucideIcon>> = {
  donusum: ArrowLeftRight,
  finans: Coins,
  "gunluk-yasam": CalendarDays,
  insaat: Building2,
  saglik: HeartPulse,
  matematik: Sigma,
  fizik: Atom,
  kimya: FlaskConical,
  biyoloji: Dna,
  ekoloji: Leaf,
  yiyecek: Utensils,
  diger: Ellipsis,
  temel: Ruler,
  muhendislik: Gauge,
  "isi-ve-akiskan": Thermometer,
  elektrik: Plug,
  "isik-ve-radyasyon": Sun,
  "saglik-ve-kimya": Droplet,
  "tarim-ve-arazi": Wheat,
  "kuyumculuk-ve-tekstil": Shirt,
};

export function GrupIkonu({ slug, boyut = 22 }: { slug: string; boyut?: number }) {
  const Ikon = IKON[slug] ?? Calculator;
  return <Ikon size={boyut} strokeWidth={1.8} aria-hidden="true" />;
}

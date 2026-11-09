// Grup simgeleri (lucide). Ana sayfa kartlarinda ve grup sayfasi basliginda kullanilir.
import {
  Building2,
  CalendarDays,
  Calculator,
  Cog,
  Coins,
  Droplet,
  FlaskConical,
  Gauge,
  Gem,
  HeartPulse,
  Map,
  MoonStar,
  Plug,
  Ruler,
  Shirt,
  Sigma,
  Sprout,
  Sun,
  Thermometer,
  Utensils,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";

const IKON: Readonly<Record<string, LucideIcon>> = {
  "finans-ve-maas": Coins,
  "insaat-ve-ev": Building2,
  "tarih-ve-zaman": CalendarDays,
  "enerji-ve-arac": Zap,
  "saglik-ve-spor": HeartPulse,
  kuyumcu: Gem,
  "tarim-ve-hayvancilik": Sprout,
  matematik: Sigma,
  "kimya-ve-biyoloji": FlaskConical,
  "muhendislik-ve-elektrik": Cog,
  "harita-ve-tasima": Map,
  "gunluk-olculer": Utensils,
  "dini-hesaplar": MoonStar,
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

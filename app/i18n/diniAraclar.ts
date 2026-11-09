// Dini hesaplayıcılar: araç sayfalarının "ilgili araçlar" bölümü ve ana sayfa
// listesi buradan beslenir. Değişken tutar (fitre, fidye) ve namaz
// vakti gibi her yıl/gün değişen veriler bilerek yok.
import type { ToolLink } from "./turkishToolDirectory";

export const diniAraclar: Array<ToolLink & { description: string }> = [
  { href: "/kaza-orucu-hesaplama", label: "Kaza Orucu Hesaplama", description: "Kaza orucu kaç gün, haftada kaç gün tutarak ne zaman biter?" },
  { href: "/kible-yonu-hesaplama", label: "Kıble Yönü (Canlı Pusula)", description: "Telefonda canlı pusula; 81 ilin kıble açısı, manyetik sapma düzeltmeli." },
  { href: "/kaza-namazi-hesaplama", label: "Kaza Namazı Hesaplama", description: "Kaç vakit, kaç rekât borç; günde kaç vakit kılarak ne zaman biter?" },
  { href: "/hatim-hesaplama", label: "Hatim Hesaplama", description: "Günde kaç sayfa, okuma süresi ve grup hatminde cüz dağıtımı." },
  { href: "/zekat-hesaplama", label: "Zekât Hesaplama", description: "Nisap 80,18 g altın; net varlığın kırkta biri. Altın fiyatını siz girersiniz." },
  { href: "/hicri-yas-hesaplama", label: "Hicri Yaş Hesaplama", description: "Hicri takvime göre yaşınız ve Hicri doğum gününüz." },
  { href: "/kurban-hissesi-hesaplama", label: "Kurban Hissesi Hesaplama", description: "Bedel ve masrafları hisselere bölün; et payını hesaplayın." },
  { href: "/hafizlik-hesaplama", label: "Hafızlık Hesaplama", description: "Günde kaç sayfa ezberle kaç ayda hafız olunur? Bitiş tarihi ve hedefe göre günlük sayfa." },
  { href: "/kirk-mevlidi-hesaplama", label: "40 Mevlidi Hesaplama", description: "Ölünün 3., 7., 40. ve 52. günü hangi tarihe, gecesi hangi akşama denk geliyor?" },
  { href: "/hayiz-hesaplama", label: "Hayız ve Nifas Hesaplama", description: "Hanefî ölçülerine göre hayız, nifas ve istihaze günleri, gusül zamanı." },
  { href: "/tarih-cevirici", label: "Hicri–Miladi Tarih Çevirici", description: "Hicri, Rumi ve Miladi tarihleri birbirine çevirin." },
];

export function diniRelated(exclude: string) {
  return diniAraclar.filter((tool) => tool.href !== exclude).map(({ href, label }) => ({ href, label }));
}

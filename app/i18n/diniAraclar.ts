// Dini araçlar: /dini-araclar hub sayfası ve araç sayfalarının "ilgili
// araçlar" bölümü buradan beslenir. Değişken tutar (fitre, fidye) ve namaz
// vakti gibi her yıl/gün değişen veriler bilerek yok.
import type { ToolLink } from "./turkishToolDirectory";

export const DINI_ARACLAR_PATH = "/dini-araclar";

export const diniAraclar: Array<ToolLink & { description: string }> = [
  { href: "/seferi-mesafe-hesaplama", label: "Seferî Mesafe Hesaplama", description: "İki il arası karayolu mesafesi 90 km'yi geçiyor mu? 81 il için seferîlik." },
  { href: "/sure-bulucu", label: "Sure Bulucu", description: "114 sure: kaç ayet, hangi cüzde, kaçıncı sırada." },
  { href: "/umre-mesafe-hesaplama", label: "Umre Mesafe Hesaplama", description: "Tavaf ve sa'y kaç km, kaç adım, kaç dakika?" },
  { href: "/kaza-orucu-hesaplama", label: "Kaza Orucu Hesaplama", description: "Kaza orucu kaç gün, haftada kaç gün tutarak ne zaman biter?" },
  { href: "/kible-yonu-hesaplama", label: "Kıble Yönü (Canlı Pusula)", description: "Telefonda canlı pusula; 81 ilin kıble açısı, manyetik sapma düzeltmeli." },
  { href: "/kaza-namazi-hesaplama", label: "Kaza Namazı Hesaplama", description: "Kaç vakit, kaç rekât borç; günde kaç vakit kılarak ne zaman biter?" },
  { href: "/hatim-hesaplama", label: "Hatim Hesaplama", description: "Günde kaç sayfa, okuma süresi ve grup hatminde cüz dağıtımı." },
  { href: "/zekat-hesaplama", label: "Zekât Hesaplama", description: "Nisap 80,18 g altın; net varlığın kırkta biri. Altın fiyatını siz girersiniz." },
  { href: "/hicri-yas-hesaplama", label: "Hicri Yaş Hesaplama", description: "Hicri takvime göre yaşınız ve Hicri doğum gününüz." },
  { href: "/kurban-hissesi-hesaplama", label: "Kurban Hissesi Hesaplama", description: "Bedel ve masrafları hisselere bölün; et payını hesaplayın." },
  { href: "/hafizlik-hesaplama", label: "Hafızlık Hesaplama", description: "Günde kaç sayfa ezberle kaç ayda hafız olunur? Bitiş tarihi ve hedefe göre günlük sayfa." },
  { href: "/kaza-takip-cizelgesi", label: "Kaza Takip Çizelgesi", description: "Kaza namazı ve orucunu kıldıkça işaretleyin; üyeliksiz, cihazınızda saklanır." },
  { href: "/kirk-mevlidi-hesaplama", label: "40 Mevlidi Hesaplama", description: "Ölünün 3., 7., 40. ve 52. günü hangi tarihe, gecesi hangi akşama denk geliyor?" },
  { href: "/hayiz-hesaplama", label: "Hayız ve Nifas Hesaplama", description: "Hanefî ölçülerine göre hayız, nifas ve istihaze günleri, gusül zamanı." },
  { href: "/namaz-rekat-tablosu", label: "Namaz Rekât Tablosu", description: "Beş vakit namaz kaç rekât? Farz, sünnet ve vacipler tek tabloda." },
  { href: "/zikirmatik", label: "Online Zikirmatik", description: "33, 99, 100 hedefli dijital tesbih; titreşimli, sayı cihazda saklanır." },
  { href: "/esmaul-husna", label: "Esmaül Hüsna", description: "Allah'ın 99 ismi sırasıyla ve anlamlarıyla, aranabilir liste." },
  { href: "/hicri-takvim", label: "Hicri Takvim", description: "Bugünün Hicri tarihi ve aylar." },
  { href: "/ozel-gunler", label: "Kandiller ve Özel Günler", description: "Kandil geceleri, bayramlar ve tarihleri." },
  { href: "/tarih-cevirici", label: "Hicri–Miladi Tarih Çevirici", description: "Hicri, Rumi ve Miladi tarihleri birbirine çevirin." },
];

export function diniRelated(exclude: string) {
  return diniAraclar.filter((tool) => tool.href !== exclude).map(({ href, label }) => ({ href, label }));
}

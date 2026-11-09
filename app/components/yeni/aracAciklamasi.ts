// Grup sayfalarindaki kisa aciklamalar: her aracin kendi sayfasindaki meta aciklamadan okunur (derleme aninda,
// yalnizca sunucuda). Boylece ayni metin iki yerde tutulmaz. Dinamik rotalarda (ceyrek altin gibi) aciklama yoktur.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const onbellek = new Map<string, string | undefined>();

// Aciklamasi sablon metinle ya da yardimci fonksiyonla yazilan sayfalar icin elle yazilmis kisa aciklamalar.
const ELLE: Readonly<Record<string, string>> = {
  "/brutten-nete-maas-hesaplama": "Brüt maaştan SGK, işsizlik, gelir ve damga vergisi kesintileriyle net maaşı hesapla.",
  "/iki-tarih-arasi-gun-hesaplama": "İki tarih arasında kaç gün, hafta, ay ve yıl olduğunu hesapla.",
  "/kacinci-hafta": "Bugünün ya da seçtiğin tarihin yılın kaçıncı haftası olduğunu bul.",
  "/tarihe-gun-ekleme": "Bir tarihe gün, hafta veya ay ekleyip çıkararak yeni tarihi bul.",
  "/is-gunu-hesaplama": "İki tarih arasındaki iş günlerini hafta sonu ve resmî tatiller hariç say.",
  "/dogdugum-gun-hangi-gun": "Doğduğun tarihin haftanın hangi gününe denk geldiğini öğren.",
  "/roma-rakamlari-cevirme": "Sayıları Roma rakamına, Roma rakamlarını sayıya çevir.",
  "/kombi-kac-kw-hesaplama": "Evin metrekaresine ve yalıtımına göre gereken kombi gücünü (kW) hesapla.",
  "/petek-dilim-hesaplama": "Oda büyüklüğüne göre kaç dilim petek (radyatör) gerektiğini hesapla.",
  "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama": "Güçten (kW) akımı, akımdan gücü ve motor akımını hesapla.",
  "/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama": "Akım ve hat uzunluğuna göre uygun kablo kesitini (mm²) seç.",
  "/kva-kw-hesaplama": "Görünür güç (kVA) ile aktif gücü (kW) güç faktörüyle birbirine çevir.",
  "/demir-agirlik-hesaplama": "İnşaat demirinin çapına ve boyuna göre ağırlığını kg olarak hesapla.",
  "/sac-agirlik-hesaplama": "Sac levhanın ölçülerine ve kalınlığına göre ağırlığını hesapla.",
  "/tank-hacmi-hesaplama": "Silindir ve dikdörtgen tankların hacmini ve doluluk miktarını hesapla.",
};

export function aracAciklamasi(href: string): string | undefined {
  if (ELLE[href]) return ELLE[href];
  if (onbellek.has(href)) return onbellek.get(href);
  const dosya = join(process.cwd(), "app", ...href.split("/").filter(Boolean), "page.tsx");
  let sonuc: string | undefined;
  if (existsSync(dosya)) {
    const kaynak = readFileSync(dosya, "utf8");
    const m =
      kaynak.match(/\bdescription:\s*\n?\s*"((?:[^"\\]|\\.){20,})"/) ??
      kaynak.match(/\bconst description\s*=\s*\n?\s*"((?:[^"\\]|\\.){20,})"/);
    if (m) {
      // Ilk cumle yeterli; liste sayfasinda uzun aciklama okunmaz.
      const metin = m[1].replace(/\\"/g, '"').replace(/\\'/g, "'");
      const ilk = metin.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? metin;
      sonuc = ilk.length > 170 ? `${ilk.slice(0, 167).replace(/\s+\S*$/, "")}…` : ilk;
    }
  }
  onbellek.set(href, sonuc);
  return sonuc;
}

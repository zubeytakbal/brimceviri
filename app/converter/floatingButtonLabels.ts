// Favori ve baglanti kopyalama dugmelerinin dile gore etiketleri (Turkce sayfada Turkce, digerlerinde Ingilizce
// ya da dilin kendi karsiligi). Bilinmeyen dil Ingilizceye duser.
import { localeFromPathname } from "./relatedTools";

type Labels = { favoriteAdd: string; favoriteRemove: string; copyLink: string; linkCopied: string };

const LABELS: Record<string, Labels> = {
  tr: { favoriteAdd: "Favorilere ekle", favoriteRemove: "Favorilerden çıkar", copyLink: "Bağlantıyı kopyala", linkCopied: "Bağlantı kopyalandı" },
  en: { favoriteAdd: "Add to favorites", favoriteRemove: "Remove from favorites", copyLink: "Copy link", linkCopied: "Link copied" },
  de: { favoriteAdd: "Zu Favoriten hinzufügen", favoriteRemove: "Aus Favoriten entfernen", copyLink: "Link kopieren", linkCopied: "Link kopiert" },
  uz: { favoriteAdd: "Sevimlilarga qo'shish", favoriteRemove: "Sevimlilardan olib tashlash", copyLink: "Havolani nusxalash", linkCopied: "Havola nusxalandi" },
  ar: { favoriteAdd: "أضف إلى المفضلة", favoriteRemove: "إزالة من المفضلة", copyLink: "نسخ الرابط", linkCopied: "تم نسخ الرابط" },
};

export function getFloatingButtonLabels(pathname: string): Labels {
  return LABELS[localeFromPathname(pathname)] ?? LABELS.en;
}

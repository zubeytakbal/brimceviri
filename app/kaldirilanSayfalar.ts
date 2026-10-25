// Bölüm bölüm kaldırılan sayfalar (Ekim 2026 temizliği). Yönlendirmeler, site haritası ve derleme sonrası bağlantı
// düzeltmesi bu birleşik listeyi kullanır; listeler kendi bölümlerinin dosyalarında.
import { KALDIRILAN_SAAT_SAYFALARI } from "./components/saat/kaldirilanSaatSayfalari";
import { KALDIRILAN_BILIM_SAYFALARI } from "./kaldirilanBilimSayfalari";
import { KALDIRILAN_HESAP_SAYFALARI } from "./kaldirilanHesapSayfalari";

export const KALDIRILAN_SAYFALAR: Readonly<Record<string, string>> = {
  ...KALDIRILAN_SAAT_SAYFALARI,
  ...KALDIRILAN_BILIM_SAYFALARI,
  ...KALDIRILAN_HESAP_SAYFALARI,
};

export const sayfaKalkti = (path: string) => Object.hasOwn(KALDIRILAN_SAYFALAR, path);

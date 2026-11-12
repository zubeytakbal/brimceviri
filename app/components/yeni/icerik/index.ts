// Elle yazilmis icerigi olan kategoriler. Burada olmayan kategori eski (liste) duzeninde kalir.
import type { BirlesikIcerik, KategoriIcerigi } from "./tipler";
import { alanIcerigi } from "./alan";
import { hacimIcerigi } from "./hacim";
import { elektrikIcerigi } from "./elektrik";
import { kutleIcerigi } from "./kutle";
import { radyasyonIcerigi } from "./radyasyon";
import { uzunlukIcerigi } from "./uzunluk";

export const kategoriIcerikleri: Record<string, KategoriIcerigi> = {
  uzunluk: uzunlukIcerigi,
  alan: alanIcerigi,
  hacim: hacimIcerigi,
  kutle: kutleIcerigi,
};

// Birlesik kategori sayfalari (app/converter/siteYapisi.ts BIRLESIK_KATEGORILER ile ayni anahtarlar).
export const birlesikIcerikleri: Record<string, BirlesikIcerik> = {
  radyasyon: radyasyonIcerigi,
  elektrik: elektrikIcerigi,
};

// Elle yazilmis icerigi olan kategoriler. Burada olmayan kategori eski (liste) duzeninde kalir.
import type { KategoriIcerigi } from "./tipler";
import { alanIcerigi } from "./alan";
import { hacimIcerigi } from "./hacim";
import { uzunlukIcerigi } from "./uzunluk";

export const kategoriIcerikleri: Record<string, KategoriIcerigi> = {
  uzunluk: uzunlukIcerigi,
  alan: alanIcerigi,
  hacim: hacimIcerigi,
};

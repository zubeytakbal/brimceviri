// Elle yazilmis icerigi olan kategoriler. Burada olmayan kategori eski (liste) duzeninde kalir.
import type { KategoriIcerigi } from "./tipler";
import { uzunlukIcerigi } from "./uzunluk";

export const kategoriIcerikleri: Record<string, KategoriIcerigi> = {
  uzunluk: uzunlukIcerigi,
};

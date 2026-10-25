// "Bilim" bölümü: hesap bölümü gibi saat bölümünün araç düzeniyle (kendi üst menüsü, alt bilgisi, telefonda açılır
// bölümler) ama kendi adı ve sarı vurgusuyla çizilir. Adresler değişmez. Menü ve arama verisi bilimListeleri.ts'te;
// bu dosya her sayfada yüklendiği için yalnızca adres denetimini içerir.
const BILIM_YOLU = /^\/(bilim-hesaplayicilari|gokcisimleri-ozellikleri|gokcisimleri-karsilastirma|gezegenlerde-kac-kilo-gelirim)(\/|$)/;

/** Bilim bölümünün menüsü ve alt bilgisiyle çizilen sayfalar. */
export function isBilimAraci(pathname: string) {
  return BILIM_YOLU.test(pathname);
}

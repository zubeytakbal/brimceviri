// Ters yönlü çift sayfaların birleştirilmesi (ör. metre-kilometre → kilometre-metre). İki yön aynı sayfada anlatılır;
// kalan yön Search Console'un son 3 ayında (18 Temmuz – 17 Ekim 2026) daha çok tıklanan, eşitlikte daha çok gösterim alan
// yöndür, ikisi de veri almamışsa listede önce gelen yön. Kaldırılan adres kalıcı (301) olarak kalan sayfaya yönlenir
// (scripts/postbuild.ts); bu satırları silmek birleştirmeyi geri alır.
// 21 Ekim 2026: birleştirmeden sonra da aranan 13 ters yön (son 3 ayda 5+ tıklama: dönüm-dekar, psi-bar, dekar-metrekare,
// milimetre-santimetre, santimetre-metre, miligram-gram, litre-metreküp, metre-kilometre, dönüm-metrekare, galon-litre,
// saniye-milisaniye, kilogram-ton, kilowatt-watt) yeniden kendi sayfasında.
// 21 Ekim 2026: site sahibinin kararıyla bütün ters yönler yeniden kendi sayfasında; liste boş.
export const MERGED_PAIRS: Readonly<Record<string, string>> = {};

export const canonicalPairSlug = (slug: string) => MERGED_PAIRS[slug] ?? slug;
export const isMergedAway = (slug: string) => Object.hasOwn(MERGED_PAIRS, slug);

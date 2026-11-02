// Türkçe ana sayfadaki "Sık yapılan dönüşümler" listesi: her satırda bir dönüşüm ve hemen yanında ters yönü.
// Sıra Search Console verisine göre (ağustos–kasım 2026, en çok tıklanan Türkçe dönüşüm sayfaları).
export type PopulerCift = [ileri: { ad: string; href: string }, ters: { ad: string; href: string }];

const cift = (a: string, b: string, ileriSlug: string, tersSlug: string): PopulerCift => [
  { ad: `${a} → ${b}`, href: `/${ileriSlug}` },
  { ad: `${b} → ${a}`, href: `/${tersSlug}` },
];

export const populerDonusumler: PopulerCift[] = [
  cift("metrekare", "dönüm", "metrekare-donum", "donum-metrekare"),
  cift("24 ayar", "22 ayar altın", "24-ayar-altin-22-ayar-altin", "22-ayar-altin-24-ayar-altin"),
  cift("dekar", "dönüm", "dekar-donum", "donum-dekar"),
  cift("bar", "psi", "bar-psi", "psi-bar"),
  cift("metreküp", "litre", "metrekup-litre", "litre-metrekup"),
  cift("kilogram", "gram", "kilogram-gram", "gram-kilogram"),
  cift("fit", "metre", "fit-metre", "metre-fit"),
  cift("santimetre", "milimetre", "santimetre-milimetre", "milimetre-santimetre"),
  cift("megabayt", "gigabayt", "megabayt-gigabayt", "gigabayt-megabayt"),
  cift("kilometre", "metre", "kilometre-metre", "metre-kilometre"),
  cift("varil", "litre", "varil-litre", "litre-varil"),
  cift("metrekare", "dekar", "metrekare-dekar", "dekar-metrekare"),
  cift("mililitre", "litre", "mililitre-litre", "litre-mililitre"),
  cift("inç", "santimetre", "inc-santimetre", "santimetre-inc"),
  cift("ton", "kilogram", "ton-kilogram", "kilogram-ton"),
  cift("metre", "santimetre", "metre-santimetre", "santimetre-metre"),
  cift("hektar", "dönüm", "hektar-donum", "donum-hektar"),
  cift("ons", "gram", "ons-gram", "gram-ons"),
];

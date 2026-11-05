// Yeni yapiya tasinan Turkce sayfalarin eski ve yeni adresleri arasinda ceviri.
// Hafif modul: istemciye yalnizca kucuk TASINAN_CIFTLER haritasi gider.
import { TASINAN_CIFTLER } from "./tasinanCiftler.generated";
import { yeniYapiKategorileri } from "./siteYapisi";

/**
 * Eski adresi yenisine cevirir: "/santimetre-inc" -> "/uzunluk/santimetre-inc",
 * "/kategoriler/uzunluk" -> "/uzunluk". Hash ve sorgu korunur; diger adresler aynen doner.
 */
export function guncelHref(href: string) {
  const cift = /^\/([a-z0-9-]+)([?#].*)?$/.exec(href);
  if (cift) {
    const kategori = TASINAN_CIFTLER[cift[1]];
    return kategori ? `/${kategori}/${cift[1]}${cift[2] ?? ""}` : href;
  }
  const kategori = /^\/kategoriler\/([a-z0-9-]+)([?#].*)?$/.exec(href);
  if (kategori && yeniYapiKategorileri.has(kategori[1])) return `/${kategori[1]}${kategori[2] ?? ""}`;
  return href;
}

/** guncelHref'in tersi: yeni adresi eski (dil eslemelerinin bildigi) adrese cevirir. */
export function eskiHref(pathname: string) {
  const parca = pathname.split("/").filter(Boolean);
  if (parca.length === 2 && yeniYapiKategorileri.has(parca[0]) && TASINAN_CIFTLER[parca[1]] === parca[0]) {
    return `/${parca[1]}`;
  }
  if (parca.length === 1 && yeniYapiKategorileri.has(parca[0])) return `/kategoriler/${parca[0]}`;
  return pathname;
}

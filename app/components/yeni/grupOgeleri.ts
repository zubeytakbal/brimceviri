// Grup sayfasi listeleri: aciklamalar derleme aninda dosyadan okunur (yalniz sunucu). Ana sayfa bu dosyayi kullanmaz.
import { categoryPages } from "../../converter/categoryPages";
import { birimGruplari, turkceKategoriYolu } from "../../converter/siteYapisi";
import { unitRegistry } from "../../converter/unitRegistry";
import { aracAciklamasi } from "./aracAciklamasi";
import type { AnaSayfaGrubu } from "./anaSayfaVerisi";
import type { GrupOgesi } from "./GrupSayfasi";
import { kategoriAdi } from "./gruplar";

export function hesapOgeleri(grup: AnaSayfaGrubu): GrupOgesi[] {
  return grup.linkler.map((l) => ({ ...l, aciklama: aracAciklamasi(l.href) }));
}

export function birimOgeleri(grup: AnaSayfaGrubu): GrupOgesi[] {
  const grupTanimi = birimGruplari.find((g) => g.id === grup.slug);
  return (grupTanimi?.kategoriler ?? []).map((slug) => {
    const sayfa = categoryPages.find((c) => c.slug === slug);
    const birim = unitRegistry.filter((u) => u.category === sayfa?.category && u.tr).length;
    return {
      href: turkceKategoriYolu(slug),
      ad: kategoriAdi(slug),
      aciklama: `${birim} birim${sayfa?.description ? `. ${sayfa.description.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? ""}` : ""}`,
    };
  });
}

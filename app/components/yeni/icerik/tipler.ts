// Kategori sayfasinin elle yazilmis icerigi (docs/icerik-rehberi.md kurallarina gore).
import type { ReactNode } from "react";
import type { FaqItem } from "../../../converter/faqSchema";
import type { CokluGrup } from "../CokluCevirici";

export type KategoriIcerigi = {
  /** <title> ve meta aciklama */
  baslik: string;
  aciklama: string;
  /** H1 altindaki tek paragraf */
  ozet: ReactNode;
  cevirici: { gruplar: CokluGrup[]; baslangic: { birim: string; deger: number } };
  ilgili: { href: string; ad: string }[];
  /** Populer donusumler: cift sluglari, Search Console gosterimine gore sirali. Eksik kalanlar listenin sonuna eklenir. */
  populer?: string[];
  /** Hesaplanan karsilastirma tablosundaki birimler (sembol) */
  tablo: { baslik: string; birimler: string[] };
  bolumler: { id: string; baslik: string; govde: ReactNode }[];
  sss: FaqItem[];
  kaynaklar: { ad: string; href?: string }[];
  /** ISO tarih */
  guncelleme: string;
};

/** Birlesik kategori sayfasinin (/radyasyon) bir parcasi: kendi ceviricisi olan uye kategori. */
export type BirlesikParca = {
  /** Bolum ve sekme kimligi (#esdeger-doz) */
  id: string;
  /** categoryPages slug'i (radyasyon-dozu) */
  kategori: string;
  /** Kategori birbirine cevrilemeyen birimleri bir arada tutuyorsa (elektrik: V ve A) cevirinin alt kategorisi
   * (elektrik_gerilim); birimler buna gore suzulur. */
  altKategori?: string;
  /** Sekmedeki kisa ad */
  sekme: string;
  baslik: string;
  govde: ReactNode;
  cevirici: { gruplar: CokluGrup[]; baslangic: { birim: string; deger: number } };
  /** degerler verilirse matris yerine deger tablosu: satirlar birimler[0] cinsinden, diger birimler birer sutun. */
  tablo: { baslik: string; birimler: string[]; degerler?: number[] };
};

/** Birlesik kategori sayfasinin elle yazilmis icerigi. */
export type BirlesikIcerik = {
  baslik: string;
  aciklama: string;
  /** H1 */
  h1: string;
  ozet: ReactNode;
  /** Parcalardan once gelen genel bolumler */
  giris: { id: string; baslik: string; govde: ReactNode }[];
  parcalar: BirlesikParca[];
  /** Parcalardan sonra gelen bolumler */
  bolumler: { id: string; baslik: string; govde: ReactNode }[];
  ilgili: { href: string; ad: string }[];
  sss: FaqItem[];
  kaynaklar: { ad: string; href?: string }[];
  guncelleme: string;
};

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

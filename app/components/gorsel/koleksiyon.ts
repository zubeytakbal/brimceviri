// Araç koleksiyonları: aynı panel, üst çubuk ve sayfa iskeleti farklı araç listeleriyle kullanılır.
import {
  AG_ARACLARI,
  AG_ARACLARI_YOLU,
  AG_KATEGORILER,
} from "../../converter/ag/agAraclari";
import {
  DOSYA_ARACLARI,
  DOSYA_ARACLARI_YOLU,
  DOSYA_KATEGORILER,
  type AracIkon,
} from "../../converter/gorsel/dosyaAraclari";

export type KoleksiyonId = "dosya" | "ag";

export type Koleksiyon = {
  ad: string;
  yol: string;
  tumEtiketi: string;
  araclar: Array<{
    href: string;
    baslik: string;
    aciklama: string;
    kategoriler: string[];
    ikon: AracIkon;
    yeni?: boolean;
  }>;
  kategoriler: Array<{ id: string; ad: string }>;
  /** Üst çubukta doğrudan görünenler */
  oneCikan: string[];
  guven: string[];
};

export const KOLEKSIYONLAR: Record<KoleksiyonId, Koleksiyon> = {
  dosya: {
    ad: "Dosya Araçları",
    yol: DOSYA_ARACLARI_YOLU,
    tumEtiketi: "Tüm dosya araçları",
    araclar: DOSYA_ARACLARI,
    kategoriler: DOSYA_KATEGORILER,
    oneCikan: [
      "/gorsel-donusturucu",
      "/resim-boyutlandirma",
      "/fotograf-boyutu-kucultme",
      "/resimden-yaziya-cevirme",
      "/pdf-birlestirme",
      "/e-okul-fotograf-kucultme",
    ],
    guven: ["Ücretsiz", "Kayıt yok", "Filigran yok", "Dosyalar yüklenmez"],
  },
  ag: {
    ad: "Ağ Araçları",
    yol: AG_ARACLARI_YOLU,
    tumEtiketi: "Tüm ağ araçları",
    araclar: AG_ARACLARI,
    kategoriler: AG_KATEGORILER,
    oneCikan: [
      "/subnet-hesaplama",
      "/ip-adresi-donusturucu",
      "/indirme-suresi-hesaplama",
      "/hash-hesaplama",
      "/port-numaralari",
    ],
    guven: [
      "Ücretsiz",
      "Kayıt yok",
      "Tarayıcıda hesaplanır",
      "Veri gönderilmez",
    ],
  },
};

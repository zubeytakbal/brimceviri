// İl rakımı sayfaları için ile özel bağlam: ilçe rakımları, bölge sırası, en yakın illerle
// rakım farkı ve rakıma göre mutfak notu.
import { calculateAltitudeEffect } from "../mountainAltitudeEffect";
import { ILCE_EKSIK, ILCE_RAKIMLARI } from "./ilceRakimlari";
import { distancesFrom } from "./provinceDistances";
import { findProvince, turkeyProvinces } from "./turkeyProvinces";

export type IlceSatir = { ad: string; rakim: number; merkez: boolean };

export function ilceler(ilId: string): IlceSatir[] {
  return (ILCE_RAKIMLARI[ilId] ?? []).map(([ad, rakim, merkez]) => ({ ad, rakim, merkez: merkez === true }));
}

/** Rakımı verilemeyen ilçeler: merkezi dik yamaçta olanlar ve merkez noktası bulunamayanlar. */
export function eksikIlceler(ilId: string) {
  const liste = ILCE_EKSIK[ilId] ?? [];
  return { egimli: liste.filter((x) => x[1]).map((x) => x[0]), bulunamayan: liste.filter((x) => !x[1]).map((x) => x[0]) };
}

/**
 * Listelenen ilçeler arası rakım özeti. "kesin" false ise listede olmayan ilçeler var;
 * en yüksek/en alçak yalnızca listelenenler için geçerlidir. Tek ilçeli illerde null.
 */
export function ilceOzeti(ilId: string) {
  const liste = ilceler(ilId);
  if (liste.length < 2) return null;
  const sirali = liste.slice().sort((a, b) => b.rakim - a.rakim);
  const enYuksek = sirali[0];
  const enAlcak = sirali[sirali.length - 1];
  const eksik = eksikIlceler(ilId);
  const kesin = eksik.egimli.length + eksik.bulunamayan.length === 0;
  return { sayi: liste.length, enYuksek, enAlcak, fark: enYuksek.rakim - enAlcak.rakim, eksik, kesin };
}

/** Türkiye genelinde en yüksek ilçeler (il merkezleri hariç). */
export function enYuksekIlceler(adet = 20) {
  return Object.entries(ILCE_RAKIMLARI)
    .flatMap(([ilId, liste]) => liste.filter((x) => x[2] !== true).map(([ad, rakim]) => ({ ilId, il: findProvince(ilId)?.name ?? ilId, ad, rakim })))
    .sort((a, b) => b.rakim - a.rakim)
    .slice(0, adet);
}

/** Aynı coğrafi bölgedeki iller, rakıma göre sıralı. */
export function bolgeSirasi(ilId: string) {
  const il = findProvince(ilId);
  if (!il) return null;
  const liste = turkeyProvinces.filter((p) => p.region === il.region).sort((a, b) => b.elevationM - a.elevationM);
  return { bolge: il.region, sira: liste.findIndex((p) => p.id === ilId) + 1, liste };
}

/** Karayoluyla en yakın iller ve il merkezleri arası rakım farkı. */
export function yakinIllerRakim(ilId: string, adet = 5) {
  const il = findProvince(ilId);
  if (!il) return [];
  return distancesFrom(il)
    .slice(0, adet)
    .map((r) => ({ il: r.province, km: r.road, fark: r.province.elevationM - il.elevationM }));
}

export type MutfakNotu = { baslik: string; metin: string };

/**
 * Rakıma göre pişirme notu. Yüksek rakımda su daha düşük sıcaklıkta kaynar; haşlama uzar,
 * kabartmalı hamur işleri daha çok kabarır. Eşikler yaygın yüksek rakım pişirme rehberlerinden
 * (900 m ≈ 3.000 ft üstü ayar önerilir).
 */
export function mutfakNotu(rakim: number): MutfakNotu {
  const etki = calculateAltitudeEffect(rakim);
  const kaynama = etki ? etki.waterBoilingPointC : 100;
  const dusus = 100 - kaynama;
  const k = kaynama.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
  const d = dusus.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
  if (rakim < 300) {
    return {
      baslik: "Deniz seviyesine yakın: tarif ayarı gerekmez",
      metin: `Su yaklaşık ${k} °C'de kaynar; fark ölçülemeyecek kadar küçüktür. Kek, ekmek ve haşlama süreleri tariflerde yazdığı gibidir.`,
    };
  }
  if (rakim < 900) {
    return {
      baslik: "Orta yükseklik: küçük farklar",
      metin: `Su yaklaşık ${k} °C'de, deniz seviyesinden ${d} derece düşükte kaynar. Kuru fasulye ve nohut gibi uzun haşlanan baklagiller biraz daha geç pişer; kek ve ekmek tariflerinde ayar genellikle gerekmez.`,
    };
  }
  if (rakim < 1500) {
    return {
      baslik: "Yüksek rakım: haşlama uzar, kek kabarır",
      metin: `Su yaklaşık ${k} °C'de kaynar (${d} derece düşük). Haşlanan yumurta, makarna ve baklagiller deniz kıyısına göre daha uzun pişer; düdüklü tencere farkı kapatır. Kek ve kabartmalı hamurlar fazla kabarıp çökebilir: kabartma tozunu biraz azaltmak, fırını 10–15 °C yüksek tutmak yaygın önerilerdir.`,
    };
  }
  return {
    baslik: "Çok yüksek rakım: düdüklü tencere fark yaratır",
    metin: `Su yaklaşık ${k} °C'de kaynar (${d} derece düşük). Açık tencerede haşlama belirgin şekilde uzar; baklagil ve et için düdüklü tencere önerilir. Kek ve ekmek tariflerinde kabartma tozu ile şekeri azaltmak, sıvıyı biraz artırmak ve fırını 15–20 °C yüksek tutmak gerekir. Hamur daha çabuk kurur; mayalı hamurun mayalanma süresi kısalır.`,
  };
}

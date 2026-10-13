// U değeri aracındaki katman seçenekleri. Değerler sitenin ısıl iletkenlik tablosundan okunur
// (tipik değerler); kullanıcıdan ürün etiketindeki beyan değerini (λD) girmesi istenir.
// Tuğla, gazbeton ve sıva gibi türü çok değişken duvar malzemeleri bilerek hazır listeye konmaz.
import { conductivityPresets } from "../heatConduction";

const IDS: Array<[string, string]> = [
  ["concrete", "Beton"],
  ["eps", "EPS (yalıtım levhası)"],
  ["xps", "XPS (yalıtım levhası)"],
  ["rockWool", "Taş yünü"],
  ["glassWool", "Cam yünü"],
  ["pur", "Poliüretan köpük (PUR)"],
  ["wood", "Ahşap"],
];

export type LayerPreset = { id: string; label: string; lambda: number | null };

export const LAYER_PRESETS: LayerPreset[] = [
  ...IDS.map(([id, label]) => {
    const p = conductivityPresets.tr.find((x) => x.id === id);
    if (!p) throw new Error(`layerPresets: ${id} yok`);
    return { id, label, lambda: Number(p.value) };
  }),
  { id: "custom", label: "Diğer (λ değerini girin)", lambda: null },
];

// Birim katsayıları tanım değerleriyle karşılaştırılır (NIST SP 811 Ek B, BIPM SI Broşürü).
// 2026-10'da cal/(g·K) katsayısı 1000 kat küçük girilmişti; bu test benzer hataları derlemede yakalar.
import { describe, expect, it } from "vitest";
import { convert } from "../app/converter/convert";
import { unitRegistry } from "../app/converter/unitRegistry";

const K: Record<string, Record<string, number>> = {
  uzunluk: { m: 1, km: 1e3, cm: 1e-2, mm: 1e-3, ft: 0.3048, in: 0.0254, yd: 0.9144, mi: 1609.344, nmi: 1852, Å: 1e-10, AU: 149597870700 },
  alan: { "m²": 1, ha: 1e4, a: 100, "ft²": 0.09290304, ac: 4046.8564224, dönüm: 1000, dekar: 1000, "km²": 1e6 },
  hacim: { "m³": 1, L: 1e-3, mL: 1e-6, gal: 0.003785411784, "imp gal": 0.00454609, "fl oz": 2.95735295625e-5, bbl: 0.158987294928, "ft³": 0.028316846592 },
  kutle: { kg: 1, g: 1e-3, mg: 1e-6, ton: 1000, lb: 0.45359237, oz: 0.028349523125, ozt: 0.0311034768, ct: 0.0002, gr: 6.479891e-5, st: 6.35029318 },
  hiz: { "m/s": 1, "km/h": 1 / 3.6, mph: 0.44704, knot: 1852 / 3600, "ft/s": 0.3048, c: 299792458 },
  ivme: { "m/s²": 1, g0: 9.80665, "ft/s²": 0.3048, gal: 0.01 },
  basinc: { Pa: 1, kPa: 1e3, bar: 1e5, mbar: 100, atm: 101325, psi: 6894.757293168, mmHg: 133.322387415, Torr: 101325 / 760, "kgf/cm²": 98066.5, at: 98066.5, mmH2O: 9.80665 },
  enerji: { J: 1, kJ: 1e3, kWh: 3.6e6, Wh: 3600, cal: 4.184, kcal: 4184, eV: 1.602176634e-19 },
  guc: { W: 1, kW: 1e3, MW: 1e6, hp: 735.49875, HP: 745.69987158227, TR: 3516.8528420667 },
  kuvvet: { N: 1, kN: 1e3, dyn: 1e-5, lbf: 4.4482216152605, kgf: 9.80665 },
  tork: { "N·m": 1, "kN·m": 1e3, "kgf·m": 9.80665, "lb·ft": 1.3558179483314 },
  ozgul_isi: { "J/kg·K": 1, "kJ/kg·K": 1e3, "cal/g·K": 4184, "Btu/lb·°F": 4186.8 },
  isi_akisi: { "W/m²": 1, "kW/m²": 1e3, "cal/cm²·s": 41840 },
  isil_iletkenlik: { "W/m·K": 1, "kW/m·K": 1e3, "W/cm·K": 100, "Btu/h·ft·°F": 1.730734666 },
  viskozite_dinamik: { "Pa·s": 1, "mPa·s": 1e-3, P: 0.1, cP: 1e-3 },
  viskozite_kinematik: { "m²/s": 1, "mm²/s": 1e-6, cSt: 1e-6 },
  debi_hacimsel: { "m³/s": 1, "L/s": 1e-3, "m³/h": 1 / 3600, "L/min": 1e-3 / 60, cfm: 0.00047194745, gpm: 6.30901964e-5 },
  manyetik_alan: { "A/m": 1, "kA/m": 1e3, Oe: 1000 / (4 * Math.PI) },
  momentum: { "kg·m/s": 1, "N·s": 1, "lb·ft/s": 0.138254954376 },
  aci: { rad: 1, "°": Math.PI / 180, gon: Math.PI / 200, tur: 2 * Math.PI },
  zaman: { s: 1, ms: 1e-3, min: 60, h: 3600, d: 86400 },
  konsantrasyon: { "%": 1e-2, "‰": 1e-3, ppm: 1e-6, ppb: 1e-9, ppt: 1e-12, "g/kg": 1e-3, "mg/kg": 1e-6, "µg/kg": 1e-9 },
  radyasyon_dozu: { Sv: 1, mSv: 1e-3, "µSv": 1e-6, nSv: 1e-9, rem: 0.01, mrem: 1e-5 },
  aydinlatma_siddeti: { lx: 1, klx: 1e3, fc: 10.763910417, ph: 1e4 },
};

const C: Array<[string, number, string, string, number]> = [
  ["frekans", 1, "GHz", "Hz", 1e9], ["frekans", 1, "kHz", "Hz", 1e3],
  ["kapasitans", 1, "F", "pF", 1e12], ["kapasitans", 1, "mF", "µF", 1e3],
  ["enduktans", 1, "H", "µH", 1e6], ["elektrik_yuk", 1, "C", "nC", 1e9],
  ["elektrik_direnc", 1, "MΩ", "Ω", 1e6], ["elektrik", 1, "kV", "mV", 1e6], ["elektrik", 1, "kA", "mA", 1e6],
  ["manyetik_aki", 1, "Wb", "nWb", 1e9],
  ["veri", 1, "KiB", "B", 1024], ["veri", 1, "MB", "KB", 1000], ["veri", 1, "B", "bit", 8], ["veri", 1, "TiB", "GiB", 1024], ["veri", 1, "Gbit", "MB", 125],
  ["debi_kutlesel", 1, "kg/s", "g/h", 3.6e6], ["debi", 1, "m³/h", "L/min", 1000 / 60],
  ["yogunluk", 1, "g/cm³", "kg/m³", 1000], ["yogunluk", 1, "lb/ft³", "kg/m³", 16.01846337], ["yogunluk", 1, "lb/gal (US)", "kg/m³", 119.8264273],
  ["acisal_hiz", 1, "rpm", "rad/s", (2 * Math.PI) / 60], ["acisal_hiz", 1, "Hz", "rpm", 60],
  ["kan_sekeri", 1, "mmol/L", "mg/dL", 18.016], ["vitamin_d", 1, "ng/mL", "nmol/L", 2.496],
  ["altin_ayar", 1, "24K", "18K", 4 / 3], ["gumus_ayar", 1, "999", "925", 999 / 925],
  ["sicaklik", 37, "C", "F", 98.6], ["sicaklik", 0, "C", "R", 491.67], ["sicaklik", 80, "Re", "C", 100],
  ["enerji", 1, "Btu", "J", 1055.05585], ["enerji", 1, "th", "MJ", 105.5056], ["guc", 1, "BTU/h", "W", 0.29307107],
  ["hacim", 1, "imp gal", "L", 4.54609], ["hacim", 1, "pt", "mL", 473.176473], ["hacim", 1, "qt", "L", 0.946352946],
  ["kutle", 1, "q", "kg", 100], ["kutle", 1, "Da", "kg", 1.66053906660e-27], ["uzunluk", 1, "ly", "m", 9.4607304725808e15], ["uzunluk", 1, "pc", "m", 3.0856775814914e16], ["uzunluk", 1, "ftm", "m", 1.8288], ["uzunluk", 1, "fur", "m", 201.168],
  ["alan", 1, "in²", "cm²", 6.4516], ["alan", 1, "yd²", "m²", 0.83612736],
  ["ivme", 1, "in/s²", "m/s²", 0.0254],
];

describe("birim katsayıları", () => {
  for (const [cat, units] of Object.entries(K)) {
    it(`${cat} katsayıları tanım değerleriyle uyumlu`, () => {
      const reg = new Map(unitRegistry.filter((e) => e.category === cat && e.siFactor !== undefined).map((e) => [e.symbol, e.siFactor!]));
      const [base] = Object.keys(units);
      for (const [sym, v] of Object.entries(units)) {
        expect(reg.has(sym), `${cat} ${sym} kayıtta yok`).toBe(true);
        const ratio = reg.get(sym)! / reg.get(base)! / (v / units[base]);
        expect(ratio, `${cat} ${sym}`).toBeCloseTo(1, 4);
      }
    });
  }

  it.each(C)("%s: %d %s → %s = %d", (cat, v, a, b, exp) => {
    expect(convert(cat, v, a, b) / exp).toBeCloseTo(1, 3);
  });
});

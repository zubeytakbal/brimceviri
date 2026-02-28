export function convert(
  category: string,
  value: number,
  from: string,
  to: string
): number {
  if (!Number.isFinite(value)) return NaN;

  /* 1) ALAN */
  if (category === "alan") {
    const t: Record<string, number> = {
      "m²": 1,
      "cm²": 0.0001,
      "mm²": 0.000001,
      "km²": 1_000_000,
      ha: 10_000,
      "ft²": 0.092903,
      "in²": 0.00064516,
      ac: 4046.8564224
    };
    return (value * t[from]) / t[to];
  }

  /* 2) UZUNLUK */
  if (category === "uzunluk") {
    const t: Record<string, number> = {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      µm: 0.000001,
      nm: 1e-9,
      ft: 0.3048,
      in: 0.0254,
      yd: 0.9144,
      mi: 1609.344,
      nmi: 1852
    };
    return (value * t[from]) / t[to];
  }

  /* 3) HACİM */
  if (category === "hacim") {
    const t: Record<string, number> = {
      "m³": 1,
      L: 0.001,
      mL: 0.000001,
      "cm³": 0.000001,
      "ft³": 0.0283168,
      "in³": 0.0000163871,
      gal: 0.00378541
    };
    return (value * t[from]) / t[to];
  }

  /* 4) KÜTLE */
  if (category === "kutle") {
    const t: Record<string, number> = {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      ton: 1000,
      lb: 0.45359237,
      oz: 0.0283495231
    };
    return (value * t[from]) / t[to];
  }

  /* 5) YOĞUNLUK (10 birim) */
  if (category === "yogunluk") {
    const t: Record<string, number> = {
      "kg/m³": 1,
      "g/cm³": 1000,
      "g/mL": 1000,
      "kg/L": 1000,
      "g/L": 1,
      "mg/L": 0.001,
      "lb/ft³": 16.01846337,
      "lb/in³": 27679.90471,
      "lb/gal (US)": 119.826427,
      "slug/ft³": 515.378818
    };
    return (value * t[from]) / t[to];
  }

  /* 6) HIZ (10 birim) */
  if (category === "hiz") {
    const t: Record<string, number> = {
      "m/s": 1,
      "km/h": 1000 / 3600,
      "km/s": 1000,
      mph: 1609.344 / 3600,
      knot: 1852 / 3600,
      "ft/s": 0.3048,
      "m/min": 1 / 60,
      "km/min": 1000 / 60,
      "cm/s": 0.01,
      c: 299792458
    };
    return (value * t[from]) / t[to];
  }

  /* 7) İVME (10 birim) */
  if (category === "ivme") {
    const g0 = 9.80665;

    const t: Record<string, number> = {
      "m/s²": 1,
      "cm/s²": 0.01,
      "mm/s²": 0.001,
      "km/s²": 1000,
      "ft/s²": 0.3048,
      "in/s²": 0.0254,
      "m/min²": 1 / 3600,
      "ft/min²": 0.3048 / 3600,
      gal: 0.01,
      g0: g0
    };
    return (value * t[from]) / t[to];
  }

  /* 8) ZAMAN */
  if (category === "zaman") {
    const t: Record<string, number> = {
      s: 1,
      ms: 0.001,
      min: 60,
      h: 3600,
      day: 86400
    };
    return (value * t[from]) / t[to];
  }

  /* 9) AÇISAL HIZ */
  if (category === "acisal_hiz") {
    const t: Record<string, number> = {
      "rad/s": 1,
      "rad/min": 1 / 60,
      "rad/h": 1 / 3600,
      rpm: (2 * Math.PI) / 60,
      Hz: 2 * Math.PI,
      "°/s": Math.PI / 180,
      "°/min": Math.PI / (180 * 60),
      "°/h": Math.PI / (180 * 3600)
    };
    return (value * t[from]) / t[to];
  }

  /* 10) KUVVET */
  if (category === "kuvvet") {
    const t: Record<string, number> = {
      N: 1,
      kN: 1000,
      dyn: 0.00001,
      lbf: 4.4482216
    };
    return (value * t[from]) / t[to];
  }

  /* 11) TORK */
  if (category === "tork") {
    const t: Record<string, number> = {
      "N·m": 1,
      "kN·m": 1000,
      "lb·ft": 1.355817948
    };
    return (value * t[from]) / t[to];
  }

  /* 12) MOMENTUM */
  if (category === "momentum") {
    const t: Record<string, number> = {
      "kg·m/s": 1,
      "N·s": 1,
      "lb·ft/s": 0.138255
    };
    return (value * t[from]) / t[to];
  }

  /* 13) BASINÇ */
  if (category === "basinc") {
    const t: Record<string, number> = {
      Pa: 1,
      kPa: 1000,
      bar: 100000,
      mbar: 100,
      atm: 101325,
      at: 98066.5,
      psi: 6894.757,
      mmHg: 133.322,
      mmH2O: 9.80665
    };
    return (value * t[from]) / t[to];
  }

  /* 14) DİNAMİK VİSKOZİTE */
  if (category === "viskozite_dinamik") {
    const t: Record<string, number> = {
      "Pa·s": 1,
      "mPa·s": 0.001,
      P: 0.1,
      cP: 0.001
    };
    return (value * t[from]) / t[to];
  }

  /* 15) KİNEMATİK VİSKOZİTE */
  if (category === "viskozite_kinematik") {
    const t: Record<string, number> = {
      "m²/s": 1,
      "mm²/s": 0.000001,
      cSt: 0.000001
    };
    return (value * t[from]) / t[to];
  }

  /* 16) HACİMSEL DEBİ */
  if (category === "debi_hacimsel") {
    const t: Record<string, number> = {
      "m³/s": 1,
      "L/s": 0.001,
      "m³/h": 1 / 3600,
      "L/min": 0.001 / 60,
      cfm: 0.0283168 / 60,
      gpm: 0.00378541 / 60
    };
    return (value * t[from]) / t[to];
  }

  /* 17) KÜTLESEL DEBİ */
  if (category === "debi_kutlesel") {
    const t: Record<string, number> = {
      "kg/s": 1,
      "kg/h": 1 / 3600,
      "g/s": 0.001,
      "g/h": 0.001 / 3600
    };
    return (value * t[from]) / t[to];
  }

  /* 18) ENERJİ */
  if (category === "enerji") {
    const t: Record<string, number> = {
      J: 1,
      kJ: 1000,
      MJ: 1_000_000,
      Wh: 3600,
      kWh: 3_600_000,
      cal: 4.184,
      kcal: 4184,
      Btu: 1055.056,
      th: 1.05506e8,
      "quad BTU": 1.05506e18
    };
    return (value * t[from]) / t[to];
  }

  /* 19) GÜÇ */
  if (category === "guc") {
    const t: Record<string, number> = {
      W: 1,
      kW: 1000,
      MW: 1_000_000,
      hp: 745.7,
      HP: 745.7,
      CV: 735.49875
    };
    return (value * t[from]) / t[to];
  }

  /* 20) SICAKLIK */
  if (category === "sicaklik") {
    if (from === "C" && to === "F") return (value * 9) / 5 + 32;
    if (from === "F" && to === "C") return ((value - 32) * 5) / 9;
    if (from === "C" && to === "K") return value + 273.15;
    if (from === "K" && to === "C") return value - 273.15;
    if (from === "F" && to === "K") return ((value - 32) * 5) / 9 + 273.15;
    if (from === "K" && to === "F") return ((value - 273.15) * 9) / 5 + 32;
    return value;
  }

  /* 21) ISIL İLETKENLİK */
  if (category === "isil_iletkenlik") {
    const t: Record<string, number> = {
      "W/m·K": 1,
      "kW/m·K": 1000,
      "W/cm·K": 100,
      "Btu/h·ft·°F": 1.730735
    };
    return (value * t[from]) / t[to];
  }

  /* 22) ISI AKISI */
  if (category === "isi_akisi") {
    const t: Record<string, number> = {
      "W/m²": 1,
      "kW/m²": 1000,
      "cal/cm²·s": 41840
    };
    return (value * t[from]) / t[to];
  }

  /* 23) ÖZGÜL ISI */
  if (category === "ozgul_isi") {
    const t: Record<string, number> = {
      "J/kg·K": 1,
      "kJ/kg·K": 1000,
      "cal/g·K": 4.184,
      "Btu/lb·°F": 4186.8
    };
    return (value * t[from]) / t[to];
  }

  /* 24) ELEKTRİK DİRENCİ */
  if (category === "elektrik_direnc") {
    const t: Record<string, number> = {
      Ω: 1,
      kΩ: 1000,
      MΩ: 1_000_000
    };
    return (value * t[from]) / t[to];
  }

  /* 25) GERİLİM */
  if (category === "elektrik_gerilim") {
    const t: Record<string, number> = {
      V: 1,
      kV: 1000,
      mV: 0.001
    };
    return (value * t[from]) / t[to];
  }

  /* 26) AKIM */
  if (category === "elektrik_akim") {
    const t: Record<string, number> = {
      A: 1,
      mA: 0.001,
      kA: 1000
    };
    return (value * t[from]) / t[to];
  }

  /* 27) KAPASİTANS */
  if (category === "kapasitans") {
    const t: Record<string, number> = {
      F: 1,
      mF: 0.001,
      µF: 0.000001,
      nF: 1e-9,
      pF: 1e-12
    };
    return (value * t[from]) / t[to];
  }

  /* 28) ENDÜKTANS */
  if (category === "enduktans") {
    const t: Record<string, number> = {
      H: 1,
      mH: 0.001,
      µH: 0.000001
    };
    return (value * t[from]) / t[to];
  }

  /* 29) ELEKTRİK YÜKÜ */
  if (category === "elektrik_yuk") {
    const t: Record<string, number> = {
      C: 1,
      mC: 0.001,
      µC: 0.000001,
      nC: 1e-9
    };
    return (value * t[from]) / t[to];
  }

  /* 30) MANYETİK ALAN */
  if (category === "manyetik_alan") {
    const t: Record<string, number> = {
      "A/m": 1,
      "kA/m": 1000,
      Oe: 79.5775
    };
    return (value * t[from]) / t[to];
  }

  /* 31) MANYETİK AKI */
  if (category === "manyetik_aki") {
    const t: Record<string, number> = {
      Wb: 1,
      mWb: 0.001,
      µWb: 0.000001,
      nWb: 1e-9,
      weber: 1
    };
    return (value * t[from]) / t[to];
  }

  return value;
}
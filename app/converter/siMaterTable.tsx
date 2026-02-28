"use client";

type MasterRow = {
  unit: string;     // dönüştürülecek birim
  equality: string; // denklik
};

type MasterCategory = {
  id: string;
  property: string; // Özellik (Alan, Hız, vb.)
  siSymbol: string; // SI birim
  siName: string;   // SI birimin adı
  rows: MasterRow[];
};

const MASTER_DATA: MasterCategory[] = [
  // --- TEMEL MEKANİK BÜYÜKLÜKLER ---

  {
    id: "alan",
    property: "Alan",
    siSymbol: "1 m²",
    siName: "metrekare",
    rows: [
      { unit: "cm²", equality: "10 000 cm²" },
      { unit: "mm²", equality: "1 000 000 mm²" },
      { unit: "ft²", equality: "10.7639104 ft²" },
      { unit: "in²", equality: "1550.0031 in²" },
      { unit: "ha", equality: "0.0001 ha" },
      { unit: "acre", equality: "0.000247105 ac" }
    ]
  },

  {
    id: "uzunluk",
    property: "Uzunluk",
    siSymbol: "1 m",
    siName: "metre",
    rows: [
      { unit: "km", equality: "0.001 km" },
      { unit: "cm", equality: "100 cm" },
      { unit: "mm", equality: "1000 mm" },
      { unit: "ft", equality: "3.28084 ft" },
      { unit: "inç (in)", equality: "39.3701 in" },
      { unit: "yard", equality: "1.093613 yd" },
      { unit: "deniz mili", equality: "0.000539957 nmi" }
    ]
  },

  {
    id: "hacim",
    property: "Hacim",
    siSymbol: "1 m³",
    siName: "metreküp",
    rows: [
      { unit: "L", equality: "1000 L" },
      { unit: "mL", equality: "1 000 000 mL" },
      { unit: "ft³", equality: "35.3147 ft³" },
      { unit: "in³", equality: "61 023.7441 in³" },
      { unit: "gal (US)", equality: "264.172 gal" },
      { unit: "gal (UK)", equality: "219.969 gal" }
    ]
  },

  {
    id: "kutle",
    property: "Kütle",
    siSymbol: "1 kg",
    siName: "kilogram",
    rows: [
      { unit: "g", equality: "1000 g" },
      { unit: "mg", equality: "1 000 000 mg" },
      { unit: "ton (t)", equality: "0.001 t" },
      { unit: "lb (pound)", equality: "2.20462 lb" },
      { unit: "oz (ons)", equality: "35.27396 oz" }
    ]
  },

  {
    id: "yogunluk",
    property: "Yoğunluk",
    siSymbol: "1 kg/m³",
    siName: "kilogram bölü metreküp",
    rows: [
      { unit: "g/cm³", equality: "0.001 g/cm³" },
      { unit: "kg/L", equality: "0.001 kg/L" },
      { unit: "lb/ft³", equality: "0.06242796 lb/ft³" }
    ]
  },

  {
    id: "sicaklik",
    property: "Sıcaklık",
    siSymbol: "K",
    siName: "Kelvin",
    rows: [
      { unit: "°C", equality: "K = °C + 273.15" },
      { unit: "°F", equality: "K = (°F − 32) × 5/9 + 273.15" },
      { unit: "°C", equality: "°F = (°C × 9/5) + 32" }
    ]
  },

  {
    id: "zaman",
    property: "Zaman",
    siSymbol: "1 s",
    siName: "saniye",
    rows: [
      { unit: "ms", equality: "1000 ms" },
      { unit: "dakika", equality: "1/60 min" },
      { unit: "saat", equality: "1/3600 h" },
      { unit: "gün", equality: "1/86 400 day" }
    ]
  },

  // --- KİNEMATİK ---

  {
    id: "hiz",
    property: "Hız",
    siSymbol: "1 m/s",
    siName: "metre bölü saniye",
    rows: [
      { unit: "km/h", equality: "3.6 km/h" },
      { unit: "ft/s", equality: "3.28084 ft/s" },
      { unit: "mph", equality: "2.23694 mph" },
      { unit: "knot", equality: "1.94384 knot" }
    ]
  },

  {
    id: "ivme",
    property: "İvme",
    siSymbol: "1 m/s²",
    siName: "metre bölü saniye kare",
    rows: [
      { unit: "g (yerçekimi)", equality: "≈ 0.1019716 g" },
      { unit: "ft/s²", equality: "3.28084 ft/s²" }
    ]
  },

  {
    id: "acisal_hiz",
    property: "Açısal hız",
    siSymbol: "1 rad/s",
    siName: "radyan bölü saniye",
    rows: [
      { unit: "°/s", equality: "57.29578 °/s" },
      { unit: "rpm", equality: "9.5492966 rpm" },
      { unit: "Hz", equality: "0.15915494 Hz" }
    ]
  },

  // --- DİNAMİK ---

  {
    id: "kuvvet",
    property: "Kuvvet",
    siSymbol: "1 N",
    siName: "Newton",
    rows: [
      { unit: "kN", equality: "0.001 kN" },
      { unit: "kg·f", equality: "0.1019716 kg·f" },
      { unit: "lbf", equality: "0.2248089 lbf" }
    ]
  },

  {
    id: "tork",
    property: "Tork",
    siSymbol: "1 N·m",
    siName: "Newton metre",
    rows: [
      { unit: "kN·m", equality: "0.001 kN·m" },
      { unit: "lb·ft", equality: "0.7375621 lb·ft" },
      { unit: "lb·in", equality: "8.8507458 lb·in" }
    ]
  },

  {
    id: "momentum",
    property: "Momentum",
    siSymbol: "1 kg·m/s",
    siName: "kilogram metre bölü saniye",
    rows: [
      { unit: "N·s", equality: "1 N·s" },
      { unit: "lb·ft/s", equality: "0.7375621 lb·ft/s" }
    ]
  },

  {
    id: "basinc",
    property: "Basınç",
    siSymbol: "1 Pa",
    siName: "paskal",
    rows: [
      { unit: "bar", equality: "0.00001 bar" },
      { unit: "kPa", equality: "0.001 kPa" },
      { unit: "atm", equality: "9.86923e−6 atm" },
      { unit: "mmHg", equality: "0.00750062 mmHg" },
      { unit: "psi", equality: "0.000145038 psi" }
    ]
  },

  {
    id: "dinamik_viskozite",
    property: "Dinamik viskozite",
    siSymbol: "1 Pa·s",
    siName: "paskal saniye",
    rows: [
      { unit: "N·s/m²", equality: "1 N·s/m²" },
      { unit: "cP (centipoise)", equality: "1000 cP" }
    ]
  },

  {
    id: "kinematik_viskozite",
    property: "Kinematik viskozite",
    siSymbol: "1 m²/s",
    siName: "metre kare bölü saniye",
    rows: [
      { unit: "St (stokes)", equality: "10 000 St" },
      { unit: "cSt (centistokes)", equality: "1 000 000 cSt" }
    ]
  },

  // --- DEBİLER ---

  {
    id: "hacimsel_debi",
    property: "Hacimsel debi",
    siSymbol: "1 m³/s",
    siName: "metreküp bölü saniye",
    rows: [
      { unit: "m³/h", equality: "3600 m³/h" },
      { unit: "L/s", equality: "1000 L/s" },
      { unit: "L/min", equality: "60 000 L/min" },
      { unit: "cfm", equality: "2118.88 cfm (yaklaşık)" }
    ]
  },

  {
    id: "kutlesel_debi",
    property: "Kütlesel debi",
    siSymbol: "1 kg/s",
    siName: "kilogram bölü saniye",
    rows: [
      { unit: "kg/h", equality: "3600 kg/h" },
      { unit: "g/s", equality: "1000 g/s" },
      { unit: "g/h", equality: "3 600 000 g/h" }
    ]
  },

  // --- ENERJİ & ISI ---

  {
    id: "enerji",
    property: "Enerji",
    siSymbol: "1 J",
    siName: "Joule",
    rows: [
      { unit: "kJ", equality: "0.001 kJ" },
      { unit: "cal", equality: "0.2390057 cal" },
      { unit: "kcal", equality: "0.0002390057 kcal" },
      { unit: "Wh", equality: "0.000277778 Wh" },
      { unit: "kWh", equality: "2.77778e−7 kWh" },
      { unit: "Btu", equality: "0.000947817 Btu" }
    ]
  },

  {
    id: "guc",
    property: "Güç",
    siSymbol: "1 W",
    siName: "Watt",
    rows: [
      { unit: "kW", equality: "0.001 kW" },
      { unit: "MW", equality: "1e−6 MW" },
      { unit: "hp (mekanik)", equality: "0.00134102 hp" },
      { unit: "PS (metrik beygir)", equality: "0.00135962 PS" }
    ]
  },

  {
    id: "isil_iletkenlik",
    property: "Isıl iletkenlik",
    siSymbol: "1 W/(m·K)",
    siName: "Watt bölü metre Kelvin",
    rows: [
      { unit: "kcal/(h·m·°C)", equality: "0.859845 kcal/(h·m·°C)" }
    ]
  },

  {
    id: "isi_akisi",
    property: "Isı akısı",
    siSymbol: "1 W/m²",
    siName: "Watt bölü metrekare",
    rows: [
      { unit: "kcal/(h·m²)", equality: "0.859845 kcal/(h·m²)" }
    ]
  },

  {
    id: "ozgul_isi",
    property: "Özgül ısı",
    siSymbol: "1 J/(kg·K)",
    siName: "Joule bölü kilogram Kelvin",
    rows: [
      { unit: "kJ/(kg·K)", equality: "0.001 kJ/(kg·K)" },
      { unit: "kcal/(kg·°C)", equality: "0.000238846 kcal/(kg·°C)" }
    ]
  },

  // --- ELEKTRİK & MANYETİK ---

  {
    id: "elektrik_direnci",
    property: "Elektrik direnci",
    siSymbol: "1 Ω",
    siName: "Ohm",
    rows: [
      { unit: "kΩ", equality: "0.001 kΩ" },
      { unit: "MΩ", equality: "1e−6 MΩ" },
      { unit: "mΩ", equality: "1000 mΩ" }
    ]
  },

  {
    id: "gerilim",
    property: "Gerilim",
    siSymbol: "1 V",
    siName: "Volt",
    rows: [
      { unit: "kV", equality: "0.001 kV" },
      { unit: "mV", equality: "1000 mV" }
    ]
  },

  {
    id: "akim",
    property: "Akım",
    siSymbol: "1 A",
    siName: "Amper",
    rows: [
      { unit: "kA", equality: "0.001 kA" },
      { unit: "mA", equality: "1000 mA" },
      { unit: "µA", equality: "1 000 000 µA" }
    ]
  },

  {
    id: "kapasitans",
    property: "Kapasitans",
    siSymbol: "1 F",
    siName: "Farad",
    rows: [
      { unit: "mF", equality: "1000 mF" },
      { unit: "µF", equality: "1 000 000 µF" },
      { unit: "nF", equality: "1 000 000 000 nF" },
      { unit: "pF", equality: "1 000 000 000 000 pF" }
    ]
  },

  {
    id: "enduktans",
    property: "Endüktans",
    siSymbol: "1 H",
    siName: "Henry",
    rows: [
      { unit: "mH", equality: "1000 mH" },
      { unit: "µH", equality: "1 000 000 µH" }
    ]
  },

  {
    id: "elektrik_yuku",
    property: "Elektrik yükü",
    siSymbol: "1 C",
    siName: "Coulomb",
    rows: [
      { unit: "mC", equality: "1000 mC" },
      { unit: "µC", equality: "1 000 000 µC" }
    ]
  },

  {
    id: "manyetik_alan",
    property: "Manyetik alan şiddeti",
    siSymbol: "1 A/m",
    siName: "Amper/metre",
    rows: [
      { unit: "Oersted", equality: "0.012566 Oe (yaklaşık)" }
    ]
  },

  {
    id: "manyetik_aki",
    property: "Manyetik akı yoğunluğu",
    siSymbol: "1 T",
    siName: "Tesla",
    rows: [
      { unit: "Gauss", equality: "10 000 G" }
    ]
  }
];

export default function SiMasterTable() {
  return (
    <section className="si-master">
      <h2>SI birim sistemleri – kapsamlı dönüşüm tablosu</h2>
      <p className="si-master-intro">
        Bu tablo, SI taban birimlerinden yaygın mühendislik birimlerine
        dönüşüm faktörlerini toplu halde gösterir. Online çeviriciye ek
        olarak, ders notu ve ödevler için hızlı bir referans niteliğindedir.
      </p>

      <div className="si-master-wrapper">
        <table className="si-master-table">
          <thead>
            <tr>
              <th>Özellik</th>
              <th>SI birim</th>
              <th>Dönüştürmek için birim</th>
              <th>Denklik</th>
            </tr>
          </thead>
          <tbody>
            {MASTER_DATA.map((cat) => {
              const rowSpan = cat.rows.length || 1;

              return cat.rows.map((row, index) => (
                <tr key={`${cat.id}-${index}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={rowSpan} className="si-master-property">
                        {cat.property}
                      </td>
                      <td rowSpan={rowSpan} className="si-master-si">
                        <div>{cat.siSymbol}</div>
                        <div className="si-master-si-name">{cat.siName}</div>
                      </td>
                    </>
                  )}
                  <td>{row.unit}</td>
                  <td>{row.equality}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
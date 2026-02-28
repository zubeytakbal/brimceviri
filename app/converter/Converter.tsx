"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { units } from "./units";
import { convert } from "./convert";

type SearchSignal = {
  category: string;
  unit: string;
  tick: number;
};

// Arama / karşılaştırma için normalleştirme (Türkçe harfleri vs.)
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/²/g, "2")
    .replace(/³/g, "3")
    .replace(/·/g, "")
    .replace(/[\/\s]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");

// Soldaki label’lar
const categoryLabels: Record<string, string> = {
  alan: "Alan",
  uzunluk: "Uzunluk",
  hacim: "Hacim",
  kutle: "Kütle",
  yogunluk: "Yoğunluk",
  hiz: "Hız",
  ivme: "İvme",
  zaman: "Zaman",
  acisal_hiz: "Açısal hız",
  kuvvet: "Kuvvet",
  tork: "Tork",
  momentum: "Momentum",
  basinc: "Basınç",
  viskozite_dinamik: "Dinamik viskozite",
  viskozite_kinematik: "Kinematik viskozite",
  debi_hacimsel: "Hacimsel debi",
  debi_kutlesel: "Kütlesel debi",
  enerji: "Enerji",
  guc: "Güç",
  sicaklik: "Sıcaklık",
  isil_iletkenlik: "Isıl iletkenlik",
  isi_akisi: "Isı akısı",
  ozgul_isi: "Özgül ısı",
  elektrik_direnc: "Elektrik direnci",
  elektrik_gerilim: "Gerilim",
  elektrik_akim: "Akım",
  kapasitans: "Kapasitans",
  enduktans: "Endüktans",
  elektrik_yuk: "Elektrik yükü",
  manyetik_alan: "Manyetik alan",
  manyetik_aki: "Manyetik akı",
};

// Gruplar (4 tab)
const groups: {
  id: string;
  title: string;
  categories: string[];
}[] = [
  {
    id: "temel",
    title: "Temel büyüklükler",
    categories: ["alan", "uzunluk", "hacim", "kutle", "yogunluk", "sicaklik", "zaman"],
  },
  {
    id: "kinematik",
    title: "Kinematik ve mekanik",
    categories: [
      "hiz",
      "ivme",
      "acisal_hiz",
      "kuvvet",
      "tork",
      "momentum",
      "basinc",
      "viskozite_dinamik",
      "viskozite_kinematik",
      "debi_hacimsel",
      "debi_kutlesel",
    ],
  },
  {
    id: "isi",
    title: "Isı ve enerji",
    categories: ["enerji", "guc", "isil_iletkenlik", "isi_akisi", "ozgul_isi"],
  },
  {
    id: "elektrik",
    title: "Elektrik ve manyetik",
    categories: [
      "elektrik_direnc",
      "elektrik_gerilim",
      "elektrik_akim",
      "kapasitans",
      "enduktans",
      "elektrik_yuk",
      "manyetik_alan",
      "manyetik_aki",
    ],
  },
];

// Tek bir kategori satırı
function CategoryRow({
  catKey,
  searchSignal,
}: {
  catKey: string;
  searchSignal: SearchSignal | null;
}) {
  const [value, setValue] = useState<string>("");
  const [from, setFrom] = useState<string>(units[catKey][0]);
  const [to, setTo] = useState<string>(units[catKey][1] ?? units[catKey][0]);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const labelText = (categoryLabels[catKey] ?? catKey) + " değeri:";

  const numericValue = parseFloat(value.replace(",", "."));
  const rawResult = convert(
    catKey,
    Number.isFinite(numericValue) ? numericValue : NaN,
    from,
    to
  );

  let resultDisplay = "";
  if (Number.isFinite(rawResult)) {
    const fixed = rawResult.toFixed(10); // 10 hane
    resultDisplay = fixed.replace(/\.?0+$/, ""); // gereksiz 0 ve noktaları sil
  }

  // Arama sinyali bu kategoriye gelirse: satıra kaydır + inputa odaklan
  useEffect(() => {
    if (!searchSignal || searchSignal.category !== catKey) {
      return;
    }

    const unit = searchSignal.unit;

    // Sol birimi aranan birime ayarla
    setFrom(unit);

    // Sağ tarafa farklı bir birim bul, yoksa aynı kalsın
    const other = units[catKey].find((u) => u !== unit) || unit;
    setTo(other);

    // Satırı ortaya kaydır
    if (rowRef.current) {
      rowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Inputa odaklan
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchSignal, catKey]);

  return (
    <div ref={rowRef} className="converter-section">
      <div className="converter-row">
        <span className="inline-label">{labelText}</span>

        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Değer girin"
        />

        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {units[catKey].map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>

        <span className="converter-arrow">→</span>

        <input
          className="result-input"
          type="text"
          value={resultDisplay}
          readOnly
        />

        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {units[catKey].map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function Converter() {
  const [search, setSearch] = useState("");
  const [searchSignal, setSearchSignal] = useState<SearchSignal | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>("temel"); // varsayılan sekme

  // 🔍 SADECE KATEGORİ ARAYAN SEARCH
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const raw = search.trim();
    if (!raw) return;

    const termNorm = normalize(raw);

    let foundCategory: string | null = null;

    // Kategorilerde ara (hem key'e hem label'a bak)
    for (const cat of Object.keys(units)) {
      const label = categoryLabels[cat] ?? cat;
      const catNorm = normalize(cat);
      const labelNorm = normalize(label);

      if (
        catNorm === termNorm ||
        labelNorm === termNorm ||
        catNorm.includes(termNorm) ||
        labelNorm.includes(termNorm)
      ) {
        foundCategory = cat;
        break;
      }
    }

    if (!foundCategory) return;

    const grp = groups.find((g) => g.categories.includes(foundCategory!));
    if (grp) {
      setActiveGroup(grp.id);
    }

    setSearchSignal({
      category: foundCategory,
      unit: units[foundCategory][0], // ilk birim
      tick: Date.now(),
    });
  };

  const currentGroup =
    groups.find((g) => g.id === activeGroup) ?? groups[0];

  return (
    <div>
      {/* 🔍 Arama çubuğu */}
      <div className="search-row">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Kategori ara (örnek: alan, basınç, hız, enerji...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Ara</button>
        </form>
      </div>

      {/* 🧩 4 grup sekmesi (yan yana) */}
      <div className="group-tabs">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            className={"group-tab" + (g.id === activeGroup ? " active" : "")}
            onClick={() => setActiveGroup(g.id)}
          >
            <span>{g.title}</span>
            <span className="group-tab-count">
              {g.categories.length} büyüklük
            </span>
          </button>
        ))}
      </div>

      {/* Seçili grubun satırları */}
      <div className="converter-stack">
        {currentGroup.categories.map((catKey) => (
          <CategoryRow
            key={catKey}
            catKey={catKey}
            searchSignal={searchSignal}
          />
        ))}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";

type ApiUnitInfo = {
  symbol: string;
  id: string;
  name: string;
};

type ApiCategoryInfo = {
  category: string;
  units: ApiUnitInfo[];
};

export default function ApiPlayground() {
  const [categories, setCategories] = useState<ApiCategoryInfo[] | null>(
    null
  );
  const [category, setCategory] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [value, setValue] = useState("1");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/v1/categories")
      .then((response) => response.json())
      .then((data: { categories: ApiCategoryInfo[] }) => {
        if (cancelled) return;

        setCategories(data.categories);

        const firstCategory = data.categories[0];
        if (firstCategory) {
          setCategory(firstCategory.category);
          setFromUnit(firstCategory.units[0]?.symbol ?? "");
          setToUnit(firstCategory.units[1]?.symbol ?? firstCategory.units[0]?.symbol ?? "");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResponseText("Kategori listesi yüklenemedi.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeCategoryUnits = useMemo(
    () => categories?.find((entry) => entry.category === category)?.units ?? [],
    [categories, category]
  );

  const requestUrl = `/api/v1/convert?category=${encodeURIComponent(
    category
  )}&from=${encodeURIComponent(fromUnit)}&to=${encodeURIComponent(
    toUnit
  )}&value=${encodeURIComponent(value)}`;

  async function handleTry() {
    setIsLoading(true);

    try {
      const response = await fetch(requestUrl);
      const data = await response.json();
      setResponseText(JSON.stringify(data, null, 2));
    } catch {
      setResponseText(
        JSON.stringify({ error: "İstek başarısız oldu." }, null, 2)
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!categories) {
    return (
      <div className="api-playground">
        <p>Kategori listesi yükleniyor…</p>
      </div>
    );
  }

  return (
    <div className="api-playground">
      <div className="category-general-converter-grid">
        <label className="category-general-converter-field">
          <span>Kategori</span>
          <select
            value={category}
            onChange={(event) => {
              const nextCategory = event.target.value;
              const units =
                categories.find((entry) => entry.category === nextCategory)
                  ?.units ?? [];
              setCategory(nextCategory);
              setFromUnit(units[0]?.symbol ?? "");
              setToUnit(units[1]?.symbol ?? units[0]?.symbol ?? "");
            }}
          >
            {categories.map((entry) => (
              <option key={entry.category} value={entry.category}>
                {entry.category}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>from</span>
          <select
            value={fromUnit}
            onChange={(event) => setFromUnit(event.target.value)}
          >
            {activeCategoryUnits.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.symbol} — {unit.name}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>to</span>
          <select
            value={toUnit}
            onChange={(event) => setToUnit(event.target.value)}
          >
            {activeCategoryUnits.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.symbol} — {unit.name}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>value</span>
          <input
            inputMode="decimal"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
      </div>

      <code className="embed-code-box-snippet">GET {requestUrl}</code>

      <button type="button" onClick={handleTry} disabled={isLoading}>
        {isLoading ? "Gönderiliyor…" : "Dene"}
      </button>

      {responseText && (
        <pre className="api-playground-response">{responseText}</pre>
      )}
    </div>
  );
}

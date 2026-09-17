"use client";

import { useMemo, useState } from "react";
import {
  getUnitIdsForMeasurementSystem,
  measurementSystemCatalog,
  type MeasurementSystemId,
} from "../converter/measurementSystemCatalog";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { unitRegistry } from "../converter/unitRegistry";
import CategoryUnitConverter from "./CategoryUnitConverter";
import EnglishElectricityConverter from "./EnglishElectricityConverter";
import { getCategoryUnitOptions } from "./categoryUnitOptions";

const defaultCategory = "uzunluk";

type SystemFilterId = "all" | "historical" | MeasurementSystemId;

const systemFilters: Array<{
  id: SystemFilterId;
  label: string;
  description: string;
  systems: readonly MeasurementSystemId[];
}> = [
  {
    id: "all",
    label: "All measurement systems",
    description: "Show every available unit in every category.",
    systems: [],
  },
  {
    id: "metric_si",
    label: measurementSystemCatalog.metric_si.label,
    description: measurementSystemCatalog.metric_si.description,
    systems: ["metric_si"],
  },
  {
    id: "us_customary",
    label: measurementSystemCatalog.us_customary.label,
    description: measurementSystemCatalog.us_customary.description,
    systems: ["us_customary"],
  },
  {
    id: "british_imperial",
    label: measurementSystemCatalog.british_imperial.label,
    description: measurementSystemCatalog.british_imperial.description,
    systems: ["british_imperial"],
  },
  {
    id: "shared_anglo_american",
    label: measurementSystemCatalog.shared_anglo_american.label,
    description: measurementSystemCatalog.shared_anglo_american.description,
    systems: ["shared_anglo_american"],
  },
  {
    id: "historical",
    label: "Historical measurement systems",
    description:
      "Ottoman, Byzantine and Old Turkic units with Metric/SI references.",
    systems: [
      "ottoman_historical",
      "byzantine_historical",
      "old_turkic_historical",
    ],
  },
];

export default function EnglishAllConversionsConverter() {
  const [category, setCategory] = useState(defaultCategory);
  const [systemFilterId, setSystemFilterId] =
    useState<SystemFilterId>("all");
  const activeSystemFilter = systemFilters.find(
    (filter) => filter.id === systemFilterId
  ) ?? systemFilters[0];
  const selectedUnitIds = useMemo(
    () =>
      new Set(
        activeSystemFilter.systems.flatMap(getUnitIdsForMeasurementSystem)
      ),
    [activeSystemFilter]
  );
  const metricReferenceUnitIds = useMemo(
    () => new Set(getUnitIdsForMeasurementSystem("metric_si")),
    []
  );
  const categories = useMemo(() => {
    const availableCategories = englishCategoryPages.filter((page) => {
      if (systemFilterId === "all") {
        return true;
      }

      const hasSelectedSystemUnit = unitRegistry.some(
        (unit) =>
          unit.category === page.category && selectedUnitIds.has(unit.id)
      );

      if (!hasSelectedSystemUnit) {
        return false;
      }

      const allowedUnitIds = new Set([
        ...selectedUnitIds,
        ...metricReferenceUnitIds,
      ]);
      const selectableUnits = getCategoryUnitOptions(page.category, "en").filter(
        (option) =>
          unitRegistry.some(
            (unit) =>
              unit.category === page.category &&
              unit.symbol === option.value &&
              allowedUnitIds.has(unit.id)
          )
      );

      return selectableUnits.length >= 2;
    });

    return [...availableCategories].sort((left, right) =>
      left.title.localeCompare(right.title, "en")
    );
  }, [metricReferenceUnitIds, selectedUnitIds, systemFilterId]);

  const activeCategory =
    categories.find((page) => page.category === category) ?? categories[0];
  const visibleUnitOptions = useMemo(() => {
    if (!activeCategory) {
      return [];
    }

    const allOptions = getCategoryUnitOptions(activeCategory.category, "en");

    if (systemFilterId === "all") {
      return allOptions;
    }

    const allowedUnitIds = new Set([
      ...selectedUnitIds,
      ...metricReferenceUnitIds,
    ]);

    return allOptions.filter((option) =>
      unitRegistry.some(
        (unit) =>
          unit.category === activeCategory.category &&
          unit.symbol === option.value &&
          allowedUnitIds.has(unit.id)
      )
    );
  }, [
    activeCategory,
    metricReferenceUnitIds,
    selectedUnitIds,
    systemFilterId,
  ]);

  return (
    <section className="conversion-section">
      <h2>Convert any available unit</h2>
      <p>
        Choose a measurement category, then enter a value and select the two
        units you want to convert.
      </p>

      <div className="category-general-converter">
        <div className="category-general-converter-grid">
          <label
            className="category-general-converter-field"
            style={{ gridColumn: "1 / -1" }}
          >
            <span>Measurement system</span>
            <select
              value={activeSystemFilter.id}
              onChange={(event) => {
                const nextFilter = systemFilters.find(
                  (filter) => filter.id === event.target.value
                ) ?? systemFilters[0];
                const nextUnitIds = new Set(
                  nextFilter.systems.flatMap(getUnitIdsForMeasurementSystem)
                );
                const nextCategory =
                  nextFilter.id === "all"
                    ? defaultCategory
                    : englishCategoryPages.find((page) =>
                        unitRegistry.some(
                          (unit) =>
                            unit.category === page.category &&
                            nextUnitIds.has(unit.id)
                        )
                      )?.category ?? defaultCategory;

                setSystemFilterId(nextFilter.id);
                setCategory(nextCategory);
              }}
            >
              {systemFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.label}
                </option>
              ))}
            </select>
          </label>

          <label
            className="category-general-converter-field"
            style={{ gridColumn: "1 / -1" }}
          >
            <span>Measurement category</span>
            <select
              value={activeCategory?.category ?? category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((page) => (
                <option key={page.category} value={page.category}>
                  {page.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        {activeSystemFilter.id !== "all" && (
          <p>
            {activeSystemFilter.description}
            {activeSystemFilter.id !== "metric_si" &&
              " Metric/SI reference units are included so you can compare and convert values."}
          </p>
        )}

        {activeCategory && (
          activeCategory.category === "elektrik" ? (
            <EnglishElectricityConverter />
          ) : (
            <CategoryUnitConverter
              key={`${activeSystemFilter.id}-${activeCategory.category}`}
              category={activeCategory.category}
              locale="en"
              unitOptions={visibleUnitOptions}
            />
          )
        )}
      </div>
    </section>
  );
}

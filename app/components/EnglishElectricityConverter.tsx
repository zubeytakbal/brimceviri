"use client";

import { useMemo, useState } from "react";
import CategoryUnitConverter from "./CategoryUnitConverter";
import { getCategoryUnitOptions } from "./categoryUnitOptions";

const electricalQuantities = [
  {
    id: "voltage",
    label: "Voltage",
    description:
      "Convert potential difference within voltage units. Voltage is measured in volts (V).",
    symbols: ["mV", "V", "kV"],
  },
  {
    id: "current",
    label: "Electric current",
    description:
      "Convert electric current within current units. Current is measured in amperes (A).",
    symbols: ["mA", "A", "kA"],
  },
] as const;

type ElectricalQuantityId = (typeof electricalQuantities)[number]["id"];

/**
 * Voltage and current use different physical dimensions. They share an
 * Electricity landing page, but must never appear as directly convertible
 * units in the same picker.
 */
export default function EnglishElectricityConverter() {
  const [quantity, setQuantity] = useState<ElectricalQuantityId>("voltage");
  const activeQuantity =
    electricalQuantities.find((item) => item.id === quantity) ??
    electricalQuantities[0];
  const unitOptions = useMemo(
    () =>
      getCategoryUnitOptions("elektrik", "en").filter((option) =>
        (activeQuantity.symbols as readonly string[]).includes(option.value)
      ),
    [activeQuantity]
  );

  return (
    <div className="category-general-converter">
      <div className="category-general-converter-grid">
        <label
          className="category-general-converter-field"
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Electrical quantity</span>
          <select
            value={activeQuantity.id}
            onChange={(event) => {
              setQuantity(event.target.value as ElectricalQuantityId);
            }}
          >
            {electricalQuantities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p>{activeQuantity.description}</p>

      <CategoryUnitConverter
        key={activeQuantity.id}
        category="elektrik"
        locale="en"
        unitOptions={unitOptions}
      />
    </div>
  );
}

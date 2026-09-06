"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  getMovingBoxEstimate,
  homeTypeOrder,
  type HomeType,
} from "../converter/movingBoxCalculator";

type SupportedLocale = "tr" | "en";

type MovingBoxCopy = {
  chooseHomeType: string;
  smallBox: string;
  largeBox: string;
  truckVolume: string;
  note: (label: string) => string;
  homeTypeLabels: Record<HomeType, string>;
};

const copyByLocale: Record<SupportedLocale, MovingBoxCopy> = {
  tr: {
    chooseHomeType: "Ev Tipini Seç",
    smallBox: "Küçük Koli",
    largeBox: "Büyük Koli",
    truckVolume: "Tahmini Kamyon Hacmi",
    note: (label) =>
      `Bu rakamlar nakliye sektöründe ${label} tipi evler için kullanılan ortalama tahminlerdir; eşya miktarınıza göre değişebilir.`,
    homeTypeLabels: {
      studio: "Stüdyo Daire",
      "1+1": "1+1",
      "2+1": "2+1",
      "3+1": "3+1",
      "4+1": "4+1",
      "5+1": "5+1 ve üzeri",
    },
  },
  en: {
    chooseHomeType: "Choose Home Type",
    smallBox: "Small Boxes",
    largeBox: "Large Boxes",
    truckVolume: "Estimated Truck Volume",
    note: (label) =>
      `These figures are average estimates used in the moving industry for ${label} homes; the actual amount can vary based on how much you own.`,
    homeTypeLabels: {
      studio: "Studio",
      "1+1": "1-Bedroom",
      "2+1": "2-Bedroom",
      "3+1": "3-Bedroom",
      "4+1": "4-Bedroom",
      "5+1": "5-Bedroom+",
    },
  },
};

export default function MovingBoxCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const copy = copyByLocale[locale];

  const [homeType, setHomeType] = useState<HomeType>("2+1");

  const result = useMemo(() => getMovingBoxEstimate(homeType), [homeType]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{copy.chooseHomeType}</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {homeTypeOrder.map((type) => (
              <button
                key={type}
                type="button"
                className={`engineering-target-button${homeType === type ? " is-active" : ""}`}
                onClick={() => setHomeType(type)}
              >
                {copy.homeTypeLabels[type]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        <div className="paint-calculator-result-grid">
          <div>
            <span>{copy.smallBox}</span>
            <strong>
              {formatLocalizedNumber(result.smallBoxCount, locale)}
            </strong>
          </div>
          <div>
            <span>{copy.largeBox}</span>
            <strong>
              {formatLocalizedNumber(result.largeBoxCount, locale)}
            </strong>
          </div>
          <div>
            <span>{copy.truckVolume}</span>
            <strong>
              {formatLocalizedNumber(result.truckVolumeM3, locale)} m³
            </strong>
          </div>
        </div>

        <p className="paint-calculator-liters">
          {copy.note(copy.homeTypeLabels[homeType])}
        </p>
      </div>
    </div>
  );
}

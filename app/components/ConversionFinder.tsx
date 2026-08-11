"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { conversionPages } from "../converter/conversionPages";

export default function ConversionFinder() {
  const router = useRouter();

  const [selectedSlug, setSelectedSlug] = useState(
    conversionPages[0]?.slug ?? ""
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedSlug) {
      return;
    }

    router.push(`/${selectedSlug}`);
  }

  return (
    <form className="conversion-finder" onSubmit={handleSubmit}>
      <label htmlFor="conversion-selection">
        Dönüşüm seçin
      </label>

      <div className="conversion-finder-row">
        <select
          id="conversion-selection"
          value={selectedSlug}
          onChange={(event) => setSelectedSlug(event.target.value)}
        >
          {conversionPages.map((conversionPage) => (
            <option
              key={conversionPage.slug}
              value={conversionPage.slug}
            >
              {conversionPage.fromName} →{" "}
              {conversionPage.toName}
            </option>
          ))}
        </select>

        <button type="submit">Dönüştür</button>
      </div>
    </form>
  );
}
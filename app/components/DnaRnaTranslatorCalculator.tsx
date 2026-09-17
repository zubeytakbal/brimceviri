"use client";

import { useMemo, useState } from "react";
import { translateSequence, isTranslationError } from "../converter/dnaTranslator";

export default function DnaRnaTranslatorCalculator() {
  const [sequenceInput, setSequenceInput] = useState("AUG GCU UAU UAA");

  const result = useMemo(() => translateSequence(sequenceInput), [sequenceInput]);
  const hasError = isTranslationError(result);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bir DNA (A, T, G, C) veya mRNA (A, U, G, C) dizisi
          yaz, dizinin ilk kodonundan başlayarak amino asit dizisine
          (proteine) anında çevrilsin. Bir dur (stop) kodonuna ulaşınca
          çeviri orada sona erer.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>DNA / mRNA Dizisi</span>
            <input
              type="text"
              value={sequenceInput}
              onChange={(event) => setSequenceInput(event.target.value)}
              placeholder="örn. AUG GCU UAU UAA"
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {hasError ? (
          <strong>
            {result.error === "empty" && "Bir DNA veya mRNA dizisi yazarak çeviriyi gör."}
            {result.error === "invalid-characters" &&
              "Geçersiz karakter. Sadece A, U/T, G, C harflerini kullan (DNA'da T, mRNA'da U)."}
            {result.error === "too-short" && "En az 1 kodon (3 harf) gerekiyor."}
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{result.wasDna ? "mRNA'ya Çevrilmiş Hali" : "Girilen mRNA"}</span>
              <strong>{result.normalizedSequence}</strong>
            </div>
            <div>
              <span>Amino Asit Dizisi (3 Harfli)</span>
              <strong>{result.proteinThreeLetter || "—"}</strong>
            </div>
            <div>
              <span>Tek Harfli Kod</span>
              <strong>{result.proteinOneLetterCode || "—"}</strong>
            </div>
            <div>
              <span>Kodon Sayısı</span>
              <strong>{result.codons.length}</strong>
            </div>
          </div>
        )}
      </div>

      {!hasError && (
        <div className="calculator-steps">
          <h3>Kodon Kodon Çeviri</h3>
          {result.codons.map((c) => (
            <p className="calculator-step-line" key={`${c.position}-${c.codon}`}>
              {c.position}. {c.codon} → {c.entry.nameTr}
              {c.entry.isStart && " (Başlangıç Kodonu)"}
            </p>
          ))}
          {result.stoppedEarly && (
            <p className="calculator-step-line">
              Dur kodonuna ulaşıldı, protein sentezi burada sona erdi.
            </p>
          )}
          {!result.stoppedEarly && result.trailingBaseCount > 0 && (
            <p className="calculator-step-line">
              Son {result.trailingBaseCount} baz tam bir kodon oluşturmadığı
              için çeviriye dahil edilmedi.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

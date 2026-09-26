"use client";

import { useMemo, useState } from "react";
import { totalBoardFeet } from "../converter/englishHomeYardFormulas";
import { formatNumber, parseInput } from "./englishFormHelpers";

type Piece = { id: number; thickness: string; width: string; length: string; quantity: string };

export default function EnglishBoardFootCalculator() {
  const [pieces, setPieces] = useState<Piece[]>([{ id: 1, thickness: "2", width: "6", length: "8", quantity: "10" }]);
  const [price, setPrice] = useState("");

  const result = useMemo(
    () =>
      totalBoardFeet(
        pieces.map((piece) => ({
          thicknessIn: parseInput(piece.thickness) ?? NaN,
          widthIn: parseInput(piece.width) ?? NaN,
          lengthFt: parseInput(piece.length) ?? NaN,
          quantity: parseInput(piece.quantity) ?? 1,
        }))
      ),
    [pieces]
  );
  const priceValue = parseInput(price);

  const update = (id: number, patch: Partial<Piece>) =>
    setPieces((previous) => previous.map((piece) => (piece.id === id ? { ...piece, ...patch } : piece)));

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Enter nominal thickness and width in inches (for example 2 × 6) and length in feet. Hardwood thickness is
          often given in quarters: 4/4 = 1 in, 8/4 = 2 in.
        </p>
        {pieces.map((piece, index) => (
          <div className="paint-calculator-grid" key={piece.id}>
            <label className="category-general-converter-field">
              <span>Board {index + 1}: thickness (in)</span>
              <input inputMode="decimal" type="text" value={piece.thickness} onChange={(event) => update(piece.id, { thickness: event.target.value })} />
            </label>
            <label className="category-general-converter-field">
              <span>Width (in)</span>
              <input inputMode="decimal" type="text" value={piece.width} onChange={(event) => update(piece.id, { width: event.target.value })} />
            </label>
            <label className="category-general-converter-field">
              <span>Length (ft)</span>
              <input inputMode="decimal" type="text" value={piece.length} onChange={(event) => update(piece.id, { length: event.target.value })} />
            </label>
            <label className="category-general-converter-field">
              <span>Quantity</span>
              <input inputMode="numeric" type="text" value={piece.quantity} onChange={(event) => update(piece.id, { quantity: event.target.value })} />
            </label>
          </div>
        ))}
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className="engineering-target-button"
            onClick={() => setPieces((previous) => [...previous, { id: Date.now(), thickness: "", width: "", length: "", quantity: "1" }])}
          >
            + Add board size
          </button>
          {pieces.length > 1 && (
            <button type="button" className="engineering-target-button" onClick={() => setPieces((previous) => previous.slice(0, -1))}>
              Remove last
            </button>
          )}
        </div>
        <label className="category-general-converter-field">
          <span>Price per board foot ($, optional)</span>
          <input inputMode="decimal" type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Total</span>
              <strong>{formatNumber(result.boardFeet, 2)} board feet</strong>
            </div>
            <div>
              <span>Cubic feet</span>
              <strong>{formatNumber(result.cubicFeet, 2)} cu ft</strong>
            </div>
            <div>
              <span>Cubic meters</span>
              <strong>{formatNumber(result.cubicMeters, 3)} m³</strong>
            </div>
            {priceValue !== null && priceValue > 0 && (
              <div>
                <span>Estimated cost</span>
                <strong>${formatNumber(result.boardFeet * priceValue, 2)}</strong>
              </div>
            )}
          </div>
        ) : (
          <strong>Enter thickness, width and length for at least one board.</strong>
        )}
      </div>
    </div>
  );
}

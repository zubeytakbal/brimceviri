"use client";

import { useMemo, useState } from "react";
import { calculateBinaryArithmetic, convertFromBase, isValidForBase, type BinaryArithmeticOperation, type NumberBase } from "../converter/numberBaseCalculator";

const bases: NumberBase[] = [2, 8, 10, 16];
const baseLabels: Record<NumberBase, string> = { 2: "Binary (base 2)", 8: "Octal (base 8)", 10: "Decimal (base 10)", 16: "Hexadecimal (base 16)" };
const operations: Array<{ id: BinaryArithmeticOperation; label: string }> = [{ id: "add", label: "Add" }, { id: "subtract", label: "Subtract" }, { id: "multiply", label: "Multiply" }];

export default function EnglishNumberBaseCalculator() {
  const [inputValue, setInputValue] = useState("1010");
  const [inputBase, setInputBase] = useState<NumberBase>(2);
  const [firstBinary, setFirstBinary] = useState("1010");
  const [secondBinary, setSecondBinary] = useState("110");
  const [operation, setOperation] = useState<BinaryArithmeticOperation>("add");
  const conversion = useMemo(() => convertFromBase(inputValue, inputBase), [inputValue, inputBase]);
  const invalidConversion = inputValue.trim().length > 0 && !isValidForBase(inputValue.trim(), inputBase);
  const arithmetic = useMemo(() => firstBinary.trim() && secondBinary.trim() ? calculateBinaryArithmetic(firstBinary, secondBinary, operation) : null, [firstBinary, secondBinary, operation]);
  const invalidArithmetic = firstBinary.trim().length > 0 && secondBinary.trim().length > 0 && !arithmetic;

  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="engineering-targets"><span>Input base</span><div className="engineering-target-grid hydrostatic-target-grid">{bases.map((base) => <button key={base} type="button" className={`engineering-target-button${inputBase === base ? " is-active" : ""}`} onClick={() => setInputBase(base)}>{baseLabels[base]}</button>)}</div></div><label className="category-general-converter-field"><span>Number to convert</span><input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} /></label></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{invalidConversion ? <strong>{inputValue} is not valid for {baseLabels[inputBase]}.</strong> : !conversion ? <strong>Enter a valid whole number to convert.</strong> : <div className="paint-calculator-result-grid"><div><span>Binary</span><strong>{conversion.binary}</strong></div><div><span>Octal</span><strong>{conversion.octal}</strong></div><div><span>Decimal</span><strong>{conversion.decimal}</strong></div><div><span>Hexadecimal</span><strong>{conversion.hexadecimal}</strong></div></div>}</div><div className="engineering-calculator-card"><div className="engineering-targets"><span>Binary arithmetic</span><div className="engineering-target-grid hydrostatic-target-grid">{operations.map((item) => <button key={item.id} type="button" className={`engineering-target-button${operation === item.id ? " is-active" : ""}`} onClick={() => setOperation(item.id)}>{item.label}</button>)}</div></div><div className="paint-calculator-grid"><label className="category-general-converter-field"><span>First binary number</span><input type="text" value={firstBinary} onChange={(event) => setFirstBinary(event.target.value)} /></label><label className="category-general-converter-field"><span>Second binary number</span><input type="text" value={secondBinary} onChange={(event) => setSecondBinary(event.target.value)} /></label></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{invalidArithmetic ? <strong>Enter valid binary values. Subtraction cannot produce a negative result.</strong> : !arithmetic ? <strong>Enter two valid binary values.</strong> : <strong>Result: {arithmetic.resultBinary} (decimal {arithmetic.resultDecimal.toString()})</strong>}</div></div></div>;
}

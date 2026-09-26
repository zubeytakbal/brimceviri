"use client";

// Diger hesaplayicilarla ayni gorunen secim dugmeleri (uyku, hidrostatik...).
export default function EnglishModeToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="engineering-targets">
      <span>{label}</span>
      <div className="engineering-target-grid hydrostatic-target-grid">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            className={`engineering-target-button${value === option.value ? " is-active" : ""}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

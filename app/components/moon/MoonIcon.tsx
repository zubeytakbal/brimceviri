// Ayin aydinlanan kismini gercek sekliyle cizer (kuzey yarimkure gorunumu:
// buyurken sag taraf aydinlik). fraction: 0 yeni ay, 0.5 dolunay, 1 yeni ay.
export default function MoonIcon({ fraction, size = 40, label }: { fraction: number; size?: number; label?: string }) {
  const r = 50;
  const cx = 50;
  const cy = 50;
  const angle = fraction * 2 * Math.PI;
  const rx = Math.abs(Math.cos(angle)) * r;
  const waxing = fraction < 0.5;
  const gibbous = Math.cos(angle) < 0;
  // Aydinlik yari daire + terminator elipsi.
  const litSweep = waxing ? 1 : 0;
  const termSweep = waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1;
  const d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${litSweep} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${termSweep} ${cx} ${cy - r} Z`;
  return (
    <svg className="moon-icon" viewBox="0 0 100 100" width={size} height={size} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <radialGradient id="moon-lit" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#fffbea" />
          <stop offset="1" stopColor="#d9d2b8" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} className="moon-icon-dark" />
      {fraction > 0.005 && fraction < 0.995 && <path d={d} fill="url(#moon-lit)" />}
      <circle cx="36" cy="38" r="7" className="moon-icon-crater" />
      <circle cx="62" cy="60" r="10" className="moon-icon-crater" />
      <circle cx="58" cy="30" r="4" className="moon-icon-crater" />
    </svg>
  );
}

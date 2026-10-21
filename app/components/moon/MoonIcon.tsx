// Ayin aydinlanan kismini gercek sekliyle cizer (kuzey yarimkure gorunumu:
// buyurken sag taraf aydinlik). fraction: 0 yeni ay, 0.5 dolunay, 1 yeni ay.
// Gorunum NASA'nin dolunay fotografidir (NASA Scientific Visualization Studio, kamu mali; public/ay):
// aydinlik kisim fotografin kendisi, karanlik kisim ayni fotografin cok karartilmis hali (kul isigi gibi),
// aradaki sinir (terminator) hafifce yumusatilir.
export default function MoonIcon({ fraction, size = 40, label }: { fraction: number; size?: number; label?: string }) {
  const r = 50;
  const cx = 50;
  const cy = 50;
  const angle = fraction * 2 * Math.PI;
  // Sunucu ve tarayıcı son basamakta farklı yuvarlayabiliyor (hydration uyumsuzluğu); iki ondalık yeterli.
  const rx = Math.round(Math.abs(Math.cos(angle)) * r * 100) / 100;
  const waxing = fraction < 0.5;
  const gibbous = Math.cos(angle) < 0;
  // Aydinlik yari daire + terminator elipsi.
  const litSweep = waxing ? 1 : 0;
  const termSweep = waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1;
  const d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${litSweep} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${termSweep} ${cx} ${cy - r} Z`;
  const yeni = fraction <= 0.005 || fraction >= 0.995;
  const dolu = Math.abs(fraction - 0.5) < 0.005;
  // Ayni evre ve boyuttaki ikonlar ayni maskeyi paylasir (kimlik icerige gore; sayfada tekrar etse de ayni tanim).
  const maske = `ay-maske-${Math.round(fraction * 1000)}`;
  const foto = size > 120 ? "/ay/ay-480.webp" : "/ay/ay-160.webp";
  return (
    <svg className="moon-icon" viewBox="0 0 100 100" width={size} height={size} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <clipPath id="ay-disk">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        <filter id="ay-terminator" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        {!yeni && !dolu && (
          <mask id={maske}>
            <rect width="100" height="100" fill="black" />
            <path d={d} fill="white" filter="url(#ay-terminator)" />
          </mask>
        )}
      </defs>
      <circle cx={cx} cy={cy} r={r} className="moon-icon-dark" />
      <image href={foto} x="0" y="0" width="100" height="100" clipPath="url(#ay-disk)" className="moon-icon-golge" />
      {!yeni && <image href={foto} x="0" y="0" width="100" height="100" clipPath="url(#ay-disk)" mask={dolu ? undefined : `url(#${maske})`} />}
    </svg>
  );
}

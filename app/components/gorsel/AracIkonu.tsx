import type { AracIkon } from "../../converter/gorsel/dosyaAraclari";

const RENK: Record<string, { zemin: string; yazi: string; ad: string }> = {
  jpg: { zemin: "#f08a24", yazi: "#ffffff", ad: "JPG" },
  png: { zemin: "#2f6fde", yazi: "#ffffff", ad: "PNG" },
  webp: { zemin: "#1f9d57", yazi: "#ffffff", ad: "WEBP" },
  tum: { zemin: "#5b6b78", yazi: "#ffffff", ad: "IMG" },
  heic: { zemin: "#1c1c1e", yazi: "#ffffff", ad: "HEIC" },
  pdf: { zemin: "#e5322d", yazi: "#ffffff", ad: "PDF" },
};

/** Sayfa köşesi kıvrık küçük dosya rozeti. */
function Dosya({ x, y, f }: { x: number; y: number; f: string }) {
  const r = RENK[f];
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 4a4 4 0 0 1 4-4h14l8 8v20a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z"
        fill={r.zemin}
      />
      <path d="M18 0v5a3 3 0 0 0 3 3h5z" fill="#ffffff" opacity="0.45" />
      <text
        x="13"
        y="23"
        textAnchor="middle"
        fontSize={r.ad.length > 3 ? 7 : 8.5}
        fontWeight="700"
        fill={r.yazi}
        fontFamily="system-ui, sans-serif"
      >
        {r.ad}
      </text>
    </g>
  );
}

/** Dosya Araçları kartlarının ikonları: format çiftleri için iki dosya rozeti ve ok. */
export default function AracIkonu({
  ikon,
  boyut = 52,
}: {
  ikon: AracIkon;
  boyut?: number;
}) {
  return (
    <svg
      width={boyut}
      height={boyut}
      viewBox="0 0 52 52"
      aria-hidden="true"
      focusable="false"
    >
      {ikon.tip === "cift" ? (
        <>
          <Dosya x={2} y={2} f={ikon.kaynak} />
          <Dosya x={26} y={20} f={ikon.hedef} />
          <path
            d="M31 6h6a4 4 0 0 1 4 4v4"
            stroke="#8a98a5"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M37.5 11.5 41 15l3.5-3.5"
            stroke="#8a98a5"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : ikon.tip === "kucult" ? (
        <>
          <rect x="4" y="4" width="44" height="44" rx="10" fill="#e8f5ee" />
          <rect x="15" y="15" width="22" height="22" rx="4" fill="#1f9d57" />
          {[
            "M8 8l7 7M15 9.5V15H9.5",
            "M44 8l-7 7M37 9.5V15h5.5",
            "M8 44l7-7M15 42.5V37H9.5",
            "M44 44l-7-7M37 42.5V37h5.5",
          ].map((d) => (
            <path
              key={d}
              d={d}
              stroke="#1f9d57"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </>
      ) : ikon.tip === "filigran" ? (
        <>
          <rect x="4" y="4" width="44" height="44" rx="10" fill="#e8f1fb" />
          <rect
            x="11"
            y="11"
            width="30"
            height="30"
            rx="4"
            fill="#ffffff"
            stroke="#2f6fde"
            strokeWidth="2"
          />
          <path
            d="M11 34l9-9 7 7 5-5 9 9"
            stroke="#9cbbe9"
            strokeWidth="2"
            fill="none"
          />
          <text
            x="26"
            y="26"
            textAnchor="middle"
            fontSize="8"
            fontWeight="800"
            fill="#2f6fde"
            opacity="0.75"
            transform="rotate(-30 26 26)"
            fontFamily="system-ui, sans-serif"
          >
            ©LOGO
          </text>
        </>
      ) : ikon.tip === "pdf" ? (
        ikon.islem === "birlestir" ? (
          <>
            <Dosya x={2} y={4} f="pdf" />
            <Dosya x={24} y={4} f="pdf" />
            <path
              d="M14 40v4a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-4"
              stroke="#e5322d"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M26 38v9"
              stroke="#e5322d"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <Dosya x={13} y={2} f="pdf" />
            <path
              d="M8 40h36"
              stroke="#e5322d"
              strokeWidth="2.4"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
            <circle
              cx="14"
              cy="45"
              r="3"
              fill="none"
              stroke="#5b6b78"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="45"
              r="3"
              fill="none"
              stroke="#5b6b78"
              strokeWidth="2"
            />
          </>
        )
      ) : ikon.tip === "ocr" ? (
        <>
          <rect x="4" y="4" width="44" height="44" rx="10" fill="#fff4e0" />
          <path
            d="M10 17v-5a2 2 0 0 1 2-2h5M35 10h5a2 2 0 0 1 2 2v5M42 35v5a2 2 0 0 1-2 2h-5M17 42h-5a2 2 0 0 1-2-2v-5"
            stroke="#d97706"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
          <text
            x="26"
            y="31"
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill="#b45309"
            fontFamily="system-ui, sans-serif"
          >
            Aa
          </text>
        </>
      ) : ikon.tip === "bulanik" ? (
        <>
          <rect x="4" y="4" width="44" height="44" rx="10" fill="#eef0f3" />
          <circle cx="26" cy="20" r="7" fill="#5b6b78" />
          <path d="M13 40c1.5-7 6.5-11 13-11s11.5 4 13 11" fill="#5b6b78" />
          {[0, 1, 2].map((i) =>
            [0, 1, 2].map((j) => (
              <rect
                key={`${i}${j}`}
                x={17 + i * 6}
                y={11 + j * 6}
                width="6"
                height="6"
                fill={(i + j) % 2 ? "#aab4bd" : "#c9d0d6"}
                opacity="0.95"
              />
            )),
          )}
        </>
      ) : ikon.tip === "kirp" ? (
        <>
          <rect x="4" y="4" width="44" height="44" rx="10" fill="#f3ecfd" />
          <path
            d="M16 8v26a2 2 0 0 0 2 2h26"
            stroke="#7b4bd1"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M8 16h26a2 2 0 0 1 2 2v26"
            stroke="#7b4bd1"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x="20"
            y="20"
            width="12"
            height="12"
            fill="#7b4bd1"
            opacity="0.25"
          />
        </>
      ) : ikon.tip === "konum" ? (
        <>
          <rect x="4" y="4" width="44" height="44" rx="10" fill="#fdecea" />
          <path
            d="M26 10c-7 0-12 5.2-12 11.8C14 30.5 26 42 26 42s12-11.5 12-20.2C38 15.2 33 10 26 10z"
            fill="#d64532"
          />
          <circle cx="26" cy="22" r="4.5" fill="#fdecea" />
          <path
            d="M12 40L40 12"
            stroke="#fdecea"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M12 40L40 12"
            stroke="#8a1c12"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </>
      ) : ikon.tip === "boyut" ? (
        <>
          <rect x="4" y="4" width="44" height="44" rx="10" fill="#e9f0fd" />
          <rect
            x="10"
            y="20"
            width="22"
            height="22"
            rx="3"
            fill="none"
            stroke="#2f6fde"
            strokeWidth="2.4"
            strokeDasharray="4 3"
          />
          <rect
            x="10"
            y="10"
            width="32"
            height="32"
            rx="3"
            fill="none"
            stroke="#2f6fde"
            strokeWidth="2.4"
          />
          <path
            d="M26 26l12-12M32 14h6v6"
            stroke="#2f6fde"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <rect x="4" y="4" width="44" height="44" rx="10" fill="#fdf0e3" />
          <rect
            x="14"
            y="8"
            width="24"
            height="32"
            rx="3"
            fill="#ffffff"
            stroke="#f08a24"
            strokeWidth="2.2"
          />
          <circle cx="26" cy="20" r="5.5" fill="#f08a24" />
          <path d="M16.5 36c1.5-6 5-9 9.5-9s8 3 9.5 9" fill="#f08a24" />
          <path
            d="M10 44h32"
            stroke="#f08a24"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

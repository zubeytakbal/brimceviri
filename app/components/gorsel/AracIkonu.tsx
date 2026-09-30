import type { AgSimge, AracIkon } from "../../converter/gorsel/dosyaAraclari";

const RENK: Record<string, { zemin: string; yazi: string; ad: string }> = {
  jpg: { zemin: "#f08a24", yazi: "#ffffff", ad: "JPG" },
  png: { zemin: "#2f6fde", yazi: "#ffffff", ad: "PNG" },
  webp: { zemin: "#1f9d57", yazi: "#ffffff", ad: "WEBP" },
  tum: { zemin: "#5b6b78", yazi: "#ffffff", ad: "IMG" },
  heic: { zemin: "#1c1c1e", yazi: "#ffffff", ad: "HEIC" },
  pdf: { zemin: "#e5322d", yazi: "#ffffff", ad: "PDF" },
  avif: { zemin: "#7b3fbf", yazi: "#ffffff", ad: "AVIF" },
  gif: { zemin: "#d6336c", yazi: "#ffffff", ad: "GIF" },
  bmp: { zemin: "#0f7c8c", yazi: "#ffffff", ad: "BMP" },
  svg: { zemin: "#f5a524", yazi: "#1c1c1e", ad: "SVG" },
  tiff: { zemin: "#4a5a6a", yazi: "#ffffff", ad: "TIFF" },
  jfif: { zemin: "#b8601a", yazi: "#ffffff", ad: "JFIF" },
  ico: { zemin: "#2b2d42", yazi: "#ffffff", ad: "ICO" },
  b64: { zemin: "#3d5a80", yazi: "#ffffff", ad: "B64" },
  ses: { zemin: "#5b6b78", yazi: "#ffffff", ad: "SES" },
  mp3: { zemin: "#7a3fe0", yazi: "#ffffff", ad: "MP3" },
  mp4: { zemin: "#0b6e99", yazi: "#ffffff", ad: "MP4" },
  mov: { zemin: "#1c1c1e", yazi: "#ffffff", ad: "MOV" },
  xlsx: { zemin: "#1d6f42", yazi: "#ffffff", ad: "XLSX" },
  csv: { zemin: "#3b8f5c", yazi: "#ffffff", ad: "CSV" },
  json: { zemin: "#f0b400", yazi: "#1c1c1e", ad: "JSON" },
  zip: { zemin: "#8e6c3a", yazi: "#ffffff", ad: "ZIP" },
  rar: { zemin: "#6d2a8c", yazi: "#ffffff", ad: "RAR" },
  "7z": { zemin: "#1f1f1f", yazi: "#ffffff", ad: "7Z" },
  wav: { zemin: "#2a9d8f", yazi: "#ffffff", ad: "WAV" },
  m4a: { zemin: "#e76f51", yazi: "#ffffff", ad: "M4A" },
  opus: { zemin: "#25a244", yazi: "#ffffff", ad: "OPUS" },
  ogg: { zemin: "#8d6e63", yazi: "#ffffff", ad: "OGG" },
  flac: { zemin: "#264653", yazi: "#ffffff", ad: "FLAC" },
  udf: { zemin: "#1b3a6b", yazi: "#ffffff", ad: "UDF" },
  eyp: { zemin: "#8a1c2b", yazi: "#ffffff", ad: "EYP" },
  docx: { zemin: "#2b579a", yazi: "#ffffff", ad: "DOC" },
  imz: { zemin: "#0d6e5c", yazi: "#ffffff", ad: "İMZ" },
  p7s: { zemin: "#3a4d8f", yazi: "#ffffff", ad: "P7S" },
  xml: { zemin: "#c2410c", yazi: "#ffffff", ad: "XML" },
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

const AG: Record<AgSimge, { renk: string; yazi: string }> = {
  subnet: { renk: "#2563eb", yazi: "/24" },
  ip: { renk: "#0f766e", yazi: "IP" },
  ipv6: { renk: "#7c3aed", yazi: "v6" },
  indirme: { renk: "#0891b2", yazi: "" },
  hash: { renk: "#475569", yazi: "#" },
  md5: { renk: "#b45309", yazi: "MD5" },
  sha: { renk: "#be123c", yazi: "SHA" },
  mac: { renk: "#4d7c0f", yazi: "MAC" },
  port: { renk: "#c2410c", yazi: ":443" },
  cihaz: { renk: "#334155", yazi: "" },
};

/** Ağ araçları için renkli rozet; bazılarında küçük çizim. */
function AgRozet({ simge }: { simge: AgSimge }) {
  const r = AG[simge];
  return (
    <>
      <rect x="4" y="4" width="44" height="44" rx="11" fill={r.renk} />
      {simge === "indirme" ? (
        <>
          <path
            d="M26 13v17m-7-7 7 7 7-7"
            stroke="#fff"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 37h20"
            stroke="#fff"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </>
      ) : simge === "cihaz" ? (
        <>
          <rect
            x="12"
            y="14"
            width="22"
            height="16"
            rx="2"
            fill="none"
            stroke="#fff"
            strokeWidth="2.6"
          />
          <path
            d="M18 36h10M23 30v6"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <rect
            x="33"
            y="22"
            width="9"
            height="16"
            rx="2"
            fill={r.renk}
            stroke="#fff"
            strokeWidth="2.4"
          />
        </>
      ) : simge === "subnet" ? (
        <>
          <circle cx="26" cy="15" r="4" fill="#fff" />
          <circle cx="15" cy="36" r="4" fill="#fff" />
          <circle cx="26" cy="36" r="4" fill="#fff" />
          <circle cx="37" cy="36" r="4" fill="#fff" />
          <path
            d="M26 19v13M26 25H15v7M26 25h11v7"
            stroke="#fff"
            strokeWidth="2.4"
            fill="none"
          />
        </>
      ) : (
        <text
          x="26"
          y="31"
          textAnchor="middle"
          fontSize={r.yazi.length > 3 ? 11 : r.yazi.length > 2 ? 13 : 16}
          fontWeight="800"
          fill="#fff"
          fontFamily="system-ui, sans-serif"
        >
          {r.yazi}
        </text>
      )}
    </>
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
      {ikon.tip === "ag" ? (
        <AgRozet simge={ikon.simge} />
      ) : ikon.tip === "cift" ? (
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
      ) : ikon.tip === "pdf" && ikon.islem === "sikistir" ? (
        <>
          <Dosya x={13} y={10} f="pdf" />
          <path
            d="M26 2v7M22 6l4 4 4-4M26 50v-7M22 46l4-4 4 4"
            stroke="#5b6b78"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : ikon.tip === "pdf" && ikon.islem === "filigran" ? (
        <>
          <Dosya x={4} y={4} f="pdf" />
          <rect
            x="18"
            y="16"
            width="30"
            height="32"
            rx="4"
            fill="#ffffff"
            stroke="#5b6b78"
            strokeWidth="2"
          />
          <text
            x="33"
            y="35"
            textAnchor="middle"
            fontSize="8"
            fontWeight="800"
            fill="#e5322d"
            opacity="0.7"
            transform="rotate(-35 33 32)"
            fontFamily="system-ui, sans-serif"
          >
            GİZLİ
          </text>
        </>
      ) : ikon.tip === "pdf" && ikon.islem === "imza" ? (
        <>
          <Dosya x={4} y={4} f="pdf" />
          <path
            d="M20 44c4-8 7-10 8-6s-1 6 3 1 5-6 6-2 3 3 8-1"
            stroke="#1a3fa6"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M18 48h30" stroke="#5b6b78" strokeWidth="1.6" />
        </>
      ) : ikon.tip === "pdf" &&
        (ikon.islem === "kilit" || ikon.islem === "kilitac") ? (
        <>
          <Dosya x={4} y={2} f="pdf" />
          <rect x="26" y="30" width="20" height="16" rx="3" fill="#1f2a33" />
          <path
            d={
              ikon.islem === "kilit"
                ? "M30 30v-5a6 6 0 0 1 12 0v5"
                : "M30 30v-5a6 6 0 0 1 11.5-2.4"
            }
            stroke="#1f2a33"
            strokeWidth="2.6"
            fill="none"
          />
          <circle cx="36" cy="38" r="2.2" fill="#ffffff" />
        </>
      ) : ikon.tip === "pdf" && ikon.islem === "duzenle" ? (
        <>
          <Dosya x={4} y={4} f="pdf" />
          <path
            d="M44 30a11 11 0 1 1-4-8.5"
            stroke="#5b6b78"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M41 16l0 7-7 0"
            stroke="#5b6b78"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : ikon.tip === "pdf" && ikon.islem === "numara" ? (
        <>
          <Dosya x={4} y={2} f="pdf" />
          <rect
            x="24"
            y="30"
            width="24"
            height="18"
            rx="4"
            fill="#ffffff"
            stroke="#5b6b78"
            strokeWidth="2"
          />
          <text
            x="36"
            y="43"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#5b6b78"
            fontFamily="system-ui, sans-serif"
          >
            1/3
          </text>
        </>
      ) : ikon.tip === "pdf" && ikon.islem === "metin" ? (
        <>
          <Dosya x={2} y={4} f="pdf" />
          <rect
            x="30"
            y="18"
            width="18"
            height="26"
            rx="3"
            fill="#ffffff"
            stroke="#5b6b78"
            strokeWidth="2"
          />
          <path
            d="M34 25h10M34 30h10M34 35h7"
            stroke="#5b6b78"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
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
      ) : ikon.tip === "video" ? (
        <>
          <rect x="4" y="10" width="44" height="32" rx="7" fill="#0b6e99" />
          <path d="M22 19v14l12-7z" fill="#ffffff" />
          {ikon.islem === "sikistir" ? (
            <path
              d="M26 2v6M22 5l4 4 4-4M26 50v-6M22 47l4-4 4 4"
              stroke="#5b6b78"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : ikon.islem === "kes" ? (
            <path
              d="M14 6v40M38 6v40"
              stroke="#f5a524"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          ) : ikon.islem === "dondur" ? (
            <path
              d="M42 46a10 10 0 0 0 6-9M48 44v-7h-7"
              stroke="#f5a524"
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <>
              <circle
                cx="42"
                cy="42"
                r="9"
                fill="#ffffff"
                stroke="#e5322d"
                strokeWidth="2.4"
              />
              <path d="M36 48l12-12" stroke="#e5322d" strokeWidth="2.4" />
            </>
          )}
        </>
      ) : ikon.tip === "qr" || ikon.tip === "qroku" ? (
        <>
          <rect
            x="6"
            y="6"
            width="40"
            height="40"
            rx="6"
            fill="#ffffff"
            stroke="#1f2a33"
            strokeWidth="2.4"
          />
          <path
            d="M12 12h10v10H12zM30 12h10v10H30zM12 30h10v10H12zM15 15h4v4h-4zM33 15h4v4h-4zM15 33h4v4h-4zM30 30h4v4h-4zM36 36h4v4h-4zM30 38h4v2h-4zM38 30h2v4h-2z"
            fill="#1f2a33"
          />
          {ikon.tip === "qroku" ? (
            <path
              d="M2 26h48"
              stroke="#e5322d"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          ) : null}
        </>
      ) : ikon.tip === "sifre" ? (
        <>
          <rect x="10" y="22" width="32" height="24" rx="5" fill="#2a9d8f" />
          <path
            d="M17 22v-6a9 9 0 0 1 18 0v6"
            stroke="#2a9d8f"
            strokeWidth="4"
            fill="none"
          />
          <text
            x="26"
            y="39"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#ffffff"
            fontFamily="system-ui, sans-serif"
          >
            ***
          </text>
        </>
      ) : ikon.tip === "fark" ? (
        <>
          <rect
            x="4"
            y="8"
            width="20"
            height="36"
            rx="4"
            fill="#fde2e1"
            stroke="#e5322d"
            strokeWidth="2"
          />
          <rect
            x="28"
            y="8"
            width="20"
            height="36"
            rx="4"
            fill="#dff5e7"
            stroke="#1f9d57"
            strokeWidth="2"
          />
          <path
            d="M9 18h10M9 26h6M9 34h10"
            stroke="#e5322d"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M33 18h10M33 26h10M33 34h7"
            stroke="#1f9d57"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </>
      ) : ikon.tip === "seskes" ? (
        <>
          <rect x="4" y="8" width="44" height="36" rx="8" fill="#7a3fe0" />
          <path
            d="M11 26v0M15 20v12M19 16v20M23 22v8M27 14v24M31 19v14M35 23v6M39 18v16M43 25v2"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M17 6v40M35 6v40"
            stroke="#f5a524"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </>
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

/** ISO hafta numarası, yerin yerel tarihine göre (gazete "sayısı" olarak). */
export function haftaNo(an: Date, timeZone: string) {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(an).split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  const g = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - g);
  return Math.ceil(((t.getTime() - Date.UTC(t.getUTCFullYear(), 0, 1)) / 86400000 + 1) / 7);
}

/** Saat bölümü gazetesinin başlığı ve tarih satırı. */
export default function GazeteBaslik({ an, timeZone, baski }: { an: Date; timeZone: string; baski: string }) {
  return (
    <header className="gazete-baslik" aria-hidden="true">
      <div className="gazete-ust">
        <span>Her gün güncellenir</span>
        <span>Sayı {haftaNo(an, timeZone)}</span>
      </div>
      <p className="gazete-ad">Saat ve Takvim</p>
      <div className="gazete-tarih">
        <span>{new Intl.DateTimeFormat("tr-TR", { timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(an)}</span>
        <span>{baski} baskısı</span>
        <span>birimceviri.app</span>
      </div>
    </header>
  );
}

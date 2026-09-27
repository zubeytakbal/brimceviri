"use client";

// Tatilleri telefon/Outlook/Google Takvim'e aktarmak icin .ics dosyasi olusturur.
export default function HolidayIcsButton({
  items,
  fileName,
  label,
  calendarName,
}: {
  items: Array<{ date: string; name: string }>;
  fileName: string;
  label: string;
  calendarName: string;
}) {
  const download = () => {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
    const escape = (text: string) => text.replace(/\\/g, "\\\\").replace(/[,;]/g, (c) => `\\${c}`);
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//BirimCeviri.app//Holidays//EN",
      "CALSCALE:GREGORIAN",
      `X-WR-CALNAME:${escape(calendarName)}`,
      ...items.flatMap((item) => {
        const day = item.date.replace(/-/g, "");
        const next = new Date(`${item.date}T00:00:00Z`);
        next.setUTCDate(next.getUTCDate() + 1);
        const end = next.toISOString().slice(0, 10).replace(/-/g, "");
        return [
          "BEGIN:VEVENT",
          `UID:${day}-${encodeURIComponent(item.name).slice(0, 40)}@birimceviri.app`,
          `DTSTAMP:${stamp}`,
          `DTSTART;VALUE=DATE:${day}`,
          `DTEND;VALUE=DATE:${end}`,
          `SUMMARY:${escape(item.name)}`,
          "TRANSP:TRANSPARENT",
          "END:VEVENT",
        ];
      }),
      "END:VCALENDAR",
    ];
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <button type="button" className="time-tool-button is-secondary" onClick={download}>
      📅 {label}
    </button>
  );
}

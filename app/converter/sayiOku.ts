/** Türkçe sayı girişi: "1,5" ve "1.5" ondalık; "1.000" ve "1.000,5" binlik ayırıcılı okunur. */
export function ondalik(raw: string) {
  let s = raw.trim().replace(/\s/g, "");
  if (!s) return Number.NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  return Number(s);
}

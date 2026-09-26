// Turkce ve Almanca icin ortak kullanilan bilesenlerin dil secenegi.
// Yeni bir dil eklerken bu tipe ekleyip ilgili bilesenin metin tablosunu
// (copy) doldurmak yeterlidir.
export type ContentLocale = "tr" | "de";

export const numberLocales: Record<ContentLocale, string> = {
  tr: "tr-TR",
  de: "de-DE",
};

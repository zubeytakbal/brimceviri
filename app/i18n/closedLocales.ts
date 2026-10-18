// Dizine kapalı diller (app/indexPolicy.ts): trafiği çok düşük, sayfaların çoğu kalıptan üretilmiş.
// Ayrı dosyada tutulur ki istemci tarafındaki dil menüsü tıklama listesini paketine almasın.
export const CLOSED_LOCALES = ["it", "fr", "pt", "nl", "no", "sv", "da"] as const;

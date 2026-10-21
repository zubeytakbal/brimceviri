// Dizine kapalı diller (app/indexPolicy.ts): trafiği çok düşük, sayfaların çoğu kalıptan üretilmiş.
// Ayrı dosyada tutulur ki istemci tarafındaki dil menüsü tıklama listesini paketine almasın.
// 21 Ekim 2026: site sahibinin kararıyla bütün diller yeniden dizine açık (önceden: it, fr, pt, nl, no, sv, da).
export const CLOSED_LOCALES: readonly string[] = [];

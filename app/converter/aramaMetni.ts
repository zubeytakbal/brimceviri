// Arama metni: büyük/küçük harf ve Türkçe karakter farkını yok sayar ("İnç" ve "inc" aynı). Sunucu ve istemci ortak kullanır.
const HARF: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

export function aramaMetni(s: string) {
  return s
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüâîû]/g, (c) => HARF[c])
    .replace(/[^a-z0-9µ²³°%]+/g, " ")
    .trim();
}

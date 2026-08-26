/**
 * BirimCeviri.app - Google E-Tablolar Birim Cevirme Fonksiyonlari
 *
 * Kurulum: Uzantilar > Apps Script'i acin, bu dosyanin tum icerigini
 * yapistirip kaydedin. Sonra herhangi bir hucreye =BIRIMCEVIR(...)
 * yazarak kullanabilirsiniz. Detayli kurulum icin README.md'ye bakin.
 */

var API_BASE = "https://www.birimceviri.app/api/v1";
var CACHE_TTL_SECONDS = 3600;

/**
 * Bir degeri bir birimden digerine cevirir.
 *
 * Ornek: =BIRIMCEVIR(5, "kutle", "kg", "lb")
 * Ornek: =BIRIMCEVIR(100, "sicaklik", "C", "F")
 *
 * Kategori ve birim kodlarini gormek icin =BIRIMCEVIR_BIRIMLER("kutle")
 * kullanin. Kategori zorunludur -- bazi birim sembolleri (orn. "F"
 * hem Fahrenheit hem Farad, "C" hem Celsius hem Coulomb) kategoriler
 * arasi cakisir, bu yuzden otomatik tahmin guvenli degildir.
 *
 * @param {number} deger Cevrilecek sayisal deger.
 * @param {string} kategori Birim kategorisi (orn. "kutle", "uzunluk", "sicaklik").
 * @param {string} kaynakBirim Kaynak birim sembolu (orn. "kg").
 * @param {string} hedefBirim Hedef birim sembolu (orn. "lb").
 * @return {number} Cevrilmis deger.
 * @customfunction
 */
function BIRIMCEVIR(deger, kategori, kaynakBirim, hedefBirim) {
  if (deger === "" || deger === null || typeof deger === "undefined") {
    throw new Error("Deger bos olamaz.");
  }

  if (!kategori || !kaynakBirim || !hedefBirim) {
    throw new Error("Kategori, kaynak birim ve hedef birim gereklidir.");
  }

  var cache = CacheService.getScriptCache();
  var cacheKey =
    "conv:" + kategori + ":" + kaynakBirim + ":" + hedefBirim + ":" + deger;
  var cached = cache.get(cacheKey);

  if (cached !== null) {
    return Number(cached);
  }

  var url =
    API_BASE +
    "/convert?category=" +
    encodeURIComponent(kategori) +
    "&from=" +
    encodeURIComponent(kaynakBirim) +
    "&to=" +
    encodeURIComponent(hedefBirim) +
    "&value=" +
    encodeURIComponent(deger);

  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var body = JSON.parse(response.getContentText());

  if (response.getResponseCode() !== 200) {
    throw new Error(body.error || "Donusum basarisiz oldu.");
  }

  cache.put(cacheKey, String(body.result), CACHE_TTL_SECONDS);

  return body.result;
}

/**
 * Bir kategorideki gecerli birim sembollerini ve adlarini listeler.
 *
 * Ornek: =BIRIMCEVIR_BIRIMLER("kutle")
 *
 * @param {string} kategori Birim kategorisi (orn. "kutle").
 * @return {Array<Array<string>>} [sembol, isim] satirlarindan olusan tablo.
 * @customfunction
 */
function BIRIMCEVIR_BIRIMLER(kategori) {
  if (!kategori) {
    throw new Error("Kategori gereklidir.");
  }

  var data = fetchCategories_();
  var match = null;

  for (var i = 0; i < data.categories.length; i++) {
    if (data.categories[i].category === kategori) {
      match = data.categories[i];
      break;
    }
  }

  if (!match) {
    throw new Error('Kategori bulunamadi: "' + kategori + '"');
  }

  return match.units.map(function (unit) {
    return [unit.symbol, unit.name];
  });
}

/**
 * Kullanilabilir tum kategori kodlarini listeler.
 *
 * Ornek: =BIRIMCEVIR_KATEGORILER()
 *
 * @return {Array<Array<string>>} Kategori kodlarindan olusan tek sutunlu tablo.
 * @customfunction
 */
function BIRIMCEVIR_KATEGORILER() {
  var data = fetchCategories_();

  return data.categories.map(function (entry) {
    return [entry.category];
  });
}

function fetchCategories_() {
  var cache = CacheService.getScriptCache();
  var cacheKey = "categories";
  var cached = cache.get(cacheKey);

  if (cached !== null) {
    return JSON.parse(cached);
  }

  var response = UrlFetchApp.fetch(API_BASE + "/categories", {
    muteHttpExceptions: true,
  });
  var data = JSON.parse(response.getContentText());

  cache.put(cacheKey, JSON.stringify(data), CACHE_TTL_SECONDS);

  return data;
}

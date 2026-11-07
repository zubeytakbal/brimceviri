// 25 Ekim 2026: Tarih & Saat bölümünde Search Console'un son 3 ayında (24 Temmuz – 24 Ekim 2026) hiç tık almayan
// ve 27–29 Eylül'den eski sayfalar kaldırıldı (şehir saatleri hariç: aranan konu, önce iyileştirilecek); her adres kalıcı (301) olarak yanındaki sayfaya yönlenir. Aynı konuda
// iki sayfa olan günlerde (geri sayım ve özel gün) yalnızca daha çok tıklanan, eşitlikte daha çok gösterim alan kaldı.
// Ekim'de eklenen sayfalar (20 Ekim başkentleri, 18–21 Ekim geri sayım ve özel günleri, yeni araçlar) 1 Aralık 2026'da
// aynı kuralla değerlendirilecek. Bu listeden bir satırı silmek o sayfayı geri getirir.
export const KALDIRILAN_SAAT_SAYFALARI: Readonly<Record<string, string>> = {
  // Takvim gün ve ay sayfaları (171)
  // Özel günler (20)
  // 25 Ekim 2026, ikinci tur: Özel günler (21). Aynı günün dolu geri sayım sayfası olanlar oraya, Search Console'da
  // o güne ait hiç arama görünmeyenler Özel Günler ana sayfasına gider.
  // Geri sayımlar (7)
  // Hazır alarm saatleri (10)
  // 25 Ekim 2026, ikinci tur: kalan 5 hazır alarm saati. Ana sayfadaki hazır saat tablosu aynı işi (alarmı o saate kurma
  // ve yatış önerileri) yapıyor; sayfalar ortak metnin %81'ini paylaşıyordu.
  // Hazır zamanlayıcı süreleri (4)
  // Yıllara göre resmî tatiller (1)
  // Araçlar (4)
};

export const saatSayfasiKalkti = (path: string) => Object.hasOwn(KALDIRILAN_SAAT_SAYFALARI, path);

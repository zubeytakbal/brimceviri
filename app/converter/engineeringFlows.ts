// Türkçe mühendislik araçları arasındaki iş akışı bağlantıları ("Sonraki adım").
// Her bağlantı, bir hesabın doğal olarak hangi hesaba devam ettiğini anlatır.
export type FlowLink = { href: string; label: string; why: string };

const E = "/muhendislik-hesaplayicilari/elektrik-hesaplari";

export const ENGINEERING_FLOWS: Record<string, FlowLink[]> = {
  // Elektrik
  [`${E}/kw-to-amper-hesaplama`]: [
    { href: `${E}/gerilim-dusumu-hesaplama`, label: "Gerilim Düşümü", why: "Seçtiğiniz kesit ve hat uzunluğunda gerilim düşümünü kontrol edin." },
    { href: "/motor-devir-hesaplama", label: "Motor Devri", why: "Yük bir motorsa kutup sayısından senkron devri ve kaymayı bulun." },
  ],
  "/awg-mm2-cevirici": [
    { href: `${E}/gerilim-dusumu-hesaplama`, label: "Gerilim Düşümü", why: "Seçtiğiniz kesitte hat sonundaki gerilim düşümünü kontrol edin." },
  ],
  [`${E}/gerilim-dusumu-hesaplama`]: [
    { href: `${E}/kw-to-amper-hesaplama`, label: "kW to Amper", why: "Hat akımını yükün gücünden bulun." },
  ],

  // Akışkanlar ve tesisat
  "/boru-capi-hesaplama": [
    { href: "/basinc-kaybi-hesaplama", label: "Basınç Kaybı", why: "Seçtiğiniz çapta borudaki sürtünme kaybını hesaplayın." },
    { href: "/pompa-gucu-hesaplama", label: "Pompa Gücü", why: "Debi ve basma yüksekliğinden pompa gücünü bulun." },
    { href: "/boru-capi-donusum-hesaplama", label: "Boru Çapı Dönüşümü (DN-NPS)", why: "Bulduğunuz iç çapa karşılık gelen DN ölçüsünü seçin." },
    { href: "/hesaplayicilar/reynolds-sayisi", label: "Reynolds Sayısı", why: "Akışın laminer mi türbülanslı mı olduğunu kontrol edin." },
  ],
  "/basinc-kaybi-hesaplama": [
    { href: "/boru-capi-hesaplama", label: "Boru Çapı ve Akış Hızı", why: "Kayıp yüksekse çapı büyütüp akış hızını yeniden kontrol edin." },
    { href: "/boru-agirlik-hesaplama", label: "Boru Ağırlığı", why: "Hattın boş ve su dolu ağırlığını askı seçimi için bulun." },
  ],
  "/boru-capi-donusum-hesaplama": [
    { href: "/boru-agirlik-hesaplama", label: "Boru Ağırlığı", why: "Seçtiğiniz DN borunun metre ağırlığını hesaplayın." },
    { href: "/boru-capi-hesaplama", label: "Boru Çapı ve Akış Hızı", why: "Bu çapta debi ve akış hızını hesaplayın." },
  ],
  "/boru-agirlik-hesaplama": [
    { href: "/boru-capi-donusum-hesaplama", label: "Boru Çapı Dönüşümü (DN-NPS)", why: "DN, inç ve dış çap karşılıklarını görün." },
    { href: "/basinc-kaybi-hesaplama", label: "Basınç Kaybı", why: "Aynı hattın basınç kaybını hesaplayın." },
  ],

  // Malzeme ve çelik
  "/malzeme-agirligi-hesaplama": [
    { href: "/sac-agirlik-hesaplama", label: "Sac Ağırlığı", why: "Levhalarda ölçüden doğrudan ağırlık bulun." },
    { href: "/demir-agirlik-hesaplama", label: "İnşaat Demiri Ağırlığı", why: "Çap ve boydan donatı tonajını hesaplayın." },
  ],
  "/demir-agirlik-hesaplama": [
    { href: "/beton-hesaplama", label: "Beton Hesaplama", why: "Aynı eleman için beton hacmini ve malzeme miktarını bulun." },
  ],
  "/sac-agirlik-hesaplama": [
    { href: "/kutu-profil-agirlik-hesaplama", label: "Kutu Profil Ağırlığı", why: "Sactan bükülen kutu profillerin metre ağırlığı." },
    { href: "/kaynak-isi-girdisi-hesaplama", label: "Kaynak Isı Girdisi", why: "Sacı kaynaklarken ısı girdisini kontrol edin." },
  ],
  "/kutu-profil-agirlik-hesaplama": [
    { href: "/sac-agirlik-hesaplama", label: "Sac Ağırlığı", why: "Bağlantı levhalarının ağırlığını ekleyin." },
  ],
  "/elastik-uzama-hesaplama": [
    { href: "/isil-genlesme-hesaplama", label: "Isıl Genleşme", why: "Sıcaklık değişiminden gelen uzamayı da ekleyin." },
    { href: "/sertlik-donusum-hesaplama", label: "Sertlik Dönüşümü", why: "Malzemenin sertlik değerlerini ölçekler arasında çevirin." },
    { href: "/kiris-hesaplama", label: "Kiriş Hesabı", why: "Eksenel uzama yerine eğilmeyi hesaplamak için kiriş aracına geçin." },
  ],
  "/isil-genlesme-hesaplama": [
    { href: "/elastik-uzama-hesaplama", label: "Elastik Uzama", why: "Genleşme engellenirse oluşacak kuvveti Hooke yasasıyla yorumlayın." },
    { href: "/hesaplayicilar/isi-enerjisi", label: "Isı Enerjisi", why: "Parçayı ısıtmak için gereken enerjiyi hesaplayın." },
  ],

  // Makine ve imalat
  "/kesme-hizi-devir-hesaplama": [
    { href: "/sertlik-donusum-hesaplama", label: "Sertlik Dönüşümü", why: "Kesme hızı malzeme sertliğine göre seçilir; sertliği HB, HRC ve HV arasında çevirin." },
  ],
  "/kaynak-isi-girdisi-hesaplama": [
    { href: "/sac-agirlik-hesaplama", label: "Sac Ağırlığı", why: "Kaynaklanacak levhaların ağırlığını hesaplayın." },
  ],
  "/civata-torku-hesaplama": [
    { href: "/elastik-uzama-hesaplama", label: "Elastik Uzama", why: "Sıkma kuvvetinin cıvatada oluşturduğu uzamayı hesaplayın." },
  ],
  "/petek-dilim-hesaplama": [
    { href: "/u-degeri-hesaplama", label: "U Değeri", why: "Duvarınızın gerçek U değerini katmanlarına göre hesaplayın." },
    { href: "/kombi-kac-kw-hesaplama", label: "Kombi Kaç kW?", why: "Odaların toplam ısı kaybına ve sıcak suya göre kombi gücünü bulun." },
    { href: "/debi-isi-yuku-hesaplama", label: "Debiden Isı Yükü", why: "Petek devresindeki su debisini hesaplayın." },
  ],
  "/kombi-kac-kw-hesaplama": [
    { href: "/petek-dilim-hesaplama", label: "Petek Dilim Hesabı", why: "Oda oda ısı kaybını ve gereken peteği bulun." },
    { href: "/dogalgaz-tuketimi-hesaplama", label: "Doğalgaz Tüketimi", why: "Kombinin aylık doğalgaz tüketimini tahmin edin." },
    { href: "/u-degeri-hesaplama", label: "U Değeri", why: "Yalıtımın ısı kaybını ne kadar düşürdüğünü görün." },
  ],
  "/pis-su-borusu-egimi-hesaplama": [
    { href: "/basinc-kaybi-hesaplama", label: "Basınç Kaybı", why: "Basınçlı temiz su hatlarında sürtünme kaybını hesaplayın." },
    { href: "/boru-capi-hesaplama", label: "Boru Çapı ve Akış Hızı", why: "Basınçlı hatta debiye uygun boru çapını seçin." },
    { href: "/tank-hacmi-hesaplama", label: "Tank Hacmi", why: "Atık su ya da yağmur suyu deposunun hacmini hesaplayın." },
  ],
  "/tank-hacmi-hesaplama": [
    { href: "/boru-capi-hesaplama", label: "Boru Çapı ve Akış Hızı", why: "Tankı dolduracak ya da boşaltacak hattın çapını seçin." },
    { href: "/pompa-gucu-hesaplama", label: "Pompa Gücü", why: "Tankı belirli sürede doldurmak için gereken pompa gücünü bulun." },
  ],

  // Statik ve mukavemet
  "/kiris-hesaplama": [
    { href: "/atalet-momenti-hesaplama", label: "Atalet Momenti", why: "Profil dışı bir kesitin atalet momentini ve kesit modülünü bulun." },
    { href: "/burkulma-hesaplama", label: "Burkulma Hesabı", why: "Kirişi taşıyan kolonların burkulma yükünü kontrol edin." },
  ],
  "/atalet-momenti-hesaplama": [
    { href: "/kiris-hesaplama", label: "Kiriş Hesabı", why: "Bu kesitle kirişin sehimini ve gerilmesini hesaplayın." },
    { href: "/burkulma-hesaplama", label: "Burkulma Hesabı", why: "Atalet yarıçapıyla basınç çubuğunun narinliğini bulun." },
  ],
  "/burkulma-hesaplama": [
    { href: "/atalet-momenti-hesaplama", label: "Atalet Momenti", why: "Boru, kutu veya özel kesitin zayıf eksen değerlerini hesaplayın." },
    { href: "/kiris-hesaplama", label: "Kiriş Hesabı", why: "Kolonun taşıdığı kirişin mesnet tepkisini bulun." },
  ],
  "/mil-burulma-hesaplama": [
    { href: `${E}/kw-to-amper-hesaplama`, label: "Motor Akımı", why: "Mili döndüren motorun çektiği akımı hesaplayın." },
    { href: "/kesme-hizi-devir-hesaplama", label: "Kesme Hızı - Devir", why: "Mili işlerken torna devrini bulun." },
  ],

  // Isı ve akışkan
  "/u-degeri-hesaplama": [
    { href: "/petek-dilim-hesaplama", label: "Petek Dilim Hesabı", why: "Bulduğunuz U değeriyle odanın petek ihtiyacını hesaplayın." },
    { href: "/debi-isi-yuku-hesaplama", label: "Debiden Isı Yükü", why: "Toplam ısı kaybına göre kalorifer su debisini bulun." },
  ],
  "/pompa-gucu-hesaplama": [
    { href: "/basinc-kaybi-hesaplama", label: "Basınç Kaybı", why: "Pompanın yeneceği boru sürtünme kaybını hesaplayın." },
    { href: `${E}/kw-to-amper-hesaplama`, label: "Motor Akımı", why: "Seçilen pompa motorunun çektiği akımı bulun." },
    { href: "/boru-capi-hesaplama", label: "Boru Çapı ve Akış Hızı", why: "Debiye uygun boru çapını seçin." },
  ],
  "/debi-isi-yuku-hesaplama": [
    { href: "/boru-capi-hesaplama", label: "Boru Çapı ve Akış Hızı", why: "Bulduğunuz su debisine uygun boru çapını seçin." },
    { href: "/pompa-gucu-hesaplama", label: "Pompa Gücü", why: "Bu debiyi dolaştıracak pompanın gücünü hesaplayın." },
    { href: "/u-degeri-hesaplama", label: "U Değeri", why: "Isı yükünün kaynağı olan duvar ve çatı kayıplarını hesaplayın." },
  ],
  "/suyun-kaynama-noktasi-hesaplama": [
  ],

  // Hidrolik ve pnömatik
  "/hidrolik-silindir-hesaplama": [
    { href: "/pompa-gucu-hesaplama", label: "Pompa Gücü", why: "Hidrolik ünitenin debi ve basınçtan pompa gücünü bulun." },
    { href: "/burkulma-hesaplama", label: "Burkulma Hesabı", why: "Uzun stroklu silindirde rotun burkulma yükünü kontrol edin." },
    { href: `${E}/kw-to-amper-hesaplama`, label: "Motor Akımı", why: "Hidrolik pompa motorunun akımını hesaplayın." },
  ],

  // Elektrik ek araçları
  "/kva-kw-hesaplama": [
    { href: "/kompanzasyon-hesaplama", label: "Kompanzasyon", why: "Düşük güç faktörünü düzeltmek için gereken kVAr'ı bulun." },
  ],
  "/kompanzasyon-hesaplama": [
    { href: "/kva-kw-hesaplama", label: "kVA kW Hesaplama", why: "Kompanzasyon öncesi ve sonrası görünür gücü ve akımı karşılaştırın." },
  ],
  "/motor-devir-hesaplama": [
    { href: "/mil-burulma-hesaplama", label: "Mil Burulma Hesabı", why: "Motor gücü ve devrinden mil torkunu ve çapını bulun." },
    { href: `${E}/kw-to-amper-hesaplama`, label: "Motor Akımı", why: "Motorun çalışma akımını hesaplayın." },
  ],
};

/** Çelik profil tablolarından ortak sonraki adımlar. */
export const STEEL_TABLE_FLOW: FlowLink[] = [
  { href: "/kiris-hesaplama", label: "Kiriş Hesabı", why: "Seçtiğiniz profille kirişin sehimini, momentini ve gerilmesini hesaplayın." },
  { href: "/burkulma-hesaplama", label: "Burkulma Hesabı", why: "Profili kolon olarak kullanacaksanız Euler burkulma yükünü bulun." },
  { href: "/kutu-profil-agirlik-hesaplama", label: "Kutu Profil Ağırlığı", why: "Kare ve dikdörtgen kutu profillerle karşılaştırın." },
  { href: "/sac-agirlik-hesaplama", label: "Sac Ağırlığı", why: "Bağlantı ve taban levhalarının ağırlığını ekleyin." },
];

// Türkçe mühendislik araçları arasındaki iş akışı bağlantıları ("Sonraki adım").
// Her bağlantı, bir hesabın doğal olarak hangi hesaba devam ettiğini anlatır.
export type FlowLink = { href: string; label: string; why: string };

const E = "/muhendislik-hesaplayicilari/elektrik-hesaplari";

export const ENGINEERING_FLOWS: Record<string, FlowLink[]> = {
  // Elektrik
  [`${E}/kw-to-amper-hesaplama`]: [
    { href: `${E}/kablo-kesiti-hesaplama`, label: "Kablo Kesiti", why: "Bulduğunuz akımı taşıyacak kablo kesitini seçin." },
    { href: `${E}/gerilim-dusumu-hesaplama`, label: "Gerilim Düşümü", why: "Seçtiğiniz kesit ve hat uzunluğunda gerilim düşümünü kontrol edin." },
    { href: `${E}/motor-akimi-hesaplama`, label: "Motor Akımı", why: "Yük bir motorsa verim ve güç faktörüyle çalışma akımını bulun." },
  ],
  [`${E}/amper-to-kw-hesaplama`]: [
    { href: `${E}/kw-to-amper-hesaplama`, label: "kW to Amper", why: "Ters yönde, güçten akım hesabına geçin." },
    { href: "/elektrik-tuketimi-hesaplama", label: "Elektrik Tüketimi", why: "Bulduğunuz gücün günlük ve aylık enerji tüketimini hesaplayın." },
  ],
  [`${E}/kablo-kesiti-hesaplama`]: [
    { href: `${E}/gerilim-dusumu-hesaplama`, label: "Gerilim Düşümü", why: "Seçilen kesitte hat sonundaki gerilim düşümünü doğrulayın." },
    { href: "/awg-mm2-cevirici", label: "AWG - mm² Çevirici", why: "Kesitin Amerikan tel numarası (AWG) karşılığını bulun." },
  ],
  [`${E}/gerilim-dusumu-hesaplama`]: [
    { href: `${E}/kablo-kesiti-hesaplama`, label: "Kablo Kesiti", why: "Düşüm sınırı aşılıyorsa bir üst kesiti hesaplayın." },
    { href: `${E}/kw-to-amper-hesaplama`, label: "kW to Amper", why: "Hat akımını yükün gücünden bulun." },
  ],
  [`${E}/motor-akimi-hesaplama`]: [
    { href: `${E}/kablo-kesiti-hesaplama`, label: "Kablo Kesiti", why: "Motor besleme kablosunun kesitini seçin." },
    { href: `${E}/gerilim-dusumu-hesaplama`, label: "Gerilim Düşümü", why: "Motor hattındaki gerilim düşümünü kontrol edin." },
  ],
  "/awg-mm2-cevirici": [
    { href: `${E}/kablo-kesiti-hesaplama`, label: "Kablo Kesiti", why: "Metrik kesit seçimini yük akımına göre yapın." },
  ],

  // Akışkanlar ve tesisat
  "/boru-capi-hesaplama": [
    { href: "/basinc-kaybi-hesaplama", label: "Basınç Kaybı", why: "Seçtiğiniz çapta borudaki sürtünme kaybını hesaplayın." },
    { href: "/boru-capi-donusum-hesaplama", label: "Boru Çapı Dönüşümü (DN-NPS)", why: "Bulduğunuz iç çapa karşılık gelen DN ölçüsünü seçin." },
    { href: "/hesaplayicilar/reynolds-sayisi", label: "Reynolds Sayısı", why: "Akışın laminer mi türbülanslı mı olduğunu kontrol edin." },
  ],
  "/basinc-kaybi-hesaplama": [
    { href: "/boru-capi-hesaplama", label: "Boru Çapı ve Akış Hızı", why: "Kayıp yüksekse çapı büyütüp akış hızını yeniden kontrol edin." },
    { href: "/hesaplayicilar/hidrostatik-basinc", label: "Hidrostatik Basınç", why: "Kot farkından gelen basıncı sürtünme kaybına ekleyin." },
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
    { href: "/celik-profil-tablolari", label: "Çelik Profil Tabloları", why: "IPE, HEA, HEB gibi hazır profillerin metre ağırlıkları." },
    { href: "/demir-agirlik-hesaplama", label: "İnşaat Demiri Ağırlığı", why: "Çap ve boydan donatı tonajını hesaplayın." },
  ],
  "/demir-agirlik-hesaplama": [
    { href: "/beton-hesaplama", label: "Beton Hesaplama", why: "Aynı eleman için beton hacmini ve malzeme miktarını bulun." },
    { href: "/celik-profil-tablolari", label: "Çelik Profil Tabloları", why: "Çelik yapı elemanlarının ağırlığını tablodan alın." },
  ],
  "/sac-agirlik-hesaplama": [
    { href: "/kutu-profil-agirlik-hesaplama", label: "Kutu Profil Ağırlığı", why: "Sactan bükülen kutu profillerin metre ağırlığı." },
    { href: "/kaynak-isi-girdisi-hesaplama", label: "Kaynak Isı Girdisi", why: "Sacı kaynaklarken ısı girdisini kontrol edin." },
  ],
  "/kutu-profil-agirlik-hesaplama": [
    { href: "/celik-profil-tablolari", label: "Çelik Profil Tabloları", why: "I ve U profillerle ağırlık ve kesit değerlerini karşılaştırın." },
    { href: "/sac-agirlik-hesaplama", label: "Sac Ağırlığı", why: "Bağlantı levhalarının ağırlığını ekleyin." },
  ],
  "/elastik-uzama-hesaplama": [
    { href: "/isil-genlesme-hesaplama", label: "Isıl Genleşme", why: "Sıcaklık değişiminden gelen uzamayı da ekleyin." },
    { href: "/sertlik-donusum-hesaplama", label: "Sertlik Dönüşümü", why: "Malzemenin sertlik değerlerini ölçekler arasında çevirin." },
  ],
  "/isil-genlesme-hesaplama": [
    { href: "/elastik-uzama-hesaplama", label: "Elastik Uzama", why: "Genleşme engellenirse oluşacak kuvveti Hooke yasasıyla yorumlayın." },
    { href: "/hesaplayicilar/isi-enerjisi", label: "Isı Enerjisi", why: "Parçayı ısıtmak için gereken enerjiyi hesaplayın." },
  ],

  // Makine ve imalat
  "/kesme-hizi-devir-hesaplama": [
    { href: "/sertlik-donusum-hesaplama", label: "Sertlik Dönüşümü", why: "Kesme hızı malzeme sertliğine göre seçilir; sertliği HB, HRC ve HV arasında çevirin." },
  ],
  "/kaynak-amperaji-hesaplama": [
    { href: "/kaynak-isi-girdisi-hesaplama", label: "Kaynak Isı Girdisi", why: "Seçtiğiniz akımla ısı girdisini (kJ/mm) kontrol edin." },
  ],
  "/kaynak-isi-girdisi-hesaplama": [
    { href: "/kaynak-amperaji-hesaplama", label: "Kaynak Amperajı", why: "Elektrot çapına uygun akım aralığını bulun." },
    { href: "/sac-agirlik-hesaplama", label: "Sac Ağırlığı", why: "Kaynaklanacak levhaların ağırlığını hesaplayın." },
  ],
  "/civata-torku-hesaplama": [
    { href: "/elastik-uzama-hesaplama", label: "Elastik Uzama", why: "Sıkma kuvvetinin cıvatada oluşturduğu uzamayı hesaplayın." },
  ],

  // Isıtma ve soğutma
  "/klima-btu-hesaplama": [
    { href: "/superheat-subcooling-hesaplama", label: "Superheat ve Subcooling", why: "Kurulumdan sonra soğutma devresinin ayarını kontrol edin." },
    { href: "/elektrik-tuketimi-hesaplama", label: "Elektrik Tüketimi", why: "Klimanın aylık elektrik tüketimini hesaplayın." },
  ],
  "/superheat-subcooling-hesaplama": [
    { href: "/klima-btu-hesaplama", label: "Klima BTU", why: "Mahal için gereken soğutma kapasitesini hesaplayın." },
  ],
};

/** Çelik profil tablolarından ortak sonraki adımlar. */
export const STEEL_TABLE_FLOW: FlowLink[] = [
  { href: "/kutu-profil-agirlik-hesaplama", label: "Kutu Profil Ağırlığı", why: "Kare ve dikdörtgen kutu profillerle karşılaştırın." },
  { href: "/sac-agirlik-hesaplama", label: "Sac Ağırlığı", why: "Bağlantı ve taban levhalarının ağırlığını ekleyin." },
];

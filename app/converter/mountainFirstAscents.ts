// 14 sekiz-binlik zirvenin ilk tırmanışı: zirveye çıkanlar, sefer ve dağa özgü kısa not.
// İsimler ve yıllar dağcılık tarihinin yaygın kabul gören kayıtlarıdır (mountainsDatabase yılıyla aynı).

export type FirstAscent = {
  climbers: string;
  expeditionTr: string;
  expeditionUz: string;
  noteTr?: string;
  noteUz?: string;
};

export const FIRST_ASCENTS: Record<string, FirstAscent> = {
  everest: {
    climbers: "Edmund Hillary, Tenzing Norgay",
    expeditionTr: "İngiliz seferi",
    expeditionUz: "Britaniya ekspeditsiyasi",
    noteTr: "Zirveye 29 Mayıs 1953'te ulaştılar; ikisi de kimin önce bastığını yıllarca açıklamadı.",
    noteUz: "Cho'qqiga 1953-yil 29-mayda chiqishgan.",
  },
  k2: {
    climbers: "Lino Lacedelli, Achille Compagnoni",
    expeditionTr: "İtalyan seferi",
    expeditionUz: "Italiya ekspeditsiyasi",
    noteTr: "Dünyanın en tehlikeli dağlarından biri sayılır; kışın ilk kez ancak 2021'de Nepalli bir ekip tarafından tırmanılabildi.",
    noteUz: "Qishda birinchi marta faqat 2021-yilda nepallik jamoa chiqqan.",
  },
  kangchenjunga: {
    climbers: "Joe Brown, George Band",
    expeditionTr: "İngiliz seferi",
    expeditionUz: "Britaniya ekspeditsiyasi",
    noteTr: "Dağı kutsal sayan Sikkim halkına verilen söz gereği tırmanıcılar asıl zirveye birkaç metre kala durdu; bu gelenek bugün de sürüyor.",
    noteUz: "Mahalliy aholiga berilgan va'da tufayli alpinistlar eng yuqori nuqtaga bir necha metr qolganda to'xtagan.",
  },
  lhotse: {
    climbers: "Ernst Reiss, Fritz Luchsinger",
    expeditionTr: "İsviçre seferi",
    expeditionUz: "Shveytsariya ekspeditsiyasi",
    noteTr: "Everest ile Güney Sele üzerinden bağlıdır; iki zirve tırmanışın büyük bölümünde aynı rotayı paylaşır.",
    noteUz: "Everest bilan Janubiy egar orqali tutashgan.",
  },
  makalu: {
    climbers: "Lionel Terray, Jean Couzy",
    expeditionTr: "Fransız seferi",
    expeditionUz: "Fransiya ekspeditsiyasi",
    noteTr: "Dört yüzlü piramit biçimiyle tanınır; seferin dokuz üyesi ertesi günlerde zirveye çıktı.",
    noteUz: "To'rt qirrali piramida shakli bilan mashhur.",
  },
  "cho-oyu": {
    climbers: "Herbert Tichy, Joseph Jöchler, Pasang Dawa Lama",
    expeditionTr: "Avusturya seferi",
    expeditionUz: "Avstriya ekspeditsiyasi",
    noteTr: "Küçük bir ekip ve oksijen tüpü olmadan yapıldı; bugün de en çok tırmanılan sekiz-binliklerden biridir.",
    noteUz: "Kichik jamoa kislorod ballonisiz chiqqan.",
  },
  dhaulagiri: {
    climbers: "Kurt Diemberger, Peter Diener, Ernst Forrer, Albin Schelbert, Nawang Dorje, Nima Dorje",
    expeditionTr: "İsviçre-Avusturya seferi",
    expeditionUz: "Shveytsariya-Avstriya ekspeditsiyasi",
    noteTr: "Malzeme taşımak için küçük bir uçak kullanılan ilk Himalaya seferidir; uçak sefer sırasında düşmüştür.",
    noteUz: "Yuk tashish uchun samolyot ishlatilgan birinchi Himolay ekspeditsiyasi.",
  },
  manaslu: {
    climbers: "Toshio Imanishi, Gyalzen Norbu",
    expeditionTr: "Japon seferi",
    expeditionUz: "Yaponiya ekspeditsiyasi",
    noteTr: "Japonya'da hâlâ \"Japonların dağı\" olarak anılır.",
    noteUz: "Yaponiyada \"yaponlar tog'i\" deb ataladi.",
  },
  "nanga-parbat": {
    climbers: "Hermann Buhl",
    expeditionTr: "Alman-Avusturya seferi",
    expeditionUz: "Germaniya-Avstriya ekspeditsiyasi",
    noteTr: "Buhl son 1.300 metreyi tek başına ve oksijensiz çıktı, inişte geceyi açıkta ayakta geçirdi.",
    noteUz: "Buhl oxirgi 1 300 metrni yolg'iz va kislorodsiz bosib o'tgan.",
  },
  annapurna: {
    climbers: "Maurice Herzog, Louis Lachenal",
    expeditionTr: "Fransız seferi",
    expeditionUz: "Fransiya ekspeditsiyasi",
    noteTr: "1950'de insanın çıktığı ilk sekiz-binlik oldu; ikisi de inişte ağır donmalar yaşadı.",
    noteUz: "1950-yilda inson chiqqan birinchi sakkiz minglik cho'qqi.",
  },
  "gasherbrum-1": {
    climbers: "Pete Schoening, Andy Kauffman",
    expeditionTr: "Amerikan seferi",
    expeditionUz: "AQSh ekspeditsiyasi",
    noteTr: "Uzak konumu nedeniyle \"Gizli Zirve\" (Hidden Peak) adıyla da bilinir.",
    noteUz: "\"Yashirin cho'qqi\" (Hidden Peak) nomi bilan ham tanilgan.",
  },
  "broad-peak": {
    climbers: "Hermann Buhl, Kurt Diemberger, Marcus Schmuck, Fritz Wintersteller",
    expeditionTr: "Avusturya seferi",
    expeditionUz: "Avstriya ekspeditsiyasi",
    noteTr: "Oksijen tüpü ve yüksek irtifa hamalı kullanmadan, küçük ekip (\"alp stili\") yaklaşımıyla tırmanıldı.",
    noteUz: "Kislorod ballonisiz va hammollarsiz kichik jamoa bilan chiqilgan.",
  },
  "gasherbrum-2": {
    climbers: "Fritz Moravec, Josef Larch, Hans Willenpart",
    expeditionTr: "Avusturya seferi",
    expeditionUz: "Avstriya ekspeditsiyasi",
    noteTr: "Teknik açıdan görece kolay sayılan sekiz-binliklerdendir.",
    noteUz: "Texnik jihatdan nisbatan oson sakkiz minglik hisoblanadi.",
  },
  shishapangma: {
    climbers: "Xu Jing liderliğinde 10 kişilik ekip",
    expeditionTr: "Çin seferi",
    expeditionUz: "Xitoy ekspeditsiyasi",
    noteTr: "Tamamı Çin topraklarında olan tek sekiz-binliktir; yabancı bir ekip ilk kez 1980'de tırmanabildi.",
    noteUz: "To'liq Xitoy hududida joylashgan yagona sakkiz minglik cho'qqi.",
  },
};

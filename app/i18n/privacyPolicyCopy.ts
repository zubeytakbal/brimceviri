import type { PrivacyCopy } from "../components/privacyPolicySections";

const UPDATED_ISO = "27.09.2026";

export const privacyPolicyCopy: Record<"tr" | "en" | "de" | "uz" | "ar", PrivacyCopy> = {
  tr: {
    overview: {
      heading: "Kısaca",
      paragraphs: [
        "BirimCeviri.app'i kullanmak için hesap açmanız gerekmez; sitemiz sizden ad, e-posta veya telefon gibi kişisel bilgiler istemez.",
        "Siteyi geliştirmek için ziyaret istatistiklerini Google Analytics ile ölçeriz ve siteyi ücretsiz sunabilmek için Google AdSense reklamları gösterebiliriz. Bu hizmetler çerez kullanır; ayrıntılar aşağıdadır.",
      ],
    },
    inputs: {
      heading: "Hesaplayıcılara girdiğiniz değerler",
      paragraphs: [
        "Hesaplayıcılara ve dönüştürücülere girdiğiniz sayılar tarayıcınızda işlenir; hesaplama için sunucumuza gönderilmez ve saklanmaz.",
      ],
    },
    storage: {
      heading: "Tarayıcınızda saklanan bilgiler",
      paragraphs: [
        "Kullanımı kolaylaştırmak için bazı tercihler yalnızca kendi cihazınızda, tarayıcının yerel depolamasında tutulur: son kullandığınız araçlar, seçtiğiniz meslek, kapattığınız bildirimler ve bir sayfaya daha önce oy verip vermediğiniz. Ayrıca sayfaların çevrimdışı da açılabilmesi için tarayıcı önbelleği kullanılır. Bu bilgileri tarayıcı ayarlarınızdan istediğiniz zaman silebilirsiniz.",
        "Sayfalardaki \"faydalı buldum / bulmadım\" oylamasında sunucuya yalnızca sayfanın kimliği ve oyunuz gönderilir; kişisel bilgi kaydedilmez.",
      ],
    },
    analytics: {
      heading: "Ziyaret istatistikleri (Google Analytics)",
      paragraphs: [
        "Hangi sayfaların kullanıldığını anlamak için Google Analytics kullanırız. Google Analytics; ziyaret edilen sayfalar, ziyaret süresi, cihaz ve tarayıcı türü, yaklaşık konum (ülke/şehir) ve siteye nereden gelindiği gibi bilgileri çerezler aracılığıyla toplar. Bu bilgiler bize toplu raporlar halinde sunulur ve sizi kişisel olarak tanımlamak için kullanılmaz.",
      ],
      policyLabel: "Google Gizlilik Politikası",
      optOutLabel: "Google Analytics'i devre dışı bırakma eklentisi",
    },
    ads: {
      heading: "Reklamlar (Google AdSense) ve çerezler",
      paragraphs: [
        "Bu sitede Google AdSense reklamları gösterilebilir. Google dahil üçüncü taraf sağlayıcılar, bu siteye veya internetteki diğer sitelere yaptığınız önceki ziyaretlere dayalı reklamlar göstermek için çerezler kullanır.",
        "Google'ın reklam çerezlerini kullanması, Google'ın ve iş ortaklarının size bu siteye ve/veya internetteki diğer sitelere yaptığınız ziyaretlere dayalı reklamlar sunmasını sağlar. Kişiselleştirilmiş reklamları Google Reklam Ayarları'ndan kapatabilir, üçüncü taraf sağlayıcıların çerezlerini aboutads.info üzerinden devre dışı bırakabilirsiniz.",
        "Yasal olarak gerektiği yerlerde (örneğin Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre) reklam çerezleri için onayınız istenir.",
      ],
      adSettingsLabel: "Google Reklam Ayarları",
      aboutAdsLabel: "aboutads.info",
      howGoogleLabel: "Google, iş ortağı sitelerdeki verileri nasıl kullanır?",
    },
    hosting: {
      heading: "Barındırma ve sunucu kayıtları",
      paragraphs: [
        "Site Vercel altyapısında barındırılır. Her web sitesinde olduğu gibi, güvenlik ve sitenin çalışması için barındırma sağlayıcısı IP adresi, tarayıcı bilgisi ve istek zamanı gibi standart sunucu kayıtlarını işleyebilir.",
      ],
    },
    links: {
      heading: "Dış bağlantılar",
      paragraphs: [
        "Sayfalardaki kaynak ve dış bağlantılar kendi gizlilik uygulamalarına tabidir. Başka bir siteye geçtiğinizde o sitenin gizlilik politikasını ayrıca inceleyin.",
      ],
    },
    contact: {
      heading: "Haklarınız ve iletişim",
      paragraphs: [
        "Kişisel verilerinizle ilgili sorularınız ve KVKK ya da GDPR kapsamındaki talepleriniz için bize yazabilirsiniz.",
      ],
      contactPageHref: "/iletisim",
      contactPageLabel: "İletişim sayfası",
    },
    updated: `Son güncelleme: ${UPDATED_ISO}`,
  },
  en: {
    overview: {
      heading: "In short",
      paragraphs: [
        "You don't need an account to use BirimCeviri.app, and the site does not ask for personal details such as your name, email address or phone number.",
        "We measure visits with Google Analytics to improve the site, and we may show Google AdSense ads to keep it free. These services use cookies, as explained below.",
      ],
    },
    inputs: {
      heading: "Values you enter into calculators",
      paragraphs: ["Numbers you enter into calculators and converters are processed in your browser; they are not sent to or stored on our server."],
    },
    storage: {
      heading: "Information stored in your browser",
      paragraphs: [
        "To make the site easier to use, a few preferences are kept only on your own device in the browser's local storage: tools you used recently, the profession you selected, notifications you dismissed and whether you have already voted on a page. The browser cache is also used so pages can open offline. You can delete this information at any time in your browser settings.",
        "When you use the \"helpful / not helpful\" vote on a page, only the page identifier and your vote are sent to our server; no personal information is recorded.",
      ],
    },
    analytics: {
      heading: "Visit statistics (Google Analytics)",
      paragraphs: [
        "We use Google Analytics to understand which pages are used. Google Analytics uses cookies to collect information such as the pages visited, time on site, device and browser type, approximate location (country/city) and how you arrived at the site. We see this information as aggregated reports and do not use it to identify you personally.",
      ],
      policyLabel: "Google Privacy Policy",
      optOutLabel: "Google Analytics opt-out browser add-on",
    },
    ads: {
      heading: "Advertising (Google AdSense) and cookies",
      paragraphs: [
        "This site may show Google AdSense ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.",
        "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google Ads Settings, and opt out of a third-party vendor's use of cookies for personalized advertising at aboutads.info.",
        "Where required by law (for example in the European Economic Area, the United Kingdom and Switzerland), your consent is requested for advertising cookies.",
      ],
      adSettingsLabel: "Google Ads Settings",
      aboutAdsLabel: "aboutads.info",
      howGoogleLabel: "How Google uses information from sites that use its services",
    },
    hosting: {
      heading: "Hosting and server logs",
      paragraphs: [
        "The site is hosted on Vercel. As with any website, the hosting provider may process standard server logs such as IP address, browser information and request time for security and to operate the site.",
      ],
    },
    links: {
      heading: "External links",
      paragraphs: ["Sources and external links on our pages are subject to their own privacy practices. When you leave for another site, please review its privacy policy."],
    },
    contact: {
      heading: "Your rights and contact",
      paragraphs: ["For questions about your personal data or requests under the GDPR or other privacy laws, please write to us."],
      contactPageHref: "/en/contact",
      contactPageLabel: "Contact page",
    },
    updated: "Last updated: September 27, 2026",
  },
  de: {
    overview: {
      heading: "Kurz gesagt",
      paragraphs: [
        "Für die Nutzung von BirimCeviri.app brauchen Sie kein Konto, und die Website fragt keine personenbezogenen Angaben wie Name, E-Mail-Adresse oder Telefonnummer ab.",
        "Zur Verbesserung der Website messen wir Besuche mit Google Analytics, und damit die Website kostenlos bleibt, können wir Anzeigen von Google AdSense einblenden. Diese Dienste verwenden Cookies; Einzelheiten finden Sie unten.",
      ],
    },
    inputs: {
      heading: "Eingaben in Rechnern",
      paragraphs: ["Werte, die Sie in Rechner und Umrechner eingeben, werden in Ihrem Browser verarbeitet; sie werden nicht an unseren Server übertragen oder dort gespeichert."],
    },
    storage: {
      heading: "In Ihrem Browser gespeicherte Informationen",
      paragraphs: [
        "Zur einfacheren Nutzung werden einige Einstellungen nur auf Ihrem eigenen Gerät im lokalen Speicher des Browsers abgelegt: zuletzt genutzte Werkzeuge, der gewählte Beruf, geschlossene Hinweise und ob Sie eine Seite bereits bewertet haben. Außerdem wird der Browser-Cache genutzt, damit Seiten auch offline geöffnet werden können. Sie können diese Informationen jederzeit in Ihren Browsereinstellungen löschen.",
        "Bei der Bewertung „hilfreich / nicht hilfreich“ werden nur die Kennung der Seite und Ihre Bewertung an unseren Server gesendet; personenbezogene Daten werden nicht gespeichert.",
      ],
    },
    analytics: {
      heading: "Besuchsstatistik (Google Analytics)",
      paragraphs: [
        "Wir nutzen Google Analytics, um zu verstehen, welche Seiten genutzt werden. Google Analytics erhebt mithilfe von Cookies Informationen wie aufgerufene Seiten, Verweildauer, Geräte- und Browsertyp, ungefähren Standort (Land/Stadt) und die Herkunft des Besuchs. Wir erhalten diese Informationen als zusammengefasste Berichte und nutzen sie nicht, um Sie persönlich zu identifizieren.",
      ],
      policyLabel: "Datenschutzerklärung von Google",
      optOutLabel: "Browser-Add-on zur Deaktivierung von Google Analytics",
    },
    ads: {
      heading: "Werbung (Google AdSense) und Cookies",
      paragraphs: [
        "Auf dieser Website können Anzeigen von Google AdSense erscheinen. Drittanbieter, einschließlich Google, verwenden Cookies, um Anzeigen auf Grundlage Ihrer früheren Besuche auf dieser oder anderen Websites auszuliefern.",
        "Mithilfe von Werbe-Cookies können Google und seine Partner Ihnen Anzeigen auf Grundlage Ihrer Besuche auf dieser Website und/oder anderen Websites im Internet präsentieren. Personalisierte Werbung können Sie in den Google-Anzeigeneinstellungen deaktivieren; die Verwendung von Cookies durch Drittanbieter für personalisierte Werbung können Sie unter aboutads.info deaktivieren.",
        "Wo dies gesetzlich vorgeschrieben ist (zum Beispiel im Europäischen Wirtschaftsraum, im Vereinigten Königreich und in der Schweiz), wird Ihre Einwilligung für Werbe-Cookies eingeholt.",
      ],
      adSettingsLabel: "Google-Anzeigeneinstellungen",
      aboutAdsLabel: "aboutads.info",
      howGoogleLabel: "Wie Google Daten von Partner-Websites verwendet",
    },
    hosting: {
      heading: "Hosting und Server-Protokolle",
      paragraphs: [
        "Die Website wird bei Vercel gehostet. Wie bei jeder Website kann der Hosting-Anbieter übliche Server-Protokolle wie IP-Adresse, Browserinformationen und Zeitpunkt der Anfrage zur Sicherheit und für den Betrieb der Website verarbeiten.",
      ],
    },
    links: {
      heading: "Externe Links",
      paragraphs: ["Für Quellen und externe Links auf unseren Seiten gelten die Datenschutzpraktiken der jeweiligen Anbieter. Bitte lesen Sie beim Wechsel auf eine andere Website deren Datenschutzerklärung."],
    },
    contact: {
      heading: "Ihre Rechte und Kontakt",
      paragraphs: ["Für Fragen zu Ihren personenbezogenen Daten und für Anfragen nach der DSGVO schreiben Sie uns bitte."],
      contactPageHref: "/de/kontakt",
      contactPageLabel: "Kontaktseite",
    },
    updated: `Zuletzt aktualisiert: ${UPDATED_ISO}`,
  },
  uz: {
    overview: {
      heading: "Qisqacha",
      paragraphs: [
        "BirimCeviri.app'dan foydalanish uchun hisob ochish shart emas; sayt sizdan ism, elektron pochta yoki telefon raqami kabi shaxsiy ma'lumotlarni so'ramaydi.",
        "Saytni yaxshilash uchun tashriflarni Google Analytics orqali o'lchaymiz, saytni bepul taqdim etish uchun esa Google AdSense reklamalarini ko'rsatishimiz mumkin. Bu xizmatlar cookie fayllaridan foydalanadi; batafsil ma'lumot quyida.",
      ],
    },
    inputs: {
      heading: "Kalkulyatorlarga kiritilgan qiymatlar",
      paragraphs: ["Kalkulyator va aylantirgichlarga kiritgan raqamlaringiz brauzeringizda qayta ishlanadi; ular serverimizga yuborilmaydi va saqlanmaydi."],
    },
    storage: {
      heading: "Brauzeringizda saqlanadigan ma'lumotlar",
      paragraphs: [
        "Foydalanishni qulaylashtirish uchun ba'zi sozlamalar faqat o'z qurilmangizda, brauzerning mahalliy xotirasida saqlanadi: oxirgi foydalanilgan vositalar, tanlangan kasb, yopilgan bildirishnomalar va sahifaga ovoz berganingiz. Sahifalar oflayn ham ochilishi uchun brauzer keshi ham ishlatiladi. Bu ma'lumotlarni istalgan vaqtda brauzer sozlamalaridan o'chirishingiz mumkin.",
        "\"Foydali / foydali emas\" ovozida serverga faqat sahifa identifikatori va ovozingiz yuboriladi; shaxsiy ma'lumot saqlanmaydi.",
      ],
    },
    analytics: {
      heading: "Tashrif statistikasi (Google Analytics)",
      paragraphs: [
        "Qaysi sahifalardan foydalanilayotganini tushunish uchun Google Analytics'dan foydalanamiz. Google Analytics cookie fayllari orqali ko'rilgan sahifalar, saytda o'tkazilgan vaqt, qurilma va brauzer turi, taxminiy joylashuv (mamlakat/shahar) va saytga qayerdan kelinganligi kabi ma'lumotlarni to'playdi. Bu ma'lumotlarni umumlashtirilgan hisobotlar sifatida ko'ramiz va sizni shaxsan aniqlash uchun ishlatmaymiz.",
      ],
      policyLabel: "Google maxfiylik siyosati",
      optOutLabel: "Google Analytics'ni o'chirish uchun brauzer qo'shimchasi",
    },
    ads: {
      heading: "Reklama (Google AdSense) va cookie fayllari",
      paragraphs: [
        "Ushbu saytda Google AdSense reklamalari ko'rsatilishi mumkin. Google va boshqa uchinchi tomon provayderlari ushbu yoki boshqa saytlarga oldingi tashriflaringizga asoslangan reklamalarni ko'rsatish uchun cookie fayllaridan foydalanadi.",
        "Reklama cookie fayllari Google va uning hamkorlariga ushbu saytga va/yoki internetdagi boshqa saytlarga tashriflaringiz asosida sizga reklama ko'rsatish imkonini beradi. Shaxsiylashtirilgan reklamani Google reklama sozlamalarida o'chirishingiz, uchinchi tomon provayderlarining cookie fayllarini esa aboutads.info orqali o'chirishingiz mumkin.",
        "Qonun talab qilgan joylarda (masalan, Yevropa iqtisodiy hududi, Buyuk Britaniya va Shveytsariyada) reklama cookie fayllari uchun roziligingiz so'raladi.",
      ],
      adSettingsLabel: "Google reklama sozlamalari",
      aboutAdsLabel: "aboutads.info",
      howGoogleLabel: "Google hamkor saytlardagi ma'lumotlardan qanday foydalanadi",
    },
    hosting: {
      heading: "Xosting va server jurnallari",
      paragraphs: [
        "Sayt Vercel infratuzilmasida joylashgan. Har qanday veb-saytdagi kabi, xosting provayderi xavfsizlik va saytning ishlashi uchun IP manzil, brauzer ma'lumotlari va so'rov vaqti kabi standart server jurnallarini qayta ishlashi mumkin.",
      ],
    },
    links: {
      heading: "Tashqi havolalar",
      paragraphs: ["Sahifalardagi manba va tashqi havolalar o'z maxfiylik qoidalariga bo'ysunadi. Boshqa saytga o'tganingizda uning maxfiylik siyosatini alohida o'qing."],
    },
    contact: {
      heading: "Huquqlaringiz va aloqa",
      paragraphs: ["Shaxsiy ma'lumotlaringiz bo'yicha savollar va so'rovlar uchun bizga yozing."],
      contactPageHref: "/uz/aloqa",
      contactPageLabel: "Aloqa sahifasi",
    },
    updated: `Oxirgi yangilanish: ${UPDATED_ISO}`,
  },
  ar: {
    overview: {
      heading: "باختصار",
      paragraphs: [
        "لا تحتاج إلى إنشاء حساب لاستخدام BirimCeviri.app، ولا يطلب الموقع منك أي بيانات شخصية مثل الاسم أو البريد الإلكتروني أو رقم الهاتف.",
        "نقيس الزيارات باستخدام Google Analytics لتحسين الموقع، وقد نعرض إعلانات Google AdSense لإبقاء الموقع مجانيًا. تستخدم هذه الخدمات ملفات تعريف الارتباط (الكوكيز) كما هو موضح أدناه.",
      ],
    },
    inputs: {
      heading: "القيم التي تُدخلها في الحاسبات",
      paragraphs: ["تُعالَج الأرقام التي تُدخلها في الحاسبات والمحوّلات داخل متصفحك، ولا تُرسَل إلى خادمنا ولا تُخزَّن فيه."],
    },
    storage: {
      heading: "المعلومات المحفوظة في متصفحك",
      paragraphs: [
        "لتسهيل الاستخدام، تُحفظ بعض التفضيلات على جهازك فقط في التخزين المحلي للمتصفح: الأدوات التي استخدمتها مؤخرًا، والمهنة التي اخترتها، والإشعارات التي أغلقتها، وما إذا كنت قد صوّتَّ على صفحة من قبل. كما تُستخدم ذاكرة التخزين المؤقت للمتصفح حتى تفتح الصفحات دون اتصال. يمكنك حذف هذه المعلومات في أي وقت من إعدادات المتصفح.",
        "عند التصويت بـ\"مفيد / غير مفيد\" على صفحة ما، يُرسَل إلى خادمنا معرّف الصفحة وتصويتك فقط، ولا تُسجَّل أي معلومات شخصية.",
      ],
    },
    analytics: {
      heading: "إحصاءات الزيارات (Google Analytics)",
      paragraphs: [
        "نستخدم Google Analytics لمعرفة الصفحات الأكثر استخدامًا. يجمع Google Analytics عبر ملفات تعريف الارتباط معلومات مثل الصفحات التي تمت زيارتها، ومدة الزيارة، ونوع الجهاز والمتصفح، والموقع التقريبي (الدولة/المدينة)، ومصدر الزيارة. نطّلع على هذه المعلومات في تقارير مجمّعة ولا نستخدمها للتعرّف عليك شخصيًا.",
      ],
      policyLabel: "سياسة خصوصية Google",
      optOutLabel: "إضافة المتصفح لإيقاف Google Analytics",
    },
    ads: {
      heading: "الإعلانات (Google AdSense) وملفات تعريف الارتباط",
      paragraphs: [
        "قد يعرض هذا الموقع إعلانات Google AdSense. يستخدم موردون خارجيون، ومنهم Google، ملفات تعريف الارتباط لعرض الإعلانات استنادًا إلى زياراتك السابقة لهذا الموقع أو لمواقع أخرى.",
        "يتيح استخدام Google لملفات تعريف الارتباط الإعلانية لها ولشركائها عرض إعلانات لك استنادًا إلى زيارتك لهذا الموقع و/أو لمواقع أخرى على الإنترنت. يمكنك إيقاف الإعلانات المخصّصة من إعدادات إعلانات Google، وإيقاف استخدام الموردين الخارجيين لملفات تعريف الارتباط عبر aboutads.info.",
        "حيث يقتضي القانون ذلك (مثل المنطقة الاقتصادية الأوروبية والمملكة المتحدة وسويسرا) تُطلب موافقتك على ملفات تعريف الارتباط الإعلانية.",
      ],
      adSettingsLabel: "إعدادات إعلانات Google",
      aboutAdsLabel: "aboutads.info",
      howGoogleLabel: "كيف تستخدم Google المعلومات من المواقع الشريكة",
    },
    hosting: {
      heading: "الاستضافة وسجلات الخادم",
      paragraphs: [
        "يُستضاف الموقع على منصة Vercel. وكما هو الحال في أي موقع، قد يعالج مزوّد الاستضافة سجلات الخادم المعتادة مثل عنوان IP ومعلومات المتصفح ووقت الطلب لأغراض الأمان وتشغيل الموقع.",
      ],
    },
    links: {
      heading: "الروابط الخارجية",
      paragraphs: ["تخضع المصادر والروابط الخارجية في صفحاتنا لسياسات الخصوصية الخاصة بها. عند الانتقال إلى موقع آخر يُرجى مراجعة سياسة الخصوصية الخاصة به."],
    },
    contact: {
      heading: "حقوقك والتواصل معنا",
      paragraphs: ["لأي أسئلة حول بياناتك الشخصية أو طلبات تتعلق بها، يُرجى مراسلتنا."],
      contactPageHref: "/ar/contact",
      contactPageLabel: "صفحة التواصل",
    },
    updated: `آخر تحديث: ${UPDATED_ISO}`,
  },
};

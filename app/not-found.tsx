"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPathname,
  type Locale,
} from "./i18n/config";

const copy = {
  tr: {
    lang: "tr",
    title: "Sayfa bulunamadı",
    description:
      "Aradığınız sayfa taşınmış olabilir veya geçerli bir adres olmayabilir.",
    continueHeading: "Devam etmek için",
    primaryHref: "/",
    primaryLabel: "Ana sayfaya dön",
    secondaryHref: "/en",
    secondaryLabel: "İngilizce ana sayfaya git",
  },
  en: {
    lang: "en",
    title: "Page not found",
    description:
      "The page you are looking for may have moved or may not be a valid address.",
    continueHeading: "Continue with",
    primaryHref: "/en",
    primaryLabel: "Go to the English homepage",
    secondaryHref: "/",
    secondaryLabel: "Open the Turkish homepage",
  },
  de: {
    lang: "de",
    title: "Seite nicht gefunden",
    description:
      "Die gesuchte Seite wurde möglicherweise verschoben oder ist keine gültige Adresse.",
    continueHeading: "Weiter mit",
    primaryHref: "/de",
    primaryLabel: "Zur deutschen Startseite",
    secondaryHref: "/",
    secondaryLabel: "Türkische Startseite öffnen",
  },
  ar: {
    lang: "ar",
    title: "الصفحة غير موجودة",
    description:
      "قد تكون الصفحة التي تبحث عنها قد نُقلت أو أن الرابط غير صالح.",
    continueHeading: "يمكنك المتابعة من هنا",
    primaryHref: "/ar",
    primaryLabel: "العودة إلى الصفحة العربية",
    secondaryHref: "/",
    secondaryLabel: "فتح الصفحة التركية",
  },
uz: {
    lang: "uz",
    title: "Sahifa topilmadi",
    description:
      "Siz qidirayotgan sahifa ko‘chirilgan yoki manzil noto‘g‘ri bo‘lishi mumkin.",
    continueHeading: "Davom etish uchun",
    primaryHref: "/uz",
    primaryLabel: "O‘zbekcha bosh sahifaga qaytish",
    secondaryHref: "/en",
    secondaryLabel: "Inglizcha bosh sahifani ochish",
  },
bn: {
    lang: "bn",
    title: "পৃষ্ঠাটি পাওয়া যায়নি",
    description:
      "আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়ে থাকতে পারে অথবা ঠিকানাটি সঠিক নাও হতে পারে।",
    continueHeading: "এগিয়ে যেতে",
    primaryHref: "/bn",
    primaryLabel: "বাংলা হোমপেজে ফিরে যান",
    secondaryHref: "/en",
    secondaryLabel: "ইংরেজি হোমপেজ খুলুন",
  },
  fr: {
    lang: "fr",
    title: "Page introuvable",
    description:
      "La page que vous recherchez a peut-etre ete deplacee ou l'adresse n'est pas valide.",
    continueHeading: "Continuer avec",
    primaryHref: "/fr",
    primaryLabel: "Retour a la page d'accueil francaise",
    secondaryHref: "/",
    secondaryLabel: "Ouvrir la page d'accueil turque",
  },
  es: {
    lang: "es",
    title: "Pagina no encontrada",
    description:
      "Es posible que la pagina que buscas se haya movido o que la dirección no sea valida.",
    continueHeading: "Continuar con",
    primaryHref: "/es",
    primaryLabel: "Volver a la pagina de inicio en español",
    secondaryHref: "/",
    secondaryLabel: "Abrir la pagina de inicio en turco",
  },
  "es-419": {
    lang: "es-419",
    title: "Pagina no encontrada",
    description:
      "Es posible que la pagina que buscas se haya movido o que la dirección no sea valida.",
    continueHeading: "Continuar con",
    primaryHref: "/es-419",
    primaryLabel: "Volver a la pagina de inicio en español",
    secondaryHref: "/",
    secondaryLabel: "Abrir la pagina de inicio en turco",
  },
  pt: {
    lang: "pt-BR",
    title: "Página não encontrada",
    description:
      "A página que você procura pode ter sido movida ou o endereço pode não ser válido.",
    continueHeading: "Continuar com",
    primaryHref: "/pt",
    primaryLabel: "Voltar à página inicial em português",
    secondaryHref: "/",
    secondaryLabel: "Abrir a página inicial em turco",
  },
  it: {
    lang: "it",
    title: "Pagina non trovata",
    description:
      "La pagina che stai cercando potrebbe essere stata spostata o l'indirizzo potrebbe non essere valido.",
    continueHeading: "Continua con",
    primaryHref: "/it",
    primaryLabel: "Torna alla homepage in italiano",
    secondaryHref: "/",
    secondaryLabel: "Apri la homepage in turco",
  },
  nl: {
    lang: "nl",
    title: "Pagina niet gevonden",
    description:
      "De pagina die je zoekt is mogelijk verplaatst of het adres is niet geldig.",
    continueHeading: "Ga verder met",
    primaryHref: "/nl",
    primaryLabel: "Terug naar de Nederlandse homepage",
    secondaryHref: "/",
    secondaryLabel: "Open de Turkse homepage",
  },
  ru: {
    lang: "ru",
    title: "Страница не найдена",
    description:
      "Возможно, эта страница была перемещена или адрес указан неверно.",
    continueHeading: "Продолжить",
    primaryHref: "/ru",
    primaryLabel: "На главную страницу",
    secondaryHref: "/",
    secondaryLabel: "Открыть турецкую главную страницу",
  },
  sv: {
    lang: "sv",
    title: "Sidan hittades inte",
    description:
      "Sidan du letar efter kan ha flyttats eller så är adressen inte giltig.",
    continueHeading: "Fortsätt med",
    primaryHref: "/sv",
    primaryLabel: "Tillbaka till den svenska startsidan",
    secondaryHref: "/",
    secondaryLabel: "Öppna den turkiska startsidan",
  },
  no: {
    lang: "nb",
    title: "Siden ble ikke funnet",
    description:
      "Siden du leter etter kan ha blitt flyttet, eller så er adressen ikke gyldig.",
    continueHeading: "Fortsett med",
    primaryHref: "/no",
    primaryLabel: "Tilbake til den norske hjemmesiden",
    secondaryHref: "/",
    secondaryLabel: "Åpne den tyrkiske hjemmesiden",
  },
  da: {
    lang: "da",
    title: "Siden blev ikke fundet",
    description:
      "Siden du leder efter, kan være blevet flyttet, eller også er adressen ikke gyldig.",
    continueHeading: "Fortsæt med",
    primaryHref: "/da",
    primaryLabel: "Tilbage til den danske startside",
    secondaryHref: "/",
    secondaryLabel: "Åbn den tyrkiske startside",
  },
} satisfies Record<
  Locale,
  {
    lang: string;
    title: string;
    description: string;
    continueHeading: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  }
>;

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname ?? "/");
  const localeCopy = copy[locale];

  return (
    <main
      className="unit-information-page"
      lang={localeCopy.lang}
      dir={locale === "ar" ? "rtl" : undefined}
    >
      <article className="unit-page-shell">
        <header className="unit-page-header">
          <h1>{localeCopy.title}</h1>
          <p>{localeCopy.description}</p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>{localeCopy.continueHeading}</h2>
            <p>
              <Link
                className="text-link"
                href={localeCopy.primaryHref}
              >
                {localeCopy.primaryLabel}
              </Link>
            </p>
            <p>
              <Link
                className="text-link"
                href={localeCopy.secondaryHref}
              >
                {localeCopy.secondaryLabel}
              </Link>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

import type { ReactNode } from "react";

// Gizlilik politikasi: tum dillerde ayni yapi. Icerik sitenin gercek
// davranisini anlatir (hesap yok, girdiler tarayicida, yerel depolama,
// Google Analytics, Google AdSense, Cloudflare Pages barindirma).
// AdSense politikasinin istedigi ucuncu taraf cerez aciklamasi ve
// kisisellestirilmis reklamlari kapatma baglantilari zorunludur.

export type PrivacyCopy = {
  overview: { heading: string; paragraphs: string[] };
  inputs: { heading: string; paragraphs: string[] };
  storage: { heading: string; paragraphs: string[] };
  analytics: { heading: string; paragraphs: string[]; policyLabel: string; optOutLabel: string };
  ads: { heading: string; paragraphs: string[]; adSettingsLabel: string; aboutAdsLabel: string; howGoogleLabel: string };
  hosting: { heading: string; paragraphs: string[] };
  links: { heading: string; paragraphs: string[] };
  contact: { heading: string; paragraphs: string[]; contactPageHref: string; contactPageLabel: string };
  updated: string;
};

const EMAIL = "iletisim@birimceviri.app";

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function buildPrivacySections(copy: PrivacyCopy): Array<{ heading: string; content: ReactNode }> {
  return [
    { heading: copy.overview.heading, content: <Paragraphs items={copy.overview.paragraphs} /> },
    { heading: copy.inputs.heading, content: <Paragraphs items={copy.inputs.paragraphs} /> },
    { heading: copy.storage.heading, content: <Paragraphs items={copy.storage.paragraphs} /> },
    {
      heading: copy.analytics.heading,
      content: (
        <>
          <Paragraphs items={copy.analytics.paragraphs} />
          <p>
            <ExternalLink href="https://policies.google.com/privacy">{copy.analytics.policyLabel}</ExternalLink>
            {" · "}
            <ExternalLink href="https://tools.google.com/dlpage/gaoptout">{copy.analytics.optOutLabel}</ExternalLink>
          </p>
        </>
      ),
    },
    {
      heading: copy.ads.heading,
      content: (
        <>
          <Paragraphs items={copy.ads.paragraphs} />
          <p>
            <ExternalLink href="https://adssettings.google.com">{copy.ads.adSettingsLabel}</ExternalLink>
            {" · "}
            <ExternalLink href="https://www.aboutads.info">{copy.ads.aboutAdsLabel}</ExternalLink>
            {" · "}
            <ExternalLink href="https://policies.google.com/technologies/partner-sites">{copy.ads.howGoogleLabel}</ExternalLink>
          </p>
        </>
      ),
    },
    { heading: copy.hosting.heading, content: <Paragraphs items={copy.hosting.paragraphs} /> },
    { heading: copy.links.heading, content: <Paragraphs items={copy.links.paragraphs} /> },
    {
      heading: copy.contact.heading,
      content: (
        <>
          <Paragraphs items={copy.contact.paragraphs} />
          <p>
            <a className="text-link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            {" · "}
            <a className="text-link" href={copy.contact.contactPageHref}>
              {copy.contact.contactPageLabel}
            </a>
          </p>
          <p>
            <em>{copy.updated}</em>
          </p>
        </>
      ),
    },
  ];
}

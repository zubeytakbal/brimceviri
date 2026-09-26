export type ConversionCard = {
  key: string;
  title: string;
  symbol: string;
  links: Array<{
    href: string;
    label: string;
  }>;
};

type ConversionLike = {
  slug: string;
  reverseSlug: string;
  fromName: string;
  toName: string;
  fromUnit: string;
  toUnit: string;
};

type CreateConversionCardsOptions<T extends ConversionLike> = {
  conversions: T[];
  hrefForSlug: (slug: string) => string;
  directionLabel: (conversion: T) => string;
  symbolSeparator: string;
  titlePairSeparator: string;
  titleSingleSeparator: string;
  // Sembol gosterimi (ornegin Ingilizcede "arşın" yerine "arshin").
  symbolForUnit?: (unit: string) => string;
};

export function createConversionCards<T extends ConversionLike>(
  options: CreateConversionCardsOptions<T>
): ConversionCard[] {
  const {
    conversions,
    hrefForSlug,
    directionLabel,
    symbolSeparator,
    titlePairSeparator,
    titleSingleSeparator,
    symbolForUnit = (unit: string) => unit,
  } = options;
  const conversionsBySlug = new Map(
    conversions.map((conversion) => [
      conversion.slug,
      conversion,
    ])
  );
  const seenPairs = new Set<string>();

  return conversions.reduce<ConversionCard[]>(
    (cards, conversion) => {
      const reverseConversion = conversionsBySlug.get(
        conversion.reverseSlug
      );
      const hasReverseConversion =
        reverseConversion &&
        reverseConversion.slug !== conversion.slug;
      const pairKey = hasReverseConversion
        ? [conversion.slug, reverseConversion.slug]
            .sort()
            .join("::")
        : conversion.slug;

      if (seenPairs.has(pairKey)) {
        return cards;
      }

      seenPairs.add(pairKey);

      cards.push({
        key: pairKey,
        title: hasReverseConversion
          ? `${conversion.fromName} ${titlePairSeparator} ${conversion.toName}`
          : `${conversion.fromName} ${titleSingleSeparator} ${conversion.toName}`,
        symbol: hasReverseConversion
          ? `${symbolForUnit(conversion.fromUnit)} ${symbolSeparator} ${symbolForUnit(conversion.toUnit)}`
          : `${symbolForUnit(conversion.fromUnit)} ${titleSingleSeparator} ${symbolForUnit(conversion.toUnit)}`,
        links: hasReverseConversion
          ? [
              {
                href: hrefForSlug(conversion.slug),
                label: directionLabel(conversion),
              },
              {
                href: hrefForSlug(reverseConversion.slug),
                label: directionLabel(reverseConversion),
              },
            ]
          : [
              {
                href: hrefForSlug(conversion.slug),
                label: directionLabel(conversion),
              },
            ],
      });

      return cards;
    },
    []
  );
}

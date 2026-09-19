# English product plan

## Product position

The English site is a unit-conversion product first. Calculators are a
supporting product line only when they answer a verified search need or make a
conversion journey materially more useful.

The English site is not a separate product. Its header, footer, search,
language switcher, category model, conversion-page template and visual system
remain shared with the other locales. English can have different editorial
content, US/Imperial-focused examples and extra pages only where there is a
clear English-language product or search reason.

## Verified core coverage

This inventory is derived from the source registries, not from a manual URL
count.

| Core asset | Current source of truth | Current position |
| --- | --- | --- |
| Units | `app/converter/unitRegistry.ts` | 236 registry entries have both Turkish and English data. |
| English unit guides | `app/converter/localizedUnitPages.ts` | 236 unique routes. Curated guides are supplemented by generated guides for every registry entry that has Turkish and English data. Duplicate source records are de-duplicated by route slug before publication. |
| English conversion URLs | `app/converter/localizedConversionPages.ts` | 452 routes, generated from the shared conversion definitions. The localization function throws when a pair lacks English unit data, so missing core English labels cannot silently publish. |
| Categories | `app/converter/localizedCategoryPages.ts` | 38 English category records provide the category directory and page content. |
| Sitemap and static routes | `app/en/[slug]/page.tsx`, `app/en/units/[slug]/page.tsx`, `app/sitemap.ts` | English conversion and unit records are used for static parameters and sitemap entries. The latest sitemap audit returned 833 unique English URLs. |

This means the first task is validation and repair, not a new batch of
conversion pages. A registry entry without English data, an unlisted category,
a duplicate slug, a broken canonical or a missing sitemap entry is a core
coverage defect and takes priority over a new calculator.

The latest source audit found no missing eligible English unit guide, no
conversion slug collision, no root-route collision with standalone tools and
no conversion or unit category gap. It found three duplicate unit-guide
records; route-level de-duplication now prevents those records from creating
duplicate static routes or sitemap entries. A sitemap audit confirmed that the
833 published English URLs are unique. The underlying repeated catalog records
should be consolidated in a later content-cleanup pass.

An alternate-language audit checked 726 English conversion, unit-guide and
category URLs. Every one has its English alternate. 706 have a Turkish
equivalent and therefore an `x-default` path; the remaining 20 are English-only
assets and are correctly excluded instead of pointing `hreflang` at an
unrelated homepage.

## Publication gates

### Gate 1 — conversion core is complete

Before adding any calculator, validate and record:

1. every eligible registry unit has an English unit-guide URL;
2. every conversion pair publishes both directions without a duplicate slug;
3. every conversion and unit page is reachable from its English category;
4. all core English URLs appear once in the sitemap;
5. canonical, `hreflang` and language-switcher paths resolve to an equivalent
   page or intentionally omit that locale;
6. the production build has no English route errors.

### Gate 2 — English editorial quality

Prioritize the highest-intent conversion clusters before adding long-tail
calculators:

1. length, weight/mass, temperature, area and volume;
2. cooking measures, fuel economy, pressure, speed and data storage;
3. electrical, energy/power, flow, density and engineering units;
4. historical and regional units only where their category page gives useful
   context and internal links.

Each priority page must have a clear title, formula, live converter, useful
examples, related conversions and links back to its category and unit guides.

Core interaction improvements are preferred over duplicate URLs. The shared
English pair and category converters now show a feet-and-inches equivalent for
results in feet. Both converters explicitly identify US customary versus
Imperial/UK volume measures for gallons, pints, quarts and fluid ounces. The
unit selectors label the US variants explicitly rather than presenting an
ambiguous "Gallon", "Pint", "Quart" or "Fluid Ounce".

### Completed English system-distinction cluster

The global-core and system-distinction candidates are now supported by
English-specific editorial material, rather than only by the shared conversion
template. The completed unit-guide set covers meter, kilogram, liter, US and
Imperial gallons, US and Imperial quarts, US and Imperial pints, and US and
Imperial fluid ounces. The corresponding high-intent conversion pages also
explain the applicable measurement system.

The remaining candidates in `englishSearchPublicationPolicy.ts` are historical
reference units. They are deliberately not expanded into long-form English
search content until demand and SERP evidence justify the work. Their existing
functional conversion and reference pages remain available.

### Gate 3 — calculator demand is proven

No new programmatic calculator is published solely because it can be made.
Every proposal needs a recorded score before implementation:

| Criterion | Weight | Evidence required |
| --- | ---: | --- |
| Search intent and demand | 35% | Keyword source or Search Console query data. |
| SERP opportunity | 25% | Manual review of the first-page results and their intent. |
| Product fit | 20% | Direct link to a conversion category, unit guide or existing user journey. |
| Sustainable quality | 20% | Correct method, limits, examples, inputs and maintenance owner. |

Only proposals with evidence in all four columns move to implementation.
Low-demand utility tools may remain unindexed or be omitted rather than
inflating the public URL count.

Existing elevated-review tools are reviewed before the catalog expands. The
first completed health pass places an adult-only, screening-not-diagnosis note
in the BMI result screen and an LMP-estimate, clinician-confirmation note in
the pregnancy result screen.

The initial electrical pass found the live cable-size, voltage-drop, power-to-
current and motor-current pages already distinguish preliminary calculations
from final electrical design. In particular, cable ampacity, installation
method, environmental corrections, product data and the applicable electrical
code are kept as separate verification requirements. No new electrical tool
will be added until that boundary remains clear in the live result and page
content.

### Elevated-review completion log

The current English registry has 27 elevated-review tools. Each has now had a
manual source, scope and limitation review; this is a quality-completion log,
not permission to add more calculators.

| Cluster | Tools reviewed | Completion criteria |
| --- | ---: | --- |
| Health | 2 | Screening/estimate wording and escalation limits are visible in results. |
| Electrical | 5 | Preliminary-calculation boundary, installation/code verification and live-circuit limits are visible. |
| Heat transfer | 6 | Stated model, operating assumptions, limits and sources are visible. |
| Mechanics and materials | 7 | Linear/ideal-model limits and NIST, MIT or NASA references are visible. |
| Fluids and piping | 2 | Fluid-property, duty-point and gas/two-phase or pump-selection limits are visible. |
| Dimensionless numbers | 5 | Correlation or regime scope, property/reference-state limits and sources are visible. |

New calculator proposals remain frozen until Gate 3 evidence is collected.

## English identity rules

1. Keep shared layout primitives and navigation across locales.
2. Localize examples, terminology, unit order and editorial content; do not
   fork the underlying interaction model without a product reason.
3. Use US customary and Imperial distinctions explicitly. Never label both as
   simply "gallon", "pint" or "ton" when ambiguity changes the result.
4. Keep calculator hubs subordinate to the conversion taxonomy where a natural
   relationship exists.
5. Do not create an English-only hub or page family until it has a documented
   purpose, owner and internal-linking route.

## Delivery order

1. Produce the Gate 1 coverage report and repair any verified core defects.
2. Improve the priority conversion clusters and their category pages.
3. Collect keyword and SERP evidence for a calculator backlog.
4. Publish only the highest-scoring calculator cluster, then measure it before
   opening the next cluster.

## Definition of success

The English site succeeds when a visitor can find any supported unit,
understand which measurement system applies, convert it immediately, discover
the reverse and related conversions, and reach a calculator only when that
calculator solves a real adjacent need. URL count is not a success metric.

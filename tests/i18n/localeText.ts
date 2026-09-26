// Bir dile ait gorunen metinleri (string, template ve JSX metni) kaynak koddan cikarir.
// Dile ozel dosyalarin tamami, ortak dosyalarda ise yalnizca `<dil>: { ... }` bloklari taranir.
// Adres ve kimlik alanlari (slug, href, id...) metin sayilmaz.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

export const ROOT = path.resolve(__dirname, "../..");

export const LOCALES = {
  de: "German",
  en: "English",
  fr: "French",
  es: "Spanish",
  it: "Italian",
  nl: "Nederlands",
  ar: "Arabic",
  uz: "Uzbek",
  bn: "Bengali",
  sv: "Swedish",
  da: "Danish",
  no: "Norwegian",
  pt: "Portuguese",
} as const;

export type Locale = keyof typeof LOCALES;

export type TextSegment = { file: string; line: number; text: string };

const SKIP_PROPS = new Set([
  "slug", "sourceSlug", "href", "id", "key", "category", "locale", "symbol", "path", "code", "lang",
  "primaryHref", "secondaryHref", "canonical", "unit", "from", "to", "enConversionSlug", "dateLocale",
  "numberLocale", "hreflang", "src", "icon", "className", "type", "fromUnit", "toUnit", "categorySlug",
  "unitSlug", "target", "value",
]);

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

const sharedFileCache = new Map<string, string>();
function allSourceFiles(): string[] {
  if (sharedFileCache.size === 0) {
    for (const file of walk(path.join(ROOT, "app"))) sharedFileCache.set(file, fs.readFileSync(file, "utf8"));
  }
  return [...sharedFileCache.keys()];
}

function propName(node: ts.Node): string | null {
  const parent = node.parent;
  if (parent && ts.isPropertyAssignment(parent) && parent.initializer === node) return parent.name.getText().replace(/["']/g, "");
  if (parent && ts.isJsxAttribute(parent)) return parent.name.getText();
  if (parent && ts.isJsxExpression(parent) && parent.parent && ts.isJsxAttribute(parent.parent)) return parent.parent.name.getText();
  return null;
}

function insideLocaleBlock(node: ts.Node, locale: string): boolean {
  for (let current = node.parent; current; current = current.parent) {
    if (ts.isPropertyAssignment(current) && current.name.getText().replace(/["']/g, "") === locale) return true;
  }
  return false;
}

function extract(file: string, locale: string, wholeFile: boolean): TextSegment[] {
  const source = sharedFileCache.get(file) ?? fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const segments: TextSegment[] = [];
  const visit = (node: ts.Node) => {
    let text: string | null = null;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) text = node.text;
    else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) text = node.text;
    else if (ts.isJsxText(node)) text = node.getText(sf);
    if (text !== null && /[^\s]/.test(text)) {
      const name = propName(node);
      const isDisplayValue = name === "value" && (/\s/.test(text) || /^\p{Lu}\p{Ll}+$/u.test(text));
      const skip =
        (name !== null && SKIP_PROPS.has(name) && !isDisplayValue) ||
        ts.isImportDeclaration(node.parent) ||
        ts.isLiteralTypeNode(node.parent) ||
        ts.isElementAccessExpression(node.parent) ||
        (ts.isBinaryExpression(node.parent) && /==/.test(node.parent.operatorToken.getText(sf))) ||
        /^[/#.]|^https?:/.test(text);
      if (!skip && (wholeFile || insideLocaleBlock(node, locale))) {
        segments.push({
          file: path.relative(ROOT, file),
          line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1,
          text,
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return segments;
}

export function localeSegments(locale: Locale): TextSegment[] {
  const prefix = LOCALES[locale];
  const files = allSourceFiles();
  const own = files.filter(
    (file) =>
      file.startsWith(path.join(ROOT, "app", locale) + path.sep) ||
      (path.basename(file).startsWith(`localized${prefix}`) && file.includes(`${path.sep}converter${path.sep}`)) ||
      (path.basename(file).startsWith(prefix) && file.includes(`${path.sep}components${path.sep}`))
  );
  const blockPattern = new RegExp(`(^|[^a-z-])"?${locale}"?: ?\\{`, "m");
  const shared = files.filter((file) => !own.includes(file) && blockPattern.test(sharedFileCache.get(file) ?? ""));
  return [...own.flatMap((file) => extract(file, locale, true)), ...shared.flatMap((file) => extract(file, locale, false))];
}

// Cevrilmemis Ingilizce cumle belirtileri. Kelime listesi bilincli olarak dar tutuldu:
// yalnizca baska dillerde tesadufen gecmeyecek kaliplar.
const ENGLISH_PATTERN = /\b(Enter a|Enter the|the result|to see the|What do you|you want|cannot be|Your |Select a|Calculate |Estimated|per day|per week)\b/;

export function looksEnglish(text: string): boolean {
  return ENGLISH_PATTERN.test(text);
}

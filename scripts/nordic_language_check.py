"""Iskandinav dil denetimi (rapor).

out/ icindeki sv, no ve da sayfalarinin metnini Hunspell sozlukleriyle tarar
(npm: dictionary-sv, dictionary-nb, dictionary-da; denetim: spylls).
- "karisma": sayfanin dilinde olmayan ama diger Iskandinav dillerinden birinde
  olan kelimeler (orn. Norvecce sayfada Danca "hvad"). Once bunlar incelenir.
- "bilinmeyen": hicbir Iskandinav sozlugunde olmayan kelimeler (yazim hatasi
  adayi ya da sozlukte olmayan teknik terim).
Buyuk harfle baslayan kelimeler (ozel adlar) ve nordic_allowlist.txt'deki
dogrulanmis terimler sayilmaz.

Kurulum: pip install spylls
Kullanim: npm run build && python3 scripts/nordic_language_check.py
"""

import re
import sys
from collections import defaultdict
from functools import lru_cache
from pathlib import Path

from spylls.hunspell import Dictionary

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
LANGS = {"sv": "dictionary-sv", "no": "dictionary-nb", "da": "dictionary-da"}
DICTS = {lang: Dictionary.from_files(str(ROOT / "node_modules" / pkg / "index")) for lang, pkg in LANGS.items()}


def load_allowlist():
    allow = defaultdict(set)
    for line in (ROOT / "scripts" / "nordic_allowlist.txt").read_text(encoding="utf-8").splitlines():
        line = line.split("#", 1)[0].strip()
        if not line:
            continue
        lang, _, word = line.partition(":")
        allow[lang.strip()].add(word.strip().lower())
    return allow


# scripts/thinGuard.ts pageText ile ayni kurallar.
def page_text(html):
    match = re.search(r"<main[\s\S]*?</main>", html)
    text = match.group(0) if match else html
    text = re.sub(r"<(script|style|svg|select|button|nav)\b[\s\S]*?</\1>", " ", text)
    return re.sub(r"<[^>]+>", " ", text)


def head_text(html):
    title = re.search(r"<title>([^<]*)</title>", html)
    description = re.search(r'<meta name="description" content="([^"]*)"', html)
    return f"{title.group(1) if title else ''} {description.group(1) if description else ''}"


def decode(text):
    for entity, char in (("&amp;", "&"), ("&quot;", '"'), ("&#x27;", "'"), ("&#39;", "'"), ("&nbsp;", " ")):
        text = text.replace(entity, char)
    return text


WORD = re.compile(r"[A-Za-zÀ-ÖØ-öø-ÿ]+")


@lru_cache(maxsize=None)
def known(lang, word):
    return DICTS[lang].lookup(word)


def main():
    allow = load_allowlist()
    mixed = {lang: defaultdict(set) for lang in LANGS}
    unknown = {lang: defaultdict(set) for lang in LANGS}
    for lang in LANGS:
        allowed = allow["common"] | allow[lang]
        others = [o for o in LANGS if o != lang]
        for path in sorted((OUT / lang).rglob("*.html")):
            html = path.read_text(encoding="utf-8")
            url = "/" + str(path.relative_to(OUT)).removesuffix(".html").removesuffix("/index")
            for word in WORD.findall(decode(head_text(html) + " " + page_text(html))):
                if len(word) < 3 or word[0].isupper() or word.lower() in allowed or known(lang, word):
                    continue
                bucket = mixed if any(known(o, word) for o in others) else unknown
                bucket[lang][word].add(url)

    def show(title, rows):
        rows = sorted(rows.items(), key=lambda item: (-len(item[1]), item[0]))
        print(f"\n## {title}: {len(rows)} kelime")
        for word, urls in rows:
            print(f"{len(urls):4}  {word}  {' '.join(sorted(urls)[:2])}")

    for lang in LANGS:
        show(f"{lang} karisma (baska Iskandinav dilinde var)", mixed[lang])
        show(f"{lang} bilinmeyen", unknown[lang])
    return 0


if __name__ == "__main__":
    sys.exit(main())

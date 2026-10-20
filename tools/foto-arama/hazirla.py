# Geçici. secim.json yoksa: adayların küçük resimlerini indirip şehir başına bir satırlık karşılaştırma sayfaları üretir.
# secim.json varsa: seçilen fotoğrafları 1920 ve 960 piksel WebP'ye çevirir, bilgilerini secilenler.json'a yazar.
import json, os, re, html, hashlib, time, subprocess, urllib.request
from PIL import Image, ImageDraw

UA = "birimceviri-saat/1.0 (+https://www.birimceviri.app)"
K = "tools/foto-arama"
d = json.load(open(f"{K}/adaylar.json"))
yerler = json.load(open(f"{K}/yerler.json"))


def kaydet(mesaj):
    # Her parça hazır olunca dala yazılır; iş süre sınırına takılsa da yapılan kaybolmaz.
    subprocess.run(["git", "add", K], check=True)
    if subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode != 0:
        subprocess.run(["git", "commit", "-q", "-m", mesaj], check=True)
        subprocess.run(["git", "pull", "-q", "--rebase"], check=True)
        subprocess.run(["git", "push", "-q"], check=True)


def thumb(title, w):
    n = title.replace("File:", "").replace(" ", "_")
    h = hashlib.md5(n.encode()).hexdigest()
    return f"https://thumb.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{n}/{w}px-{n}"


def indir(url, yol):
    for i in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r, open(yol, "wb") as f:
                f.write(r.read())
            return True
        except Exception as e:
            print("tekrar", url[-60:], e, flush=True)
            time.sleep(2 * (i + 1))
    return False


os.makedirs("tmp", exist_ok=True)
if not os.path.exists(f"{K}/secim.json"):
    os.makedirs(f"{K}/sayfalar", exist_ok=True)
    W, H = 260, 150
    sehirler = [s for s in d if d[s]]
    for parca in range(0, len(sehirler), 6):
        grup = sehirler[parca:parca + 6]
        hedef = f"{K}/sayfalar/sayfa-{parca // 6 + 1:02d}.jpg"
        if os.path.exists(hedef):
            continue
        c = Image.new("RGB", (100 + 4 * (W + 6), len(grup) * (H + 22)), "white")
        dr = ImageDraw.Draw(c)
        for r, s in enumerate(grup):
            y = r * (H + 22)
            dr.text((4, y + H // 2), s, fill="black")
            for i, a in enumerate(d[s][:4]):
                p = f"tmp/{s}-{i + 1}.jpg"
                if not indir(thumb(a["title"], 330), p):
                    continue
                im = Image.open(p).convert("RGB")
                im.thumbnail((W, H))
                x = 100 + i * (W + 6)
                c.paste(im, (x, y + 16))
                dr.text((x, y + 2), f"{i + 1}  {a['w']}x{a['h']}", fill="black")
                time.sleep(0.3)
        c.save(hedef, quality=80)
        print("sayfa", parca // 6 + 1, grup, flush=True)
        kaydet(f"Foto arama: sayfa {parca // 6 + 1}")
else:
    secim = json.load(open(f"{K}/secim.json"))
    os.makedirs(f"{K}/webp", exist_ok=True)
    kayit = {}
    for slug, no in secim.items():
        a = d[slug][no - 1]
        if not indir(thumb(a["title"], 1920), f"tmp/{slug}.jpg"):
            print("INDIRILEMEDI", slug, flush=True)
            continue
        im = Image.open(f"tmp/{slug}.jpg").convert("RGB")
        for w, q in ((1920, 66), (960, 66)):
            k = im.copy()
            k.thumbnail((w, w * 2))
            yol = f"{K}/webp/{slug}-{w}.webp"
            k.save(yol, "WEBP", quality=q, method=6)
            while w == 1920 and os.path.getsize(yol) > 320 * 1024 and q > 42:
                q -= 6
                k.save(yol, "WEBP", quality=q, method=6)
        yazar = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", a["artist"]))).strip()
        if yazar.lower() in ("", "own work", "unknown"):
            yazar = "Wikimedia Commons"
        kayit[slug] = {"dosya": slug, "yer": yerler[slug][0], "yazar": yazar[:80], "lisans": a["lic"], "kaynak": a["page"]}
        print(slug, os.path.getsize(f"{K}/webp/{slug}-1920.webp") // 1024, "KB", flush=True)
        time.sleep(0.5)
        if len(kayit) % 8 == 0:
            json.dump(kayit, open(f"{K}/secilenler.json", "w"), ensure_ascii=False, indent=1)
            kaydet("Foto arama: webp")
    json.dump(kayit, open(f"{K}/secilenler.json", "w"), ensure_ascii=False, indent=1)

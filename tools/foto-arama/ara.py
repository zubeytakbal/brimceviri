# Geçici: saat bölümü şehir fotoğrafları için Wikimedia Commons'ta aday arar (GitHub Actions'ta çalışır).
# Her şehir için yatay, yüksek çözünürlüklü, serbest lisanslı ilk 6 JPEG'i adaylar.json'a yazar.
import json, time, urllib.request, urllib.parse

UA = "birimceviri-saat/1.0 (+https://www.birimceviri.app)"
API = "https://commons.wikimedia.org/w/api.php"
yerler = json.load(open("tools/foto-arama/yerler.json"))
sonuc = {}


def cagir(q):
    url = API + "?" + urllib.parse.urlencode({
        "action": "query", "generator": "search", "gsrnamespace": 6, "gsrsearch": q, "gsrlimit": 30,
        "prop": "imageinfo", "iiprop": "url|size|extmetadata|mime", "iiurlwidth": 320, "format": "json"})
    bekle = 5
    for _ in range(8):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30) as r:
                return json.load(r)
        except Exception as e:
            print("bekle", bekle, e, flush=True)
            time.sleep(bekle)
            bekle *= 2
    return {}


for slug, (yer, q) in yerler.items():
    d = cagir(q)
    rs = []
    for p in sorted((d.get("query") or {}).get("pages", {}).values(), key=lambda p: p.get("index", 99)):
        ii = (p.get("imageinfo") or [{}])[0]
        m = ii.get("extmetadata", {})
        g = lambda k: (m.get(k, {}).get("value") or "")
        rs.append(dict(title=p["title"], w=ii.get("width"), h=ii.get("height"), mime=ii.get("mime"),
                       lic=g("LicenseShortName"), artist=g("Artist"), page=ii.get("descriptionurl")))
    sonuc[slug] = [r for r in rs if r["mime"] == "image/jpeg" and r["w"] and r["w"] >= 1920 and r["h"] * 1.25 <= r["w"] <= r["h"] * 2.2
                   and r["lic"] and ("CC" in r["lic"] or "Public domain" in r["lic"] or "PD" in r["lic"])][:6]
    print(slug, len(sonuc[slug]), flush=True)
    time.sleep(2)

json.dump(sonuc, open("adaylar.json", "w"), ensure_ascii=False, indent=1)

"""Browser check of the built portfolio (optional; needs `pip install playwright` + Chromium or Edge).

Usage: npm run build && npm run preview   (serves http://localhost:4173)
       python scripts/e2e_check.py [URL] [--channel msedge] [--shots DIR]
"""
import sys
import urllib.request

from playwright.sync_api import sync_playwright

URL = next((a for a in sys.argv[1:] if a.startswith("http")), "http://localhost:4173/")
CHANNEL = sys.argv[sys.argv.index("--channel") + 1] if "--channel" in sys.argv else None
SHOTS = sys.argv[sys.argv.index("--shots") + 1] if "--shots" in sys.argv else None
SECTIONS = ["home", "about", "skills", "projects", "education", "certifications", "contact"]
fail = []


def check(ok, msg):
    print(("OK  " if ok else "BAD ") + msg)
    if not ok:
        fail.append(msg)


with sync_playwright() as p:
    b = p.chromium.launch(channel=CHANNEL) if CHANNEL else p.chromium.launch()
    for w, h, name in [(1440, 900, "desktop"), (768, 1024, "tablet"), (390, 844, "mobile")]:
        pg = b.new_page(viewport={"width": w, "height": h})
        errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.goto(URL, wait_until="networkidle")
        for s in SECTIONS:
            check(pg.locator(f"section#{s}").count() == 1, f"[{name}] section #{s} present")
        check(pg.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1"), f"[{name}] no horizontal overflow")
        text = pg.inner_text("body")
        check("S Manisha Rani Patra" in text and "S. Manisha" not in text, f"[{name}] name rendered exactly")
        check("manisharanipatra2@gmail.com" in text and "bmsce.ac.in" not in text, f"[{name}] personal email only")
        if name != "desktop":  # tablet + mobile use the hamburger menu (lg breakpoint)
            pg.click("button[aria-label='Open menu']")
            pg.locator("header a[href='#projects']:visible").first.click()
            try:  # wait for the smooth scroll to settle instead of a fixed delay
                pg.wait_for_function("Math.abs(document.getElementById('projects').getBoundingClientRect().top) < 120", timeout=3000)
            except Exception:
                pass
            check(pg.evaluate("Math.abs(document.getElementById('projects').getBoundingClientRect().top) < 120"), f"[{name}] menu link scrolls to Projects")
        else:
            for s in SECTIONS[1:]:
                pg.click(f"header nav a[href='#{s}']")
                pg.wait_for_timeout(700)
                top = pg.evaluate(f"document.getElementById('{s}').getBoundingClientRect().top")
                check(abs(top) < 120 or s == "contact", f"[{name}] nav -> #{s} (top={top:.0f})")
        # projects: filter + modal
        pg.locator("#projects").scroll_into_view_if_needed()
        n_all = pg.locator("#projects article").count()
        pg.click("button[role=tab]:has-text('Testing')")
        n_test = pg.locator("#projects article").count()
        check(n_all == 7 and n_test == 1, f"[{name}] project filter (all={n_all}, testing={n_test})")
        pg.click("button[role=tab]:has-text('All')")
        pg.locator("#projects [role=button]").first.click()
        check(pg.locator("[role=dialog]").count() == 1, f"[{name}] project modal opens")
        pg.keyboard.press("Escape")
        check(pg.locator("[role=dialog]").count() == 0, f"[{name}] modal closes with Escape")
        # images
        pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        pg.wait_for_timeout(1500)
        broken = pg.evaluate("[...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src)")
        check(not broken, f"[{name}] no broken images {broken}")
        check(not errors, f"[{name}] no JS errors {errors}")
        if SHOTS:
            pg.evaluate("window.scrollTo(0, 0)")
            pg.wait_for_timeout(500)
            pg.evaluate("document.querySelectorAll('.reveal').forEach(e => e.classList.add('visible'))")
            pg.screenshot(path=f"{SHOTS}/{name}.png", full_page=(name != "desktop"))
            if name == "desktop":
                pg.screenshot(path=f"{SHOTS}/desktop-full.png", full_page=True)
        pg.close()

    # external links
    pg = b.new_page()
    pg.goto(URL, wait_until="networkidle")
    links = sorted(set(pg.eval_on_selector_all("a[href^='http']", "els => els.map(e => e.href)")))
    b.close()

for link in links:
    if "linkedin.com" in link:  # LinkedIn blocks automated requests (HTTP 999); checked manually
        print("SKIP", link)
        continue
    try:
        code = urllib.request.urlopen(urllib.request.Request(link, method="GET", headers={"User-Agent": "Mozilla/5.0"}), timeout=20).status
    except Exception as exc:  # noqa: BLE001
        code = getattr(exc, "code", str(exc))
    check(code == 200, f"link {link} -> {code}")

print("RESULT:", "PASS" if not fail else f"FAIL ({len(fail)})")
sys.exit(1 if fail else 0)

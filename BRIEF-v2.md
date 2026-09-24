# Bluegrass Commercial Door & More: Website Build Brief (v2)

You are building the **real, launch-ready marketing website** for **Bluegrass Commercial Door & More**, a family-owned commercial door, frame, hardware, and entrance company at 930 Gordon Avenue, Bowling Green, KY 42101 (Warren County). The finished site should look like a professional local contractor site that could go live today. The owner will review it **on a phone**.

## Non-negotiable rules
1. **Nothing may look unfinished.** Never write any of these words or ideas anywhere, including visible text, alt text, titles, comments, README headings shown on the site, or class names that render: "twin", "demo", "prototype", "concept", "bake-off", "mock", "sample site", "not the live site", "Entry A/B/C", "placeholder", or "lorem ipsum". No demo badges, ribbons, or banners. No grey placeholder boxes, empty image squares, or "image coming soon." Every image slot must use a real photo from `./images/`.
   - Required and fine: `<meta name="robots" content="noindex,nofollow">` in `<head>` (it's invisible).
2. **Use only the REAL photos** in `./images/` (harvested from bluegrassdoor.com). Don't use stock photos, AI images, or hotlinks to other sites. See `PHOTOS.md` for what each photo shows and where it works best. (PHOTOS.md lists them under `photos/`. In this project, the same filenames are in `./images/`.)
3. It must **look and work like a ready-to-use website for Bluegrass Door**, which means:
   - The real business name, phone, email, address, services, service area, and reviews come **only from `FACTS.md`**. Never invent facts, hours, years in business, licenses, stats, star ratings, extra reviews, or brand partnerships. **The live site lists no business hours.** Use "Call 270-780-3235 to schedule" instead of made-up hours.
   - Working navigation (anchor links with smooth scroll), a **working mobile menu** (hamburger → full menu, closes on link tap and on Esc), and working **click-to-call** (`tel:+12707803235`) plus a `mailto:sonya@bluegrassdoor.com` link.
   - Working **quote/contact forms**. They validate required fields, then either open a pre-filled `mailto:sonya@bluegrassdoor.com` with the details in the subject/body, or show a proper success state ("Thanks, [name]. We received your request…") and offer the mailto/call as the send path. The forms can't be dead buttons.
   - Keep the **navy/white brand colors**: primary **#0033A0** (from the logo/site). Deeper navy tones (e.g. #0A1F44 / #001A57) are fine for dark sections. Keep accents restrained. One warm accent (e.g. a safety-amber) for small highlights is OK. Don't rebrand into another color story.
   - **Mobile-first.** At a 390px-wide viewport it must look great: no horizontal scroll, tap targets ≥ 44px, readable 16px+ body text, and forms that are easy to fill with a thumb.

## Features (all customer-facing, all must actually work)
1. **Door Builder / Door Finder** (guided, step by step): the user picks **door type** (e.g. storefront/entrance, hollow metal/steel, fire-rated, security/safe room, interior swing, sliding barn, flagpole), **material** (aluminum & glass, hollow metal steel, wood, fiberglass, glass…), **size** (single 3'×7', pair 6'×7', custom with W×H inputs, "not sure, please measure"), and **hardware** (lever lockset, panic/exit device, closer, keypad/access control, hinges/pivots, barn track…). It ends with a clean **summary** card and a "Request a Quote with this door" button that **pre-fills the quote form** (and scrolls to it). Include Back/Next, a progress indicator, and a Start over option. **No prices or lead times.**
2. **Customer help chat assistant**: a polished floating button that opens a small chat panel. It's rule-based/scripted: keyword-matching answers plus quick-reply chips for **Services**, **Hours / scheduling** (be honest: "call 270-780-3235 to schedule"; no invented hours), **Service area** (Warren County and surrounding, based in Bowling Green), **Emergency / broken door** (tell them to call 270-780-3235 right away; don't promise 24/7), **Get a quote** (opens the builder or the quote form), and **Contact**. It should feel like the shop's front desk and always offer a call/email handoff. It must never say "demo", "bot demo", "AI prototype", etc. Call it something like "Questions? We're here to help" / "Bluegrass Door Help".
3. **Quote request flow**: name, phone, email, project type, location/city, timeline, and details, with optional door-builder summary attached. Validate the fields, show a success state, and send via mailto (see above).
4. **REMOVE** any "AI email triage / inbox" tool. It's internal and must not appear or be linked anywhere.

## Design direction (be a great designer, not a template)
Think "established regional commercial contractor": confident, clean, trustworthy, and photo-led. No gimmicks.
- **Header:** logo (`./images/logo.png` on a white header, or a white bar/chip if the header is navy), nav links, a prominent phone number, and a "Request a Quote" button. Sticky and compact on scroll. Hamburger on mobile.
- **Hero:** full-bleed, using their best real photo (`van-and-shop-building-wide.jpg`, `team-in-front-of-shop.jpg`, or `fleet-van-kentucky-logo.jpg`), with a navy gradient overlay for legibility. A clear headline built from real positioning (e.g. "Your Door Specialists in Bowling Green, KY" + "Commercial & residential doors, frames, hardware, partitions, accessories and flag poles."), two CTAs: **Call 270-780-3235** and **Request a Quote**. On a phone the hero should fill most of the first screen, with the headline and both CTAs visible above the fold.
- **Services grid:** Interior/Exterior Doors · Commercial/Industrial (storefronts & glass, fire-rated, security) · Hardware & Frames · Partitions & Accessories · Flagpoles. Each card uses a real photo where one fits (see PHOTOS.md). Where no photo fits (e.g. flagpoles, partitions), use a solid navy card with a clean line icon (inline SVG). Never use a grey box.
- **Why us:** built ONLY from real facts: family owned & operated in Warren County; in-house fabrication; front office + skilled installation team; attends trade shows for the latest door solutions; easy-to-spot branded vehicles and apparel; residential & commercial. Use the real team/office/fabrication/trade-show photos.
- **Reviews:** the three real reviews from FACTS.md, verbatim, with names. No stars or counts.
- **Project gallery:** the real project photos in a tidy responsive grid (tap to enlarge in a simple lightbox is a plus).
- **Door builder** section (feature 1).
- **Service area:** Bowling Green / Warren County and surrounding. A simple styled panel or an embedded Google Map iframe of 930 Gordon Ave is fine (`https://www.google.com/maps?q=930+Gordon+Ave,+Bowling+Green,+KY+42101&output=embed`).
- **Contact / quote section** with the form + NAP + call/email buttons.
- **Footer:** full NAP (name, address, phone, email), quick links, Facebook link, © current year Bluegrass Commercial Door & More.
- **Sticky mobile call bar/button** (bottom of screen on phones): "Call 270-780-3235" + "Get a Quote". Make sure the chat button doesn't overlap it.
- **Typography:** one good Google Font pair (e.g. "Barlow Condensed"/"Barlow", "Oswald"/"Inter", "Archivo"/"Inter", or "Manrope"). Strong headings, generous spacing, consistent 8px rhythm, max-width ~1200px containers, and subtle shadows/radius. Avoid clutter, emoji, and cartoonish icons.
- The photos are low-res (max 960–1200px). Use them at sensible sizes with `object-fit: cover`, and don't stretch a 480px photo full-width on desktop.
- **Accessibility:** alt text describing each real photo, visible focus states, labels on form fields, and color contrast AA.

## Technical
- **Static HTML/CSS/JS only** (no build step, no frameworks required). Files: `index.html`, `styles.css`, `app.js`, `README.md` (the README can describe the site and how to serve it locally, without "demo" wording).
- **All asset paths must be relative** (`./images/...`, `./styles.css`). The site is served from a GitHub Pages subpath like `https://<user>.github.io/<repo>/`, so never use root-absolute `/images/...` paths.
- Photos live in `./images/` (already compressed, ≤1600px). Add `loading="lazy"` below the fold and `width`/`height` attributes to avoid layout shift.
- `<title>`, meta description (from FACTS.md), Open Graph tags (og:image → `images/van-and-shop-building-wide.jpg`), favicon links, and LocalBusiness JSON-LD (name, address, phone, email, url, only real data, no hours).
- No console errors. Test at 390×844 (phone) and 1440px (desktop).

## Reference files
- `FACTS.md`: the only source of business facts.
- `PHOTOS.md`: each photo's dimensions, source, contents, and best use.
- `./images/`: the photos, logo, and favicons.

## Blind rule
Build independently. **Don't look at, search for, or copy any other version of this site** (other folders, repos, or deployed URLs of other builders). Only the real site bluegrassdoor.com may be consulted for reference.

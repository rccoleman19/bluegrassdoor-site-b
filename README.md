# Bluegrass Commercial Door & More — Demo Twin (Entry B)

Static, showable concept site for a blind design bake-off.

## What this is

- A **demo twin**, not the live production site
- Built as static files: `index.html`, `styles.css`, `app.js`
- Includes:
  - Navy-preserving 3-look toggle (Classic / Steel / Workshop)
  - Guided door builder
  - Shop AI assistant mock with human handoff language
  - 2-minute quote intake path
  - AI email triage inbox mock (hot RFQ / incomplete / spam)
  - Local service/SEO teaser cards

## Safety and labeling

- UI is clearly labeled as demo/twin
- `meta robots="noindex, nofollow"` is included
- Public business contact details shown are sourced from the live public website

## Run locally

From this folder:

```bash
python3 -m http.server 43123
```

Then open:

```text
http://127.0.0.1:43123
```

## 2-minute client walkthrough click path

1. **Theme toggle (15 sec):** In the header, click Classic → Steel → Workshop to show the three navy-safe Looks.
2. **Door builder (35 sec):** Scroll to “Guided Door Builder,” choose project/opening/scope, add notes, click **Build my shortlist**.
3. **Shop assistant (25 sec):** Click a prompt chip, then press **Ask** to show local-tone answer and human handoff.
4. **Quote path (25 sec):** Fill a few fields in “After-hours Quote Path,” click **Send demo intake**, show confirmation tag.
5. **Email triage (20 sec):** In “AI Email Triage,” click one Hot RFQ, then Incomplete, then Spam to show classification + draft logic.

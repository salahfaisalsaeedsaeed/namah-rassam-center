# Prototype release: Academic Platform Upgrade — 13 November 2026

Branch: `preview/site-platform-upgrade-20261113`. **Never merge into `main` without the website owner's explicit approval.**

## Delivered features

- Bilingual homepage featuring the *repository* counts (nine published papers, six slide decks, five video recordings), with verified records kept distinct from proposed institutional programs.
- Nine dedicated Arabic + nine English paper detail pages at `papers/<ID>.html` and `en/papers/<ID>.html`. Paper titles, credited authors, descriptions, publication years, DOIs and covers come from the pre-existing indexed publications. Cross-links to uploaded slides and recordings appear only where a matching file exists.
- Searchable bibliographic author index, not a list of claimed employees or institutional affiliates.
- Bilingual student research presentation showcase with uploaded video recordings, slide previews and links to research details. **Presenter names, video dates, image/voice consent, and school affiliations have not been independently verified.**
- Advanced filters for the publications library (year, topic, type, search and sort).
- Video play controls and a clear link to original recordings in the Events archive, retaining HTML5 native controls.
- Verified-only bilingual opportunities and news registries; both are empty until official sourced entries are added. No invented announcements or deadlines.
- Structured source dataset `data/research.json` and editorial registries `data/opportunities.json` and `data/updates.json`.
- A prototype JSON draft editor at `admin/editor.html`: import, validation and export; **no authentication service, no live GitHub writes, no claim that edits are automatically published**.
- Improved canonical URLs, social media preview images and structured scholarly metadata on the dedicated paper pages; extended sitemap.

## Editorial cautions

1. The paper archive is NOT proof the center published the papers, nor that every listed author belongs to its staff. Keep this disclaimer.
2. Video presentation participants' names and event dates are unknown from filenames alone; do not guess.
3. Public student video display requires appropriate permission, especially for minors. Owner must verify before public promotion.
4. PDF video and other public media files remain in their existing GitHub/Vercel paths; no original media was deleted or altered.
5. No unverified achievements, competitions, scientific events or biographies are fabricated.
6. Accessibility: captions/transcripts are **not yet available** for uploaded videos. They must be prepared from accurate recordings and reviewed before claiming WCAG-level video accessibility.
7. The static content editor cannot securely commit changes on behalf of users. A protected CMS backend or provider-supported editor/authentication integration is needed for one-click publishing.

## Validation checklist

- `node scripts/check-preview.mjs` — basic static integrity.
- Open both `/` and `/en/` and confirm all links and statistics.
- Test the nine detail pages in both languages, including 2025 and 2026.
- Use paper filters and sorting; search by author, type, topic and DOI.
- Test video play on a real desktop and mobile browser and verify direct links.
- Test slide deck PDF in page and in a new tab.
- Confirm exact author names against publication PDFs before final approval.
- Audit consent, subtitles/captions, performance, CSP and any third-party dependencies.

## Publishing to production

Do **not** move main or auto-promote. Ask the website owner to review the Vercel Preview URL first; only merge/promote upon explicit approval.

# Na’mah Rassam Center | مركز نعمة رسام للأبحاث والدراسات

Static bilingual academic website (Arabic/English) for the center.

## Website structure
- 10 top-level sections: Home, About, Research Areas, Research Projects, Publications, People/Team, News & Insights, Events, Partners, Contact.
- Arabic: root `*.html`, `index.html`.
- English: `en/*.html`, `en/index.html`.
- Four retained specialist pages: `ai-technology.html`, `education-rd.html`, `consulting.html`, `academy.html` (also translated under `en/`).
- Shared `css/style.css` and `js/main.js`.
- Images and SVG icons from the original `assets/` directory.

No build process, database, server, or paid dependency is needed. Vercel serves these static files directly.

## Integrity / content
The prototype project/publication/event items are explicitly identified as illustrative or proposed. Team identities, confirmed publications, event dates, and partnerships require verified records and publication permission. No invented institutional facts are included.

## Contact
The contact form uses `mailto:` and does not upload or store information. **The inherited destination `info@namahrassam.org` is unverified**. Verify and replace it in `js/main.js` before using it for operational communications.

## Deployment
The GitHub repository is connected to Vercel and pushes to `main` can trigger production deployments. Review in a preview branch before merging.

## Legacy documentation
`SOURCE_CODE.md` is retained from the original archive as a historical snapshot and does not reflect the current bilingual pages. The live HTML, CSS, and JavaScript files are authoritative.

## Accessibility
Semantic landmarks, one H1 per page, keyboard-operable navigation, Arabic RTL/English LTR, form validation, visible focus, reduced-motion support, responsive layouts, canonical URLs and hreflang are included.

# Validation

Validated October 30, 2026.

- `npm run check`: JavaScript and preview-server syntax pass.
- `git diff --check`: pass.
- All static image references resolve to files in `docs/assets/`.
- Desktop browser at 1280 x 720: hero title and main action fit in the initial viewport; no page-level horizontal overflow; hero image loads.
- Mobile browser at 390 x 844 and 320 x 740: no page-level horizontal overflow; navigation collapses to a functioning menu.
- Research filter offers only TLS research; Applications offers Friction, SecureStart, and PillPal; All work restores all four project tabs. One selected project panel is displayed at a time.
- Case-study dialog opens with the project heading and image. Escape closes it and returns focus to the invoking button. Mobile dialog fits within the viewport.
- Skills tabs switch panels by click and by arrow keys.
- Dark and light theme toggles render. Native browser storage is optional and errors are caught.
- Motion pause stops the sculpture animation and leaves every content reveal visible. CSS also disables decorative animation and smooth scrolling for the system reduced-motion preference.
- Copy email succeeds in the local browser; an explanatory fallback is present for blocked clipboard access. Email links use the user-confirmed address.
- Browser error/warning log was empty during the tested interactions.
- The original teacher resume, GPA, test scores, and private documents are excluded from deployment.

These are functional browser and source checks, not a Lighthouse or assistive-technology certification. No Core Web Vitals benchmark is claimed.

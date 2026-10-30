# Sreehan Adigopula | Portfolio

A responsive, interactive portfolio built with native HTML, CSS, and JavaScript. No install step, frontend framework, tracker, or external runtime dependency is required.

**Live website:** https://sreehanadigopula.github.io/Portfolio-Website/

## Run locally

```sh
npm start
```

Open http://127.0.0.1:4173. Run `npm run check` for syntax verification.

## Features

- Pointer-responsive sculptural hero with an original generated image.
- A project explorer with large, uncropped previews, category filters, keyboard-operable project tabs, and direct live-site/source links.
- Keyboard-accessible project case-study dialogs.
- Keyboard-operable skills tabs and native background accordions.
- Dark and light themes, optional saved theme preference, motion pause, and system reduced-motion support.
- Email links and a copy-email action with a plain fallback.
- Self-hosted open-license fonts and local assets.

## Content and deployment

The deployable website is in `docs/`. It works on any static host. Project content is in `docs/index.html` and `docs/app.js`. Design tokens, layout, and responsive rules are in `docs/styles.css`.

GitHub Pages publishes the `docs/` folder directly from `main` after each push. The repository's Pages setting uses Deploy from a branch, with branch `main` and folder `/docs`. No custom deployment workflow is required. `CONTENT_SOURCES.md` documents evidence and editorial choices. `DESIGN.md` records how the three references are combined.

The provided teacher resume is used as background evidence and is not included in the deployed assets. Project screenshots show the real public apps with a fresh local browser state. Do not add personal documents or secrets to `docs/`.

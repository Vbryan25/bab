# BAB — Integrity Console

A 13-screen clickthrough prototype of a proctoring integrity dashboard: live chat
triage, student context, and case review. Vanilla HTML/CSS/JS, no dependencies,
no framework.

## Structure

```
index.html            page shell + markup; links the css/ and js/ files
css/
  tokens.css          design tokens (:root) — colours, surfaces, series palette
  layout.css          reset, shell, icon rail, secondary nav, content card
  components.css      buttons, tables, badges, stat tiles, charts, settings
  inbox.css           inbox: conversation list, thread, composer, context panel
js/
  icons.js            outline icon set + the filled selected-state counterparts
  chrome.js           avatars, nav builders, mini chart helpers
  pages.js            the 13 page render functions
  app.js              routing, composer, dictation, modals
build.py              inlines everything into dist/ for Artifact publishing
```

## Running it

Any static server works — the site is plain files with no build step for local use:

```
python3 -m http.server 8777
```

Then open <http://localhost:8777/index.html>.

## Publishing to a Claude Artifact

Artifacts run under a strict CSP that blocks every external host, so a published
page cannot fetch `css/*.css` or `js/*.js`. Build the single-file version first:

```
python3 build.py
```

That writes `dist/integrity-console.html` — self-contained, no external
references — which is the file to publish. `dist/` is gitignored; rebuild it
after a fresh clone.

## Conventions worth keeping

- **Scripts stay classic, not modules.** There are 33 inline `onclick=` handlers,
  which resolve against global scope. Switching to `type="module"` would scope the
  functions and break every one of them. Load order in `index.html` matters.
- **Selected-state icons are filled, default icons are outlined.** Filled glyphs
  live in `ICON_SOLID` in `js/icons.js`: fill the outer silhouette with
  `currentColor`, then knock the interior detail back out in the chip colour.
  Actions (search) never fill — only destinations with a selected state do.
- **Two reds.** `--red` (`#c70036`) is for primary actions; `--red-deep`
  (`#b20030`) is only the inbox Close button and the live-attempt badge.
- **One elevation.** The content card is the only shadowed surface on a page.
  Nested blocks (tiles, chart wells) use `--surface-nested` with a hairline
  border, never a second shadow.

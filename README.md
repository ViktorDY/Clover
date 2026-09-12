# Kretz

Marketing site and member-facing prototype for **Kretz** — one platform for
Norwegian sports clubs: training, sign-ups, membership fees and hall booking.

Built with React 19, Vite and Tailwind CSS v4. Frontend only; there is no
backend yet, so forms, payments and sign-in are local state.

## Running it

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint     # eslint
```

## The three views

Routing is hash-based so the site works on GitHub Pages without server
rewrites. No router dependency.

| Hash        | View             | What it is                                                                   |
| ----------- | ---------------- | ---------------------------------------------------------------------------- |
| `#/`        | Landing          | Hero, how-it-works, feature explorer, customer stories, about, app, FAQ, CTA |
| `#/booking` | Hall booking     | Pick a date, time and table/court, then pay by Vipps or card                  |
| `#/medlem`  | Member dashboard | Activities, payments, notifications, messages with file folders, club posts   |

`#/booking` accepts `?klubb=<slug>` (`bordtennis`, `tennis`, `vif`, `fana`,
`biljard`) and `?from=member`, which sends the back button to the dashboard
instead of the landing page.

### Signing in

The login modal is a prototype with fixed demo credentials:

```
test@kretz.no / 000000
```

Choosing **Medlem** opens the member dashboard. **Administrator** reports that
the admin portal is not built yet.

## Layout

```
src/
├── App.jsx                 hash routing, login + booking modals
├── index.css               Tailwind import, design tokens, keyframes
├── lib/
│   ├── LangProvider.jsx    NO/EN state, persisted to localStorage
│   ├── langContext.js      context + useLang, exposing t(no, en)
│   ├── useHashRoute.js     hashchange → { path, params, navigate }
│   ├── useReveal.js        IntersectionObserver scroll reveals
│   ├── clubs.js            venues, time slots, availability
│   ├── memberData.js       dashboard seed content
│   └── pick.js             resolve { no, en } or a plain string
├── components/             landing sections, modals, logo, member/ panels
└── pages/                  LandingPage, BookingPage, MemberPage
```

## Language

Everything ships in Norwegian and English behind the `NO`/`EN` header toggle.
Components call `t("norsk", "english")`; the choice persists in
`localStorage`. Seed data stores both variants as `{ no, en }`, and `pick()`
resolves either those or the plain strings a visitor types.

## Design notes

The visual system comes from the Kretz design canvas: `#16241a` ink on
`#f6f8f3` paper, `#74cd85` as the primary green, `#ffc94a` for accents, pill
buttons, generous corner radii, and soft drifting gradients behind each
section. Tokens live in the `@theme` block in `src/index.css`, so colours are
referenced by name (`bg-grass`, `text-ink/70`) rather than raw hex.

Two substitutions were needed:

- **Headings** use [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque),
  the documented fallback for the canvas's *Nority Inktrap*, which is not a
  public webfont. Body text is Instrument Sans, as designed.
- **The logo** in `src/components/KretzMark.jsx` is a vector stand-in, since
  the canvas referenced a raster file that is not in this repo. Replace that
  component (and `public/favicon.svg`) with the real artwork when it lands.

Motion respects `prefers-reduced-motion`: reveals resolve immediately and the
ambient gradients hold still.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. `vite.config.js` sets `base: '/Clover/'` to
match the repository path — change it if the repository is renamed or moved to
a custom domain.

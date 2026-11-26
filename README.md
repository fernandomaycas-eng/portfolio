# Fernando Maycas — Portfolio

Sports broadcast design, sports social content and filmmaking & editing.

Homepage prototype built with **React + Vite + TypeScript**, lean CSS Modules and **GSAP** (ScrollTrigger) for motion.

> **Status:** prototype. Project names are real, but all media, descriptions and credits are clearly labelled **placeholders** until assets and details are supplied. Nothing is deployed yet.

---

## Setup

Requires Node 20+.

```bash
npm install
npm run dev       # http://localhost:5173/portfolio/
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
npm run lint
```

The site is configured for GitHub Pages at `/portfolio/` (`base` in `vite.config.ts`). All media paths go through `asset()` in `src/lib/media.ts`, so changing the base in one place is enough.

---

## Project structure

```
src/
  data/                 ← all editable content lives here
    types.ts            content model (Project, MediaAsset, AspectRatio…)
    projects.ts         every project, grouped by category
    categories.ts       the three disciplines and their sub-categories
    site.ts             name, hero lines, about copy, contact links, nav
  components/
    media/              MediaFrame (native-ratio video/image) + Placeholder
    project/            ProjectCard, ProjectGrid
    ui/                 SectionHeader, StatusTag, WipeReveal
    layout/             Nav, Footer
  sections/             Hero, BroadcastDesign, WorkSection (social + film), About, Contact
  lib/                  gsap setup, scroll reveal hook, media helpers
  styles/global.css     design tokens, reset, utilities
public/
  media/                web-optimised exports go here (create when needed)
```

### Homepage sections

- Navigation: Broadcast · Social · Film · About · Contact (full-screen menu on mobile)
- Typographic hero — *Sports. Motion. Broadcast.* with discipline ticker
- **01 Broadcast Design** — featured LaLiga Broadcast Package (opener, deliverables, four system components), then Premier League Broadcast Package and Brazil — Opening Sequence
- **02 Sports Social Content** — three story projects
- **03 Filmmaking & Editing** — one project (placeholder)
- **04 About**
- **05 Contact**, footer

Project grids adapt automatically: one project spans full width, two sit in a staggered pair, three or more form a row.

---

## Adding or replacing work

### 1. Export web-optimised media

Never commit masters or project files (`.mov`, `.prproj`, `.aep`, `.hip`, `.psd`… are git-ignored).

| Format | Video export | Poster |
| --- | --- | --- |
| 16:9 | 1920×1080 H.264 MP4, ~6–10 Mbps, no audio for previews | 1920×1080 JPG/WebP |
| 9:16 | 1080×1920 H.264 MP4 | 1080×1920 JPG/WebP |
| 4:5 / 1:1 | 1080×1350 / 1080×1080 | same size |

Keep looping previews short (6–15 s) and small (ideally < 8 MB). For long films with sound, consider hosting on Vimeo/YouTube or a CDN and pointing `src` at the absolute URL.

Place files under `public/media/`, e.g. `public/media/brazil-opening-sequence/cover.mp4`.

Social story assets: set each frame's `aspect` to the real export (e.g. `'9:16'` or `'4:5'`). The frame and grid adapt to it — nothing is forced into a fixed ratio.

### 2. Point the data at the files

In `src/data/projects.ts`, add `src` (and `poster`) to any `MediaAsset`. Paths are relative to `public/`:

```ts
cover: {
  kind: 'video',
  src: 'media/projects/my-project/cover.mp4',
  poster: 'media/projects/my-project/cover.jpg',
  aspect: '16:9',
  alt: 'Animated scoreboard for …',
}
```

As soon as `src` is set, the placeholder frame is replaced by the real media at its native ratio. Videos are muted, inline, `preload="none"`, and only play while on screen (or on hover in the work grid). Nothing autoplays with sound, and nothing plays when the visitor prefers reduced motion.

### 3. Set the project status

- `client` — commissioned work with publication rights confirmed (labelled **Client project**)
- `concept` — self-initiated, not commissioned (labelled **Concept**)
- `placeholder` — details not provided yet (labelled **Placeholder**)

LaLiga and Premier League packages are confirmed concept work and stay `concept`. Only fill `client`, `year`, `role` and `tools` with verified information.

### 4. Add a new project

Append an object to `projects` in `src/data/projects.ts` with the right `category` (`broadcast`, `social` or `film`). It appears in that section automatically. In Broadcast Design, the project with `featured: true` gets the full package layout (deliverables and component frames). No component changes are needed.

### Contact details

`src/data/site.ts` holds the email and social links. They are `null` placeholders for now. The repository is public, so add only details you're happy to publish.

---

## Design notes

- Palette: carbon `#0C0C0C`, off-white `#F2F2ED`, graphite `#282828`, volt `#C5FF00`.
- Type: Barlow Condensed (display) + Inter Tight (text), self-hosted via Fontsource.
- Motion: masked line reveals, a volt wipe reveal on media, hover previews in project grids. All non-essential motion is gated behind `prefers-reduced-motion: no-preference`.
- Placeholders draw broadcast action/title-safe guides so compositions can be judged at true delivery ratio.

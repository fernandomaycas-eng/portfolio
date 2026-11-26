# Fernando Maycas — Portfolio

Sports broadcast design, motion graphics, sports social content and audiovisual production.

Homepage prototype built with **React + Vite + TypeScript**, lean CSS Modules and **GSAP** (ScrollTrigger) for motion.

> **Status:** prototype. Every project, frame and contact detail on the site is a clearly labelled **placeholder** until real work and publication rights are confirmed. Nothing is deployed yet.

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
    projects.ts         showreel, featured broadcast package, selected work, vertical campaigns
    categories.ts       the four disciplines and their sub-categories
    site.ts             name, hero lines, about copy, contact links, nav
  components/
    media/              MediaFrame (native-ratio video/image) + Placeholder
    project/            ProjectCard
    ui/                 SectionHeader, StatusTag, WipeReveal
    layout/             Nav, Footer
  sections/             one file per homepage section, in page order
  lib/                  gsap setup, scroll reveal hook, media helpers
  styles/global.css     design tokens, reset, utilities
public/
  media/                web-optimised exports go here (create when needed)
```

### Homepage sections

1. Navigation (minimal; full-screen menu on mobile)
2. Typographic hero — *Sports. Motion. Broadcast.* with discipline ticker
3. Showreel (16:9, scroll-expanding frame, running timecode)
4. Featured broadcast package (16:9 opener beside a 9:16 cut-down, deliverables, system components)
5. Selected work (filterable by category)
6. Vertical sports content (9:16 campaign rails)
7. About
8. Contact

---

## Adding or replacing work

### 1. Export web-optimised media

Never commit masters or project files (`.mov`, `.prproj`, `.aep`, `.hip`, `.psd`… are git-ignored).

| Format | Video export | Poster |
| --- | --- | --- |
| 16:9 | 1920×1080 H.264 MP4, ~6–10 Mbps, no audio for previews | 1920×1080 JPG/WebP |
| 9:16 | 1080×1920 H.264 MP4 | 1080×1920 JPG/WebP |
| 4:5 / 1:1 | 1080×1350 / 1080×1080 | same size |

Keep looping previews short (6–15 s) and small (ideally < 8 MB). For the full showreel with sound, consider hosting on Vimeo/YouTube or a CDN and pointing `src` at the absolute URL.

Place files under `public/media/`, e.g. `public/media/showreel/showreel-2026.mp4`.

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

- `placeholder` — no real asset yet (labelled **Placeholder**)
- `concept` — self-initiated/speculative work (labelled **Concept**)
- `published` — real work with publication rights confirmed (no label)

Only fill `client`, `year`, `role` and `tools` with verified information.

### 4. Add a new project

Append an object to `projects` in `src/data/projects.ts` with `selected: true` to show it in *Selected work*. Vertical campaigns go in `verticalCampaigns`. No component changes are needed.

### Contact details

`src/data/site.ts` holds the email and social links. They are `null` placeholders for now. The repository is public, so add only details you're happy to publish.

---

## Design notes

- Palette: carbon `#0C0C0C`, off-white `#F2F2ED`, graphite `#282828`, volt `#C5FF00`.
- Type: Barlow Condensed (display) + Inter Tight (text), self-hosted via Fontsource.
- Motion: masked line reveals, a volt "replay wipe" on media, scroll-driven showreel frame. All non-essential motion is gated behind `prefers-reduced-motion: no-preference`.
- Placeholders draw broadcast action/title-safe guides so compositions can be judged at true delivery ratio.

# Portfolio — Fernando Maycas

## Objective
Premium personal portfolio for sports broadcast design, sports social content and filmmaking & editing. Prioritize complete visual systems for leagues, competitions and clubs: openers, scoreboards, player cards, lineups, lower thirds and matchday graphics. Premier League and LaLiga are quality references, not assets to copy. The site should stay focused, credible and aligned with real work only.

## Creative direction (approved — preserve, do not redesign)
Editorial, cinematic, high-contrast, bold condensed typography (Barlow Condensed display, Inter Tight text). Carbon #0C0C0C, off-white #F2F2ED, graphite #282828, volt #C5FF00 accent. Hero: SPORTS. MOTION. BROADCAST. with volt full stops and a volt discipline ticker. Masked line reveals, volt wipe reveals on media, broadcast safe-area guides on placeholders. Avoid generic SaaS layouts, excessive glow and gamer aesthetics. English-first copy. Subtle, purposeful motion; respect reduced-motion preferences.

## Structure
Home, in order: navigation, hero, 01 Broadcast Design, 02 Sports Social Content, 03 Filmmaking & Editing, 04 About, 05 Contact, footer. Navigation: Broadcast, Social, Film, About, Contact. No showreel section and no selected-work filter; the hero leads straight into Broadcast Design.

Work categories (three only): Broadcast Design, Sports Social Content, Filmmaking & Editing. 3D & CGI has been removed. Keep broadcast as the primary specialization.

- **Broadcast Design** — three projects: LaLiga Broadcast Package (featured, with full package layout), Premier League Broadcast Package, and Brazil — Opening Sequence (real client project). Broadcast deliverables: competition opener, scoreboard, player cards, lineups, lower thirds. Replay transitions are not included.
- **Sports Social Content** — three sports social media story projects (details to come). No "Built for Vertical" section and no vertical reels. Do not force 9:16 layouts; adapt presentation to the real assets once supplied (set each asset's `aspect`).
- **Filmmaking & Editing** — one project, shown as a clearly labelled placeholder until final details are provided.

Project labels: `client` (commissioned, rights confirmed), `concept` (not commissioned), `placeholder` (details pending). LaLiga and Premier League packages are labelled Concept unless confirmed as commissioned. Fill client, year, role and tools only with verified information. Never invent client claims or represent stock imagery as original work.

Allow mixed aspect ratios in project data and case studies. Reusable case studies: title, role, video, stills, breakdown, deliverables and tools. Other candidate projects (not on the homepage yet): Matchday System, Copa UNIDAVI, Playtomic, WIMU; verify details and publication rights first.

## Technical approach
React + Vite + TypeScript, CSS Modules, GSAP + ScrollTrigger. Responsive, accessible, keyboard-friendly. All content lives in `src/data/` (projects, categories, site copy); sections render from it. Optimize videos with posters and lazy loading; no autoplay audio. Do not commit original large media, credentials or private information. Repository is public. GitHub Pages-compatible base path /portfolio/; do not deploy without approval.

## Current milestone
Homepage prototype on branch `feature/homepage-prototype`, under review in Pull Request #1. Do not merge or deploy without approval. Next: replace placeholders with real media and project details as they are supplied. Keep README setup and media-replacement docs current.

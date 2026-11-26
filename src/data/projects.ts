import type { CategoryId, MediaAsset, Project } from './types'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROJECT DATA
 *  Project names are real; media, copy and credits are still placeholders.
 *  - Fill `client`, `year`, `role` and `tools` only with verified information.
 *  - Set each frame's `aspect` to the real asset's ratio when media arrives.
 *  See README → "Adding or replacing work".
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SUMMARY_TBC = 'Project description to be written.'

const frame = (label: string, aspect: MediaAsset['aspect'] = '16:9'): MediaAsset => ({
  kind: 'video',
  aspect,
  alt: `${label} placeholder`,
  label,
})

export const projects: Project[] = [
  /* ── Broadcast Design ───────────────────────────────────────────────────── */
  {
    slug: 'laliga-broadcast-package',
    title: 'LaLiga Broadcast Package',
    category: 'broadcast',
    // Confirmed concept work — not commissioned by LaLiga.
    status: 'concept',
    featured: true,
    tags: ['Broadcast package', 'Graphics system'],
    summary:
      'A complete on-air graphics system — competition opener, scoreboard, player cards, lineups and lower thirds — designed as one family.',
    cover: frame('Competition opener'),
    frames: [frame('Scoreboard'), frame('Player card'), frame('Lineup'), frame('Lower third')],
    deliverables: ['Competition opener', 'Scoreboard', 'Player cards', 'Lineups', 'Lower thirds'],
  },
  {
    slug: 'premier-league-broadcast-package',
    title: 'Premier League Broadcast Package',
    category: 'broadcast',
    // Confirmed concept work — not commissioned by the Premier League.
    status: 'concept',
    tags: ['Broadcast package', 'Graphics system'],
    summary: SUMMARY_TBC,
    cover: frame('Broadcast package'),
  },
  {
    slug: 'brazil-opening-sequence',
    title: 'Brazil — Opening Sequence',
    category: 'broadcast',
    status: 'client',
    // client: 'TBC — add once publication rights are confirmed',
    tags: ['Opening sequence'],
    summary: SUMMARY_TBC,
    cover: frame('Opening sequence'),
  },

  /* ── Sports Social Content ──────────────────────────────────────────────── */
  {
    slug: 'social-story-project-01',
    title: 'Story Project 01',
    category: 'social',
    status: 'placeholder',
    tags: ['Instagram Stories'],
    summary: SUMMARY_TBC,
    cover: frame('Social story'),
  },
  {
    slug: 'social-story-project-02',
    title: 'Story Project 02',
    category: 'social',
    status: 'placeholder',
    tags: ['Instagram Stories'],
    summary: SUMMARY_TBC,
    cover: frame('Social story'),
  },
  {
    slug: 'social-story-project-03',
    title: 'Story Project 03',
    category: 'social',
    status: 'placeholder',
    tags: ['Instagram Stories'],
    summary: SUMMARY_TBC,
    cover: frame('Social story'),
  },

  /* ── Filmmaking & Editing ───────────────────────────────────────────────── */
  {
    slug: 'film-project-01',
    title: 'Film Project 01',
    category: 'film',
    status: 'placeholder',
    tags: ['Filmmaking', 'Editing'],
    summary: SUMMARY_TBC,
    cover: frame('Film project'),
  },
]

export const projectsIn = (category: CategoryId) => projects.filter((p) => p.category === category)

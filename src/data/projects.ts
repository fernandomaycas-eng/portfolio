import type { MediaAsset, Project } from './types'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROJECT DATA
 *  Every entry below is a PLACEHOLDER. None of them describe real work yet.
 *  Replace titles, copy and media with real projects once details and
 *  publication rights are confirmed (see README → "Replacing placeholders").
 *  Never add a client name you do not have permission to publish.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SUMMARY_TBC = 'Placeholder — project description to be written.'

/* ── Showreel ─────────────────────────────────────────────────────────────── */

export const showreel: MediaAsset = {
  kind: 'video',
  // src: 'media/showreel/showreel-2026.mp4',
  // poster: 'media/showreel/showreel-2026.jpg',
  aspect: '16:9',
  alt: 'Showreel placeholder',
  label: 'Showreel',
}

/* ── Featured broadcast package ───────────────────────────────────────────── */

export const featuredBroadcast: Project = {
  slug: 'featured-broadcast-package',
  title: 'Broadcast Package',
  category: 'broadcast',
  status: 'placeholder',
  tags: ['Broadcast package', 'Graphics system'],
  summary:
    'Placeholder for the lead broadcast case study: a complete on-air system — opener, scorebug, player cards, lineups, lower thirds and replay wipes — designed as one family.',
  cover: { kind: 'video', aspect: '16:9', alt: 'Featured broadcast package placeholder', label: 'Competition opener' },
  frames: [
    { kind: 'video', aspect: '16:9', alt: 'Scoreboard placeholder', label: 'Scoreboard' },
    { kind: 'video', aspect: '16:9', alt: 'Player card placeholder', label: 'Player card' },
    { kind: 'video', aspect: '16:9', alt: 'Lineup placeholder', label: 'Lineup' },
    { kind: 'video', aspect: '16:9', alt: 'Lower third placeholder', label: 'Lower third' },
    { kind: 'video', aspect: '16:9', alt: 'Replay transition placeholder', label: 'Replay transition' },
    { kind: 'video', aspect: '9:16', alt: 'Vertical cut-down placeholder', label: 'Vertical cut-down' },
  ],
  deliverables: [
    'Competition opener',
    'Scoreboard',
    'Player cards',
    'Lineups',
    'Lower thirds',
    'Replay transitions',
  ],
}

/* ── Selected work ────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    slug: 'placeholder-broadcast-01',
    title: 'Broadcast Package 01',
    category: 'broadcast',
    status: 'placeholder',
    tags: ['Openers', 'Scoreboards', 'Lower thirds'],
    summary: SUMMARY_TBC,
    cover: { kind: 'video', aspect: '16:9', alt: 'Broadcast project placeholder', label: 'Broadcast package' },
    selected: true,
  },
  {
    slug: 'placeholder-social-01',
    title: 'Matchday Campaign 01',
    category: 'social',
    status: 'placeholder',
    tags: ['Matchday graphics', 'Stories'],
    summary: SUMMARY_TBC,
    cover: { kind: 'video', aspect: '16:9', alt: 'Social campaign placeholder', label: 'Matchday campaign' },
    selected: true,
  },
  {
    slug: 'placeholder-film-01',
    title: 'Sports Aftermovie 01',
    category: 'film',
    status: 'placeholder',
    tags: ['Aftermovie', 'Event coverage'],
    summary: SUMMARY_TBC,
    cover: { kind: 'video', aspect: '16:9', alt: 'Film project placeholder', label: 'Aftermovie' },
    selected: true,
  },
  {
    slug: 'placeholder-cgi-01',
    title: '3D Motion Study 01',
    category: 'cgi',
    status: 'placeholder',
    tags: ['3D motion', 'Houdini FX'],
    summary: SUMMARY_TBC,
    cover: { kind: 'video', aspect: '16:9', alt: '3D project placeholder', label: '3D / CGI' },
    selected: true,
  },
  {
    slug: 'placeholder-broadcast-02',
    title: 'Player Card System 01',
    category: 'broadcast',
    status: 'placeholder',
    tags: ['Player cards', 'Lineups'],
    summary: SUMMARY_TBC,
    cover: { kind: 'video', aspect: '16:9', alt: 'Player card system placeholder', label: 'Player cards' },
    selected: true,
  },
  {
    slug: 'placeholder-film-02',
    title: 'Branded Content 01',
    category: 'film',
    status: 'placeholder',
    tags: ['Promo', 'Branded content'],
    summary: SUMMARY_TBC,
    cover: { kind: 'video', aspect: '16:9', alt: 'Branded content placeholder', label: 'Branded content' },
    selected: true,
  },
]

/* ── Vertical 9:16 showcase ───────────────────────────────────────────────── */

export interface VerticalCampaign {
  slug: string
  title: string
  status: Project['status']
  tags: string[]
  frames: MediaAsset[]
}

const vertical = (label: string): MediaAsset => ({
  kind: 'video',
  aspect: '9:16',
  alt: `${label} placeholder`,
  label,
})

export const verticalCampaigns: VerticalCampaign[] = [
  {
    slug: 'placeholder-matchday-stories',
    title: 'Matchday Story Set',
    status: 'placeholder',
    tags: ['Instagram Stories', 'Matchday graphics'],
    frames: [
      vertical('Matchday'),
      vertical('Lineup'),
      vertical('Score update'),
      vertical('Full time'),
      vertical('Player announcement'),
    ],
  },
  {
    slug: 'placeholder-vertical-reels',
    title: 'Vertical Reels',
    status: 'placeholder',
    tags: ['Vertical reels', 'Animated social graphics'],
    frames: [vertical('Reel 01'), vertical('Reel 02'), vertical('Reel 03'), vertical('Campaign')],
  },
]

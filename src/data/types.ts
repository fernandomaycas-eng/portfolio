/**
 * Content model for the portfolio.
 *
 * Everything the site shows comes from `src/data/*.ts`. To add a project,
 * add an entry to `projects.ts` — no component changes needed.
 */

/** Native delivery formats. Frames always render at their true ratio, never cropped to fit. */
export type AspectRatio = '16:9' | '9:16' | '4:5' | '1:1'

export type CategoryId = 'broadcast' | 'social' | 'film' | 'cgi'

/**
 * How a piece of work may be presented.
 * - `placeholder`: no real asset yet; the UI labels it clearly.
 * - `concept`: self-initiated / speculative work, labelled "Concept".
 * - `published`: real commissioned or released work with rights confirmed.
 */
export type ProjectStatus = 'placeholder' | 'concept' | 'published'

export interface MediaAsset {
  /** `video` plays muted & inline; `image` renders responsively. */
  kind: 'video' | 'image'
  /**
   * Path relative to `public/` (e.g. `media/showreel/reel.mp4`) or an absolute
   * https URL. Leave undefined to render a labelled placeholder frame.
   */
  src?: string
  /** Poster frame for videos (path relative to `public/` or https URL). */
  poster?: string
  aspect: AspectRatio
  /** Accessible description of what the frame shows. */
  alt: string
  /** Short slot name shown on the placeholder, e.g. "Competition opener". */
  label?: string
}

export interface BreakdownStep {
  title: string
  body: string
}

export interface Project {
  /** URL-safe unique id. */
  slug: string
  title: string
  category: CategoryId
  /** Discipline tags, e.g. "Lower thirds", "Player cards". */
  tags: string[]
  status: ProjectStatus
  /** Only fill in when publication rights are confirmed. */
  client?: string
  year?: string
  role?: string[]
  summary: string
  /** Main frame used in grids and as the case-study hero. */
  cover: MediaAsset
  /** Supporting frames: stills, vertical cut-downs, system components. */
  frames?: MediaAsset[]
  deliverables?: string[]
  tools?: string[]
  breakdown?: BreakdownStep[]
  /** Show in the "Selected work" grid. */
  selected?: boolean
}

export interface Category {
  id: CategoryId
  name: string
  shortName: string
  description: string
  disciplines: string[]
}

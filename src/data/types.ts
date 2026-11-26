/**
 * Content model for the portfolio.
 *
 * Everything the site shows comes from `src/data/*.ts`. To add a project,
 * add an entry to `projects.ts` — no component changes needed.
 */

/** Native delivery formats. Frames always render at their true ratio, never cropped to fit. */
export type AspectRatio = '16:9' | '9:16' | '4:5' | '1:1'

export type CategoryId = 'broadcast' | 'social' | 'film'

/**
 * What kind of work a project is. Shown as a label so nothing is overstated.
 * - `client`: commissioned work for a real client (publication rights confirmed).
 * - `concept`: self-initiated / speculative work, not commissioned.
 * - `placeholder`: project details not provided yet.
 *
 * Independently, any frame without a `src` renders as a labelled placeholder.
 */
export type ProjectStatus = 'client' | 'concept' | 'placeholder'

export interface MediaAsset {
  /** `video` plays muted & inline; `image` renders responsively. */
  kind: 'video' | 'image'
  /**
   * Path relative to `public/` (e.g. `media/brazil/opener.mp4`) or an absolute
   * https URL. Leave undefined to render a labelled placeholder frame.
   */
  src?: string
  /** Poster frame for videos (path relative to `public/` or https URL). */
  poster?: string
  /** Set to the asset's real delivery ratio; the layout adapts to it. */
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
  /** Supporting frames: stills or system components. */
  frames?: MediaAsset[]
  deliverables?: string[]
  tools?: string[]
  breakdown?: BreakdownStep[]
  /** Lead project of its category, shown with the full package layout (one per category). */
  featured?: boolean
}

export interface Category {
  id: CategoryId
  name: string
  shortName: string
  description: string
  disciplines: string[]
}

import type { AspectRatio } from '../data/types'

/** Resolve a `public/` path against the Vite base (`/portfolio/`). Absolute URLs pass through. */
export function asset(path?: string): string | undefined {
  if (!path) return undefined
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

/** CSS `aspect-ratio` value for a delivery format. */
export const ratioValue: Record<AspectRatio, string> = {
  '16:9': '16 / 9',
  '9:16': '9 / 16',
  '4:5': '4 / 5',
  '1:1': '1 / 1',
}

/** Nominal delivery resolution, shown on placeholder frames. */
export const ratioResolution: Record<AspectRatio, string> = {
  '16:9': '1920 × 1080',
  '9:16': '1080 × 1920',
  '4:5': '1080 × 1350',
  '1:1': '1080 × 1080',
}

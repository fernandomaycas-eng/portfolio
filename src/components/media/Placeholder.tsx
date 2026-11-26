import type { AspectRatio } from '../../data/types'
import { ratioResolution } from '../../lib/media'
import s from './Placeholder.module.css'

interface PlaceholderProps {
  aspect: AspectRatio
  label?: string
  /** Optional large index, e.g. "01". */
  index?: string
}

/**
 * Clearly-labelled stand-in for media that hasn't been supplied yet.
 * Draws broadcast action/title-safe guides so composition can be judged
 * at the frame's true delivery ratio.
 */
export function Placeholder({ aspect, label = 'Media', index }: PlaceholderProps) {
  return (
    <div className={s.root} data-aspect={aspect} role="img" aria-label={`Placeholder frame: ${label}, ${aspect}`}>
      <span className={s.actionSafe} aria-hidden="true" />
      <span className={s.titleSafe} aria-hidden="true" />
      <span className={s.cross} aria-hidden="true" />

      <span className={s.chip} aria-hidden="true">
        Placeholder
      </span>
      {index && (
        <span className={s.index} aria-hidden="true">
          {index}
        </span>
      )}

      <span className={s.foot} aria-hidden="true">
        <span className={s.label}>{label}</span>
        <span className={s.meta}>
          {aspect} · {ratioResolution[aspect]}
        </span>
      </span>
    </div>
  )
}

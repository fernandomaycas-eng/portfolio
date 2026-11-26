import type { ReactNode } from 'react'
import s from './WipeReveal.module.css'

interface WipeRevealProps {
  children: ReactNode
  /** Extra delay (seconds) to stagger neighbouring wipes. */
  delay?: number
  className?: string
}

/** Wraps media in the volt "replay wipe" reveal. Animated by `useReveal`. */
export function WipeReveal({ children, delay = 0, className }: WipeRevealProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} data-wipe data-wipe-delay={delay}>
      <div data-wipe-content>{children}</div>
      <span className={s.bar} data-wipe-bar aria-hidden="true" />
    </div>
  )
}

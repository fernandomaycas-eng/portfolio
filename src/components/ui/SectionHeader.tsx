import type { ReactNode } from 'react'
import s from './SectionHeader.module.css'

interface SectionHeaderProps {
  /** Two-digit section number, e.g. "02". */
  index: string
  kicker: string
  /** Each string renders on its own masked line. */
  title: string[]
  id?: string
  aside?: ReactNode
}

/** Editorial section opener: running index, kicker and oversized condensed title. */
export function SectionHeader({ index, kicker, title, id, aside }: SectionHeaderProps) {
  return (
    <header className={s.root}>
      <p className={`eyebrow ${s.kicker}`} data-reveal>
        <span className={s.index}>{index}</span>
        <span className={s.rule} aria-hidden="true" />
        {kicker}
      </p>
      <h2 className={`display ${s.title}`} id={id}>
        {title.map((line) => (
          <span className="line-mask" key={line}>
            <span data-reveal="line">{line}</span>
          </span>
        ))}
      </h2>
      {aside && (
        <div className={s.aside} data-reveal>
          {aside}
        </div>
      )}
    </header>
  )
}

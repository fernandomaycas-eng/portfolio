import { useRef } from 'react'
import type { Project } from '../../data/types'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { ProjectCard } from './ProjectCard'
import s from './ProjectGrid.module.css'

interface ProjectGridProps {
  projects: Project[]
  /** Number of the first card, so numbering can continue after a featured project. */
  startIndex?: number
  /**
   * Column layout from 900px up. `auto` picks one column for a single project,
   * a staggered pair for two, and an even row of three or more.
   */
  layout?: 'auto' | 'single' | 'staggered' | 'row'
}

export function ProjectGrid({ projects, startIndex = 0, layout = 'auto' }: ProjectGridProps) {
  const grid = useRef<HTMLDivElement>(null)
  const resolved =
    layout !== 'auto' ? layout : projects.length === 1 ? 'single' : projects.length === 2 ? 'staggered' : 'row'

  // Cards rise in, in batches, as they enter the viewport.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]')
        gsap.set(cards, { autoAlpha: 0, y: 48 })
        ScrollTrigger.batch(cards, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', overwrite: true }),
        })
      })
      return () => mm.revert()
    },
    { scope: grid },
  )

  return (
    <div ref={grid} className={s.grid} data-layout={resolved}>
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={startIndex + i} />
      ))}
    </div>
  )
}

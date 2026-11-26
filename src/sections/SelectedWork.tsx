import { useMemo, useRef, useState } from 'react'
import { ProjectCard } from '../components/project/ProjectCard'
import { SectionHeader } from '../components/ui/SectionHeader'
import { categories } from '../data/categories'
import { projects } from '../data/projects'
import type { CategoryId } from '../data/types'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import s from './SelectedWork.module.css'

type Filter = CategoryId | 'all'

export function SelectedWork() {
  const root = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  useReveal(root)

  const selected = useMemo(() => projects.filter((p) => p.selected), [])
  const visible = filter === 'all' ? selected : selected.filter((p) => p.category === filter)

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: selected.length },
    ...categories.map((c) => ({
      id: c.id,
      label: c.name,
      count: selected.filter((p) => p.category === c.id).length,
    })),
  ]

  // Cards rise in as they enter; re-run (and re-stagger) whenever the filter changes.
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
        ScrollTrigger.refresh()
      })
      return () => mm.revert()
    },
    { scope: grid, dependencies: [filter], revertOnUpdate: true },
  )

  return (
    <section ref={root} id="work" className={s.section} aria-labelledby="work-title">
      <div className="container">
        <SectionHeader id="work-title" index="03" kicker="Selected projects" title={['Selected', 'Work']} />

        <div className={s.filters} role="group" aria-label="Filter projects by category" data-reveal>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={s.filter}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <sup className="tabular">{String(f.count).padStart(2, '0')}</sup>
            </button>
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>

        <div ref={grid} className={s.grid}>
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
          {visible.length === 0 && <p className={s.empty}>No projects in this category yet.</p>}
        </div>
      </div>
    </section>
  )
}

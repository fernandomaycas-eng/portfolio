import { useRef } from 'react'
import { ProjectGrid } from '../components/project/ProjectGrid'
import { SectionHeader } from '../components/ui/SectionHeader'
import { categoryById } from '../data/categories'
import { projectsIn } from '../data/projects'
import type { CategoryId } from '../data/types'
import { useReveal } from '../lib/useReveal'

interface WorkSectionProps {
  category: CategoryId
  /** Two-digit section number. */
  index: string
  /** Oversized title lines; defaults to the category name. */
  title?: string[]
  /** Anchor id used by the navigation. */
  id: string
}

/** A category of work: editorial header followed by its projects. */
export function WorkSection({ category, index, title, id }: WorkSectionProps) {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  const c = categoryById[category]
  const list = projectsIn(category)

  return (
    <section
      ref={root}
      id={id}
      aria-labelledby={`${id}-title`}
      style={{ paddingTop: 'var(--section-y)' }}
    >
      <div className="container">
        <SectionHeader
          id={`${id}-title`}
          index={index}
          kicker={c.name}
          title={title ?? [c.name]}
          aside={<p>{c.description}</p>}
        />
        <ProjectGrid projects={list} />
      </div>
    </section>
  )
}

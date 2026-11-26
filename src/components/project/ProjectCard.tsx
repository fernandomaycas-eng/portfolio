import { useState } from 'react'
import type { Project } from '../../data/types'
import { MediaFrame } from '../media/MediaFrame'
import { StatusTag } from '../ui/StatusTag'
import s from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  index: number
  /** When case-study pages exist, pass their URL to make the card a link. */
  href?: string
}

export function ProjectCard({ project, index, href }: ProjectCardProps) {
  const [active, setActive] = useState(false)
  const number = String(index + 1).padStart(2, '0')

  const body = (
    <>
      <div className={s.media}>
        <MediaFrame media={project.cover} play="hover" active={active} index={number} sizes="(min-width: 900px) 50vw, 100vw" />
      </div>
      <div className={s.meta}>
        <span className={`${s.number} tabular`} aria-hidden="true">
          {number}
        </span>
        <div className={s.text}>
          <h3 className={`display ${s.title}`}>{project.title}</h3>
          {project.tags.length > 0 && <p className={s.sub}>{project.tags.join(' · ')}</p>}
        </div>
        <StatusTag status={project.status} />
      </div>
    </>
  )

  const handlers = {
    onPointerEnter: () => setActive(true),
    onPointerLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
  }

  return (
    <article className={s.card} data-card {...handlers}>
      {href ? (
        <a href={href} className={s.link}>
          {body}
        </a>
      ) : (
        body
      )}
    </article>
  )
}

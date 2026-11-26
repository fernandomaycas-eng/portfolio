import type { ProjectStatus } from '../../data/types'
import s from './StatusTag.module.css'

const LABEL: Record<ProjectStatus, string> = {
  client: 'Client project',
  concept: 'Concept',
  placeholder: 'Placeholder',
}

/** States what kind of work a project is, so concepts and placeholders are never mistaken for commissions. */
export function StatusTag({ status }: { status: ProjectStatus }) {
  return (
    <span className={s.tag} data-status={status}>
      {LABEL[status]}
    </span>
  )
}

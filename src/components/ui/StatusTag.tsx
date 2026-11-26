import type { ProjectStatus } from '../../data/types'
import s from './StatusTag.module.css'

const LABEL: Record<ProjectStatus, string | null> = {
  placeholder: 'Placeholder',
  concept: 'Concept',
  published: null,
}

/** Labels placeholder and conceptual work so it is never mistaken for commissioned work. */
export function StatusTag({ status }: { status: ProjectStatus }) {
  const label = LABEL[status]
  if (!label) return null
  return (
    <span className={s.tag} data-status={status}>
      {label}
    </span>
  )
}

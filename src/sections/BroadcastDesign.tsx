import { useRef } from 'react'
import { MediaFrame } from '../components/media/MediaFrame'
import { ProjectGrid } from '../components/project/ProjectGrid'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatusTag } from '../components/ui/StatusTag'
import { WipeReveal } from '../components/ui/WipeReveal'
import { categoryById } from '../data/categories'
import { projectsIn } from '../data/projects'
import { useReveal } from '../lib/useReveal'
import s from './BroadcastDesign.module.css'

const TBC = 'To be confirmed'
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Broadcast Design: the featured package (opener, deliverables, system components)
 * followed by the remaining broadcast projects.
 */
export function BroadcastDesign() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  const all = projectsIn('broadcast')
  const featured = all.find((p) => p.featured) ?? all[0]
  const rest = all.filter((p) => p !== featured)
  const category = categoryById.broadcast

  const specs = featured && [
    { k: 'Client', v: featured.client ?? TBC },
    { k: 'Year', v: featured.year ?? TBC },
    { k: 'Role', v: featured.role?.join(', ') ?? TBC },
    { k: 'Tools', v: featured.tools?.join(', ') ?? TBC },
  ]

  return (
    <section ref={root} id="broadcast" className={s.section} aria-labelledby="broadcast-title">
      <div className="container">
        <SectionHeader
          id="broadcast-title"
          index="01"
          kicker={category.name}
          title={['Broadcast', 'Package']}
          aside={<p>{category.description}</p>}
        />

        {featured && (
          <article aria-labelledby="featured-title">
            <div className={s.projectBar} data-reveal>
              <span className={`tabular ${s.num}`}>01</span>
              <h3 id="featured-title" className={`display ${s.projectTitle}`}>
                {featured.title}
              </h3>
              <StatusTag status={featured.status} />
            </div>

            <WipeReveal>
              <MediaFrame media={featured.cover} sizes="100vw" />
            </WipeReveal>

            <div className={s.sheet}>
              <p className={s.summary} data-reveal>
                {featured.summary}
              </p>

              {featured.deliverables && (
                <div data-reveal>
                  <h4 className="eyebrow">Deliverables</h4>
                  <ol className={s.deliverables}>
                    {featured.deliverables.map((d, i) => (
                      <li key={d}>
                        <span className={`tabular ${s.dNum}`}>{pad(i + 1)}</span>
                        {d}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <dl className={s.specs} data-reveal>
                {specs?.map(({ k, v }) => (
                  <div key={k} className={s.spec}>
                    <dt className="eyebrow">{k}</dt>
                    <dd data-tbc={v === TBC}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {featured.frames && featured.frames.length > 0 && (
              <ul className={s.components} aria-label={`${featured.title} system components`}>
                {featured.frames.map((f, i) => (
                  <li key={f.label ?? i}>
                    <WipeReveal delay={i * 0.08}>
                      <MediaFrame media={f} sizes="(min-width: 900px) 25vw, 50vw" />
                    </WipeReveal>
                    <p className={s.caption}>
                      <span className={`tabular ${s.capNum}`}>{String.fromCharCode(65 + i)}</span>
                      {f.label}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        )}

        {rest.length > 0 && (
          <div className={s.more}>
            <ProjectGrid projects={rest} startIndex={1} />
          </div>
        )}
      </div>
    </section>
  )
}

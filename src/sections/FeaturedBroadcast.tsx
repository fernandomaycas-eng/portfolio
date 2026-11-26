import { useRef } from 'react'
import { MediaFrame } from '../components/media/MediaFrame'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatusTag } from '../components/ui/StatusTag'
import { WipeReveal } from '../components/ui/WipeReveal'
import { featuredBroadcast as project } from '../data/projects'
import { useReveal } from '../lib/useReveal'
import s from './FeaturedBroadcast.module.css'

const TBC = 'To be confirmed'

export function FeaturedBroadcast() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  const frames = project.frames ?? []
  const vertical = frames.find((f) => f.aspect === '9:16')
  const components = frames.filter((f) => f !== vertical)

  const specs = [
    { k: 'Client', v: project.client ?? TBC },
    { k: 'Year', v: project.year ?? TBC },
    { k: 'Role', v: project.role?.join(', ') ?? TBC },
    { k: 'Tools', v: project.tools?.join(', ') ?? TBC },
  ]

  return (
    <section ref={root} id="featured" className={s.section} aria-labelledby="featured-title">
      <div className="container">
        <SectionHeader
          id="featured-title"
          index="02"
          kicker="Featured broadcast package"
          title={['Broadcast', 'Package']}
          aside={<StatusTag status={project.status} />}
        />

        {/* Hero frame + vertical cut-down, both at native ratio and equal height. */}
        <div className={s.lead}>
          <WipeReveal>
            <MediaFrame media={project.cover} sizes="(min-width: 900px) 75vw, 100vw" />
          </WipeReveal>
          {vertical && (
            <WipeReveal delay={0.15}>
              <MediaFrame media={vertical} sizes="25vw" />
            </WipeReveal>
          )}
        </div>

        <div className={s.sheet}>
          <p className={s.summary} data-reveal>
            {project.summary}
          </p>

          <div data-reveal>
            <h3 className="eyebrow">Deliverables</h3>
            <ol className={s.deliverables}>
              {project.deliverables?.map((d, i) => (
                <li key={d}>
                  <span className={`tabular ${s.dNum}`}>{String(i + 1).padStart(2, '0')}</span>
                  {d}
                </li>
              ))}
            </ol>
          </div>

          <dl className={s.specs} data-reveal>
            {specs.map(({ k, v }) => (
              <div key={k} className={s.spec}>
                <dt className="eyebrow">{k}</dt>
                <dd data-tbc={v === TBC}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className={s.components} aria-label="System components">
          {components.map((f, i) => (
            <li key={f.label ?? i}>
              <WipeReveal delay={i * 0.08}>
                <MediaFrame media={f} sizes="(min-width: 1100px) 20vw, 50vw" />
              </WipeReveal>
              <p className={s.caption}>
                <span className={`tabular ${s.capNum}`}>{String.fromCharCode(65 + i)}</span>
                {f.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

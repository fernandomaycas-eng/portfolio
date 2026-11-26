import { useRef } from 'react'
import { MediaFrame } from '../components/media/MediaFrame'
import { SectionHeader } from '../components/ui/SectionHeader'
import { categories } from '../data/categories'
import { site } from '../data/site'
import { useReveal } from '../lib/useReveal'
import s from './About.module.css'

export function About() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} id="about" className={s.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHeader id="about-title" index="04" kicker="About" title={['About']} />

        <div className={s.layout}>
          <div className={s.portrait} data-reveal>
            <MediaFrame
              media={{ kind: 'image', aspect: '4:5', alt: 'Portrait placeholder', label: 'Portrait' }}
              sizes="(min-width: 900px) 30vw, 100vw"
            />
          </div>

          <div className={s.copy}>
            {site.about.map((p, i) => (
              <p key={i} className={i === 0 ? s.lead : s.body} data-reveal>
                {p}
              </p>
            ))}

            <ul className={s.disciplines}>
              {categories.map((c, i) => (
                <li key={c.id} data-reveal>
                  <p className="eyebrow">
                    <span className={s.num}>{String(i + 1).padStart(2, '0')}</span> {c.name}
                  </p>
                  <ul className={s.list}>
                    {c.disciplines.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

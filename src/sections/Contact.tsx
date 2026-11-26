import { useRef } from 'react'
import { site } from '../data/site'
import { useReveal } from '../lib/useReveal'
import s from './Contact.module.css'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} id="contact" className={s.section} aria-labelledby="contact-title">
      <div className="container">
        <p className={`eyebrow ${s.kicker}`} data-reveal>
          <span className={s.num}>05</span> — Contact
        </p>

        <h2 id="contact-title" className={`display ${s.title}`}>
          <span className="line-mask">
            <span data-reveal="line">Kick</span>
          </span>
          <span className="line-mask">
            <span data-reveal="line">
              off<span className={s.dot}>.</span>
            </span>
          </span>
        </h2>

        <div className={s.grid}>
          <p className={s.pitch} data-reveal>
            Broadcast packages, matchday content, social campaigns and film. Get in touch to talk about a project.
          </p>

          <div data-reveal>
            <p className="eyebrow">Email</p>
            {site.email ? (
              <a className={s.email} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            ) : (
              <p className={`${s.email} ${s.tbc}`}>Contact email — placeholder</p>
            )}
          </div>

          <div data-reveal>
            <p className="eyebrow">Elsewhere</p>
            <ul className={s.links}>
              {site.links.map((l) =>
                l.href ? (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer" className={s.link}>
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ) : (
                  <li key={l.label} className={s.tbcLink}>
                    {l.label} <span className={s.tbcNote}>— link TBC</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

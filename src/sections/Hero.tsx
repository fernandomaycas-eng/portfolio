import { useRef } from 'react'
import { categories } from '../data/categories'
import { site } from '../data/site'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'
import s from './Hero.module.css'

const ticker = categories.flatMap((c) => c.disciplines)

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.from('[data-hero-line]', { yPercent: 108, duration: 1.4, stagger: 0.11 }, 0.15)
          .from('[data-hero-dot]', { scale: 0, transformOrigin: '50% 80%', duration: 0.7, stagger: 0.11, ease: 'back.out(3)' }, 0.75)
          .from('[data-hero-fade]', { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.7)
          .from('[data-hero-ticker]', { yPercent: 100, duration: 1, ease: 'power4.out' }, 0.9)

        // Subtle counter-drift of the lines as the hero scrolls away.
        const drift = [-3, 2.5, -1.5]
        gsap.utils.toArray<HTMLElement>('[data-hero-row]').forEach((row, i) => {
          gsap.to(row, {
            xPercent: drift[i] ?? 0,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.top}`}>
        <p className="eyebrow" data-hero-fade>
          {site.role}
        </p>
        <ul className={s.index} aria-label="Disciplines">
          {categories.map((c, i) => (
            <li key={c.id} className="eyebrow" data-hero-fade>
              <span className={s.indexNum}>{String(i + 1).padStart(2, '0')}</span> {c.name}
            </li>
          ))}
        </ul>
      </div>

      <h1 id="hero-title" className={`display ${s.title}`}>
        <span className="visually-hidden">
          {site.name} — {site.heroLines.join(' ')}
        </span>
        {site.heroLines.map((line, i) => (
          <span className={s.row} data-row={i} data-hero-row key={line} aria-hidden="true">
            <span className="line-mask">
              <span data-hero-line>
                {line.replace(/\.$/, '')}
                {line.endsWith('.') && (
                  <span className={s.dot} data-hero-dot>
                    .
                  </span>
                )}
              </span>
            </span>
          </span>
        ))}
      </h1>

      <div className={`container ${s.bottom}`}>
        <p className={s.intro} data-hero-fade>
          <strong>{site.name}</strong> — {site.intro}
        </p>
        <a href="#broadcast" className={`eyebrow ${s.cue}`} data-hero-fade>
          <span className={s.cueLine} aria-hidden="true" />
          See the work
        </a>
      </div>

      <div className={s.tickerWrap} aria-hidden="true">
        <div className={s.ticker} data-hero-ticker>
          <div className={s.track}>
            {[0, 1].map((copy) => (
              <span className={s.group} key={copy}>
                {ticker.map((item) => (
                  <span className={s.item} key={`${copy}-${item}`}>
                    {item}
                    <span className={s.sep} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { MediaFrame } from '../components/media/MediaFrame'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatusTag } from '../components/ui/StatusTag'
import { verticalCampaigns, type VerticalCampaign } from '../data/projects'
import { prefersReducedMotion } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import s from './VerticalShowcase.module.css'

export function VerticalShowcase() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} id="vertical" className={s.section} aria-labelledby="vertical-title">
      <div className="container">
        <SectionHeader
          id="vertical-title"
          index="04"
          kicker="Sports social content"
          title={['Built for', 'Vertical']}
          aside={<p>Stories, reels and matchday content presented at their native 9:16 — never cropped or stretched.</p>}
        />
      </div>

      <div className={s.campaigns}>
        {verticalCampaigns.map((c, i) => (
          <CampaignRail key={c.slug} campaign={c} number={i + 1} />
        ))}
      </div>
    </section>
  )
}

function CampaignRail({ campaign, number }: { campaign: VerticalCampaign; number: number }) {
  const rail = useRef<HTMLUListElement>(null)
  const titleId = `${campaign.slug}-title`

  const step = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const item = el.querySelector('li')
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const amount = item ? item.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <article className={s.campaign} aria-labelledby={titleId}>
      <div className={`container ${s.bar}`} data-reveal>
        <div className={s.barTitle}>
          <span className={`tabular ${s.num}`}>{String(number).padStart(2, '0')}</span>
          <h3 id={titleId} className={`display ${s.title}`}>
            {campaign.title}
          </h3>
          <StatusTag status={campaign.status} />
        </div>
        <p className={s.tags}>
          {campaign.tags.join(' · ')} <span className={s.count}>— {campaign.frames.length} frames</span>
        </p>
        <div className={s.controls}>
          <button type="button" className={s.arrow} onClick={() => step(-1)} aria-label={`Previous frame, ${campaign.title}`}>
            ←
          </button>
          <button type="button" className={s.arrow} onClick={() => step(1)} aria-label={`Next frame, ${campaign.title}`}>
            →
          </button>
        </div>
      </div>

      <ul ref={rail} className={s.rail} tabIndex={0} aria-label={`${campaign.title} frames, scrollable`}>
        {campaign.frames.map((f, i) => (
          <li key={`${f.label}-${i}`} className={s.item} data-reveal>
            <MediaFrame media={f} index={String(i + 1).padStart(2, '0')} sizes="(min-width: 900px) 20vw, 60vw" />
          </li>
        ))}
      </ul>
    </article>
  )
}

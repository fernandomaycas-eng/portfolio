import { useEffect, useRef, useState } from 'react'
import { Placeholder } from '../components/media/Placeholder'
import { showreel } from '../data/projects'
import { gsap, MOTION_OK, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { asset, ratioValue } from '../lib/media'
import s from './Showreel.module.css'

const FPS = 25
const pad = (n: number) => String(n).padStart(2, '0')

export function Showreel() {
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const tc = useRef<HTMLSpanElement>(null)
  const [playing, setPlaying] = useState(false)
  const src = asset(showreel.src)

  // Frame opens from an inset window to full width as it scrolls into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          frame.current,
          { clipPath: 'inset(9% 7% 9% 7%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: { trigger: frame.current, start: 'top 95%', end: 'top 25%', scrub: 0.5 },
          },
        )
        gsap.fromTo(
          '[data-reel-inner]',
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: frame.current, start: 'top 95%', end: 'top 25%', scrub: 0.5 },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  // Running broadcast timecode while the frame is on screen (or the real video time once playing).
  useEffect(() => {
    const el = frame.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      const v = video.current
      const seconds = v && !v.paused ? v.currentTime : (t - start) / 1000
      const f = Math.floor(seconds * FPS)
      if (tc.current) {
        tc.current.textContent = `${pad(Math.floor(f / (FPS * 3600)))}:${pad(Math.floor(f / (FPS * 60)) % 60)}:${pad(
          Math.floor(f / FPS) % 60,
        )}:${pad(f % FPS)}`
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) raf = requestAnimationFrame(tick)
      // Muted preview follows visibility unless the viewer started full playback.
      const v = video.current
      if (v && !playing) {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      }
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [playing])

  const playWithSound = () => {
    const v = video.current
    if (!v) return
    v.currentTime = 0
    v.muted = false
    v.loop = false
    v.controls = true
    v.play().catch(() => {})
    setPlaying(true)
  }

  return (
    <section ref={root} id="showreel" className={s.section} aria-labelledby="showreel-title">
      <div className="container">
        <div className={s.head}>
          <p className="eyebrow">
            <span className={s.num}>01</span> — Showreel
          </p>
          <h2 id="showreel-title" className={`eyebrow ${s.headTitle}`}>
            Showreel {src ? '' : '· Placeholder'}
          </h2>
        </div>

        <div ref={frame} className={s.frame} style={{ aspectRatio: ratioValue[showreel.aspect] }}>
          <div className={s.inner} data-reel-inner>
            {src ? (
              <video
                ref={video}
                className={s.video}
                src={src}
                poster={asset(showreel.poster)}
                muted
                loop
                playsInline
                preload="none"
                aria-label={showreel.alt}
              />
            ) : (
              <Placeholder aspect={showreel.aspect} label="Showreel" />
            )}
          </div>

          {!playing && (
            <div className={s.hud} aria-hidden={!src}>
              <span className={`eyebrow ${s.rec}`}>
                <span className={s.recDot} /> Reel
              </span>
              <span ref={tc} className={`tabular ${s.tc}`}>
                00:00:00:00
              </span>
              <div className={s.cta}>
                {src ? (
                  <button type="button" className={s.play} onClick={playWithSound}>
                    <span className={s.playIcon} aria-hidden="true" />
                    <span>Play with sound</span>
                  </button>
                ) : (
                  <p className={s.soon}>Showreel coming soon</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

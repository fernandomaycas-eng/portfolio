import { useEffect, useRef, useState } from 'react'
import type { MediaAsset } from '../../data/types'
import { prefersReducedMotion } from '../../lib/gsap'
import { asset, ratioValue } from '../../lib/media'
import { Placeholder } from './Placeholder'
import s from './MediaFrame.module.css'

interface MediaFrameProps {
  media: MediaAsset
  /**
   * `inview`  – muted preview plays while the frame is on screen (default).
   * `hover`   – plays only while `active` is true (e.g. card hover/focus).
   * `none`    – never autoplays; shows the poster.
   */
  play?: 'inview' | 'hover' | 'none'
  active?: boolean
  index?: string
  className?: string
  /** Responsive `sizes` hint for images. */
  sizes?: string
}

/**
 * Renders any portfolio asset at its native aspect ratio.
 * Videos are muted, inline, `preload="none"` and only start when needed,
 * so nothing downloads until the frame is actually viewed.
 */
export function MediaFrame({
  media,
  play = 'inview',
  active = false,
  index,
  className,
  sizes = '100vw',
}: MediaFrameProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const src = asset(media.src)
  const poster = asset(media.poster)

  useEffect(() => {
    const el = ref.current
    if (!el || play !== 'inview') return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '120px 0px',
      threshold: 0.2,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [play, src])

  const shouldPlay = !prefersReducedMotion() && (play === 'inview' ? inView : play === 'hover' && active)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (shouldPlay) el.play().catch(() => {})
    else el.pause()
  }, [shouldPlay])

  return (
    <div className={[s.frame, className].filter(Boolean).join(' ')} style={{ aspectRatio: ratioValue[media.aspect] }}>
      {!src ? (
        <Placeholder aspect={media.aspect} label={media.label} index={index} />
      ) : media.kind === 'video' ? (
        <video
          ref={ref}
          className={s.media}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={media.alt}
        />
      ) : (
        <img className={s.media} src={src} alt={media.alt} loading="lazy" decoding="async" sizes={sizes} />
      )}
    </div>
  )
}

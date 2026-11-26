import type { RefObject } from 'react'
import { gsap, MOTION_OK, useGSAP } from './gsap'

/**
 * Scroll-triggered reveals for everything inside `scope`:
 *
 * - `[data-reveal]`        fades + rises in. Siblings sharing a parent stagger.
 * - `[data-reveal="line"]` slides up from inside a `.line-mask` parent.
 * - `[data-wipe]`          a volt bar wipes across, then uncovers the content
 *                          (a broadcast-style wipe). Requires
 *                          `[data-wipe-bar]` and `[data-wipe-content]` children,
 *                          see <WipeReveal>.
 *
 * Nothing is hidden when the user prefers reduced motion.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const root = scope.current
        if (!root) return

        gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((el) => {
          const isLine = el.dataset.reveal === 'line'
          const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter((c) => (c as HTMLElement).dataset.reveal !== undefined)
            : []
          const order = Math.max(0, siblings.indexOf(el))
          gsap.from(el, {
            yPercent: isLine ? 105 : 0,
            y: isLine ? 0 : 28,
            autoAlpha: isLine ? 1 : 0,
            duration: isLine ? 1.05 : 0.9,
            ease: isLine ? 'expo.out' : 'power3.out',
            delay: Math.min(order, 6) * 0.07,
            scrollTrigger: { trigger: isLine ? el.parentElement : el, start: 'top 88%', once: true },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-wipe]', root).forEach((el) => {
          const bar = el.querySelector('[data-wipe-bar]')
          const content = el.querySelector('[data-wipe-content]')
          if (!bar || !content) return
          gsap.set(content, { clipPath: 'inset(0 100% 0 0)' })
          gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
          const delay = Number(el.dataset.wipeDelay ?? 0)
          gsap
            .timeline({ delay, scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
            .to(bar, { scaleX: 1, duration: 0.5, ease: 'power4.in' })
            .set(content, { clipPath: 'inset(0 0% 0 0)' })
            .set(bar, { transformOrigin: 'right center' })
            .to(bar, { scaleX: 0, duration: 0.6, ease: 'power4.out' })
        })
      })
      return () => mm.revert()
    },
    { scope },
  )
}

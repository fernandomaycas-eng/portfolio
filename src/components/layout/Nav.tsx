import { useEffect, useRef, useState } from 'react'
import { nav, site } from '../../data/site'
import s from './Nav.module.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  // Solid background once scrolled; tuck away on scroll down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 24)
        setHidden(y > 320 && y > last + 4)
        if (y < last - 4) setHidden(false)
        last = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={s.bar} data-scrolled={scrolled || open} data-hidden={hidden && !open}>
        <div className={`container ${s.inner}`}>
          <a href="#top" className={s.brand} aria-label={`${site.name} — back to top`}>
            <span className={s.mark} aria-hidden="true" />
            <span className={s.name}>{site.name}</span>
          </a>

          <nav aria-label="Primary" className={s.desktop}>
            <ul className={s.list}>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={s.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggle}
            type="button"
            className={s.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={s.toggleLabel}>{open ? 'Close' : 'Menu'}</span>
            <span className={s.burger} data-open={open} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Sibling of the header: its backdrop-filter/transform would otherwise trap this fixed overlay. */}
      <div id="mobile-menu" className={s.overlay} data-open={open} hidden={!open}>
        <nav aria-label="Mobile">
          <ul className={s.overlayList}>
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={item.href}
                  className={`display ${s.overlayLink}`}
                  onClick={() => setOpen(false)}
                >
                  <span className={`eyebrow ${s.overlayIndex}`}>{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

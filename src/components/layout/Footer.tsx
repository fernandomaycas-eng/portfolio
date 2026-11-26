import { site } from '../../data/site'
import s from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={s.root}>
      <div className={`container ${s.inner}`}>
        <p>
          © {year} {site.name}
        </p>
        <p className={s.note}>Prototype — all media shown are labelled placeholders.</p>
        <a href="#top" className={s.top}>
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}

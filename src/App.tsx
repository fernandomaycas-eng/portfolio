import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { About } from './sections/About'
import { BroadcastDesign } from './sections/BroadcastDesign'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { WorkSection } from './sections/WorkSection'

export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <BroadcastDesign />
        <WorkSection id="social" index="02" category="social" title={['Social', 'Content']} />
        <WorkSection id="film" index="03" category="film" title={['Film', '& Editing']} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

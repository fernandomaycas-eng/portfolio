import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { FeaturedBroadcast } from './sections/FeaturedBroadcast'
import { Hero } from './sections/Hero'
import { SelectedWork } from './sections/SelectedWork'
import { Showreel } from './sections/Showreel'
import { VerticalShowcase } from './sections/VerticalShowcase'

export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Showreel />
        <FeaturedBroadcast />
        <SelectedWork />
        <VerticalShowcase />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

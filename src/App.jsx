import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import Projects from './components/Projects.jsx'
import { About, Certifications, Contact, Education, Footer, Skills } from './components/Sections.jsx'
import { profile } from './data/profile.js'
import { useFileAvailable, useRevealOnScroll } from './hooks.js'

export default function App() {
  useRevealOnScroll()
  const resumeAvailable = useFileAvailable(`${import.meta.env.BASE_URL}${profile.resumeFile}`)
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero resumeAvailable={resumeAvailable} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact resumeAvailable={resumeAvailable} />
      </main>
      <Footer />
    </>
  )
}

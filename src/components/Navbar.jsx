import { useEffect, useState } from 'react'
import { nav, profile } from '../data/profile.js'
import { useActiveSection } from '../hooks.js'
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from './Icons.jsx'

const IDS = nav.map((n) => n.id)

export default function Navbar() {
  const active = useActiveSection(IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-white/[0.06] bg-ink-900/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 font-display text-sm font-bold text-white shadow-lg shadow-violet-900/50 transition group-hover:rotate-6">MP</span>
          <span className="font-display text-[15px] font-semibold text-white">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${active === n.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                {n.label}
                <span className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 transition-transform duration-300 ${active === n.id ? 'scale-x-100' : 'scale-x-0'}`} />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="hidden rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white sm:inline-flex"><GitHubIcon /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hidden items-center gap-1.5 rounded-lg p-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white sm:inline-flex"><LinkedInIcon /><span className="hidden xl:inline">LinkedIn</span></a>
          <a href="#contact" className="btn-primary hidden !px-4 !py-2 sm:inline-flex">Let’s talk</a>
          <button className="rounded-lg p-2 text-slate-200 hover:bg-white/5 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div className={`lg:hidden ${open ? 'block' : 'hidden'}`}>
        <ul className="container-x flex h-[calc(100vh-4rem)] flex-col gap-1 pb-8 pt-4">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 text-lg font-medium ${active === n.id ? 'bg-white/[0.06] text-white' : 'text-slate-300'}`}>{n.label}</a>
            </li>
          ))}
          <li className="mt-2 border-t border-white/[0.06] pt-3">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium text-slate-300"><LinkedInIcon className="text-[#4f9be6]" /> LinkedIn</a>
          </li>
        </ul>
      </div>
    </header>
  )
}

import { useEffect, useRef, useState } from 'react'
import { categories, profile, projects } from '../data/profile.js'
import { ArrowIcon, CloseIcon, ExternalIcon, GitHubIcon } from './Icons.jsx'
import { SectionHeader } from './Sections.jsx'

function TiltCard({ children, onClick, label }) {
  const ref = useRef(null)
  const move = (e) => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      onMouseMove={move}
      onMouseLeave={leave}
      className="glass group relative flex h-full cursor-pointer flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-violet-400/40 hover:shadow-2xl hover:shadow-violet-950/60"
      style={{ backgroundImage: 'radial-gradient(500px circle at var(--mx,50%) var(--my,0%), rgba(139,92,246,0.10), transparent 40%)' }}
    >
      {children}
    </div>
  )
}

function Cover({ project }) {
  const [failed, setFailed] = useState(false)
  if (project.image && !failed) {
    return <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
  }
  const initials = project.initials || project.title.split(/[\s:]+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')
  return (
    <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-violet-700/40 via-indigo-800/30 to-blue-700/40">
      <div className="grid-bg absolute inset-0 opacity-70" />
      <span className="relative font-display text-5xl font-bold text-white/90 drop-shadow">{initials}</span>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="glass max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-b-none bg-ink-850/95 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-[16/8] overflow-hidden rounded-t-2xl"><Cover project={project} /></div>
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">{project.badge}</span>
              <h3 id="modal-title" className="mt-1 text-2xl font-bold">{project.title}</h3>
            </div>
            <button ref={closeRef} onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"><CloseIcon /></button>
          </div>
          <p className="mt-4 leading-relaxed text-slate-300">{project.summary}</p>
          <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Highlights</h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-slate-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-blue-400" />{h}</li>
            ))}
          </ul>
          <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Tech stack</h4>
          <ul className="mt-3 flex flex-wrap gap-2">{project.tech.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={project.repo} target="_blank" rel="noreferrer" className="btn-primary"><GitHubIcon width={18} height={18} /> View on GitHub</a>
            <a href={`${project.repo}#readme`} target="_blank" rel="noreferrer" className="btn-ghost">Read the docs <ExternalIcon width={16} height={16} /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const shown = projects.filter((p) => filter === 'All' || p.categories.includes(filter))

  return (
    <section id="projects" className="section relative">
      <div className="pointer-events-none absolute left-0 top-40 h-96 w-96 rounded-full bg-violet-700/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeader eyebrow="Projects" title={<>Things I’ve <span className="gradient-text">built</span></>}>
          Click a card for details. All source code is on GitHub.
        </SectionHeader>

        <div className="reveal mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === c ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-900/40' : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <article key={p.id} className="reveal visible">
              <TiltCard onClick={() => setOpen(p)} label={`Open details for ${p.title}`}>
                <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.06]">
                  <Cover project={p} />
                  <span className="absolute left-3 top-3 rounded-full bg-ink-900/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-200 ring-1 ring-white/10 backdrop-blur">{p.badge}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-snug transition group-hover:text-violet-200">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 5).map((t) => <li key={t} className="chip !text-[11px]">{t}</li>)}
                    {p.tech.length > 5 && <li className="chip !text-[11px]">+{p.tech.length - 5}</li>}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-sm">
                    <a href={p.repo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 font-medium text-slate-300 hover:text-white"><GitHubIcon width={16} height={16} /> Code</a>
                    <span className="inline-flex items-center gap-1 font-medium text-violet-300">Details <ArrowIcon width={16} height={16} className="transition group-hover:translate-x-1" /></span>
                  </div>
                </div>
              </TiltCard>
            </article>
          ))}
        </div>

        <p className="reveal mt-12 text-center">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost"><GitHubIcon width={18} height={18} /> See all repositories on GitHub</a>
        </p>
      </div>
      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

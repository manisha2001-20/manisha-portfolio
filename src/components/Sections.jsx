import { useState } from 'react'
import { certifications, education, profile, skills } from '../data/profile.js'
import { AwardIcon, CapIcon, CopyIcon, ExternalIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'

export function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="reveal mx-auto mb-14 max-w-2xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading">{title}</h2>
      {children && <p className="mt-4 text-slate-400">{children}</p>}
    </div>
  )
}

export function About() {
  const facts = [
    ['Name', profile.name],
    ['Degree', 'B.E. in Artificial Intelligence & Data Science'],
    ['College', 'BMS College of Engineering, Bengaluru'],
    ['Graduation', '2027'],
    ['CGPA', '7.38 / 10'],
    ['Email', profile.email],
  ]
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeader eyebrow="About me" title={<>Building AI that is <span className="gradient-text">useful and trustworthy</span></>} />
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="reveal space-y-5 text-base leading-relaxed text-slate-400 lg:col-span-3">
            {profile.about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary"><LinkedInIcon width={18} height={18} /> Connect on LinkedIn</a>
            </div>
          </div>
          <dl className="reveal glass divide-y divide-white/[0.06] p-2 lg:col-span-2">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-sm text-slate-500">{k}</dt>
                <dd className="break-all text-sm font-medium text-slate-200 sm:break-normal sm:text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-72 max-w-4xl rounded-full bg-indigo-700/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeader eyebrow="Technical skills" title="Tools I work with">From data and models to APIs, databases and deployment.</SectionHeader>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <div key={s.group} className="reveal glass group p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-lg ring-1 ring-white/10 transition group-hover:scale-110" aria-hidden>{s.icon}</span>
                <h3 className="text-base font-semibold">{s.group}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => <li key={it} className="chip transition hover:border-violet-400/40 hover:text-white">{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section id="education" className="section">
      <div className="container-x">
        <SectionHeader eyebrow="Education" title="Academic background" />
        <div className="mx-auto max-w-3xl">
          {education.map((e) => (
            <article key={e.degree} className="reveal glass relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-500 to-blue-500" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20"><CapIcon width={24} height={24} /></span>
                <div className="flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className="text-lg font-semibold sm:text-xl">{e.school}</h3>
                    <span className="text-sm font-medium text-violet-300">{e.period}</span>
                  </div>
                  <p className="mt-1 text-slate-300">{e.degree}</p>
                  <p className="mt-1 text-sm text-slate-500">{e.place}</p>
                  <p className="mt-4 inline-block rounded-lg bg-white/[0.05] px-3 py-1.5 text-sm font-semibold text-white">{e.detail}</p>
                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Relevant coursework</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">{e.coursework.map((c) => <li key={c} className="chip">{c}</li>)}</ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const linkCls = 'inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-violet-400/40 hover:bg-white/[0.08] hover:text-white'

export function certificateLinks(c, base = '/') {
  const links = []
  if (c.linkedinCredentialUrl) links.push({ href: c.linkedinCredentialUrl, label: 'View credential on LinkedIn', linkedin: true })
  if (c.certificateFile) links.push({ href: `${base}${c.certificateFile}`, label: 'View certificate' })
  if (c.issuerUrl) links.push({ href: c.issuerUrl, label: `Issuer copy (${c.issuer.split(' ')[0]})` })
  return links
}

export function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container-x">
        <SectionHeader eyebrow="Certifications" title="Credentials & simulations">
          Open each certificate to inspect the original document.
        </SectionHeader>
        <div className="grid gap-4 md:grid-cols-3">
          {certifications.map((c, i) => {
            const links = certificateLinks(c, import.meta.env.BASE_URL)
            return (
              <article key={c.title} className="reveal glass group flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20 transition group-hover:rotate-6"><AwardIcon width={22} height={22} /></span>
                <h3 className="mt-5 text-base font-semibold leading-snug">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{c.issuer}</p>
                <dl className="mt-3 space-y-1 text-xs">
                  {c.date && (
                    <div className="flex gap-1.5"><dt className="text-slate-500">Completed:</dt><dd className="font-medium text-violet-300">{c.date}</dd></div>
                  )}
                  {c.credentialId && (
                    <div className="flex flex-wrap gap-1.5"><dt className="text-slate-500">Credential ID:</dt><dd className="break-all font-mono text-slate-300">{c.credentialId}</dd></div>
                  )}
                  {c.enrolmentCode && (
                    <div className="flex flex-wrap gap-1.5"><dt className="text-slate-500">Enrolment code:</dt><dd className="break-all font-mono text-slate-300">{c.enrolmentCode}</dd></div>
                  )}
                </dl>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {links.length ? links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      {l.linkedin ? <LinkedInIcon width={14} height={14} /> : <ExternalIcon width={14} height={14} />} {l.label}
                    </a>
                  )) : null}
                </div>
              </article>
            )
          })}
        </div>
        <div className="reveal mt-8 text-center">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost"><LinkedInIcon width={18} height={18} /> See my LinkedIn profile</a>
        </div>
      </div>
    </section>
  )
}

export function Contact({ resumeAvailable }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="reveal glass relative overflow-hidden px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />
          <span className="eyebrow relative">Contact</span>
          <h2 className="heading relative">Let’s build something <span className="gradient-text">together</span></h2>
          <p className="relative mx-auto mt-4 max-w-xl text-slate-400">Have an opportunity, a project idea or a question about my work? The fastest way to reach me is email.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary"><MailIcon width={18} height={18} /> {profile.email}</a>
            <button onClick={copy} className="btn-ghost" aria-live="polite"><CopyIcon width={18} height={18} /> {copied ? 'Copied!' : 'Copy email'}</button>
          </div>
          <div className="relative mt-4 flex flex-wrap justify-center gap-3">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost"><LinkedInIcon width={18} height={18} className="text-[#4f9be6]" /> LinkedIn profile</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost"><GitHubIcon width={18} height={18} /> GitHub</a>
            {resumeAvailable && <a href={`${import.meta.env.BASE_URL}${profile.resumeFile}`} download="S_Manisha_Rani_Patra_Resume.pdf" className="btn-ghost">Download resume</a>}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind CSS.</p>
        <div className="flex gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg p-2 hover:bg-white/5 hover:text-white"><GitHubIcon /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-lg p-2 hover:bg-white/5 hover:text-white"><LinkedInIcon /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-lg p-2 hover:bg-white/5 hover:text-white"><MailIcon /></a>
        </div>
      </div>
    </footer>
  )
}

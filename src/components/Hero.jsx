import { profile, stats } from '../data/profile.js'
import { useTypewriter } from '../hooks.js'
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons.jsx'

export default function Hero({ resumeAvailable }) {
  const typed = useTypewriter(profile.roles)
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-[110px] animate-float" />
      <div className="pointer-events-none absolute -right-24 top-40 h-[26rem] w-[26rem] rounded-full bg-blue-600/20 blur-[110px] animate-float-slow" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="reveal eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> AI & Data Science · BMSCE · Class of 2027</p>
          <h1 className="reveal mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Hi, I’m <span className="gradient-text animate-shimmer">{profile.name}</span>
          </h1>
          <p className="reveal mt-5 h-8 font-display text-lg text-slate-200 sm:text-2xl" aria-live="polite">
            {typed}<span className="ml-0.5 inline-block w-[2px] animate-blink bg-violet-400 align-middle" style={{ height: '1.1em' }} />
          </p>
          <p className="reveal mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">{profile.intro}</p>
          <p className="reveal mt-4 inline-flex items-center gap-1.5 text-sm text-slate-500"><PinIcon width={16} height={16} /> {profile.location}</p>

          <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#projects" className="btn-primary">View projects <ArrowIcon width={18} height={18} /></a>
            {resumeAvailable && (
              <a href={`${import.meta.env.BASE_URL}${profile.resumeFile}`} download="S_Manisha_Rani_Patra_Resume.pdf" className="btn-ghost"><DownloadIcon width={18} height={18} /> Download resume</a>
            )}
            <a href={`mailto:${profile.email}`} className="btn-ghost"><MailIcon width={18} height={18} /> Email me</a>
          </div>
          <div className="reveal mt-6 flex justify-center gap-2">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-xl border border-white/10 p-3 text-slate-300 transition hover:-translate-y-0.5 hover:border-violet-400/50 hover:text-white"><GitHubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-xl border border-white/10 p-3 text-slate-300 transition hover:-translate-y-0.5 hover:border-blue-400/50 hover:text-white"><LinkedInIcon /></a>
          </div>
        </div>

        <dl className="reveal mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass px-4 py-5 text-center transition hover:border-violet-400/30">
              <dt className="text-xs uppercase tracking-wider text-slate-500">{s.label}</dt>
              <dd className="mt-1 font-display text-3xl font-bold text-white">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

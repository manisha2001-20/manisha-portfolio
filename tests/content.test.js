import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { certifications, education, nav, profile, projects, skills } from '../src/data/profile.js'

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}
const sources = [...walk('src'), 'index.html'].map((f) => [f, readFileSync(f, 'utf8')])

describe('portfolio content', () => {
  it('uses the exact name and personal email only', () => {
    expect(profile.name).toBe('S Manisha Rani Patra')
    expect(profile.email).toBe('manisharanipatra2@gmail.com')
    for (const [file, text] of sources) {
      expect(text, file).not.toMatch(/bmsce\.ac\.in/i)       // no college email anywhere
      expect(text, file).not.toMatch(/S\. Manisha/)           // no dot after S
      expect(text, file).not.toMatch(/(\+91[\s-]?)?\b[6-9]\d{9}\b/) // no Indian mobile number
    }
  })

  it('links every project to a repository on the right GitHub account', () => {
    expect(projects.length).toBeGreaterThanOrEqual(7)
    for (const p of projects) {
      expect(p.repo).toMatch(/^https:\/\/github\.com\/manisha2001-20\/[\w.-]+$/)
      expect(p.summary.length).toBeGreaterThan(40)
      expect(p.highlights.length).toBeGreaterThan(0)
    }
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has all required sections in the navigation', () => {
    expect(nav.map((n) => n.id)).toEqual(['home', 'about', 'skills', 'projects', 'education', 'certifications', 'contact'])
    expect(profile.linkedin).toBe('https://www.linkedin.com/in/s-manisha-rani-patra-332bba430/')
    expect(profile.github).toBe('https://github.com/manisha2001-20')
  })

  it('links certificates only to real documents, never inventing credentials', () => {
    for (const c of certifications) {
      expect(c.title && c.issuer, c.title).toBeTruthy()
      if (c.certificateFile) {
        expect(c.certificateFile).toMatch(/^certificates\/[\w-]+\.pdf$/)
        const pdf = readFileSync(join('public', c.certificateFile))
        expect(pdf.subarray(0, 5).toString(), c.certificateFile).toBe('%PDF-')
      }
      if (c.linkedinCredentialUrl) expect(c.linkedinCredentialUrl).toMatch(/^https:\/\/(www\.)?linkedin\.com\//)
      if (c.issuerUrl) expect(c.issuerUrl).toMatch(/^https:\/\//)
      if (c.credentialId) expect(c.certificateFile || c.issuerUrl, c.title).toBeTruthy() // an ID must be backed by a document
    }
    for (const [file, text] of sources) expect(text, file).not.toMatch(/\bverified (certificate|credential)/i)
    for (const c of certifications) expect(c.certificateFile, `${c.title} has its original PDF`).toBeTruthy()
    for (const [file, text] of sources) expect(text, file).not.toMatch(/available on request/i)
  })

  it('opens every LinkedIn link in a new tab', () => {
    const jsx = sources.filter(([f]) => f.endsWith('.jsx')).map(([, t]) => t).join('\n')
    const tags = jsx.match(/<a [^>]*linkedin[^>]*>/gi) ?? []
    expect(tags.length).toBeGreaterThanOrEqual(4)
    for (const t of tags) expect(t).toContain('target="_blank"')
  })

  it('points every LinkedIn profile link at the exact profile, with one per section', () => {
    // no hard-coded LinkedIn URLs in components: every profile link goes through profile.linkedin
    for (const [file, text] of sources.filter(([f]) => f.endsWith('.jsx'))) {
      expect(text, file).not.toMatch(/linkedin\.com\/in\//)
    }
    const read = (f) => readFileSync(`src/components/${f}`, 'utf8')
    const count = (text) => (text.match(/href=\{profile\.linkedin\}/g) ?? []).length
    expect(count(read('Navbar.jsx'))).toBe(2) // desktop bar + mobile menu
    expect(count(read('Hero.jsx'))).toBe(1)
    expect(count(read('Sections.jsx'))).toBe(5) // about row + button, certifications, contact, footer
  })

  it('builds LinkedIn share links from each project repository', async () => {
    const { linkedinShareUrl } = await import('../src/components/Projects.jsx')
    for (const p of projects) {
      const u = new URL(linkedinShareUrl(p.repo))
      expect(u.origin + u.pathname).toBe('https://www.linkedin.com/sharing/share-offsite/')
      expect(u.searchParams.get('url')).toBe(p.repo)
    }
  })

  it('matches resume facts', () => {
    expect(education[0].detail).toContain('7.38')
    expect(education[0].period).toBe('2023 – 2027')
    expect(certifications).toHaveLength(3)
    expect(skills.flatMap((s) => s.items)).toEqual(expect.arrayContaining(['Python', 'FastAPI', 'NetworkX', 'Qwen2.5-VL']))
  })
})

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
      expect(text, file).not.toMatch(/7008412421/)             // no phone number
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

  it('matches resume facts', () => {
    expect(education[0].detail).toContain('7.38')
    expect(education[0].period).toBe('2023 – 2027')
    expect(certifications).toHaveLength(3)
    expect(skills.flatMap((s) => s.items)).toEqual(expect.arrayContaining(['Python', 'FastAPI', 'NetworkX', 'Qwen2.5-VL']))
  })
})

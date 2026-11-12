// Config-time only: never import this module from the client theme.
import fs from 'node:fs'
import path from 'node:path'
import type { DefaultTheme } from 'vitepress'

export interface VersionMetadata {
  current: string
  versions: string[]
}

function archiveNames(metadata: VersionMetadata): string[] {
  const names = [...new Set(metadata.versions)].filter((name) => name !== metadata.current)
  for (const name of names) {
    if (!/^[\w.-]+$/.test(name) || name === '.' || name === '..') {
      throw new Error(`Invalid archive version: ${name}`)
    }
  }
  return names
}

function pagesIn(directory: string, current = false): string[] {
  if (!fs.existsSync(directory)) return []
  const walk = (dir: string, prefix = ''): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      if (entry.name.startsWith('.') || entry.name === 'public') return []
      if (current && !prefix && entry.name === 'versions') return []
      const relative = prefix + entry.name
      if (entry.isDirectory()) return walk(path.join(dir, entry.name), relative + '/')
      return entry.isFile() && entry.name.endsWith('.md') ? [relative] : []
    })
  return walk(directory).sort()
}

/** JSON-safe manifest: keys are version labels, values are paths relative to that version's root. */
export function buildVersionPages(docsDir: string, metadata: VersionMetadata): Record<string, string[]> {
  return Object.fromEntries([
    [metadata.current, pagesIn(docsDir, true)],
    ...archiveNames(metadata).map((version) => [version, pagesIn(path.join(docsDir, 'versions', version))]),
  ])
}

function pageRoute(relative: string): string {
  return relative === 'index.md' ? '' : relative.replace(/index\.md$/, '').replace(/\.md$/, '')
}

function titleFor(file: string, fallback: string): string {
  const source = fs.readFileSync(file, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
  let fence = ''
  for (const line of source.split(/\r?\n/)) {
    const marker = /^\s{0,3}(`{3,}|~{3,})/.exec(line)?.[1]
    if (marker) {
      if (!fence) fence = marker
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = ''
      continue
    }
    if (fence) continue
    const heading = /^#\s+(.+?)(?:\s+#+)?\s*$/.exec(line)
    if (heading) return heading[1].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`]/g, '')
  }
  return fallback.replace(/[-_]/g, ' ')
}

/** Discover only files inside this archive; never borrow current-page links. */
export function buildArchiveSidebar(docsDir: string, version: string): DefaultTheme.SidebarItem[] {
  archiveNames({ current: '', versions: [version] })
  const root = path.join(docsDir, 'versions', version)
  const pages = pagesIn(root)
  const build = (prefix: string): DefaultTheme.SidebarItem[] => {
    const children = new Set(pages.filter((file) => file.startsWith(prefix)).map((file) => file.slice(prefix.length).split('/')[0]))
    return [...children].sort().flatMap((child): DefaultTheme.SidebarItem[] => {
      const relative = prefix + child
      if (child === 'index.md') return []
      if (child.endsWith('.md')) return [{ text: titleFor(path.join(root, relative), child.slice(0, -3)), link: `/versions/${version}/${pageRoute(relative)}` }]
      const index = relative + '/index.md'
      return [{
        text: pages.includes(index) ? titleFor(path.join(root, index), child) : child.replace(/[-_]/g, ' '),
        ...(pages.includes(index) ? { link: `/versions/${version}/${pageRoute(index)}` } : {}),
        collapsed: true,
        items: build(relative + '/'),
      }]
    })
  }
  return [
    ...(pages.includes('index.md') ? [{ text: titleFor(path.join(root, 'index.md'), `Docs ${version}`), link: `/versions/${version}/` }] : []),
    ...build(''),
  ]
}
